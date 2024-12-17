import React from "react";
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
const Home = () => {
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
    </div>
  );
};

export default Home;
