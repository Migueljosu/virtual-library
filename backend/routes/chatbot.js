// routes/chatbot.js
const express = require('express');
const { getChatbotResponse } = require('../controllers/chatbotController');
const { protect } = require('../middleware/authMiddleware'); // Corrigido o nome da função de middleware

const router = express.Router();

// Rota para obter a resposta do chatbot, com autenticação via token JWT
router.post('/chat', protect, getChatbotResponse);

module.exports = router;
