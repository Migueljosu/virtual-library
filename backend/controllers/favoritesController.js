const { Favorites, Book } = require("../models"); // Importa o modelo de favoritos

const addFavoriteBook = async (req, res) => {
  const user_id = req.user.id;
  const { book_id } = req.body;
  try {
    // Verifica se o livro existe
    const book = await Book.findByPk(book_id);
    if (!book) {
      return res.status(404).json({ message: "Livro não encontrado" });
    }

    // Verifica se o livro já está nos favoritos do usuário
    const existingFavorite = await Favorites.findOne({
      where: { user_id, book_id },
    });
    if (existingFavorite) {
      return res
        .status(400)
        .json({ message: "Este livro já está nos favoritos" });
    }

    // Adiciona o livro aos favoritos
    const favorite = await Favorites.create({ user_id, book_id });

    return res
      .status(201)
      .json({ message: "Livro adicionado aos favoritos", favorite });
  } catch (error) {
    console.error("Erro ao adicionar favorito:", error);
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
};

module.exports = { addFavoriteBook };
