import { useState } from 'react'
import { DashboardLayout } from '../../../components/dashboard/layout/dashboard-layout'
import { UserResponse } from '../../../types/auth'
import { Class } from '../../../types/class'
import { ClassFormModal, ClassFormData } from '../../../components/dashboard/classes/class-form-modal'
import toast, { Toaster } from 'react-hot-toast'

interface ClassesPageProps {
  user: UserResponse
}

export const ClassesPage = ({ user }: ClassesPageProps) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedGrade, setSelectedGrade] = useState('all')
  const [selectedSubject, setSelectedSubject] = useState('all')
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedClass, setSelectedClass] = useState<Class | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  
  // Mock data - Replace with actual API call
  const [classes, setClasses] = useState<Class[]>([
    {
      id: '1',
      name: 'Mathematics A1',
      grade: '10th Grade',
      teacher: {
        id: '1',
        firstName: 'John',
        lastName: 'Smith',
        email: 'john.smith@example.com',
        role: 'teacher',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      studentsCount: 25,
      schedule: 'Monday 09:00-10:30, Wednesday 09:00-10:30',
      room: 'Room 101',
      subject: 'Mathematics',
      status: 'active',
      academicYear: '2024-2025'
    },
    {
      id: '2',
      name: 'Physics B2',
      grade: '11th Grade',
      teacher: {
        id: '2',
        firstName: 'Sarah',
        lastName: 'Johnson',
        email: 'sarah.johnson@example.com',
        role: 'teacher',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      studentsCount: 22,
      schedule: 'Tuesday 11:00-12:30, Thursday 11:00-12:30',
      room: 'Room 203',
      subject: 'Physics',
      status: 'active',
      academicYear: '2024-2025'
    }
  ])

  const grades = ['9th Grade', '10th Grade', '11th Grade', '12th Grade']
  const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'History', 'Literature', 'Computer Science']

  const filteredClasses = classes.filter(cls => {
    const matchesSearch = 
      cls.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (cls.teacher?.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) || '') ||
      (cls.teacher?.lastName?.toLowerCase().includes(searchQuery.toLowerCase()) || '') ||
      (cls.room?.toLowerCase().includes(searchQuery.toLowerCase()) || '')
    
    const matchesGrade = selectedGrade === 'all' || cls.grade === selectedGrade
    const matchesSubject = selectedSubject === 'all' || cls.subject === selectedSubject

    return matchesSearch && matchesGrade && matchesSubject
  })

  const handleAddClass = async (data: ClassFormData) => {
    setIsLoading(true)
    try {
      // Mock API call - Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const newClass: Class = {
        id: Date.now().toString(),
        name: data.name,
        grade: data.grade,
        subject: data.subject,
        teacherId: data.teacherId,
        description: data.description,
        schedule: data.schedule,
        capacity: data.capacity,
        status: 'active',
        academicYear: '2024-2025',
        createdAt: new Date().toISOString()
      }
      
      setClasses(prev => [...prev, newClass])
      toast.success('Class added successfully')
    } catch (error) {
      console.error('Error adding class:', error)
      toast.error('Failed to add class')
    } finally {
      setIsLoading(false)
    }
  }

  const handleEditClass = async (data: ClassFormData) => {
    if (!selectedClass) return
    
    setIsLoading(true)
    try {
      // Mock API call - Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setClasses(prev =>
        prev.map(cls =>
          cls.id === selectedClass.id
            ? {
                ...cls,
                name: data.name,
                grade: data.grade,
                subject: data.subject,
                teacherId: data.teacherId,
                description: data.description,
                schedule: data.schedule,
                capacity: data.capacity,
              }
            : cls
        )
      )
      
      toast.success('Class updated successfully')
    } catch (error) {
      console.error('Error updating class:', error)
      toast.error('Failed to update class')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteClass = async () => {
    if (!selectedClass) return
    
    setIsLoading(true)
    try {
      // Mock API call - Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setClasses(prev => prev.filter(cls => cls.id !== selectedClass.id))
      toast.success('Class deleted successfully')
      setIsDeleteModalOpen(false)
    } catch (error) {
      console.error('Error deleting class:', error)
      toast.error('Failed to delete class')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <DashboardLayout user={user}>
      <Toaster />
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-2xl font-semibold text-gray-900">Classes</h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all classes including their details, assigned teachers, and schedules.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 sm:w-auto"
              onClick={() => setIsAddModalOpen(true)}
            >
              Add class
            </button>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <div className="sm:w-64">
            <label htmlFor="search" className="sr-only">
              Search classes
            </label>
            <input
              type="search"
              name="search"
              id="search"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              placeholder="Search classes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="sm:w-48">
            <select
              id="grade"
              name="grade"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
            >
              <option value="all">All grades</option>
              {grades.map(grade => (
                <option key={grade} value={grade}>{grade}</option>
              ))}
            </select>
          </div>
          <div className="sm:w-48">
            <select
              id="subject"
              name="subject"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
            >
              <option value="all">All subjects</option>
              {subjects.map(subject => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                        Class Name
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Teacher
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Schedule
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Room
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Students
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Status
                      </th>
                      <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {filteredClasses.map((cls) => (
                      <tr key={cls.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                          <div className="flex flex-col">
                            <div className="font-medium text-gray-900">{cls.name}</div>
                            <div className="text-gray-500">{cls.grade} • {cls.subject}</div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {cls.teacher && (
                            <div className="flex items-center">
                              <div className="h-8 w-8 flex-shrink-0">
                                {cls.teacher.profilePicture ? (
                                  <img className="h-8 w-8 rounded-full" src={cls.teacher.profilePicture} alt="" />
                                ) : (
                                  <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center text-sm">
                                    {cls.teacher.firstName[0]}
                                    {cls.teacher.lastName[0]}
                                  </div>
                                )}
                              </div>
                              <div className="ml-3">
                                <div className="font-medium text-gray-900">
                                  {cls.teacher.firstName} {cls.teacher.lastName}
                                </div>
                              </div>
                            </div>
                          )}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {cls.schedule}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {cls.room}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {cls.studentsCount} students
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm">
                          <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                            cls.status === 'active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {cls.status}
                          </span>
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <button 
                            className="text-primary hover:text-primary/90 mr-4"
                            onClick={() => {
                              setSelectedClass(cls)
                              setIsEditModalOpen(true)
                            }}
                          >
                            Edit
                          </button>
                          <button 
                            className="text-red-600 hover:text-red-900"
                            onClick={() => {
                              setSelectedClass(cls)
                              setIsDeleteModalOpen(true)
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Class Modal */}
      <ClassFormModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddClass}
        title="Add New Class"
      />

      {/* Edit Class Modal */}
      {selectedClass && (
        <ClassFormModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false)
            setSelectedClass(null)
          }}
          onSubmit={handleEditClass}
          classData={selectedClass}
          title="Edit Class"
        />
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && selectedClass && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Delete Class</h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to delete the class "{selectedClass.name}"? This action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleDeleteClass}
                  disabled={isLoading}
                >
                  {isLoading ? 'Deleting...' : 'Delete'}
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => {
                    setIsDeleteModalOpen(false)
                    setSelectedClass(null)
                  }}
                  disabled={isLoading}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}
