const app = require('./app');
const { port } = require('./config/config');

// Middleware para permitir CORS (Cross-Origin Resource Sharing)
const cors = require('cors');
app.use(cors());

// Definir uma rota para enviar a mensagem para o front-end
app.get('/', (req, res) => {
  res.json({ message: 'Mensagem enviada do back-end para o front-end!' });
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Server rodando na porta ${port}`);
});
