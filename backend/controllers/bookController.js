const Book = require('../models/bookModel');
const { uploadFile } = require('../services/googleDriveService');
const path = require('path');
const fs = require('fs');

const createBook = async (req, res) => {
  try {
    const { title, description, author, genre, publicationDate, isFree, price } = req.body;

    // Verifica se os arquivos foram enviados
    if (!req.files || !req.files.file || !req.files.coverImage) {
      return res.status(400).json({ error: 'Arquivo e capa são obrigatórios' });
    }

    const bookFile = req.files.file;
    const coverImage = req.files.coverImage;

    // Diretório temporário para salvar os arquivos antes do upload para o Google Drive
    const uploadDir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }

    const bookPath = path.join(uploadDir, bookFile.name);
    const coverPath = path.join(uploadDir, coverImage.name);

    // Move os arquivos para o diretório temporário
    await bookFile.mv(bookPath);
    await coverImage.mv(coverPath);

    // Faz o upload para o Google Drive
    const bookUrl = await uploadFile(bookPath, bookFile.name, bookFile.mimetype);
    const coverUrl = await uploadFile(coverPath, coverImage.name, coverImage.mimetype);

    // Salva o livro no banco de dados com os links públicos
    const newBook = await Book.create({
      title,
      description,
      author,
      genre,
      publicationDate,
      isFree,
      price: isFree ? null : price,
      file_url: bookUrl,
      cover_url: coverUrl,
    });

    // Remove os arquivos locais após o upload
    fs.unlinkSync(bookPath);
    fs.unlinkSync(coverPath);

    res.status(201).json({ message: 'Livro cadastrado com sucesso!', book: newBook });
  } catch (error) {
    console.error('Erro ao criar livro:', error);
    res.status(500).json({ error: 'Erro ao criar livro' });
  }
};

module.exports = { createBook };
