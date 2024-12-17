import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom"; // Importe o Router
import { FaArrowUp, FaHandsHelping } from "react-icons/fa"; // Importando ícones
import Home from "./pages/Home";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Função para monitorar a rolagem da página
  const handleScroll = () => {
    if (window.scrollY > 300) { // Mostrar o botão após 300px de rolagem
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    // Adiciona o evento de scroll ao componente
    window.addEventListener("scroll", handleScroll);

    // Remove o evento de scroll quando o componente for desmontado
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // Função para rolar até o topo suavemente
  };

  return (
    isVisible && (
      <div className="relative">
        <button
          onClick={scrollToTop}
          className="fixed bottom-5 right-10 bg-yellow-400 text-white p-4 rounded-full shadow-lg hover:bg-yellow-500 transition duration-300 flex items-center justify-center"
        >
          <FaArrowUp className="text-2xl" />
          <span className="absolute bottom-12 right-0 bg-black text-white text-xs px-2 py-1 rounded opacity-0 hover:opacity-100 transition-opacity duration-300">
            Scroll to Top
          </span>
        </button>
      </div>
    )
  );
};


const DonationButton = () => (
  <div className="relative">
    <a
      href="#donate" // A ID da seção de doações ou URL para página de doações
      className="fixed bottom-20 right-10 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition duration-300 flex items-center justify-center"
    >
      <FaHandsHelping className="text-2xl" />
      <span className="absolute bottom-12 right-0 bg-black text-white text-xs px-2 py-1 rounded opacity-0 hover:opacity-100 transition-opacity duration-300">
        Donate
      </span>
    </a>
  </div>
);


const App = () => {
  return (
    <Router>
      {" "}
      {/* Envolva sua aplicação com o Router */}
      <div>
        {/* O Header será renderizado dentro do Home */}
        <Home />
        <ScrollToTopButton />
        <DonationButton />


      </div>
    </Router>
  );
};

export default App;
