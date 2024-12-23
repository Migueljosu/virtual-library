// migrations/YYYYMMDDHHMMSS-create-activation-codes.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ActivationCodes', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',  // Nome da tabela referenciada
          key: 'id',  // Chave primária da tabela Users
        },
        onDelete: 'CASCADE',  // Se o usuário for deletado, o código de ativação será deletado também
      },
      code: {
        type: Sequelize.STRING(6),  // Código de ativação de 6 caracteres
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ActivationCodes');
  },
};
