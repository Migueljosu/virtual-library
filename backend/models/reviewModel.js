const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./userModel');
const Book = require('./bookModel');

const Review = sequelize.define('Review', {
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5
    }
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  created_at: {
    type: DataTypes.TIMESTAMP,
    defaultValue: Sequelize.NOW
  }
}, {
  timestamps: false
});

Review.belongsTo(User, { foreignKey: 'user_id' });
Review.belongsTo(Book, { foreignKey: 'book_id' });

module.exports = Review;
