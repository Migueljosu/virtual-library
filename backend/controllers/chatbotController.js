const { Book, ChatbotMessage } = require("../models");
const { Sequelize } = require('sequelize');
const axios = require('axios');

const getChatbotResponse = async (req, res) => {
  const { message } = req.body;

  if (!message) return res.status(400).json({ message: 'Message is required' });

  try {
    // Verificar se a mensagem contém a palavra 'livro'
    if (message.toLowerCase().includes('livro')) {
      const bookTitle = message.replace('livro', '').trim(); // Remover a palavra 'livro' e pegar o título
      console.log('Searching for book title:', bookTitle); // Debug: Verificando o título do livro

      // Buscar o livro no banco de dados usando findAll
      const books = await Book.findAll({
        where: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('title')), 'LIKE', `%${bookTitle.toLowerCase()}%`),  // Busca insensível a maiúsculas/minúsculas
        limit: 1,  // Limitar para um único resultado
      });

      // Verificar se algum livro foi encontrado
      if (books.length > 0) {
        const book = books[0]; // O primeiro livro encontrado
        const botResponse = `Encontrei um livro! Título: ${book.title}, Autor: ${book.author}.`;

        // Armazenar a mensagem e a resposta no banco
        await ChatbotMessage.create({
          message: message,
          response: botResponse,
          user_id: req.user.id, // Assumindo que o usuário está autenticado
        });

        return res.json({ response: botResponse });
      } else {
        const botResponse = 'Desculpe, não encontrei nenhum livro com esse título.';

        // Armazenar a mensagem e a resposta no banco
        await ChatbotMessage.create({
          message: message,
          response: botResponse,
          user_id: req.user.id, // Assumindo que o usuário está autenticado
        });
 
        return res.json({ response: botResponse });
      }
    } else {
      // Enviar a mensagem para o modelo Hugging Face para obter a resposta da IA
      const responseFromAI = await axios.post(
        'https://api-inference.huggingface.co/models/gpt2', // Escolher o modelo apropriado, como o GPT-2 ou GPT-3
        {
          inputs: message,
        },
        {
          headers: {
            Authorization: `Bearer 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`,
          }
        }
      );

      // Obter a resposta da IA
      const aiResponse = responseFromAI.data[0].generated_text;

      // Armazenar a pergunta e resposta no banco
      await ChatbotMessage.create({
        message: message,
        response: aiResponse,
        user_id: req.user.id, // Assumindo que o usuário está autenticado
      });

      return res.json({ response: aiResponse });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error with the chatbot' });
  }
};

module.exports = { getChatbotResponse };
