import React, { useState, useEffect } from "react";
import { FaSearch, FaEdit, FaTrashAlt, FaTh, FaList } from "react-icons/fa";
import axiosInstance from "../utils/axiosInstance";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Componente FallbackImageIcon para exibir o SVG como fallback
const FallbackImageIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" style={{ enableBackground: "new 0 0 32 32" }} xmlSpace="preserve">
    <path d="M16 31C7.729 31 1 24.271 1 16S7.729 1 16 1s15 6.729 15 15-6.729 15-15 15zm0-28C8.832 3 3 8.832 3 16s5.832 13 13 13 13-5.832 13-13S23.168 3 16 3z"/>
    <circle cx="16" cy="15.133" r="4.267"/>
    <path d="M16 30c2.401 0 4.66-.606 6.635-1.671-.425-3.229-3.18-5.82-6.635-5.82s-6.21 2.591-6.635 5.82A13.935 13.935 0 0 0 16 30z"/>
  </svg>
);

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState(window.innerWidth < 768 ? "grid" : "table");
  const [modalVisible, setModalVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get("/api/users/get");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("Erro ao carregar usuários!");
      }
    };

    fetchUsers();

    const handleResize = () => {
      if (window.innerWidth < 768 && viewMode === "table") {
        setViewMode("grid");
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [viewMode]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (user) => {
    setCurrentUser(user);
    setModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/api/users/delete/${id}`);
      setUsers(users.filter((user) => user.id !== id));
      toast.success("Usuário excluído com sucesso!");
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Erro ao excluir usuário!");
    }
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setCurrentUser(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.put(`/api/users/edit/${currentUser.id}`, currentUser);
      setUsers(users.map((user) => (user.id === currentUser.id ? currentUser : user)));
      toast.success("Usuário editado com sucesso!");
      handleModalClose();
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Erro ao editar usuário!");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 mt-10 text-center text-[#3E2A47]">
        Users
      </h2>

      {/* Search Bar */}
      <div className="mb-6 flex flex-wrap items-center bg-[#D1B29E] p-3 rounded-lg shadow-md">
        <FaSearch size={20} className="text-[#6E4B3D] mr-3" />
        <input
          type="text"
          placeholder="Search users..."
          className="flex-grow px-4 py-2 bg-transparent border border-[#A67C52] rounded-lg"
          value={searchTerm}
          onChange={handleSearch}
        />
        <div className="ml-4 flex space-x-2 mt-2 md:mt-0">
          <button
            className={`p-2 rounded-lg ${viewMode === "table" ? "bg-[#A67C52] text-white" : "bg-white border border-[#A67C52] text-[#A67C52]"}`}
            onClick={() => setViewMode("table")}
          >
            <FaList size={20} />
          </button>
          <button
            className={`p-2 rounded-lg ${viewMode === "grid" ? "bg-[#A67C52] text-white" : "bg-white border border-[#A67C52] text-[#A67C52]"}`}
            onClick={() => setViewMode("grid")}
          >
            <FaTh size={20} />
          </button>
        </div>
      </div>

      {/* User View */}
      {viewMode === "table" ? (
        <div className="overflow-x-auto">
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
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-[#F5E0C1] transition-all duration-200 ease-in-out">
                  <td className="px-6 py-4 border-b text-[#3E2A47]">
                    {user.profile_picture ? (
                      <img
                        src={user.profile_picture}
                        alt={user.name}
                        className="w-10 h-10 rounded-full"
                      />
                    ) : (
                      <FallbackImageIcon className="w-10 h-10" />
                    )}
                  </td>
                  <td className="px-6 py-4 border-b text-[#3E2A47]">{user.name}</td>
                  <td className="px-6 py-4 border-b text-[#3E2A47]">{user.email}</td>
                  <td className="px-6 py-4 border-b text-[#3E2A47]">
                    <span className={`px-2 py-1 rounded-full text-sm ${user.role === "Admin" ? "bg-[#6A4F3C] text-white" : "bg-[#B89D6B] text-white"}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 border-b text-[#3E2A47]">
                    <button
                      className="text-[#307bb5] hover:text-[#6A4F3C] transition-colors duration-200"
                      onClick={() => handleEdit(user)}
                    >
                      <FaEdit size={20} />
                    </button>
                    <button
                      className="text-[#eb2e2e] hover:text-[#A67C52] ml-4 transition-colors duration-200"
                      onClick={() => handleDelete(user.id)}
                    >
                      <FaTrashAlt size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredUsers.map((user) => (
            <div key={user.id} className="bg-[#F5E0C1] p-6 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105 flex items-center">
              <div className="flex-grow">
                <h3 className="text-xl font-bold text-[#3E2A47]">{user.name}</h3>
                <p className="text-[#6E4B3D]">{user.email}</p>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${user.role === "Admin" ? "bg-[#6A4F3C] text-white" : "bg-[#B89D6B] text-white"}`}
                >
                  {user.role}
                </span>
              </div>
              <div className="ml-4 flex space-x-2">
                <button
                  className="text-[#307bb5] hover:text-[#6A4F3C] transition-colors duration-200"
                  onClick={() => handleEdit(user)}
                >
                  <FaEdit size={20} />
                </button>
                <button
                  className="text-[#eb2e2e] hover:text-[#A67C52] transition-colors duration-200"
                  onClick={() => handleDelete(user.id)}
                >
                  <FaTrashAlt size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Edit */}
      {modalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-96">
            <h3 className="text-2xl font-bold text-[#3E2A47] mb-4">Editar Usuário</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-[#3E2A47]">Nome</label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 bg-transparent border border-[#A67C52] rounded-lg"
                  value={currentUser?.name || ""}
                  onChange={(e) => setCurrentUser({ ...currentUser, name: e.target.value })}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-[#3E2A47]">Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 bg-transparent border border-[#A67C52] rounded-lg"
                  value={currentUser?.email || ""}
                  onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="role" className="block text-[#3E2A47]">Papel</label>
                <select
                  id="role"
                  className="w-full px-4 py-2 bg-transparent border border-[#A67C52] rounded-lg"
                  value={currentUser?.role || ""}
                  onChange={(e) => setCurrentUser({ ...currentUser, role: e.target.value })}
                >
                  <option value="reader">Reader</option>
                  <option value="admin">Admin</option>
                  <option value="writer">Writer</option>
                </select>
              </div>
              <div className="flex justify-between">
                <button type="submit" className="bg-[#6A4F3C] text-white px-6 py-2 rounded-lg hover:bg-[#A67C52]">
                  Salvar
                </button>
                <button
                  type="button"
                  onClick={handleModalClose}
                  className="bg-[#B89D6B] text-white px-6 py-2 rounded-lg hover:bg-[#6A4F3C]"
                >
                  Fechar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

export default UserList;
