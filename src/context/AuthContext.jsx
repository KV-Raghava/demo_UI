import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

// Dummy credentials
const DUMMY_CREDENTIALS = {
  email: 'john.k@mindsprint.com',
  password: 'password123'
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const login = async (email, password) => {
    setLoading(true);
    setError('');
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (email === DUMMY_CREDENTIALS.email && password === DUMMY_CREDENTIALS.password) {
      setIsAuthenticated(true);
      setUser({
        email: DUMMY_CREDENTIALS.email,
        name: 'John K',
        role: 'Admin'
      });
      setLoading(false);
      return { success: true };
    } else {
      setError('Invalid email or password');
      setLoading(false);
      return { success: false, error: 'Invalid email or password' };
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setError('');
  };

  const value = {
    isAuthenticated,
    user,
    loading,
    error,
    login,
    logout,
    setError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};