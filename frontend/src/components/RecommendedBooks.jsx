import React from "react";
import { FaRegStar, FaBookReader } from "react-icons/fa";
import { motion } from "framer-motion"; // Usamos o framer-motion para animações suaves

const RecommendedBooks = () => {
  return (
    <div className="container mx-auto p-8">
      <h2 className="text-3xl font-bold text-wood-brown text-center mb-8">Recommended Books</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Loop para criar os livros recomendados */}
        {[1, 2, 3, 4, 5].map((book) => (
          <motion.div
            key={book}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: book * 0.2 }}
          >
            {/* Imagem do Livro */}
            <img
              src={`https://via.placeholder.com/300x400?text=Book+${book}`}
              alt={`Book ${book}`}
              className="w-full h-64 object-cover rounded-t-lg"
            />
            <div className="mt-4">
              {/* Título do Livro */}
              <h3 className="text-xl font-semibold text-wood-brown mb-2">Book {book} Title</h3>
              <p className="text-gray-600 text-sm mb-4">
                This is a short description about Book {book}, a fascinating journey into the world of ...
              </p>

              {/* Informações do Livro */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <FaRegStar className="text-yellow-400 mr-2" />
                  <p className="text-sm text-gray-600">4.5 / 5</p>
                </div>
                <div className="flex items-center">
                  <FaBookReader className="text-wood-brown mr-2" />
                  <p className="text-sm text-gray-600">320 Pages</p>
                </div>
              </div>

              {/* Botão "Read More" */}
              <button className="mt-4 text-white bg-wood-brown py-2 px-6 rounded-md hover:bg-yellow-400 transition duration-300">
                Read More
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedBooks;
