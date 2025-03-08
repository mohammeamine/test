import { useState } from "react";
import { User } from "../../../types/auth";
import { TeacherLayout } from "../../../components/dashboard/layout/teacher-layout";
import { GradeEntryModal } from "../../../components/dashboard/teacher/grade-entry-modal";
import { FeedbackSystem } from "../../../components/dashboard/teacher/feedback-system";
import { 
  ClipboardCheck, Search, Plus, Calendar, Clock, 
  CheckCircle2, XCircle, Bell, FileText, PenTool, 
  BarChart, Download, Upload, MessageSquare,
  Filter, ChevronDown
} from "lucide-react";

interface TeacherAssignmentsProps {
  user: User;
}

interface Student {
  id: string;
  name: string;
  currentGrade?: number;
  submissionDate?: string;
  status: "submitted" | "not_submitted" | "late";
}

interface Assignment {
  id: string;
  title: string;
  course: string;
  dueDate: string;
  status: 'pending' | 'graded' | 'overdue';
  submissionCount: number;
  totalStudents: number;
  students?: Student[];
  rubric?: {
    id: string;
    name: string;
    description: string;
    maxPoints: number;
  }[];
}

interface Exam {
  id: string;
  title: string;
  course: string;
  date: string;
  type: 'quiz' | 'exam';
  status: 'scheduled' | 'completed';
  students?: Student[];
}

interface Evaluation {
  id: string;
  title: string;
  course: string;
  date: string;
  type: 'test' | 'project';
  status: 'pending' | 'completed';
  students?: Student[];
}

interface FeedbackTemplate {
  id: string;
  title: string;
  content: string;
  category: string;
}

export default function TeacherAssignments({ user }: TeacherAssignmentsProps) {
  const [activeTab, setActiveTab] = useState<"assignments" | "exams" | "evaluations">("assignments");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showGradeModal, setShowGradeModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const [selectedEvaluation, setSelectedEvaluation] = useState<Evaluation | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"dueDate" | "title" | "submissions">("dueDate");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Mock student data
  const mockStudents: Student[] = [
    {
      id: "s1",
      name: "John Smith",
      status: "submitted",
      submissionDate: "2025-03-05",
      currentGrade: 85
    },
    {
      id: "s2",
      name: "Emma Johnson",
      status: "late",
      submissionDate: "2025-03-06"
    },
    {
      id: "s3",
      name: "Michael Brown",
      status: "not_submitted"
    }
  ];

  // Mock assignments data with students
  const [assignments, setAssignments] = useState<Assignment[]>([
    { 
      id: "a1", 
      title: "Calculus Quiz #3", 
      course: "Mathematics 101", 
      dueDate: "2025-03-15",
      status: "pending",
      submissionCount: 18,
      totalStudents: 24,
      students: mockStudents,
      rubric: [
        {
          id: "r1",
          name: "Problem Solving",
          description: "Ability to solve complex mathematical problems",
          maxPoints: 40
        },
        {
          id: "r2",
          name: "Methodology",
          description: "Clear presentation of solution steps",
          maxPoints: 30
        },
        {
          id: "r3",
          name: "Accuracy",
          description: "Correctness of calculations and final answers",
          maxPoints: 30
        }
      ]
    },
    { 
      id: "a2", 
      title: "Lab Report #2", 
      course: "Physics 201", 
      dueDate: "2025-03-20",
      status: "graded",
      submissionCount: 22,
      totalStudents: 22,
      students: mockStudents
    },
    { 
      id: "a3", 
      title: "Literary Analysis Essay", 
      course: "English Literature", 
      dueDate: "2025-03-18",
      status: "overdue",
      submissionCount: 15,
      totalStudents: 26,
      students: mockStudents
    }
  ]);

  // Mock feedback templates
  const [feedbackTemplates, setFeedbackTemplates] = useState<FeedbackTemplate[]>([
    {
      id: "ft1",
      title: "Excellent Work",
      content: "Outstanding work! Your analysis demonstrates a deep understanding of the concepts and excellent attention to detail.",
      category: "positive"
    },
    {
      id: "ft2",
      title: "Good Effort - Needs Improvement",
      content: "Good effort on this assignment. To improve, focus on [specific area] and consider [suggestion].",
      category: "constructive"
    },
    {
      id: "ft3",
      title: "Incomplete Submission",
      content: "Your submission is incomplete. Please ensure you address all requirements and resubmit.",
      category: "improvement"
    }
  ]);

  const handleCreateAssignment = () => {
    setShowCreateModal(true);
  };

  const handleGradeAssignment = (assignment: Assignment) => {
    setSelectedAssignment(assignment);
    setShowGradeModal(true);
  };

  const handleSaveGrades = (grades: { studentId: string; grade: number; feedback: string }[]) => {
    if (!selectedAssignment) return;

    // Update assignments with new grades
    setAssignments(prevAssignments => 
      prevAssignments.map(assignment => {
        if (assignment.id === selectedAssignment.id) {
          return {
            ...assignment,
            status: "graded",
            students: assignment.students?.map(student => {
              const gradeData = grades.find(g => g.studentId === student.id);
              if (gradeData) {
                return {
                  ...student,
                  currentGrade: gradeData.grade
                };
              }
              return student;
            })
          };
        }
        return assignment;
      })
    );

    setShowGradeModal(false);
  };

  const handleAddFeedbackTemplate = (template: Omit<FeedbackTemplate, "id">) => {
    const newTemplate: FeedbackTemplate = {
      ...template,
      id: Math.random().toString(36).substr(2, 9)
    };
    setFeedbackTemplates([...feedbackTemplates, newTemplate]);
  };

  const handleDeleteFeedbackTemplate = (id: string) => {
    setFeedbackTemplates(templates => templates.filter(t => t.id !== id));
  };

  const handleSaveRubric = (assignmentId: string, criteria: Assignment["rubric"]) => {
    setAssignments(prevAssignments =>
      prevAssignments.map(assignment =>
        assignment.id === assignmentId
          ? { ...assignment, rubric: criteria }
          : assignment
      )
    );
  };

  const filteredAssignments = assignments
    .filter(assignment => {
      const matchesStatus = filterStatus === "all" || assignment.status === filterStatus;
      const matchesSearch = 
        assignment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        assignment.course.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesStatus && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === "dueDate") {
        return sortOrder === "asc"
          ? new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
          : new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime();
      }
      if (sortBy === "submissions") {
        return sortOrder === "asc"
          ? a.submissionCount - b.submissionCount
          : b.submissionCount - a.submissionCount;
      }
      return sortOrder === "asc"
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
    });

  return (
    <TeacherLayout user={user}>
      <div className="p-6 space-y-6">
        {/* Header with navigation tabs */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Assignment Management</h1>
            <p className="mt-1 text-sm text-gray-500">
              Create, manage, and grade assignments for your classes
            </p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={handleCreateAssignment}
              className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              <Plus className="h-4 w-4" />
              Create
            </button>
            <button className="flex items-center gap-2 rounded-md border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50">
              <Bell className="h-4 w-4" />
              Notifications
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search assignments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-md border border-gray-300 pl-9 pr-4 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full rounded-md border border-gray-300 py-2 pl-3 pr-10 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="graded">Graded</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>
          <div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="w-full rounded-md border border-gray-300 py-2 pl-3 pr-10 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              <option value="dueDate">Sort by Due Date</option>
              <option value="title">Sort by Title</option>
              <option value="submissions">Sort by Submissions</option>
            </select>
          </div>
          <div>
            <button
              onClick={() => setSortOrder(order => order === "asc" ? "desc" : "asc")}
              className="flex w-full items-center justify-center gap-2 rounded-md border border-gray-300 py-2 text-sm font-medium hover:bg-gray-50"
            >
              {sortOrder === "asc" ? "Ascending" : "Descending"}
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Assignment List */}
        <div className="space-y-4">
          {filteredAssignments.map(assignment => (
            <div
              key={assignment.id}
              className="rounded-lg border bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{assignment.title}</h3>
                  <p className="mt-1 text-sm text-gray-500">{assignment.course}</p>
                  <div className="mt-2 flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Due: {new Date(assignment.dueDate).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Upload className="h-4 w-4" />
                      {assignment.submissionCount}/{assignment.totalStudents} Submissions
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      assignment.status === "graded"
                        ? "bg-green-100 text-green-800"
                        : assignment.status === "overdue"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                  </span>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-end gap-2">
                <button
                  onClick={() => handleGradeAssignment(assignment)}
                  className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                  <PenTool className="h-4 w-4" />
                  Grade
                </button>
                <button className="flex items-center gap-2 rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                  <MessageSquare className="h-4 w-4" />
                  Feedback
                </button>
                <button className="flex items-center gap-2 rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                  <Download className="h-4 w-4" />
                  Download All
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Grade Entry Modal */}
      {showGradeModal && selectedAssignment && (
        <GradeEntryModal
          isOpen={showGradeModal}
          onClose={() => setShowGradeModal(false)}
          assignmentTitle={selectedAssignment.title}
          courseId={selectedAssignment.course}
          students={selectedAssignment.students || []}
          onSaveGrades={handleSaveGrades}
        />
      )}

      {/* Feedback System Modal */}
      {showFeedbackModal && selectedAssignment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-4xl rounded-lg bg-white p-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Feedback System</h2>
              <button
                onClick={() => setShowFeedbackModal(false)}
                className="rounded-full p-1 hover:bg-gray-100"
              >
                <XCircle className="h-5 w-5" />
              </button>
            </div>
            <FeedbackSystem
              onSaveFeedback={(feedback) => {
                console.log("Saving feedback:", feedback);
                setShowFeedbackModal(false);
              }}
              onSaveRubric={(criteria) => handleSaveRubric(selectedAssignment.id, criteria)}
              templates={feedbackTemplates}
              onAddTemplate={handleAddFeedbackTemplate}
              onDeleteTemplate={handleDeleteFeedbackTemplate}
            />
          </div>
        </div>
      )}
    </TeacherLayout>
  );
}