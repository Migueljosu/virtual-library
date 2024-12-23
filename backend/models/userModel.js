// models/userModel.js

const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true, // Garantir que o e-mail seja único
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    plan: {
      type: DataTypes.STRING(50),
      defaultValue: "free", // Valor padrão para o plano
    },
    profile_picture: {
      type: Sequelize.STRING(255),
      allowNull: true, // Permite nulo caso não tenha foto
    },
    is_active: {
      type: Sequelize.BOOLEAN,
      defaultValue: true, // Usuário ativo por padrão
      allowNull: false,
    },
    last_login: {
      type: Sequelize.DATE,
      allowNull: true, // Permite nulo caso nunca tenha feito login
    },
    activation_date: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    is_verified: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  }
);

User.associate = function (models) {
  // Relacionamento com o modelo Book (escritor)
  User.hasMany(models.Book, {
    foreignKey: "writer_id",
    as: "books",
  });
  // Relacionamento com o modelo ActivationCode
  User.hasMany(models.ActivationCode, {
    foreignKey: "user_id", // Chave estrangeira para o modelo ActivationCode
    as: "activationCodes", // Nome do relacionamento
  });
};

module.exports = User;
