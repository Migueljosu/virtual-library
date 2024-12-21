// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

const protect = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Obtém o token do cabeçalho

  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;  // Adiciona a informação do usuário à requisição
    next();  // Passa para o próximo middleware ou rota
  } catch (error) {
    res.status(401).json({ message: 'Token inválido ou expirado' });
  }
};

module.exports = { protect };
