import { useState, useEffect, createContext, useContext } from 'react';
import { authAPI } from '@/lib/api';
import type { Profile } from '@/lib/api';

interface AuthContextType {
  user: Profile | null;
  session: { access_token: string } | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<any>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<Profile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Profile | null>(null);
  const [session, setSession] = useState<{ access_token: string } | null>(null);
  const [loading, setLoading] = useState(false); // Start with false to avoid blocking

  useEffect(() => {
    // Check for existing session in localStorage
    const token = localStorage.getItem('auth_token');
    if (token) {
      // For now, just set the session without verifying the token
      // This prevents blocking the page load if the backend is not available
      setSession({ access_token: token });
      
      // Try to verify the token in the background
      authAPI.getAdminProfile(token)
        .then(response => {
          setUser(response.data.user);
        })
        .catch(() => {
          // Token is invalid, clear it
          localStorage.removeItem('auth_token');
          setSession(null);
        });
    }
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const response = await authAPI.mockLogin(email, password);
      setUser(response.user);
      setSession(response.session);
      localStorage.setItem('auth_token', response.token);
      return response;
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  };

  const signOut = async () => {
    setUser(null);
    setSession(null);
    localStorage.removeItem('auth_token');
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) throw new Error('No user logged in');
    
    // For now, just update the local state
    setUser({ ...user, ...updates });
  };

  return (
    <AuthContext.Provider value={{
      user,
      session,
      loading,
      signIn,
      signOut,
      updateProfile,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export { AuthProvider, useAuth };
