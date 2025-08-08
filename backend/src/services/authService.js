import { supabase } from '../config/database.js';
import { generateToken } from '../middleware/auth.js';
import logger from '../utils/logger.js';

class AuthService {
  // Register a new user
  async register(userData) {
    try {
      const { email, password, full_name, username } = userData;

      // Check if user already exists
      const { data: existingUser } = await supabase
        .from('profiles')
        .select('id, email')
        .or(`email.eq.${email},username.eq.${username}`)
        .single();

      if (existingUser) {
        throw new Error('User with this email or username already exists');
      }

      // Create user in Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name,
            username
          }
        }
      });

      if (authError) {
        logger.error('Auth registration error:', authError);
        throw new Error(`Registration failed: ${authError.message}`);
      }

      if (!authData.user) {
        throw new Error('Failed to create user account');
      }

      // Create profile
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .insert([{
          id: authData.user.id,
          email,
          full_name,
          username,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (profileError) {
        logger.error('Profile creation error:', profileError);
        // Clean up auth user if profile creation fails
        await supabase.auth.admin.deleteUser(authData.user.id);
        throw new Error(`Profile creation failed: ${profileError.message}`);
      }

      // Generate JWT token
      const token = generateToken(authData.user);

      logger.info('User registered successfully', { userId: authData.user.id, email });

      return {
        user: authData.user,
        profile,
        token
      };
    } catch (error) {
      logger.error('AuthService.register error:', error);
      throw error;
    }
  }

  // Login user
  async login(credentials) {
    try {
      const { email, password } = credentials;

      // Authenticate with Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        logger.error('Login error:', error);
        throw new Error(`Login failed: ${error.message}`);
      }

      if (!data.user) {
        throw new Error('Invalid credentials');
      }

      // Get user profile
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single();

      if (profileError) {
        logger.error('Profile fetch error:', profileError);
        throw new Error('Failed to fetch user profile');
      }

      // Generate JWT token
      const token = generateToken(data.user);

      logger.info('User logged in successfully', { userId: data.user.id, email });

      return {
        user: data.user,
        profile,
        token
      };
    } catch (error) {
      logger.error('AuthService.login error:', error);
      throw error;
    }
  }

  // Get current user
  async getCurrentUser(userId) {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        logger.error('Get current user error:', error);
        throw new Error('Failed to fetch user profile');
      }

      return profile;
    } catch (error) {
      logger.error('AuthService.getCurrentUser error:', error);
      throw error;
    }
  }

  // Update user profile
  async updateProfile(userId, updates) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', userId)
        .select()
        .single();

      if (error) {
        logger.error('Profile update error:', error);
        throw new Error(`Profile update failed: ${error.message}`);
      }

      logger.info('Profile updated successfully', { userId });

      return data;
    } catch (error) {
      logger.error('AuthService.updateProfile error:', error);
      throw error;
    }
  }

  // Change password
  async changePassword(userId, currentPassword, newPassword) {
    try {
      // Get user email first
      const { data: profile } = await supabase
        .from('profiles')
        .select('email')
        .eq('id', userId)
        .single();

      if (!profile) {
        throw new Error('User not found');
      }

      // Update password in Supabase Auth
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) {
        logger.error('Password change error:', error);
        throw new Error(`Password change failed: ${error.message}`);
      }

      logger.info('Password changed successfully', { userId });

      return true;
    } catch (error) {
      logger.error('AuthService.changePassword error:', error);
      throw error;
    }
  }

  // Request password reset
  async requestPasswordReset(email) {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${process.env.FRONTEND_URL}/reset-password`
      });

      if (error) {
        logger.error('Password reset request error:', error);
        throw new Error(`Password reset request failed: ${error.message}`);
      }

      logger.info('Password reset requested', { email });

      return true;
    } catch (error) {
      logger.error('AuthService.requestPasswordReset error:', error);
      throw error;
    }
  }

  // Logout user
  async logout(userId) {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        logger.error('Logout error:', error);
        throw new Error(`Logout failed: ${error.message}`);
      }

      logger.info('User logged out successfully', { userId });

      return true;
    } catch (error) {
      logger.error('AuthService.logout error:', error);
      throw error;
    }
  }

  // Verify email
  async verifyEmail(token) {
    try {
      const { data, error } = await supabase.auth.verifyOtp({
        token_hash: token,
        type: 'email'
      });

      if (error) {
        logger.error('Email verification error:', error);
        throw new Error(`Email verification failed: ${error.message}`);
      }

      logger.info('Email verified successfully', { userId: data.user?.id });

      return data;
    } catch (error) {
      logger.error('AuthService.verifyEmail error:', error);
      throw error;
    }
  }

  // Refresh token
  async refreshToken(refreshToken) {
    try {
      const { data, error } = await supabase.auth.refreshSession({
        refresh_token: refreshToken
      });

      if (error) {
        logger.error('Token refresh error:', error);
        throw new Error(`Token refresh failed: ${error.message}`);
      }

      const token = generateToken(data.user);

      return {
        user: data.user,
        token
      };
    } catch (error) {
      logger.error('AuthService.refreshToken error:', error);
      throw error;
    }
  }

  // Delete user account
  async deleteAccount(userId) {
    try {
      // Delete profile first
      const { error: profileError } = await supabase
        .from('profiles')
        .delete()
        .eq('id', userId);

      if (profileError) {
        logger.error('Profile deletion error:', profileError);
        throw new Error(`Profile deletion failed: ${profileError.message}`);
      }

      // Delete auth user
      const { error: authError } = await supabase.auth.admin.deleteUser(userId);

      if (authError) {
        logger.error('Auth user deletion error:', authError);
        throw new Error(`Auth user deletion failed: ${authError.message}`);
      }

      logger.info('User account deleted successfully', { userId });

      return true;
    } catch (error) {
      logger.error('AuthService.deleteAccount error:', error);
      throw error;
    }
  }
}

export default new AuthService();
