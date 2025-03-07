import { useState, useEffect } from "react";
import { User } from "../../../types/auth";
import { StudentLayout } from "../../../components/dashboard/layout/student-layout";
import { AssignmentSubmissionModal } from "../../../components/dashboard/student/assignment-submission-modal";
import { ClipboardCheck, Search, Calendar, Upload, AlertCircle, CheckCircle, XCircle, Clock } from "lucide-react";
import { format } from "date-fns";

interface StudentAssignmentsProps {
  user: User;
}

interface Assignment {
  id: string;
  title: string;
  course: string;
  description: string;
  dueDate: string;
  status: 'pending' | 'submitted' | 'graded' | 'overdue';
  grade?: number;
  feedback?: string;
  submissionDate?: string;
  attachments?: { name: string; url: string }[];
}

export default function StudentAssignments({ user }: StudentAssignmentsProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<Assignment["status"] | "all">("all");
  const [isSubmissionModalOpen, setIsSubmissionModalOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [assignments, setAssignments] = useState<Assignment[]>([
    {
      id: "a1",
      title: "Calculus Quiz #3",
      course: "Mathematics 101",
      description: "Complete the online quiz covering derivatives and integrals. Show all your work.",
      dueDate: "2025-03-15",
      status: "pending"
    },
    {
      id: "a2",
      title: "Lab Report #2",
      course: "Physics 201",
      description: "Write a detailed report on the pendulum experiment conducted in lab.",
      dueDate: "2025-03-20",
      status: "submitted",
      submissionDate: "2025-03-19"
    },
    {
      id: "a3",
      title: "Literary Analysis Essay",
      course: "English Literature",
      description: "Analyze the themes of identity and belonging in the assigned reading.",
      dueDate: "2025-03-18",
      status: "graded",
      grade: 92,
      feedback: "Excellent analysis and well-structured arguments.",
      submissionDate: "2025-03-17"
    },
    {
      id: "a4",
      title: "Programming Project",
      course: "Computer Science",
      description: "Build a simple web application using React and TypeScript.",
      dueDate: "2025-03-05",
      status: "overdue"
    }
  ]);

  // Filter assignments based on search query and status
  const filteredAssignments = assignments.filter(assignment => {
    const matchesSearch = 
      assignment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      assignment.course.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = selectedStatus === "all" || assignment.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  // Handle assignment submission
  const handleSubmitAssignment = (files: File[], comment: string) => {
    if (!selectedAssignment) return;

    // In a real application, this would upload files to a server
    console.log("Submitting files:", files);
    console.log("Comment:", comment);

    // Update assignment status
    setAssignments(prev => prev.map(assignment => 
      assignment.id === selectedAssignment.id
        ? {
            ...assignment,
            status: "submitted",
            submissionDate: new Date().toISOString().split('T')[0],
            attachments: files.map(file => ({
              name: file.name,
              url: URL.createObjectURL(file)
            }))
          }
        : assignment
    ));

    // Close the modal
    setIsSubmissionModalOpen(false);
    setSelectedAssignment(null);
  };

  // Get status badge color
  const getStatusColor = (status: Assignment["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "submitted":
        return "bg-blue-100 text-blue-800";
      case "graded":
        return "bg-green-100 text-green-800";
      case "overdue":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Get status icon
  const getStatusIcon = (status: Assignment["status"]) => {
    switch (status) {
      case "pending":
        return <Clock className="h-5 w-5" />;
      case "submitted":
        return <Upload className="h-5 w-5" />;
      case "graded":
        return <CheckCircle className="h-5 w-5" />;
      case "overdue":
        return <AlertCircle className="h-5 w-5" />;
      default:
        return <ClipboardCheck className="h-5 w-5" />;
    }
  };

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

        {/* Filters */}
        <div className="flex gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search assignments..."
                className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <select
            className="rounded-lg border border-gray-300 py-2 px-4 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value as Assignment["status"] | "all")}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="submitted">Submitted</option>
            <option value="graded">Graded</option>
            <option value="overdue">Overdue</option>
          </select>
        </div>

        {/* Assignment Stats */}
        <div className="grid gap-6 md:grid-cols-4">
          <div className="rounded-lg border bg-white p-6">
            <h3 className="text-sm font-medium text-gray-500">Total Assignments</h3>
            <p className="mt-2 text-3xl font-semibold text-gray-900">{assignments.length}</p>
          </div>
          <div className="rounded-lg border bg-white p-6">
            <h3 className="text-sm font-medium text-gray-500">Pending</h3>
            <p className="mt-2 text-3xl font-semibold text-yellow-600">
              {assignments.filter(a => a.status === "pending").length}
            </p>
          </div>
          <div className="rounded-lg border bg-white p-6">
            <h3 className="text-sm font-medium text-gray-500">Submitted</h3>
            <p className="mt-2 text-3xl font-semibold text-blue-600">
              {assignments.filter(a => a.status === "submitted").length}
            </p>
          </div>
          <div className="rounded-lg border bg-white p-6">
            <h3 className="text-sm font-medium text-gray-500">Graded</h3>
            <p className="mt-2 text-3xl font-semibold text-green-600">
              {assignments.filter(a => a.status === "graded").length}
            </p>
          </div>
        </div>

        {/* Assignments List */}
        <div className="bg-white rounded-lg border">
          <div className="divide-y">
            {filteredAssignments.map((assignment) => (
              <div key={assignment.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`rounded-lg p-2 ${getStatusColor(assignment.status)}`}>
                      {getStatusIcon(assignment.status)}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{assignment.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>{assignment.course}</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          Due {format(new Date(assignment.dueDate), "MMM d, yyyy")}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-gray-600">{assignment.description}</p>
                      {assignment.submissionDate && (
                        <p className="mt-1 text-sm text-gray-500">
                          Submitted on {format(new Date(assignment.submissionDate), "MMM d, yyyy")}
                        </p>
                      )}
                      {assignment.grade && (
                        <p className="mt-1 text-sm font-medium text-green-600">
                          Grade: {assignment.grade}%
                        </p>
                      )}
                      {assignment.feedback && (
                        <p className="mt-1 text-sm text-gray-600">
                          Feedback: {assignment.feedback}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {assignment.status === "pending" && (
                      <button
                        onClick={() => {
                          setSelectedAssignment(assignment);
                          setIsSubmissionModalOpen(true);
                        }}
                        className="rounded-md bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600 hover:bg-blue-100"
                      >
                        Submit
                      </button>
                    )}
                    {assignment.status === "submitted" && (
                      <button className="rounded-md bg-gray-50 px-3 py-1 text-sm font-medium text-gray-600 hover:bg-gray-100">
                        View Submission
                      </button>
                    )}
                    {assignment.status === "graded" && (
                      <button className="rounded-md bg-green-50 px-3 py-1 text-sm font-medium text-green-600 hover:bg-green-100">
                        View Grade
                      </button>
                    )}
                    {assignment.status === "overdue" && (
                      <button
                        onClick={() => {
                          setSelectedAssignment(assignment);
                          setIsSubmissionModalOpen(true);
                        }}
                        className="rounded-md bg-red-50 px-3 py-1 text-sm font-medium text-red-600 hover:bg-red-100"
                      >
                        Submit Late
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Assignment Submission Modal */}
      {selectedAssignment && (
        <AssignmentSubmissionModal
          isOpen={isSubmissionModalOpen}
          onClose={() => {
            setIsSubmissionModalOpen(false);
            setSelectedAssignment(null);
          }}
          assignmentId={selectedAssignment.id}
          assignmentTitle={selectedAssignment.title}
          onSubmit={handleSubmitAssignment}
        />
      )}
    </StudentLayout>
  );
}