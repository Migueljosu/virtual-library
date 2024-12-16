const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./userModel');

const Donation = sequelize.define('Donation', {
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  donation_date: {
    type: DataTypes.TIMESTAMP,
    defaultValue: Sequelize.NOW
  }
}, {
  timestamps: false
});

Donation.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Donation;
