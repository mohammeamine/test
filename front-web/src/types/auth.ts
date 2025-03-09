import { z } from 'zod';
import { signInSchema, signUpSchema } from '@/validations/auth';

export type UserRole = 'administrator' | 'teacher' | 'student' | 'parent';

export interface UserResponse {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  phoneNumber?: string;
  createdAt: string;
  updatedAt: string;
  studentId?: string;
  teacherId?: string;
  parentId?: string;
  profilePicture?: string;
  bio?: string;
}

// Alias User to UserResponse for backward compatibility
export type User = UserResponse;

export type SignInFormData = z.infer<typeof signInSchema>;
export type SignUpFormData = z.infer<typeof signUpSchema>;
export type SignUpData = Omit<SignUpFormData, 'confirmPassword' | 'acceptTerms'>;
export type SignInData = SignInFormData;
