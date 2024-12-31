'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    

    

    await queryInterface.changeColumn('testimonials', 'message', {
      type: Sequelize.TEXT,
      allowNull: false
    });

    await queryInterface.changeColumn('testimonials', 'created_at', {
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: false
    });

    await queryInterface.addColumn('testimonials', 'updated_at', {
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: true
    });
  },

  async down(queryInterface, Sequelize) {
    // Revertendo as alterações feitas no método 'up'
    await queryInterface.changeColumn('testimonials', 'id', {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    });

    await queryInterface.changeColumn('testimonials', 'user_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      },
      onDelete: 'CASCADE'
    });

    await queryInterface.changeColumn('testimonials', 'message', {
      type: Sequelize.TEXT,
      allowNull: false
    });

    await queryInterface.changeColumn('testimonials', 'created_at', {
      type: Sequelize.DATE,
      allowNull: false
    });

    await queryInterface.addColumn('testimonials', 'updated_at', {
      type: Sequelize.DATE,
      allowNull: true
    });
  }
};
