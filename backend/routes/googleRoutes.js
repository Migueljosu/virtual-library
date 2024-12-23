//routes/googleRoutes
const express = require('express');
const googleController = require('../controllers/googleController');
const router = express.Router();

// Rota para iniciar o login com o Google
router.get('/auth', googleController.authGoogle);

// Rota de callback para o login do Google
router.get('/auth/callback', googleController.googleCallback);

// Rota para upload de arquivos para o Google Drive
router.post('/upload', googleController.uploadFile);

module.exports = router;
