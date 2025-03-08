import { User } from '../../../types/auth';

interface TeacherFeedbackProps {
  user: User;
}

export const TeacherFeedback = ({ user }: TeacherFeedbackProps) => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Student Feedback</h1>
        <div className="text-sm text-gray-600">
          Logged in as: {user.firstName} {user.lastName}
        </div>
      </div>
      
      <div className="grid gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Feedback Overview</h2>
          {/* Feedback list will go here */}
          <div className="text-gray-500">Student feedback interface coming soon...</div>
        </div>
      </div>
    </div>
  );
};