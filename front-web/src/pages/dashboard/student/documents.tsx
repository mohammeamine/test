import { User } from "../../../types/auth"
import { StudentLayout } from "../../../components/dashboard/layout/student-layout"
import { FileText, Download, Search, File, FilePlus2 } from "lucide-react"

interface StudentDocumentsProps {
  user: User
}

export default function StudentDocuments({ user }: StudentDocumentsProps) {
  return (
    <StudentLayout user={user}>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Documents</h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage your academic documents and records
            </p>
          </div>
          <button className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
            <FilePlus2 className="h-4 w-4" />
            Upload Document
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search documents..."
            className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Document Stats */}
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-lg border bg-white p-6">
            <h3 className="text-sm font-medium text-gray-500">Total Documents</h3>
            <p className="mt-2 text-3xl font-semibold text-gray-900">15</p>
            <p className="mt-1 text-sm text-gray-500">All documents</p>
          </div>
          <div className="rounded-lg border bg-white p-6">
            <h3 className="text-sm font-medium text-gray-500">Recent Uploads</h3>
            <p className="mt-2 text-3xl font-semibold text-blue-600">3</p>
            <p className="mt-1 text-sm text-gray-500">This month</p>
          </div>
          <div className="rounded-lg border bg-white p-6">
            <h3 className="text-sm font-medium text-gray-500">Pending Review</h3>
            <p className="mt-2 text-3xl font-semibold text-yellow-600">2</p>
            <p className="mt-1 text-sm text-gray-500">Awaiting verification</p>
          </div>
        </div>

        {/* Documents List */}
        <div>
          <h2 className="mb-4 text-lg font-semibold text-gray-900">Your Documents</h2>
          <div className="rounded-lg border bg-white shadow-sm">
            <div className="divide-y">
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-blue-100 p-2">
                    <FileText className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Academic Transcript</h3>
                    <p className="text-sm text-gray-500">Fall Semester 2023</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-500">PDF • 2.3 MB</span>
                  <button className="flex items-center gap-2 rounded-md bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600 hover:bg-blue-100">
                    <Download className="h-4 w-4" />
                    Download
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-purple-100 p-2">
                    <File className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Enrollment Certificate</h3>
                    <p className="text-sm text-gray-500">Spring 2024</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-500">PDF • 1.1 MB</span>
                  <button className="flex items-center gap-2 rounded-md bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600 hover:bg-blue-100">
                    <Download className="h-4 w-4" />
                    Download
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-yellow-100 p-2">
                    <File className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Student ID Card</h3>
                    <p className="text-sm text-gray-500">Valid until Dec 2024</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-500">JPG • 856 KB</span>
                  <button className="flex items-center gap-2 rounded-md bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600 hover:bg-blue-100">
                    <Download className="h-4 w-4" />
                    Download
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