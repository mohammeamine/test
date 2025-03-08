import { 
  Home, 
  GraduationCap, 
  BookOpen, 
  FileText, 
  Users,
  Calendar,
  ClipboardCheck,
  MessageSquare,
  Award,
  BarChart3,
  BookMarked,
  Clock,
  MessageCircle,
  FileBarChart,
  HelpCircle
} from "lucide-react"
import { Link, useLocation } from "react-router-dom"

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

const navigation = [
  {
    title: "Overview",
    icon: Home,
    href: "/dashboard/teacher",
  },
  {
    title: "My Classes",
    icon: GraduationCap,
    href: "/dashboard/teacher/classes",
  },
  {
    title: "Course Materials",
    icon: BookOpen,
    href: "/dashboard/teacher/materials",
  },
  {
    title: "Students",
    icon: Users,
    href: "/dashboard/teacher/students",
  },
  {
    title: "Attendance",
    icon: ClipboardCheck,
    href: "/dashboard/teacher/attendance",
  },
  {
    title: "Schedule",
    icon: Clock,
    href: "/dashboard/teacher/schedule",
  },
  {
    title: "Calendar",
    icon: Calendar,
    href: "/dashboard/teacher/calendar",
  },
  {
    title: "Curriculum",
    icon: BookMarked,
    href: "/dashboard/teacher/curriculum",
  },
  {
    title: "Grading",
    icon: Award,
    href: "/dashboard/teacher/grading",
  },
  {
    title: "Grades",
    icon: Award,
    href: "/dashboard/teacher/grades",
  },
  {
    title: "Assignments",
    icon: ClipboardCheck,
    href: "/dashboard/teacher/assignments",
  },
  {
    title: "Analytics",
    icon: BarChart3,
    href: "/dashboard/teacher/analytics",
  },
  {
    title: "Reports",
    icon: FileBarChart,
    href: "/dashboard/teacher/reports",
  },
  {
    title: "Feedback",
    icon: MessageCircle,
    href: "/dashboard/teacher/feedback",
  },
  {
    title: "Forum",
    icon: MessageSquare,
    href: "/dashboard/shared/forum",
  },
  {
    title: "Contact & Support",
    icon: HelpCircle,
    href: "/dashboard/shared/contact",
  },
  {
    title: "Messages",
    icon: MessageSquare,
    href: "/dashboard/teacher/messages",
  },
  {
    title: "Documents",
    icon: FileText,
    href: "/dashboard/teacher/documents",
  },
]

export function TeacherSidebar() {
  const location = useLocation()

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
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
      </SidebarContent>
    </Sidebar>
  )
} 