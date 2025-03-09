import { DashboardLayout } from '../../../components/dashboard/layout/dashboard-layout';
import { StudentMonitoring } from '../../../components/dashboard/parent/student-monitoring';
import { UserResponse } from '../../../types/auth';
import { useState } from "react";
import { Calendar as CalendarIcon, Search, Download, Clock, CheckCircle, XCircle, BookOpen, GraduationCap, FileText } from "lucide-react";
import { format } from "date-fns";

interface ParentMonitoringPageProps {
  user: UserResponse;
}

interface Student {
  id: string;
  name: string;
  grade: string;
  attendanceRate: number;
  currentGPA: number;
  totalAssignments: number;
  completedAssignments: number;
}

interface AttendanceRecord {
  id: string;
  date: string;
  courseId: string;
  courseName: string;
  status: "present" | "absent" | "late" | "excused";
  timeIn?: string;
  timeOut?: string;
  notes?: string;
}

// Mock data for demonstration
const mockStudentData = [
  {
    id: 'student1',
    name: 'Emma Johnson',
    class: 'Grade 10-A',
    grades: [
      { subject: 'Mathematics', grade: 85, date: '2025-02-15', teacher: 'Mr. Smith' },
      { subject: 'Science', grade: 92, date: '2025-02-10', teacher: 'Mrs. Davis' },
      { subject: 'History', grade: 78, date: '2025-02-05', teacher: 'Mr. Wilson' },
      { subject: 'English', grade: 88, date: '2025-01-28', teacher: 'Ms. Brown' },
      { subject: 'Computer Science', grade: 95, date: '2025-01-20', teacher: 'Mr. Taylor' },
    ],
    attendance: [
      { date: '2025-02-20', status: 'present' as const, subject: 'All Day' },
      { date: '2025-02-19', status: 'present' as const, subject: 'All Day' },
      { date: '2025-02-18', status: 'late' as const, subject: 'Morning Session' },
      { date: '2025-02-17', status: 'present' as const, subject: 'All Day' },
      { date: '2025-02-16', status: 'absent' as const, subject: 'All Day' },
    ],
    assignments: [
      { title: 'Math Problem Set', subject: 'Mathematics', dueDate: '2025-03-01', status: 'pending' as const },
      { title: 'Science Lab Report', subject: 'Science', dueDate: '2025-02-25', status: 'completed' as const },
      { title: 'History Essay', subject: 'History', dueDate: '2025-02-20', status: 'completed' as const },
      { title: 'English Book Review', subject: 'English', dueDate: '2025-02-15', status: 'completed' as const },
      { title: 'Programming Project', subject: 'Computer Science', dueDate: '2025-03-10', status: 'pending' as const },
    ],
  },
  {
    id: 'student2',
    name: 'Alex Johnson',
    class: 'Grade 8-B',
    grades: [
      { subject: 'Mathematics', grade: 75, date: '2025-02-15', teacher: 'Mrs. Clark' },
      { subject: 'Science', grade: 82, date: '2025-02-10', teacher: 'Mr. Lewis' },
      { subject: 'History', grade: 88, date: '2025-02-05', teacher: 'Ms. Anderson' },
      { subject: 'English', grade: 79, date: '2025-01-28', teacher: 'Mr. Roberts' },
      { subject: 'Art', grade: 95, date: '2025-01-20', teacher: 'Ms. White' },
    ],
    attendance: [
      { date: '2025-02-20', status: 'present' as const, subject: 'All Day' },
      { date: '2025-02-19', status: 'present' as const, subject: 'All Day' },
      { date: '2025-02-18', status: 'present' as const, subject: 'All Day' },
      { date: '2025-02-17', status: 'absent' as const, subject: 'All Day' },
      { date: '2025-02-16', status: 'absent' as const, subject: 'All Day' },
    ],
    assignments: [
      { title: 'Math Worksheet', subject: 'Mathematics', dueDate: '2025-03-01', status: 'pending' as const },
      { title: 'Science Experiment', subject: 'Science', dueDate: '2025-02-25', status: 'pending' as const },
      { title: 'History Timeline', subject: 'History', dueDate: '2025-02-20', status: 'completed' as const },
      { title: 'Grammar Exercises', subject: 'English', dueDate: '2025-02-15', status: 'completed' as const },
      { title: 'Art Portfolio', subject: 'Art', dueDate: '2025-03-10', status: 'overdue' as const },
    ],
  },
];

const students: Student[] = [
  {
    id: "s1",
    name: "John Smith",
    grade: "10th Grade",
    attendanceRate: 95,
    currentGPA: 3.8,
    totalAssignments: 45,
    completedAssignments: 42
  },
  {
    id: "s2",
    name: "Emma Johnson",
    grade: "8th Grade",
    attendanceRate: 92,
    currentGPA: 3.6,
    totalAssignments: 38,
    completedAssignments: 35
  }
];

const attendanceRecords: AttendanceRecord[] = [
  {
    id: "a1",
    date: "2025-03-07",
    courseId: "c1",
    courseName: "Mathematics 101",
    status: "present",
    timeIn: "08:00",
    timeOut: "09:30"
  },
  {
    id: "a2",
    date: "2025-03-07",
    courseId: "c2",
    courseName: "Physics 201",
    status: "late",
    timeIn: "10:15",
    timeOut: "11:45",
    notes: "Late due to doctor's appointment"
  }
];

const getStatusColor = (status: AttendanceRecord["status"]) => {
  switch (status) {
    case "present":
      return "text-green-600 bg-green-100";
    case "absent":
      return "text-red-600 bg-red-100";
    case "late":
      return "text-yellow-600 bg-yellow-100";
    case "excused":
      return "text-blue-600 bg-blue-100";
    default:
      return "text-gray-600 bg-gray-100";
  }
};

const getStatusIcon = (status: AttendanceRecord["status"]) => {
  switch (status) {
    case "present":
      return <CheckCircle className="h-5 w-5" />;
    case "absent":
      return <XCircle className="h-5 w-5" />;
    case "late":
      return <Clock className="h-5 w-5" />;
    case "excused":
      return <CalendarIcon className="h-5 w-5" />;
    default:
      return <CalendarIcon className="h-5 w-5" />;
  }
};

export function ParentMonitoringPage({ user }: ParentMonitoringPageProps) {
  const [selectedStudent, setSelectedStudent] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const handleDownloadReport = (studentId: string, reportType: string) => {
    // In a real application, this would generate a PDF or other report format
    console.log(`Downloading ${reportType} report for student ${studentId}`);
    alert(`Report for ${mockStudentData.find(s => s.id === studentId)?.name} has been downloaded.`);
  };

  return (
    <DashboardLayout user={user}>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Student Monitoring</h1>
            <p className="mt-1 text-sm text-gray-500">
              Monitor your children's academic progress and attendance
            </p>
          </div>
          <button
            onClick={() => handleDownloadReport('student1', 'progress')}
            className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            <Download className="h-4 w-4" />
            Download Report
          </button>
        </div>

        {/* Student Selector */}
        <div className="flex gap-4">
          <select
            className="rounded-lg border border-gray-300 py-2 px-4 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(e.target.value)}
          >
            <option value="all">All Students</option>
            {students.map(student => (
              <option key={student.id} value={student.id}>{student.name}</option>
            ))}
          </select>
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search records..."
                className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Student Cards */}
        <div className="grid gap-6 md:grid-cols-2">
          {students.map(student => (
            <div key={student.id} className="rounded-lg border bg-white p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">{student.name}</h2>
                  <p className="text-sm text-gray-500">{student.grade}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`rounded-full px-3 py-1 text-sm font-medium ${
                    student.attendanceRate >= 90 ? "bg-green-100 text-green-600" :
                    student.attendanceRate >= 80 ? "bg-yellow-100 text-yellow-600" :
                    "bg-red-100 text-red-600"
                  }`}>
                    {student.attendanceRate}% Attendance
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <div className="rounded-lg bg-blue-100 p-2">
                    <GraduationCap className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">GPA</p>
                    <p className="text-lg font-semibold text-gray-900">{student.currentGPA}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="rounded-lg bg-purple-100 p-2">
                    <BookOpen className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Courses</p>
                    <p className="text-lg font-semibold text-gray-900">6</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="rounded-lg bg-orange-100 p-2">
                    <FileText className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Assignments</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {student.completedAssignments}/{student.totalAssignments}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Today's Attendance */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Today's Attendance</h2>
          <div className="space-y-4">
            {attendanceRecords.map((record) => (
              <div key={record.id} className="rounded-lg border bg-white p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`rounded-lg p-3 ${getStatusColor(record.status)}`}>
                      {getStatusIcon(record.status)}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{record.courseName}</h3>
                      <div className="mt-1 flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <CalendarIcon className="h-4 w-4" />
                          {format(new Date(record.date), "MMM d, yyyy")}
                        </span>
                        {record.timeIn && record.timeOut && (
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {record.timeIn} - {record.timeOut}
                          </span>
                        )}
                      </div>
                      {record.notes && (
                        <p className="mt-1 text-sm text-gray-600">{record.notes}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`rounded-full px-3 py-1 text-sm font-medium ${getStatusColor(record.status)}`}>
                      {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <StudentMonitoring 
          students={mockStudentData}
          onDownloadReport={handleDownloadReport}
        />
      </div>
    </DashboardLayout>
  );
}
