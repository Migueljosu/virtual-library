const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const googleRoutes = require("./routes/googleRoutes");
const bookRoutes = require("./routes/bookRoutes");
const fileUpload = require("express-fileupload");
const categoryRoutes = require("./routes/categoryRoutes");
const statsRoutes = require("./routes/statsRoutes");
const corsOptions = require("./middleware/cors"); // Middleware CORS personalizado
const path = require("path");
const chatbotRoutes = require('./routes/chatbot');

require("dotenv").config();

const app = express();

// Middlewares
app.use(cors(corsOptions)); // Middleware CORS com suporte para redes locais
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

// Servir arquivos estáticos
app.use(
  "/uploads/book-cover",
  express.static(path.join(__dirname, "uploads/book-cover"))
);
app.use(
  "/uploads/book-file",
  express.static(path.join(__dirname, "uploads/book-file"))
);

// Rotas
app.use("/api/users", authRoutes);
app.use("/google", googleRoutes);
app.use("/api", bookRoutes);
app.use("/api", categoryRoutes);
app.use("/api", statsRoutes);
app.use('/api/chatbot', chatbotRoutes);

module.exports = app;
