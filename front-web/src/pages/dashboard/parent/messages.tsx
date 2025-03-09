import { User } from "../../../types/auth"
import { ParentLayout } from "../../../components/dashboard/layout/parent-layout"
import { Search, Plus, Calendar, User as UserIcon } from "lucide-react"

interface ParentMessagesProps {
  user: User
}

export default function ParentMessages({ user }: ParentMessagesProps) {
  return (
    <DashboardLayout user={user}>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
            <p className="mt-1 text-sm text-gray-500">
              Communicate with teachers and staff
            </p>
          </div>
          <button className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
            <Plus className="h-4 w-4" />
            New Message
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search messages..."
            className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Messages Stats */}
        <div className="grid gap-6 md:grid-cols-4">
          <div className="rounded-lg border bg-white p-6">
            <h3 className="text-sm font-medium text-gray-500">Total Messages</h3>
            <p className="mt-2 text-3xl font-semibold text-gray-900">24</p>
            <p className="mt-1 text-sm text-gray-500">All messages</p>
          </div>
          <div className="rounded-lg border bg-white p-6">
            <h3 className="text-sm font-medium text-gray-500">Unread</h3>
            <p className="mt-2 text-3xl font-semibold text-blue-600">3</p>
            <p className="mt-1 text-sm text-gray-500">New messages</p>
          </div>
          <div className="rounded-lg border bg-white p-6">
            <h3 className="text-sm font-medium text-gray-500">Teachers</h3>
            <p className="mt-2 text-3xl font-semibold text-purple-600">8</p>
            <p className="mt-1 text-sm text-gray-500">Active conversations</p>
          </div>
          <div className="rounded-lg border bg-white p-6">
            <h3 className="text-sm font-medium text-gray-500">Response Time</h3>
            <p className="mt-2 text-3xl font-semibold text-green-600">2h</p>
            <p className="mt-1 text-sm text-gray-500">Average</p>
          </div>
        </div>

        {/* Messages List */}
        <div className="rounded-lg border bg-white">
          <div className="divide-y">
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <UserIcon className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Mrs. Johnson</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>Mathematics Teacher</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Today, 2:30 PM
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-sm font-medium text-blue-800">New</span>
                  <button className="rounded-md bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600 hover:bg-blue-100">
                    Reply
                  </button>
                </div>
              </div>
            </div>

            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <UserIcon className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Mr. Smith</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>Physics Teacher</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Yesterday
                      </span>
                    </div>
                  </div>
                </div>
                <button className="rounded-md bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600 hover:bg-blue-100">
                  View
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
} 