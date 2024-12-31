const { User, Book, Review, Reaction, Recommendation } = require('../models');

async function fetchUserWithDetails(userId) {
  return await User.findOne({
    where: { id: userId },
    include: [
      { model: Book, as: 'books', attributes: ['id', 'title', 'status'] },
      { model: Review, as: 'reviews', attributes: ['id', 'rating', 'comment'] },
      { model: Recommendation, as: 'recommendations', attributes: ['id', 'score'] },
    ],
  });
}

module.exports = { fetchUserWithDetails };
