import React, { useState } from "react";

// Importe as imagens diretamente
import bookImage1 from "../assets/images/book1.png"; 
import bookImage2 from "../assets/images/book2.jpg"; 
import bookImage3 from "../assets/images/book3.png"; 

const NewBooks = () => {
  const [likes, setLikes] = useState({
    book1: 0,
    book2: 0,
    book3: 0,
  });

  const [ratings, setRatings] = useState({
    book1: 4.5,
    book2: 3.8,
    book3: 5,
  });

  const [recommendations, setRecommendations] = useState({
    book1: "Highly Recommended",
    book2: "Recommended",
    book3: "Top Pick",
  });

  const handleLike = (bookId) => {
    setLikes({
      ...likes,
      [bookId]: likes[bookId] + 1,
    });
  };

  const books = [
    {
      title: "GOOG ON PAPER",
      description: "PATRICIA KIM",
      image: bookImage1,
      id: "book1",
    },
    {
      title: "CREATE YOUR OWN BUSINESS",
      description: "JAMES MURDOR",
      image: bookImage2,
      id: "book2",
    },
    {
      title: "Fitness for All: The Ultimate Guide for All Levels",
      description: "PATRIZIA JONES",
      image: bookImage3,
      id: "book3",
    },
  ];

  return (
    <section className="container mx-auto py-16 px-4" id="new-books">
      <h2 className="text-3xl font-bold text-center text-wood-brown mb-12">New Releases</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-6">
        {books.map((book) => (
          <div
            key={book.id}
            className="mt-5 border rounded-lg overflow-hidden shadow-lg transform hover:scale-110 transition duration-300 ease-in-out flex flex-col"
          >
            <div className="w-full h-64 bg-gray-200 flex justify-center items-center">
              <img
                src={book.image}
                alt={book.title}
                className="max-w-full max-h-full object-contain transition-all duration-300 ease-in-out hover:scale-110"
              />
            </div>
            <div className="p-6 bg-wood-brown text-white flex flex-col justify-between flex-grow">
              <h3 className="text-xl font-semibold">{book.title}</h3>
              <p className="text-gray-200 mt-2">{book.description}</p>

              {/* Recommendation */}
              <p className="mt-4 text-yellow-400">{recommendations[book.id]}</p>

              {/* Rating and Like */}
              <div className="mt-4 flex items-center justify-start space-x-4">
                <p className="text-gray-200">Rating: {ratings[book.id]} ★</p>
                <button
                  onClick={() => handleLike(book.id)}
                  className="bg-yellow-400 text-white px-4 py-2 rounded-full hover:bg-yellow-500 transition duration-200 flex items-center space-x-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="w-6 h-6"
                    stroke="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                    ></path>
                  </svg>
                  <span>{likes[book.id]} Likes</span>
                </button>
              </div>

              {/* Button for More Details */}
              <div className="mt-4 text-center">
                <button className="bg-white text-wood-brown py-2 px-6 rounded-full hover:bg-wood-brown hover:text-white border-2 border-white hover:border-2 transition duration-200">
                  View More Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewBooks;
