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
    const payload: JwtPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };

    const options: SignOptions = {
      expiresIn: config.jwt.expiresIn,
    };

    return jwt.sign(payload, config.jwt.secret as Secret, options);
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
    // In a real application, you would:
    // 1. Generate a reset token
    // 2. Store it in the database with an expiry
    // 3. Send an email with a reset link
    // For this example, we'll just check if the user exists
    const user = await userModel.findByEmail(email);
    return !!user;
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
      // For this example, we'll just decode the token and update the password

      const decoded = jwt.verify(token, config.jwt.secret as Secret) as JwtPayload;
      return await userModel.updatePassword(decoded.userId, newPassword);
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  }
}

export const authService = new AuthService(); 