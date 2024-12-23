const express = require('express');
const { getStats } = require('../controllers/statsController');

const router = express.Router();

// Rota para pegar os totais
router.get('/stats', getStats);

module.exports = router;
