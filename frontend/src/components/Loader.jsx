import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./Loader.css"; // Não esquecer de adicionar o CSS

const Loader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();  // Hook para monitorar a mudança de rota

  useEffect(() => {
    // Sempre que a rota mudar, exibe o loader
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);  // Fecha o loader após 5 segundos
    }, 1000); // Duração do loader (5 segundos)

    return () => clearTimeout(timer);  // Limpa o timer quando o componente for desmontado
  }, [location]); // Dependência de location para mudar a cada navegação

  return (
    isLoading && (
      <div id="page">
        <div id="container">
          <div id="ring"></div>
          <div id="ring"></div>
          <div id="ring"></div>
          <div id="ring"></div>
          <div id="h3">loading</div>
        </div>
      </div>
    )
  );
};

export default Loader;
