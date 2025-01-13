import React, { useState } from 'react';
import { Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

// Importar estilos do PDF Viewer
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

import { pdfjs } from 'react-pdf';

// Configurar o caminho do worker
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;

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

  // Toggle de tema (modo escuro/claro)
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div
      className={`relative w-full h-full p-4 ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}
    >
      {/* Botão para alternar o tema */}
      <button
        onClick={toggleTheme}
        className="absolute top-4 right-4 p-2 rounded-full bg-gray-800 text-white hover:bg-gray-600"
      >
        {darkMode ? 'Modo Claro' : 'Modo Escuro'}
      </button>

      {/* Contêiner do visualizador de PDF */}
      <div className="w-full h-full">
        <Viewer
          fileUrl={fileUrl}
          plugins={[defaultLayout]}
        />
      </div>
    </div>
  );
};

export default PDFReader;
