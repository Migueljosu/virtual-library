const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

// Função para verificar se a senha está correta
const verifyPassword = async (email, password) => {
  const query = 'SELECT * FROM users WHERE email = ?';
  const result = await db.query(query, [email]);

  if (result.length > 0) {
    const user = result[0];
    return bcrypt.compare(password, user.password);
  }
  return false;
};

// Função para gerar o token JWT
const generateToken = (userId, role) => {
  return jwt.sign({ id: userId, role: role }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

module.exports = {
  verifyPassword,
  generateToken,
};
