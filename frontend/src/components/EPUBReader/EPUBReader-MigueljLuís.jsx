import React, { useEffect, useRef, useState } from 'react';
import ePub from 'epubjs';

const EPUBReader = ({ fileUrl }) => {
  const viewerRef = useRef(null);
  const [loading, setLoading] = useState(true); // Adiciona estado de carregamento

  useEffect(() => {
    if (!fileUrl) return;

    const book = ePub(fileUrl);
    const rendition = book.renderTo(viewerRef.current, {
      width: '100%',
      height: '100%',
    });

    rendition.display().then(() => {
      setLoading(false); // Marca como carregado quando o EPUB for exibido
    }).catch((err) => {
      console.error("Erro ao carregar o EPUB:", err);
      setLoading(false); // Marca o carregamento como finalizado em caso de erro
    });

    return () => {
      rendition.destroy();
    };
  }, [fileUrl]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <p>Carregando livro...</p> {/* Fallback para carregamento */}
      </div>
    );
  }

  return (
    <div
      ref={viewerRef}
      className="w-full h-full bg-gray-100 rounded-md shadow-lg"
      style={{ minHeight: '500px' }}  // Garantindo que a altura tenha um valor mínimo
    />
  );
};

export default EPUBReader;
