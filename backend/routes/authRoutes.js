// routes/authRoutes.js
const express = require("express");
const {
  registerUser,
  loginUser,
  changePassword,
  requestPasswordReset,
  resetPassword,
  getUsers,
  updateUser,
  deleteUser,
  activateAccount,
  resendActivationCode,
  userValidation,
} = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");
const { check, validationResult } = require("express-validator");

const router = express.Router();
// Middleware para validar dados
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
router.post("/activate", activateAccount);
router.post("/resend-activation", resendActivationCode);

// Rota para registrar o usuário
router.post("/register", registerUser);

// Rota de login
router.post("/login", loginUser);

// Rota para alterar a senha com proteção
router.put("/change-password", protect, changePassword);

// Rota para solicitar redefinição de senha
router.post("/request-reset-password", requestPasswordReset);

// Rota para redefinir a senha
router.post("/reset-password", resetPassword);

// Rota para renderizar usuários
router.get("/get", getUsers);

// Rota para editar usuário
router.put("/edit/:id", userValidation, validate, updateUser);

// Rota para excluir usuário
router.delete("/delete/:id", deleteUser);

module.exports = router;
