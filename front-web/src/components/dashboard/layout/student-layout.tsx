import { ReactNode } from 'react';
import { UserResponse } from '../../../types/auth';
import { DashboardLayout } from './dashboard-layout';

interface StudentLayoutProps {
  children: ReactNode;
  user: UserResponse;
}

export const StudentLayout = ({ children, user }: StudentLayoutProps) => {
  return (
    <DashboardLayout user={user}>
      <div className="container mx-auto px-4 py-8">
        {children}
      </div>
    </DashboardLayout>
  );
};

export default StudentLayout;
