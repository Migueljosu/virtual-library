const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./userModel');
const Book = require('./bookModel');

const ReadingStatus = sequelize.define('ReadingStatus', {
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
  status: {
    type: DataTypes.ENUM('in_progress', 'completed', 'not_started'),
    allowNull: false,
    defaultValue: 'not_started',
  },
  started_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  finished_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  timestamps: false,
  tableName: 'reading_status',
});

ReadingStatus.associate = function (models) {
  ReadingStatus.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  ReadingStatus.belongsTo(models.Book, { foreignKey: 'book_id', as: 'book' });
};

module.exports = ReadingStatus;
