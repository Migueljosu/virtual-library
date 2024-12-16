const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./userModel');
const Book = require('./bookModel');

const Recommendation = sequelize.define('Recommendation', {
  score: {
    type: DataTypes.FLOAT,
    defaultValue: 0
  },
  created_at: {
    type: DataTypes.TIMESTAMP,
    defaultValue: Sequelize.NOW
  }
}, {
  timestamps: false
});

Recommendation.belongsTo(User, { foreignKey: 'user_id' });
Recommendation.belongsTo(Book, { foreignKey: 'book_id' });

module.exports = Recommendation;
