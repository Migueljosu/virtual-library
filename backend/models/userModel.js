const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Certifique-se de que o caminho está correto

const User = sequelize.define('Users', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,  // Garantir que o e-mail seja único
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    // Remover valor padrão para permitir diferentes valores de role
  },
  plan: {
    type: DataTypes.STRING,
    defaultValue: 'free', // Valor padrão para 'plan'
  }
});

module.exports = User;
