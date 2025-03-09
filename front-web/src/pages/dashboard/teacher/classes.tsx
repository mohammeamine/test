import { User } from "../../../types/auth"
import { TeacherLayout } from "../../../components/dashboard/layout/teacher-layout"
import { 
  GraduationCap, 
  Users, 
  Clock, 
  Search, 
  Plus,
  CalendarDays,
  BookOpen
} from "lucide-react"

interface TeacherClassesProps {
  user: User
}

export default function TeacherClasses({ user }: TeacherClassesProps) {
  return (
    <DashboardLayout user={user}>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Classes</h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage your classes and course schedules
            </p>
          </div>
          <button className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
            <Plus className="h-4 w-4" />
            Create Class
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search classes..."
            className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Class Stats */}
        <div className="grid gap-6 md:grid-cols-4">
          <div className="rounded-lg border bg-white p-6">
            <h3 className="text-sm font-medium text-gray-500">Active Classes</h3>
            <p className="mt-2 text-3xl font-semibold text-gray-900">6</p>
            <p className="mt-1 text-sm text-gray-500">This semester</p>
          </div>
          <div className="rounded-lg border bg-white p-6">
            <h3 className="text-sm font-medium text-gray-500">Total Students</h3>
            <p className="mt-2 text-3xl font-semibold text-blue-600">180</p>
            <p className="mt-1 text-sm text-gray-500">Across all classes</p>
          </div>
          <div className="rounded-lg border bg-white p-6">
            <h3 className="text-sm font-medium text-gray-500">Hours Taught</h3>
            <p className="mt-2 text-3xl font-semibold text-green-600">24</p>
            <p className="mt-1 text-sm text-gray-500">This week</p>
          </div>
          <div className="rounded-lg border bg-white p-6">
            <h3 className="text-sm font-medium text-gray-500">Course Materials</h3>
            <p className="mt-2 text-3xl font-semibold text-purple-600">15</p>
            <p className="mt-1 text-sm text-gray-500">Resources shared</p>
          </div>
        </div>

        {/* Classes List */}
        <div>
          <h2 className="mb-4 text-lg font-semibold text-gray-900">Current Classes</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Class Card */}
            <div className="rounded-lg border bg-white p-6">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-blue-100 p-3">
                  <GraduationCap className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Mathematics 101</h3>
                  <p className="text-sm text-gray-500">Introduction to Calculus</p>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Users className="h-4 w-4" />
                  <span>30 Students</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Clock className="h-4 w-4" />
                  <span>MWF 10:00 AM - 11:30 AM</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <BookOpen className="h-4 w-4" />
                  <span>12 Materials</span>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-sm font-medium text-green-800">
                  In Progress
                </span>
                <button className="rounded-md bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600 hover:bg-blue-100">
                  View Details
                </button>
              </div>
            </div>

            {/* Class Card */}
            <div className="rounded-lg border bg-white p-6">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-purple-100 p-3">
                  <GraduationCap className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Physics 201</h3>
                  <p className="text-sm text-gray-500">Classical Mechanics</p>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Users className="h-4 w-4" />
                  <span>25 Students</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Clock className="h-4 w-4" />
                  <span>TTH 2:00 PM - 3:30 PM</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <BookOpen className="h-4 w-4" />
                  <span>8 Materials</span>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-sm font-medium text-green-800">
                  In Progress
                </span>
                <button className="rounded-md bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600 hover:bg-blue-100">
                  View Details
                </button>
              </div>
            </div>

            {/* Class Card */}
            <div className="rounded-lg border bg-white p-6">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-yellow-100 p-3">
                  <GraduationCap className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Chemistry Lab</h3>
                  <p className="text-sm text-gray-500">Organic Chemistry</p>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Users className="h-4 w-4" />
                  <span>20 Students</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Clock className="h-4 w-4" />
                  <span>TTH 10:00 AM - 12:00 PM</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <BookOpen className="h-4 w-4" />
                  <span>15 Materials</span>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-sm font-medium text-green-800">
                  In Progress
                </span>
                <button className="rounded-md bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600 hover:bg-blue-100">
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
} 