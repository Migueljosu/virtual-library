import React, { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-toastify";

const NewBooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("/api/books/all", { params: { limit: 3 } }) // Pegando os 3 livros mais recentes
      .then((response) => {
        console.log("Books data:", response.data.books); // Log para depuração
        setBooks(response.data.books);
      })
      .catch((error) => {
        console.error("Erro ao carregar os livros:", error);
        toast.error("Erro ao carregar os livros!");
      });
  }, []);

  return (
    <section className="container mx-auto py-16 px-4" id="new-books">
      <h2 className="text-3xl font-bold text-center text-wood-brown mb-12">
        Novos Lançamentos
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-6">
        {books.length > 0 ? (
          books.map((book) => (
            <div
              key={book.id}
              className="mt-5 border rounded-lg overflow-hidden shadow-lg transform hover:scale-110 transition duration-300 ease-in-out flex flex-col"
            >
              <div className="w-full h-64 bg-gray-200 flex justify-center items-center">
                <img
                  src={book.coverUrl}
                  alt={book.title}
                  className="max-w-full max-h-full object-contain transition-all duration-300 ease-in-out hover:scale-110"
                />
              </div>
              <div className="p-6 bg-wood-brown text-white flex flex-col justify-between flex-grow">
                <h3 className="text-xl font-semibold">{book.title}</h3>
                <p className="text-gray-200 mt-2">{book.description}</p>

                {/* Categoria do Livro */}
                <p className="mt-2 text-sm text-gray-400">
                  Categoria: {book.category}
                </p>

                {/* Autor e Data de Publicação */}
                <p className="mt-2 text-sm text-gray-400">
                  {book.author} -{" "}
                  {new Date(book.publicationDate).toLocaleDateString()}
                </p>

                {/* Likes e Avaliação */}
                <div className="mt-4 flex items-center justify-start space-x-4">
                  <p className="text-gray-200">Avaliação: {book.ratings} ★</p>
                  <p className="text-yellow-400">{book.likes} Likes</p>
                </div>

                {/* Botão para Detalhes 
                <div className="mt-4 text-center">
                  <button className="bg-white text-wood-brown py-2 px-6 rounded-full hover:bg-wood-brown hover:text-white border-2 border-white hover:border-2 transition duration-200">
                    Ver Detalhes
                  </button>
                </div>*/}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">Nenhum livro encontrado.</p>
        )}
      </div>
    </section>
  );
};

export default NewBooks;
