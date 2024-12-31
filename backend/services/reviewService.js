const { Review, User, Book, Reaction } = require('../models');

async function fetchUserReviews(userId) {
  return await Review.findAll({
    where: { user_id: userId },
    include: [
      { model: Book, as: 'book', attributes: ['id', 'title'] },
      { model: Reaction, as: 'reactions', attributes: ['id', 'reaction_type'] },
    ],
  });
}

async function fetchReviewDetails(reviewId) {
  return await Review.findOne({
    where: { id: reviewId },
    include: [
      { model: Book, as: 'book', attributes: ['id', 'title'] },
      { model: User, as: 'user', attributes: ['id', 'name'] },
      { model: Reaction, as: 'reactions', attributes: ['id', 'reaction_type'] },
    ],
  });
}

module.exports = { fetchUserReviews, fetchReviewDetails };
