import { User } from "../../../types/auth"
import { StudentLayout } from "../../../components/dashboard/layout/student-layout"
import { Calendar, Clock, Download, Search, CheckCircle2, XCircle } from "lucide-react"

interface StudentAttendanceProps {
  user: User
}

export default function StudentAttendance({ user }: StudentAttendanceProps) {
  return (
    <StudentLayout user={user}>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Attendance Records</h1>
            <p className="mt-1 text-sm text-gray-500">
              Track your attendance and view records
            </p>
          </div>
          <button className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
            <Download className="h-4 w-4" />
            Download Report
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by course or date..."
            className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Attendance Stats */}
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-lg border bg-white p-6">
            <h3 className="text-sm font-medium text-gray-500">Overall Attendance</h3>
            <p className="mt-2 text-3xl font-semibold text-blue-600">92%</p>
            <p className="mt-1 text-sm text-gray-500">Current semester</p>
          </div>
          <div className="rounded-lg border bg-white p-6">
            <h3 className="text-sm font-medium text-gray-500">Days Present</h3>
            <p className="mt-2 text-3xl font-semibold text-green-600">45</p>
            <p className="mt-1 text-sm text-gray-500">Out of 49 days</p>
          </div>
          <div className="rounded-lg border bg-white p-6">
            <h3 className="text-sm font-medium text-gray-500">Classes Today</h3>
            <p className="mt-2 text-3xl font-semibold text-gray-900">4</p>
            <p className="mt-1 text-sm text-gray-500">All marked present</p>
          </div>
        </div>

        {/* Attendance List */}
        <div>
          <h2 className="mb-4 text-lg font-semibold text-gray-900">Recent Attendance</h2>
          <div className="rounded-lg border bg-white shadow-sm">
            <div className="divide-y">
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-green-100 p-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Mathematics 101</h3>
                    <p className="text-sm text-gray-500">Today, 10:00 AM</p>
                  </div>
                </div>
                <span className="text-sm font-medium text-green-600">Present</span>
              </div>
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-green-100 p-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Physics 201</h3>
                    <p className="text-sm text-gray-500">Today, 11:30 AM</p>
                  </div>
                </div>
                <span className="text-sm font-medium text-green-600">Present</span>
              </div>
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-red-100 p-2">
                    <XCircle className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Chemistry Lab</h3>
                    <p className="text-sm text-gray-500">Yesterday, 2:00 PM</p>
                  </div>
                </div>
                <span className="text-sm font-medium text-red-600">Absent</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StudentLayout>
  )
} 