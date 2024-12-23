import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axiosInstance from "../utils/axiosInstance";
import backgroundImage from "../assets/images/books-1842306_1280.jpg";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axiosInstance.post(
        "/api/users/login",
        { email, password },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      // Se a conta não estiver ativada, mostrar mensagem e redirecionar para a página de ativação
      if (response.data.activationRequired) {
        toast.error("Sua conta ainda não foi ativada. Verifique seu e-mail.");
        // Redirecionando para a página de ativação
        navigate("/activate"); // Garante que a página /activate exista
        return;
      }

      // Armazenando o token no localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      // Exibindo mensagem de sucesso
      toast.success("Login bem-sucedido!");

      const { role } = response.data.user;

      // Timeout para garantir que o navegador entenda o estado do token
      setTimeout(() => {
        window.location.reload();
      }, 1000); // 1 segundo de delay antes de recarregar
    } catch (err) {
      console.error("Erro no login:", err);
      toast.error(err.response?.data?.message || "Erro ao fazer login!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className="absolute top-6 left-6">
        <Link
          to="/"
          className="inline-flex items-center px-4 py-2 bg-wood-brown text-white rounded-lg shadow-md hover:bg-yellow-400 transition duration-300 transform hover:scale-105"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Home
        </Link>
      </div>

      <div className="container mx-auto max-w-md p-6 bg-white bg-opacity-75 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-wood-brown mb-6">
          Login
        </h2>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-wood-brown"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-wood-brown"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-4 bg-wood-brown text-white rounded-md hover:bg-yellow-400 transition duration-300"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <Link
            to="/create-account"
            className="text-sm text-yellow-400 hover:text-yellow-500"
          >
            Don't have an account? Create one here.
          </Link>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Login;
