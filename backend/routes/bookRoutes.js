const express = require('express');
const { createBook, getBooks } = require('../controllers/bookController');
const { authenticateToken } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/create', authenticateToken, createBook);
router.get('/list', getBooks);

module.exports = router;
