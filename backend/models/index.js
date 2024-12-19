// models/index.js

const Sequelize = require('sequelize');

// Configuração do banco de dados
const sequelize = new Sequelize({
  dialect: 'mysql', // Ou 'postgres', 'sqlite', 'mariadb', etc.
  host: 'localhost', // Host do banco de dados
  username: 'root', // Nome de usuário
  password: 'Miguel29@Luis', // Senha
  database: 'virtual_library', // Nome do banco de dados
  define: {
    timestamps: false // Isso pode ser configurado conforme necessário
  }
});

module.exports = sequelize;
