// components/Settings.jsx
import React, { useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import axiosInstance from '../utils/axiosInstance';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Settings = () => {
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      return toast.error('As senhas não coincidem.');
    }

    try {
      const response = await axiosInstance.put('/api/users/change-password', {
        oldPassword,
        newPassword,
        confirmPassword,
      });

      toast.success(response.data.message);
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setIsChangingPassword(false);
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
        console.error("Erro no servidor:", error.response.data.error); // Exibe detalhes do erro no console
      } else {
        toast.error('Erro ao alterar a senha. Tente novamente mais tarde.');
        console.error("Erro inesperado:", error); // Exibe erro completo caso o erro não venha do servidor
      }
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Settings</h2>

      <div className="mb-6 p-4 bg-gray-100 rounded-lg shadow-md">
        <h3 className="text-2xl font-semibold mb-4">General</h3>
        <div className="flex items-center space-x-4 mb-4">
          <FaUser size={20} />
          <p>Account Settings</p>
        </div>
        <div className="flex items-center space-x-4 mb-4">
          <FaLock size={20} />
          <button onClick={() => setIsChangingPassword(!isChangingPassword)}>
            Change Password
          </button>
        </div>
      </div>

      {isChangingPassword && (
        <div className="p-4 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold mb-4">Change Password</h3>
          <form onSubmit={handlePasswordChange}>
            <div className="mb-4">
              <label htmlFor="oldPassword">Old Password</label>
              <input
                type="password"
                id="oldPassword"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="newPassword">New Password</label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="confirmPassword">Confirm New Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit">Save Changes</button>
          </form>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default Settings;
