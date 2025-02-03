import React, { useState } from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify"; // Importando Toastify
import "react-toastify/dist/ReactToastify.css"; // Importando o CSS
import axiosInstance from "../utils/axiosInstance";

const Contact = ({ user }) => {
  const [formData, setFormData] = useState({
    name: user ? user.name : "",
    email: user ? user.email : "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          Authorization: user ? `Bearer ${localStorage.getItem("token")}` : "",
        },
      };

      const { data } = await axiosInstance.post(
        "/api/contact/send",
        formData,
        config
      );

      toast.success(data.message);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      toast.error(error.response?.data?.message || "Error sending message.");
    }
  };
  return (
    <section id="contact" className="bg-white py-16 px-4">
      <ToastContainer /> {/* Componente do Toastify */}
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
                <p>123 Library Lane, Luanda, Angola</p>
              </div>
              <div className="flex items-center">
                <FaPhone className="text-wood-brown text-xl mr-4" />
                <p>+244 946 567 890</p>
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
            <form className="space-y-6" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className="block w-full p-3 border border-gray-300 rounded"
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="block w-full p-3 border border-gray-300 rounded"
                required
              />
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject"
                className="block w-full p-3 border border-gray-300 rounded"
                required
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                placeholder="Message"
                className="block w-full p-3 border border-gray-300 rounded"
                required
              />
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
