// models/activationCodeModel.js
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./userModel");  // Importe o modelo User

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
    onDelete: 'CASCADE', // Remove códigos de ativação quando o usuário for deletado
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
  // Relacionamento com o modelo User
  ActivationCode.belongsTo(models.User, {
    foreignKey: 'user_id', // Chave estrangeira para o User
    as: 'user',  // Nome do relacionamento
  });
};

module.exports = ActivationCode;
