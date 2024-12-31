// models/userModel.js
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Book = require('./bookModel');
const Review = require('./reviewModel');
const Recommendation = require('./recommendationModel');
const Reaction = require('./reactionModel');
const ActivationCode = require('./activationCodeModel');
const Testimonial = require('./testimonialModel');

const User = sequelize.define('User', {
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
    unique: true,
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
    defaultValue: "free",
  },
  profile_picture: {
    type: Sequelize.STRING(255),
    allowNull: true,
  },
  is_active: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
    allowNull: false,
  },
  last_login: {
    type: Sequelize.DATE,
    allowNull: true,
  },
  activation_date: {
    type: Sequelize.DATE,
    allowNull: true,
  },
  is_verified: {
    type: Sequelize.BOOLEAN,
    allowNull: true,
  },
}, {
  timestamps: true,
  createdAt: "createdAt",
  updatedAt: "updatedAt",
});

User.associate = function (models) {
  User.hasMany(models.Book, { foreignKey: "writer_id", as: "books" });
  User.hasMany(models.ActivationCode, { foreignKey: "user_id", as: "activationCodes" });
  User.hasMany(models.Review, { foreignKey: "user_id", as: "reviews" });
  User.hasMany(models.Recommendation, { foreignKey: "user_id", as: "recommendations" });
  User.hasMany(models.Reaction, { foreignKey: "user_id", as: "reactions" });
  User.hasMany(models.Testimonial, { foreignKey: "user_id", as: "testimonials" });
};

module.exports = User;
