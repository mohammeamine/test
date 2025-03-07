import { 
  Home, 
  Users, 
  MessageSquare,
  CreditCard,
  FileText,
  BarChart,
  LineChart
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
    href: "/dashboard/parent",
  },
  {
    title: "Children",
    icon: Users,
    href: "/dashboard/parent/children",
  },
  {
    title: "Academic Progress",
    icon: BarChart,
    href: "/dashboard/parent/progress",
  },
  {
    title: "Student Monitoring",
    icon: LineChart,
    href: "/dashboard/parent/monitoring",
  },
  {
    title: "Messages",
    icon: MessageSquare,
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
]

export function ParentSidebar() {
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