import { User } from '../types/auth'

export const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@example.com',
    firstName: 'Admin',
    lastName: 'User',
    role: 'administrator',
    phoneNumber: '+1 (555) 123-4567'
  },
  {
    id: '2',
    email: 'teacher@example.com',
    firstName: 'John',
    lastName: 'Smith',
    role: 'teacher',
    phoneNumber: '+1 (555) 234-5678'
  },
  {
    id: '3',
    email: 'student@example.com',
    firstName: 'Sarah',
    lastName: 'Johnson',
    role: 'student',
    studentId: 'S12345'
  },
  {
    id: '4',
    email: 'parent@example.com',
    firstName: 'Michael',
    lastName: 'Brown',
    role: 'parent',
    phoneNumber: '+1 (555) 345-6789'
  }
]
