'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Adicionando as colunas created_at e updated_at na tabela 'categories'
    await queryInterface.addColumn('categories', 'created_at', {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      allowNull: false,
    });

    await queryInterface.addColumn('categories', 'updated_at', {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    // Removendo as colunas created_at e updated_at da tabela 'categories' (caso precise reverter a migração)
    await queryInterface.removeColumn('categories', 'created_at');
    await queryInterface.removeColumn('categories', 'updated_at');
  }
};
