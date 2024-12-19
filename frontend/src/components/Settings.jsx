import React, { useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';

const Settings = () => {
  const [isChangingPassword, setIsChangingPassword] = useState(false); // Estado para controlar a exibição do formulário de alteração de senha
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (newPassword === confirmPassword) {
      alert('Password changed successfully!');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setIsChangingPassword(false);
    } else {
      alert('Passwords do not match!');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-[#3E2A47]">Settings</h2>

      {/* Configurações Gerais */}
      <div className="mb-6 p-4 bg-[#F5E0C1] rounded-lg shadow-md">
        <h3 className="text-2xl font-semibold text-[#3E2A47] mb-4">General</h3>
        <div className="flex items-center space-x-4 mb-4">
          <FaUser size={20} className="text-[#6A4F3C]" />
          <p className="text-[#6E4B3D]">Account Settings</p>
        </div>
        <div className="flex items-center space-x-4 mb-4">
          <FaLock size={20} className="text-[#6A4F3C]" />
          <button
            onClick={() => setIsChangingPassword(!isChangingPassword)}
            className="text-[#6E4B3D] hover:text-[#A67C52] font-semibold"
          >
            Change Password
          </button>
        </div>
      </div>

      {/* Formulário de alteração de senha */}
      {isChangingPassword && (
        <div className="p-4 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold text-[#3E2A47] mb-4">Change Password</h3>
          <form onSubmit={handlePasswordChange}>
            <div className="mb-4">
              <label htmlFor="oldPassword" className="block text-[#6E4B3D] mb-2">Old Password</label>
              <input
                type="password"
                id="oldPassword"
                className="w-full px-4 py-2 bg-white border border-[#A67C52] rounded-lg"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="newPassword" className="block text-[#6E4B3D] mb-2">New Password</label>
              <input
                type="password"
                id="newPassword"
                className="w-full px-4 py-2 bg-white border border-[#A67C52] rounded-lg"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-[#6E4B3D] mb-2">Confirm New Password</label>
              <input
                type="password"
                id="confirmPassword"
                className="w-full px-4 py-2 bg-white border border-[#A67C52] rounded-lg"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="px-6 py-3 bg-[#A67C52] text-white rounded-lg shadow-md hover:bg-[#6A4F3C] transition-all"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Settings;
