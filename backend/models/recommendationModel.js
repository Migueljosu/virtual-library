const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./userModel');
const Book = require('./bookModel');

const Recommendation = sequelize.define('Recommendation', {
  score: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  interaction_type: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  interaction_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  timestamps: false,
  createdAt: 'created_at',
  updatedAt: false,
});

Recommendation.associate = function (models) {
  Recommendation.belongsTo(models.Book, { foreignKey: 'book_id', as: 'book' });
  Recommendation.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
};

module.exports = Recommendation;
