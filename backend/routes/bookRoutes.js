const express = require("express");
const {
  createBook,
  searchBooks,
  getBookDetails,
  sendLike,
  sendRating,
  sendComment,
  sendRecommendation,
  getBookForReading,
} = require("../controllers/bookController");
const router = express.Router();

// Middleware de autenticação
const { protect } = require("../middleware/authMiddleware");

// A rota para criar um novo livro
router.post("/books", protect, createBook); // Aplica o middleware 'protect'

// Rota para buscar livros com filtros
router.get("/books/search", searchBooks);
router.get("/books/:bookId", protect, getBookDetails);
// Enviar Like
router.post("/:bookId/like", protect, sendLike);

// Enviar Rating (Avaliação)
router.post("/:bookId/rating", protect, sendRating);

// Enviar Comentário
router.post("/:bookId/reviews", protect, sendComment);

// Enviar Recomendação
router.post("/:bookId/recommendations", protect, sendRecommendation);
router.get("/:bookId/read", getBookForReading);

module.exports = router;
