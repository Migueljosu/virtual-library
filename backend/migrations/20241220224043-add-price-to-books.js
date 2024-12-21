"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("books", "price", {
      type: Sequelize.DECIMAL(10, 2), // Precisão total 10 dígitos, 2 casas decimais
      allowNull: true,
      defaultValue: 0.00, // Valor padrão
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("books", "price");
  },
};
