import { userModel } from '../models/user.model';
import { User, UserResponse, UserRole } from '../types/auth';

export interface UserFilters {
  role?: UserRole;
  search?: string;
}

class UserService {
  /**
   * Get all users
   */
  async getUsers(filters?: UserFilters): Promise<UserResponse[]> {
    // This is a simplified implementation. In a real app, you would handle
    // the search filter and pagination here.
    const users = await userModel.findAll(filters?.role);
    
    // If search filter is provided, filter results
    if (filters?.search && filters.search.trim() !== '') {
      const searchTerm = filters.search.toLowerCase();
      return users.filter(user => 
        user.email.toLowerCase().includes(searchTerm) ||
        user.firstName.toLowerCase().includes(searchTerm) ||
        user.lastName.toLowerCase().includes(searchTerm)
      );
    }
    
    return users;
  }

  /**
   * Get a single user by ID
   */
  async getUser(id: string): Promise<UserResponse | null> {
    const user = await userModel.findById(id);
    
    if (!user) return null;
    
    // Remove password from response
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword as UserResponse;
  }

  /**
   * Update user details
   */
  async updateUser(id: string, userData: Partial<Omit<User, 'id' | 'password' | 'createdAt' | 'updatedAt'>>): Promise<UserResponse | null> {
    // Update user
    const updated = await userModel.update(id, userData);
    
    if (!updated) return null;
    
    // Get updated user
    return this.getUser(id);
  }

  /**
   * Delete a user
   */
  async deleteUser(id: string): Promise<boolean> {
    return userModel.delete(id);
  }

  /**
   * Update user password
   */
  async updatePassword(id: string, currentPassword: string, newPassword: string): Promise<boolean> {
    // Get user
    const user = await userModel.findById(id);
    if (!user) throw new Error('User not found');
    
    // Verify current password
    const isValid = await userModel.verifyPassword(currentPassword, user.password);
    if (!isValid) throw new Error('Current password is incorrect');
    
    // Update password
    return userModel.updatePassword(id, newPassword);
  }
}

export const userService = new UserService(); 