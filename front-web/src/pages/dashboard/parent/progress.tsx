import { User } from "../../../types/auth"
import { ParentLayout } from "../../../components/dashboard/layout/parent-layout"
import { BarChart, TrendingUp, GraduationCap, BookOpen, Clock, Award } from "lucide-react"

interface ParentProgressProps {
  user: User
}

export default function ParentProgress({ user }: ParentProgressProps) {
  return (
    <ParentLayout user={user}>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Academic Progress</h1>
            <p className="mt-1 text-sm text-gray-500">
              Track your children's academic performance
            </p>
          </div>
        </div>

        {/* Progress Stats */}
        <div className="grid gap-6 md:grid-cols-4">
          <div className="rounded-lg border bg-white p-6">
            <h3 className="text-sm font-medium text-gray-500">Overall GPA</h3>
            <p className="mt-2 text-3xl font-semibold text-gray-900">3.8</p>
            <p className="mt-1 text-sm text-gray-500">Current semester</p>
          </div>
          <div className="rounded-lg border bg-white p-6">
            <h3 className="text-sm font-medium text-gray-500">Attendance Rate</h3>
            <p className="mt-2 text-3xl font-semibold text-blue-600">95%</p>
            <p className="mt-1 text-sm text-gray-500">Academic year</p>
          </div>
          <div className="rounded-lg border bg-white p-6">
            <h3 className="text-sm font-medium text-gray-500">Completed Courses</h3>
            <p className="mt-2 text-3xl font-semibold text-green-600">12</p>
            <p className="mt-1 text-sm text-gray-500">Out of 15</p>
          </div>
          <div className="rounded-lg border bg-white p-6">
            <h3 className="text-sm font-medium text-gray-500">Awards</h3>
            <p className="mt-2 text-3xl font-semibold text-purple-600">3</p>
            <p className="mt-1 text-sm text-gray-500">Academic achievements</p>
          </div>
        </div>

        {/* Progress Cards */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Subject Progress */}
          <div className="rounded-lg border bg-white p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Subject Performance</h2>
              <span className="text-sm text-gray-500">Current Semester</span>
            </div>
            <div className="mt-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <BookOpen className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Mathematics</h3>
                    <p className="text-sm text-gray-500">Advanced Calculus</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-lg font-semibold text-gray-900">A</span>
                  <p className="text-sm text-gray-500">95%</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <BookOpen className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Physics</h3>
                    <p className="text-sm text-gray-500">Classical Mechanics</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-lg font-semibold text-gray-900">A-</span>
                  <p className="text-sm text-gray-500">92%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Achievements */}
          <div className="rounded-lg border bg-white p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Recent Achievements</h2>
              <span className="text-sm text-gray-500">Last 30 days</span>
            </div>
            <div className="mt-4 space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center">
                  <Award className="h-5 w-5 text-yellow-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Perfect Attendance</h3>
                  <p className="text-sm text-gray-500">Achieved 100% attendance this month</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Top Performance</h3>
                  <p className="text-sm text-gray-500">Ranked 1st in Mathematics</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ParentLayout>
  )
} 