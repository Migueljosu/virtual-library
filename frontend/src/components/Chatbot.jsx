import React, { useState } from "react";
import { FaRobot } from "react-icons/fa";
import axiosInstance from "../utils/axiosInstance";

// Função para formatar a hora
const formatTime = (date) => {
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

// Função para formatar a data
const formatDate = (date) => {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const Chatbot = ({ closeChat, userToken }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      text: "Hello! How can I assist you today?",
      fromBot: true,
      time: new Date(),
    },
  ]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (message.trim()) {
      const newMessage = { text: message, fromBot: false, time: new Date() };
      setMessages([...messages, newMessage]);
      setMessage("");

      // Enviar mensagem para o servidor e obter a resposta da IA
      try {
        const response = await axiosInstance.post(
          "/api/chatbot/chat",
          { message },
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );
        const botMessage = {
          text: response.data.response,
          fromBot: true,
          time: new Date(),
        };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  return (
    <div className="fixed bottom-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 w-96">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Chatbot</h3>
          <button
            onClick={closeChat}
            className="text-red-500 hover:text-red-700"
          >
            X
          </button>
        </div>
        <div className="space-y-4 overflow-y-auto h-72 mb-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`p-2 rounded-lg mb-2 ${
                msg.fromBot
                  ? "bg-brown-200 text-left"
                  : "bg-brown-400 text-right"
              }`}
              style={{
                backgroundColor: msg.fromBot ? "#D4B89B" : "#7C4F4A",
                width: "50%",
                marginLeft: msg.fromBot ? "0" : "auto",
                marginRight: msg.fromBot ? "auto" : "0",
              }}
            >
              <p>{msg.text}</p>
              <span className="text-sm text-gray-600">
                {formatTime(msg.time)}
              </span>
            </div>
          ))}
        </div>
        <form onSubmit={handleSendMessage} className="flex">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="w-full p-2 border border-gray-300 rounded-l-lg"
            style={{
              backgroundColor: "#F5E2D4",
            }}
          />
          <button
            type="submit"
            className="bg-brown-600 text-white px-4 py-2 rounded-r-lg hover:bg-brown-700"
            style={{
              backgroundColor: "#5E3A3A",
            }}
          >
            <FaRobot className="text-white" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;
