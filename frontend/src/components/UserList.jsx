import React, { useState, useEffect } from "react";
import { FaSearch, FaEdit, FaTrashAlt, FaTh, FaList } from "react-icons/fa";
import axiosInstance from "../utils/axiosInstance";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState(
    window.innerWidth < 768 ? "grid" : "table"
  );
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

    // Atualiza o modo de exibição com base no tamanho da tela
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
      setUsers(
        users.map((user) => (user.id === currentUser.id ? currentUser : user))
      );
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
            className={`p-2 rounded-lg ${
              viewMode === "table"
                ? "bg-[#A67C52] text-white"
                : "bg-white border border-[#A67C52] text-[#A67C52]"
            }`}
            onClick={() => setViewMode("table")}
          >
            <FaList size={20} />
          </button>
          <button
            className={`p-2 rounded-lg ${
              viewMode === "grid"
                ? "bg-[#A67C52] text-white"
                : "bg-white border border-[#A67C52] text-[#A67C52]"
            }`}
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
                <th className="px-6 py-3 text-left text-sm font-semibold text-[#3E2A47]">
                  Photo
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-[#3E2A47]">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-[#3E2A47]">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-[#3E2A47]">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-[#3E2A47]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-[#F5E0C1] transition-all duration-200 ease-in-out"
                >
                  <td className="px-6 py-4 border-b text-[#3E2A47]">
                    <img
                      src={
                        user.profile_picture ||
                        "https://via.placeholder.com/100"
                      }
                      alt={user.name}
                      className="w-10 h-10 rounded-full"
                    />
                  </td>
                  <td className="px-6 py-4 border-b text-[#3E2A47]">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 border-b text-[#3E2A47]">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 border-b text-[#3E2A47]">
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${
                        user.role === "Admin"
                          ? "bg-[#6A4F3C] text-white"
                          : "bg-[#B89D6B] text-white"
                      }`}
                    >
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
            <div
              key={user.id}
              className="bg-[#F5E0C1] p-6 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105 flex items-center"
            >
              <div className="flex-grow">
                <h3 className="text-xl font-bold text-[#3E2A47]">
                  {user.name}
                </h3>
                <p className="text-[#6E4B3D]">{user.email}</p>
                <span
                  className={`inline-block mt-2 px-3 py-1 rounded-full text-sm ${
                    user.role === "Admin"
                      ? "bg-[#6A4F3C] text-white"
                      : "bg-[#B89D6B] text-white"
                  }`}
                >
                  {user.role}
                </span>
                <div className="mt-4 flex space-x-4">
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
              <img
                src={user.profile_picture || "https://via.placeholder.com/100"}
                alt={user.name}
                className="w-20 h-20 rounded-full ml-4"
              />
            </div>
          ))}
        </div>
      )}

      {modalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-96">
            {/* Modal content */}
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default UserList;
