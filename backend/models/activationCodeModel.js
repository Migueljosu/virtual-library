// models/activationCodeModel.js
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./userModel");

const ActivationCode = sequelize.define('ActivationCode', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  code: {
    type: DataTypes.STRING(6),
    allowNull: false,
  },
}, {
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
});

ActivationCode.associate = function(models) {
  ActivationCode.belongsTo(models.User, {
    foreignKey: 'user_id',
    as: 'user',
  });
};

module.exports = ActivationCode;
