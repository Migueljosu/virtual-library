import React, { useState } from "react";
import logo from "../assets/images/logo.svg";
import { Link } from "react-router-dom";
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
import { FaRobot } from "react-icons/fa"; // Corretamente importar o FaRobot

const WriterDashboard = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    // Implementar lógica de logout aqui (por exemplo, limpar o estado do usuário ou redirecionar para uma página de login)
    console.log("Logout executado");
    // Redirecionar para a página de login
    window.location.href = "/login";
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
              { id: "logout", label: "Logout", action: handleLogout },
            ].map((section) => (
              <button
                key={section.id}
                onClick={() =>
                  section.action
                    ? section.action()
                    : handleMenuItemClick(section.id)
                }
                className={`text-xl lg:text-lg transition duration-300 transform hover:scale-110 hover:text-yellow-400 hover:drop-shadow-lg ${
                  isMenuOpen ? "text-white" : "text-wood-brown"
                }`}
              >
                {section.label}
              </button>
            ))}
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
