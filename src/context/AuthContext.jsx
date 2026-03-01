import { createContext, useState, useEffect, useContext } from 'react';
import api from '../api/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // In a real app, you might call /auth/me to verify
      setUser({ token });
    }
    setLoading(false);
  }, []);

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

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);