import React from "react";

// Ícones para adicionar (usei exemplos de bibliotecas de ícones)
import { FaRocket, FaUsers, FaLightbulb, FaRegSmile } from "react-icons/fa";

const About = () => {
  return (
    <section id="about" className="bg-wood-brown text-white py-16 px-4">
      <div className="container mx-auto text-center">
        {/* Título da seção */}
        <h2 className="text-4xl font-bold mb-8 animate__animated animate__fadeIn">
          About Us
        </h2>

        {/* Parágrafo de introdução */}
        <p className="text-lg mb-16 animate__animated animate__fadeIn animate__delay-1s">
          Welcome to our Virtual Library. We are committed to bringing you the best of literature with an innovative approach, combining technology and education to enrich your reading experience.
        </p>

        {/* Cards de Missão, Visão, Valores */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* Missão */}
          <div className="bg-white text-wood-brown p-8 rounded-lg transform hover:scale-105 transition duration-300 ease-in-out animate__animated animate__fadeIn animate__delay-2s">
            <FaRocket className="text-4xl mb-4 mx-auto" />
            <h3 className="text-2xl font-semibold mb-2">Our Mission</h3>
            <p>
              To provide an accessible and inspiring platform for book lovers, offering personalized recommendations and enhancing reading habits.
            </p>
          </div>

          {/* Visão */}
          <div className="bg-white text-wood-brown p-8 rounded-lg transform hover:scale-105 transition duration-300 ease-in-out animate__animated animate__fadeIn animate__delay-3s">
            <FaLightbulb className="text-4xl mb-4 mx-auto" />
            <h3 className="text-2xl font-semibold mb-2">Our Vision</h3>
            <p>
              To be the leading online library for everyone, inspiring curiosity and fostering a love of reading through technology.
            </p>
          </div>

          {/* Valores */}
          <div className="bg-white text-wood-brown p-8 rounded-lg transform hover:scale-105 transition duration-300 ease-in-out animate__animated animate__fadeIn animate__delay-4s">
            <FaRegSmile className="text-4xl mb-4 mx-auto" />
            <h3 className="text-2xl font-semibold mb-2">Our Values</h3>
            <p>
              Innovation, accessibility, and dedication to fostering a positive impact on the global reading community.
            </p>
          </div>
        </div>

        {/* Seção sobre a equipe */}
        <div className="mt-16">
          <h3 className="text-3xl font-semibold mb-8 animate__animated animate__fadeIn animate__delay-5s">
            Meet Our Team
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {/* Card do membro da equipe */}
            <div className="bg-transparent text-white p-6 rounded-full max-w-xs mx-auto transform hover:scale-105 transition duration-300 ease-in-out animate__animated animate__fadeInUp animate__delay-6s">
              <img
                src="https://images.pexels.com/photos/2204534/pexels-photo-2204534.jpeg"
                alt="John Doe"
                className="rounded-full w-32 h-32 mx-auto mb-4 object-cover"
              />
              <h4 className="text-xl font-semibold">John Doe</h4>
              <p>CEO & Founder</p>
            </div>

            <div className="bg-transparent text-white p-6 rounded-full max-w-xs mx-auto transform hover:scale-105 transition duration-300 ease-in-out animate__animated animate__fadeInUp animate__delay-7s">
              <img
                src="https://images.pexels.com/photos/3775587/pexels-photo-3775587.jpeg"
                alt="Jane Smith"
                className="rounded-full w-32 h-32 mx-auto mb-4 object-cover"
              />
              <h4 className="text-xl font-semibold">Jane Smith</h4>
              <p>COO & Co-Founder</p>
            </div>

            <div className="bg-transparent text-white p-6 rounded-full max-w-xs mx-auto transform hover:scale-105 transition duration-300 ease-in-out animate__animated animate__fadeInUp animate__delay-8s">
              <img
                src="https://images.pexels.com/photos/3156389/pexels-photo-3156389.jpeg"
                alt="Alice Johnson"
                className="rounded-full w-32 h-32 mx-auto mb-4 object-cover"
              />
              <h4 className="text-xl font-semibold">Alice Johnson</h4>
              <p>CTO</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
