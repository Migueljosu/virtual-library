import React, { useState } from "react";
import { Link } from "react-router-dom";
import backgroundImage from "../assets/images/books-2596809_1280.jpg"; // Importe a imagem

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setError(""); // Limpa erros anteriores

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    // Simulação de login (substituir com API real)
    console.log("Login submitted with:", { email, password });

    if (email !== "user@example.com" || password !== "password123") {
      setError("Invalid email or password.");
      return;
    }

    alert("Login successful!");
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${backgroundImage})`, // Usando a imagem importada
      }}
    >
      {/* Link estilizado para "Voltar para Home" */}
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

      <div className="bg-white bg-opacity-90 shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-wood-brown mb-6">Login</h2>
        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-100 p-2 rounded">
            {error}
          </div>
        )}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-semibold text-wood-brown">
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
            <label htmlFor="password" className="block text-sm font-semibold text-wood-brown">
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
          >
            Login
          </button>
        </form>

        <div className="mt-4 text-center">
          <Link to="/create-account" className="text-sm text-yellow-400 hover:text-yellow-500">
            Don't have an account? Create one here.
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
