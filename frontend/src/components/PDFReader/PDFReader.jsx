import React, { useState } from 'react';
import { Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

// Importar estilos do PDF Viewer
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

import { pdfjs } from 'react-pdf';

// Configurar o caminho do worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PDFReader = ({ fileUrl }) => {
  const [darkMode, setDarkMode] = useState(false);

  if (!fileUrl) {
    return (
      <div className="text-center text-red-500">
        URL do arquivo PDF não encontrado.
      </div>
    );
  }

  const defaultLayout = defaultLayoutPlugin();

  // Funções para desabilitar a seleção de texto e o clique direito
  const disableTextSelection = (e) => {
    e.preventDefault(); // Impede a seleção de texto
  };

  const disableRightClick = (e) => {
    e.preventDefault(); // Impede o clique direito
  };

  // Toggle de tema (modo escuro/claro)
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div
      className={`relative w-full h-full p-4 ${darkMode ? 'bg-black text-white' : 'bg-white text-wood-brown'}`}
      onContextMenu={disableRightClick} // Desabilita o clique direito
      onMouseUp={disableTextSelection} // Desabilita a seleção de texto
      onMouseMove={disableTextSelection} // Desabilita a seleção de texto
    >
      {/* Botão para alternar o tema */}
      <button
        onClick={toggleTheme}
        className="absolute top-4 right-4 p-2 rounded-full bg-wood-brown text-white hover:bg-wood-brown-dark"
      >
        {darkMode ? 'Modo Claro' : 'Modo Escuro'}
      </button>

      {/* Camada de sobreposição invisível para dificultar captura de tela */}
      <div
        className="absolute inset-0 bg-black opacity-50"
        style={{
          pointerEvents: 'none', // Desabilita interação com a camada de fundo
        }}
      ></div>

      {/* Contêiner do visualizador de PDF */}
      <div className="relative z-10 w-full h-full">
        <Viewer
          fileUrl={fileUrl}
          plugins={[defaultLayout]}
        />
      </div>
    </div>
  );
};

export default PDFReader;
