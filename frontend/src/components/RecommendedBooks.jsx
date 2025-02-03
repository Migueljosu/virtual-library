import React, { useEffect, useState } from "react";
import { FaRegStar, FaBookReader } from "react-icons/fa";
import { motion } from "framer-motion";
import axiosInstance from "../utils/axiosInstance";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom"; // Para navegação

const RecommendedBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Para navegação ao detalhar um livro

  useEffect(() => {
    const fetchRecommendedBooks = async () => {
      try {
        const response = await axiosInstance.get("/api/recommended");
        setBooks(response.data.books);
      } catch (error) {
        toast.error("Failed to load recommended books.");
        console.error("Error fetching recommended books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendedBooks();
  }, []);

  return (
    <div className="container mx-auto p-8">
      <ToastContainer />
      <h2 className="text-3xl font-bold text-wood-brown text-center mb-8">
        Recommended Books
      </h2>

      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : books.length === 0 ? (
        <p className="text-center text-gray-600">No recommended books found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {books.map((book, index) => {
            const totalScore = book.recommendations.reduce(
              (acc, rec) => acc + rec.score,
              0
            );
            const averageScore =
              book.recommendations.length > 0
                ? (totalScore / book.recommendations.length).toFixed(2)
                : "N/A";

            return (
              <motion.div
                key={book.id}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <img
                  src={book.coverUrl || "https://via.placeholder.com/300x400"}
                  alt={book.title}
                  className="w-full h-64 object-cover rounded-t-lg"
                />
                <div className="mt-4">
                  <h3 className="text-xl font-semibold text-wood-brown mb-2">
                    {book.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {book.description.length > 100
                      ? book.description.substring(0, 100) + "..."
                      : book.description}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <FaRegStar className="text-yellow-400 mr-2" />
                      <p className="text-sm text-gray-600">{averageScore}</p>
                    </div>
                    <div className="flex items-center">
                      <FaBookReader className="text-wood-brown mr-2" />
                      <p className="text-sm text-gray-600">
                        {book.pageCount || "Unknown"} Pages
                      </p>
                    </div>
                  </div>
                  <button
                    className="mt-4 text-white bg-wood-brown py-2 px-6 rounded-md hover:bg-yellow-400 transition duration-300"
                    onClick={() => navigate(`/book/${book.id}`)}
                  >
                    Read More
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default RecommendedBooks;
