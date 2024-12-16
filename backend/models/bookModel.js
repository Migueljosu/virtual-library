const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./userModel');
const Category = require('./categoryModel');

const Book = sequelize.define('Book', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  author: {
    type: DataTypes.STRING,
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
  file_url: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cover_url: {
    type: DataTypes.STRING,
    allowNull: true
  },
  writer_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    },
    allowNull: false
  }
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false
});

module.exports = Book;
