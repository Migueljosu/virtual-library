import React, { useState, useEffect } from "react";
import { FaBook, FaBookmark, FaHourglassStart } from "react-icons/fa";
import { motion } from "framer-motion"; // Usaremos o Framer Motion para animações
import axiosInstance from "../utils/axiosInstance";

const ReaderStats = () => {
  // Definindo os estados para armazenar as estatísticas
  const [stats, setStats] = useState({
    completedBooksCount: 0,
    inProgressBooksCount: 0,
    favoriteBooksCount: 0,
  });

  // Função para buscar as estatísticas do usuário
  const fetchStatistics = async () => {
    try {
      const response = await axiosInstance.get("/api/user/statistics");
      setStats(response.data); // Atualiza o estado com os dados da API
    } catch (error) {
      console.error("Erro ao obter as estatísticas:", error);
    }
  };

  // Chama a função para buscar as estatísticas quando o componente for montado
  useEffect(() => {
    fetchStatistics();
  }, []);

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
        <p className="text-4xl font-bold text-wood-brown mt-4">{stats.completedBooksCount}</p>
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
        <p className="text-4xl font-bold text-wood-brown mt-4">{stats.inProgressBooksCount}</p>
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
        <p className="text-4xl font-bold text-wood-brown mt-4">{stats.favoriteBooksCount}</p>
      </motion.div>
    </div>
  );
};

export default ReaderStats;
