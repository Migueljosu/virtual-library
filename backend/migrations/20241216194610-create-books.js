"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("books", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      author: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      category_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "categories",
          key: "id",
        },
        onDelete: "RESTRICT",
      },
      publication_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      is_free: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      file_url: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      cover_url: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      writer_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      rating_avg: {
        type: Sequelize.FLOAT,
        allowNull: true,
        defaultValue: 0,
      },
      is_featured: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("books");
  },
};
