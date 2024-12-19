import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../utils/auth'; // Importando o hook de autenticação

const ProtectedRoute = ({ element, requiredRole, ...rest }) => {
    const { isAuthenticated, userRole } = useAuth(); // Usando o hook para verificar autenticação e role
  
    if (!isAuthenticated) {
      // Se não estiver autenticado, redireciona para a página de login
      return <Navigate to="/login" />;
    }
  
    if (requiredRole && requiredRole !== userRole) {
      // Se o role do usuário não for o esperado, redireciona para a página de login
      return <Navigate to="/login" />;
    }
  
    // Se estiver autenticado e com o role correto, renderiza o elemento da página
    return element;
  };
  

export default ProtectedRoute;
