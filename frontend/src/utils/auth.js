// src/utils/Auth.js
export const checkUserRole = (roleRequired) => {
    const user = JSON.parse(localStorage.getItem("user")); // Supondo que os dados do usuário estão armazenados no localStorage
  
    if (!user || user.role !== roleRequired) {
      return false;
    }
    return true;
  };
  