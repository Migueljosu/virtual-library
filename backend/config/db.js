const { Sequelize } = require('sequelize');
require('dotenv').config();

// Carregar configurações do banco de dados
const config = require('../config/config.js');
const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

// Conectar ao banco de dados
const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    logging: dbConfig.logging, // Defina para true se quiser ver os logs de SQL
  }
);

// Teste da conexão
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
  } catch (error) {
    console.error('Não foi possível conectar ao banco de dados:', error);
  }
}

testConnection();

module.exports = sequelize;
