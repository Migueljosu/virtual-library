import React, { useState } from "react";
import logo from "../assets/images/logo.svg"; // ajuste o caminho conforme necessário
import { Link } from 'react-scroll'; // Importando o Link do react-scroll

import SearchBar from './SearchBar';
import NewBooks from './NewBooks';
import PopularBooks from './PopularBooks';
import BlogArticles from './BlogArticles';
import About from './About';
import Events from './Events';
import Testimonials from './Testimonials';
import Contact from './Contact';
import Newsletter from './Newsletter';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Função para alternar o estado do menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Função para fechar o menu ao clicar em um item
  const handleMenuItemClick = () => {
    setIsMenuOpen(false); // Fecha o menu
  };

  return (
    <header className="bg-white text-wood-brown">
      <nav className="container mx-auto flex justify-between items-center p-4 relative">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src={logo}
            alt="Virtual Library Logo"
            className="h-24 w-24 mr-2 filter contrast-150 drop-shadow-lg"
          />
        </div>

        {/* Menu Toggle for Mobile */}
        <div className="lg:hidden flex items-center z-50">
          <button
            onClick={toggleMenu}
            className="text-wood-brown focus:outline-none z-50 relative"
          >
            {isMenuOpen ? (
              // Ícone de "X" para fechar o menu
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
              // Ícone de hambúrguer para abrir o menu
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

        {/* Menu */}
        <div
          className={`${
            isMenuOpen
              ? "fixed top-0 left-0 w-full h-full bg-wood-brown bg-opacity-70 flex flex-col items-center justify-center space-y-6 z-40"
              : "hidden"
          } lg:flex lg:space-x-8 lg:static lg:bg-transparent lg:flex-row lg:space-y-0`}
        >
          <Link
            to="search"
            smooth={true}
            duration={1000} // Aumenta a duração do scroll para ser mais suave
            onClick={handleMenuItemClick} // Fecha o menu ao clicar no item
            className={`text-xl lg:text-lg transition duration-300 transform hover:scale-110 hover:text-yellow-400 hover:drop-shadow-lg ${
              isMenuOpen ? "text-white" : "text-wood-brown"
            }`}
          >
            Search
          </Link>
          <Link
            to="new-books"
            smooth={true}
            duration={1000}
            onClick={handleMenuItemClick} // Fecha o menu ao clicar no item
            className={`text-xl lg:text-lg transition duration-300 transform hover:scale-110 hover:text-yellow-400 hover:drop-shadow-lg ${
              isMenuOpen ? "text-white" : "text-wood-brown"
            }`}
          >
            New Books
          </Link>
          <Link
            to="popular-books"
            smooth={true}
            duration={1000}
            onClick={handleMenuItemClick} // Fecha o menu ao clicar no item
            className={`text-xl lg:text-lg transition duration-300 transform hover:scale-110 hover:text-yellow-400 hover:drop-shadow-lg ${
              isMenuOpen ? "text-white" : "text-wood-brown"
            }`}
          >
            Popular Books
          </Link>
          <Link
            to="blog-articles"
            smooth={true}
            duration={1000}
            onClick={handleMenuItemClick} // Fecha o menu ao clicar no item
            className={`text-xl lg:text-lg transition duration-300 transform hover:scale-110 hover:text-yellow-400 hover:drop-shadow-lg ${
              isMenuOpen ? "text-white" : "text-wood-brown"
            }`}
          >
            Blog
          </Link>
          <Link
            to="about"
            smooth={true}
            duration={1000}
            onClick={handleMenuItemClick} // Fecha o menu ao clicar no item
            className={`text-xl lg:text-lg transition duration-300 transform hover:scale-110 hover:text-yellow-400 hover:drop-shadow-lg ${
              isMenuOpen ? "text-white" : "text-wood-brown"
            }`}
          >
            About
          </Link>
          <Link
            to="events"
            smooth={true}
            duration={1000}
            onClick={handleMenuItemClick} // Fecha o menu ao clicar no item
            className={`text-xl lg:text-lg transition duration-300 transform hover:scale-110 hover:text-yellow-400 hover:drop-shadow-lg ${
              isMenuOpen ? "text-white" : "text-wood-brown"
            }`}
          >
            Events
          </Link>
          <Link
            to="testimonials"
            smooth={true}
            duration={1000}
            onClick={handleMenuItemClick} // Fecha o menu ao clicar no item
            className={`text-xl lg:text-lg transition duration-300 transform hover:scale-110 hover:text-yellow-400 hover:drop-shadow-lg ${
              isMenuOpen ? "text-white" : "text-wood-brown"
            }`}
          >
            Testimonials
          </Link>
          <Link
            to="contact"
            smooth={true}
            duration={1000}
            onClick={handleMenuItemClick} // Fecha o menu ao clicar no item
            className={`text-xl lg:text-lg transition duration-300 transform hover:scale-110 hover:text-yellow-400 hover:drop-shadow-lg ${
              isMenuOpen ? "text-white" : "text-wood-brown"
            }`}
          >
            Contact
          </Link>
          <Link
            to="newsletter"
            smooth={true}
            duration={1000}
            onClick={handleMenuItemClick} // Fecha o menu ao clicar no item
            className={`text-xl lg:text-lg transition duration-300 transform hover:scale-110 hover:text-yellow-400 hover:drop-shadow-lg ${
              isMenuOpen ? "text-white" : "text-wood-brown"
            }`}
          >
            Newsletter
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
