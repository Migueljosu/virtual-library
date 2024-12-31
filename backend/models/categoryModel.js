// models/categoryModel.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Category = sequelize.define('Category', {
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
  },
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

Category.associate = function(models) {
  Category.hasMany(models.Book, { foreignKey: 'category_id', as: 'books' });
};

module.exports = Category;
