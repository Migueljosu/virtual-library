const db = require('../config/db');

// Função para criar um novo livro
const createBook = (req, res) => {
  const { title, description, author, category_id, file_url, cover_url, writer_id } = req.body;

  const query = 'INSERT INTO books (title, description, author, category_id, file_url, cover_url, writer_id) VALUES (?, ?, ?, ?, ?, ?, ?)';
  db.query(query, [title, description, author, category_id, file_url, cover_url, writer_id], (error, results) => {
    if (error) {
      return res.status(500).json({ error: 'Erro ao criar livro' });
    }
    res.status(201).json({ message: 'Livro criado com sucesso!' });
  });
};

// Função para listar livros
const getBooks = (req, res) => {
  const query = 'SELECT * FROM books';
  db.query(query, (error, results) => {
    if (error) {
      return res.status(500).json({ error: 'Erro ao listar livros' });
    }
    res.status(200).json(results);
  });
};

module.exports = {
  createBook,
  getBooks,
};
