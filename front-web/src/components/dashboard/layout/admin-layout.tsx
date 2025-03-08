import { ReactNode } from 'react';
import { User } from '../../../types/auth';
import { AppSidebar } from './app-sidebar';

interface AdminLayoutProps {
  user: User;
  children: ReactNode;
}

export function AdminLayout({ user, children }: AdminLayoutProps) {
  return (
    <div className="flex h-screen">
      <AppSidebar user={user} />
      <main className="flex-1 overflow-y-auto bg-background">
        {children}
      </main>
    </div>
  );
} 