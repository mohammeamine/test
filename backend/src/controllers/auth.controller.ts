import { Request, Response } from 'express';
import { authService } from '../services/auth.service';
import { SignInData, SignUpData } from '../types/auth';

class AuthController {
  /**
   * Register a new user
   */
  async register(req: Request, res: Response) {
    try {
      const userData: SignUpData = req.body;
      
      const { user, token } = await authService.register(userData);
      
      res.status(201).json({
        error: false,
        data: { user, token },
        message: 'User registered successfully',
      });
    } catch (error: any) {
      res.status(400).json({
        error: true,
        message: error.message || 'Failed to register user',
      });
    }
  }

  /**
   * Login a user
   */
  async login(req: Request, res: Response) {
    try {
      const credentials: SignInData = req.body;
      
      const { user, token } = await authService.login(credentials);
      
      res.status(200).json({
        error: false,
        data: { user, token },
        message: 'Login successful',
      });
    } catch (error: any) {
      res.status(401).json({
        error: true,
        message: error.message || 'Authentication failed',
      });
    }
  }

  /**
   * Request password reset
   */
  async forgotPassword(req: Request, res: Response) {
    try {
      const { email } = req.body;
      
      await authService.requestPasswordReset(email);
      
      // Always return success to prevent email enumeration
      res.status(200).json({
        error: false,
        message: 'If the email exists, a password reset link will be sent',
      });
    } catch (error: any) {
      res.status(400).json({
        error: true,
        message: error.message || 'Failed to process request',
      });
    }
  }

  /**
   * Reset password
   */
  async resetPassword(req: Request, res: Response) {
    try {
      const { token, newPassword } = req.body;
      
      const success = await authService.resetPassword(token, newPassword);
      
      if (success) {
        res.status(200).json({
          error: false,
          message: 'Password reset successful',
        });
      } else {
        res.status(400).json({
          error: true,
          message: 'Failed to reset password',
        });
      }
    } catch (error: any) {
      res.status(400).json({
        error: true,
        message: error.message || 'Failed to reset password',
      });
    }
  }

  /**
   * Get current authenticated user (me)
   */
  async getCurrentUser(req: Request, res: Response) {
    try {
      if (!req.user || !req.user.userId) {
        return res.status(401).json({
          error: true,
          message: 'Authentication required',
        });
      }
      
      // The auth middleware already verified the token
      res.status(200).json({
        error: false,
        data: { user: req.user },
        message: 'User information retrieved',
      });
    } catch (error: any) {
      res.status(500).json({
        error: true,
        message: error.message || 'Failed to get user information',
      });
    }
  }
}

export const authController = new AuthController(); 