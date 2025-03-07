import { apiClient } from "../utils/api-client";
import { User } from "../types/auth";
import { Child } from "../types/models";
import { FEATURES } from "../utils/config";

export interface CreateUserData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: User["role"];
  phoneNumber?: string;
}

export interface UpdateUserData extends Partial<Omit<CreateUserData, "password">> {}

export interface UserFilters {
  role?: User["role"];
  search?: string;
}

// Mock data for when backend is disabled
const MOCK_USERS: User[] = [
  {
    id: "1",
    email: "admin@example.com",
    firstName: "Admin",
    lastName: "User",
    role: "administrator",
    phoneNumber: "+1234567890",
  },
  {
    id: "2",
    email: "teacher@example.com",
    firstName: "Teacher",
    lastName: "Smith",
    role: "teacher",
    phoneNumber: "+1234567891",
  },
  {
    id: "3",
    email: "student@example.com",
    firstName: "Student",
    lastName: "Johnson",
    role: "student",
    studentId: "ST12345",
    phoneNumber: "+1234567892",
  },
  {
    id: "4",
    email: "parent@example.com",
    firstName: "Parent",
    lastName: "Brown",
    role: "parent",
    phoneNumber: "+1234567893",
  },
];

const MOCK_CHILDREN: Child[] = [
  {
    id: "1",
    parentId: "4",
    studentId: "3",
    relationship: "parent",
    isEmergencyContact: true,
    canPickup: true,
  },
];

class UserService {
  private readonly basePath = "/users";

  async getUsers(filters?: UserFilters): Promise<User[]> {
    try {
      const { data } = await apiClient.get<User[]>(this.basePath, filters as Record<string, string>);
      return data;
    } catch (error) {
      if (!FEATURES.enableBackend) {
        // Filter mock users based on role if provided
        if (filters?.role) {
          return MOCK_USERS.filter(user => user.role === filters.role);
        }
        // Filter mock users based on search if provided
        if (filters?.search) {
          const search = filters.search.toLowerCase();
          return MOCK_USERS.filter(
            user =>
              user.firstName.toLowerCase().includes(search) ||
              user.lastName.toLowerCase().includes(search) ||
              user.email.toLowerCase().includes(search)
          );
        }
        return MOCK_USERS;
      }
      throw error;
    }
  }

  async getUser(id: string): Promise<User> {
    try {
      const { data } = await apiClient.get<User>(`${this.basePath}/${id}`);
      return data;
    } catch (error) {
      if (!FEATURES.enableBackend) {
        const user = MOCK_USERS.find(u => u.id === id);
        if (user) return user;
        throw new Error("User not found");
      }
      throw error;
    }
  }

  async createUser(userData: CreateUserData): Promise<User> {
    try {
      const { data } = await apiClient.post<User>(this.basePath, userData);
      return data;
    } catch (error) {
      if (!FEATURES.enableBackend) {
        const newUser: User = {
          id: `${MOCK_USERS.length + 1}`,
          ...userData,
        };
        return newUser;
      }
      throw error;
    }
  }

  async updateUser(id: string, userData: UpdateUserData): Promise<User> {
    try {
      const { data } = await apiClient.put<User>(`${this.basePath}/${id}`, userData);
      return data;
    } catch (error) {
      if (!FEATURES.enableBackend) {
        const userIndex = MOCK_USERS.findIndex(u => u.id === id);
        if (userIndex === -1) throw new Error("User not found");
        
        const updatedUser = {
          ...MOCK_USERS[userIndex],
          ...userData,
        };
        return updatedUser;
      }
      throw error;
    }
  }

  async deleteUser(id: string): Promise<void> {
    try {
      await apiClient.delete(`${this.basePath}/${id}`);
    } catch (error) {
      if (!FEATURES.enableBackend) {
        // Mock successful deletion
        return;
      }
      throw error;
    }
  }

  async updatePassword(id: string, currentPassword: string, newPassword: string): Promise<{ message: string }> {
    try {
      const { data } = await apiClient.post<{ message: string }>(
        `${this.basePath}/${id}/password`,
        {
          currentPassword,
          newPassword,
        }
      );
      return data;
    } catch (error) {
      if (!FEATURES.enableBackend) {
        return { message: "Password updated successfully" };
      }
      throw error;
    }
  }

  async updateProfile(id: string, profileData: FormData): Promise<User> {
    try {
      const { data } = await apiClient.put<User>(
        `${this.basePath}/${id}/profile`,
        profileData
      );
      return data;
    } catch (error) {
      if (!FEATURES.enableBackend) {
        const userIndex = MOCK_USERS.findIndex(u => u.id === id);
        if (userIndex === -1) throw new Error("User not found");
        
        // Mock profile update
        return MOCK_USERS[userIndex];
      }
      throw error;
    }
  }

  // Parent-Child Relationships
  async getChildren(parentId: string): Promise<Child[]> {
    try {
      const { data } = await apiClient.get<Child[]>(
        `${this.basePath}/${parentId}/children`
      );
      return data;
    } catch (error) {
      if (!FEATURES.enableBackend) {
        return MOCK_CHILDREN.filter(child => child.parentId === parentId);
      }
      throw error;
    }
  }

  async addChild(parentId: string, childData: Partial<Child>): Promise<Child> {
    try {
      const { data } = await apiClient.post<Child>(
        `${this.basePath}/${parentId}/children`,
        childData
      );
      return data;
    } catch (error) {
      if (!FEATURES.enableBackend) {
        const newChild: Child = {
          id: `${MOCK_CHILDREN.length + 1}`,
          parentId,
          studentId: childData.studentId || "",
          relationship: childData.relationship || "parent",
          isEmergencyContact: childData.isEmergencyContact || false,
          canPickup: childData.canPickup || false,
        };
        return newChild;
      }
      throw error;
    }
  }

  async removeChild(parentId: string, childId: string): Promise<void> {
    try {
      await apiClient.delete(
        `${this.basePath}/${parentId}/children/${childId}`
      );
    } catch (error) {
      if (!FEATURES.enableBackend) {
        // Mock successful deletion
        return;
      }
      throw error;
    }
  }

  // Teacher-specific endpoints
  async getTeacherStudents(teacherId: string): Promise<User[]> {
    try {
      const { data } = await apiClient.get<User[]>(
        `${this.basePath}/${teacherId}/students`
      );
      return data;
    } catch (error) {
      if (!FEATURES.enableBackend) {
        return MOCK_USERS.filter(user => user.role === "student");
      }
      throw error;
    }
  }

  async getTeacherClasses(teacherId: string): Promise<any[]> {
    try {
      const { data } = await apiClient.get<any[]>(
        `${this.basePath}/${teacherId}/classes`
      );
      return data;
    } catch (error) {
      if (!FEATURES.enableBackend) {
        return [];
      }
      throw error;
    }
  }

  // Student-specific endpoints
  async getStudentCourses(studentId: string): Promise<any[]> {
    try {
      const { data } = await apiClient.get<any[]>(
        `${this.basePath}/${studentId}/courses`
      );
      return data;
    } catch (error) {
      if (!FEATURES.enableBackend) {
        return [];
      }
      throw error;
    }
  }

  async getStudentGrades(studentId: string): Promise<any[]> {
    try {
      const { data } = await apiClient.get<any[]>(
        `${this.basePath}/${studentId}/grades`
      );
      return data;
    } catch (error) {
      if (!FEATURES.enableBackend) {
        return [];
      }
      throw error;
    }
  }
}

export const userService = new UserService(); 