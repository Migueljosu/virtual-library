const fs = require("fs");
const path = require("path");
const { Op } = require("sequelize");
const {
  Book,
  Review,
  Reaction,
  Recommendation,
  User,
  Category,
} = require("../models");
const pdfParse = require("pdf-parse"); // Biblioteca para processar PDFs
// Agora você pode usar os modelos e as associações no seu controlador

const createBook = async (req, res) => {
  try {
    // Verifique se os arquivos foram enviados
    if (!req.files || !req.files.file || !req.files.coverImage) {
      return res.status(400).json({ error: "Arquivo e capa são obrigatórios" });
    }

    const {
      title,
      description,
      author,
      category,
      status,
      isFree,
      price,
      publicationDate,
    } = req.body;

    // Validação de campos obrigatórios
    if (
      !title ||
      !description ||
      !author ||
      !category ||
      !status ||
      !publicationDate
    ) {
      return res
        .status(400)
        .json({ error: "Todos os campos obrigatórios devem ser preenchidos" });
    }

    // Definir caminhos dos arquivos
    const uploadDir = path.join(__dirname, "..", "uploads");

    // Criar as pastas de capa e arquivo, se não existirem
    const coverDir = path.join(uploadDir, "book-cover");
    const fileDir = path.join(uploadDir, "book-file");

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    if (!fs.existsSync(coverDir)) {
      fs.mkdirSync(coverDir);
    }
    if (!fs.existsSync(fileDir)) {
      fs.mkdirSync(fileDir);
    }

    // Definir o caminho final dos arquivos
    const bookPath = path.join(fileDir, req.files.file.name);
    const coverPath = path.join(coverDir, req.files.coverImage.name);

    // Salvar os arquivos localmente
    await req.files.file.mv(bookPath);
    await req.files.coverImage.mv(coverPath);

    // Usar caminhos relativos para os arquivos
    const relativeBookPath = `/uploads/book-file/${req.files.file.name}`;
    const relativeCoverPath = `/uploads/book-cover/${req.files.coverImage.name}`;

    // Criar o livro no banco de dados com caminhos relativos
    const book = await Book.create({
      title,
      description,
      author,
      file_url: relativeBookPath, // Caminho relativo do arquivo do livro
      cover_url: relativeCoverPath, // Caminho relativo da imagem de capa
      category_id: category,
      status,
      is_free: isFree,
      price,
      publication_date: publicationDate,
      writer_id: req.user.id, // Associando o livro ao usuário logado
    });

    return res.status(201).json({ book });
  } catch (error) {
    console.error("Erro ao criar o livro:", error.message);
    console.error(error.stack);

    return res.status(500).json({
      error: "Erro ao criar o livro",
      message: error.message || "Erro desconhecido",
      stack: process.env.MY_CUSTOM_ENV === "dev" ? error.stack : undefined,
    });
  }
};

const searchBooks = async (req, res) => {
  try {
    const { query, page = 1, limit = 10 } = req.query; // Paginando resultados
    const offset = (page - 1) * limit;

    // Busca apenas na tabela de livros e inclui a tabela de categorias
    const books = await Book.findAndCountAll({
      where: {
        [Op.or]: [
          { title: { [Op.like]: `%${query}%` } }, // Busca pelo título
          { author: { [Op.like]: `%${query}%` } }, // Busca pelo autor
          { description: { [Op.like]: `%${query}%` } }, // Busca pela descrição
        ],
      },
      include: [
        {
          model: Category,
          as: "category", // Nome da associação (pode ser ajustado conforme a definição do modelo)
          attributes: ["name"], // Seleciona apenas o nome da categoria
        },
      ],
      limit: parseInt(limit, 10),
      offset,
    });

    const result = {
      totalItems: books.count,
      totalPages: Math.ceil(books.count / limit),
      currentPage: parseInt(page, 10),
      books: books.rows.map((book) => ({
        id: book.id,
        title: book.title,
        author: book.author,
        description: book.description,
        category_id: book.category_id,
        status: book.status,
        category: book.category ? book.category.name : null, // Inclui o nome da categoria
      })),
    };

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erro ao buscar livros", error: error.message });
  }
};

const getBookDetails = async (req, res) => {
  try {
    const { bookId } = req.params;
    const userId = req.user.id; // ID do usuário logado, obtido do middleware

    // Buscando o livro e incluindo as resenhas diretamente
    const book = await Book.findOne({
      where: { id: bookId },
      include: [
        {
          model: Review,
          as: "reviews", // Inclui resenhas diretamente
          include: [
            {
              model: User,
              as: "user",
            },
          ],
        },
        {
          model: Recommendation,
          as: "recommendations",
          include: [
            {
              model: User,
              as: "user",
            },
          ],
        },
        {
          model: Category,
          as: "category",
        },
      ],
    });

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Buscando as reações para o livro, incluindo o ID do usuário e do livro
    const reactions = await Reaction.findAll({
      where: {
        book_id: bookId,
        user_id: userId, // Filtra pelas reações do usuário logado, se necessário
      },
      include: [
        {
          model: User,
          as: "user_reactions",
        },
      ],
    });

    // Contagem de likes (reaction_type = "like")
    const totalLikes = reactions.filter(
      (reaction) => reaction.reaction_type === "like"
    ).length;

    // Coletando ratings (considerando a média dos ratings)
    const ratings = book.reviews.map((review) => review.rating);
    const averageRating =
      ratings.length > 0
        ? ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length
        : 0;

    // Construindo a resposta com todos os dados disponíveis
    const bookDetails = {
      id: book.id,
      title: book.title,
      description: book.description,
      author: book.author,
      publicationDate: book.publication_date,
      price: book.price,
      isFree: book.is_free,
      fileUrl: book.file_url,
      coverUrl: book.cover_url,
      category: book.category || null, // Retorna a categoria completa ou null
      reviews: book.reviews.map((review) => ({
        id: review.id,
        rating: review.rating,
        comment: review.comment,
        createdAt: review.created_at,
        user: review.user ? review.user.name : "Anônimo", // Verifique aqui
        reactions: reactions
          .filter((reaction) => reaction.review_id === review.id)
          .map((reaction) => ({
            id: reaction.id,
            likes: reaction.reaction_type === "like" ? 1 : 0, // Conta como 1 se for "like"
            createdAt: reaction.created_at,
            user: reaction.user_reactions
              ? reaction.user_reactions.name
              : "Desconhecido",
          })),
      })),
      recommendations: book.recommendations.map((recommendation) => ({
        id: recommendation.id,
        text: recommendation.text,
        user: recommendation.user.name,
      })),
      likes: totalLikes, // Contagem total de likes
      ratings: averageRating, // Média de ratings
    };

    res.status(200).json(bookDetails);
  } catch (error) {
    console.error("Erro ao obter detalhes do livro:", error);
    res.status(500).json({ message: "Erro ao obter detalhes do livro." });
  }
};

// Enviar Like
const sendLike = async (req, res) => {
  try {
    const { bookId } = req.params; // Certifique-se de que está utilizando 'bookId'
    const userId = req.user.id;

    const book = await Book.findByPk(bookId);
    if (!book)
      return res.status(404).json({ message: "Livro não encontrado." });

    // Corrigido: Substituindo 'book_id' por 'bookId' e 'user_id' por 'userId'
    const existingLike = await Reaction.findOne({
      where: { book_id: bookId, user_id: userId, reaction_type: "like" },
    });
    if (existingLike)
      return res.status(400).json({ message: "Você já curtiu este livro." });

    await Reaction.create({
      book_id: bookId,
      user_id: userId,
      reaction_type: "like",
    });

    res.status(201).json({ message: "Like registrado com sucesso!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao registrar o like." });
  }
};

// Enviar Rating
const sendRating = async (req, res) => {
  try {
    console.log("Dados recebidos:", req.body); // Verifique os dados
    const { bookId } = req.params;
    const { rating } = req.body;
    const userId = req.user.id;

    const book = await Book.findByPk(bookId);
    if (!book) {
      console.log("Livro não encontrado!");
      return res.status(404).json({ message: "Livro não encontrado." });
    }

    const existingReview = await Review.findOne({
      where: { book_id: bookId, user_id: userId },
    });
    if (existingReview) {
      console.log("Avaliação já existe para este usuário e livro.");
      return res.status(400).json({ message: "Você já avaliou este livro." });
    }

    console.log("Criando nova avaliação...");
    await Review.create({ book_id: bookId, user_id: userId, rating: rating });
    console.log("Avaliação criada com sucesso!");

    res.status(201).json({ message: "Avaliação registrada com sucesso!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao registrar avaliação." });
  }
};

// Enviar Comentário
const sendComment = async (req, res) => {
  try {
    const { bookId } = req.params;
    const { rating, comment } = req.body;
    const userId = req.user.id;

    const book = await Book.findByPk(bookId);
    if (!book)
      return res.status(404).json({ message: "Livro não encontrado." });

    // Se rating não for fornecido, defina um valor padrão
    const reviewData = {
      book_id: bookId,
      user_id: userId,
      comment: comment,
    };

    if (rating) {
      reviewData.rating = rating;
    }

    await Review.create(reviewData);

    res.status(201).json({ message: "Comentário enviado com sucesso!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao enviar comentário." });
  }
};

// Enviar Recomendação
const sendRecommendation = async (req, res) => {
  try {
    const { bookId } = req.params;
    const { recommendation, interactionType, score } = req.body;
    const userId = req.user.id;

    const book = await Book.findByPk(bookId);
    if (!book)
      return res.status(404).json({ message: "Livro não encontrado." });

    await Recommendation.create({
      book_id: bookId,
      user_id: userId,
      text: recommendation,
      interaction_type: interactionType,
      score: score,
    });

    res.status(201).json({ message: "Recomendação enviada com sucesso!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao enviar recomendação." });
  }
};

const getBookForReading = async (req, res) => {
  try {
    const { bookId } = req.params;

    // Busca o livro no banco de dados usando findOne e filtrando pelo ID
    const book = await Book.findOne({ where: { id: bookId } });

    if (!book) {
      return res.status(404).json({ message: "Livro não encontrado." });
    }

    // Verifica se o arquivo do livro está disponível
    if (!book.file_url) {
      return res
        .status(400)
        .json({ message: "Arquivo do livro não disponível." });
    }

    // Retorna o URL do arquivo e da capa do livro
    res.status(200).json({
      file_url: book.file_url,
      cover_url: book.cover_url || null, // Caso a capa não exista, retorna null
    });
  } catch (error) {
    console.error("Erro ao obter o arquivo do livro:", error);
    res.status(500).json({ message: "Erro ao obter o arquivo do livro." });
  }
};

const getAllBooks = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const { count, rows: books } = await Book.findAndCountAll({
      include: [
        {
          model: Review,
          as: "reviews",
          include: [{ model: User, as: "user", attributes: ["name"] }],
        },
        {
          model: Reaction,
          as: "reactions",
          include: [
            { model: User, as: "user_reactions", attributes: ["name"] },
          ],
        },
        {
          model: Recommendation,
          as: "recommendations",
          include: [{ model: User, as: "user", attributes: ["name"] }],
        },
        {
          model: Category,
          as: "category",
          attributes: ["name"],
        },
      ],
      limit: parseInt(limit),
      offset,
      order: [["created_at", "DESC"]],
    });

    if (count === 0) {
      return res.status(404).json({ message: "No books found" });
    }

    const bookDetails = await Promise.all(
      books.map(async (book) => {
        const filePath = path.join(
          __dirname,
          "..",
          "uploads",
          book.file_url.replace(/^\/uploads/, "")
        );

        let pageCount = 0;

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

        const totalLikes = book.reactions.reduce((likes, reaction) => {
          return likes + (reaction.reaction_type === "like" ? 1 : 0);
        }, 0);

        const averageRating =
          book.reviews.length > 0
            ? book.reviews.reduce((sum, review) => sum + review.rating, 0) /
              book.reviews.length
            : 0;

        return {
          id: book.id,
          title: book.title,
          description: book.description,
          author: book.author,
          publicationDate: book.publication_date,
          price: book.price,
          isFree: book.is_free,
          isPublished: book.status === "published",
          fileUrl: book.file_url,
          coverUrl: book.cover_url,
          category: book.category?.name || "Uncategorized",
          pageCount,
          reviews: book.reviews.map((review) => ({
            id: review.id,
            rating: review.rating,
            comment: review.comment,
            createdAt: review.created_at,
            user: review.user?.name || "Anonymous",
          })),
          reactions: book.reactions.map((reaction) => ({
            id: reaction.id,
            reactionType: reaction.reaction_type,
            createdAt: reaction.created_at,
            user: reaction.user_reactions?.name || "Anonymous",
          })),
          recommendations: book.recommendations.map((recommendation) => ({
            id: recommendation.id,
            text: recommendation.text,
            user: recommendation.user?.name || "Anonymous",
          })),
          hasRecommendations: book.recommendations.length > 0,
          likes: totalLikes,
          ratings: averageRating.toFixed(2),
        };
      })
    );

    res.status(200).json({
      currentPage: parseInt(page),
      totalPages: Math.ceil(count / limit),
      totalBooks: count,
      books: bookDetails,
    });
  } catch (error) {
    console.error("Error fetching books:", error.message);
    res.status(500).json({ message: "Failed to fetch books." });
  }
};

const editBook = async (req, res) => {
  try {
    // Verifique se os arquivos foram enviados
    const {
      title,
      description,
      author,
      category,
      status,
      isFree,
      price,
      publicationDate,
    } = req.body;

    // Verifique se o ID do livro foi passado
    const bookId = req.params.id;
    if (!bookId) {
      return res.status(400).json({ message: "ID do livro não fornecido!" });
    }

    // Buscar o livro no banco de dados usando Sequelize
    const book = await Book.findByPk(bookId);
    if (!book) {
      return res.status(404).json({ message: "Livro não encontrado!" });
    }

    // Atualizar dados de texto
    book.title = title;
    book.description = description;
    book.author = author;
    book.category = category;
    book.status = status;
    book.is_free = isFree;
    book.price = isFree ? null : price; // Se o livro for gratuito, price será null
    book.publication_date = publicationDate;

    // Se um novo arquivo foi enviado, atualizar o caminho do arquivo
    if (req.files && req.files.file) {
      // Defina o novo caminho do arquivo
      const filePath = `/uploads/book-file/${req.files.file.name}`;
      book.file_url = filePath;

      // Salvar o novo arquivo
      await req.files.file.mv(
        path.join(__dirname, "..", "uploads", "book-file", req.files.file.name)
      );
    }

    // Se uma nova imagem de capa foi enviada, atualizar o caminho da capa
    if (req.files && req.files.coverImage) {
      // Defina o novo caminho da capa
      const coverImagePath = `/uploads/book-cover/${req.files.coverImage.name}`;
      book.cover_url = coverImagePath;

      // Salvar a nova capa
      await req.files.coverImage.mv(
        path.join(
          __dirname,
          "..",
          "uploads",
          "book-cover",
          req.files.coverImage.name
        )
      );
    }

    // Salvar as alterações no banco de dados
    await book.save();

    res.status(200).json({ message: "Livro atualizado com sucesso!", book });
  } catch (error) {
    console.error("Erro ao atualizar livro:", error);
    res.status(500).json({ message: "Erro ao atualizar livro!" });
  }
};

const deleteBook = async (req, res) => {
  const { id } = req.params; // Use "id" para acessar o parâmetro
  if (!id) {
    return res.status(400).json({ message: "Book ID is required" });
  }

  try {
    // Garantir que id seja convertido para número
    const deletedBook = await Book.destroy({
      where: { id: parseInt(id, 10) }, // Convertendo o id para número
    });

    if (deletedBook) {
      res.status(200).json({ message: "Book deleted successfully" });
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting book" });
  }
};

// Função para buscar o livro pelo ID
const getBookById = async (req, res) => {
  const bookId = req.params.id;

  try {
    // Busca o livro com as informações relacionadas que você pediu
    const book = await Book.findOne({
      where: { id: bookId },
      include: [
        {
          model: Category,
          as: "category",
          attributes: ["name"], // Inclui apenas o nome da categoria
        },
        {
          model: User,
          as: "writer",
          attributes: ["name"], // Inclui apenas o nome do autor
        },
      ],
      attributes: [
        "title",
        "description",
        "author",
        "status",
        "is_free",
        "cover_url",
        "file_url",
      ],
    });

    // Verifica se o livro foi encontrado
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Retorna os dados filtrados do livro com as relações
    const bookData = {
      title: book.title,
      description: book.description,
      author: book.author,
      category: book.category ? book.category.name : null,
      status: book.status,
      is_free: book.is_free,
      cover_url: book.cover_url,
      file_url: book.file_url,
    };

    res.json(bookData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  searchBooks,
  createBook,
  getBookDetails,
  sendRecommendation,
  sendComment,
  sendRating,
  sendLike,
  getBookForReading,
  deleteBook,
  editBook,
  getAllBooks,
  getBookById,
};
