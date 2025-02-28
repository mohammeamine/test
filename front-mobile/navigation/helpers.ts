import { RoleType, AppRoutePath } from './types';

/**
 * Creates a type-safe route path for navigation
 */
export const createRoutePath = (role: RoleType, path: AppRoutePath): string => {
  return `/(app)/${role}/${path}`;
};

/**
 * Validates if a route exists for a given role
 */
export const isValidRoute = (role: RoleType, path: string): path is AppRoutePath => {
  switch (role) {
    case 'admin':
      return isAdminRoute(path);
    case 'teacher':
      return isTeacherRoute(path);
    case 'student':
      return isStudentRoute(path);
    case 'parent':
      return isParentRoute(path);
    default:
      return false;
  }
};

const isAdminRoute = (path: string): path is AppRoutePath => {
  return ['dashboard', 'users', 'classes', 'reports', 'courses', 'settings', 'logs', 'documents', 'payments'].includes(path);
};

const isTeacherRoute = (path: string): path is AppRoutePath => {
  return ['dashboard', 'classes', 'students', 'assignments', 'materials', 'messages', 'documents', 'attendance', 'profile'].includes(path);
};

const isStudentRoute = (path: string): path is AppRoutePath => {
  return ['dashboard', 'courses', 'assignments', 'materials', 'messages', 'documents', 'payments', 'profile'].includes(path);
};

const isParentRoute = (path: string): path is AppRoutePath => {
  return ['dashboard', 'children', 'messages', 'documents', 'payments', 'profile'].includes(path);
}; 