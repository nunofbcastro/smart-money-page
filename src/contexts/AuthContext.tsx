
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  username: string;
  email: string;
  name: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedAuth = localStorage.getItem('auth');
    if (savedAuth) {
      const { isAuthenticated: savedIsAuth, user: savedUser } = JSON.parse(savedAuth);
      setIsAuthenticated(savedIsAuth);
      setUser(savedUser);
    }
  }, []);

  const login = (username: string, password: string): boolean => {
    if (username === 'user123' && password === 'user123') {
      const userData: User = { 
        username,
        email: 'user123@example.com',
        name: 'Usuário Demo'
      };
      setIsAuthenticated(true);
      setUser(userData);
      localStorage.setItem('auth', JSON.stringify({ isAuthenticated: true, user: userData }));
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('auth');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
