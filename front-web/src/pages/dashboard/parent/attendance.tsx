import { useState } from "react";
import { User } from "../../../types/auth";
import { DashboardLayout } from "../../../components/dashboard/layout/dashboard-layout";
import { Calendar as CalendarIcon, Search, Download, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isToday, isSameMonth, isSameDay } from "date-fns";

interface ParentAttendanceProps {
  user: User;
}

interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  date: string;
  courseId: string;
  courseName: string;
  status: "present" | "absent" | "late" | "excused";
  timeIn?: string;
  timeOut?: string;
  notes?: string;
}

interface ChildAttendanceStats {
  studentId: string;
  studentName: string;
  totalClasses: number;
  presentCount: number;
  absentCount: number;
  lateCount: number;
  excusedCount: number;
  attendanceRate: number;
}

export default function ParentAttendance({ user }: ParentAttendanceProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [selectedStatus, setSelectedStatus] = useState<AttendanceRecord["status"] | "all">("all");
  const [selectedChild, setSelectedChild] = useState<string>("all");
  const [selectedCourse, setSelectedCourse] = useState<string>("all");

  // Mock data for children's attendance records
  const [attendanceRecords] = useState<AttendanceRecord[]>([
    {
      id: "a1",
      studentId: "s1",
      studentName: "John Smith",
      date: "2025-03-01",
      courseId: "c1",
      courseName: "Mathematics 101",
      status: "present",
      timeIn: "09:00",
      timeOut: "10:30",
      notes: "Active participation in class"
    },
    {
      id: "a2",
      studentId: "s1",
      studentName: "John Smith",
      date: "2025-03-02",
      courseId: "c2",
      courseName: "Physics 201",
      status: "late",
      timeIn: "10:15",
      timeOut: "11:45",
      notes: "Arrived 15 minutes late"
    },
    {
      id: "a3",
      studentId: "s2",
      studentName: "Emma Smith",
      date: "2025-03-01",
      courseId: "c1",
      courseName: "Mathematics 101",
      status: "present",
      timeIn: "09:00",
      timeOut: "10:30"
    },
    {
      id: "a4",
      studentId: "s2",
      studentName: "Emma Smith",
      date: "2025-03-02",
      courseId: "c2",
      courseName: "Physics 201",
      status: "absent",
      notes: "Medical appointment"
    }
  ]);

  // Get unique children
  const children = Array.from(
    new Set(attendanceRecords.map(record => record.studentId))
  ).map(studentId => {
    const record = attendanceRecords.find(r => r.studentId === studentId);
    return {
      id: studentId,
      name: record?.studentName || ""
    };
  });

  // Get unique courses
  const courses = Array.from(
    new Map(attendanceRecords.map(record => [record.courseId, { id: record.courseId, name: record.courseName }])).values()
  );

  // Filter attendance records
  const filteredRecords = attendanceRecords.filter(record => {
    const matchesSearch = 
      record.courseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.notes?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = selectedStatus === "all" || record.status === selectedStatus;
    const matchesCourse = selectedCourse === "all" || record.courseId === selectedCourse;
    const matchesChild = selectedChild === "all" || record.studentId === selectedChild;
    
    return matchesSearch && matchesStatus && matchesCourse && matchesChild;
  });

  // Calculate attendance statistics per child
  const childrenStats: ChildAttendanceStats[] = children.map(child => {
    const childRecords = attendanceRecords.filter(r => r.studentId === child.id);
    const totalClasses = childRecords.length;
    const presentCount = childRecords.filter(r => r.status === "present").length;
    const absentCount = childRecords.filter(r => r.status === "absent").length;
    const lateCount = childRecords.filter(r => r.status === "late").length;
    const excusedCount = childRecords.filter(r => r.status === "excused").length;
    
    return {
      studentId: child.id,
      studentName: child.name,
      totalClasses,
      presentCount,
      absentCount,
      lateCount,
      excusedCount,
      attendanceRate: (presentCount / totalClasses) * 100
    };
  });

  // Get status color
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

  // Get status icon
  const getStatusIcon = (status: AttendanceRecord["status"]) => {
    switch (status) {
      case "present":
        return <CheckCircle className="h-5 w-5" />;
      case "absent":
        return <XCircle className="h-5 w-5" />;
      case "late":
        return <Clock className="h-5 w-5" />;
      case "excused":
        return <AlertCircle className="h-5 w-5" />;
      default:
        return <CalendarIcon className="h-5 w-5" />;
    }
  };

  // Handle report download
  const handleDownloadReport = () => {
    console.log("Downloading attendance report");
    alert("Attendance report would be downloaded in a real application.");
  };

  return (
    <DashboardLayout user={user}>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Children's Attendance</h1>
            <p className="mt-1 text-sm text-gray-500">
              Monitor your children's attendance records
            </p>
          </div>
          <button
            onClick={handleDownloadReport}
            className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            <Download className="h-4 w-4" />
            Download Report
          </button>
        </div>

        {/* Attendance Stats per Child */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {childrenStats.map((stats) => (
            <div key={stats.studentId} className="rounded-lg border bg-white p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{stats.studentName}</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Attendance Rate</span>
                  <span className="text-lg font-semibold text-blue-600">
                    {stats.attendanceRate.toFixed(1)}%
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Present</span>
                    <div className="text-green-600 font-semibold">{stats.presentCount}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Absent</span>
                    <div className="text-red-600 font-semibold">{stats.absentCount}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Late</span>
                    <div className="text-yellow-600 font-semibold">{stats.lateCount}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Excused</span>
                    <div className="text-blue-600 font-semibold">{stats.excusedCount}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4">
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
          <select
            className="rounded-lg border border-gray-300 py-2 px-4 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={selectedChild}
            onChange={(e) => setSelectedChild(e.target.value)}
          >
            <option value="all">All Children</option>
            {children.map(child => (
              <option key={child.id} value={child.id}>{child.name}</option>
            ))}
          </select>
          <select
            className="rounded-lg border border-gray-300 py-2 px-4 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value as AttendanceRecord["status"] | "all")}
          >
            <option value="all">All Status</option>
            <option value="present">Present</option>
            <option value="absent">Absent</option>
            <option value="late">Late</option>
            <option value="excused">Excused</option>
          </select>
          <select
            className="rounded-lg border border-gray-300 py-2 px-4 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
          >
            <option value="all">All Courses</option>
            {courses.map(course => (
              <option key={course.id} value={course.id}>{course.name}</option>
            ))}
          </select>
        </div>

        {/* Attendance Records */}
        <div className="space-y-4">
          {filteredRecords.map((record) => (
            <div key={record.id} className="rounded-lg border bg-white p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`rounded-lg p-3 ${getStatusColor(record.status)}`}>
                    {getStatusIcon(record.status)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-gray-900">{record.studentName}</h3>
                      <span className="text-sm text-gray-500">•</span>
                      <span className="text-sm text-gray-500">{record.courseName}</span>
                    </div>
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
    </DashboardLayout>
  );
};