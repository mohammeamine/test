import { User } from "../../../types/auth"
import { TeacherLayout } from "../../../components/dashboard/layout/teacher-layout"
import { Calendar, Clock, Search, CheckCircle2, XCircle, Download, Plus } from "lucide-react"

interface TeacherAttendanceProps {
  user: User
}

export default function TeacherAttendance({ user }: TeacherAttendanceProps) {
  return (
    <TeacherLayout user={user}>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Attendance</h1>
            <p className="mt-1 text-sm text-gray-500">
              Track and manage class attendance
            </p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
              <Plus className="h-4 w-4" />
              Take Attendance
            </button>
            <button className="flex items-center gap-2 rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
              <Download className="h-4 w-4" />
              Export
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by class or date..."
            className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Attendance Stats */}
        <div className="grid gap-6 md:grid-cols-4">
          <div className="rounded-lg border bg-white p-6">
            <h3 className="text-sm font-medium text-gray-500">Today's Classes</h3>
            <p className="mt-2 text-3xl font-semibold text-gray-900">4</p>
            <p className="mt-1 text-sm text-gray-500">Classes to attend</p>
          </div>
          <div className="rounded-lg border bg-white p-6">
            <h3 className="text-sm font-medium text-gray-500">Present Today</h3>
            <p className="mt-2 text-3xl font-semibold text-green-600">85</p>
            <p className="mt-1 text-sm text-gray-500">Students attended</p>
          </div>
          <div className="rounded-lg border bg-white p-6">
            <h3 className="text-sm font-medium text-gray-500">Absent Today</h3>
            <p className="mt-2 text-3xl font-semibold text-red-600">12</p>
            <p className="mt-1 text-sm text-gray-500">Students missed</p>
          </div>
          <div className="rounded-lg border bg-white p-6">
            <h3 className="text-sm font-medium text-gray-500">Average Rate</h3>
            <p className="mt-2 text-3xl font-semibold text-blue-600">92%</p>
            <p className="mt-1 text-sm text-gray-500">This semester</p>
          </div>
        </div>

        {/* Attendance List */}
        <div className="rounded-lg border bg-white">
          <div className="divide-y">
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-green-100 p-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Mathematics 101</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        10:00 AM - 11:30 AM
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Today
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-sm">
                  <div className="font-medium text-gray-900">28/30</div>
                  <div className="text-gray-500">Students present</div>
                </div>
              </div>
            </div>

            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-red-100 p-2">
                    <XCircle className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Physics 201</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        2:00 PM - 3:30 PM
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Today
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-sm">
                  <div className="font-medium text-gray-900">Pending</div>
                  <div className="text-gray-500">Not started</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TeacherLayout>
  )
} 