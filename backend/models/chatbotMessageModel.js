const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./userModel');

const ChatbotMessage = sequelize.define('ChatbotMessage', {
  message: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  response: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  created_at: {
    type: DataTypes.TIMESTAMP,
    defaultValue: Sequelize.NOW
  }
}, {
  timestamps: false
});

ChatbotMessage.belongsTo(User, { foreignKey: 'user_id' });

module.exports = ChatbotMessage;
