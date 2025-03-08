import { User } from '../../../types/auth';

interface ReportsPageProps {
  user: User;
}

export const ReportsPage = ({ user }: ReportsPageProps) => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Reports Dashboard</h1>
        <div className="text-sm text-gray-600">
          Logged in as: {user.firstName} {user.lastName}
        </div>
      </div>
      
      <div className="grid gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Available Reports</h2>
          {/* Reports list will go here */}
          <div className="text-gray-500">Reports interface coming soon...</div>
        </div>
      </div>
    </div>
  );
};