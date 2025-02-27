import { Ionicons } from '@expo/vector-icons';

export type IconNames = React.ComponentProps<typeof Ionicons>['name'];

export type RoleType = 'admin' | 'teacher' | 'student' | 'parent';

// Route path types for each role
export type AdminRoutes = 'dashboard' | 'users' | 'classes' | 'reports' | 'courses' | 'settings' | 'logs';
export type TeacherRoutes = 'dashboard' | 'classes' | 'attendance' | 'profile';
export type StudentRoutes = 'dashboard' | 'courses' | 'profile';
export type ParentRoutes = 'dashboard' | 'children' | 'profile';

// Combined route type
export type AppRoutePath = AdminRoutes | TeacherRoutes | StudentRoutes | ParentRoutes;

// Type-safe route paths
export type AppRoutes = {
  '(app)': {
    admin: { [K in AdminRoutes]: undefined };
    teacher: { [K in TeacherRoutes]: undefined };
    student: { [K in StudentRoutes]: undefined };
    parent: { [K in ParentRoutes]: undefined };
  };
  login: undefined;
};

export interface NavigationRoute {
  name: string;
  path: AppRoutePath;
  icon: IconNames;
  group?: string;
}

export interface NavigationGroup {
  name: string;
  icon: IconNames;
  routes: NavigationRoute[];
}

export interface NavigationTheme {
  colors: {
    background: string;
    surface: string;
    surfaceVariant: string;
    onSurface: string;
    onSurfaceVariant: string;
    outline: string;
    outlineVariant: string;
    shadow: string;
    scrim: string;
    inverseSurface: string;
    inverseOnSurface: string;
    inversePrimary: string;
    border: string;
    card: string;
    text: string;
    notification: string;
    elevation: {
      level0: string;
      level1: string;
      level2: string;
      level3: string;
      level4: string;
      level5: string;
    };
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  shape: {
    none: number;
    extraSmall: number;
    small: number;
    medium: number;
    large: number;
    extraLarge: number;
    full: number;
  };
  typography: {
    scale: {
      small: number;
      medium: number;
      large: number;
    };
    weights: {
      regular: string;
      medium: string;
      semibold: string;
      bold: string;
    };
  };
  animation: {
    scale: number;
    durations: {
      shortest: number;
      shorter: number;
      short: number;
      standard: number;
      complex: number;
      enteringScreen: number;
      leavingScreen: number;
    };
    easing: {
      easeInOut: string;
      easeOut: string;
      easeIn: string;
      sharp: string;
    };
  };
} 