import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Dashboard from '../components/Dashboard';
import UserList from '../components/UserList';
import Settings from '../components/Settings';
import BookList from '../components/BookList';
import CreateNewBook from "../components/CreateNewBook";

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="flex">
      {/* Sidebar é fixo */}
      <Sidebar setActiveTab={setActiveTab} />
      
      {/* Conteúdo à direita do sidebar com margem esquerda */}
      <div className="flex-1 p-6 ml-64"> {/* A margem esquerda de 64 é para deixar espaço para o sidebar fixo */}
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'users' && <UserList />}
        {activeTab === 'books' && <BookList />}
        {activeTab === 'publish_books' && <CreateNewBook />}
        {activeTab === 'Settings' && <Settings />}
      </div>
    </div>
  );
};

export default AdminPage;
