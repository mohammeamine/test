export type UserRole = 'administrator' | 'teacher' | 'student' | 'parent'

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: UserRole
  profilePicture?: string
  phoneNumber?: string
  studentId?: string
  createdAt?: string
  bio?: string
}

export interface SignUpData {
  email: string
  password: string
  firstName: string
  lastName: string
  role: UserRole
  phoneNumber?: string
}

export interface SignInData {
  email: string
  password: string
}

export interface ResetPasswordData {
  email: string
}

export interface UpdatePasswordData {
  token: string
  newPassword: string
  confirmPassword: string
}

export interface UpdateProfileData {
  firstName: string
  lastName: string
  phoneNumber?: string
  profilePicture?: File
  bio?: string
}
