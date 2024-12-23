const express = require('express');
const { createBook } = require('../controllers/bookController');
const router = express.Router();

// Middleware de autenticação
const { protect } = require('../middleware/authMiddleware');

// A rota para criar um novo livro
router.post('/books', protect, createBook);  // Aplica o middleware 'protect'

module.exports = router;
