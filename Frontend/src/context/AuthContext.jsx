import { createContext, useCallback, useEffect, useState } from 'react';

export const AuthContext = createContext(null);

const getStoredUser = () => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const name = localStorage.getItem('name');
  return token && role ? { token, role, name } : null;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getStoredUser);
  const [authMessage, setAuthMessage] = useState('');

  const logout = useCallback((message = '') => {
    localStorage.clear();
    setUser(null);
    setAuthMessage(message);
  }, []);

  useEffect(() => {
    const handleExpiredSession = () => logout('פג תוקף ההתחברות. התחברו מחדש כדי להמשיך.');
    window.addEventListener('auth:expired', handleExpiredSession);
    return () => window.removeEventListener('auth:expired', handleExpiredSession);
  }, [logout]);

  const login = (userData) => {
    localStorage.setItem('token', userData.token);
    localStorage.setItem('role', userData.role);
    localStorage.setItem('name', userData.name);
    setAuthMessage('');
    setUser(userData);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading: false, authMessage, clearAuthMessage: () => setAuthMessage('') }}>
      {children}
    </AuthContext.Provider>
  );
};
