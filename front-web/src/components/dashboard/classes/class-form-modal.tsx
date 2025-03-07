import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import type { Class } from '../../../types/class'
import { mockUsers } from '../../../data/mock-data'
import type { User } from '../../../types/auth'

interface ClassFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: ClassFormData) => void
  classData?: Class
  title: string
}

const classSchema = z.object({
  name: z.string().min(2, 'Class name is required'),
  grade: z.string().min(1, 'Grade is required'),
  subject: z.string().min(1, 'Subject is required'),
  teacherId: z.string().optional(),
  description: z.string().optional(),
  schedule: z.string().optional(),
  capacity: z.number().int().positive().optional(),
})

export type ClassFormData = z.infer<typeof classSchema>

// Mock data for grades and subjects
const grades = ['1st Grade', '2nd Grade', '3rd Grade', '4th Grade', '5th Grade', '6th Grade', '7th Grade', '8th Grade', '9th Grade', '10th Grade', '11th Grade', '12th Grade']
const subjects = ['Mathematics', 'Science', 'English', 'History', 'Geography', 'Physics', 'Chemistry', 'Biology', 'Computer Science', 'Art', 'Music', 'Physical Education']

export const ClassFormModal = ({ isOpen, onClose, onSubmit, classData, title }: ClassFormModalProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [teachers, setTeachers] = useState<User[]>([])
  
  useEffect(() => {
    // In a real app, this would fetch teachers from an API
    // Filter mock users to get only teachers
    const teacherUsers = mockUsers.filter(user => user.role === 'teacher')
    setTeachers(teacherUsers)
  }, [])
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ClassFormData>({
    resolver: zodResolver(classSchema),
    defaultValues: classData ? {
      name: classData.name,
      grade: classData.grade,
      subject: classData.subject,
      teacherId: classData.teacherId || '',
      description: classData.description || '',
      schedule: classData.schedule || '',
      capacity: classData.capacity || undefined,
    } : {
      name: '',
      grade: '',
      subject: '',
      teacherId: '',
      description: '',
      schedule: '',
      capacity: undefined,
    }
  })

  const handleFormSubmit = async (data: ClassFormData) => {
    setIsLoading(true)
    setError(null)
    
    try {
      // Convert capacity to number if provided
      if (data.capacity) {
        data.capacity = Number(data.capacity)
      }
      
      await onSubmit(data)
      reset()
      onClose()
    } catch (error) {
      console.error('Class form error:', error)
      setError('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={onClose}></div>
        </div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <h3 className="text-lg leading-6 font-medium text-gray-900">{title}</h3>
                
                {error && (
                  <div className="mt-2 mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <span className="block sm:inline">{error}</span>
                  </div>
                )}
                
                <div className="mt-4">
                  <form onSubmit={handleSubmit(handleFormSubmit)}>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                          Class Name
                        </label>
                        <div className="mt-1">
                          <input
                            id="name"
                            type="text"
                            {...register('name')}
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                            placeholder="e.g., Mathematics 101"
                          />
                          {errors.name && (
                            <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="grade" className="block text-sm font-medium text-gray-700">
                            Grade
                          </label>
                          <div className="mt-1">
                            <select
                              id="grade"
                              {...register('grade')}
                              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                            >
                              <option value="">Select Grade</option>
                              {grades.map((grade) => (
                                <option key={grade} value={grade}>
                                  {grade}
                                </option>
                              ))}
                            </select>
                            {errors.grade && (
                              <p className="mt-2 text-sm text-red-600">{errors.grade.message}</p>
                            )}
                          </div>
                        </div>

                        <div>
                          <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                            Subject
                          </label>
                          <div className="mt-1">
                            <select
                              id="subject"
                              {...register('subject')}
                              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                            >
                              <option value="">Select Subject</option>
                              {subjects.map((subject) => (
                                <option key={subject} value={subject}>
                                  {subject}
                                </option>
                              ))}
                            </select>
                            {errors.subject && (
                              <p className="mt-2 text-sm text-red-600">{errors.subject.message}</p>
                            )}
                          </div>
                        </div>
                      </div>

                      <div>
                        <label htmlFor="teacherId" className="block text-sm font-medium text-gray-700">
                          Assign Teacher
                        </label>
                        <div className="mt-1">
                          <select
                            id="teacherId"
                            {...register('teacherId')}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                          >
                            <option value="">Select Teacher</option>
                            {teachers.map((teacher) => (
                              <option key={teacher.id} value={teacher.id}>
                                {teacher.firstName} {teacher.lastName}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                          Description (Optional)
                        </label>
                        <div className="mt-1">
                          <textarea
                            id="description"
                            rows={3}
                            {...register('description')}
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                            placeholder="Brief description of the class"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="schedule" className="block text-sm font-medium text-gray-700">
                          Schedule (Optional)
                        </label>
                        <div className="mt-1">
                          <input
                            id="schedule"
                            type="text"
                            {...register('schedule')}
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                            placeholder="e.g., Mon, Wed, Fri 10:00 AM - 11:30 AM"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="capacity" className="block text-sm font-medium text-gray-700">
                          Capacity (Optional)
                        </label>
                        <div className="mt-1">
                          <input
                            id="capacity"
                            type="number"
                            {...register('capacity', { valueAsNumber: true })}
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                            placeholder="Max number of students"
                            min={1}
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-70 disabled:cursor-not-allowed"
              onClick={handleSubmit(handleFormSubmit)}
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : 'Save'}
            </button>
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
