import { User } from "../../../types/auth"
import { StudentLayout } from "../../../components/dashboard/layout/student-layout"
import { BookOpen, Clock, Users, Plus } from "lucide-react"

interface StudentCoursesProps {
  user: User
}

export default function StudentCourses({ user }: StudentCoursesProps) {
  return (
    <StudentLayout user={user}>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Courses</h1>
            <p className="mt-1 text-sm text-gray-500">
              View and manage your enrolled courses
            </p>
          </div>
          <button className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
            <Plus className="h-4 w-4" />
            Register Course
          </button>
        </div>

        {/* Course Stats */}
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-lg border bg-white p-6">
            <h3 className="text-sm font-medium text-gray-500">Active Courses</h3>
            <p className="mt-2 text-3xl font-semibold text-gray-900">6</p>
            <p className="mt-1 text-sm text-gray-500">Current Semester</p>
          </div>
          <div className="rounded-lg border bg-white p-6">
            <h3 className="text-sm font-medium text-gray-500">Total Credits</h3>
            <p className="mt-2 text-3xl font-semibold text-gray-900">18</p>
            <p className="mt-1 text-sm text-gray-500">Out of 21 Maximum</p>
          </div>
          <div className="rounded-lg border bg-white p-6">
            <h3 className="text-sm font-medium text-gray-500">Average Grade</h3>
            <p className="mt-2 text-3xl font-semibold text-blue-600">A-</p>
            <p className="mt-1 text-sm text-gray-500">Current Semester</p>
          </div>
        </div>

        {/* Course List */}
        <div>
          <h2 className="mb-4 text-lg font-semibold text-gray-900">Enrolled Courses</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Course Card */}
            <div className="rounded-lg border bg-white p-6">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-blue-100 p-3">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Mathematics 101</h3>
                  <p className="text-sm text-gray-500">Introduction to Calculus</p>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>MWF 10:00 AM</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>30 Students</span>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm font-medium text-blue-600">In Progress</span>
                <button className="rounded-md bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600 hover:bg-blue-100">
                  View Details
                </button>
              </div>
            </div>

            {/* Course Card */}
            <div className="rounded-lg border bg-white p-6">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-purple-100 p-3">
                  <BookOpen className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Physics 201</h3>
                  <p className="text-sm text-gray-500">Classical Mechanics</p>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>TTH 2:00 PM</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>25 Students</span>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm font-medium text-blue-600">In Progress</span>
                <button className="rounded-md bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600 hover:bg-blue-100">
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StudentLayout>
  )
} 