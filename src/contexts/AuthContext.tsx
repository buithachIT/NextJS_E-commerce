'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { fetchUserWithAutoRefresh, logoutUser } from '@/lib/action/auth';
import toast from 'react-hot-toast';
import { GetCurrentUserQuery } from '@/__generated__/graphql';

type AuthContextType = {
  user: GetCurrentUserQuery['viewer'] | null;
  loading: boolean;
  refresh: () => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  refresh: async () => { },
  logout: async () => { },
});

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<GetCurrentUserQuery['viewer'] | null>(null);
  const [loading, setLoading] = useState(true);

  const loadUser = async () => {
    setLoading(true);
    try {
      const user = await fetchUserWithAutoRefresh();
      setUser(user);
    } catch (err) {
      console.error('Error loading user:', err);
      setUser(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadUser();
  }, []);

  const logout = async () => {
    try {
      await logoutUser();
      setUser(null);
      toast.success('See you later');
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
