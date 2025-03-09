import { ReactNode } from 'react';
import { UserResponse } from '../../../types/auth';
import { DashboardLayout } from './dashboard-layout';

interface ParentLayoutProps {
  children: ReactNode;
  user: UserResponse;
}

export const ParentLayout = ({ children, user }: ParentLayoutProps) => {
  return (
    <DashboardLayout user={user}>
      <div className="container mx-auto px-4 py-8">
        {children}
      </div>
    </DashboardLayout>
  );
};

export default ParentLayout;
