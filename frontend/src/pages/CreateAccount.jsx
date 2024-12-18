import React, { useState } from "react";
import { Link } from "react-router-dom"; // Usando react-router-dom para navegação
import backgroundImage from "../assets/images/books-1842306_1280.jpg"; // Importe a imagem

const CreateAccount = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [accountType, setAccountType] = useState("Reader"); // Adicionando o tipo de conta

  const handleCreateAccount = (e) => {
    e.preventDefault();
    // Lógica para criar conta (verificação, backend, etc)
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Account created with:", { name, email, password, accountType });
    // Aqui você pode enviar os dados ao backend
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
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

      <div className="container mx-auto max-w-md p-6 bg-white bg-opacity-75 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-wood-brown mb-6">Create Account</h2>
        <form onSubmit={handleCreateAccount}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-semibold text-wood-brown">
              Full Name:
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Enter your full name"
              required
            />
          </div>

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
              placeholder="Create a password"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="confirm-password" className="block text-sm font-semibold text-wood-brown">
              Confirm Password:
            </label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Confirm your password"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="account-type" className="block text-sm font-semibold text-wood-brown">
              Account Type:
            </label>
            <select
              id="account-type"
              value={accountType}
              onChange={(e) => setAccountType(e.target.value)}
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              <option value="Reader">Reader</option>
              <option value="Writer">Writer</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-4 bg-wood-brown text-white rounded-md hover:bg-yellow-400 transition duration-300"
          >
            Create Account
          </button>
        </form>
        <div className="mt-4 text-center">
          <Link to="/login" className="text-sm text-yellow-400 hover:text-yellow-500">
            Already have an account? Login here.
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
