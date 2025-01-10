const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Certifique-se de que o sequelize está configurado corretamente
const User = require('./userModel'); // Importando o modelo de User

const ChatbotMessage = sequelize.define('ChatbotMessage', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  message: {
    type: DataTypes.STRING(255), // Definindo o tamanho para ser mais específico
    allowNull: false,
  },
  response: {
    type: DataTypes.STRING(255), // Definindo o tamanho para ser mais específico
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User, // Associação com o modelo de User
      key: 'id',
    },
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW, // Default para a data atual
  },
}, {
  timestamps: false, // Desabilitar o uso de timestamps automáticos
  createdAt: 'created_at', // Usar 'created_at' como o campo para data de criação
  updatedAt: false, // Desabilitar o campo 'updated_at'
});

ChatbotMessage.belongsTo(User, { foreignKey: 'user_id', as: 'user' }); // Relacionamento com o modelo User

module.exports = ChatbotMessage;
