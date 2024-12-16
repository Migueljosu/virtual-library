require('dotenv').config();

module.exports = {
  port: 5000,
  development: {
    username: process.env.DB_USER || 'root', // Nome de usuário do MySQL
    password: process.env.DB_PASSWORD || 'Miguel29@Luis', // Senha do MySQL
    database: process.env.DB_NAME || 'virtual_library', // Nome do banco de dados
    host: process.env.DB_HOST || 'localhost', // Endereço do servidor MySQL
    dialect: 'mysql',
    logging: false, // Pode desabilitar o log se necessário
  },
  test: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'Miguel29@Luis',
    database: process.env.DB_NAME || 'virtual_library_test',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
  },
  production: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'Miguel29@Luis',
    database: process.env.DB_NAME || 'virtual_library_production',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    logging: false,
  }
};
