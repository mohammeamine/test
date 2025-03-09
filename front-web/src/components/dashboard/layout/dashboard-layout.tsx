import { ReactNode, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserResponse, UserRole } from '../../../types/auth'
import { AppSidebar } from './app-sidebar'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '../../../components/ui/sidebar'
import { Separator } from '../../../components/ui/separator'
import { LogOut, Settings, User as UserIcon, Bell } from 'lucide-react'
import toast from 'react-hot-toast'
import { Badge } from '../../../components/ui/badge'

interface DashboardLayoutProps {
  children: ReactNode
  user: UserResponse
}

export const DashboardLayout = ({ children, user }: DashboardLayoutProps) => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)

  const handleLogout = () => {
    // In a real application, this would call an API to log the user out
    toast.success('Logged out successfully')
    // Redirect to login page after a short delay
    setTimeout(() => {
      window.location.href = '/auth/sign-in'
    }, 1000)
  }

  const getRoleTitle = (role: UserRole) => {
    switch (role) {
      case 'student':
        return 'Student Portal'
      case 'teacher':
        return 'Teacher Portal'
      case 'administrator':
        return 'Admin Dashboard'
      case 'parent':
        return 'Parent Portal'
      default:
        return 'Dashboard'
    }
  }

  const getUserInfo = () => {
    switch (user.role) {
      case 'student':
        return `Student ID: ${user.studentId || 'ST-' + user.id}`
      case 'teacher':
        return `Teacher ID: ${user.teacherId || 'TCH-' + user.id}`
      case 'administrator':
        return 'Administrator'
      case 'parent':
        return `Parent ID: ${user.parentId || 'PR-' + user.id}`
      default:
        return user.email
    }
  }

  return (
    <SidebarProvider>
      <AppSidebar user={user} />
      <SidebarInset>
        <header className="sticky top-0 flex h-14 items-center gap-4 border-b bg-background px-4 z-10">
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-6" />
          <div className="font-semibold">{getRoleTitle(user.role)}</div>
          <div className="flex-1" />
          <div className="flex items-center gap-4 relative">
            {/* Notifications */}
            <button 
              className="relative p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
            </button>

            {/* User info and profile menu */}
            <div className="flex items-center relative">
              <div className="text-sm text-gray-500 mr-2 hidden sm:block">
                <div className="font-medium text-gray-900">{user.firstName} {user.lastName}</div>
                <div>{getUserInfo()}</div>
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
                    <p className="text-sm font-medium">{user ? `${user.firstName} ${user.lastName}` : 'User'}</p>
                    <p className="text-xs text-gray-500">{getUserInfo()}</p>
                  </div>
                  <Link 
                    to={`/dashboard/${user?.role || 'student'}/profile`} 
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsProfileMenuOpen(false)}
                  >
                    <UserIcon className="h-4 w-4 mr-2" />
                    My Profile
                  </Link>
                  <Link 
                    to={`/dashboard/${user?.role || 'student'}/settings`} 
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

              {/* Notifications dropdown */}
              {isNotificationsOpen && (
                <div className="absolute right-0 top-10 w-80 bg-white shadow-lg rounded-md border border-gray-200 py-1 z-20">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <div className="flex justify-between items-center">
                      <h3 className="text-sm font-medium">Notifications</h3>
                      <Badge variant="outline" className="text-xs">3 new</Badge>
                    </div>
                  </div>
                  <div className="max-h-[400px] overflow-y-auto">
                    {/* Example notifications - replace with real data */}
                    <div className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100">
                      <p className="text-sm font-medium">New assignment posted</p>
                      <p className="text-xs text-gray-500">2 hours ago</p>
                    </div>
                    <div className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100">
                      <p className="text-sm font-medium">Grade updated</p>
                      <p className="text-xs text-gray-500">Yesterday</p>
                    </div>
                  </div>
                  <div className="px-4 py-2 border-t border-gray-100">
                    <Link 
                      to={`/dashboard/${user.role}/notifications`}
                      className="text-sm text-primary hover:text-primary/90"
                      onClick={() => setIsNotificationsOpen(false)}
                    >
                      View all notifications
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>
        <main className="flex-1 p-4 bg-gray-50">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
