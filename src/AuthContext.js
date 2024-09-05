import React, { createContext, useContext, useState } from 'react';

// Créez le contexte
const AuthContext = createContext();

// Créez un fournisseur de contexte
const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => {
    // Logique de connexion
    setIsAuthenticated(true);
  };

  const logout = () => {
    // Logique de déconnexion
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Créez le hook useAuth
const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthContext, AuthProvider, useAuth };
