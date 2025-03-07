import { ReactNode, useState } from 'react'
import { Link } from 'react-router-dom'
import { User } from '../../../types/auth'
import { StudentSidebar } from './student-sidebar'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '../../../components/ui/sidebar'
import { Separator } from '../../../components/ui/separator'
import { LogOut, Settings, User as UserIcon } from 'lucide-react'
import toast from 'react-hot-toast'

interface StudentLayoutProps {
  children: ReactNode
  user: User
}

export const StudentLayout = ({ children, user }: StudentLayoutProps) => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)

  const handleLogout = () => {
    // In a real application, this would call an API to log the user out
    toast.success('Logged out successfully')
    // Redirect to login page after a short delay
    setTimeout(() => {
      window.location.href = '/auth/sign-in'
    }, 1000)
  }

  return (
    <SidebarProvider>
      <StudentSidebar />
      <SidebarInset>
        <header className="sticky top-0 flex h-14 items-center gap-4 border-b bg-background px-4 z-10">
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-6" />
          <div className="font-semibold">Student Portal</div>
          <div className="flex-1" />
          <div className="flex items-center relative">
            <div className="text-sm text-gray-500 mr-2">
              <div className="font-medium text-gray-900">{user.firstName} {user.lastName}</div>
              <div>Student ID: {user.studentId || 'ST-' + user.id}</div>
            </div>
            <button 
              className="flex items-center space-x-2 rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            >
              {user.profilePicture ? (
                <img
                  className="h-8 w-8 rounded-full"
                  src={user.profilePicture}
                  alt=""
                />
              ) : (
                <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center">
                  {user.firstName?.[0]}
                  {user.lastName?.[0]}
                </div>
              )}
            </button>

            {/* Profile dropdown menu */}
            {isProfileMenuOpen && (
              <div className="absolute right-0 top-10 w-56 bg-white shadow-lg rounded-md border border-gray-200 py-1 z-20">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-medium">{user.firstName} {user.lastName}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
                <Link 
                  to="/dashboard/student/profile" 
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsProfileMenuOpen(false)}
                >
                  <UserIcon className="h-4 w-4 mr-2" />
                  My Profile
                </Link>
                <Link 
                  to="/dashboard/student/settings" 
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsProfileMenuOpen(false)}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Link>
                <button 
                  className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </header>
        <main className="flex-1 bg-gray-50">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}