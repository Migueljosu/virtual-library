import React, { useState, useEffect } from "react";
import { FaUsers, FaBook, FaRegListAlt, FaBell } from "react-icons/fa";
import StatsCard from "./StatsCard";
import axiosInstance from "../utils/axiosInstance";

const Dashboard = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalBooks: 0,
    totalCategories: 0,
  });

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axiosInstance.get("/api/stats");
        setStats(response.data);
      } catch (error) {
        console.error("Erro ao buscar os dados de stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="p-4 sm:p-6 mt-20 sm:mt-12 mx-auto max-w-screen-lg text-center">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-wood-brown">
        Dashboard
      </h2>

      {/* Notificação de Atividade */}
      <div className="absolute top-20 right-6">
        <button onClick={toggleNotifications} className="relative">
          <FaBell size={30} className="text-wood-brown" />
          <span className="absolute top-0 right-0 text-xs text-white bg-red-600 rounded-full px-2">
            3
          </span>
        </button>
      </div>

      {/* Caixa de Notificação */}
      {showNotifications && (
        <div className="absolute top-16 right-6 bg-white shadow-lg p-4 rounded-lg w-full sm:w-96 z-10">
          <h4 className="text-xl font-semibold text-wood-brown mb-4">
            Recent Notifications
          </h4>
          <div className="space-y-4">
            <div className="flex items-center p-2 hover:bg-gray-100 rounded-lg">
              <FaRegListAlt size={20} className="text-wood-brown mr-3" />
              <div>
                <p className="font-semibold">User John Doe added a new book</p>
                <span className="text-sm text-gray-600">2 hours ago</span>
              </div>
            </div>
            <div className="flex items-center p-2 hover:bg-gray-100 rounded-lg">
              <FaUsers size={20} className="text-wood-brown mr-3" />
              <div>
                <p className="font-semibold">New user Sarah Lee registered</p>
                <span className="text-sm text-gray-600">5 hours ago</span>
              </div>
            </div>
            <div className="flex items-center p-2 hover:bg-gray-100 rounded-lg">
              <FaBook size={20} className="text-wood-brown mr-3" />
              <div>
                <p className="font-semibold">
                  Sale completed: "The Catcher in the Rye"
                </p>
                <span className="text-sm text-gray-600">8 hours ago</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 sm:mt-16 justify-center items-center">
        <StatsCard
          title="Total Users"
          value={stats.totalUsers}
          icon={<FaUsers size={30} />}
          color="bg-[#B89D6B]" // Castanho suave
        />
        <StatsCard
          title="Total Books"
          value={stats.totalBooks}
          icon={<FaBook size={30} />}
          color="bg-[#4CAF50]" // Verde claro
        />
        <StatsCard
          title="Total Categories"
          value={stats.totalCategories}
          icon={<FaRegListAlt size={30} />}
          color="bg-[#FF8C00]" // Laranja suave
        />
      </div>
    </div>
  );
};

export default Dashboard;
