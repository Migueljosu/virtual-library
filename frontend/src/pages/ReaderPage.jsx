import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as pdfjsLib from "pdfjs-dist";
import ePub from "epubjs";
import {
  FaMoon,
  FaSun,
  FaArrowLeft,
  FaArrowRight,
  FaBars,
  FaCommentAlt,
  FaUnderline,
  FaTag,
} from "react-icons/fa";

// Definir o worker do PDF
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;

const BASE_URL = "http://localhost:5000";

const ReaderPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { file_url } = location.state || {};
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [isEPUB, setIsEPUB] = useState(false);
  const [pdfText, setPdfText] = useState([]);
  const [error, setError] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedText, setSelectedText] = useState("");
  const [highlightedText, setHighlightedText] = useState([]);
  const [highlightColor, setHighlightColor] = useState("yellow");
  const [showOptions, setShowOptions] = useState(false); // Mostrar opções de marcar ou sublinhar
  const [progress, setProgress] = useState(0); // Progresso da leitura

  useEffect(() => {
    if (file_url) {
      const fullUrl = `${BASE_URL}${file_url}`;
      if (fullUrl.endsWith(".epub")) {
        setIsEPUB(true);
        loadEpub(fullUrl);
      } else if (fullUrl.endsWith(".pdf")) {
        setIsEPUB(false);
        fetchPdf(fullUrl);
      }
    }
  }, [file_url]);

  const fetchPdf = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(
          `Falha ao buscar o arquivo PDF. Status: ${response.status}`
        );
      }

      const arrayBuffer = await response.arrayBuffer();
      const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
      setTotalPages(pdf.numPages);

      const page = await pdf.getPage(pageNumber);
      const textContent = await page.getTextContent();
      let text = "";
      textContent.items.forEach((item) => {
        text += item.str + " ";
      });

      setPdfText([text]);
      setLoading(false);
      setProgress((pageNumber / totalPages) * 100); // Atualizar progresso
    } catch (err) {
      setError("Erro ao carregar ou processar o PDF.");
      setLoading(false);
    }
  };

  const loadEpub = (url) => {
    const book = ePub(url);
    book.loaded.metadata.then((metadata) => {
      console.log("Metadata:", metadata);
      setLoading(false);
    });

    book.renderTo("epub-container");
  };

  const toggleTheme = () => setDarkMode(!darkMode);

  const goToNextPage = () => {
    if (pageNumber < totalPages) {
      setPageNumber(pageNumber + 1);
      fetchPdf(`${BASE_URL}${file_url}`);
    }
  };

  const goToPreviousPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
      fetchPdf(`${BASE_URL}${file_url}`);
    }
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleTextSelection = () => {
    const selected = window.getSelection().toString();
    if (selected) {
      setSelectedText(selected);
      setShowOptions(true); // Mostrar opções ao selecionar o texto
    }
  };

  const highlightText = () => {
    if (selectedText) {
      setHighlightedText([
        ...highlightedText,
        { text: selectedText, color: highlightColor },
      ]);
      setSelectedText(""); // Reset após destacar
      setShowOptions(false); // Fechar opções
    }
  };

  const underlineText = () => {
    if (selectedText) {
      setHighlightedText([
        ...highlightedText,
        { text: `<u>${selectedText}</u>`, color: "blue" },
      ]);
      setSelectedText(""); // Reset após sublinhar
      setShowOptions(false); // Fechar opções
    }
  };

  const saveProgress = () => {
    localStorage.setItem("readingProgress", JSON.stringify({ file_url, progress }));
    alert("Progresso salvo!");
  };

  const loadSavedProgress = () => {
    const savedProgress = JSON.parse(localStorage.getItem("readingProgress"));
    if (savedProgress && savedProgress.file_url === file_url) {
      setProgress(savedProgress.progress);
      setPageNumber(Math.floor((savedProgress.progress / 100) * totalPages));
    }
  };

  useEffect(() => {
    loadSavedProgress();
  }, [file_url]);

  useEffect(() => {
    document.addEventListener("mouseup", handleTextSelection); // Adicionando o evento de seleção
    return () => {
      document.removeEventListener("mouseup", handleTextSelection); // Remover o evento ao desmontar o componente
    };
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <p>Carregando livro...</p>
      </div>
    );
  }

  return (
    <div
      className={`relative w-full h-full min-h-screen p-4 transition-all duration-500 ease-in-out ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      {/* Sidebar */}
      <div
        className={`fixed inset-0 z-50 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-all duration-300 ease-in-out`}
      >
        <div
          className="fixed inset-0 bg-black opacity-50"
          onClick={toggleSidebar}
        ></div>
        <div className="fixed left-0 top-0 w-64 h-full bg-wood-brown text-white p-4 transition-all duration-300 ease-in-out">
          <button
            onClick={toggleSidebar}
            className="absolute top-4 right-4 p-2 bg-gray-800 text-white rounded-full hover:bg-gray-600 transition duration-300"
          >
            <FaBars />
          </button>
          <div className="space-y-6 mt-20">
            <button
              onClick={toggleTheme}
              className="w-full py-2 px-4 bg-gray-800 text-white rounded hover:bg-gray-600 transition duration-300 flex items-center justify-start space-x-2"
            >
              {darkMode ? <FaSun /> : <FaMoon />}{" "}
              <span className="ml-2">Modo {darkMode ? "Claro" : "Escuro"}</span>
            </button>
            <button
              onClick={goToPreviousPage}
              className="w-full py-2 px-4 bg-wood-brown text-white rounded hover:bg-gray-600 transition duration-300 flex items-center justify-start space-x-2"
            >
              <FaArrowLeft /> <span className="ml-2">Página Anterior</span>
            </button>
            <button
              onClick={goToNextPage}
              className="w-full py-2 px-4 bg-wood-brown text-white rounded hover:bg-gray-600 transition duration-300 flex items-center justify-start space-x-2"
            >
              <FaArrowRight /> <span className="ml-2">Próxima Página</span>
            </button>

            {/* Progresso de leitura */}
            <div className="mt-4">
              <label htmlFor="progress" className="text-sm">
                Progresso: {Math.round(progress)}%
              </label>
              <input
                id="progress"
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={(e) => setProgress(Number(e.target.value))}
                className="w-full mt-2"
              />
            </div>

            {/* Voltar à página anterior */}
            <button
              onClick={() => navigate(-1)}
              className="w-full py-2 px-4 bg-gray-800 text-white rounded hover:bg-gray-600 transition duration-300 mt-4"
            >
              Voltar
            </button>

            {/* Salvar progresso */}
            <button
              onClick={saveProgress}
              className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-500 transition duration-300 mt-4"
            >
              Salvar Progresso
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div
        className={`transition-all duration-500 ease-in-out ${
          isSidebarOpen ? "ml-64" : ""
        }`}
      >
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 p-3 bg-gray-800 text-white rounded-full hover:bg-gray-600 transition duration-300 z-50"
        >
          <FaBars />
        </button>

        {error && <div className="text-red-500 text-center my-4">{error}</div>}

        <div className="max-w-4xl mx-auto my-8">
          <div
            className={`card shadow-lg rounded-lg p-6 transition-all duration-500 ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div className="flex justify-between items-center mb-4">
              <button
                onClick={goToPreviousPage}
                className="flex items-center space-x-2 px-4 py-2 bg-wood-brown text-white rounded hover:bg-wood-brown-dark transition duration-300"
              >
                <FaArrowLeft />
                <span>Anterior</span>
              </button>
              <span className="text-lg font-semibold">{`Página ${pageNumber} de ${totalPages}`}</span>
              <button
                onClick={goToNextPage}
                className="flex items-center space-x-2 px-4 py-2 bg-wood-brown text-white rounded hover:bg-wood-brown-dark transition duration-300"
              >
                <FaArrowRight />
                <span>Próxima</span>
              </button>
            </div>

            {isEPUB ? (
              <div id="epub-container" className="w-full h-full">
                <p>EPUB sendo renderizado...</p>
              </div>
            ) : (
              <div className="w-full h-full">
                {pdfText.length > 0 ? (
                  <div className="text-lg leading-relaxed space-y-4">
                    {pdfText.map((text, index) => (
                      <p key={index} className="whitespace-pre-line">
                        {text}
                      </p>
                    ))}
                  </div>
                ) : (
                  <p>Texto não disponível.</p>
                )}
              </div>
            )}
          </div>

          {/* Opções de marcação */}
          {showOptions && (
            <div className="fixed bottom-4 right-4 bg-white p-4 border shadow-lg rounded-lg z-50">
              <div className="space-x-2">
                <button
                  onClick={highlightText}
                  className="bg-yellow-500 px-4 py-2 text-white rounded hover:bg-yellow-400 transition duration-300"
                >
                  <FaTag /> Destacar
                </button>
                <button
                  onClick={underlineText}
                  className="bg-blue-500 px-4 py-2 text-white rounded hover:bg-blue-400 transition duration-300"
                >
                  <FaUnderline /> Sublinhado
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReaderPage;
