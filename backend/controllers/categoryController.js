const Category  = require("../models/categoryModel");

// Criar uma nova categoria
exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    // Criar a categoria
    const category = await Category.create({
      name,
    });

    res.status(201).json({
      message: "Categoria criada com sucesso!",
      category,
    });
  } catch (error) {
    console.error(error); // Loga o erro completo para o console
    res.status(500).json({
      message: "Erro ao criar categoria",
      error: error.message, // Retorna a mensagem de erro
    });
  }
};

// Atualizar uma categoria existente
exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    // Procurar a categoria
    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(404).json({ message: "Categoria não encontrada!" });
    }

    // Atualizar o nome da categoria
    category.name = name || category.name;
    await category.save();

    res.status(200).json({
      message: "Categoria atualizada com sucesso!",
      category,
    });
  } catch (error) {
    console.error(error); // Loga o erro completo para o console
    res.status(500).json({
      message: "Erro ao atualizar categoria",
      error: error.message, // Retorna a mensagem de erro
    });
  }
};

// Deletar uma categoria
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    // Procurar a categoria
    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(404).json({ message: "Categoria não encontrada!" });
    }

    // Deletar a categoria
    await category.destroy();

    res.status(200).json({ message: "Categoria deletada com sucesso!" });
  } catch (error) {
    console.error(error); // Loga o erro completo para o console
    res.status(500).json({
      message: "Erro ao deletar categoria",
      error: error.message, // Retorna a mensagem de erro
    });
  }
};

// Listar todas as categorias
exports.getCategories = async (req, res) => {
  try {
    // Buscar todas as categorias
    const categories = await Category.findAll();

    res.status(200).json({ categories });
  } catch (error) {
    console.error(error); // Loga o erro completo para o console
    res.status(500).json({
      message: "Erro ao buscar categorias",
      error: error.message, // Retorna a mensagem de erro
    });
  }
};
