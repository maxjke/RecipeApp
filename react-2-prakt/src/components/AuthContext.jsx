import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    user: null,
  });

  useEffect(() => {
    const storedAuth = JSON.parse(localStorage.getItem('authData'));
    if (storedAuth && storedAuth.isAuthenticated) {
      setAuth(storedAuth);
    }
  }, []);

  const login = (userData) => {
    const newAuth = { isAuthenticated: true, user: userData };
    setAuth(newAuth);
    localStorage.setItem('authData', JSON.stringify(newAuth));
  };

  const logout = () => {
    setAuth({ isAuthenticated: false, user: null });
    localStorage.removeItem('authData');
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
