import { User } from "../../../types/auth"
import { ParentLayout } from "../../../components/dashboard/layout/parent-layout"
import {
  GraduationCap,
  Calendar,
  Bell,
  BookOpen,
  Clock,
  Receipt,
  MessageSquare,
  FileText
} from "lucide-react"

interface ParentDashboardProps {
  user: User
}

export default function ParentDashboard({ user }: ParentDashboardProps) {
  return (
    <ParentLayout user={user}>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            Welcome back, {user.firstName}
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-6 md:grid-cols-4">
          <div className="rounded-lg border bg-white p-6">
            <h3 className="text-sm font-medium text-gray-500">Children</h3>
            <p className="mt-2 text-3xl font-semibold text-gray-900">2</p>
            <p className="mt-1 text-sm text-gray-500">Enrolled students</p>
          </div>
          <div className="rounded-lg border bg-white p-6">
            <h3 className="text-sm font-medium text-gray-500">Upcoming Events</h3>
            <p className="mt-2 text-3xl font-semibold text-blue-600">5</p>
            <p className="mt-1 text-sm text-gray-500">This week</p>
          </div>
          <div className="rounded-lg border bg-white p-6">
            <h3 className="text-sm font-medium text-gray-500">Messages</h3>
            <p className="mt-2 text-3xl font-semibold text-purple-600">3</p>
            <p className="mt-1 text-sm text-gray-500">Unread</p>
          </div>
          <div className="rounded-lg border bg-white p-6">
            <h3 className="text-sm font-medium text-gray-500">Due Payments</h3>
            <p className="mt-2 text-3xl font-semibold text-red-600">2</p>
            <p className="mt-1 text-sm text-gray-500">Pending</p>
          </div>
        </div>

        {/* Children Overview */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Child Card */}
          <div className="rounded-lg border bg-white p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <GraduationCap className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Sarah Johnson</h3>
                  <p className="text-sm text-gray-500">Grade 10</p>
                </div>
              </div>
              <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-sm font-medium text-green-800">
                95% Attendance
              </span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <BookOpen className="h-4 w-4" />
                <span>6 Active Classes</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="h-4 w-4" />
                <span>3.8 GPA</span>
              </div>
            </div>
            <div className="mt-4">
              <button className="w-full rounded-md bg-blue-50 py-2 text-sm font-medium text-blue-600 hover:bg-blue-100">
                View Details
              </button>
            </div>
          </div>

          {/* Child Card */}
          <div className="rounded-lg border bg-white p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                  <GraduationCap className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Michael Johnson</h3>
                  <p className="text-sm text-gray-500">Grade 8</p>
                </div>
              </div>
              <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-sm font-medium text-green-800">
                92% Attendance
              </span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <BookOpen className="h-4 w-4" />
                <span>6 Active Classes</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="h-4 w-4" />
                <span>3.5 GPA</span>
              </div>
            </div>
            <div className="mt-4">
              <button className="w-full rounded-md bg-blue-50 py-2 text-sm font-medium text-blue-600 hover:bg-blue-100">
                View Details
              </button>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="rounded-lg border bg-white">
          <div className="border-b px-6 py-4">
            <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
          </div>
          <div className="divide-y">
            <div className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <Bell className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-900">
                    Sarah has an upcoming Math test on Friday
                  </p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                  <Receipt className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-900">
                    March tuition payment is due in 5 days
                  </p>
                  <p className="text-xs text-gray-500">1 day ago</p>
                </div>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                  <MessageSquare className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-900">
                    New message from Michael's Science teacher
                  </p>
                  <p className="text-xs text-gray-500">2 days ago</p>
                </div>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center">
                  <FileText className="h-4 w-4 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-900">
                    Report cards are now available for download
                  </p>
                  <p className="text-xs text-gray-500">3 days ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ParentLayout>
  )
} 