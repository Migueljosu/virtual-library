import React, { useState } from "react";
import logo from "../assets/images/logo.svg";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuItemClick = () => {
    setIsMenuOpen(false); // Fecha o menu após clique
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
          {/* Seções da página inicial */}
          {[
            { id: "search", label: "Search" },
            { id: "new-books", label: "New Books" },
            { id: "popular-books", label: "Popular Books" },
            { id: "blog-articles", label: "Blog" },
            { id: "about", label: "About" },
            { id: "events", label: "Events" },
            { id: "testimonials", label: "Testimonials" },
            { id: "contact", label: "Contact" },
            { id: "newsletter", label: "Newsletter" },
          ].map((section) => (
            <a
              href={`#${section.id}`}
              key={section.id}
              onClick={handleMenuItemClick}
              className={`text-xl lg:text-lg transition duration-300 transform hover:scale-110 hover:text-yellow-400 hover:drop-shadow-lg ${
                isMenuOpen ? "text-white" : "text-wood-brown"
              }`}
            >
              {section.label}
            </a>
          ))}

          {/* Rotas para Login e Sign Up */}
          <Link
            to="/login"
            onClick={handleMenuItemClick}
            className="text-xl lg:text-lg transition duration-300 transform hover:scale-110 hover:text-yellow-400 hover:drop-shadow-lg text-wood-brown"
          >
            Login
          </Link>
          <Link
            to="/create-account"
            onClick={handleMenuItemClick}
            className="text-xl lg:text-lg transition duration-300 transform hover:scale-110 hover:text-yellow-400 hover:drop-shadow-lg text-wood-brown"
          >
            Sign Up
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
