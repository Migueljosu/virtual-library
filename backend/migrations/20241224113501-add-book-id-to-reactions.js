'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Reactions', 'book_id', {
      type: Sequelize.INTEGER,
      allowNull: true, // Se não for obrigatório, pode ser true, senão altere para false
      references: {
        model: 'Books', // Nome da tabela Books
        key: 'id', // A chave primária da tabela Books
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL', // Ou 'CASCADE' se quiser excluir as reações quando o livro for excluído
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Reactions', 'book_id');
  },
};
