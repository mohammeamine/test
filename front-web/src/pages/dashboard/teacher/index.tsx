import { 
  GraduationCap, 
  Users, 
  ClipboardCheck, 
  MessageSquare,
  ArrowRight,
  Calendar
} from "lucide-react"
import { Link } from "react-router-dom"
import { User } from "../../../types/auth"
import { DashboardLayout } from "../../../components/dashboard/layout/dashboard-layout"

interface TeacherDashboardProps {
  user: User
}

const features = [
  {
    name: "My Classes",
    description: "Manage your classes and course schedules",
    icon: GraduationCap,
    href: "/dashboard/teacher/classes",
    color: "bg-blue-500",
  },
  {
    name: "Students",
    description: "View and manage student information",
    icon: Users,
    href: "/dashboard/teacher/students",
    color: "bg-green-500",
  },
  {
    name: "Assignments",
    description: "Create and grade assignments",
    icon: ClipboardCheck,
    href: "/dashboard/teacher/assignments",
    color: "bg-purple-500",
  },
  {
    name: "Messages",
    description: "Communicate with students and staff",
    icon: MessageSquare,
    href: "/dashboard/teacher/messages",
    color: "bg-yellow-500",
  },
]

const TeacherDashboard = ({ user }: TeacherDashboardProps) => {
  return (
    <DashboardLayout user={user}>
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.firstName || 'Teacher'}!</h1>
          <p className="mt-1 text-sm text-gray-500">Here's what's happening with your classes today.</p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Link
              key={feature.name}
              to={feature.href}
              className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div>
                <span className={`inline-flex p-3 rounded-lg ${feature.color} text-white`}>
                  <feature.icon className="h-6 w-6" aria-hidden="true" />
                </span>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-medium text-gray-900">
                  {feature.name}
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  {feature.description}
                </p>
              </div>
              <span
                className="absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
                aria-hidden="true"
              >
                <ArrowRight className="w-6 h-6" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}

export default TeacherDashboard