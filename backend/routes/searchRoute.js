const express = require('express');
const loadDataIntoHaystack = require('../services/haystackService');
const { BM25Retriever } = require('haystack');

const router = express.Router();
let documentStore;

// Inicializa o store com dados filtrados
loadDataIntoHaystack({}).then(store => {
  documentStore = store;
});

router.post('/search', async (req, res) => {
  const { query, category, author, rating, recommendation, year, availability } = req.body;

  if (!documentStore) {
    return res.status(500).json({ message: 'Document store não inicializado.' });
  }

  try {
    // Passa os parâmetros da requisição para carregar os dados filtrados
    const queryParams = { query, category, author, rating, recommendation, year, availability };
    const documentStore = await loadDataIntoHaystack(queryParams);

    const retriever = new BM25Retriever(documentStore);

    // Realiza a busca no índice
    const results = await retriever.retrieve(query);

    const formattedResults = results.map(result => ({
      title: result.meta.title,
      author: result.meta.author,
      description: result.content,
      file_url: result.meta.file_url
    }));

    return res.json({ results: formattedResults });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro na consulta ao Haystack.' });
  }
});

module.exports = router;
