import React, { useEffect, useState } from "react";
import heroImage from "../assets/images/banner.png"; // Substitua pelo caminho correto para a imagem

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Definir o estado para "carregado" após o carregamento da página
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500); // Atraso de 0,5 segundos para a animação iniciar após o carregamento
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className="h-[90vh] bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div
        className={`bg-black bg-opacity-50 p-6 rounded-lg text-center 
          ${isLoaded ? "animate__animated animate__fadeIn" : "animate__animated animate__fadeOut"}`}
      >
        <h1
          className={`text-white text-4xl md:text-5xl font-bold mb-4 
            ${isLoaded ? "animate__animated animate__fadeInUp" : ""}`}
        >
          Unlock the World of Knowledge
        </h1>
        <p className="text-white text-lg mb-6">
          Dive into a vast collection of books, resources, and learning tools.
        </p>
        <a
          href="#collection"
          className={`inline-block bg-wood-brown text-white py-2 px-6 rounded-full 
            ${isLoaded ? "animate__animated animate__fadeInUp" : ""} 
            transition-all duration-300 ease-in-out transform hover:bg-white hover:scale-110 hover:text-coffee`}
        >
          Learn More
        </a>
      </div>
    </section>
  );
};

export default Hero;
