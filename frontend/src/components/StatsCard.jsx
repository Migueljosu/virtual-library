import React from "react";

const StatsCard = ({ title, value, icon, color }) => {
  return (
    <div
      className={`p-6 rounded-lg shadow-xl ${color} text-white flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 transition-all transform hover:scale-105 hover:shadow-2xl`}
    >
      <div className="flex items-center justify-center text-3xl font-semibold">
        {icon}
      </div>
      <div className="text-center sm:text-left">
        <p className="text-lg">{title}</p>
        <div className="text-2xl font-bold">{value}</div>
      </div>
    </div>
  );
};

export default StatsCard;
