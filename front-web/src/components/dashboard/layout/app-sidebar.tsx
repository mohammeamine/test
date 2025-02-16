"use client"

import { Home, Users, Settings, BookOpen, Bell } from "lucide-react"
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
    title: "Notifications",
    icon: Bell,
    href: "/dashboard/admin/notifications",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/dashboard/admin/settings",
  },
]

export function AppSidebar() {
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