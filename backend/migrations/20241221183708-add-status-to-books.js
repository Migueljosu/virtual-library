'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('books', 'status', {
      type: Sequelize.ENUM('draft', 'published'),  // Tipos possíveis para o status
      defaultValue: 'draft',  // Valor padrão
      allowNull: false,  // O campo não pode ser nulo
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Remover a coluna status, caso a migração seja revertida
    await queryInterface.removeColumn('books', 'status');
  },
};
