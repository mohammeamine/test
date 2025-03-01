import { useState } from "react";
import { User } from "../../../types/auth";
import { StudentLayout } from "../../../components/dashboard/layout/student-layout";
import { ClipboardCheck, Search, Calendar, Upload } from "lucide-react";

interface StudentAssignmentsProps {
  user: User;
}

// Types pour les devoirs
interface Assignment {
  id: string;
  title: string;
  course: string;
  dueDate: string;
  status: 'pending' | 'submitted' | 'graded';
}

export default function StudentAssignments({ user }: StudentAssignmentsProps) {
  // Données fictives pour les devoirs de l'étudiant
  const assignments: Assignment[] = [
    { 
      id: "a1", 
      title: "Calculus Quiz #3", 
      course: "Mathematics 101", 
      dueDate: "Mar 15, 2024",
      status: "pending"
    },
    { 
      id: "a2", 
      title: "Lab Report #2", 
      course: "Physics 201", 
      dueDate: "Mar 20, 2024",
      status: "submitted"
    },
    { 
      id: "a3", 
      title: "Literary Analysis Essay", 
      course: "English Literature", 
      dueDate: "Mar 18, 2024",
      status: "graded"
    },
  ];

  return (
    <StudentLayout user={user}>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Assignments</h1>
            <p className="mt-1 text-sm text-gray-500">
              View and manage your assignments
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mt-4">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search assignments..."
            className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Assignments List */}
        <div className="rounded-lg border bg-white mt-6">
          <div className="divide-y">
            {assignments.map((assignment) => (
              <div key={assignment.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`rounded-lg p-2 ${
                      assignment.status === 'graded' ? 'bg-green-100' : 
                      assignment.status === 'submitted' ? 'bg-blue-100' : 'bg-yellow-100'
                    }`}>
                      <ClipboardCheck className={`h-5 w-5 ${
                        assignment.status === 'graded' ? 'text-green-600' : 
                        assignment.status === 'submitted' ? 'text-blue-600' : 'text-yellow-600'
                      }`} />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{assignment.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>{assignment.course}</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          Due {new Date(assignment.dueDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {assignment.status === 'pending' && (
                      <button className="rounded-md bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600 hover:bg-blue-100">
                        Submit
                      </button>
                    )}
                    {assignment.status === 'submitted' && (
                      <button className="rounded-md bg-gray-50 px-3 py-1 text-sm font-medium text-gray-600 hover:bg-gray-100">
                        View Submission
                      </button>
                    )}
                    {assignment.status === 'graded' && (
                      <button className="rounded-md bg-green-50 px-3 py-1 text-sm font-medium text-green-600 hover:bg-green-100">
                        View Grade
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </StudentLayout>
  );
}