import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Dashboard from '../components/Dashboard';
import UserList from '../components/UserList';
import Settings from '../components/RequestPasswordReset';
import BookList from '../components/BookList';
import CreateNewBook from "../components/CreateNewBook";
import CategoryManager from "../components/CategoryManager";

const AdminPage = () => {
  // Recupera o estado da aba ativa do localStorage ou define a aba padrão (dashboard)
  const [activeTab, setActiveTab] = useState(() => {
    const savedTab = localStorage.getItem('activeTab');
    return savedTab ? savedTab : 'dashboard'; // 'dashboard' é a aba padrão
  });

  // Sempre que a aba ativa mudar, salva no localStorage
  useEffect(() => {
    localStorage.setItem('activeTab', activeTab);
  }, [activeTab]);

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
        {activeTab === 'CategoryManager' && <CategoryManager />}
      </div>
    </div>
  );
};

export default AdminPage;
