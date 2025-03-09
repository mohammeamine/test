import { useState } from "react"
import { User } from "../../../types/auth"
import { DashboardLayout } from "../../../components/dashboard/layout/dashboard-layout"
import { AttendanceForm } from "../../../components/dashboard/teacher/attendance-form"
import { Send, Sliders, Bell, XCircle, Download } from "lucide-react"
import { format } from "date-fns"
import { AttendanceService } from "../../../services/attendance-service"
import { toastService } from "../../../lib/toast"

interface TeacherAttendanceProps {
  user: User
}

interface AttendanceStudent {
  id: string
  name: string
  status: 'present' | 'absent' | 'late' | 'excused'
  lastAttendance: string
  totalPresent: number
  totalAbsent: number
  parentEmail: string
}

interface Class {
  id: string
  name: string
  students: { id: string; name: string }[]
}

interface AttendanceStats {
  totalStudents: number;
  presentCount: number;
  absentCount: number;
  lateCount: number;
  excusedCount: number;
  attendanceRate: number;
}

interface AttendanceSubmissionData {
  classId: string;
  date: string;
  attendance: Array<{
    studentId: string;
    status: AttendanceStudent['status'];
    notes?: string;
  }>;
}

const attendanceService = new AttendanceService();

export default function TeacherAttendance({ user }: TeacherAttendanceProps) {
  const [selectedClass, setSelectedClass] = useState('')
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'))
  const [showBulkActions, setShowBulkActions] = useState(false)
  const [selectedStudents, setSelectedStudents] = useState<string[]>([])
  const [bulkStatus, setBulkStatus] = useState<AttendanceStudent['status']>('present')
  const [showNotifyModal, setShowNotifyModal] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState('')
  const [stats, setStats] = useState<AttendanceStats>({
    totalStudents: 0,
    presentCount: 0,
    absentCount: 0,
    lateCount: 0,
    excusedCount: 0,
    attendanceRate: 0
  })

  // Mock data for development - Replace with API calls in production
  const classes: Class[] = [
    {
      id: 'math-101',
      name: 'Mathematics 101',
      students: [
        { id: '1', name: 'Alice Johnson' },
        { id: '2', name: 'Bob Smith' },
        { id: '3', name: 'Charlie Brown' }
      ]
    },
    {
      id: 'physics-201',
      name: 'Physics 201',
      students: [
        { id: '4', name: 'David Wilson' },
        { id: '5', name: 'Eve Anderson' }
      ]
    }
  ]

  const students: AttendanceStudent[] = [
    { 
      id: '1', 
      name: 'Alice Johnson', 
      status: 'present', 
      lastAttendance: '2025-03-06', 
      totalPresent: 18, 
      totalAbsent: 2,
      parentEmail: 'parent1@example.com'
    },
    { 
      id: '2', 
      name: 'Bob Smith', 
      status: 'absent', 
      lastAttendance: '2025-03-05', 
      totalPresent: 15, 
      totalAbsent: 5,
      parentEmail: 'parent2@example.com'
    }
  ]

  const updateStats = () => {
    const totalStudents = students.length;
    const presentCount = students.filter(s => s.status === 'present').length;
    const absentCount = students.filter(s => s.status === 'absent').length;
    const lateCount = students.filter(s => s.status === 'late').length;
    const excusedCount = students.filter(s => s.status === 'excused').length;
    const attendanceRate = ((presentCount + lateCount/2) / totalStudents * 100);

    setStats({
      totalStudents,
      presentCount,
      absentCount,
      lateCount,
      excusedCount,
      attendanceRate
    });
  };

  const toggleStudentSelection = (studentId: string) => {
    setSelectedStudents(prev =>
      prev.includes(studentId)
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    )
  }

  const handleBulkStatusChange = async () => {
    try {
      await attendanceService.submitBulkAttendance({
        classId: selectedClass,
        date: selectedDate,
        records: selectedStudents.map(id => ({
          studentId: id,
          status: bulkStatus,
          notes: `Bulk status update to ${bulkStatus}`
        }))
      });
      
      setSelectedStudents([]);
      setShowBulkActions(false);
      updateStats();
      toastService.success(`Successfully updated ${selectedStudents.length} students to ${bulkStatus}`);
    } catch (error) {
      console.error('Failed to update attendance:', error);
      toastService.error('Failed to update attendance status');
    }
  }

  const handleAttendanceSubmit = async (data: AttendanceSubmissionData) => {
    try {
      await attendanceService.submitBulkAttendance({
        classId: data.classId,
        date: data.date,
        records: data.attendance
      });
      updateStats();
      toastService.success('Attendance submitted successfully');
    } catch (error) {
      console.error('Failed to submit attendance:', error);
      toastService.error('Failed to submit attendance');
    }
  }

  const sendParentNotifications = async () => {
    try {
      const absentStudents = students.filter(s => 
        selectedStudents.includes(s.id) && s.status !== 'present'
      );
      
      const result = await attendanceService.notifyAbsentStudents(
        selectedClass,
        selectedDate,
        notificationMessage || 'Your child was marked absent today.'
      );

      setShowNotifyModal(false);
      setNotificationMessage('');
      toastService.success(`Successfully sent notifications to ${result.notified} parents`);
    } catch (error) {
      console.error('Failed to send notifications:', error);
      toastService.error('Failed to send parent notifications');
    }
  }

  const handleGenerateReport = async () => {
    try {
      const report = await attendanceService.generateAttendanceReport({
        classId: selectedClass,
        startDate: selectedDate,
        endDate: selectedDate,
        format: 'pdf'
      });
      
      const blob = new Blob([report], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `attendance-report-${selectedDate}.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);
      toastService.success('Report generated and downloaded successfully');
    } catch (error) {
      console.error('Failed to generate report:', error);
      toastService.error('Failed to generate attendance report');
    }
  }

  return (
    <DashboardLayout user={user}>
      <div className="p-6 space-y-6">
        {/* Header and Actions */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Attendance Management</h1>
            <p className="mt-1 text-sm text-gray-500">
              {format(new Date(selectedDate), 'MMMM d, yyyy')}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowBulkActions(!showBulkActions)}
              className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              <Sliders className="h-4 w-4" />
              Bulk Actions
            </button>
            <button
              onClick={() => setShowNotifyModal(true)}
              className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              <Bell className="h-4 w-4" />
              Notify Parents
            </button>
            <button
              onClick={handleGenerateReport}
              className="flex items-center gap-2 rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
            >
              <Download className="h-4 w-4" />
              Generate Report
            </button>
          </div>
        </div>

        {/* Attendance Statistics */}
        <div className="grid gap-6 md:grid-cols-5">
          <div className="rounded-lg border bg-white p-6">
            <h3 className="text-sm font-medium text-gray-500">Total Students</h3>
            <p className="mt-2 text-3xl font-semibold text-gray-900">{stats.totalStudents}</p>
          </div>
          <div className="rounded-lg border bg-white p-6">
            <h3 className="text-sm font-medium text-gray-500">Present</h3>
            <p className="mt-2 text-3xl font-semibold text-green-600">{stats.presentCount}</p>
          </div>
          <div className="rounded-lg border bg-white p-6">
            <h3 className="text-sm font-medium text-gray-500">Absent</h3>
            <p className="mt-2 text-3xl font-semibold text-red-600">{stats.absentCount}</p>
          </div>
          <div className="rounded-lg border bg-white p-6">
            <h3 className="text-sm font-medium text-gray-500">Late</h3>
            <p className="mt-2 text-3xl font-semibold text-yellow-600">{stats.lateCount}</p>
          </div>
          <div className="rounded-lg border bg-white p-6">
            <h3 className="text-sm font-medium text-gray-500">Attendance Rate</h3>
            <p className="mt-2 text-3xl font-semibold text-blue-600">{stats.attendanceRate.toFixed(1)}%</p>
          </div>
        </div>

        {/* Bulk Actions Panel */}
        {showBulkActions && (
          <div className="rounded-lg border bg-white p-4">
            <div className="flex items-center gap-4">
              <select
                value={bulkStatus}
                onChange={(e) => setBulkStatus(e.target.value as AttendanceStudent['status'])}
                className="rounded-lg border border-gray-300 py-2 px-3"
              >
                <option value="present">Present</option>
                <option value="absent">Absent</option>
                <option value="late">Late</option>
                <option value="excused">Excused</option>
              </select>
              <button
                onClick={handleBulkStatusChange}
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                Apply to {selectedStudents.length} Students
              </button>
              <button
                onClick={() => setSelectedStudents(students.map(s => s.id))}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                Select All
              </button>
            </div>
          </div>
        )}

        {/* Attendance Form */}
        <AttendanceForm 
          classes={classes}
          onSubmit={handleAttendanceSubmit}
        />

        {/* Notification Modal */}
        {showNotifyModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Send Notifications</h2>
                <button
                  onClick={() => setShowNotifyModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <XCircle className="h-5 w-5" />
                </button>
              </div>
              <div className="space-y-4">
                <p className="text-gray-600">
                  Send absence notifications to parents of {selectedStudents.length} selected students.
                </p>
                <textarea
                  value={notificationMessage}
                  onChange={(e) => setNotificationMessage(e.target.value)}
                  placeholder="Custom message (optional)"
                  className="w-full rounded-lg border border-gray-300 p-2 min-h-[100px]"
                />
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setShowNotifyModal(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={sendParentNotifications}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
                  >
                    <Send className="h-4 w-4" />
                    Send Notifications
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}