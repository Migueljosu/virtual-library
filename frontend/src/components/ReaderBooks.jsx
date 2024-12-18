import React, { useState } from 'react';
import { FaCheckCircle, FaBookmark, FaStar, FaBook, FaRobot } from 'react-icons/fa';

const ReaderBooks = () => {

  // Simulação de livros lidos e em leitura
  const booksRead = [
    { id: 1, title: "Book 1", author: "Author 1", image: "https://via.placeholder.com/150?text=Book+1", completedDate: "2024-11-01", rating: 4.5, description: "A captivating story of mystery and adventure.", pages: 320 },
    { id: 2, title: "Book 2", author: "Author 2", image: "https://via.placeholder.com/150?text=Book+2", completedDate: "2024-10-15", rating: 3.8, description: "An inspiring tale of overcoming obstacles.", pages: 275 },
    { id: 3, title: "Book 3", author: "Author 3", image: "https://via.placeholder.com/150?text=Book+3", completedDate: "2024-09-25", rating: 5.0, description: "A deep dive into the human psyche.", pages: 450 }
  ];

  const booksReading = [
    { id: 4, title: "Book 4", author: "Author 4", image: "https://via.placeholder.com/150?text=Book+4", progress: "70%", description: "A thrilling journey through time.", pages: 350 },
    { id: 5, title: "Book 5", author: "Author 5", image: "https://via.placeholder.com/150?text=Book+5", progress: "40%", description: "A fantasy novel filled with magic and mystery.", pages: 500 },
    { id: 6, title: "Book 6", author: "Author 6", image: "https://via.placeholder.com/150?text=Book+6", progress: "90%", description: "A heartwarming story of love and loss.", pages: 420 }
  ];

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStars = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStars;

    return (
      <>
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={`full-${i}`} className="text-yellow-400" />
        ))}
        {halfStars > 0 && <FaStar key="half" className="text-yellow-400 opacity-50" />}
        {[...Array(emptyStars)].map((_, i) => (
          <FaStar key={`empty-${i}`} className="text-gray-300" />
        ))}
      </>
    );
  };

  return (
    <div className="space-y-12">
      {/* Livros Lidos */}
      <section>
        <h2 className="text-3xl font-bold text-wood-brown mb-6 flex items-center">
          <FaCheckCircle className="mr-2 text-green-500" />
          Books You Have Read
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {booksRead.map((book) => (
            <div key={book.id} className="transition-all transform hover:scale-105 bg-white rounded-lg shadow-lg hover:shadow-2xl p-4 relative">
              <img src={book.image} alt={book.title} className="w-full h-48 object-cover rounded-t-lg transform hover:scale-105 transition-all" />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{book.title}</h3>
                <p className="text-gray-600">{book.author}</p>
                <p className="text-sm text-gray-500 mt-2">Completed on: {book.completedDate}</p>
                <p className="text-sm text-gray-500 mt-2">{book.description}</p>
                <div className="flex items-center mt-2">
                  {renderStars(book.rating)}
                  <span className="ml-2 text-gray-500">{book.rating}</span>
                </div>
                <div className="mt-4 flex justify-between">
                  <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-all">
                    Read Again
                  </button>
                  <div className="absolute top-4 right-4 text-green-500">
                    <FaCheckCircle className="w-6 h-6" />
                  </div>
                </div>
                <div className="flex items-center mt-2">
                  <FaBook className="text-gray-600 mr-2" />
                  <span className="text-sm text-gray-500">{book.pages} pages</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Livros em Leitura */}
      <section>
        <h2 className="text-3xl font-bold text-wood-brown mb-6 flex items-center">
          <FaBookmark className="mr-2 text-yellow-400" />
          Books You Are Reading
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {booksReading.map((book) => (
            <div key={book.id} className="transition-all transform hover:scale-105 bg-white rounded-lg shadow-lg hover:shadow-2xl p-4 relative">
              <img src={book.image} alt={book.title} className="w-full h-48 object-cover rounded-t-lg transform hover:scale-105 transition-all" />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{book.title}</h3>
                <p className="text-gray-600">{book.author}</p>
                <p className="text-sm text-gray-500 mt-2">Progress: {book.progress}</p>
                <p className="text-sm text-gray-500 mt-2">{book.description}</p>
                <div className="flex items-center mt-2">
                  <FaBook className="text-gray-600 mr-2" />
                  <span className="text-sm text-gray-500">{book.pages} pages</span>
                </div>
                <div className="mt-4 flex justify-between">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all">
                    Continue Reading
                  </button>
                  <div className="absolute top-4 right-4 text-yellow-400">
                    <FaBookmark className="w-6 h-6" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      
     
    </div>
  );
};

export default ReaderBooks;
