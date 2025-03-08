import { User } from '../../../types/auth';

interface FinancePageProps {
  user: User;
}

export const FinancePage = ({ user }: FinancePageProps) => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Financial Management</h1>
        <div className="text-sm text-gray-600">
          Logged in as: {user.firstName} {user.lastName}
        </div>
      </div>
      
      <div className="grid gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Financial Overview</h2>
          {/* Financial data and controls will go here */}
          <div className="text-gray-500">Financial management interface coming soon...</div>
        </div>
      </div>
    </div>
  );
};