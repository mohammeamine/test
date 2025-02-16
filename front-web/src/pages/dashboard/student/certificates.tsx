import { User } from "../../../types/auth"
import { StudentLayout } from "../../../components/dashboard/layout/student-layout"
import { Award, Download, QrCode, Search, Calendar, Star } from "lucide-react"

interface StudentCertificatesProps {
  user: User
}

export default function StudentCertificates({ user }: StudentCertificatesProps) {
  return (
    <StudentLayout user={user}>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Certificates</h1>
            <p className="mt-1 text-sm text-gray-500">
              View and download your certificates and attestations
            </p>
          </div>
          <button className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
            <QrCode className="h-4 w-4" />
            Verify Certificate
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search certificates..."
            className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Certificate Stats */}
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-lg border bg-white p-6">
            <h3 className="text-sm font-medium text-gray-500">Total Certificates</h3>
            <p className="mt-2 text-3xl font-semibold text-gray-900">8</p>
            <p className="mt-1 text-sm text-gray-500">Earned to date</p>
          </div>
          <div className="rounded-lg border bg-white p-6">
            <h3 className="text-sm font-medium text-gray-500">Courses Completed</h3>
            <p className="mt-2 text-3xl font-semibold text-green-600">12</p>
            <p className="mt-1 text-sm text-gray-500">With certification</p>
          </div>
          <div className="rounded-lg border bg-white p-6">
            <h3 className="text-sm font-medium text-gray-500">Pending</h3>
            <p className="mt-2 text-3xl font-semibold text-yellow-600">2</p>
            <p className="mt-1 text-sm text-gray-500">In progress</p>
          </div>
        </div>

        {/* Certificates List */}
        <div>
          <h2 className="mb-4 text-lg font-semibold text-gray-900">Your Certificates</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Certificate Card */}
            <div className="rounded-lg border bg-white p-6">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-blue-100 p-3">
                  <Award className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Introduction to Programming</h3>
                  <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="h-4 w-4" />
                    <span>Completed Jan 15, 2024</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-1 text-yellow-400">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="text-sm font-medium">Distinction</span>
                </div>
                <div className="flex gap-2">
                  <button className="flex items-center gap-2 rounded-md bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600 hover:bg-blue-100">
                    <Download className="h-4 w-4" />
                    Download
                  </button>
                  <button className="flex items-center gap-2 rounded-md px-3 py-1 text-sm font-medium text-gray-600 hover:bg-gray-50">
                    <QrCode className="h-4 w-4" />
                    Verify
                  </button>
                </div>
              </div>
            </div>

            {/* Certificate Card */}
            <div className="rounded-lg border bg-white p-6">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-purple-100 p-3">
                  <Award className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Data Structures</h3>
                  <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="h-4 w-4" />
                    <span>Completed Dec 20, 2023</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-1 text-yellow-400">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="text-sm font-medium">Merit</span>
                </div>
                <div className="flex gap-2">
                  <button className="flex items-center gap-2 rounded-md bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600 hover:bg-blue-100">
                    <Download className="h-4 w-4" />
                    Download
                  </button>
                  <button className="flex items-center gap-2 rounded-md px-3 py-1 text-sm font-medium text-gray-600 hover:bg-gray-50">
                    <QrCode className="h-4 w-4" />
                    Verify
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