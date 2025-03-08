import { format } from "date-fns";
import { Clock, Upload, CheckCircle, AlertCircle, Calendar } from "lucide-react";
import { Assignment } from "@/types/assignment";

interface AssignmentCardProps {
  assignment: Assignment;
  onSubmit?: () => void;
  onGrade?: () => void;
  onView?: () => void;
  role: 'student' | 'teacher';
}

export function AssignmentCard({ 
  assignment, 
  onSubmit, 
  onGrade, 
  onView,
  role 
}: AssignmentCardProps) {
  // Get status badge color
  const getStatusColor = (status: Assignment["status"]) => {
    switch (status) {
      case "draft":
        return "bg-gray-100 text-gray-800";
      case "published":
        return "bg-yellow-100 text-yellow-800";
      case "closed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Get status icon
  const getStatusIcon = (status: Assignment["status"]) => {
    switch (status) {
      case "draft":
        return <Clock className="h-5 w-5" />;
      case "published":
        return <Upload className="h-5 w-5" />;
      case "closed":
        return <CheckCircle className="h-5 w-5" />;
      default:
        return <AlertCircle className="h-5 w-5" />;
    }
  };

  return (
    <div className="bg-white rounded-lg border p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`rounded-lg p-2 ${getStatusColor(assignment.status)}`}>
            {getStatusIcon(assignment.status)}
          </div>
          <div>
            <h3 className="font-medium text-gray-900">{assignment.title}</h3>
            {assignment.course && (
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span>{assignment.course.name}</span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Due {format(new Date(assignment.dueDate), "MMM d, yyyy")}
                </span>
              </div>
            )}
            <p className="mt-1 text-sm text-gray-600">{assignment.description}</p>
            
            {/* Teacher-specific stats */}
            {role === 'teacher' && assignment.stats && (
              <div className="mt-2 flex gap-4 text-sm text-gray-500">
                <span>Submissions: {assignment.stats.submissionCount}</span>
                <span>Graded: {assignment.stats.gradedCount}</span>
                {assignment.stats.averageGrade !== null && (
                  <span>Average: {assignment.stats.averageGrade.toFixed(1)}%</span>
                )}
              </div>
            )}
          </div>
        </div>
        
        <div className="flex gap-2">
          {role === 'student' && assignment.status === 'published' && onSubmit && (
            <button
              onClick={onSubmit}
              className="rounded-md bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600 hover:bg-blue-100"
            >
              Submit
            </button>
          )}
          
          {role === 'teacher' && onGrade && (
            <button
              onClick={onGrade}
              className="rounded-md bg-green-50 px-3 py-1 text-sm font-medium text-green-600 hover:bg-green-100"
            >
              Grade
            </button>
          )}
          
          {onView && (
            <button
              onClick={onView}
              className="rounded-md bg-gray-50 px-3 py-1 text-sm font-medium text-gray-600 hover:bg-gray-100"
            >
              View
            </button>
          )}
        </div>
      </div>
    </div>
  );
} 