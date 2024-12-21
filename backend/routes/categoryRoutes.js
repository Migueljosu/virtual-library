const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// Rota para criar uma categoria
router.post('/categories', categoryController.createCategory);

// Rota para atualizar uma categoria
router.put('/categories/:id', categoryController.updateCategory);

// Rota para deletar uma categoria
router.delete('/categories/:id', categoryController.deleteCategory);

// Rota para listar todas as categorias
router.get('/categories', categoryController.getCategories);

module.exports = router;
