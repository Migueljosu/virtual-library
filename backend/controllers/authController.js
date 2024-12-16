const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

// Função para registrar um novo usuário
const registerUser = (req, res) => {
  const { name, email, password } = req.body;

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao criptografar a senha' });
    }

    const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    db.query(query, [name, email, hashedPassword], (error, results) => {
      if (error) {
        return res.status(500).json({ error: 'Erro ao registrar usuário' });
      }
      res.status(201).json({ message: 'Usuário registrado com sucesso!' });
    });
  });
};

// Função para login do usuário
const loginUser = (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], (error, results) => {
    if (error || results.length === 0) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    const user = results[0];
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err || !isMatch) {
        return res.status(401).json({ error: 'Senha incorreta' });
      }

      const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.status(200).json({ message: 'Login bem-sucedido', token });
    });
  });
};

module.exports = {
  registerUser,
  loginUser,
};
