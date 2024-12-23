const fs = require("fs");
const path = require("path");
const Book = require("../models/bookModel");
const Category = require("../models/categoryModel");
const User = require("../models/userModel");

const createBook = async (req, res) => {
  try {
    // Verifique se os arquivos foram enviados
    if (!req.files || !req.files.file || !req.files.coverImage) {
      return res.status(400).json({ error: "Arquivo e capa são obrigatórios" });
    }

    const { title, description, author, category, status, isFree, price, publicationDate } = req.body;

    // Validação de campos obrigatórios
    if (!title || !description || !author || !category || !status || !publicationDate) {
      return res.status(400).json({ error: "Todos os campos obrigatórios devem ser preenchidos" });
    }

    // Definir caminhos dos arquivos
    const uploadDir = path.join(__dirname, "..", "uploads");

    // Criar as pastas de capa e arquivo, se não existirem
    const coverDir = path.join(uploadDir, "book-cover");
    const fileDir = path.join(uploadDir, "book-file");

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    if (!fs.existsSync(coverDir)) {
      fs.mkdirSync(coverDir);
    }
    if (!fs.existsSync(fileDir)) {
      fs.mkdirSync(fileDir);
    }

    // Definir o caminho final dos arquivos
    const bookPath = path.join(fileDir, req.files.file.name);
    const coverPath = path.join(coverDir, req.files.coverImage.name);

    // Salvar os arquivos localmente
    await req.files.file.mv(bookPath);
    await req.files.coverImage.mv(coverPath);

    // Criar o livro no banco de dados
    const book = await Book.create({
      title,
      description,
      author,
      file_url: bookPath,  // Caminho do arquivo do livro
      cover_url: coverPath,  // Caminho da imagem de capa
      category_id: category,
      status,
      is_free: isFree,
      price,
      publication_date: publicationDate,
      writer_id: req.user.id, // Associando o livro ao usuário logado
    });

    return res.status(201).json({ book });
  } catch (error) {
    console.error("Erro ao criar o livro:", error.message);
    console.error(error.stack);

    return res.status(500).json({
      error: "Erro ao criar o livro",
      message: error.message || "Erro desconhecido",
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    });
  }
};

module.exports = { createBook };
