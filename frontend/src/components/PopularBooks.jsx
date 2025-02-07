import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance"; // Certifique-se de que está importado corretamente
import "animate.css";

const PopularBooks = () => {
  const [books, setBooks] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animationClass, setAnimationClass] = useState("animate__fadeInRight");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendedBooks = async () => {
      try {
        const response = await axiosInstance.get("/api/recommended");
        if (response.data.books) {
          setBooks(response.data.books);
        }
      } catch (error) {
        console.error("Error fetching recommended books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendedBooks();
  }, []);

  useEffect(() => {
    if (books.length > 0) {
      const interval = setInterval(() => {
        setAnimationClass("animate__fadeOutLeft");
        setTimeout(() => {
          setCurrentIndex((prevIndex) =>
            prevIndex + 1 >= books.length ? 0 : prevIndex + 1
          );
          setAnimationClass("animate__fadeInRight");
        }, 500);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [books.length]);

  if (loading) {
    return <p className="text-center text-gray-600">Loading books...</p>;
  }

  return (
    <section className="py-16 px-4">
      <h2 className="text-4xl text-wood-brown font-bold text-center mb-8">
        Popular Books
      </h2>

      <div className="relative">
        <div className="flex overflow-hidden">
          {books.slice(currentIndex, currentIndex + 3).map((book, index) => (
            <div
              key={index}
              className={`w-full sm:w-1/3 px-2 transition-all duration-500 ease-in-out animate__animated ${animationClass}`}
            >
              <div className="bg-transparent p-6 rounded-lg">
                <img
                  src={book.coverUrl}
                  alt={book.title}
                  className="w-full h-80 object-contain rounded-t-lg"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold">{book.title}</h3>
                  <p className="text-gray-600">{book.author}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Indicadores de Navegação */}
      <div className="flex justify-center mt-8 space-x-2">
        {books.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setAnimationClass("animate__fadeOutLeft");
              setTimeout(() => {
                setCurrentIndex(index);
                setAnimationClass("animate__fadeInRight");
              }, 500);
            }}
            className={`w-4 h-4 rounded-full ${
              index === currentIndex ? "bg-wood-brown" : "bg-gray-300"
            }`}
          ></button>
        ))}
      </div>

      {/* Botões de navegação */}
      <div className="absolute top-1/2 left-0 right-0 flex justify-between items-center px-4">
        <FaArrowLeft
          onClick={() =>
            setCurrentIndex(currentIndex - 1 < 0 ? books.length - 1 : currentIndex - 1)
          }
          className="text-white cursor-pointer"
          size={30}
        />
        <FaArrowRight
          onClick={() =>
            setCurrentIndex(currentIndex + 1 >= books.length ? 0 : currentIndex + 1)
          }
          className="text-white cursor-pointer"
          size={30}
        />
      </div>

      <div className="text-center mt-8">
        <Link to="/all-books" className="text-lg text-wood-brown hover:underline">
          See All Popular Books
        </Link>
      </div>
    </section>
  );
};

export default PopularBooks;
