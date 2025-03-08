import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  userRole: string;
}

export function ProtectedRoute({ children, userRole }: ProtectedRouteProps) {
  // In a real application, this would check the authenticated user from context or state
  // For now, we'll just check if the user exists and has the correct role
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  
  if (!user) {
    return <Navigate to="/auth/sign-in" />;
  }
  
  if (user.role !== userRole) {
    return <Navigate to="/auth/sign-in" />;
  }
  
  return <>{children}</>;
}
