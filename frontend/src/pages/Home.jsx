import React, { useState } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import NewBooks from "../components/NewBooks";
import PopularBooks from "../components/PopularBooks";
import About from "../components/About";
import Events from "../components/Events";
import Testimonials from "../components/Testimonials";
import Contact from "../components/Contact";
import Newsletter from "../components/Newsletter";
import SearchBar from "../components/SearchBar";
import BlogArticles from "../components/BlogArticles";
import Footer from "../components/Footer";
import Chatbot from "../components/Chatbot"; // Importa o componente do Chatbot
import { FaRobot } from "react-icons/fa"; // Corretamente importar o FaRobot

const Home = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  
    const toggleChat = () => {
      setIsChatOpen(!isChatOpen);
    };
  return (
    <div>
      <Header />
      <Hero />
      <section id="search">
        <SearchBar />
      </section>
      <section id="new-books">
        <NewBooks />
      </section>
      <section id="popular-books">
        <PopularBooks />
      </section>
      <section id="blog-articles">
        <BlogArticles />
      </section>
      <section id="about">
        <About />
      </section>
      <section id="events">
        <Events />
      </section>
      <section id="testimonials">
        <Testimonials />
      </section>
      <section id="contact">
        <Contact />
      </section>
      <section id="newsletter">
        <Newsletter />
      </section>
      <Footer />

       {/* Renderiza o chatbot se for aberto */}
       {isChatOpen && <Chatbot closeChat={toggleChat} />}

{/* Botão para abrir o chatbot */}
<button
  onClick={toggleChat}
  className="fixed bottom-8 left-8 p-4 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600"
>
  <FaRobot className="text-white" />
</button>
    </div>
  );
};

export default Home;
