import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fazer a requisição para o back-end
    axios.get('http://localhost:5000/') // Endereço correto do back-end
      .then(response => {
        // Armazenar a mensagem recebida do back-end no estado
        setMessage(response.data.message);
      })
      .catch(error => {
        console.error('Erro ao obter a mensagem do back-end:', error);
      });
  }, []);

  return (
    <div className="App">
      <h1>Virtual Library</h1>
      <p>{message}</p>
    </div>
  );
}

export default App;
