//app.js backend
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");

const app = express();

// Middlewares
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) {
        // Permitir solicitações sem um cabeçalho de origem (e.g., Postman ou localhost)
        return callback(null, true);
      }

      // Lista de padrões permitidos
      const allowedOrigins = [
        /^http:\/\/192\.168\.\d+\.\d+:\d+$/, // Redes locais (192.168.x.x)
        /^http:\/\/localhost:\d+$/,          // Localhost com qualquer porta
        /^http:\/\/(localhost|\d+\.\d+\.\d+\.\d+):\d+$/, // Permitir localhost ou IPs na rede local
      ];

      // Verifica se a origem está na lista permitida
      if (allowedOrigins.some((pattern) => pattern.test(origin))) {
        return callback(null, true); // Origem permitida
      }

      // Origem não permitida
      callback(new Error(`Origin ${origin} is not allowed by CORS`));
    },
    credentials: true, // Permitir cookies e autenticação
  })
);

app.use(express.json());

// Rotas
app.use("/api/users", authRoutes);

module.exports = app;
    