const db = require('../config/db');

// Função para listar todos os livros
const getAllBooks = async () => {
  const query = 'SELECT * FROM books';
  return await db.query(query);
};

// Função para adicionar um novo livro
const addNewBook = async (bookData) => {
  const { title, description, author, category_id, file_url, cover_url, writer_id } = bookData;
  const query = 'INSERT INTO books (title, description, author, category_id, file_url, cover_url, writer_id) VALUES (?, ?, ?, ?, ?, ?, ?)';
  return await db.query(query, [title, description, author, category_id, file_url, cover_url, writer_id]);
};

module.exports = {
  getAllBooks,
  addNewBook,
};
