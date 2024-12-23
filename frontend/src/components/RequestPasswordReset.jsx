import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../utils/axiosInstance";

const RequestPasswordReset = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.post(
        "/api/users/request-reset-password"
      );
      toast.success(
        response.data.message || "Solicitação enviada com sucesso!"
      );
    } catch (error) {
      // Exibir mensagem no Toast
      toast.error("Erro ao solicitar redefinição de senha. Tente novamente.");

      // Registro detalhado do erro no console
      if (error.response) {
        // Erro recebido do servidor (status diferente de 2xx)
        console.error("Erro do servidor:", {
          status: error.response.status,
          data: error.response.data,
        });
      } else if (error.request) {
        // Erro na requisição (sem resposta do servidor)
        console.error(
          "Erro na requisição (sem resposta do servidor):",
          error.request
        );
      } else {
        // Outro tipo de erro (configuração ou código)
        console.error("Erro desconhecido:", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-brown-200 via-brown-300 to-brown-500">
      <div className="bg-wood-brown rounded-lg shadow-xl p-6 w-80 text-center">
        <h2 className="text-xl font-semibold text-black mb-4">
          Redefinição de Senha
        </h2>
        <p className="text-sm text-black mb-6">
          Clique no botão abaixo para enviar o link de redefinição de senha para
          o seu email.
        </p>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full py-2 px-4 rounded-lg font-medium bg-white text-black transition-all duration-300 ${
            loading
              ? "bg-brown-400 cursor-not-allowed"
              : "bg-brown-700 hover:bg-brown-800 focus:ring-2 focus:ring-brown-500"
          }`}
        >
          {loading ? "Enviando..." : "Redefinir Senha"}
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default RequestPasswordReset;
