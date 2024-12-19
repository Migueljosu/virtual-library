import React, { useState } from 'react';
import { FaSearch, FaEdit, FaTrashAlt, FaTh, FaList } from 'react-icons/fa';

const UserList = () => {
  // Exemplo de dados dos usuários
  const users = [
    {
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Admin',
      photo: 'https://via.placeholder.com/100',
    },
    {
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'User',
      photo: 'https://via.placeholder.com/100',
    },
    {
      name: 'Robert Brown',
      email: 'robert@example.com',
      role: 'User',
      photo: 'https://via.placeholder.com/100',
    },
    {
      name: 'Alice Johnson',
      email: 'alice@example.com',
      role: 'Admin',
      photo: 'https://via.placeholder.com/100',
    },
    {
      name: 'Charlie White',
      email: 'charlie@example.com',
      role: 'User',
      photo: 'https://via.placeholder.com/100',
    },
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('table');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-[#3E2A47]">Users</h2>

      {/* Search Bar */}
      <div className="mb-6 flex items-center bg-[#D1B29E] p-3 rounded-lg shadow-md">
        <FaSearch size={20} className="text-[#6E4B3D] mr-3" />
        <input
          type="text"
          placeholder="Search users..."
          className="w-full px-4 py-2 bg-transparent border border-[#A67C52] rounded-lg"
          value={searchTerm}
          onChange={handleSearch}
        />
        <div className="ml-4 flex space-x-2">
          <button
            className={`p-2 rounded-lg ${viewMode === 'table' ? 'bg-[#A67C52] text-white' : 'bg-white border border-[#A67C52] text-[#A67C52]'}`}
            onClick={() => setViewMode('table')}
          >
            <FaList size={20} />
          </button>
          <button
            className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-[#A67C52] text-white' : 'bg-white border border-[#A67C52] text-[#A67C52]'}`}
            onClick={() => setViewMode('grid')}
          >
            <FaTh size={20} />
          </button>
        </div>
      </div>

      {/* User View */}
      {viewMode === 'table' ? (
        <table className="min-w-full bg-white border border-[#A67C52] rounded-lg shadow-md">
          <thead className="bg-[#C49A6C]">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-[#3E2A47]">Photo</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-[#3E2A47]">Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-[#3E2A47]">Email</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-[#3E2A47]">Role</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-[#3E2A47]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, idx) => (
              <tr key={idx} className="hover:bg-[#F5E0C1] transition-all duration-200 ease-in-out">
                <td className="px-6 py-4 border-b text-[#3E2A47]">
                  <img src={user.photo} alt={user.name} className="w-10 h-10 rounded-full" />
                </td>
                <td className="px-6 py-4 border-b text-[#3E2A47]">{user.name}</td>
                <td className="px-6 py-4 border-b text-[#3E2A47]">{user.email}</td>
                <td className="px-6 py-4 border-b text-[#3E2A47]">
                  <span className={`px-2 py-1 rounded-full text-sm ${user.role === 'Admin' ? 'bg-[#6A4F3C] text-white' : 'bg-[#B89D6B] text-white'}`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 border-b text-[#3E2A47]">
                  <button className="text-[#307bb5] hover:text-[#6A4F3C] transition-colors duration-200">
                    <FaEdit size={20} />
                  </button>
                  <button className="text-[#eb2e2e] hover:text-[#A67C52] ml-4 transition-colors duration-200">
                    <FaTrashAlt size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredUsers.map((user, idx) => (
            <div
              key={idx}
              className="bg-[#F5E0C1] p-6 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105 flex items-center"
            >
              <div className="flex-grow">
                <h3 className="text-xl font-bold text-[#3E2A47]">{user.name}</h3>
                <p className="text-[#6E4B3D]">{user.email}</p>
                <span
                  className={`inline-block mt-2 px-3 py-1 rounded-full text-sm ${user.role === 'Admin' ? 'bg-[#6A4F3C] text-white' : 'bg-[#B89D6B] text-white'}`}
                >
                  {user.role}
                </span>
                <div className="mt-4 flex space-x-4">
                  <button className="text-[#307bb5] hover:text-[#6A4F3C] transition-colors duration-200">
                    <FaEdit size={20} />
                  </button>
                  <button className="text-[#eb2e2e] hover:text-[#A67C52] transition-colors duration-200">
                    <FaTrashAlt size={20} />
                  </button>
                </div>
              </div>
              <img src={user.photo} alt={user.name} className="w-20 h-20 rounded-full ml-4" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserList;
