import authService from '../services/authService.js';
import logger from '../utils/logger.js';

class AuthController {
  // Register a new user
  async register(req, res) {
    try {
      const userData = req.validatedBody || req.body;
      
      const result = await authService.register(userData);

      res.status(201).json({
        success: true,
        data: {
          user: result.user,
          profile: result.profile
        },
        token: result.token,
        message: 'User registered successfully'
      });
    } catch (error) {
      logger.error('AuthController.register error:', error);
      
      if (error.message.includes('already exists')) {
        return res.status(409).json({
          success: false,
          error: error.message,
          code: 'USER_ALREADY_EXISTS'
        });
      }

      res.status(500).json({
        success: false,
        error: error.message,
        code: 'REGISTRATION_ERROR'
      });
    }
  }

  // Login user
  async login(req, res) {
    try {
      const credentials = req.validatedBody || req.body;
      
      const result = await authService.login(credentials);

      res.json({
        success: true,
        data: {
          user: result.user,
          profile: result.profile
        },
        token: result.token,
        message: 'Login successful'
      });
    } catch (error) {
      logger.error('AuthController.login error:', error);
      
      if (error.message.includes('Invalid credentials') || error.message.includes('Login failed')) {
        return res.status(401).json({
          success: false,
          error: 'Invalid email or password',
          code: 'INVALID_CREDENTIALS'
        });
      }

      res.status(500).json({
        success: false,
        error: error.message,
        code: 'LOGIN_ERROR'
      });
    }
  }

  // Get current user profile
  async getCurrentUser(req, res) {
    try {
      const userId = req.user.id;
      
      const profile = await authService.getCurrentUser(userId);

      res.json({
        success: true,
        data: profile
      });
    } catch (error) {
      logger.error('AuthController.getCurrentUser error:', error);
      res.status(500).json({
        success: false,
        error: error.message,
        code: 'PROFILE_FETCH_ERROR'
      });
    }
  }

  // Update user profile
  async updateProfile(req, res) {
    try {
      const userId = req.user.id;
      const updates = req.validatedBody || req.body;
      
      const profile = await authService.updateProfile(userId, updates);

      res.json({
        success: true,
        data: profile,
        message: 'Profile updated successfully'
      });
    } catch (error) {
      logger.error('AuthController.updateProfile error:', error);
      res.status(500).json({
        success: false,
        error: error.message,
        code: 'PROFILE_UPDATE_ERROR'
      });
    }
  }

  // Change password
  async changePassword(req, res) {
    try {
      const userId = req.user.id;
      const { currentPassword, newPassword } = req.validatedBody || req.body;
      
      await authService.changePassword(userId, currentPassword, newPassword);

      res.json({
        success: true,
        message: 'Password changed successfully'
      });
    } catch (error) {
      logger.error('AuthController.changePassword error:', error);
      res.status(500).json({
        success: false,
        error: error.message,
        code: 'PASSWORD_CHANGE_ERROR'
      });
    }
  }

  // Request password reset
  async requestPasswordReset(req, res) {
    try {
      const { email } = req.validatedBody || req.body;
      
      await authService.requestPasswordReset(email);

      res.json({
        success: true,
        message: 'Password reset email sent successfully'
      });
    } catch (error) {
      logger.error('AuthController.requestPasswordReset error:', error);
      res.status(500).json({
        success: false,
        error: error.message,
        code: 'PASSWORD_RESET_ERROR'
      });
    }
  }

  // Logout user
  async logout(req, res) {
    try {
      const userId = req.user.id;
      
      await authService.logout(userId);

      res.json({
        success: true,
        message: 'Logged out successfully'
      });
    } catch (error) {
      logger.error('AuthController.logout error:', error);
      res.status(500).json({
        success: false,
        error: error.message,
        code: 'LOGOUT_ERROR'
      });
    }
  }

  // Verify email
  async verifyEmail(req, res) {
    try {
      const { token } = req.validatedBody || req.body;
      
      const result = await authService.verifyEmail(token);

      res.json({
        success: true,
        data: result,
        message: 'Email verified successfully'
      });
    } catch (error) {
      logger.error('AuthController.verifyEmail error:', error);
      res.status(500).json({
        success: false,
        error: error.message,
        code: 'EMAIL_VERIFICATION_ERROR'
      });
    }
  }

  // Refresh token
  async refreshToken(req, res) {
    try {
      const { refreshToken } = req.validatedBody || req.body;
      
      const result = await authService.refreshToken(refreshToken);

      res.json({
        success: true,
        data: {
          user: result.user
        },
        token: result.token,
        message: 'Token refreshed successfully'
      });
    } catch (error) {
      logger.error('AuthController.refreshToken error:', error);
      res.status(401).json({
        success: false,
        error: error.message,
        code: 'TOKEN_REFRESH_ERROR'
      });
    }
  }

  // Delete user account
  async deleteAccount(req, res) {
    try {
      const userId = req.user.id;
      const { password } = req.validatedBody || req.body;
      
      // Verify password before deletion
      try {
        await authService.login({ email: req.user.email, password });
      } catch (error) {
        return res.status(401).json({
          success: false,
          error: 'Invalid password',
          code: 'INVALID_PASSWORD'
        });
      }
      
      await authService.deleteAccount(userId);

      res.json({
        success: true,
        message: 'Account deleted successfully'
      });
    } catch (error) {
      logger.error('AuthController.deleteAccount error:', error);
      res.status(500).json({
        success: false,
        error: error.message,
        code: 'ACCOUNT_DELETION_ERROR'
      });
    }
  }

  // OAuth callback (for Google, GitHub, etc.)
  async oauthCallback(req, res) {
    try {
      const { provider, code, state } = req.query;
      
      // Handle OAuth callback based on provider
      let result;
      
      switch (provider) {
        case 'google':
          result = await authService.handleGoogleOAuth(code);
          break;
        case 'github':
          result = await authService.handleGitHubOAuth(code);
          break;
        default:
          throw new Error('Unsupported OAuth provider');
      }

      res.json({
        success: true,
        data: {
          user: result.user,
          profile: result.profile
        },
        token: result.token,
        message: 'OAuth authentication successful'
      });
    } catch (error) {
      logger.error('AuthController.oauthCallback error:', error);
      res.status(500).json({
        success: false,
        error: error.message,
        code: 'OAUTH_ERROR'
      });
    }
  }

  // Get OAuth URL
  async getOAuthUrl(req, res) {
    try {
      const { provider } = req.params;
      
      let oauthUrl;
      
      switch (provider) {
        case 'google':
          oauthUrl = authService.getGoogleOAuthUrl();
          break;
        case 'github':
          oauthUrl = authService.getGitHubOAuthUrl();
          break;
        default:
          throw new Error('Unsupported OAuth provider');
      }

      res.json({
        success: true,
        data: { url: oauthUrl }
      });
    } catch (error) {
      logger.error('AuthController.getOAuthUrl error:', error);
      res.status(400).json({
        success: false,
        error: error.message,
        code: 'OAUTH_URL_ERROR'
      });
    }
  }
}

export default new AuthController();
