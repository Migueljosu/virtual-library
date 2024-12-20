const express = require('express');
const { createBook } = require('../controllers/bookController');

const router = express.Router();

// Esta rota precisa ser configurada corretamente
router.post('/books', createBook);

module.exports = router;
