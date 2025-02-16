import { User } from "../../../types/auth"
import { TeacherLayout } from "../../../components/dashboard/layout/teacher-layout"
import { Users, Search, GraduationCap, Mail, Phone, Download } from "lucide-react"

interface TeacherStudentsProps {
  user: User
}

export default function TeacherStudents({ user }: TeacherStudentsProps) {
  return (
    <TeacherLayout user={user}>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Students</h1>
            <p className="mt-1 text-sm text-gray-500">
              View and manage student information
            </p>
          </div>
          <button className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
            <Download className="h-4 w-4" />
            Export List
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search students..."
            className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Student Stats */}
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-lg border bg-white p-6">
            <h3 className="text-sm font-medium text-gray-500">Total Students</h3>
            <p className="mt-2 text-3xl font-semibold text-gray-900">180</p>
            <p className="mt-1 text-sm text-gray-500">Across all classes</p>
          </div>
          <div className="rounded-lg border bg-white p-6">
            <h3 className="text-sm font-medium text-gray-500">Average Attendance</h3>
            <p className="mt-2 text-3xl font-semibold text-green-600">92%</p>
            <p className="mt-1 text-sm text-gray-500">This semester</p>
          </div>
          <div className="rounded-lg border bg-white p-6">
            <h3 className="text-sm font-medium text-gray-500">Active Classes</h3>
            <p className="mt-2 text-3xl font-semibold text-blue-600">6</p>
            <p className="mt-1 text-sm text-gray-500">Current semester</p>
          </div>
        </div>

        {/* Students List */}
        <div className="rounded-lg border bg-white">
          <div className="divide-y">
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-medium">
                    JD
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">John Doe</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <GraduationCap className="h-4 w-4" />
                        Mathematics 101
                      </span>
                      <span className="flex items-center gap-1">
                        <Mail className="h-4 w-4" />
                        john@example.com
                      </span>
                    </div>
                  </div>
                </div>
                <button className="rounded-md bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600 hover:bg-blue-100">
                  View Details
                </button>
              </div>
            </div>

            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-medium">
                    JS
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Jane Smith</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <GraduationCap className="h-4 w-4" />
                        Physics 201
                      </span>
                      <span className="flex items-center gap-1">
                        <Mail className="h-4 w-4" />
                        jane@example.com
                      </span>
                    </div>
                  </div>
                </div>
                <button className="rounded-md bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600 hover:bg-blue-100">
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TeacherLayout>
  )
} 