const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const User = require("../models/userModel");

// Validação de dados
const userValidation = [
  check("email").isEmail().withMessage("Email inválido"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("A senha deve ter pelo menos 6 caracteres"),
  check("role")
    .optional()  // Tornar o 'role' opcional
    .isIn(['reader', 'admin', 'moderator'])  // Definindo opções válidas para 'role'
    .withMessage("O papel deve ser 'reader', 'admin' ou 'moderator'"),
];

// Registro de usuário
const registerUser = async (req, res) => {
  const { name, email, password, role = "reader" } = req.body; // 'role' padrão é 'reader'

  // Validação dos dados
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Verificando se o email já existe
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email já registrado." });
    }

    // Criptografando a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Criando o novo usuário
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,  // Role pode ser qualquer um dos valores definidos
    });

    // Criando token JWT para autenticação
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(201).json({
      message: "Usuário registrado com sucesso!",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error(error);

    // Tratar erro de banco de dados e outro tipo de erro
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({ message: "O email já está em uso." });
    }

    return res.status(500).json({ message: "Erro ao criar conta. Tente novamente mais tarde." });
  }
};

// Login de usuário
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: "Email ou senha inválidos." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Email ou senha inválidos." });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.json({
      message: "Login bem-sucedido!",
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao fazer login." });
  }
};

module.exports = { registerUser, loginUser, userValidation };
