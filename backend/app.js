//app.js backend
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const googleRoutes = require('./routes/googleRoutes');
const dotenv = require('dotenv');
const bookRoutes = require('./routes/bookRoutes');
const fileUpload = require('express-fileupload');
const categoryRoutes = require('./routes/categoryRoutes');

require('dotenv').config();


const app = express();


const { trainModel } = require('./config/brain');
trainModel();

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
app.use(express.urlencoded({ extended: true }));  // Para lidar com dados de formulários
app.use(fileUpload());

// Rotas
app.use("/api/users", authRoutes);
app.use('/google', googleRoutes);
app.use('/api', bookRoutes);
// Rotas de categoria
app.use('/api', categoryRoutes);  // Prefixando todas as rotas de categoria com '/api'



module.exports = app;
    