import { useState } from "react";
import { Assignment } from "../../../types/assignment";

interface AssignmentFormProps {
  initialData?: Partial<Assignment>;
  onSubmit: (data: Omit<Assignment, 'id' | 'createdAt' | 'updatedAt' | 'stats'>) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export function AssignmentForm({
  initialData,
  onSubmit,
  onCancel,
  isSubmitting = false
}: AssignmentFormProps) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [courseId, setCourseId] = useState(initialData?.courseId || '');
  const [dueDate, setDueDate] = useState(initialData?.dueDate || '');
  const [points, setPoints] = useState(initialData?.points?.toString() || '10');
  const [status, setStatus] = useState<Assignment['status']>(initialData?.status || 'draft');
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Validate form fields
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!courseId) {
      newErrors.courseId = 'Course is required';
    }
    
    if (!dueDate) {
      newErrors.dueDate = 'Due date is required';
    }
    
    if (!points || isNaN(Number(points)) || Number(points) <= 0) {
      newErrors.points = 'Points must be a positive number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    onSubmit({
      title,
      description,
      courseId,
      dueDate,
      points: Number(points),
      status
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`mt-1 block w-full rounded-md border ${
            errors.title ? 'border-red-500' : 'border-gray-300'
          } px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
          placeholder="Assignment title"
          disabled={isSubmitting}
        />
        {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className={`mt-1 block w-full rounded-md border ${
            errors.description ? 'border-red-500' : 'border-gray-300'
          } px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
          placeholder="Describe the assignment..."
          disabled={isSubmitting}
        />
        {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
      </div>

      <div>
        <label htmlFor="courseId" className="block text-sm font-medium text-gray-700">
          Course
        </label>
        <select
          id="courseId"
          value={courseId}
          onChange={(e) => setCourseId(e.target.value)}
          className={`mt-1 block w-full rounded-md border ${
            errors.courseId ? 'border-red-500' : 'border-gray-300'
          } px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
          disabled={isSubmitting}
        >
          <option value="">Select a course</option>
          <option value="course1">Mathematics 101</option>
          <option value="course2">Physics 201</option>
          <option value="course3">English Literature</option>
        </select>
        {errors.courseId && <p className="mt-1 text-sm text-red-500">{errors.courseId}</p>}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
            Due Date
          </label>
          <input
            type="date"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className={`mt-1 block w-full rounded-md border ${
              errors.dueDate ? 'border-red-500' : 'border-gray-300'
            } px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
            disabled={isSubmitting}
          />
          {errors.dueDate && <p className="mt-1 text-sm text-red-500">{errors.dueDate}</p>}
        </div>

        <div>
          <label htmlFor="points" className="block text-sm font-medium text-gray-700">
            Points
          </label>
          <input
            type="number"
            id="points"
            value={points}
            onChange={(e) => setPoints(e.target.value)}
            min="1"
            className={`mt-1 block w-full rounded-md border ${
              errors.points ? 'border-red-500' : 'border-gray-300'
            } px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
            disabled={isSubmitting}
          />
          {errors.points && <p className="mt-1 text-sm text-red-500">{errors.points}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700">
          Status
        </label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value as Assignment['status'])}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          disabled={isSubmitting}
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
          <option value="closed">Closed</option>
        </select>
      </div>

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
          {isSubmitting ? 'Submitting...' : initialData?.id ? 'Update Assignment' : 'Create Assignment'}
        </button>
      </div>
    </form>
  );
} 