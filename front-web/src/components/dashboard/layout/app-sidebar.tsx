"use client"

import { Home, Users, Settings, BookOpen, Bell, Calendar, BookText, FileText, BarChart, LucideIcon, BookCopy, GraduationCap, PenSquare, Mail, FileCheck, CreditCard, HelpCircle, MessageSquare } from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import { User as UserType } from "../../../types/auth"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../../../components/ui/sidebar"

type NavigationItem = {
  title: string
  icon: LucideIcon
  href: string
}

const adminNavigation: NavigationItem[] = [
  {
    title: "Dashboard",
    icon: Home,
    href: "/dashboard/admin",
  },
  {
    title: "Users",
    icon: Users,
    href: "/dashboard/admin/users",
  },
  {
    title: "Classes",
    icon: BookOpen,
    href: "/dashboard/admin/classes",
  },
  {
    title: "Courses",
    icon: BookText,
    href: "/dashboard/admin/courses",
  },
  {
    title: "Course Content",
    icon: FileText,
    href: "/dashboard/admin/course-content",
  },
  {
    title: "Departments",
    icon: BookOpen,
    href: "/dashboard/admin/departments",
  },
  {
    title: "Events",
    icon: Calendar,
    href: "/dashboard/admin/events",
  },
  {
    title: "Analytics",
    icon: BarChart,
    href: "/dashboard/admin/analytics",
  },
  {
    title: "Reports",
    icon: FileText,
    href: "/dashboard/admin/reports",
  },
  {
    title: "Finance",
    icon: CreditCard,
    href: "/dashboard/admin/finance",
  },
  {
    title: "Notifications",
    icon: Bell,
    href: "/dashboard/admin/notifications",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/dashboard/admin/settings",
  },
  {
    title: "System Settings",
    icon: Settings,
    href: "/dashboard/admin/system-settings",
  },
  {
    title: "Contact & Support",
    icon: HelpCircle,
    href: "/dashboard/admin/contact",
  },
  {
    title: "Forum",
    icon: MessageSquare,
    href: "/dashboard/shared/forum",
  },
]

const teacherNavigation: NavigationItem[] = [
  {
    title: "Dashboard",
    icon: Home,
    href: "/dashboard/teacher",
  },
  {
    title: "Classes",
    icon: BookOpen,
    href: "/dashboard/teacher/classes",
  },
  {
    title: "Students",
    icon: Users,
    href: "/dashboard/teacher/students",
  },
  {
    title: "Materials",
    icon: BookCopy,
    href: "/dashboard/teacher/materials",
  },
  {
    title: "Documents",
    icon: FileText,
    href: "/dashboard/teacher/documents",
  },
  {
    title: "Attendance",
    icon: FileCheck,
    href: "/dashboard/teacher/attendance",
  },
  {
    title: "Assignments",
    icon: PenSquare,
    href: "/dashboard/teacher/assignments",
  },
  {
    title: "Messages",
    icon: Mail,
    href: "/dashboard/teacher/messages",
  },
  {
    title: "Profile",
    icon: Users,
    href: "/dashboard/teacher/profile",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/dashboard/teacher/settings",
  },
  {
    title: "Contact & Support",
    icon: HelpCircle,
    href: "/dashboard/shared/contact",
  },
  {
    title: "Forum",
    icon: MessageSquare,
    href: "/dashboard/shared/forum",
  },
]

const studentNavigation: NavigationItem[] = [
  {
    title: "Dashboard",
    icon: Home,
    href: "/dashboard/student",
  },
  {
    title: "Courses",
    icon: BookOpen,
    href: "/dashboard/student/courses",
  },
  {
    title: "Materials",
    icon: BookCopy,
    href: "/dashboard/student/materials",
  },
  {
    title: "Library",
    icon: BookText,
    href: "/dashboard/student/library",
  },
  {
    title: "Certificates",
    icon: GraduationCap,
    href: "/dashboard/student/certificates",
  },
  {
    title: "Attendance",
    icon: FileCheck,
    href: "/dashboard/student/attendance",
  },
  {
    title: "Payments",
    icon: CreditCard,
    href: "/dashboard/student/payments",
  },
  {
    title: "Documents",
    icon: FileText,
    href: "/dashboard/student/documents",
  },
  {
    title: "Assignments",
    icon: PenSquare,
    href: "/dashboard/student/assignments",
  },
  {
    title: "Support",
    icon: HelpCircle,
    href: "/dashboard/student/support",
  },
  {
    title: "Profile",
    icon: Users,
    href: "/dashboard/student/profile",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/dashboard/student/settings",
  },
  {
    title: "Contact & Support",
    icon: HelpCircle,
    href: "/dashboard/shared/contact",
  },
  {
    title: "Forum",
    icon: MessageSquare,
    href: "/dashboard/shared/forum",
  },
]

const parentNavigation: NavigationItem[] = [
  {
    title: "Dashboard",
    icon: Home,
    href: "/dashboard/parent",
  },
  {
    title: "Children",
    icon: Users,
    href: "/dashboard/parent/children",
  },
  {
    title: "Progress",
    icon: BarChart,
    href: "/dashboard/parent/progress",
  },
  {
    title: "Messages",
    icon: Mail,
    href: "/dashboard/parent/messages",
  },
  {
    title: "Payments",
    icon: CreditCard,
    href: "/dashboard/parent/payments",
  },
  {
    title: "Documents",
    icon: FileText,
    href: "/dashboard/parent/documents",
  },
  {
    title: "Profile",
    icon: Users,
    href: "/dashboard/parent/profile",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/dashboard/parent/settings",
  },
  {
    title: "Contact & Support",
    icon: HelpCircle,
    href: "/dashboard/shared/contact",
  },
  {
    title: "Forum",
    icon: MessageSquare,
    href: "/dashboard/shared/forum",
  },
]

interface AppSidebarProps {
  user: UserType
}

export function AppSidebar({ user }: AppSidebarProps) {
  const location = useLocation()
  
  const getNavigationByRole = () => {
    switch (user.role) {
      case 'administrator':
        return adminNavigation
      case 'teacher':
        return teacherNavigation
      case 'student':
        return studentNavigation
      case 'parent':
        return parentNavigation
      default:
        return adminNavigation
    }
  }

  const navigation = getNavigationByRole()

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{user.role.charAt(0).toUpperCase() + user.role.slice(1)} Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={location.pathname === item.href}>
                    <Link to={item.href} className="flex items-center">
                      <item.icon className="h-5 w-5" />
                      <span className="ml-3">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        {/* Quick access to debug navigation */}
        <div className="mt-6">
          <SidebarGroup>
            <SidebarGroupLabel>Development</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={location.pathname === '/debug'}>
                    <Link to="/debug" className="flex items-center text-amber-600">
                      <HelpCircle className="h-5 w-5" />
                      <span className="ml-3">Debug Navigation</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>
      </SidebarContent>
    </Sidebar>
  )
}