import { useEffect, useState } from "react"
import { StudentLayout } from "../../../components/dashboard/layout/student-layout"
import { StudentDashboard as StudentDashboardComponent } from "../../../components/dashboard/student/student-dashboard"
import { User } from "../../../types/auth"
import { studentService, StudentDashboardData } from "../../../services/student-service"
import { toast } from "react-hot-toast"

interface StudentDashboardProps {
  user: User
}

export default function StudentDashboard({ user }: StudentDashboardProps) {
  const [loading, setLoading] = useState(true)
  const [dashboardData, setDashboardData] = useState<StudentDashboardData | null>(null)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true)
        const data = await studentService.getDashboardData()
        setDashboardData(data)
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error)
        toast.error("Failed to load dashboard data. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  const handleDownloadTranscript = () => {
    console.log('Downloading transcript')
    toast.success('Transcript downloaded successfully')
  }

  const handleSubmitAssignment = async (assignmentId: string, content: string) => {
    try {
      await studentService.submitAssignment(assignmentId, { content })
      toast.success(`Assignment submitted successfully`)
    } catch (error) {
      console.error(`Failed to submit assignment:`, error)
      toast.error(`Failed to submit assignment. Please try again.`)
    }
  }

  if (loading) {
    return (
      <StudentLayout user={user}>
        <div className="p-6 flex justify-center items-center min-h-[80vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </StudentLayout>
    )
  }

  return (
    <StudentLayout user={user}>
      <div className="p-6">
        {dashboardData ? (
          <StudentDashboardComponent
            studentName={user ? `${user.firstName} ${user.lastName}` : 'Loading...'}
            grades={dashboardData.recentGrades.map(grade => ({
              subject: grade.courseName,
              grade: grade.score,
              date: new Date(grade.createdAt).toISOString().split('T')[0],
              teacher: 'Teacher',
              feedback: grade.feedback
            }))}
            assignments={dashboardData.upcomingAssignments.map(assignment => ({
              id: assignment.id,
              title: assignment.title,
              subject: assignment.courseName,
              dueDate: new Date(assignment.dueDate).toISOString().split('T')[0],
              description: assignment.description,
              status: 'pending' as const
            }))}
            schedule={dashboardData.schedule}
            onDownloadTranscript={handleDownloadTranscript}
            onSubmitAssignment={handleSubmitAssignment}
          />
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No dashboard data available.</p>
          </div>
        )}
      </div>
    </StudentLayout>
  )
}