"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("reading_progress", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users", // Nome da tabela de usuários
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      book_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "books", // Nome da tabela de livros
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      last_page: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      total_pages: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      is_finished: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("reading_progress");
  },
};
