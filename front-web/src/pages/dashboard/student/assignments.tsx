import { useState, useEffect } from "react";
import { UserResponse } from "../../../types/auth";
import { StudentLayout } from "../../../components/dashboard/layout/student-layout";
import { AssignmentCard } from "../../../components/dashboard/shared/assignment-card";
import { AssignmentSubmission } from "../../../components/dashboard/student/assignment-submission";
import { Search } from "lucide-react";
import { Assignment, AssignmentWithDetails } from "../../../types/assignment";
import { assignmentService } from "../../../services/assignment.service";
import { Dialog } from "@headlessui/react";

interface StudentAssignmentsProps {
  user: UserResponse;
}

export default function StudentAssignments({ user }: StudentAssignmentsProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<Assignment["status"] | "all">("all");
  const [isSubmissionModalOpen, setIsSubmissionModalOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<AssignmentWithDetails | null>(null);
  const [assignments, setAssignments] = useState<AssignmentWithDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch assignments
  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const data = await assignmentService.getAssignments({
          status: selectedStatus === "all" ? undefined : selectedStatus
        });
        setAssignments(data);
        setError(null);
      } catch (err: any) {
        setError("Failed to load assignments: " + (err.message || "Unknown error"));
      } finally {
        setIsLoading(false);
      }
    };

    fetchAssignments();
  }, [selectedStatus]);

  // Filter assignments based on search query
  const filteredAssignments = assignments.filter(assignment => {
    const matchesSearch = 
      assignment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (assignment.course?.name.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
    
    return matchesSearch;
  });

  // Handle assignment submission
  const handleSubmitAssignment = async (files: File[], comment: string) => {
    if (!selectedAssignment) return;

    setIsSubmitting(true);
    try {
      // In a real implementation, we would upload the files to a storage service
      // and then submit the URL(s) to the API
      
      // For now, we'll simulate this by just calling the API with a mock URL
      const submissionUrl = `https://example.com/files/${Date.now()}-${files[0]?.name || 'submission'}`;
      
      await assignmentService.submitAssignment(selectedAssignment.id, {
        submissionUrl,
        comment
      });
      
      // Refresh assignments
      const updatedAssignments = await assignmentService.getAssignments({
        status: selectedStatus === "all" ? undefined : selectedStatus
      });
      setAssignments(updatedAssignments);

      // Close modal
      setIsSubmissionModalOpen(false);
      setSelectedAssignment(null);
    } catch (err: any) {
      setError("Failed to submit assignment: " + (err.message || "Unknown error"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <StudentLayout user={user}>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Assignments</h1>
            <p className="mt-1 text-sm text-gray-500">
              View and submit your assignments
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
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="closed">Closed</option>
          </select>
        </div>

        {/* Assignment Stats */}
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-lg border bg-white p-6">
            <h3 className="text-sm font-medium text-gray-500">Total Assignments</h3>
            <p className="mt-2 text-3xl font-semibold text-gray-900">{assignments.length}</p>
          </div>
          <div className="rounded-lg border bg-white p-6">
            <h3 className="text-sm font-medium text-gray-500">Due Soon</h3>
            <p className="mt-2 text-3xl font-semibold text-orange-600">
              {assignments.filter(a => {
                if (a.status !== "published") return false;
                const dueDate = new Date(a.dueDate);
                const now = new Date();
                const diffDays = Math.ceil((dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
                return diffDays <= 7 && diffDays >= 0;
              }).length}
            </p>
          </div>
          <div className="rounded-lg border bg-white p-6">
            <h3 className="text-sm font-medium text-gray-500">Completed</h3>
            <p className="mt-2 text-3xl font-semibold text-green-600">
              {assignments.filter(a => a.status === "closed").length}
            </p>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error</h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{error}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
            <p className="mt-2 text-sm text-gray-500">Loading assignments...</p>
          </div>
        ) : (
          /* Assignments List */
          <div className="space-y-4">
            {filteredAssignments.map((assignment) => (
              <AssignmentCard
                key={assignment.id}
                assignment={assignment}
                role="student"
                onSubmit={() => {
                  setSelectedAssignment(assignment);
                  setIsSubmissionModalOpen(true);
                }}
                onView={() => {
                  // Handle viewing assignment details
                }}
              />
            ))}

            {filteredAssignments.length === 0 && (
              <div className="text-center py-12">
                <p className="text-sm text-gray-500">No assignments found</p>
              </div>
            )}
          </div>
        )}

        {/* Submission Modal */}
        <Dialog
          open={isSubmissionModalOpen}
          onClose={() => setIsSubmissionModalOpen(false)}
          className="relative z-50"
        >
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="mx-auto max-w-2xl w-full rounded-lg bg-white p-6">
              <Dialog.Title className="text-lg font-medium text-gray-900 mb-4">
                Submit Assignment: {selectedAssignment?.title}
              </Dialog.Title>

              <AssignmentSubmission
                onSubmit={handleSubmitAssignment}
                onCancel={() => setIsSubmissionModalOpen(false)}
                isSubmitting={isSubmitting}
              />
            </Dialog.Panel>
          </div>
        </Dialog>
      </div>
    </StudentLayout>
  );
}