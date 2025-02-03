const fs = require("fs");
const path = require("path");
const {
  Book,
  Review,
  ReadingStatus,
  Reaction,
  Favorites,
} = require("../models"); // Certifique-se de importar o modelo Review

// Função para atualizar ou criar o status de leitura para um livro específico
const updateReadingStatus = async (req, res) => {
  const { bookId, status } = req.body; // Usando bookId no corpo da requisição
  const userId = req.user.id; // O middleware já adiciona o ID do usuário ao objeto `req.user`
  console.log(req.body); // Verifique o conteúdo do corpo da requisição

  try {
    const readingStatus = await ReadingStatus.findOne({
      where: { user_id: userId, book_id: bookId }, // Usando book_id no banco
    });

    const currentDate = new Date(); // Data atual

    if (readingStatus) {
      // Se já existe o status de leitura para esse livro, atualiza
      readingStatus.status = status || readingStatus.status;
      if (status === "in_progress" && !readingStatus.started_at) {
        readingStatus.started_at = currentDate; // Se estiver começando a leitura, define a data de início
      }
      if (status === "completed" && !readingStatus.finished_at) {
        readingStatus.finished_at = currentDate; // Se estiver marcando como completado, define a data de término
      }
      await readingStatus.save();
    } else {
      // Se não existe, cria um novo status
      await ReadingStatus.create({
        user_id: userId,
        book_id: bookId, // Usando bookId como variável
        status,
        started_at: status === "in_progress" ? currentDate : null,
        finished_at: status === "completed" ? currentDate : null,
      });
    }

    res
      .status(200)
      .json({ message: "Status de leitura atualizado com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao atualizar status de leitura" });
  }
};

// Obter todos os livros de leitura de um usuário (com base nos status in_progress, completed, not_started)
const getUserReadingBooks = async (req, res) => {
  const userId = req.user.id; // O middleware já adiciona o ID do usuário ao objeto `req.user`

  try {
    // Obter os status de leitura do usuário (in_progress, completed, not_started)
    const readingStatuses = await ReadingStatus.findAll({
      where: { user_id: userId },
      include: [
        {
          model: Book,
          as: "book",
          attributes: [
            "id",
            "title",
            "author",
            "description",
            "file_url",
            "cover_url",
          ],
          include: [
            {
              model: Review,
              as: "reviews",
              attributes: ["rating"], // Obtendo apenas a avaliação dos livros
            },
            {
              model: Reaction,
              as: "reactions",
              attributes: ["reaction_type"], // Obtendo reações
            },
          ],
        },
      ],
    });

    // Mapear os status de leitura e obter as informações dos livros
    const booksWithStatus = await Promise.all(
      readingStatuses.map(async (status) => {
        const book = status.book;

        // Obter o total de páginas (se for um livro em PDF, você pode usar o mesmo código da função getAllBooks)
        let pageCount = 0;
        const filePath = path.join(
          __dirname,
          "..",
          "uploads",
          book.file_url.replace(/^\/uploads/, "")
        );
        if (fs.existsSync(filePath)) {
          try {
            const pdfData = await pdfParse(fs.readFileSync(filePath));
            pageCount = pdfData.numpages || 0;
          } catch (error) {
            console.error(
              `Error parsing PDF for book "${book.title}":`,
              error.message
            );
          }
        }

        // Calcular a média de avaliações
        const averageRating =
          book.reviews.length > 0
            ? book.reviews.reduce((sum, review) => sum + review.rating, 0) /
              book.reviews.length
            : 0;

        // Calcular o total de likes (se tiver reações do tipo 'like')
        const totalLikes = book.reactions.reduce((likes, reaction) => {
          return likes + (reaction.reaction_type === "like" ? 1 : 0);
        }, 0);

        return {
          book: {
            id: book.id,
            title: book.title,
            author: book.author,
            description: book.description,
            coverUrl: book.cover_url,
            pageCount,
            totalLikes,
            averageRating: averageRating.toFixed(2), // Arredondando para 2 casas decimais
          },
          status: status.status,
          startedAt: status.started_at,
          finishedAt: status.finished_at,
        };
      })
    );

    res.status(200).json(booksWithStatus);
  } catch (error) {
    console.error("Error fetching user's reading books:", error.message);
    res
      .status(500)
      .json({ message: "Erro ao obter livros de leitura do usuário" });
  }
};

const getUserBookStatistics = async (req, res) => {
  const userId = req.user.id; // O middleware já adiciona o ID do usuário ao objeto `req.user`

  try {
    // Contar quantos livros o usuário leu (status "completed")
    const completedBooksCount = await ReadingStatus.count({
      where: {
        user_id: userId,
        status: "completed",
      },
    });

    // Contar quantos livros o usuário está lendo (status "in_progress")
    const inProgressBooksCount = await ReadingStatus.count({
      where: {
        user_id: userId,
        status: "in_progress",
      },
    });

    // Contar quantos livros o usuário favoritou
    const favoriteBooksCount = await Favorites.count({
      where: {
        user_id: userId,
      },
    });

    // Retornar as estatísticas
    res.status(200).json({
      completedBooksCount,
      inProgressBooksCount,
      favoriteBooksCount,
    });
  } catch (error) {
    console.error("Error fetching user book statistics:", error.message);
    res
      .status(500)
      .json({ message: "Erro ao obter estatísticas de livros do usuário" });
  }
};
module.exports = {
  updateReadingStatus,
  getUserReadingBooks,
  getUserBookStatistics,
};
