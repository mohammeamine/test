import { useState } from 'react';
import { User } from "../../../types/auth";
import { TeacherLayout } from "../../../components/dashboard/layout/teacher-layout";
import { Calendar, Clock, Search, CheckCircle2, XCircle, Download, Plus, Bell, Check, X } from "lucide-react";

interface TeacherAttendanceProps {
  user: User
}

interface Student {
  id: number;
  firstName: string;
  lastName: string;
  status: 'pending' | 'present' | 'absent';
}

interface Class {
  id: number;
  name: string;
  students: Student[];
}

// Mock data - replace with your actual data
const classes: Class[] = [
  {
    id: 1,
    name: "Mathematics 101",
    students: [
      { id: 1, firstName: "John", lastName: "Doe", status: 'pending' },
      { id: 2, firstName: "Jane", lastName: "Smith", status: 'pending' },
      { id: 3, firstName: "Alice", lastName: "Johnson", status: 'pending' },
    ]
  },
  {
    id: 2,
    name: "Physics 201",
    students: [
      { id: 4, firstName: "Bob", lastName: "Wilson", status: 'pending' },
      { id: 5, firstName: "Carol", lastName: "Brown", status: 'pending' },
      { id: 6, firstName: "David", lastName: "Miller", status: 'pending' },
    ]
  }
];

export default function TeacherAttendance({ user }: TeacherAttendanceProps) {
  const [showTakeAttendance, setShowTakeAttendance] = useState(false);
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);
  const [studentsAttendance, setStudentsAttendance] = useState<Student[]>([]);

  const handleClassSelect = (classItem: Class) => {
    setSelectedClass(classItem);
    setStudentsAttendance(classItem.students);
  };

  const handleAttendanceStatus = (studentId: number, status: 'present' | 'absent') => {
    setStudentsAttendance(prev => 
      prev.map(student => 
        student.id === studentId ? { ...student, status } : student
      )
    );
  };

  const handleNotify = (studentId: number) => {
    // Implement notification logic here
    console.log(`Notifying student ${studentId}'s parents`);
  };

  if (showTakeAttendance) {
    return (
      <TeacherLayout user={user}>
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Take Attendance</h1>
              <p className="mt-1 text-sm text-gray-500">
                Mark attendance for your class
              </p>
            </div>
            <button
              title="Select another class"
              onClick={() => setShowTakeAttendance(false)}
              className="flex items-center gap-2 rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Back to Overview
            </button>
          </div>

          {!selectedClass ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {classes.map((classItem) => (
                <div
                  key={classItem.id}
                  onClick={() => handleClassSelect(classItem)}
                  className="cursor-pointer rounded-lg border bg-white p-6 hover:border-blue-500 transition-colors"
                >
                  <h3 className="font-medium text-gray-900">{classItem.name}</h3>
                  <p className="mt-1 text-sm text-gray-500">{classItem.students.length} students</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">{selectedClass.name}</h2>
                <button
                  onClick={() => setSelectedClass(null)}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  Choose Another Class
                </button>
              </div>
              
              <div className="divide-y divide-gray-200 rounded-lg border bg-white">
                {studentsAttendance.map((student) => (
                  <div key={student.id} className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-600 font-medium">
                            {student.firstName[0]}{student.lastName[0]}
                          </span>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {student.firstName} {student.lastName}
                        </h4>
                        <p className="text-sm text-gray-500">
                          Status: {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        title="Mark as present"
                        onClick={() => handleAttendanceStatus(student.id, 'present')}
                        className={`rounded-full p-2 ${
                          student.status === 'present'
                            ? 'bg-green-100 text-green-600'
                            : 'hover:bg-green-100 hover:text-green-600'
                        }`}
                      >
                        <Check className="h-5 w-5" />
                      </button>
                      <button
                        title="Mark as absent"
                        onClick={() => handleAttendanceStatus(student.id, 'absent')}
                        className={`rounded-full p-2 ${
                          student.status === 'absent'
                            ? 'bg-red-100 text-red-600'
                            : 'hover:bg-red-100 hover:text-red-600'
                        }`}
                      >
                        <X className="h-5 w-5" />
                      </button>
                      <button
                        title="Notify parents"
                        onClick={() => handleNotify(student.id)}
                        className="rounded-full p-2 hover:bg-blue-100 hover:text-blue-600"
                      >
                        <Bell className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </TeacherLayout>
    );
  }

  return (
    <TeacherLayout user={user}>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Attendance</h1>
            <p className="mt-1 text-sm text-gray-500">
              Track and manage class attendance
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowTakeAttendance(true)}
              className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              <Plus className="h-4 w-4" />
              Take Attendance
            </button>
            <button className="flex items-center gap-2 rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
              <Download className="h-4 w-4" />
              Export
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by class or date..."
            className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Attendance Stats */}
        <div className="grid gap-6 md:grid-cols-4">
          <div className="rounded-lg border bg-white p-6">
            <h3 className="text-sm font-medium text-gray-500">Today's Classes</h3>
            <p className="mt-2 text-3xl font-semibold text-gray-900">4</p>
            <p className="mt-1 text-sm text-gray-500">Classes to attend</p>
          </div>
          <div className="rounded-lg border bg-white p-6">
            <h3 className="text-sm font-medium text-gray-500">Present Today</h3>
            <p className="mt-2 text-3xl font-semibold text-green-600">85</p>
            <p className="mt-1 text-sm text-gray-500">Students attended</p>
          </div>
          <div className="rounded-lg border bg-white p-6">
            <h3 className="text-sm font-medium text-gray-500">Absent Today</h3>
            <p className="mt-2 text-3xl font-semibold text-red-600">12</p>
            <p className="mt-1 text-sm text-gray-500">Students missed</p>
          </div>
          <div className="rounded-lg border bg-white p-6">
            <h3 className="text-sm font-medium text-gray-500">Average Rate</h3>
            <p className="mt-2 text-3xl font-semibold text-blue-600">92%</p>
            <p className="mt-1 text-sm text-gray-500">This semester</p>
          </div>
        </div>

        {/* Attendance List */}
        <div className="rounded-lg border bg-white">
          <div className="divide-y">
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-green-100 p-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Mathematics 101</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        10:00 AM - 11:30 AM
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Today
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-sm">
                  <div className="font-medium text-gray-900">28/30</div>
                  <div className="text-gray-500">Students present</div>
                </div>
              </div>
            </div>

            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-red-100 p-2">
                    <XCircle className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Physics 201</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        2:00 PM - 3:30 PM
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Today
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-sm">
                  <div className="font-medium text-gray-900">Pending</div>
                  <div className="text-gray-500">Not started</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TeacherLayout>
  );
}