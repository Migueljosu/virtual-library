// models/bookModel.js

const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./userModel');
const Category = require('./categoryModel');

const Book = sequelize.define('Book', {
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
    type: DataTypes.ENUM('draft', 'published'),  // Tipo ENUM com os valores possíveis
    defaultValue: 'draft',  // Valor padrão
    allowNull: false,  // O campo não pode ser nulo
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  timestamps: false, // Desabilita o gerenciamento automático de timestamps
  createdAt: 'created_at', // Define o campo para a data de criação
  updatedAt: false // Desabilita o campo de data de atualização
});

// Relacionamentos
Book.associate = function (models) {
  // Relacionamento com a tabela 'Category'
  Book.belongsTo(models.Category, {
    foreignKey: 'category_id',
    as: 'category'
  });

  // Relacionamento com a tabela 'User' (escritor)
  Book.belongsTo(models.User, {
    foreignKey: 'writer_id',
    as: 'writer'
  });
};

module.exports = Book;
