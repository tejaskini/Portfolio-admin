import { createContext, useState, useEffect, useContext } from 'react';
import api from '../api/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser({ token });
    }
    setLoading(false);
  }, []);

  // --- Login Function ---
  const login = async (username, password) => {
    const response = await api.post('/login', { username, password });
    const token = response.data.token || response.data.data?.token;
    if (!token) {
      throw new Error('No token in response');
    }
    localStorage.setItem('token', token);
    setUser({ token });
    return response;
  };

  // --- Register Function (New) ---
  const register = async (username, password, email, phone) => {
    // This matches the 4 fields from your Register.jsx form
    const response = await api.post('/register', { 
      username, 
      password, 
      email, 
      phone 
    });
    
    // Most APIs return a token upon successful registration so the user is "logged in" immediately
    const token = response.data.token || response.data.data?.token;
    
    if (token) {
      localStorage.setItem('token', token);
      setUser({ token });
    }
    
    return response;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    // Make sure to add 'register' to the value prop here
    <AuthContext.Provider value={{ user, login, logout, register, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);