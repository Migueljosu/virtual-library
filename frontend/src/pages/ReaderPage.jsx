import React from "react";
import { useLocation } from "react-router-dom";
import EPUBReader from "../components/EPUBReader/EPUBReader";
import PDFReader from "../components/PDFReader/PDFReader";

const ReaderPage = () => {
  const location = useLocation();
  const { file_url } = location.state || {};  // Acessando 'file_url' corretamente

  if (!file_url) {
    return (
      <div className="text-center text-red-500">
        Arquivo do livro não encontrado.
      </div>
    );
  }

  const isEPUB = file_url.endsWith(".epub");

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {isEPUB ? <EPUBReader fileUrl={file_url} /> : <PDFReader fileUrl={file_url} />}
    </div>
  );
};

export default ReaderPage;
