import { User } from "../../../types/auth"
import { StudentLayout } from "../../../components/dashboard/layout/student-layout"
import { CreditCard, Download, AlertCircle, Plus } from "lucide-react"

interface StudentPaymentsProps {
  user: User
}

export default function StudentPayments({ user }: StudentPaymentsProps) {
  return (
    <StudentLayout user={user}>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Payments</h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage your payments and view invoices
            </p>
          </div>
          <button className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
            <Plus className="h-4 w-4" />
            Make Payment
          </button>
        </div>

        {/* Payment Due Alert */}
        <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
          <div className="flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-yellow-600" />
            <div>
              <h3 className="font-medium text-yellow-800">Payment Due</h3>
              <p className="text-sm text-yellow-700">Spring Semester 2024 payment is due by March 1st</p>
            </div>
          </div>
        </div>

        {/* Payment Summary */}
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-lg border bg-white p-6">
            <h3 className="text-sm font-medium text-gray-500">Total Paid</h3>
            <p className="mt-2 text-3xl font-semibold text-gray-900">$15,000</p>
            <p className="mt-1 text-sm text-gray-500">Academic Year 2023-24</p>
          </div>
          <div className="rounded-lg border bg-white p-6">
            <h3 className="text-sm font-medium text-gray-500">Due Amount</h3>
            <p className="mt-2 text-3xl font-semibold text-red-600">$5,000</p>
            <p className="mt-1 text-sm text-gray-500">Spring Semester</p>
          </div>
          <div className="rounded-lg border bg-white p-6">
            <h3 className="text-sm font-medium text-gray-500">Next Due Date</h3>
            <p className="mt-2 text-3xl font-semibold text-gray-900">Mar 1</p>
            <p className="mt-1 text-sm text-gray-500">Spring Semester</p>
          </div>
        </div>

        {/* Payment History */}
        <div>
          <h2 className="mb-4 text-lg font-semibold text-gray-900">Payment History</h2>
          <div className="rounded-lg border bg-white shadow-sm">
            <div className="divide-y">
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <CreditCard className="h-8 w-8 text-green-500" />
                  <div>
                    <h3 className="font-medium text-gray-900">Fall Semester 2023</h3>
                    <p className="text-sm text-gray-500">Paid on Dec 15, 2023</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-gray-900">$5,000</span>
                  <button className="flex items-center gap-2 rounded-md bg-gray-50 px-3 py-1 text-sm font-medium text-gray-600 hover:bg-gray-100">
                    <Download className="h-4 w-4" />
                    Invoice
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <CreditCard className="h-8 w-8 text-green-500" />
                  <div>
                    <h3 className="font-medium text-gray-900">Spring Semester 2023</h3>
                    <p className="text-sm text-gray-500">Paid on Aug 15, 2023</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-gray-900">$5,000</span>
                  <button className="flex items-center gap-2 rounded-md bg-gray-50 px-3 py-1 text-sm font-medium text-gray-600 hover:bg-gray-100">
                    <Download className="h-4 w-4" />
                    Invoice
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StudentLayout>
  )
} 