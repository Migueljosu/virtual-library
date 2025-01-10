const sequelize = require('../config/db');
const User = require('./userModel');
const Book = require('./bookModel');
const Category = require('./categoryModel');
const Review = require('./reviewModel');
const Reaction = require('./reactionModel');
const Recommendation = require('./recommendationModel');
const ActivationCode = require('./activationCodeModel');
const Donation = require('./donationModel');
const Favorites = require('./favoritesModel');
const ReadingStatus = require('./readingStatusModel');
const Testimonial = require('./testimonialModel');
const ContactUs = require('./contactUsModel');
const ChatbotMessage = require('./chatbotMessageModel')

// Inicialização dos modelos
const models = {
  User,
  Book,
  Category,
  Review,
  Reaction,
  Recommendation,
  ActivationCode,
  Donation,
  Testimonial,
  ContactUs,
  Favorites,
  ReadingStatus,
  ChatbotMessage,
};

// Configurando as associações entre os modelos
Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

// Exportando os modelos e a instância do Sequelize
module.exports = { ...models, sequelize };
