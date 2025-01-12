import React, { useState } from "react";
import {
  FaTachometerAlt,
  FaUsers,
  FaBook,
  FaCog,
  FaSignOutAlt,
  FaTag,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import Logo from "../assets/images/logo.svg"; // Importe sua logo aqui
import { useNavigate } from "react-router-dom";

const Sidebar = ({ setActiveTab }) => {
  const navigate = useNavigate();
  const [loadingLogout, setLoadingLogout] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Estado para controlar o menu hambúrguer

  const handleLogout = () => {
    setLoadingLogout(true);

    setTimeout(() => {
      localStorage.removeItem("user");
      setLoadingLogout(false);
      window.location.reload();
      navigate("/login");
    }, 2000);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      {/* Menu Hamburger */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-wood-brown text-white fixed top-0 left-0 right-0 z-20">
        <img src={Logo} alt="Logo" className="h-8" />
        <button onClick={toggleSidebar} className="text-white focus:outline-none">
          {isSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Overlay para fechar o sidebar ao clicar fora */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
          onClick={closeSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 fixed top-0 left-0 bg-wood-brown text-white min-h-screen p-6 w-64 z-20 transition-transform duration-300`}
      >
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img
            src={Logo}
            alt="Logo"
            className="h-12 transition-transform transform hover:scale-110"
          />
        </div>

        {/* Título */}
        <h2 className="text-2xl font-bold text-center mb-6">Admin Panel</h2>

        {/* Navegação */}
        <ul className="space-y-6">
          <li
            onClick={() => {
              setActiveTab("dashboard");
              closeSidebar(); // Fecha o sidebar ao clicar
            }}
            className="flex items-center space-x-4 cursor-pointer p-3 rounded-lg transition-all transform hover:bg-gradient-to-r hover:from-brown-500 hover:to-brown-700 hover:scale-105 hover:text-white"
          >
            <FaTachometerAlt size={20} />
            <span>Dashboard</span>
          </li>
          <li
            onClick={() => {
              setActiveTab("users");
              closeSidebar();
            }}
            className="flex items-center space-x-4 cursor-pointer p-3 rounded-lg transition-all transform hover:bg-gradient-to-r hover:from-brown-500 hover:to-brown-700 hover:scale-105 hover:text-white"
          >
            <FaUsers size={20} />
            <span>Users</span>
          </li>
          <li
            onClick={() => {
              setActiveTab("books");
              closeSidebar();
            }}
            className="flex items-center space-x-4 cursor-pointer p-3 rounded-lg transition-all transform hover:bg-gradient-to-r hover:from-brown-500 hover:to-brown-700 hover:scale-105 hover:text-white"
          >
            <FaBook size={20} />
            <span>Books</span>
          </li>
          <li
            onClick={() => {
              setActiveTab("publish_books");
              closeSidebar();
            }}
            className="flex items-center space-x-4 cursor-pointer p-3 rounded-lg transition-all transform hover:bg-gradient-to-r hover:from-brown-500 hover:to-brown-700 hover:scale-105 hover:text-white"
          >
            <FaBook size={20} />
            <span>Publish Books</span>
          </li>
          <li
            onClick={() => {
              setActiveTab("Settings");
              closeSidebar();
            }}
            className="flex items-center space-x-4 cursor-pointer p-3 rounded-lg transition-all transform hover:bg-gradient-to-r hover:from-brown-500 hover:to-brown-700 hover:scale-105 hover:text-white"
          >
            <FaCog size={20} />
            <span>Settings</span>
          </li>
          <li
            onClick={() => {
              setActiveTab("CategoryManager");
              closeSidebar();
            }}
            className="flex items-center space-x-4 cursor-pointer p-3 rounded-lg transition-all transform hover:bg-gradient-to-r hover:from-brown-500 hover:to-brown-700 hover:scale-105 hover:text-white"
          >
            <FaTag size={20} />
            <span>Category Manager</span>
          </li>
          <li
            onClick={handleLogout}
            className="flex items-center space-x-4 cursor-pointer p-3 rounded-lg transition-all transform hover:bg-gradient-to-r hover:from-brown-500 hover:to-brown-700 hover:scale-105 hover:text-white mt-6"
          >
            <FaSignOutAlt size={20} />
            <span>Logout</span>
          </li>
        </ul>

        {/* Footer */}
        <div className="mt-8 border-t pt-4 text-sm text-center">
          <p>&copy; 2024 Virtual Library</p>
          <p>All Rights Reserved</p>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
