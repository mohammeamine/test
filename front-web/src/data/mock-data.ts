import { User } from '../types/auth'

export const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@example.com',
    firstName: 'Admin',
    lastName: 'User',
    role: 'administrator',
    phoneNumber: '+1 (555) 123-4567',
    createdAt: '2023-01-15T08:30:00Z',
    updatedAt: '2023-01-15T08:30:00Z'
  },
  {
    id: '2',
    email: 'teacher@example.com',
    firstName: 'John',
    lastName: 'Smith',
    role: 'teacher',
    phoneNumber: '+1 (555) 234-5678',
    createdAt: '2023-02-20T10:15:00Z',
    updatedAt: '2023-02-20T10:15:00Z'
  },
  {
    id: '3',
    email: 'student@example.com',
    firstName: 'Sarah',
    lastName: 'Johnson',
    role: 'student',
    studentId: 'S12345',
    createdAt: '2023-03-10T14:45:00Z',
    updatedAt: '2023-03-10T14:45:00Z'
  },
  {
    id: '4',
    email: 'parent@example.com',
    firstName: 'Michael',
    lastName: 'Brown',
    role: 'parent',
    phoneNumber: '+1 (555) 345-6789',
    createdAt: '2023-04-05T09:20:00Z',
    updatedAt: '2023-04-05T09:20:00Z'
  }
]
