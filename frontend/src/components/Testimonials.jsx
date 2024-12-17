import React, { useState, useEffect } from "react";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "John Doe",
      position: "CEO & Founder",
      message:
        "This platform has revolutionized my reading experience. The personalized recommendations are spot on, and the collection of books is impressive!",
      image:
        "https://images.pexels.com/photos/2204534/pexels-photo-2204534.jpeg",
    },
    {
      id: 2,
      name: "Jane Smith",
      position: "COO & Co-Founder",
      message:
        "I can't imagine going back to a regular library after using this platform. It's user-friendly, intuitive, and has made my reading journey enjoyable.",
      image:
        "https://images.pexels.com/photos/3775587/pexels-photo-3775587.jpeg",
    },
    {
      id: 3,
      name: "Alice Johnson",
      position: "CTO",
      message:
        "The technology behind this platform is top-notch. As a book lover and tech enthusiast, I'm truly impressed by how seamlessly everything works.",
      image:
        "https://images.pexels.com/photos/3156389/pexels-photo-3156389.jpeg",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [animationClass, setAnimationClass] = useState("animate__fadeInRight");

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationClass("animate__fadeOutLeft");
      setTimeout(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
        );
        setAnimationClass("animate__fadeInRight");
      }, 500); // Sincronizar com a animação de saída
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section id="testimonials" className="py-16 px-4 bg-white text-wood-brown">
      <div className="container mx-auto text-center">
        {/* Título da seção */}
        <h2 className="text-4xl font-bold mb-8">What Our Users Say</h2>

        {/* Slide ativo */}
        <div className="relative">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`${
                index === currentIndex ? "block" : "hidden"
              } bg-transparent p-6 rounded-lg transform transition duration-500 ease-in-out animate__animated ${animationClass}`}
            >
              {/* Ícone de citação */}
              <FaQuoteLeft className="text-4xl text-wood-brown mb-4 mx-auto" />

              {/* Mensagem do Depoimento */}
              <p className="text-lg italic mb-4">{testimonial.message}</p>

              {/* Informações do autor */}
              <div className="flex justify-center items-center mt-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="rounded-full w-16 h-16 mr-4"
                />
                <div>
                  <h4 className="text-xl font-semibold">{testimonial.name}</h4>
                  <p>{testimonial.position}</p>
                </div>
              </div>

              {/* Ícone de citação final */}
              <FaQuoteRight className="text-4xl text-wood-brown mt-4 mx-auto" />
            </div>
          ))}
        </div>

        {/* Indicadores de navegação */}
        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
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
      </div>
    </section>
  );
};

export default Testimonials;
