import { useState } from "react";
import { User } from "../../../types/auth";
import { TeacherLayout } from "../../../components/dashboard/layout/teacher-layout";
import { Calendar as CalendarIcon, Search, Download, Clock, CheckCircle, XCircle, Filter, Save } from "lucide-react";
import { format } from "date-fns";

interface TeacherAttendanceProps {
  user: User;
}

interface Student {
  id: string;
  name: string;
  rollNumber: string;
  status?: "present" | "absent" | "late" | "excused";
  timeIn?: string;
  timeOut?: string;
  notes?: string;
}

interface Class {
  id: string;
  name: string;
  schedule: string;
  students: Student[];
}

export default function TeacherAttendance({ user }: TeacherAttendanceProps) {
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [attendanceNotes, setAttendanceNotes] = useState<Record<string, string>>({});
  const [studentStatuses, setStudentStatuses] = useState<Record<string, Student["status"]>>({});

  // Mock class data
  const classes: Class[] = [
    {
      id: "c1",
      name: "Mathematics 101",
      schedule: "Mon, Wed, Fri 09:00-10:30",
      students: [
        { id: "s1", name: "John Smith", rollNumber: "2025001" },
        { id: "s2", name: "Emma Johnson", rollNumber: "2025002" },
        { id: "s3", name: "Michael Brown", rollNumber: "2025003" },
      ]
    },
    {
      id: "c2",
      name: "Physics 201",
      schedule: "Tue, Thu 11:00-12:30",
      students: [
        { id: "s4", name: "Sarah Davis", rollNumber: "2025004" },
        { id: "s5", name: "James Wilson", rollNumber: "2025005" },
      ]
    }
  ];

  const selectedClassData = classes.find(c => c.id === selectedClass);

  const filteredStudents = selectedClassData?.students.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.rollNumber.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const getStatusColor = (status?: Student["status"]) => {
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

  const handleStatusChange = (studentId: string, status: Student["status"]) => {
    setStudentStatuses(prev => ({
      ...prev,
      [studentId]: status
    }));
  };

  const handleNotesChange = (studentId: string, notes: string) => {
    setAttendanceNotes(prev => ({
      ...prev,
      [studentId]: notes
    }));
  };

  const handleSaveAttendance = () => {
    // In a real application, this would save the attendance data to a backend
    const attendanceData = {
      classId: selectedClass,
      date: selectedDate,
      records: Object.entries(studentStatuses).map(([studentId, status]) => ({
        studentId,
        status,
        notes: attendanceNotes[studentId] || ""
      }))
    };
    console.log("Saving attendance:", attendanceData);
    alert("Attendance saved successfully!");
  };

  const handleDownloadReport = () => {
    // In a real application, this would generate and download a PDF report
    console.log("Downloading attendance report");
    alert("Attendance report would be downloaded in a real application.");
  };

  return (
    <TeacherLayout user={user}>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Attendance Tracking</h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage and track student attendance for your classes
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleSaveAttendance}
              className="flex items-center gap-2 rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
              disabled={!selectedClass}
            >
              <Save className="h-4 w-4" />
              Save Attendance
            </button>
            <button
              onClick={handleDownloadReport}
              className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              <Download className="h-4 w-4" />
              Download Report
            </button>
          </div>
        </div>

        {/* Class and Date Selection */}
        <div className="flex gap-4">
          <select
            className="rounded-lg border border-gray-300 py-2 px-4 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            <option value="">Select Class</option>
            {classes.map(cls => (
              <option key={cls.id} value={cls.id}>{cls.name}</option>
            ))}
          </select>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="rounded-lg border border-gray-300 py-2 px-4 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search students..."
                className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Selected Class Info */}
        {selectedClassData && (
          <div className="rounded-lg border bg-white p-4">
            <h2 className="text-lg font-semibold text-gray-900">{selectedClassData.name}</h2>
            <p className="text-sm text-gray-500">Schedule: {selectedClassData.schedule}</p>
          </div>
        )}

        {/* Attendance Table */}
        {selectedClassData && (
          <div className="rounded-lg border bg-white overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Roll Number
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Notes
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredStudents.map((student) => (
                  <tr key={student.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {student.rollNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {student.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        className={`rounded-lg border px-3 py-1 text-sm font-medium ${getStatusColor(studentStatuses[student.id])}`}
                        value={studentStatuses[student.id] || ""}
                        onChange={(e) => handleStatusChange(student.id, e.target.value as Student["status"])}
                      >
                        <option value="">Select Status</option>
                        <option value="present">Present</option>
                        <option value="absent">Absent</option>
                        <option value="late">Late</option>
                        <option value="excused">Excused</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="text"
                        placeholder="Add notes..."
                        className="w-full rounded-lg border border-gray-300 px-3 py-1 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        value={attendanceNotes[student.id] || ""}
                        onChange={(e) => handleNotesChange(student.id, e.target.value)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!selectedClass && (
          <div className="text-center py-12">
            <CalendarIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No Class Selected</h3>
            <p className="mt-1 text-sm text-gray-500">
              Select a class to start taking attendance
            </p>
          </div>
        )}
      </div>
    </TeacherLayout>
  );
}