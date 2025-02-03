const express = require("express");
const { addFavoriteBook } = require("../controllers/favoritesController");

const router = express.Router();

// Middleware de autenticação
const { protect } = require("../middleware/authMiddleware");

// Rota para ver estatísticas dos livros lidos do usuário (autenticado)
router.post("/favorite", protect, addFavoriteBook);

module.exports = router;
