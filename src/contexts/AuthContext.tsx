'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { fetchUserWithAutoRefresh, logoutUser } from '@/lib/action/auth';
import toast from 'react-hot-toast';

type User = {
  id: string;
  username: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  refresh: () => Promise<void>;
  logout: () => Promise<void>
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  refresh: async () => { },
  logout: async () => { }
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const loadUser = async () => {
    setLoading(true);
    const data = await fetchUserWithAutoRefresh();
    setUser(data);
    setLoading(false);
  };

  useEffect(() => {
    loadUser();
  }, []);

  const logout = async () => {
    try {
      await logoutUser();
      setUser(null)
      toast.success("See you later")
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, refresh: loadUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};