import { User } from "../../../types/auth"
import { DashboardLayout } from "../../../components/dashboard/layout/dashboard-layout"
import { FileText, Download, Search, File, FilePlus2 } from "lucide-react"

interface ParentDocumentsProps {
  user: User
}

export default function ParentDocuments({ user }: ParentDocumentsProps) {
  return (
    <DashboardLayout user={user}>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Documents</h1>
            <p className="mt-1 text-sm text-gray-500">
              View and download important documents
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
        <div className="grid gap-6 md:grid-cols-4">
          <div className="rounded-lg border bg-white p-6">
            <h3 className="text-sm font-medium text-gray-500">Total Documents</h3>
            <p className="mt-2 text-3xl font-semibold text-gray-900">15</p>
            <p className="mt-1 text-sm text-gray-500">All documents</p>
          </div>
          <div className="rounded-lg border bg-white p-6">
            <h3 className="text-sm font-medium text-gray-500">Recent Uploads</h3>
            <p className="mt-2 text-3xl font-semibold text-blue-600">3</p>
            <p className="mt-1 text-sm text-gray-500">Last 7 days</p>
          </div>
          <div className="rounded-lg border bg-white p-6">
            <h3 className="text-sm font-medium text-gray-500">Downloads</h3>
            <p className="mt-2 text-3xl font-semibold text-purple-600">42</p>
            <p className="mt-1 text-sm text-gray-500">Total downloads</p>
          </div>
          <div className="rounded-lg border bg-white p-6">
            <h3 className="text-sm font-medium text-gray-500">Storage Used</h3>
            <p className="mt-2 text-3xl font-semibold text-green-600">24MB</p>
            <p className="mt-1 text-sm text-gray-500">Of 1GB limit</p>
          </div>
        </div>

        {/* Documents List */}
        <div className="rounded-lg border bg-white">
          <div className="divide-y">
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Report Card Q1</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>PDF Document</span>
                      <span>2.4 MB</span>
                      <span>Uploaded 2 days ago</span>
                    </div>
                  </div>
                </div>
                <button className="flex items-center gap-2 rounded-md bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600 hover:bg-blue-100">
                  <Download className="h-4 w-4" />
                  Download
                </button>
              </div>
            </div>

            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <File className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Permission Slip</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>Word Document</span>
                      <span>1.2 MB</span>
                      <span>Uploaded 1 week ago</span>
                    </div>
                  </div>
                </div>
                <button className="flex items-center gap-2 rounded-md bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600 hover:bg-blue-100">
                  <Download className="h-4 w-4" />
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
} 