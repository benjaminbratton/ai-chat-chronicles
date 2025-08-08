import { useState, useEffect, createContext, useContext } from 'react';

interface Profile {
  id: string;
  email: string;
  full_name?: string;
  username?: string;
  title?: string;
  bio?: string;
  avatar_url?: string;
  location?: string;
  website?: string;
  interests?: string[];
  created_at: string;
  updated_at: string;
}

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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check for existing session in localStorage
    const token = localStorage.getItem('auth_token');
    if (token) {
      // Set session without making API calls
      setSession({ access_token: token });
      
      // Try to get user info from localStorage
      const userData = localStorage.getItem('user_data');
      if (userData) {
        try {
          setUser(JSON.parse(userData));
        } catch (error) {
          console.error('Failed to parse user data:', error);
        }
      }
    }
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      // Simple validation for admin credentials
      if (email === 'admin@aichatchronicles.com' && password === 'admin123') {
        const mockUser: Profile = {
          id: 'admin-001',
          email: 'admin@aichatchronicles.com',
          full_name: 'System Administrator',
          username: 'admin',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        
        const mockToken = 'mock-jwt-token-' + Date.now();
        
        setUser(mockUser);
        setSession({ access_token: mockToken });
        localStorage.setItem('auth_token', mockToken);
        localStorage.setItem('user_data', JSON.stringify(mockUser));
        
        return {
          user: mockUser,
          session: { access_token: mockToken },
          token: mockToken,
        };
      } else {
        throw new Error('Invalid credentials. Use admin@aichatchronicles.com / admin123');
      }
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  };

  const signOut = async () => {
    setUser(null);
    setSession(null);
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) throw new Error('No user logged in');
    
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem('user_data', JSON.stringify(updatedUser));
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
