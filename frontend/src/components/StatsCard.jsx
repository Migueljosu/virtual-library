import React from 'react';

const StatsCard = ({ title, value, icon, color }) => {
  return (
    <div
      className={`p-6 rounded-lg shadow-xl ${color} text-white flex items-center justify-between space-x-6 transition-all transform hover:scale-105 hover:shadow-2xl`}
    >
      <div>
        <div className="text-3xl font-semibold">{icon}</div>
        <p className="text-lg">{title}</p>
      </div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  );
};

export default StatsCard;
