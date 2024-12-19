import React, { useState } from 'react';
import { FaUsers, FaBook, FaDollarSign, FaRegListAlt, FaBell } from 'react-icons/fa';
import StatsCard from './StatsCard';

const Dashboard = () => {
  const [showNotifications, setShowNotifications] = useState(false);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-wood-brown">Dashboard</h2>
      
      {/* Notificação de Atividade */}
      <div className="absolute top-6 right-6">
        <button onClick={toggleNotifications} className="relative">
          <FaBell size={30} className="text-wood-brown" />
          <span className="absolute top-0 right-0 text-xs text-white bg-red-600 rounded-full px-2">3</span>
        </button>
      </div>

      {/* Caixa de Notificação */}
      {showNotifications && (
        <div className="absolute top-16 right-6 bg-white shadow-lg p-4 rounded-lg w-96 z-10">
          <h4 className="text-xl font-semibold text-wood-brown mb-4">Recent Notifications</h4>
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
              <FaDollarSign size={20} className="text-wood-brown mr-3" />
              <div>
                <p className="font-semibold">Sale completed: "The Catcher in the Rye"</p>
                <span className="text-sm text-gray-600">8 hours ago</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-16">
        <StatsCard 
          title="Total Users" 
          value="500" 
          icon={<FaUsers size={30} />} 
          color="bg-[#B89D6B]" // Castanho suave
        />
        <StatsCard 
          title="Total Books" 
          value="120" 
          icon={<FaBook size={30} />} 
          color="bg-[#4CAF50]" // Verde claro
        />
        <StatsCard 
          title="Total Revenue" 
          value="$3000" 
          icon={<FaDollarSign size={30} />} 
          color="bg-[#FF8C00]" // Laranja suave
        />
      </div>

    
    </div>
  );
};

export default Dashboard;
