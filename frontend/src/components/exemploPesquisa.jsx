import React, { useState } from "react";
import { FaSearch, FaStar, FaBook, FaUser, FaCalendarAlt } from "react-icons/fa"; // Importando ícones

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [filtersVisible, setFiltersVisible] = useState(false);

  return (
    <section className="bg-wood-brown py-16 px-4">
      <h2 className="text-4xl text-white font-bold text-center mb-8">Search for Books</h2>

      {/* Barra de pesquisa */}
      <div className="flex justify-center">
        <div className="relative w-full max-w-4xl">
          <input
            type="text"
            className="w-full p-4 pr-12 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-wood-brown transition-all duration-300"
            placeholder="Search books, authors, categorias..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <FaSearch
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-wood-brown"
            size={20}
          />
        </div>
      </div>

      {/* Botão para exibir filtros */}
      <div className="mt-4 flex justify-center mb-4">
        <button
          onClick={() => setFiltersVisible(!filtersVisible)}
          className="px-6 py-2 bg-white text-wood-brown border border-wood-brown rounded-md hover:bg-wood-brown hover:text-white transition-all duration-300"
        >
          Filter Options
        </button>
      </div>

      {/* Filtros de pesquisa */}
      {filtersVisible && (
        <div className="mt-4 flex justify-center gap-6 flex-wrap">
          <div className="flex items-center gap-2">
            <FaBook className="text-white" size={20} />
            <h3 className="text-white text-lg font-semibold mb-2">Categoria</h3>
            {/* Subfiltro de Gêneros */}
            <div className="flex flex-col gap-2">
              {["Fiction", "Non-fiction", "Fantasy", "Science", "Mystery"].map((categoria) => (
                <label key={categoria} className="flex items-center text-white">
                  <input type="radio" name="categoria" className="mr-2" /> {categoria}
                </label>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <FaUser className="text-white" size={20} />
            <h3 className="text-white text-lg font-semibold mb-2">Author</h3>
            {/* Subfiltro de Autores */}
            <div className="flex flex-col gap-2">
              {["J.K. Rowling", "George Orwell", "Isaac Asimov", "Agatha Christie"].map((author) => (
                <label key={author} className="flex items-center text-white">
                  <input type="radio" name="author" className="mr-2" /> {author}
                </label>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <FaStar className="text-white" size={20} />
            <h3 className="text-white text-lg font-semibold mb-2">Rating</h3>
            {/* Subfiltro de Rating */}
            <div className="flex flex-col gap-2">
              {[0, 1, 2, 3, 4, 5].map((rating) => (
                <label key={rating} className="flex items-center text-white">
                  <input type="radio" name="rating" className="mr-2" /> {rating} Stars
                </label>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <FaStar className="text-white" size={20} />
            <h3 className="text-white text-lg font-semibold mb-2">Recommendations</h3>
            {/* Subfiltro de Recomendações */}
            <div className="flex flex-col gap-2">
              {["Bestsellers", "Highly Rated", "Top Picks", "New Arrivals"].map((recommendation) => (
                <label key={recommendation} className="flex items-center text-white">
                  <input type="radio" name="recommendation" className="mr-2" /> {recommendation}
                </label>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-white" size={20} />
            <h3 className="text-white text-lg font-semibold mb-2">Year</h3>
            {/* Subfiltro de Ano */}
            <div className="flex flex-col gap-2">
              {[2024, 2023, 2022, 2021, 2020].map((year) => (
                <label key={year} className="flex items-center text-white">
                  <input type="radio" name="year" className="mr-2" /> {year}
                </label>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-white" size={20} />
            <h3 className="text-white text-lg font-semibold mb-2">Availability</h3>
            {/* Subfiltro de Disponibilidade */}
            <div className="flex flex-col gap-2">
              {["In Stock", "Out of Stock", "Pre-order"].map((availability) => (
                <label key={availability} className="flex items-center text-white">
                  <input type="radio" name="availability" className="mr-2" /> {availability}
                </label>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default SearchBar;
