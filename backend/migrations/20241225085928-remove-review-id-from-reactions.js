'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Remover a coluna review_id da tabela Reactions
    await queryInterface.removeColumn('Reactions', 'review_id');
  },

  down: async (queryInterface, Sequelize) => {
    // Caso precise reverter, adicionar a coluna review_id novamente
    await queryInterface.addColumn('Reactions', 'review_id', {
      type: Sequelize.INTEGER,
      allowNull: true, // ou false, dependendo do comportamento que você deseja
    });
  }
};
