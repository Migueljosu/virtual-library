import React, { useState, useEffect } from 'react';
import { FaSearch, FaEdit, FaTrashAlt, FaTh, FaList } from 'react-icons/fa';
import axiosInstance from '../utils/axiosInstance'; // Importe a instância do Axios
import { ToastContainer, toast } from 'react-toastify'; // Importe o ToastContainer e toast
import 'react-toastify/dist/ReactToastify.css'; // Importe os estilos do Toastify

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('table');
  const [modalVisible, setModalVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Carregar usuários da API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get('/api/users/get');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
        toast.error('Erro ao carregar usuários!'); // Exibe a mensagem de erro no toast
      }
    };

    fetchUsers();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (user) => {
    setCurrentUser(user);
    setModalVisible(true); // Abre o modal
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/api/users/delete/${id}`);
      setUsers(users.filter((user) => user.id !== id)); // Atualiza a lista local após a exclusão
      toast.success('Usuário excluído com sucesso!'); // Exibe sucesso no toast
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Erro ao excluir usuário!'); // Exibe a mensagem de erro no toast
    }
  };

  const handleModalClose = () => {
    setModalVisible(false); // Fecha o modal
    setCurrentUser(null); // Limpa o usuário atual
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Envia os dados do usuário atual para a API (supondo que você tenha uma rota PUT)
    try {
      await axiosInstance.put(`/api/users/edit/${currentUser.id}`, currentUser);
      setUsers(users.map((user) => (user.id === currentUser.id ? currentUser : user))); // Atualiza o usuário na lista
      toast.success('Usuário editado com sucesso!'); // Exibe sucesso no toast
      handleModalClose(); // Fecha o modal após a edição
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('Erro ao editar usuário!'); // Exibe a mensagem de erro no toast
    }
  };

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
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-[#F5E0C1] transition-all duration-200 ease-in-out">
                <td className="px-6 py-4 border-b text-[#3E2A47]">
                  <img src={user.profile_picture || 'https://via.placeholder.com/100'} alt={user.name} className="w-10 h-10 rounded-full" />
                </td>
                <td className="px-6 py-4 border-b text-[#3E2A47]">{user.name}</td>
                <td className="px-6 py-4 border-b text-[#3E2A47]">{user.email}</td>
                <td className="px-6 py-4 border-b text-[#3E2A47]">
                  <span className={`px-2 py-1 rounded-full text-sm ${user.role === 'Admin' ? 'bg-[#6A4F3C] text-white' : 'bg-[#B89D6B] text-white'}`}>
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
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredUsers.map((user) => (
            <div key={user.id} className="bg-[#F5E0C1] p-6 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105 flex items-center">
              <div className="flex-grow">
                <h3 className="text-xl font-bold text-[#3E2A47]">{user.name}</h3>
                <p className="text-[#6E4B3D]">{user.email}</p>
                <span className={`inline-block mt-2 px-3 py-1 rounded-full text-sm ${user.role === 'Admin' ? 'bg-[#6A4F3C] text-white' : 'bg-[#B89D6B] text-white'}`}>
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
              <img src={user.profile_picture || 'https://via.placeholder.com/100'} alt={user.name} className="w-20 h-20 rounded-full ml-4" />
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-96">
            <h3 className="text-2xl font-semibold mb-4">Edit User</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-[#3E2A47]" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={currentUser?.name || ''}
                  onChange={(e) => setCurrentUser({ ...currentUser, name: e.target.value })}
                  className="w-full p-2 border border-[#A67C52] rounded-lg mt-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-[#3E2A47]" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={currentUser?.email || ''}
                  onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })}
                  className="w-full p-2 border border-[#A67C52] rounded-lg mt-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-[#3E2A47]" htmlFor="role">
                  Role
                </label>
                <select
                  id="role"
                  value={currentUser?.role || ''}
                  onChange={(e) => setCurrentUser({ ...currentUser, role: e.target.value })}
                  className="w-full p-2 border border-[#A67C52] rounded-lg mt-2"
                >
                  <option value="reader">Reader</option>
                  <option value="writer">Witer</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={handleModalClose}
                  className="bg-[#D1B29E] text-[#3E2A47] p-2 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#A67C52] text-white p-2 rounded-lg"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ToastContainer para exibir as notificações */}
      <ToastContainer />
    </div>
  );
};

export default UserList;
