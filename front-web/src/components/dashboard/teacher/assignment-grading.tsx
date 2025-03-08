import { useState } from 'react';
import { SubmissionWithDetails } from '../../../types/assignment';

interface AssignmentGradingProps {
  submission: SubmissionWithDetails;
  onSubmit: (grade: number, feedback: string) => Promise<void>;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export function AssignmentGrading({
  submission,
  onSubmit,
  onCancel,
  isSubmitting = false
}: AssignmentGradingProps) {
  const [grade, setGrade] = useState<number>(submission.grade || 0);
  const [feedback, setFeedback] = useState<string>(submission.feedback || '');
  const [error, setError] = useState<string | null>(null);

  // Calculate maximum possible points
  const maxPoints = submission.assignment?.points || 100;

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (grade < 0 || grade > maxPoints) {
      setError(`Grade must be between 0 and ${maxPoints}`);
      return;
    }
    
    try {
      await onSubmit(grade, feedback);
    } catch (error: any) {
      setError('Failed to submit grade: ' + (error.message || 'Unknown error'));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <div className="mb-4 rounded-md bg-blue-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <h3 className="text-sm font-medium text-blue-800">Submission Details</h3>
            </div>
          </div>
          <div className="mt-2 text-sm text-blue-700">
            <ul className="list-inside space-y-1">
              <li>
                <strong>Student:</strong>{' '}
                {submission.student?.firstName} {submission.student?.lastName}
              </li>
              <li>
                <strong>Assignment:</strong> {submission.assignment?.title}
              </li>
              <li>
                <strong>Submitted:</strong>{' '}
                {new Date(submission.submittedAt).toLocaleString()}
              </li>
              <li>
                <strong>Status:</strong>{' '}
                <span className={`capitalize font-medium ${
                  submission.status === 'graded' 
                    ? 'text-green-600'
                    : submission.status === 'late'
                    ? 'text-orange-600'
                    : 'text-blue-600'
                }`}>
                  {submission.status}
                </span>
              </li>
            </ul>
          </div>
          {submission.submissionUrl && (
            <div className="mt-4">
              <a
                href={submission.submissionUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-md bg-blue-100 px-2.5 py-1.5 text-sm font-medium text-blue-800 hover:bg-blue-200"
              >
                View Submission
              </a>
            </div>
          )}
        </div>

        {/* Grade input */}
        <div className="mb-4">
          <label htmlFor="grade" className="block text-sm font-medium text-gray-700">
            Grade (out of {maxPoints})
          </label>
          <input
            type="number"
            id="grade"
            value={grade}
            onChange={(e) => setGrade(Number(e.target.value))}
            min="0"
            max={maxPoints}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            disabled={isSubmitting}
          />
        </div>

        {/* Feedback textarea */}
        <div>
          <label htmlFor="feedback" className="block text-sm font-medium text-gray-700">
            Feedback
          </label>
          <textarea
            id="feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            rows={4}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Provide feedback to the student..."
            disabled={isSubmitting}
          />
        </div>

        {/* Error message */}
        {error && (
          <div className="mt-2 rounded-md bg-red-50 p-4">
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
      </div>

      {/* Action buttons */}
      <div className="flex justify-end gap-2 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Grade'}
        </button>
      </div>
    </form>
  );
} 