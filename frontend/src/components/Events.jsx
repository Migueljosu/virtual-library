import React from "react";
import { FaCalendarAlt, FaInfoCircle } from "react-icons/fa"; // Ícones para os eventos
import 'animate.css';
import libraryBackground from "../assets/images/books-1842306_1280.jpg"; // Importe a imagem de fundo

const Events = () => {
  const events = [
    {
      title: "Virtual Library Launch",
      description: "Join us for the grand opening of our online library platform with live discussions and book recommendations.",
      date: "January 20, 2025",
      detailsLink: "#"
    },
    {
      title: "Author Webinar: Writing Your First Book",
      description: "A live webinar with renowned authors discussing the journey of writing and publishing a book.",
      date: "February 15, 2025",
      detailsLink: "#"
    },
    {
      title: "Reading Challenge 2025",
      description: "Participate in our yearly reading challenge with exciting prizes and a chance to showcase your progress.",
      date: "March 1, 2025",
      detailsLink: "#"
    },
  ];

  return (
    <section 
      id="events" 
      className="bg-wood-brown text-white py-16 px-4 relative"
      style={{
        backgroundImage: `url(${libraryBackground})`, // Usando a imagem importada
        backgroundSize: "cover", 
        backgroundPosition: "center", 
        backgroundAttachment: "fixed",
      }}
    >
      <div className="container mx-auto text-center">
        {/* Título da seção */}
        <h2 className="text-4xl font-bold mb-8 animate__animated animate__fadeIn">
          Upcoming Events
        </h2>

        {/* Lista de eventos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <div
              key={index}
              className="bg-white text-wood-brown p-8 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out animate__animated animate__fadeIn animate__delay-2s"
            >
              <FaCalendarAlt className="text-4xl mb-4 mx-auto text-yellow-500" />
              <h3 className="text-2xl font-semibold mb-2">{event.title}</h3>
              <p className="text-gray-600 mb-4">{event.description}</p>
              <p className="text-lg font-semibold mb-4">{event.date}</p>
              <a
                href={event.detailsLink}
                className="inline-block bg-wood-brown text-white py-2 px-6 rounded-full hover:bg-brown-700 transition duration-300 ease-in-out"
              >
                <FaInfoCircle className="inline-block mr-2" />
                More Details
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Events;
