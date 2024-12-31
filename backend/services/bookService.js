//bookService
const { Book, Review, Reaction, Recommendation, Category, User } = require('../models');
const { Op } = require('sequelize');

const searchBooks = async ({ query, page, limit }) => {
  // Construindo a lógica de paginação
  const offset = (page - 1) * limit;

  // Realizando a consulta com filtros e associações
  const books = await Book.findAndCountAll({
    where: {
      [Op.or]: [
        query ? { title: { [Op.like]: `%${query}%` } } : {},
        query ? { author: { [Op.like]: `%${query}%` } } : {},
      ],
    },
    limit,
    offset,
    include: [
      {
        model: Review,
        as: 'reviews',
        include: [
          {
            model: User,
            as: 'user',
          },
          {
            model: Reaction,
            as: 'reactions',
            include: [
              {
                model: User,
                as: 'user',
              },
            ],
          },
        ],
      },
      {
        model: Recommendation,
        as: 'recommendations',
        include: [
          {
            model: User,
            as: 'user',
          },
        ],
      },
      {
        model: Category,
        as: 'category',
        attributes: ['name'],
      },
    ],
  });

  // Formatando o resultado
  const formattedBooks = books.rows.map((book) => {
    const categoryName = book.category ? book.category.name : null;
    return {
      ...book.toJSON(),
      category_name: categoryName,
    };
  });

  return {
    totalItems: books.count,
    totalPages: Math.ceil(books.count / limit),
    currentPage: page,
    books: formattedBooks,
  };
};

module.exports = {
  searchBooks,
};
