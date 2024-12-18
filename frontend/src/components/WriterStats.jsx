import React from "react";
import { FaBook, FaDollarSign, FaEye, FaStar, FaUsers } from "react-icons/fa"; // Adicionando FaStar
import { motion } from "framer-motion";

const WriterStats = () => {
  const stats = {
    publishedBooks: 5,
    totalSales: 150,
    totalReads: 1200,
    ratings: 4.8,
    followers: 350,
  };

  const statsData = [
    {
      id: 1,
      value: stats.publishedBooks,
      label: "Published Books",
      icon: <FaBook className="text-yellow-500 text-4xl" />,
    },
    {
      id: 2,
      value: `$${stats.totalSales}`,
      label: "Total Sales",
      icon: <FaDollarSign className="text-green-500 text-4xl" />,
    },
    {
      id: 3,
      value: stats.totalReads,
      label: "Total Reads",
      icon: <FaEye className="text-blue-500 text-4xl" />,
    },
    {
      id: 4,
      value: `${stats.ratings} / 5`,
      label: "Average Rating",
      icon: <FaStar className="text-yellow-400 text-4xl" />, // FaStar corrigido
    },
    {
      id: 5,
      value: stats.followers,
      label: "Followers",
      icon: <FaUsers className="text-purple-500 text-4xl" />,
    },
  ];

  return (
    <div className="bg-white p-6 shadow-lg rounded-lg grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {statsData.map((stat) => (
        <motion.div
          key={stat.id}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: stat.id * 0.1 }}
          className="flex items-center space-x-4 bg-[#e4d0a3] p-4 rounded-lg shadow hover:shadow-md transition duration-300"
        >
          {/* Ícone */}
          <div className="flex items-center justify-center w-16 h-16 bg-gray-200 rounded-full">
            {stat.icon}
          </div>

          {/* Informações */}
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
            <p className="text-sm text-gray-500">{stat.label}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default WriterStats;
