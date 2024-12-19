import React, { useState } from "react";
import { FaTachometerAlt, FaUsers, FaBook, FaCog, FaSignOutAlt } from 'react-icons/fa';
import Logo from '../assets/images/logo.svg'; // Importe sua logo aqui
import { useNavigate } from 'react-router-dom'; // Alterado para useNavigate

const Sidebar = ({ setActiveTab }) => {
  const navigate = useNavigate(); // Usando useNavigate para navegação
 const [loadingLogout, setLoadingLogout] = useState(false); // Estado para controlar o loader de logout
  const handleLogout = () => {
    setLoadingLogout(true); // Ativa o estado de loading

    setTimeout(() => {
      localStorage.removeItem("user"); // Remove o usuário do localStorage
      setLoadingLogout(false); // Desativa o estado de loading
      window.location.reload(); // Força a atualização da página
      navigate("/login"); // Redireciona para a página de login após a atualização
    }, 2000); // Atraso de 2 segundos para mostrar o loader
  };


  return (
    <div className="w-64 bg-wood-brown text-white min-h-screen p-6 fixed top-0 left-0 z-10">
      {/* Logo */}
      <div className="flex justify-center mb-8">
        <img src={Logo} alt="Logo" className="h-12 transition-transform transform hover:scale-110" />
      </div>

      {/* Título */}
      <h2 className="text-2xl font-bold text-center mb-6">Admin Panel</h2>

      {/* Navegação */}
      <ul className="space-y-6">
        {/* Dashboard */}
        <li
          onClick={() => setActiveTab('dashboard')}
          className="flex items-center space-x-4 cursor-pointer p-3 rounded-lg transition-all transform hover:bg-gradient-to-r hover:from-brown-500 hover:to-brown-700 hover:scale-105 hover:text-white"
        >
          <FaTachometerAlt size={20} />
          <span>Dashboard</span>
        </li>

        {/* Users */}
        <li
          onClick={() => setActiveTab('users')}
          className="flex items-center space-x-4 cursor-pointer p-3 rounded-lg transition-all transform hover:bg-gradient-to-r hover:from-brown-500 hover:to-brown-700 hover:scale-105 hover:text-white"
        >
          <FaUsers size={20} />
          <span>Users</span>
        </li>

        {/* Books */}
        <li
          onClick={() => setActiveTab('books')}
          className="flex items-center space-x-4 cursor-pointer p-3 rounded-lg transition-all transform hover:bg-gradient-to-r hover:from-brown-500 hover:to-brown-700 hover:scale-105 hover:text-white"
        >
          <FaBook size={20} />
          <span>Books</span>
        </li>

        {/* Post Books */}
        <li
          onClick={() => setActiveTab('publish_books')}
          className="flex items-center space-x-4 cursor-pointer p-3 rounded-lg transition-all transform hover:bg-gradient-to-r hover:from-brown-500 hover:to-brown-700 hover:scale-105 hover:text-white"
        >
          <FaBook size={20} />
          <span>Publish Books</span>
        </li>

        {/* Settings */}
        <li
          onClick={() => setActiveTab('Settings')}
          className="flex items-center space-x-4 cursor-pointer p-3 rounded-lg transition-all transform hover:bg-gradient-to-r hover:from-brown-500 hover:to-brown-700 hover:scale-105 hover:text-white"
        >
          <FaCog size={20} />
          <span>Settings</span>
        </li>

        {/* Logout */}
        <li
          onClick={handleLogout}
          className="flex items-center space-x-4 cursor-pointer p-3 rounded-lg transition-all transform hover:bg-gradient-to-r hover:from-brown-500 hover:to-brown-700 hover:scale-105 hover:text-white mt-6"
        >
          <FaSignOutAlt size={20} />
          <span>Logout</span>
        </li>
      </ul>

      {/* Footer Section */}
      <div className="mt-8 border-t pt-4 text-sm text-center">
        <p>&copy; 2024 YourCompany</p>
        <p>All Rights Reserved</p>
      </div>
    </div>
  );
};

export default Sidebar;
