import { User } from './auth'

export interface Class {
  id: string
  name: string
  grade: string
  teacher: User
  studentsCount: number
  schedule: {
    day: string
    startTime: string
    endTime: string
  }[]
  room: string
  subject: string
  status: 'active' | 'inactive'
  academicYear: string
}
