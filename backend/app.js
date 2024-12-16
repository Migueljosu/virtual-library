const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');
const { errorHandler } = require('./middleware/errorMiddleware');
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use('/auth', authRoutes);
app.use('/books', bookRoutes);

// Middleware de erros
app.use(errorHandler);

module.exports = app;
