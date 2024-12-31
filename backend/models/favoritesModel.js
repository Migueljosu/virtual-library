const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./userModel');
const Book = require('./bookModel');

const Favorites = sequelize.define('Favorites', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
    allowNull: false,
  },
  book_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Book,
      key: 'id',
    },
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  timestamps: false,
  tableName: 'favorites',
});

Favorites.associate = function (models) {
  Favorites.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  Favorites.belongsTo(models.Book, { foreignKey: 'book_id', as: 'book' });
};

module.exports = Favorites;
