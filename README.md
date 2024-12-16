# Virtual Library

A **Virtual Library** é uma plataforma web que permite aos usuários explorar uma vasta coleção de livros, fazer recomendações, ler resenhas, comprar livros e muito mais. O sistema inclui uma interface para leitores, uma área administrativa, um motor de busca avançada, integração com aprendizado de máquina para recomendações e um chatbot para ajudar na navegação.

## Funcionalidades

- **Catálogo de Livros**: Navegue e explore uma vasta coleção de livros, tanto gratuitos quanto pagos.
- **Sistema de Recomendação**: Aprendizado de máquina para recomendar livros com base nas preferências dos usuários.
- **Área Administrativa**: Gerenciamento de livros, usuários e recomendações.
- **Loja de Livros**: Compre livros diretamente da plataforma.
- **Chatbot de Recomendações**: Interaja com o chatbot para obter sugestões personalizadas.
- **Sistema de Comentários**: Deixe comentários e avaliações nos livros.

## Tecnologias Utilizadas

### Backend
- **Node.js**: Ambiente de execução JavaScript no servidor.
- **Express**: Framework para construção do servidor.
- **Sequelize**: ORM para interagir com o banco de dados MySQL.
- **MySQL**: Banco de dados relacional utilizado para armazenar dados de usuários, livros e transações.
- **Axios**: Para realizar requisições HTTP entre o frontend e o backend.
- **Brain.js**: Biblioteca de aprendizado de máquina utilizada para fornecer recomendações personalizadas aos usuários com base no comportamento e histórico de navegação.
- **Elasticsearch**: Sistema de busca avançada para permitir pesquisas rápidas e filtradas de livros, autores, e outros conteúdos na plataforma.

### Frontend
- **React.js**: Biblioteca JavaScript para construção da interface de usuário.
- **Tailwind CSS**: Framework CSS para estilização.
- **Webpack**: Empacotador de módulos.
- **Concurrently**: Para rodar o backend e o frontend simultaneamente durante o desenvolvimento.

## Como Rodar o Projeto

### 1. Clonar o repositório

Clone o repositório para sua máquina local:

```bash
git clone https://github.com/Migueljosu/virtual-library.git
