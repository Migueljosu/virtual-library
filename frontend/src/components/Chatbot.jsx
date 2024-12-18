import React, { useState } from 'react';
import { FaRobot } from 'react-icons/fa';

// Função para formatar a hora
const formatTime = (date) => {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

// Função para formatar a data
const formatDate = (date) => {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const Chatbot = ({ closeChat }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      text: 'Hello! How can I assist you today?',
      fromBot: true,
      time: new Date(),
    },
    {
      text: 'What books do you recommend?',
      fromBot: true,
      time: new Date(),
    },
    {
      text: 'How can I find books by genre?',
      fromBot: true,
      time: new Date(),
    },
    {
      text: 'Do you offer book summaries?',
      fromBot: true,
      time: new Date(),
    },
  ]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      const newMessage = { text: message, fromBot: false, time: new Date() };
      setMessages([...messages, newMessage]);
      setMessage('');

      // Simulate a bot response after a short delay
      setTimeout(() => {
        const botMessage = {
          text: 'I recommend "The Catcher in the Rye". It\'s a great read!',
          fromBot: true,
          time: new Date(),
        };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      }, 1000);
    }
  };

  const getMessagesByDate = () => {
    const groupedMessages = [];
    let currentDate = null;
    let currentGroup = [];

    messages.forEach((msg) => {
      const messageDate = formatDate(msg.time);
      if (messageDate !== currentDate) {
        if (currentGroup.length > 0) {
          groupedMessages.push({ date: currentDate, messages: currentGroup });
        }
        currentDate = messageDate;
        currentGroup = [msg];
      } else {
        currentGroup.push(msg);
      }
    });

    if (currentGroup.length > 0) {
      groupedMessages.push({ date: currentDate, messages: currentGroup });
    }

    return groupedMessages;
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
          {getMessagesByDate().map((group, idx) => (
            <div key={idx}>
              <div className="text-center text-gray-500 py-2">
                <span className="border-t border-gray-300 w-full inline-block">{group.date}</span>
              </div>
              {group.messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`p-2 rounded-lg mb-2 ${
                    msg.fromBot
                      ? 'bg-brown-200 text-left'
                      : 'bg-brown-400 text-right'
                  }`}
                  style={{
                    backgroundColor: msg.fromBot
                      ? '#D4B89B' // Soft brown for bot
                      : '#7C4F4A', // Darker brown for user
                    width: '50%', // 50% width for both bot and user messages
                    marginLeft: msg.fromBot ? '0' : 'auto',
                    marginRight: msg.fromBot ? 'auto' : '0',
                  }}
                >
                  <p>{msg.text}</p>
                  <span className="text-sm text-gray-600">{formatTime(msg.time)}</span>
                </div>
              ))}
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
              backgroundColor: '#F5E2D4', // Soft brown for input background
            }}
          />
          <button
            type="submit"
            className="bg-brown-600 text-white px-4 py-2 rounded-r-lg hover:bg-brown-700"
            style={{
              backgroundColor: '#5E3A3A', // Dark brown for the button
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
