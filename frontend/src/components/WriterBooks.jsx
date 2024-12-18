import React from "react";
import { FaBook, FaRegEdit, FaStar, FaTrash, FaEye } from "react-icons/fa"; // Ícones
import { motion } from "framer-motion"; // Animação

const WriterBooks = () => {
  const books = [
    { id: 1, title: "Book One", status: "Published", date: "2024-01-15", views: 300, rating: 4.5 },
    { id: 2, title: "Book Two", status: "Draft", date: "2024-03-10", views: 50, rating: 3.8 },
  ];

  const handleEdit = (id) => {
    alert(`Editing Book ID: ${id}`);
  };

  const handleDelete = (id) => {
    alert(`Deleting Book ID: ${id}`);
  };

  const handleViewDetails = (id) => {
    alert(`Viewing details of Book ID: ${id}`);
  };

  return (
    <div className="bg-white p-6 shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-wood-brown mb-4">Manage Your Books</h2>
      <ul>
        {books.map((book) => (
          <motion.li
            key={book.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: book.id * 0.1 }}
            className="flex flex-col sm:flex-row justify-between items-center border-b py-4 mb-4 hover:bg-gray-50 transition duration-300 rounded-lg"
          >
            <div className="flex items-center space-x-4 mb-4 sm:mb-0">
              {/* Ícone do Livro */}
              <FaBook className="text-4xl text-wood-brown" />
              <div>
                <h3 className="font-semibold text-lg text-gray-800">{book.title}</h3>
                <p className="text-sm text-gray-500">{`Published on: ${book.date}`}</p>
              </div>
            </div>

            <div className="flex flex-wrap justify-between sm:justify-end items-center space-x-6">
              {/* Status */}
              <span
                className={`px-3 py-1 rounded-md text-sm font-semibold ${
                  book.status === "Published"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {book.status}
              </span>

              {/* Outras Informações */}
              <div className="flex items-center space-x-2 mb-4 sm:mb-0">
                <span className="text-sm text-gray-600">
                  <FaRegEdit className="inline-block mr-1 text-gray-500" />
                  {book.views} Views
                </span>
                <span className="text-sm text-gray-600">
                  <FaStar className="inline-block mr-1 text-yellow-400" />
                  {book.rating} / 5
                </span>
              </div>

              {/* Ações */}
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handleEdit(book.id)}
                  className="text-blue-500 hover:text-blue-700 transition duration-300 text-sm sm:text-base"
                >
                  <FaRegEdit className="inline-block mr-1" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(book.id)}
                  className="text-red-500 hover:text-red-700 transition duration-300 text-sm sm:text-base"
                >
                  <FaTrash className="inline-block mr-1" />
                  Delete
                </button>
                <button
                  onClick={() => handleViewDetails(book.id)}
                  className="text-gray-500 hover:text-gray-700 transition duration-300 text-sm sm:text-base"
                >
                  <FaEye className="inline-block mr-1" />
                  View
                </button>
              </div>
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

export default WriterBooks;
