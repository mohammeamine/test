import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { UserResponse, UserRole } from "@/types/auth"
import { saveAuthToken } from "@/lib/api-client"

export default function DebugNav() {
  const [selectedRole, setSelectedRole] = useState<UserRole>('administrator')
  const [mockToken, setMockToken] = useState<string | null>(null)

  // Generate a mock JWT token
  const generateMockToken = (role: UserRole): string => {
    // Create a simple mock payload
    const payload = {
      userId: role === 'administrator' ? '1' : role === 'teacher' ? '2' : role === 'student' ? '3' : '4',
      email: `${role}@school.com`,
      role: role,
      exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60, // 24 hours from now
      iat: Math.floor(Date.now() / 1000)
    }
    
    // Encode to base64
    const encodedPayload = btoa(JSON.stringify(payload))
    // Simple mock token (this is not a real JWT, just for development)
    return `mock.${encodedPayload}.signature`
  }

  // Create mock user
  const createMockUser = (role: UserRole): UserResponse => {
    return {
      id: role === 'administrator' ? '1' : role === 'teacher' ? '2' : role === 'student' ? '3' : '4',
      email: `${role}@school.com`,
      updatedAt: new Date().toISOString(),
      firstName: role.charAt(0).toUpperCase() + role.slice(1),
      lastName: 'User',
      role: role,
      createdAt: new Date().toISOString()
    }
  }

  const setAuthAsRole = (role: UserRole) => {
    setSelectedRole(role)
    const mockUser = createMockUser(role)
    const token = generateMockToken(role)
    
    // Save user to localStorage
    localStorage.setItem('user', JSON.stringify(mockUser))
    localStorage.setItem('authToken', token)
    
    // Set in API client
    saveAuthToken(token)
    
    setMockToken(token)
  }

  useEffect(() => {
    // Set default role when component mounts
    setAuthAsRole(selectedRole)
  }, [])

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Debug Navigation</h1>
      
      {/* Role Selector */}
      <div className="mb-8 p-4 border rounded-lg bg-gray-50">
        <h2 className="text-lg font-semibold mb-3">Quick Authentication</h2>
        <p className="mb-4 text-sm text-gray-600">
          Select a role to automatically log in as that user type. This will set mock authentication tokens.
        </p>
        <div className="flex gap-3">
          <button 
            onClick={() => setAuthAsRole('administrator')}
            className={`px-4 py-2 rounded-md ${selectedRole === 'administrator' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            Administrator
          </button>
          <button 
            onClick={() => setAuthAsRole('teacher')}
            className={`px-4 py-2 rounded-md ${selectedRole === 'teacher' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
          >
            Teacher
          </button>
          <button 
            onClick={() => setAuthAsRole('student')}
            className={`px-4 py-2 rounded-md ${selectedRole === 'student' ? 'bg-purple-600 text-white' : 'bg-gray-200'}`}
          >
            Student
          </button>
          <button 
            onClick={() => setAuthAsRole('parent')}
            className={`px-4 py-2 rounded-md ${selectedRole === 'parent' ? 'bg-orange-600 text-white' : 'bg-gray-200'}`}
          >
            Parent
          </button>
        </div>
        {mockToken && (
          <div className="mt-4 text-xs text-gray-500">
            <p>Mock token set! You can now access protected routes without logging in.</p>
            <p>Current role: <span className="font-semibold">{selectedRole}</span></p>
          </div>
        )}
      </div>
      
      <div className="space-y-8">
        {/* Student Routes */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-blue-600">Student Pages</h2>
          <div className="grid grid-cols-2 gap-4">
            <Link to="/dashboard/student" className="p-3 rounded border hover:bg-gray-50">
              Student Dashboard
            </Link>
            <Link to="/dashboard/student/courses" className="p-3 rounded border hover:bg-gray-50">
              Student Courses
            </Link>
            <Link to="/dashboard/student/materials" className="p-3 rounded border hover:bg-gray-50">
              Course Materials
            </Link>
            <Link to="/dashboard/student/library" className="p-3 rounded border hover:bg-gray-50">
              Digital Library
            </Link>
            <Link to="/dashboard/student/certificates" className="p-3 rounded border hover:bg-gray-50">
              Certificates
            </Link>
            <Link to="/dashboard/student/attendance" className="p-3 rounded border hover:bg-gray-50">
              Attendance
            </Link>
            <Link to="/dashboard/student/payments" className="p-3 rounded border hover:bg-gray-50">
              Payments
            </Link>
            <Link to="/dashboard/student/documents" className="p-3 rounded border hover:bg-gray-50">
              Documents
            </Link>
            <Link to="/dashboard/student/assignments" className="p-3 rounded border hover:bg-gray-50">
              Assignments
            </Link>
            <Link to="/dashboard/student/support" className="p-3 rounded border hover:bg-gray-50">
              Support
            </Link>
            <Link to="/debug/student/profile" className="p-3 rounded border hover:bg-gray-50">
              Profile
            </Link>
            <Link to="/debug/student/settings" className="p-3 rounded border hover:bg-gray-50">
              Settings
            </Link>
            <Link to="/dashboard/student/grades" className="p-3 rounded border hover:bg-gray-50">
              Grades
            </Link>
            <Link to="/dashboard/student/schedule" className="p-3 rounded border hover:bg-gray-50">
              Schedule
            </Link>
            <Link to="/dashboard/student/feedback" className="p-3 rounded border hover:bg-gray-50">
              Feedback
            </Link>
            <Link to="/debug/student/contact" className="p-3 rounded border hover:bg-gray-50">
              Contact & Support
            </Link>
          </div>
        </div>

        {/* Teacher Routes */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-green-600">Teacher Pages</h2>
          <div className="grid grid-cols-2 gap-4">
            <Link to="/dashboard/teacher" className="p-3 rounded border hover:bg-gray-50">
              Teacher Dashboard
            </Link>
            <Link to="/dashboard/teacher/classes" className="p-3 rounded border hover:bg-gray-50">
              Classes
            </Link>
            <Link to="/dashboard/teacher/materials" className="p-3 rounded border hover:bg-gray-50">
              Materials
            </Link>
            <Link to="/dashboard/teacher/students" className="p-3 rounded border hover:bg-gray-50">
              Students
            </Link>
            <Link to="/debug/teacher/attendance" className="p-3 rounded border hover:bg-gray-50">
              Attendance
            </Link>
            <Link to="/debug/teacher/grading" className="p-3 rounded border hover:bg-gray-50">
              Grading
            </Link>
            <Link to="/dashboard/teacher/assignments" className="p-3 rounded border hover:bg-gray-50">
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
            <Link to="/dashboard/teacher/schedule" className="p-3 rounded border hover:bg-gray-50">
              Schedule
            </Link>
            <Link to="/dashboard/teacher/feedback" className="p-3 rounded border hover:bg-gray-50">
              Give Feedback
            </Link>
            <Link to="/dashboard/teacher/reports" className="p-3 rounded border hover:bg-gray-50">
              Reports
            </Link>
            <Link to="/debug/teacher/contact" className="p-3 rounded border hover:bg-gray-50">
              Contact & Support
            </Link>
          </div>
        </div>

        {/* Parent Routes */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-purple-600">Parent Pages</h2>
          <div className="grid grid-cols-2 gap-4">
            <Link to="/dashboard/parent" className="p-3 rounded border hover:bg-gray-50">
              Parent Dashboard
            </Link>
            <Link to="/dashboard/parent/children" className="p-3 rounded border hover:bg-gray-50">
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
            <Link to="/dashboard/parent/payments" className="p-3 rounded border hover:bg-gray-50">
              Payments
            </Link>
            <Link to="/dashboard/parent/documents" className="p-3 rounded border hover:bg-gray-50">
              Documents
            </Link>
            <Link to="/debug/parent/profile" className="p-3 rounded border hover:bg-gray-50">
              Profile
            </Link>
            <Link to="/debug/parent/settings" className="p-3 rounded border hover:bg-gray-50">
              Settings
            </Link>
            <Link to="/dashboard/parent/attendance" className="p-3 rounded border hover:bg-gray-50">
              Attendance History
            </Link>
            <Link to="/dashboard/parent/grades" className="p-3 rounded border hover:bg-gray-50">
              Grades Report
            </Link>
            <Link to="/dashboard/parent/schedule" className="p-3 rounded border hover:bg-gray-50">
              Children Schedule
            </Link>
            <Link to="/dashboard/parent/feedback" className="p-3 rounded border hover:bg-gray-50">
              Teacher Feedback
            </Link>
            <Link to="/debug/parent/contact" className="p-3 rounded border hover:bg-gray-50">
              Contact & Support
            </Link>
          </div>
        </div>

        {/* Admin Routes */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-red-600">Administrator Pages</h2>
          <div className="grid grid-cols-2 gap-4">
            <Link to="/dashboard/admin" className="p-3 rounded border hover:bg-gray-50">
              Admin Dashboard
            </Link>
            <Link to="/dashboard/admin/users" className="p-3 rounded border hover:bg-gray-50">
              User Management
            </Link>
            <Link to="/dashboard/admin/classes" className="p-3 rounded border hover:bg-gray-50">
              Classes
            </Link>
            <Link to="/dashboard/admin/courses" className="p-3 rounded border hover:bg-gray-50">
              Courses
            </Link>
            <Link to="/dashboard/admin/analytics" className="p-3 rounded border hover:bg-gray-50">
              Analytics
            </Link>
            <Link to="/dashboard/admin/events" className="p-3 rounded border hover:bg-gray-50">
              Events
            </Link>
            <Link to="/dashboard/admin/notifications" className="p-3 rounded border hover:bg-gray-50">
              Notifications
            </Link>
            <Link to="/dashboard/admin/settings" className="p-3 rounded border hover:bg-gray-50">
              Settings
            </Link>
            <Link to="/dashboard/profile" className="p-3 rounded border hover:bg-gray-50">
              Profile
            </Link>
            <Link to="/dashboard/admin/departments" className="p-3 rounded border hover:bg-gray-50">
              Departments
            </Link>
            <Link to="/dashboard/admin/reports" className="p-3 rounded border hover:bg-gray-50">
              Reports
            </Link>
            <Link to="/dashboard/admin/finance" className="p-3 rounded border hover:bg-gray-50">
              Financial Management
            </Link>
            <Link to="/dashboard/admin/system-settings" className="p-3 rounded border hover:bg-gray-50">
              System Settings
            </Link>
            <Link to="/debug/administrator/contact" className="p-3 rounded border hover:bg-gray-50">
              Contact & Support
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
            <Link to="/auth/verify-email" className="p-3 rounded border hover:bg-gray-50">
              Verify Email
            </Link>
          </div>
        </div>

        {/* Shared Routes */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-600">Shared Pages</h2>
          <div className="grid grid-cols-2 gap-4">
            <Link to="/dashboard/shared/contact" className="p-3 rounded border hover:bg-gray-50 bg-yellow-50">
              Universal Contact Form
            </Link>
            <Link to="/dashboard/shared/forum" className="p-3 rounded border hover:bg-gray-50 bg-yellow-50">
              School Forum
            </Link>
            <Link to="/dashboard/shared/forum/create" className="p-3 rounded border hover:bg-gray-50 bg-yellow-50">
              Create Forum Post
            </Link>
            <Link to="/dashboard/shared/forum/post/1" className="p-3 rounded border hover:bg-gray-50 bg-yellow-50">
              View Forum Thread
            </Link>
          </div>
        </div>
        
        {/* Non-Debug Access */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-600">Regular Routes</h2>
          <p className="mb-4 text-sm text-gray-600">
            Access the regular application routes with your mock authentication
          </p>
          <div className="grid grid-cols-2 gap-4">
            <Link to="/dashboard" className="p-3 rounded border hover:bg-gray-50 bg-blue-50 font-semibold">
              Go to Main Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}