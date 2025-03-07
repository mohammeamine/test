import { Link } from "react-router-dom"

export default function DebugNav() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Debug Navigation</h1>
      
      <div className="space-y-8">
        {/* Student Routes */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-blue-600">Student Pages</h2>
          <div className="grid grid-cols-2 gap-4">
            <Link to="/debug/student" className="p-3 rounded border hover:bg-gray-50">
              Student Dashboard
            </Link>
            <Link to="/debug/student/courses" className="p-3 rounded border hover:bg-gray-50">
              Student Courses
            </Link>
            <Link to="/debug/student/materials" className="p-3 rounded border hover:bg-gray-50">
              Course Materials
            </Link>
            <Link to="/debug/student/library" className="p-3 rounded border hover:bg-gray-50">
              Digital Library
            </Link>
            <Link to="/debug/student/certificates" className="p-3 rounded border hover:bg-gray-50">
              Certificates
            </Link>
            <Link to="/debug/student/attendance" className="p-3 rounded border hover:bg-gray-50">
              Attendance
            </Link>
            <Link to="/debug/student/payments" className="p-3 rounded border hover:bg-gray-50">
              Payments
            </Link>
            <Link to="/debug/student/documents" className="p-3 rounded border hover:bg-gray-50">
              Documents
            </Link>
            <Link to="/debug/student/assignments" className="p-3 rounded border hover:bg-gray-50">
              Assignments
            </Link>
            <Link to="/debug/student/support" className="p-3 rounded border hover:bg-gray-50">
              Support
            </Link>
            <Link to="/debug/student/profile" className="p-3 rounded border hover:bg-gray-50">
              Profile
            </Link>
            <Link to="/debug/student/settings" className="p-3 rounded border hover:bg-gray-50">
              Settings
            </Link>
          </div>
        </div>

        {/* Teacher Routes */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-green-600">Teacher Pages</h2>
          <div className="grid grid-cols-2 gap-4">
            <Link to="/debug/teacher" className="p-3 rounded border hover:bg-gray-50">
              Teacher Dashboard
            </Link>
            <Link to="/debug/teacher/classes" className="p-3 rounded border hover:bg-gray-50">
              Classes
            </Link>
            <Link to="/debug/teacher/materials" className="p-3 rounded border hover:bg-gray-50">
              Materials
            </Link>
            <Link to="/debug/teacher/students" className="p-3 rounded border hover:bg-gray-50">
              Students
            </Link>
            <Link to="/debug/teacher/attendance" className="p-3 rounded border hover:bg-gray-50">
              Attendance
            </Link>
            <Link to="/debug/teacher/grading" className="p-3 rounded border hover:bg-gray-50">
              Grading
            </Link>
            <Link to="/debug/teacher/assignments" className="p-3 rounded border hover:bg-gray-50">
              Assignments
            </Link>
            <Link to="/debug/teacher/messages" className="p-3 rounded border hover:bg-gray-50">
              Messages
            </Link>
            <Link to="/debug/teacher/documents" className="p-3 rounded border hover:bg-gray-50">
              Documents
            </Link>
            <Link to="/debug/teacher/profile" className="p-3 rounded border hover:bg-gray-50">
              Profile
            </Link>
            <Link to="/debug/teacher/settings" className="p-3 rounded border hover:bg-gray-50">
              Settings
            </Link>
          </div>
        </div>

        {/* Parent Routes */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-purple-600">Parent Pages</h2>
          <div className="grid grid-cols-2 gap-4">
            <Link to="/debug/parent" className="p-3 rounded border hover:bg-gray-50">
              Parent Dashboard
            </Link>
            <Link to="/debug/parent/children" className="p-3 rounded border hover:bg-gray-50">
              Children
            </Link>
            <Link to="/debug/parent/progress" className="p-3 rounded border hover:bg-gray-50">
              Academic Progress
            </Link>
            <Link to="/debug/parent/monitoring" className="p-3 rounded border hover:bg-gray-50">
              Student Monitoring
            </Link>
            <Link to="/debug/parent/messages" className="p-3 rounded border hover:bg-gray-50">
              Messages
            </Link>
            <Link to="/debug/parent/payments" className="p-3 rounded border hover:bg-gray-50">
              Payments
            </Link>
            <Link to="/debug/parent/documents" className="p-3 rounded border hover:bg-gray-50">
              Documents
            </Link>
            <Link to="/debug/parent/profile" className="p-3 rounded border hover:bg-gray-50">
              Profile
            </Link>
            <Link to="/debug/parent/settings" className="p-3 rounded border hover:bg-gray-50">
              Settings
            </Link>
          </div>
        </div>

        {/* Admin Routes */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-red-600">Administrator Pages</h2>
          <div className="grid grid-cols-2 gap-4">
            <Link to="/debug/administrator" className="p-3 rounded border hover:bg-gray-50">
              Admin Dashboard
            </Link>
            <Link to="/debug/administrator/users" className="p-3 rounded border hover:bg-gray-50">
              User Management
            </Link>
            <Link to="/debug/administrator/classes" className="p-3 rounded border hover:bg-gray-50">
              Classes
            </Link>
            <Link to="/debug/administrator/courses" className="p-3 rounded border hover:bg-gray-50">
              Courses
            </Link>
            <Link to="/debug/administrator/analytics" className="p-3 rounded border hover:bg-gray-50">
              Analytics
            </Link>
            <Link to="/debug/administrator/events" className="p-3 rounded border hover:bg-gray-50">
              Events
            </Link>
            <Link to="/debug/administrator/notifications" className="p-3 rounded border hover:bg-gray-50">
              Notifications
            </Link>
            <Link to="/debug/administrator/settings" className="p-3 rounded border hover:bg-gray-50">
              Settings
            </Link>
            <Link to="/debug/administrator/profile" className="p-3 rounded border hover:bg-gray-50">
              Profile
            </Link>
          </div>
        </div>

        {/* Auth Pages */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-600">Auth Pages</h2>
          <div className="grid grid-cols-2 gap-4">
            <Link to="/" className="p-3 rounded border hover:bg-gray-50">
              Landing Page
            </Link>
            <Link to="/auth/sign-in" className="p-3 rounded border hover:bg-gray-50">
              Sign In
            </Link>
            <Link to="/auth/sign-up" className="p-3 rounded border hover:bg-gray-50">
              Sign Up
            </Link>
            <Link to="/auth/forgot-password" className="p-3 rounded border hover:bg-gray-50">
              Forgot Password
            </Link>
            <Link to="/auth/reset-password" className="p-3 rounded border hover:bg-gray-50">
              Reset Password
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}