import { User } from './auth'

export interface Class {
  id: string
  name: string
  grade: string
  subject: string
  teacherId?: string
  teacher?: User
  description?: string
  schedule?: string
  capacity?: number
  studentsCount?: number
  room?: string
  status?: 'active' | 'inactive'
  academicYear?: string
  createdAt?: string
}
