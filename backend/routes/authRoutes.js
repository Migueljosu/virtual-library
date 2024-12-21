// routes/authRoutes.js
const express = require("express");
const { registerUser, loginUser, changePassword } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Rota para registrar o usuário
router.post("/register", registerUser);

// Rota de login
router.post("/login", loginUser);

// Rota para alterar a senha com proteção
router.put("/change-password", protect, changePassword);

module.exports = router;
