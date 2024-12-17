import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";  // Importação do React Router para navegação

// Importe das imagens
import book1 from "../assets/images/book1.png";
import book2 from "../assets/images/book2.jpg";
import book3 from "../assets/images/book3.png";

const PopularBooks = () => {
  const books = [
    { title: "The Great Gatsby", author: "F. Scott Fitzgerald", imgSrc: book2 },
    { title: "1984", author: "George Orwell", imgSrc: book3 },
    { title: "To Kill a Mockingbird", author: "Harper Lee", imgSrc: book1 },
    { title: "Pride and Prejudice", author: "Jane Austen", imgSrc: book2 },
    { title: "The Catcher in the Rye", author: "J.D. Salinger", imgSrc: book3 },
    { title: "Moby Dick", author: "Herman Melville", imgSrc: book1 },
    { title: "War and Peace", author: "Leo Tolstoy", imgSrc: book2 },
    { title: "The Odyssey", author: "Homer", imgSrc: book3 },
    { title: "The Odyssey", author: "Homer", imgSrc: book1 },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [animationClass, setAnimationClass] = useState("animate__fadeInRight");

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationClass("animate__fadeOutLeft");
      setTimeout(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex + 1 >= books.length ? 0 : prevIndex + 1
        );
        setAnimationClass("animate__fadeInRight");
      }, 500); // Sincroniza com a animação de saída
    }, 5000);

    return () => clearInterval(interval);
  }, [books.length]);

  const goToNext = () => {
    setAnimationClass("animate__fadeOutLeft");
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex + 1 >= books.length ? 0 : prevIndex + 1
      );
      setAnimationClass("animate__fadeInRight");
    }, 500);
  };

  const goToPrev = () => {
    setAnimationClass("animate__fadeOutRight");
    setTimeout(() => {
      setCurrentIndex(
        currentIndex - 1 < 0 ? books.length - 1 : currentIndex - 1
      );
      setAnimationClass("animate__fadeInLeft");
    }, 500);
  };

  return (
    <section className="py-16 px-4">
      <h2 className="text-4xl text-wood-brown font-bold text-center mb-8">
        Popular Books
      </h2>

      {/* Carrossel de livros */}
      <div className="relative">
        <div className="flex overflow-hidden">
          {books.slice(currentIndex, currentIndex + 3).map((book, index) => (
            <div
              key={index}
              className="w-full sm:w-1/3 px-2 transition-all duration-500 ease-in-out"
            >
              <div className={`bg-transparent p-6 rounded-lg transform transition duration-500 ease-in-out animate__animated ${animationClass}`}>
                {/* Exibe a capa do livro como uma imagem normal */}
                <img
                  src={book.imgSrc}
                  alt={book.title}
                  className="w-full h-80 object-contain rounded-t-lg"  // Definindo largura e altura fixas
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

      {/* Indicadores de navegação */}
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

      {/* Navegação para próxima/voltar */}
      <div className="absolute top-1/2 left-0 right-0 flex justify-between items-center px-4">
        <FaArrowLeft
          onClick={goToPrev}
          className="text-white cursor-pointer"
          size={30}
        />
        <FaArrowRight
          onClick={goToNext}
          className="text-white cursor-pointer"
          size={30}
        />
      </div>

      {/* Link para ver todos os livros */}
      <div className="text-center mt-8">
        <Link
          to="/all-books" // Substitua pelo caminho da página que lista todos os livros
          className="text-lg text-wood-brown hover:underline"
        >
          See All Popular Books
        </Link>
      </div>
    </section>
  );
};

export default PopularBooks;
