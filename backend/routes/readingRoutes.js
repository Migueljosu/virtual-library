const express = require("express");
const {
  updateReadingStatus,
  getUserReadingBooks,
  getUserBookStatistics,
} = require("../controllers/readingStatusController");

const router = express.Router();

// Middleware de autenticação
const { protect } = require("../middleware/authMiddleware");

/// Rota para atualizar o status de leitura (autenticado)
router.post("/reading-status", protect, updateReadingStatus);

// Rota para pegar todos os livros de leitura do usuário (autenticado)
router.get("/user-reading-books", protect, getUserReadingBooks);

// Rota para ver estatísticas dos livros lidos do usuário (autenticado) 
router.get("/user/statistics", protect, getUserBookStatistics);

module.exports = router;
