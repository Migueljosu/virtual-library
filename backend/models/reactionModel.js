const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./userModel');
const Review = require('./reviewModel');

const Reaction = sequelize.define('Reaction', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  reaction_type: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
    allowNull: false,
  },
}, {
  timestamps: false,
  createdAt: 'created_at',
  updatedAt: false,
});

Reaction.associate = function (models) {
  Reaction.belongsTo(models.User, { foreignKey: 'user_id', as: 'user_reactions' });
  Reaction.belongsTo(models.Book, { foreignKey: 'book_id', as: 'book' });
};

module.exports = Reaction;
