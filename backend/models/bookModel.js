const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Category = require('./categoryModel');
const User = require('./userModel');
const Review = require('./reviewModel');
const Recommendation = require('./recommendationModel');
const Reaction = require('./reactionModel');

const Book = sequelize.define('Book', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  author: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  category_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Category,
      key: 'id'
    },
    allowNull: false
  },
  publication_date: {
    type: DataTypes.DATE,
    allowNull: true
  },
  is_free: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    defaultValue: 0.0
  },
  file_url: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  cover_url: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  writer_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    },
    allowNull: false
  },
  rating_avg: {
    type: DataTypes.FLOAT,
    allowNull: true,
    defaultValue: 0.0
  },
  is_featured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  status: {
    type: DataTypes.ENUM('draft', 'published'),
    defaultValue: 'draft',
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  timestamps: false,
  createdAt: 'created_at',
  updatedAt: false
});

Book.associate = function (models) {
  Book.belongsTo(models.Category, { foreignKey: 'category_id', as: 'category' });
  Book.belongsTo(models.User, { foreignKey: 'writer_id', as: 'writer' });
  Book.hasMany(models.Recommendation, { foreignKey: 'book_id', as: 'recommendations' });
  Book.hasMany(models.Review, { foreignKey: 'book_id', as: 'reviews' });
  Book.hasMany(models.Reaction, { foreignKey: 'book_id', as: 'reactions' });
};

module.exports = Book;
