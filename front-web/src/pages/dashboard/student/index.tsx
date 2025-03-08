import { DashboardLayout } from "../../../components/dashboard/layout/dashboard-layout"
import { StudentDashboard as StudentDashboardComponent } from "../../../components/dashboard/student/student-dashboard"
import { User } from "../../../types/auth"

interface StudentDashboardProps {
  user: User
}

// Mock data for demonstration
const mockGrades = [
  { subject: 'Mathematics', grade: 85, date: '2025-02-15', teacher: 'Mr. Smith', feedback: 'Good work on calculus problems' },
  { subject: 'Science', grade: 92, date: '2025-02-10', teacher: 'Mrs. Davis', feedback: 'Excellent lab report' },
  { subject: 'History', grade: 78, date: '2025-02-05', teacher: 'Mr. Wilson', feedback: 'Need more detail in essays' },
  { subject: 'English', grade: 88, date: '2025-01-28', teacher: 'Ms. Brown', feedback: 'Strong analysis of literature' },
  { subject: 'Computer Science', grade: 95, date: '2025-01-20', teacher: 'Mr. Taylor', feedback: 'Outstanding programming skills' },
];

const mockAssignments = [
  { id: 'a1', title: 'Math Problem Set', subject: 'Mathematics', dueDate: '2025-03-01', description: 'Complete problems 1-20', status: 'pending' as const },
  { id: 'a2', title: 'Science Lab Report', subject: 'Science', dueDate: '2025-02-25', description: 'Write up experiment results', status: 'submitted' as const },
  { id: 'a3', title: 'History Essay', subject: 'History', dueDate: '2025-02-20', description: 'Research paper on World War II', status: 'graded' as const, grade: 85 },
  { id: 'a4', title: 'English Book Review', subject: 'English', dueDate: '2025-02-15', description: 'Review of To Kill a Mockingbird', status: 'graded' as const, grade: 90 },
  { id: 'a5', title: 'Programming Project', subject: 'Computer Science', dueDate: '2025-03-10', description: 'Build a simple web application', status: 'pending' as const },
];

const mockSchedule = [
  {
    day: 'Monday',
    periods: [
      { time: '08:00 - 09:30', subject: 'Mathematics', teacher: 'Mr. Smith', room: 'Room 101' },
      { time: '09:45 - 11:15', subject: 'Science', teacher: 'Mrs. Davis', room: 'Lab 3' },
      { time: '11:30 - 13:00', subject: 'English', teacher: 'Ms. Brown', room: 'Room 205' },
      { time: '14:00 - 15:30', subject: 'Computer Science', teacher: 'Mr. Taylor', room: 'Computer Lab' },
    ],
  },
  {
    day: 'Tuesday',
    periods: [
      { time: '08:00 - 09:30', subject: 'History', teacher: 'Mr. Wilson', room: 'Room 302' },
      { time: '09:45 - 11:15', subject: 'Physical Education', teacher: 'Coach Johnson', room: 'Gymnasium' },
      { time: '11:30 - 13:00', subject: 'Art', teacher: 'Ms. Garcia', room: 'Art Studio' },
      { time: '14:00 - 15:30', subject: 'Mathematics', teacher: 'Mr. Smith', room: 'Room 101' },
    ],
  },
  {
    day: 'Wednesday',
    periods: [
      { time: '08:00 - 09:30', subject: 'Science', teacher: 'Mrs. Davis', room: 'Lab 3' },
      { time: '09:45 - 11:15', subject: 'English', teacher: 'Ms. Brown', room: 'Room 205' },
      { time: '11:30 - 13:00', subject: 'Computer Science', teacher: 'Mr. Taylor', room: 'Computer Lab' },
      { time: '14:00 - 15:30', subject: 'History', teacher: 'Mr. Wilson', room: 'Room 302' },
    ],
  },
];

export default function StudentDashboard({ user }: StudentDashboardProps) {
  const handleDownloadTranscript = () => {
    console.log('Downloading transcript');
    alert('Transcript downloaded successfully');
  };

  const handleSubmitAssignment = (assignmentId: string, file: File) => {
    console.log(`Submitting assignment ${assignmentId} with file ${file.name}`);
    alert(`Assignment ${assignmentId} submitted successfully`);
  };

  const handlePaymentComplete = (paymentId: string) => {
    console.log(`Payment completed with ID: ${paymentId}`);
  };

  return (
    <DashboardLayout user={user}>
      <div className="p-6">
        <StudentDashboardComponent
          studentName={`${user.firstName} ${user.lastName}`}
          grades={mockGrades}
          assignments={mockAssignments}
          schedule={mockSchedule}
          onDownloadTranscript={handleDownloadTranscript}
          onSubmitAssignment={handleSubmitAssignment}
          onPaymentComplete={handlePaymentComplete}
        />
      </div>
    </DashboardLayout>
  )
}