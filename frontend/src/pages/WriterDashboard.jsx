import React, { useState } from "react";
import logo from "../assets/images/logo.svg";
import { scroller } from "react-scroll"; // Importa a função de rolagem da biblioteca react-scroll
import WriterBooks from "../components/WriterBooks";
import WriterStats from "../components/WriterStats";
import CreateNewBook from "../components/CreateNewBook";
import BlogArticles from "../components/BlogArticles";
import Contact from "../components/Contact";
import Events from "../components/Events";
import SearchBar from "../components/SearchBar";
import PopularBooks from "../components/PopularBooks";
import Footer from "../components/Footer";
import Chatbot from "../components/Chatbot"; // Importa o componente do Chatbot
import { FaRobot, FaSignOutAlt } from "react-icons/fa"; // Corretamente importar o FaRobot
import { useNavigate } from "react-router-dom"; // Navegação

const WriterDashboard = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loadingLogout, setLoadingLogout] = useState(false); // Estado para controle do loader
  const navigate = useNavigate(); // Hook de navegação

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuItemClick = (id) => {
    setIsMenuOpen(false); // Fecha o menu após clique
    // Faz a rolagem suave até o elemento desejado
    scroller.scrollTo(id, {
      duration: 800,
      smooth: true,
      offset: -70, // Ajuste para o menu fixo
    });
  };

  const handleLogout = () => {
    setLoadingLogout(true); // Ativa o estado de loading

    setTimeout(() => {
      localStorage.removeItem("user"); // Remove o usuário do localStorage
      setLoadingLogout(false); // Desativa o estado de loading
      window.location.reload(); // Força a atualização da página
      navigate("/login"); // Redireciona para a página de login
    }, 2000); // Atraso de 2 segundos para mostrar o loader
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Cabeçalho Fixo */}
      <header className="bg-white text-wood-brown fixed top-0 left-0 w-full z-50 shadow-md">
        <nav className="container mx-auto flex justify-between items-center p-4 relative">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src={logo}
              alt="Virtual Library Logo"
              className="h-24 w-24 mr-2 filter contrast-150 drop-shadow-lg"
            />
            <h1 className="text-2xl font-bold">Writer Dashboard</h1>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden flex items-center z-50">
            <button
              onClick={toggleMenu}
              className="text-wood-brown focus:outline-none z-50 relative"
            >
              {isMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-8 h-8 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Menu Links */}
          <div
            className={`${
              isMenuOpen
                ? "fixed top-0 left-0 w-full h-full bg-wood-brown bg-opacity-70 flex flex-col items-center justify-center space-y-6 z-40"
                : "hidden"
            } lg:flex lg:space-x-8 lg:static lg:bg-transparent lg:flex-row lg:space-y-0`}
          >
            {[ 
              { id: "statistics", label: "Statistics" },
              { id: "post-book", label: "Post Book" },
              { id: "blog", label: "Blog" },
              { id: "events", label: "Events" },
              { id: "contact", label: "Contact" },
              { id: "create-new-book", label: "My Books" },
              { id: "book-library", label: "Book Library" },
              { id: "search", label: "Search" },
            ].map((section) => (
              <button
                key={section.id}
                onClick={() => handleMenuItemClick(section.id)}
                className={`text-xl lg:text-lg transition duration-300 transform hover:scale-110 hover:text-yellow-400 hover:drop-shadow-lg ${
                  isMenuOpen ? "text-white" : "text-wood-brown"
                }`}
              >
                {section.label}
              </button>
            ))}
            {/* Botão de Logout */}
            <button
              onClick={handleLogout}
              className="text-xl lg:text-lg transition duration-300 transform hover:scale-110 hover:text-yellow-400 hover:drop-shadow-lg text-wood-brown"
              disabled={loadingLogout}
            >
              {loadingLogout ? (
                <div className="loader spinner-border animate-spin h-5 w-5 border-t-2 border-yellow-400"></div> // Loader
              ) : (
                <>
                  <FaSignOutAlt className="inline mr-2" />
                  Logout
                </>
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Conteúdo Principal */}
      <main className="container mx-auto p-6 pt-36">
        {/* Secção de Estatísticas */}
        <section id="statistics" className="mb-8">
          <h2 className="text-xl font-semibold text-wood-brown mb-4">
            Your Statistics
          </h2>
          <WriterStats />
        </section>

        {/* Secção de Gestão de Livros */}
        <section id="post-book" className="mb-8">
          <h2 className="text-xl font-semibold text-wood-brown mb-4">
            Manage Your Books
          </h2>
          <WriterBooks />
        </section>

        {/* Secção para Criar um Novo Livro */}
        <section id="create-new-book">
          <h2 className="text-xl font-semibold text-wood-brown mb-4">
            Create a New Book
          </h2>
          <CreateNewBook />
        </section>

        {/* Secção de Blog */}
        <section id="blog" className="mb-8">
          <h2 className="text-xl font-semibold text-wood-brown mb-4 mt-5">
            Your Blog
          </h2>
          <BlogArticles />
        </section>

        {/* Secção de Eventos */}
        <section id="events" className="mb-8">
          <h2 className="text-xl font-semibold text-wood-brown mb-4">
            Upcoming Events
          </h2>
          <Events />
        </section>

        {/* Barra de Pesquisa */}
        <section id="search" className="mb-8">
          <h2 className="text-xl font-semibold text-wood-brown mb-4">
            Search for Books
          </h2>
          <SearchBar />
        </section>

        {/* Livros Populares */}
        <section id="book-library" className="mb-8">
          <h2 className="text-xl font-semibold text-wood-brown mb-4">
            Popular Books
          </h2>
          <PopularBooks />
        </section>

        {/* Secção de Contato */}
        <section id="contact" className="mb-8">
          <h2 className="text-xl font-semibold text-wood-brown mb-4">
            Contact Us
          </h2>
          <Contact />
        </section>
      </main>

      {/* Rodapé */}
      <Footer />
      {/* Renderiza o chatbot se for aberto */}
      {isChatOpen && <Chatbot closeChat={toggleChat} />}

      {/* Botão para abrir o chatbot */}
      <button
        onClick={toggleChat}
        className="fixed bottom-8 left-8 p-4 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600"
      >
        <FaRobot className="text-white" />
      </button>
    </div>
  );
};

export default WriterDashboard;
