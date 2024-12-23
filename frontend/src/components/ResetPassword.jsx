import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify"; // Importar o ToastContainer e toast
import "react-toastify/dist/ReactToastify.css"; // Importar o CSS do react-toastify
import axiosInstance from "../utils/axiosInstance"; // Importar o axiosInstance para requisições
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Ícones de senha

import backgroundImage from "../assets/images/books-1842306_1280.jpg"; // Imagem de fundo

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  // Captura o token da URL
  const token = new URLSearchParams(location.search).get("token");

  useEffect(() => {
    if (!token) {
      toast.error("Token inválido ou ausente.", {
        position: "top-right", 
        autoClose: 5000,
        theme: "colored", 
      });
      return;
    }
    // Validar o token aqui, se necessário
  }, [token]);

  const handlePasswordReset = async () => {
    if (newPassword !== confirmPassword) {
      toast.error("As senhas não coincidem.", {
        position: "top-right",
        theme: "colored",
      });
      return;
    }

    try {
      const response = await axiosInstance.post("/api/users/reset-password", {
        token,
        newPassword,
        confirmPassword,
      });

      if (response.status === 200) {
        toast.success("Senha redefinida com sucesso!", {
          position: "top-right",
          theme: "colored",
        });
        setTimeout(() => navigate("/login"), 2000);
      } else {
        toast.error(response.data.error || "Erro ao redefinir a senha.", {
          position: "top-right",
          theme: "colored",
        });
      }
    } catch (err) {
      toast.error("Erro na conexão com o servidor.", {
        position: "top-right",
        theme: "colored",
      });
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="flex justify-center items-center min-h-screen bg-black bg-opacity-50">
        <div className="max-w-3xl mx-auto p-12 bg-wood-brown rounded-lg shadow-lg w-full">
          <h2 className="text-3xl font-bold text-center text-white mb-6">
            Redefinir Senha
          </h2>

          <div className="mb-6">
            <label className="block text-white text-sm font-semibold mb-2">
              Nova Senha:
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Digite sua nova senha"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white bg-wood-brown"
              />
              <div
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-3 right-3 cursor-pointer"
              >
                {showPassword ? (
                  <FaEyeSlash className="text-white" />
                ) : (
                  <FaEye className="text-white" />
                )}
              </div>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-white text-sm font-semibold mb-2">
              Confirmar Senha:
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirme sua nova senha"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white bg-wood-brown"
              />
              <div
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute top-3 right-3 cursor-pointer"
              >
                {showConfirmPassword ? (
                  <FaEyeSlash className="text-white" />
                ) : (
                  <FaEye className="text-white" />
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={handlePasswordReset}
              className="px-8 py-3 bg-white text-wood-brown rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-wood-brown"
            >
              Redefinir Senha
            </button>
          </div>

          {/* ToastContainer para exibir as notificações */}
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
