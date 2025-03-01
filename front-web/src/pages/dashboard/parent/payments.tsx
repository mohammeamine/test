import { User } from "../../../types/auth"
import { ParentLayout } from "../../../components/dashboard/layout/parent-layout"
import { Search, CreditCard, Receipt, Calendar, DollarSign, Plus } from "lucide-react"

interface ParentPaymentsProps {
  user: User
}

export default function ParentPayments({ user }: ParentPaymentsProps) {
  return (
    <ParentLayout user={user}>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Payments</h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage and track school-related payments
            </p>
          </div>
          <button className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
            <Plus className="h-4 w-4" />
            Make Payment
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search payments..."
            className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Payment Stats */}
        <div className="grid gap-6 md:grid-cols-4">
          <div className="rounded-lg border bg-white p-6">
            <h3 className="text-sm font-medium text-gray-500">Total Paid</h3>
            <p className="mt-2 text-3xl font-semibold text-gray-900">$12,450</p>
            <p className="mt-1 text-sm text-gray-500">This academic year</p>
          </div>
          <div className="rounded-lg border bg-white p-6">
            <h3 className="text-sm font-medium text-gray-500">Pending</h3>
            <p className="mt-2 text-3xl font-semibold text-blue-600">$2,500</p>
            <p className="mt-1 text-sm text-gray-500">Due this month</p>
          </div>
          <div className="rounded-lg border bg-white p-6">
            <h3 className="text-sm font-medium text-gray-500">Last Payment</h3>
            <p className="mt-2 text-3xl font-semibold text-purple-600">$850</p>
            <p className="mt-1 text-sm text-gray-500">2 weeks ago</p>
          </div>
          <div className="rounded-lg border bg-white p-6">
            <h3 className="text-sm font-medium text-gray-500">Payment Methods</h3>
            <p className="mt-2 text-3xl font-semibold text-green-600">3</p>
            <p className="mt-1 text-sm text-gray-500">Active cards</p>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="rounded-lg border bg-white p-6">
          <h2 className="text-lg font-medium text-gray-900">Payment Methods</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <CreditCard className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Visa ending in 4242</h3>
                    <p className="text-sm text-gray-500">Expires 12/24</p>
                  </div>
                </div>
                <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-sm font-medium text-green-800">
                  Default
                </span>
              </div>
            </div>
            {/* Add more payment methods here */}
          </div>
        </div>

        {/* Recent Payments */}
        <div className="rounded-lg border bg-white">
          <div className="border-b px-6 py-4">
            <h2 className="text-lg font-medium text-gray-900">Recent Payments</h2>
          </div>
          <div className="divide-y">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                    <Receipt className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Tuition Payment</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        March 15, 2024
                      </span>
                      <span className="flex items-center gap-1">
                        <CreditCard className="h-4 w-4" />
                        Visa •••• 4242
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">$850.00</p>
                  <span className="text-sm text-gray-500">Completed</span>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <Receipt className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Activity Fees</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        March 1, 2024
                      </span>
                      <span className="flex items-center gap-1">
                        <CreditCard className="h-4 w-4" />
                        Visa •••• 4242
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">$250.00</p>
                  <span className="text-sm text-gray-500">Completed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ParentLayout>
  )
} 