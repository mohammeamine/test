import { useState } from 'react'
import { DashboardLayout } from '../../../components/dashboard/layout/dashboard-layout'
import { User } from '../../../types/auth'
import { Class } from '../../../types/class'

interface ClassesPageProps {
  user: User
}

export const ClassesPage = ({ user }: ClassesPageProps) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedGrade, setSelectedGrade] = useState('all')
  const [selectedSubject, setSelectedSubject] = useState('all')
  
  // Mock data - Replace with actual API call
  const classes: Class[] = [
    {
      id: '1',
      name: 'Mathematics A1',
      grade: '10th Grade',
      teacher: {
        id: '1',
        firstName: 'John',
        lastName: 'Smith',
        email: 'john.smith@example.com',
        role: 'teacher'
      },
      studentsCount: 25,
      schedule: [
        { day: 'Monday', startTime: '09:00', endTime: '10:30' },
        { day: 'Wednesday', startTime: '09:00', endTime: '10:30' }
      ],
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
        role: 'teacher'
      },
      studentsCount: 22,
      schedule: [
        { day: 'Tuesday', startTime: '11:00', endTime: '12:30' },
        { day: 'Thursday', startTime: '11:00', endTime: '12:30' }
      ],
      room: 'Room 203',
      subject: 'Physics',
      status: 'active',
      academicYear: '2024-2025'
    }
  ]

  const grades = ['9th Grade', '10th Grade', '11th Grade', '12th Grade']
  const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'History', 'Literature', 'Computer Science']

  const filteredClasses = classes.filter(cls => {
    const matchesSearch = 
      cls.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cls.teacher.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cls.teacher.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cls.room.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesGrade = selectedGrade === 'all' || cls.grade === selectedGrade
    const matchesSubject = selectedSubject === 'all' || cls.subject === selectedSubject

    return matchesSearch && matchesGrade && matchesSubject
  })

  const formatSchedule = (schedule: Class['schedule']) => {
    return schedule.map(s => `${s.day} ${s.startTime}-${s.endTime}`).join(', ')
  }

  return (
    <DashboardLayout user={user}>
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
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 sm:w-auto"
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
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {formatSchedule(cls.schedule)}
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
                          <button className="text-primary hover:text-primary-dark mr-4">Edit</button>
                          <button className="text-red-600 hover:text-red-900">Delete</button>
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
    </DashboardLayout>
  )
}
