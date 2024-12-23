import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../utils/axiosInstance";
import { Link, useNavigate } from "react-router-dom"; // Importando useNavigate

const ActivateAccount = () => {
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Hook para navegação

  // Recuperar o email do localStorage ao carregar o componente
  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      toast.error("Email não encontrado. Por favor, faça login novamente.");
    }
  }, []);

  const handleResendCode = async () => {
    if (!email) {
      toast.error("Email não está disponível. Faça login novamente.");
      return;
    }

    try {
      await axiosInstance.post("/api/users/resend-activation", { email });
      toast.success("Código de ativação reenviado. Verifique seu email!");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Erro ao reenviar o código de ativação."
      );
    }
  };

  const handleActivation = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axiosInstance.post("/api/users/activate", { code });
      toast.success("Conta ativada com sucesso!");
      setTimeout(() => {
        navigate("/login"); 
      }, 1000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Erro ao ativar conta.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-yellow-400 via-wood-brown to-white">
      <div className="p-6 bg-white shadow-lg rounded-md">
        <h2 className="text-2xl font-bold text-center text-wood-brown mb-4">
          Ativar Conta
        </h2>
        <form onSubmit={handleActivation}>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
            placeholder="Digite o código de ativação"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-wood-brown text-white rounded-md hover:bg-yellow-400 transition duration-300"
          >
            {loading ? "Ativando..." : "Ativar Conta"}
          </button>
        </form>
        <div className="mt-4 text-center">
          <button
            className="text-sm text-yellow-400 hover:text-yellow-500"
            onClick={handleResendCode}
          >
            Reenviar Código de Ativação
          </button>
        </div>

        <ToastContainer />
      </div>
    </div>
  );
};

export default ActivateAccount;
