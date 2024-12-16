const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./userModel');

const Testimonial = sequelize.define('Testimonial', {
  message: {
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

Testimonial.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Testimonial;
