import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import { config } from '../config';
import { userModel } from '../models/user.model';
import { JwtPayload, SignInData, SignUpData, User, UserResponse } from '../types/auth';

class AuthService {
  /**
   * Register a new user
   */
  async register(userData: SignUpData): Promise<{ user: UserResponse; token: string }> {
    // Check if user already exists
    const existingUser = await userModel.findByEmail(userData.email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Create new user
    const userId = await userModel.create(userData);
    
    // Get the created user
    const user = await userModel.findById(userId);
    if (!user) {
      throw new Error('Failed to create user');
    }

    // Generate JWT token
    const token = this.generateToken(user);

    // Return user without password
    const { password, ...userWithoutPassword } = user;
    return { user: userWithoutPassword as UserResponse, token };
  }

  /**
   * Authenticate a user
   */
  async login(credentials: SignInData): Promise<{ user: UserResponse; token: string }> {
    // Find user by email
    const user = await userModel.findByEmail(credentials.email);
    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Verify password
    const isPasswordValid = await userModel.verifyPassword(
      credentials.password,
      user.password
    );
    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    // Generate JWT token
    const token = this.generateToken(user);

    // Return user without password
    const { password, ...userWithoutPassword } = user;
    return { user: userWithoutPassword as UserResponse, token };
  }

  /**
   * Generate JWT token
   */
  private generateToken(user: User): string {
    // Define the payload
    const payload: JwtPayload = {
      userId: user.id,
      id: user.id, // Include id for backward compatibility
      email: user.email,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName
    };

    // Generate the token with expiration
    return jwt.sign(
      payload, 
      config.jwt.secret as Secret, 
      { expiresIn: '24h' } // Use a literal string instead of config
    );
  }

  /**
   * Verify token and return payload
   */
  verifyToken(token: string): JwtPayload {
    return jwt.verify(token, config.jwt.secret as Secret) as JwtPayload;
  }

  /**
   * Request password reset
   */
  async requestPasswordReset(email: string): Promise<boolean> {
    // Find user by email
    const user = await userModel.findByEmail(email);
    if (!user) {
      // Don't reveal that the email doesn't exist (security best practice)
      return false;
    }

    // TODO: Implement password reset token generation and email sending
    
    return true;
  }

  /**
   * Reset password
   */
  async resetPassword(token: string, newPassword: string): Promise<boolean> {
    try {
      // In a real application, you would:
      // 1. Verify the reset token from the database
      // 2. Check if it's expired
      // 3. Update the password
      
      const decoded = jwt.verify(token, config.jwt.secret as Secret) as JwtPayload;
      return await userModel.updatePassword(decoded.userId, newPassword);
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  }

  /**
   * Get user by ID
   */
  async getUserById(userId: string): Promise<UserResponse | null> {
    const user = await userModel.findById(userId);
    if (!user) return null;
    
    // Return user without password
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword as UserResponse;
  }
}

export const authService = new AuthService(); 