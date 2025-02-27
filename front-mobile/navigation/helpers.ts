import { RoleType, AdminRoutes, TeacherRoutes, StudentRoutes, ParentRoutes, AppRoutePath } from './types';

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

const isAdminRoute = (path: string): path is AdminRoutes => {
  return ['dashboard', 'users', 'classes', 'reports', 'courses', 'settings', 'logs'].includes(path);
};

const isTeacherRoute = (path: string): path is TeacherRoutes => {
  return ['dashboard', 'classes', 'attendance', 'profile'].includes(path);
};

const isStudentRoute = (path: string): path is StudentRoutes => {
  return ['dashboard', 'courses', 'profile'].includes(path);
};

const isParentRoute = (path: string): path is ParentRoutes => {
  return ['dashboard', 'children', 'profile'].includes(path);
}; 