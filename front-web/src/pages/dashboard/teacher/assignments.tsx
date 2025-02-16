import { User } from "../../../types/auth"
import { TeacherLayout } from "../../../components/dashboard/layout/teacher-layout"
import { ClipboardCheck, Search, Plus, Calendar, Clock, CheckCircle2, XCircle } from "lucide-react"

interface TeacherAssignmentsProps {
  user: User
}

export default function TeacherAssignments({ user }: TeacherAssignmentsProps) {
  return (
    <TeacherLayout user={user}>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Assignments</h1>
            <p className="mt-1 text-sm text-gray-500">
              Create and manage class assignments
            </p>
          </div>
          <button className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
            <Plus className="h-4 w-4" />
            Create Assignment
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search assignments..."
            className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Assignment Stats */}
        <div className="grid gap-6 md:grid-cols-4">
          <div className="rounded-lg border bg-white p-6">
            <h3 className="text-sm font-medium text-gray-500">Total Assignments</h3>
            <p className="mt-2 text-3xl font-semibold text-gray-900">24</p>
            <p className="mt-1 text-sm text-gray-500">This semester</p>
          </div>
          <div className="rounded-lg border bg-white p-6">
            <h3 className="text-sm font-medium text-gray-500">Pending Review</h3>
            <p className="mt-2 text-3xl font-semibold text-yellow-600">8</p>
            <p className="mt-1 text-sm text-gray-500">To be graded</p>
          </div>
          <div className="rounded-lg border bg-white p-6">
            <h3 className="text-sm font-medium text-gray-500">Completed</h3>
            <p className="mt-2 text-3xl font-semibold text-green-600">12</p>
            <p className="mt-1 text-sm text-gray-500">Graded and returned</p>
          </div>
          <div className="rounded-lg border bg-white p-6">
            <h3 className="text-sm font-medium text-gray-500">Due Soon</h3>
            <p className="mt-2 text-3xl font-semibold text-red-600">4</p>
            <p className="mt-1 text-sm text-gray-500">Within 7 days</p>
          </div>
        </div>

        {/* Assignments List */}
        <div className="rounded-lg border bg-white">
          <div className="divide-y">
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-yellow-100 p-2">
                    <ClipboardCheck className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Calculus Quiz #3</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>Mathematics 101</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Due Mar 15, 2024
                      </span>
                    </div>
                  </div>
                </div>
                <button className="rounded-md bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600 hover:bg-blue-100">
                  Grade
                </button>
              </div>
            </div>

            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-green-100 p-2">
                    <ClipboardCheck className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Lab Report #2</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>Physics 201</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Due Mar 20, 2024
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