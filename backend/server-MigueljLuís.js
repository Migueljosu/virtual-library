//server.js
const app = require("./app");
const sequelize = require("./config/db");
require("dotenv").config();

const PORT = 5000;

// Sincronizar com o banco de dados e iniciar o servidor
sequelize
  .sync()
  .then(() => {
    console.log("Banco de dados conectado e sincronizado com sucesso!");
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Servidor rodando em:`);
      console.log(`  Local:            http://localhost:${PORT}`);
      console.log(
        `  Rede Local:       http://${require("ip").address()}:${PORT}`
      );
    });
  })
  .catch((err) => {
    console.error("Erro ao conectar com o banco de dados:", err.message || err);
  });
