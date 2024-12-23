const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const User = require("../models/userModel");
const nodemailer = require("nodemailer");
const ActivationCode = require("../models/activationCodeModel"); // Ajuste o caminho conforme necessário

// Validação de dados
const userValidation = [
  check("email").isEmail().withMessage("Email inválido"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("A senha deve ter pelo menos 6 caracteres"),
  check("role")
    .optional() // Tornar o 'role' opcional
    .isIn(["reader", "admin", "writer"]) // Definindo opções válidas para 'role'
    .withMessage("O papel deve ser 'reader', 'admin' ou 'writer'"),
];

// Configuração do Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Coloque o email do remetente
    pass: process.env.EMAIL_PASS, // Senha ou senha de app
  },
});
// Solicitar redefinição de senha
const requestPasswordReset = async (req, res) => {
  try {
    // Obter o email do usuário logado pelo token
    const decodedToken = jwt.verify(
      req.headers.authorization.split(" ")[1], // Verifique se o token está no formato correto
      process.env.JWT_SECRET
    );
    const user = await User.findByPk(decodedToken.id);

    if (!user) {
      return res.status(404).json({
        message: "Usuário não encontrado.",
        error: "Nenhum usuário com esse ID foi encontrado.",
      });
    }

    // Gerar token de redefinição
    const resetToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "15m", // Token válido por 15 minutos
    });

    // Garantir que a URL base esteja correta (use seu IP ou domínio)
    const baseUrl = process.env.FRONTEND_URL || "http://localhost:3000"; // Pode ser configurado no .env ou diretamente

    // Montando o link completo com o token
    const resetLink = `${baseUrl}/reset-password?token=${resetToken}`;

    // Enviar o email com o link
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Redefinição de Senha - Virtual Library",
      html: `
        <h2>Olá, ${user.name}!</h2>
        <p>Recebemos uma solicitação para redefinir sua senha na Virtual Library. Para continuar, clique no link abaixo:</p>
        <p><a href="${resetLink}" style="color: #4CAF50; font-size: 16px; text-decoration: none; padding: 10px 20px; background-color: #4CAF50; color: white; border-radius: 5px; display: inline-block;">Redefinir Minha Senha</a></p>
        <p>Se você não solicitou essa redefinição, pode ignorar este email.</p>
        <br/>
        <p>Atenciosamente,</p>
        <p><strong>Equipe Virtual Library</strong></p>
      `,
    });

    res.status(200).json({ message: "Email de redefinição enviado." });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Erro ao solicitar redefinição de senha.",
      error: error.message || error,
    });
  }
};

// Redefinir a senha
const resetPassword = async (req, res) => {
  const { token, newPassword, confirmPassword } = req.body;
  console.log("Token:", token); // Verifique se o token está chegando corretamente
  console.log("New Password:", newPassword); // Verifique o conteúdo da nova senha
  console.log("Confirm Password:", confirmPassword); // Verifique o conteúdo da confirmação de senha

  if (newPassword !== confirmPassword) {
    return res.status(400).json({
      message: "As senhas não coincidem.",
      error: "A nova senha e a confirmação não são iguais.",
    });
  }

  try {
    // Verificar o token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res.status(404).json({
        message: "Usuário não encontrado.",
        error: "Nenhum usuário com esse ID foi encontrado no banco de dados.",
      });
    }

    // Atualizar a senha
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Senha redefinida com sucesso." });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      message: "Token inválido ou expirado.",
      error: error.message || error,
    });
  }
};

// Alteração de senha
const changePassword = async (req, res) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;

  // Verifique se as senhas coincidem
  if (newPassword !== confirmPassword) {
    return res.status(400).json({ message: "As senhas não coincidem" });
  }

  try {
    // Encontre o usuário pelo ID (decodificado do token)
    const user = await User.findByPk(req.user.id); // Usando findByPk em vez de findById

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    // Verifique se a senha antiga está correta
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Senha antiga incorreta" });
    }

    // Gere a nova senha criptografada
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Atualize a senha do usuário
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Senha alterada com sucesso" });
  } catch (error) {
    console.error(error); // Adiciona o erro completo ao console para diagnóstico

    // Envia o erro completo com uma mensagem amigável
    res.status(500).json({
      message: "Erro ao alterar a senha",
      error: error.message || error,
    });
  }
};
// Login de usuário
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log("Email:", email); // Verifique se o email está correto
  console.log("Password:", password); // Verifique se a senha está correta
  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: "Email ou senha inválidos." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Email ou senha inválidos." });
    }

    // Verificar se a conta está ativada
    if (!user.is_verified) {
      // Se a conta não estiver ativada, gerar um código de ativação
      const activationCode = await ActivationCode.create({
        user_id: user.id,
        code: Math.floor(100000 + Math.random() * 900000), // Gerar um código aleatório
      });

      // Enviar o código de ativação para o e-mail do usuário
      const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: "Código de Ativação",
        text: `Seu código de ativação é: ${activationCode.code}`,
      };

      await transporter.sendMail(mailOptions);

      return res.status(400).json({
        message:
          "Sua conta ainda não foi ativada. Verifique seu e-mail para ativar sua conta.",
        activationRequired: true, // Indica que é necessário ativar a conta
      });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.json({
      message: "Login bem-sucedido!",
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
    return res.status(500).json({ message: "Erro ao fazer login." });
  }
};

// Renderizar usuários
const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao carregar usuários." });
  }
};

// Editar usuário (exceto senha)
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, role } = req.body;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    // Verificar se os dados de e-mail ou nome são diferentes
    if (email && email !== user.email) {
      const emailExists = await User.findOne({ where: { email } });
      if (emailExists) {
        return res.status(400).json({ message: "E-mail já registrado." });
      }
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.role = role || user.role;

    await user.save();

    res.status(200).json({
      message: "Usuário atualizado com sucesso.",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao atualizar usuário." });
  }
};

// Excluir usuário
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    await user.destroy();
    res.status(200).json({ message: "Usuário excluído com sucesso." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao excluir usuário." });
  }
};

// Registro de usuário
const registerUser = async (req, res) => {
  const { name, email, password, role = "reader" } = req.body;

  // Validação e registro mantêm o comportamento original.

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    // Gerar o código de ativação
    const activationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    // Salvar o código temporariamente no banco (use cache para produção, como Redis)
    await ActivationCode.create({ user_id: user.id, code: activationCode });

    // Enviar email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Código de Ativação - Virtual Library",
      html: `
        <h2>Bem-vindo, ${name}!</h2>
        <p>Obrigado por se registrar. Use o código abaixo para ativar sua conta:</p>
        <h1 style="color: #4CAF50;">${activationCode}</h1>
        <p>Se você não solicitou este email, ignore-o.</p>
      `,
    });

    res.status(201).json({
      message:
        "Usuário registrado com sucesso! Código de ativação enviado para o email.",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao registrar usuário." });
  }
};

const activateAccount = async (req, res) => {
  const { code } = req.body;

  try {
    const activationRecord = await ActivationCode.findOne({ where: { code } });

    if (!activationRecord) {
      return res.status(400).json({ message: "Código inválido ou expirado." });
    }

    const user = await User.findByPk(activationRecord.user_id);
    if (!user || user.is_verified) {
      return res.status(400).json({ message: "Conta já ativada ou inválida." });
    }

    user.is_verified = true;
    user.activation_date = new Date();
    await user.save();
    await activationRecord.destroy();

    res.status(200).json({ message: "Conta ativada com sucesso!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao ativar conta." });
  }
};

const resendActivationCode = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required." });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (user.isActive) {
      return res.status(400).json({ message: "Account is already activated." });
    }

    // Gerar um novo token de ativação
    const activationToken = user.generateActivationToken();
    await user.save();

    // Enviar o email com o código de ativação
    await sendActivationEmail(user.email, activationToken);

    res.status(200).json({ message: "Activation code resent successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error resending activation code." });
  }
};

module.exports = {
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
};
