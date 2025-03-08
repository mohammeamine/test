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
}

export type SignInFormData = z.infer<typeof signInSchema>;
export type SignUpFormData = z.infer<typeof signUpSchema>;
export type SignUpData = Omit<SignUpFormData, 'confirmPassword' | 'acceptTerms'>;
export type SignInData = SignInFormData;
