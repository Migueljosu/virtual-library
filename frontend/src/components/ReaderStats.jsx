import React from "react";
import { FaBook, FaBookmark, FaHourglassStart } from "react-icons/fa";
import { motion } from "framer-motion"; // Usaremos o Framer Motion para animações

const ReaderStats = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {/* Estátistica de Livros Lidos */}
      <motion.div
        className="p-6 bg-white shadow-xl rounded-lg hover:shadow-2xl transition-all duration-300"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center space-x-4">
          <FaBook className="text-4xl text-wood-brown" />
          <h3 className="text-xl font-semibold text-wood-brown">Books Read</h3>
        </div>
        <p className="text-4xl font-bold text-wood-brown mt-4">15</p>
      </motion.div>

      {/* Estátistica de Livros em Progresso */}
      <motion.div
        className="p-6 bg-white shadow-xl rounded-lg hover:shadow-2xl transition-all duration-300"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex items-center space-x-4">
          <FaHourglassStart className="text-4xl text-wood-brown" />
          <h3 className="text-xl font-semibold text-wood-brown">Books in Progress</h3>
        </div>
        <p className="text-4xl font-bold text-wood-brown mt-4">3</p>
      </motion.div>

      {/* Estátistica de Livros Favoritos */}
      <motion.div
        className="p-6 bg-white shadow-xl rounded-lg hover:shadow-2xl transition-all duration-300"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="flex items-center space-x-4">
          <FaBookmark className="text-4xl text-wood-brown" />
          <h3 className="text-xl font-semibold text-wood-brown">Books Favorited</h3>
        </div>
        <p className="text-4xl font-bold text-wood-brown mt-4">7</p>
      </motion.div>
    </div>
  );
};

export default ReaderStats;
