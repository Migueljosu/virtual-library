//server.js backend
const app = require("./app");
const sequelize = require("./config/db"); // Importe a instância do Sequelize
require("dotenv").config();

sequelize.sync()
  .then(() => {
    app.listen(5000, () => {
      console.log('Servidor rodando na porta 5000');
    });
  })
  .catch((err) => {
    console.error('Erro ao conectar com o banco de dados:', err);
  });
