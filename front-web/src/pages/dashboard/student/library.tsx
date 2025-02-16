import { User } from "../../../types/auth"
import { StudentLayout } from "../../../components/dashboard/layout/student-layout"
import { Search, BookOpen, FileText, Video, Bookmark, ExternalLink } from "lucide-react"

interface StudentLibraryProps {
  user: User
}

export default function StudentLibrary({ user }: StudentLibraryProps) {
  return (
    <StudentLayout user={user}>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Digital Library</h1>
            <p className="mt-1 text-sm text-gray-500">
              Access educational resources and study materials
            </p>
          </div>
          <button className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
            <Bookmark className="h-4 w-4" />
            Saved Items
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search library resources..."
            className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Library Stats */}
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-lg border bg-white p-6">
            <h3 className="text-sm font-medium text-gray-500">Available Resources</h3>
            <p className="mt-2 text-3xl font-semibold text-gray-900">1,240</p>
            <p className="mt-1 text-sm text-gray-500">Books, articles & videos</p>
          </div>
          <div className="rounded-lg border bg-white p-6">
            <h3 className="text-sm font-medium text-gray-500">Recently Added</h3>
            <p className="mt-2 text-3xl font-semibold text-blue-600">28</p>
            <p className="mt-1 text-sm text-gray-500">This month</p>
          </div>
          <div className="rounded-lg border bg-white p-6">
            <h3 className="text-sm font-medium text-gray-500">Saved Items</h3>
            <p className="mt-2 text-3xl font-semibold text-purple-600">15</p>
            <p className="mt-1 text-sm text-gray-500">In your bookmarks</p>
          </div>
        </div>

        {/* Resources List */}
        <div>
          <h2 className="mb-4 text-lg font-semibold text-gray-900">Featured Resources</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Resource Card */}
            <div className="rounded-lg border bg-white p-6">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-blue-100 p-3">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Advanced Mathematics</h3>
                  <p className="text-sm text-gray-500">Digital Textbook</p>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm text-gray-500">eBook • PDF</span>
                <button className="flex items-center gap-2 rounded-md bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600 hover:bg-blue-100">
                  <ExternalLink className="h-4 w-4" />
                  Read Now
                </button>
              </div>
            </div>

            {/* Resource Card */}
            <div className="rounded-lg border bg-white p-6">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-purple-100 p-3">
                  <Video className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Physics Fundamentals</h3>
                  <p className="text-sm text-gray-500">Video Series</p>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm text-gray-500">12 Videos • HD</span>
                <button className="flex items-center gap-2 rounded-md bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600 hover:bg-blue-100">
                  <ExternalLink className="h-4 w-4" />
                  Watch
                </button>
              </div>
            </div>

            {/* Resource Card */}
            <div className="rounded-lg border bg-white p-6">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-green-100 p-3">
                  <FileText className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Research Papers</h3>
                  <p className="text-sm text-gray-500">Academic Collection</p>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm text-gray-500">25 Papers</span>
                <button className="flex items-center gap-2 rounded-md bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600 hover:bg-blue-100">
                  <ExternalLink className="h-4 w-4" />
                  Browse
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StudentLayout>
  )
} 