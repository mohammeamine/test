import { ReactNode } from 'react'
import { User } from '../../../types/auth'
import { AppSidebar } from './app-sidebar'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '../../../components/ui/sidebar'
import { Separator } from '../../../components/ui/separator'

interface DashboardLayoutProps {
  children: ReactNode
  user: User
}

export const DashboardLayout = ({ children, user }: DashboardLayoutProps) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 flex h-14 items-center gap-4 border-b bg-background px-4">
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-6" />
          <div className="font-semibold">Dashboard</div>
          <div className="flex-1" />
          <div className="flex items-center">
            <button className="flex items-center space-x-2 rounded-full focus:outline-none focus:ring-2 focus:ring-primary">
              {user.profilePicture ? (
                <img
                  className="h-8 w-8 rounded-full"
                  src={user.profilePicture}
                  alt=""
                />
              ) : (
                <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center">
                  {user.firstName[0]}
                  {user.lastName[0]}
                </div>
              )}
            </button>
          </div>
        </header>
        <main className="flex-1 p-4">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
