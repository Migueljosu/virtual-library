import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Para navegação
import { FaSearch } from "react-icons/fa";
import debounce from "lodash.debounce";
import axiosInstance from "../utils/axiosInstance"; // Supondo que você tenha configurado axiosInstance

const SearchBar = () => {
  const [query, setQuery] = useState(""); // Estado para o texto da pesquisa
  const [books, setBooks] = useState([]); // Estado para armazenar os livros encontrados
  const [loading, setLoading] = useState(false); // Estado para controle de carregamento
  const [page, setPage] = useState(1); // Estado para página de resultados
  const [totalPages, setTotalPages] = useState(0); // Estado para o total de páginas de resultados
  const navigate = useNavigate(); // Para navegação ao detalhar um livro

  // Função para buscar livros com base no texto da pesquisa
  const fetchBooks = async (currentPage = 1) => {
    if (!query.trim()) {
      setBooks([]);
      setTotalPages(0);
      return;
    }

    try {
      setLoading(true); // Define o carregamento como true
      const response = await axiosInstance.get(`/api/books/search`, {
        params: { query, page: currentPage, limit: 10 },
      });

      // Atualiza o estado com os dados de livros e total de páginas
      setBooks(response.data.books);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Erro ao buscar livros:", error);
    } finally {
      setLoading(false); // Define o carregamento como false após a requisição
    }
  };

  // Função de debounce para evitar chamadas excessivas durante a digitação
  const debouncedFetchBooks = debounce(() => fetchBooks(page), 500);

  // Manipulador de alteração no campo de busca
  const handleSearchChange = (e) => {
    setQuery(e.target.value); // Atualiza o estado com o texto da pesquisa
    setPage(1); // Reinicia para a primeira página
    debouncedFetchBooks(); // Faz a pesquisa com debounce
  };

  // Função para mudar de página
  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
    fetchBooks(newPage);
  };

  return (
    <section className="bg-wood-brown py-16 px-4">
      <h2 className="text-4xl text-white font-bold text-center mb-8">
        Search for Books
      </h2>

      <div className="flex justify-center">
        <div className="relative w-full max-w-4xl">
          <input
            type="text"
            className="w-full p-4 pr-12 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-wood-brown transition-all duration-300"
            placeholder="Search books, authors, categories..."
            value={query}
            onChange={handleSearchChange}
          />
          <FaSearch
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-wood-brown"
            size={20}
          />
        </div>
      </div>

      <div className="mt-8">
        {loading ? (
          <div className="text-center text-white">Carregando livros...</div>
        ) : (
          <>
            {books.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {books.map((book) => (
                  <div
                    key={book.id}
                    className="p-6 bg-wood-brown text-white flex flex-col justify-between flex-grow"
                  >
                    <h3 className="text-xl font-semibold">{book.title}</h3>
                    <p className="text-gray-200 mt-2">
                      {book.description || "Descrição não disponível."}
                    </p>
                    <p className="mt-4 text-yellow-400">
                      {book.category || "Categoria desconhecida"}
                    </p>
                    <button
                      className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded"
                      onClick={() => navigate(`/book/${book.id}`)} // Navegação para o detalhamento do livro
                    >
                      Ver Detalhes
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-white">
                Nenhum livro encontrado.
              </div>
            )}

            {/* Paginação */}
            <div className="flex justify-center mt-8">
              <button
                className="mx-2 bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded"
                disabled={page === 1}
                onClick={() => handlePageChange(page - 1)}
              >
                Anterior
              </button>
              <span className="text-white mx-4">
                Página {page} de {totalPages}
              </span>
              <button
                className="mx-2 bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded"
                disabled={page === totalPages}
                onClick={() => handlePageChange(page + 1)}
              >
                Próxima
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default SearchBar;
