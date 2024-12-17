import React from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Contact = () => {
  return (
    <section id="contact" className="bg-white py-16 px-4">
      <div className="container mx-auto">
        {/* Título da seção */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-wood-brown mb-4 animate__animated animate__fadeInDown">
            Get in Touch
          </h2>
          <p className="text-lg text-gray-700 animate__animated animate__fadeInDown animate__delay-1s">
            Feel free to reach out to us via social media or by sending us a
            message using the form below.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Coluna 1: Redes sociais e informações de contato */}
          <div className="animate__animated animate__fadeInLeft">
            <h3 className="text-2xl font-semibold text-wood-brown mb-4">
              Contact Information
            </h3>
            <p className="text-gray-700 mb-8">
              We're always here to help! Reach out to us through the following
              methods:
            </p>

            {/* Redes sociais */}
            <div className="flex space-x-4 mb-8">
              <a
                href="#"
                className="text-wood-brown hover:text-black text-3xl transition duration-300"
                aria-label="Facebook"
              >
                <FaFacebook />
              </a>
              <a
                href="#"
                className="text-wood-brown hover:text-black text-3xl transition duration-300"
                aria-label="Twitter"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                className="text-wood-brown hover:text-black text-3xl transition duration-300"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                className="text-wood-brown hover:text-black text-3xl transition duration-300"
                aria-label="LinkedIn"
              >
                <FaLinkedin />
              </a>
            </div>

            {/* Informações de contato */}
            <div className="space-y-4">
              <div className="flex items-center">
                <FaMapMarkerAlt className="text-wood-brown text-xl mr-4" />
                <p>123 Library Lane, Knowledge City, World</p>
              </div>
              <div className="flex items-center">
                <FaPhone className="text-wood-brown text-xl mr-4" />
                <p>+1 234 567 890</p>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="text-wood-brown text-xl mr-4" />
                <p>contact@virtualibrary.com</p>
              </div>
            </div>
          </div>

          {/* Coluna 2: Formulário */}
          <div className="bg-gray-100 p-8 rounded-lg shadow-lg animate__animated animate__fadeInRight">
            <h3 className="text-2xl font-semibold text-wood-brown mb-6">
              Send Us a Message
            </h3>
            <form className="space-y-6">
              {/* Nome */}
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  className="peer block w-full rounded-md bg-gray-50 px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-wood-brown"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="name"
                  className="absolute left-4 top-3 text-gray-600 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm peer-focus:text-wood-brown"
                >
                  Name
                </label>
              </div>

              {/* E-mail */}
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  className="peer block w-full rounded-md bg-gray-50 px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-wood-brown"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="email"
                  className="absolute left-4 top-3 text-gray-600 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm peer-focus:text-wood-brown"
                >
                  Email
                </label>
              </div>

              {/* Assunto */}
              <div className="relative">
                <input
                  type="text"
                  id="subject"
                  className="peer block w-full rounded-md bg-gray-50 px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-wood-brown"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="subject"
                  className="absolute left-4 top-3 text-gray-600 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm peer-focus:text-wood-brown"
                >
                  Subject
                </label>
              </div>

              {/* Mensagem */}
              <div className="relative">
                <textarea
                  id="message"
                  rows="4"
                  className="peer block w-full rounded-md bg-gray-50 px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-wood-brown"
                  placeholder=" "
                  required
                ></textarea>
                <label
                  htmlFor="message"
                  className="absolute left-4 top-3 text-gray-600 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm peer-focus:text-wood-brown"
                >
                  Message
                </label>
              </div>

              {/* Botão de enviar */}
              <button
                type="submit"
                className="w-full py-2 px-4 bg-wood-brown text-white font-semibold rounded-md shadow hover:bg-black transition duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
