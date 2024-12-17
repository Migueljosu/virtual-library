import React from "react";

const BlogArticles = () => {
  const articles = [
    { 
      title: "How to Choose Your Next Book", 
      imgSrc: "https://images.unsplash.com/photo-1556740749-887f6717d7e4", // Exemplo de imagem do Unsplash
      excerpt: "Discover how to find your next great read...",
      link: "/blog/how-to-choose-your-next-book" // Link para o artigo completo
    },
    { 
      title: "Top 10 Books for 2019", 
      imgSrc: "https://media.istockphoto.com/id/1149165585/pt/foto/2019-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=QyHBwPleVRJM7zeOuqcUxasClVAOOH6llr1zieeDZMk=", // Exemplo de imagem do Unsplash
      excerpt: "Check out our picks for the top 10 books of this year...",
      link: "/blog/top-10-books-for-2024" // Link para o artigo completo
    },
    { 
      title: "The Best Classic Novels of All Time", 
      imgSrc: "https://images.unsplash.com/photo-1615413833480-6e8427dbcc5e?q=80&w=1886&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      excerpt: "Explore timeless classics that everyone should read...",
      link: "/blog/the-best-classic-novels" // Link para o artigo completo
    },
  ];

  return (
    <section className="py-16 px-4">
      <h2 className="text-4xl text-wood-brown font-bold text-center mb-8">Our Blog</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {articles.map((article, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-500 animate__animated animate__fadeIn animate__delay-1s"
          >
            <img 
              src={article.imgSrc} 
              alt={article.title} 
              className="w-full h-40 object-cover rounded-t-lg" 
            />
            <h3 className="text-2xl font-semibold mt-4">{article.title}</h3>
            <p className="text-gray-600 mt-2">{article.excerpt}</p>
            <a href={article.link}>
              <button className="mt-4 px-4 py-2 bg-wood-brown text-white rounded-md hover:bg-wood-brown-light transition-all duration-300">
                Read More
              </button>
            </a>
          </div>
        ))}
      </div>

      {/* Botão para ver mais artigos no blog */}
      <div className="flex justify-center mt-8">
        <a href="/blog">
          <button className="px-6 py-3 bg-wood-brown text-white text-xl rounded-md hover:bg-wood-brown-light transition-all duration-300">
            See All Blog Articles
          </button>
        </a>
      </div>
    </section>
  );
};

export default BlogArticles;
