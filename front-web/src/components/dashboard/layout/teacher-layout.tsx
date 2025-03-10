import { ReactNode } from "react"
import { User } from "../../../types/auth"
import { DashboardLayout } from "./dashboard-layout"

interface TeacherLayoutProps {
  children: ReactNode
  user: User
}

export function TeacherLayout({ children, user }: TeacherLayoutProps) {
  return (
    <DashboardLayout user={user}>
      {children}
    </DashboardLayout>
  )
} 