//app.js
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const googleRoutes = require('./routes/googleRoutes');
const bookRoutes = require('./routes/bookRoutes');
const fileUpload = require('express-fileupload');
const categoryRoutes = require('./routes/categoryRoutes');
const statsRoutes = require('./routes/statsRoutes');
const corsOptions = require('./middleware/cors');
require('dotenv').config();

const app = express();





// Middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));  // Para lidar com dados de formulários
app.use(fileUpload());

// Rotas
app.use("/api/users", authRoutes);
app.use('/google', googleRoutes);
app.use('/api', bookRoutes);
// Rotas de categoria
app.use('/api', categoryRoutes);  // Prefixando todas as rotas de categoria com '/api'
app.use('/api', statsRoutes);

module.exports = app;
