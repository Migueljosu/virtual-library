const User = require('../models/userModel');
const Book = require('../models/bookModel');
const Category = require('../models/categoryModel');

const getStats = async (req, res) => {
  try {
    const totalUsers = await User.count();
    const totalBooks = await Book.count();
    const totalCategories = await Category.count();

    return res.json({
      totalUsers,
      totalBooks,
      totalCategories,
    });
  } catch (error) {
    console.error('Erro ao obter os dados:', error);
    return res.status(500).json({ error: 'Erro ao obter os dados' });
  }
};

module.exports = {
  getStats,
};
