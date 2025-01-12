import React, { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import {
  FaEdit,
  FaTrashAlt,
  FaTh,
  FaList,
  FaStar,
  FaRegStar,
  FaStarHalfAlt,
  FaSearch,
} from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [viewMode, setViewMode] = useState("grid"); // Definido como "grid" por padrão
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Requisição para pegar os livros da API
    axiosInstance
      .get("/api/books/all")
      .then((response) => {
        console.log("Books data:", response.data.books); // Verifique se os livros estão sendo carregados corretamente
        setBooks(response.data.books);
      })
      .catch((error) => {
        console.error("Erro ao carregar os livros:", error);
        toast.error("Erro ao carregar os livros!");
      });

    // Ajuste do viewMode para grid em telas pequenas
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setViewMode("grid"); // Definir como "grid" para telas menores
      }
    };

    // Inicializa com o tamanho da tela
    handleResize();

    // Adiciona o listener de resize
    window.addEventListener("resize", handleResize);

    // Limpeza do listener ao desmontar o componente
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleDelete = (bookId) => {
    console.log("Deleting book with ID:", bookId); // Verifique o valor do ID
    if (!bookId) {
      toast.error("ID do livro inválido!");
      return;
    }

    axiosInstance
      .delete(`/api/books/delete/${bookId}`)
      .then(() => {
        setBooks(books.filter((book) => book.id !== bookId));
        toast.success("Livro excluído com sucesso!");
      })
      .catch((error) => {
        console.error("Erro ao excluir livro:", error);
        toast.error("Erro ao excluir livro!");
      });
  };

  const handleEdit = (bookId) => {
    // Navegar para a página de edição (supondo que você tenha uma página de edição)
    window.location.href = `/edit-book/${bookId}`;
  };

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-[#3E2A47] mb-4 md:mb-0 mt-10">
          Books
        </h2>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <span className="absolute inset-y-0 left-3 flex items-center text-[#A67C52]">
              <FaSearch />
            </span>
            <input
              type="text"
              placeholder="Search books..."
              className="pl-10 pr-4 py-2 border border-[#A67C52] rounded-lg text-[#3E2A47] focus:outline-none focus:ring-2 focus:ring-[#C49A6C]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            className={`p-2 rounded-lg ${
              viewMode === "table"
                ? "bg-[#A67C52] text-white"
                : "bg-white border border-[#A67C52] text-[#A67C52]"
            }`}
            onClick={() => setViewMode("table")}
          >
            <FaList size={20} />
          </button>
          <button
            className={`p-2 rounded-lg ${
              viewMode === "grid"
                ? "bg-[#A67C52] text-white"
                : "bg-white border border-[#A67C52] text-[#A67C52]"
            }`}
            onClick={() => setViewMode("grid")}
          >
            <FaTh size={20} />
          </button>
        </div>
      </div>

      {viewMode === "table" ? (
        <table className="min-w-full bg-white border border-[#A67C52] rounded-lg shadow-md">
          <thead className="bg-[#C49A6C]">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-[#3E2A47]">
                Cover
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-[#3E2A47]">
                Title
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-[#3E2A47]">
                Author
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-[#3E2A47]">
                Genre
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-[#3E2A47]">
                Pages
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-[#3E2A47]">
                Rating
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-[#3E2A47]">
                Recommended
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-[#3E2A47]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredBooks.map((book) => (
              <tr
                key={book.id} // Alterado para usar `id` em vez de `_id`
                className="hover:bg-[#F5E0C1] transition-all duration-200 ease-in-out"
              >
                <td className="px-6 py-4 border-b">
                  <img
                    src={book.coverUrl}
                    alt={book.title}
                    className="w-16 h-24 object-cover rounded"
                  />
                </td>
                <td className="px-6 py-4 border-b text-[#3E2A47]">
                  {book.title}
                </td>
                <td className="px-6 py-4 border-b text-[#3E2A47]">
                  {book.author}
                </td>
                <td className="px-6 py-4 border-b text-[#3E2A47]">
                  {book.category}
                </td>
                <td className="px-6 py-4 border-b text-[#3E2A47]">
                  {book.pageCount}
                </td>
                <td className="px-6 py-4 border-b text-[#3E2A47]">
                  {[...Array(5)].map((_, i) => {
                    if (i < Math.floor(book.rating)) {
                      return <FaStar key={i} color="#FFD700" />;
                    } else if (
                      i === Math.floor(book.rating) &&
                      book.rating % 1 !== 0
                    ) {
                      return <FaStarHalfAlt key={i} color="#FFD700" />;
                    } else {
                      return <FaRegStar key={i} color="#FFD700" />;
                    }
                  })}
                </td>
                <td className="px-6 py-4 border-b text-[#3E2A47]">
                  {book.isPublished ? (
                    <span className="text-green-600 font-semibold">Yes</span>
                  ) : (
                    <span className="text-red-600 font-semibold">No</span>
                  )}
                </td>
                <td className="px-6 py-4 border-b">
                  <button
                    className="text-[#2e8ed7] hover:text-[#6A4F3C] transition-colors duration-200"
                    onClick={() => handleEdit(book.id)} // Alterado para usar `id` em vez de `_id`
                  >
                    <FaEdit size={20} />
                  </button>
                  <button
                    className="text-[#fd2e2e] hover:text-[#A67C52] ml-4 transition-colors duration-200"
                    onClick={() => handleDelete(book.id)} // Alterado para usar `id` em vez de `_id`
                  >
                    <FaTrashAlt size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredBooks.map((book) => (
            <div
              key={book.id} // Alterado para usar `id` em vez de `_id`
              className="bg-[#F5E0C1] p-6 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105"
            >
              <img
                src={book.coverUrl}
                alt={book.title}
                className="w-full h-48 object-cover rounded mb-4"
              />
              <h3 className="text-xl font-bold text-[#3E2A47]">{book.title}</h3>
              <p className="text-[#3E2A47]">{book.author}</p>
              <p className="text-[#3E2A47]">{book.category}</p>
              <div className="flex items-center mt-2">
                {[...Array(5)].map((_, i) => {
                  if (i < Math.floor(book.rating)) {
                    return <FaStar key={i} color="#FFD700" />;
                  } else if (
                    i === Math.floor(book.rating) &&
                    book.rating % 1 !== 0
                  ) {
                    return <FaStarHalfAlt key={i} color="#FFD700" />;
                  } else {
                    return <FaRegStar key={i} color="#FFD700" />;
                  }
                })}
              </div>
              <button
                className="mt-4 text-[#A67C52] hover:text-[#C49A6C]"
                onClick={() => handleEdit(book.id)} // Alterado para usar `id` em vez de `_id`
              >
                <FaEdit size={20} />
              </button>
              <button
                className="mt-4 ml-4 text-[#fd2e2e] hover:text-[#6A4F3C]"
                onClick={() => handleDelete(book.id)} // Alterado para usar `id` em vez de `_id`
              >
                <FaTrashAlt size={20} />
              </button>
            </div>
          ))}
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default BookList;
