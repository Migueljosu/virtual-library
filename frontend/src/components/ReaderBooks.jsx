import React, { useState, useEffect } from "react";
import { FaCheckCircle, FaBookmark, FaStar } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

const ReaderBooks = () => {
  const [booksRead, setBooksRead] = useState([]);
  const [booksReading, setBooksReading] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axiosInstance.get("/api/user-reading-books");
        const { data } = response;

        setBooksRead(data.filter((book) => book.status === "completed"));
        setBooksReading(data.filter((book) => book.status !== "completed"));
      } catch (error) {
        console.error("Error fetching books:", error);
        toast.error("Erro ao carregar os livros!");
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStars = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStars;

    return (
      <>
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={`full-${i}`} className="text-yellow-400" />
        ))}
        {halfStars > 0 && (
          <FaStar key="half" className="text-yellow-400 opacity-50" />
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <FaStar key={`empty-${i}`} className="text-gray-300" />
        ))}
      </>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <section>
        <h2 className="text-3xl font-bold text-wood-brown mb-6 flex items-center">
          <FaCheckCircle className="mr-2 text-green-500" />
          Books You Have Read
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {booksRead.map((book) => (
            <div
              key={book.book.id}
              className="transition-all transform hover:scale-105 bg-white rounded-lg shadow-lg hover:shadow-2xl p-4 relative"
            >
              <img
                src={book.book.coverUrl}
                alt={book.book.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{book.book.title}</h3>
                <p className="text-gray-600">{book.book.author}</p>
                <p className="text-sm text-gray-500 mt-2">
                  Completed on: {book.finishedAt}
                </p>
                <div className="flex items-center mt-2">
                  {renderStars(book.book.averageRating)}
                  <span className="ml-2 text-gray-500">
                    {book.book.averageRating}
                  </span>
                </div>
                <button
                  onClick={() => navigate(`/book/${book.book.id}`)}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-all mt-4 w-full"
                >
                  Read Again
                </button>
              </div>
              <FaCheckCircle className="absolute top-4 right-4 text-green-500 w-6 h-6" />
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-wood-brown mb-6 flex items-center">
          <FaBookmark className="mr-2 text-yellow-400" />
          Books You Are Reading
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {booksReading.map((book) => (
            <div
              key={book.book.id}
              className="transition-all transform hover:scale-105 bg-white rounded-lg shadow-lg hover:shadow-2xl p-4 relative"
            >
              <img
                src={book.book.coverUrl}
                alt={book.book.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{book.book.title}</h3>
                <p className="text-gray-600">{book.book.author}</p>
                <p className="text-sm text-gray-500 mt-2">
                  Progress: {book.status}
                </p>
                <button
                  onClick={() => navigate(`/book/${book.book.id}`)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all mt-4 w-full"
                >
                  Continue Reading
                </button>
              </div>
              <FaBookmark className="absolute top-4 right-4 text-yellow-400 w-6 h-6" />
            </div>
          ))}
        </div>
      </section>
      <ToastContainer />
    </div>
  );
};

export default ReaderBooks;
