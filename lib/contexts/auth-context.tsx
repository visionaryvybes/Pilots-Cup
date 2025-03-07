import { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';

interface User {
  id: string;
  email: string;
  role: 'admin' | 'user';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) {
        setIsLoading(false);
        return;
      }

      // In a real app, verify the token with the backend
      // For now, we'll simulate a user
      setUser({
        id: '1',
        email: 'admin@pilotscup.com',
        role: 'admin'
      });
    } catch (error) {
      console.error('Auth check failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await api.login(email, password);
      
      if (response.error || !response.data) {
        return { success: false, error: response.error || 'Login failed' };
      }

      // In a real app, decode the token and set user data
      setUser({
        id: '1',
        email,
        role: 'admin'
      });

      return { success: true };
    } catch (error) {
      return { success: false, error: 'Login failed' };
    }
  };

  const logout = async () => {
    await api.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function ProtectedRoute({ children, allowedRoles = ['user', 'admin'] }: { 
  children: React.ReactNode;
  allowedRoles?: Array<'user' | 'admin'>;
}) {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated || !user) {
    // In a real app, you would use Next.js router to redirect
    window.location.href = '/login';
    return null;
  }

  if (!allowedRoles.includes(user.role)) {
    return <div>Access denied. Insufficient permissions.</div>;
  }

  return <>{children}</>;
} 