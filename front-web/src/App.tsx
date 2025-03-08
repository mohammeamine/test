import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import LandingPage from './pages/landing';
import { SignInPage } from './pages/auth/sign-in';
import { SignUpPage } from './pages/auth/sign-up';
import { ForgotPasswordPage } from './pages/auth/forgot-password';
import { ResetPasswordPage } from './pages/auth/reset-password';
import { VerifyEmailPage } from '@/pages/auth/verify-email';
import DebugNav from "@/pages/debug-nav";
import { Toaster } from 'sonner';
import './index.css';

// Admin Pages
import { AdminHomePage } from '@/pages/dashboard/admin/home';
import { UsersPage } from '@/pages/dashboard/admin/users';
import { ClassesPage } from '@/pages/dashboard/admin/classes';
import { CoursesPage } from '@/pages/dashboard/admin/courses';
import { CourseContentPage } from '@/pages/dashboard/admin/course-content';
import { AnalyticsPage } from '@/pages/dashboard/admin/analytics';
import EventsPage from '@/pages/dashboard/admin/events';
import { NotificationsPage } from '@/pages/dashboard/admin/notifications';
import { SettingsPage as AdminSettingsPage } from '@/pages/dashboard/admin/settings';
import { DepartmentsPage } from '@/pages/dashboard/admin/departments';
import { ReportsPage } from '@/pages/dashboard/admin/reports';
import { FinancePage } from '@/pages/dashboard/admin/finance';
import { SystemSettingsPage } from '@/pages/dashboard/admin/system-settings';

// Student Pages
import StudentDashboard from './pages/dashboard/student';
import StudentCourses from './pages/dashboard/student/courses';
import StudentMaterials from './pages/dashboard/student/materials';
import StudentLibrary from './pages/dashboard/student/library';
import StudentCertificates from './pages/dashboard/student/certificates';
import StudentAttendance from './pages/dashboard/student/attendance';
import StudentPayments from './pages/dashboard/student/payments';
import StudentDocuments from './pages/dashboard/student/documents';
import StudentAssignments from './pages/dashboard/student/assignments';
import StudentSupport from './pages/dashboard/student/support';
import { StudentFeedback } from './pages/dashboard/student/feedback';
import { StudentSchedule } from './pages/dashboard/student/schedule';
import { StudentGrades } from './pages/dashboard/student/grades';

// Teacher Pages
import TeacherDashboard from './pages/dashboard/teacher';
import TeacherClasses from './pages/dashboard/teacher/classes';
import TeacherMaterials from './pages/dashboard/teacher/materials';
import TeacherStudents from './pages/dashboard/teacher/students';
import TeacherAttendance from './pages/dashboard/teacher/attendance';
import TeacherGrading from './pages/dashboard/teacher/grading';
import TeacherAssignments from './pages/dashboard/teacher/assignments';
import TeacherMessages from './pages/dashboard/teacher/messages';
import TeacherDocuments from './pages/dashboard/teacher/documents';
import TeacherCalendar from './pages/dashboard/teacher/calendar';
import TeacherAnalytics from './pages/dashboard/teacher/analytics';
import TeacherGrades from './pages/dashboard/teacher/grades';
import TeacherCurriculum from './pages/dashboard/teacher/curriculum';
import { TeacherSchedule } from './pages/dashboard/teacher/schedule';
import { TeacherFeedback } from './pages/dashboard/teacher/feedback';
import { TeacherReports } from './pages/dashboard/teacher/reports';

// Parent Pages
import ParentDashboard from './pages/dashboard/parent';
import ParentChildren from './pages/dashboard/parent/children';
import ParentProgress from './pages/dashboard/parent/progress';
import ParentMonitoring from './pages/dashboard/parent/monitoring';
import ParentMessages from './pages/dashboard/parent/messages';
import ParentPayments from './pages/dashboard/parent/payments';
import ParentDocuments from './pages/dashboard/parent/documents';
import { ParentAttendance } from './pages/dashboard/parent/attendance';
import { ParentGrades } from './pages/dashboard/parent/grades';
import { ParentSchedule } from './pages/dashboard/parent/schedule';
import { ParentFeedback } from './pages/dashboard/parent/feedback';

// Shared Pages
import ProfilePage from './pages/dashboard/profile';
import SettingsPage from './pages/dashboard/settings';

import { User } from './types/auth';
import { ProtectedRoute } from './components/auth/protected-route';

// Keyboard shortcut handler component
const KeyboardShortcuts = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Debug navigation shortcut (Ctrl+D or Cmd+D)
      if ((event.ctrlKey || event.metaKey) && event.key === 'd') {
        event.preventDefault();
        navigate('/debug');
      }
      
      // Profile shortcut (Ctrl+P or Cmd+P)
      if ((event.ctrlKey || event.metaKey) && event.key === 'p') {
        event.preventDefault();
        navigate('/dashboard/profile');
      }
      
      // Settings shortcut (Ctrl+, or Cmd+,)
      if ((event.ctrlKey || event.metaKey) && event.key === ',') {
        event.preventDefault();
        navigate('/dashboard/settings');
      }
      
      // Home shortcut (Alt+H)
      if (event.altKey && event.key === 'h') {
        event.preventDefault();
        navigate('/dashboard');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [navigate]);

  return null;
};

function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // TODO: Replace this with actual authentication logic
    // This is just a temporary mock user for demonstration
    const mockUser: User = {
      id: '1',
      email: 'admin@example.com',
      firstName: 'Admin',
      lastName: 'User',
      role: 'administrator',
      createdAt: new Date().toISOString(),
    };
    setUser(mockUser);
  }, []);

  const mockAdmin: User = {
    id: '1',
    email: 'admin@example.com',
    firstName: 'Admin',
    lastName: 'User',
    role: 'administrator',
    createdAt: new Date().toISOString(),
  };

  const mockStudent: User = {
    id: '2',
    email: 'student@example.com',
    firstName: 'Student',
    lastName: 'User',
    role: 'student',
    createdAt: new Date().toISOString(),
  };

  const mockTeacher: User = {
    id: '3',
    email: 'teacher@example.com',
    firstName: 'Teacher',
    lastName: 'User',
    role: 'teacher',
    createdAt: new Date().toISOString(),
  };

  const mockParent: User = {
    id: '4',
    email: 'parent@example.com',
    firstName: 'Parent',
    lastName: 'User',
    role: 'parent',
    createdAt: new Date().toISOString(),
  };

  return (
    <Router>
      <Toaster position="top-right" richColors />
      <KeyboardShortcuts />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth/sign-in" element={<SignInPage />} />
        <Route path="/auth/sign-up" element={<SignUpPage />} />
        <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/auth/reset-password" element={<ResetPasswordPage />} />
        <Route path="/auth/verify-email" element={<VerifyEmailPage />} />
        <Route path="/debug" element={<DebugNav />} />

        {/* Debug routes that bypass authentication */}
        <Route path="/debug/administrator" element={<AdminHomePage user={mockAdmin} />} />
        <Route path="/debug/administrator/users" element={<UsersPage user={mockAdmin} />} />
        <Route path="/debug/administrator/classes" element={<ClassesPage user={mockAdmin} />} />
        <Route path="/debug/administrator/courses" element={<CoursesPage user={mockAdmin} />} />
        <Route path="/debug/administrator/course/:id" element={<CourseContentPage user={mockAdmin} />} />
        <Route path="/debug/administrator/analytics" element={<AnalyticsPage user={mockAdmin} />} />
        <Route path="/debug/administrator/events" element={<EventsPage user={mockAdmin} />} />
        <Route path="/debug/administrator/notifications" element={<NotificationsPage user={mockAdmin} />} />
        <Route path="/debug/administrator/departments" element={<DepartmentsPage user={mockAdmin} />} />
        <Route path="/debug/administrator/reports" element={<ReportsPage user={mockAdmin} />} />
        <Route path="/debug/administrator/finance" element={<FinancePage user={mockAdmin} />} />
        <Route path="/debug/administrator/system" element={<SystemSettingsPage user={mockAdmin} />} />
        <Route path="/debug/administrator/settings" element={<AdminSettingsPage user={mockAdmin} />} />
        <Route path="/debug/administrator/profile" element={<ProfilePage user={mockAdmin} />} />
        
        <Route path="/debug/student" element={<StudentDashboard user={mockStudent} />} />
        <Route path="/debug/student/courses" element={<StudentCourses user={mockStudent} />} />
        <Route path="/debug/student/materials" element={<StudentMaterials user={mockStudent} />} />
        <Route path="/debug/student/library" element={<StudentLibrary user={mockStudent} />} />
        <Route path="/debug/student/certificates" element={<StudentCertificates user={mockStudent} />} />
        <Route path="/debug/student/attendance" element={<StudentAttendance user={mockStudent} />} />
        <Route path="/debug/student/payments" element={<StudentPayments user={mockStudent} />} />
        <Route path="/debug/student/documents" element={<StudentDocuments user={mockStudent} />} />
        <Route path="/debug/student/assignments" element={<StudentAssignments user={mockStudent} />} />
        <Route path="/debug/student/support" element={<StudentSupport user={mockStudent} />} />
        <Route path="/debug/student/feedback" element={<StudentFeedback user={mockStudent} />} />
        <Route path="/debug/student/schedule" element={<StudentSchedule user={mockStudent} />} />
        <Route path="/debug/student/grades" element={<StudentGrades user={mockStudent} />} />
        <Route path="/debug/student/profile" element={<ProfilePage user={mockStudent} />} />
        <Route path="/debug/student/settings" element={<SettingsPage user={mockStudent} />} />
        
        <Route path="/debug/teacher" element={<TeacherDashboard user={mockTeacher} />} />
        <Route path="/debug/teacher/classes" element={<TeacherClasses user={mockTeacher} />} />
        <Route path="/debug/teacher/materials" element={<TeacherMaterials user={mockTeacher} />} />
        <Route path="/debug/teacher/students" element={<TeacherStudents user={mockTeacher} />} />
        <Route path="/debug/teacher/attendance" element={<TeacherAttendance user={mockTeacher} />} />
        <Route path="/debug/teacher/grading" element={<TeacherGrading user={mockTeacher} />} />
        <Route path="/debug/teacher/assignments" element={<TeacherAssignments user={mockTeacher} />} />
        <Route path="/debug/teacher/messages" element={<TeacherMessages user={mockTeacher} />} />
        <Route path="/debug/teacher/documents" element={<TeacherDocuments user={mockTeacher} />} />
        <Route path="/debug/teacher/profile" element={<ProfilePage user={mockTeacher} />} />
        <Route path="/debug/teacher/settings" element={<SettingsPage user={mockTeacher} />} />
        <Route path="/debug/teacher/calendar" element={<TeacherCalendar user={mockTeacher} />} />
        <Route path="/debug/teacher/analytics" element={<TeacherAnalytics user={mockTeacher} />} />
        <Route path="/debug/teacher/grades" element={<TeacherGrades user={mockTeacher} />} />
        <Route path="/debug/teacher/curriculum" element={<TeacherCurriculum user={mockTeacher} />} />
        <Route path="/debug/teacher/schedule" element={<TeacherSchedule user={mockTeacher} />} />
        <Route path="/debug/teacher/feedback" element={<TeacherFeedback user={mockTeacher} />} />
        <Route path="/debug/teacher/reports" element={<TeacherReports user={mockTeacher} />} />
        
        <Route path="/debug/parent" element={<ParentDashboard user={mockParent} />} />
        <Route path="/debug/parent/children" element={<ParentChildren user={mockParent} />} />
        <Route path="/debug/parent/progress" element={<ParentProgress user={mockParent} />} />
        <Route path="/debug/parent/monitoring" element={<ParentMonitoring user={mockParent} />} />
        <Route path="/debug/parent/messages" element={<ParentMessages user={mockParent} />} />
        <Route path="/debug/parent/payments" element={<ParentPayments user={mockParent} />} />
        <Route path="/debug/parent/documents" element={<ParentDocuments user={mockParent} />} />
        <Route path="/debug/parent/attendance" element={<ParentAttendance user={mockParent} />} />
        <Route path="/debug/parent/grades" element={<ParentGrades user={mockParent} />} />
        <Route path="/debug/parent/schedule" element={<ParentSchedule user={mockParent} />} />
        <Route path="/debug/parent/feedback" element={<ParentFeedback user={mockParent} />} />
        <Route path="/debug/parent/profile" element={<ProfilePage user={mockParent} />} />
        <Route path="/debug/parent/settings" element={<SettingsPage user={mockParent} />} />
        
        {/* Common Routes for all authenticated users */}
        <Route 
          path="/dashboard/profile" 
          element={user ? <ProfilePage user={user} /> : <div>Loading...</div>} 
        />
        <Route 
          path="/dashboard/settings" 
          element={user ? <SettingsPage user={user} /> : <div>Loading...</div>} 
        />

        {/* Admin Routes */}
        <Route
          path="/dashboard/admin"
          element={user && user.role === 'administrator' ? <AdminHomePage user={user} /> : <Navigate to="/auth/sign-in" />}
        />
        <Route
          path="/dashboard/admin/users"
          element={user && user.role === 'administrator' ? <UsersPage user={user} /> : <Navigate to="/auth/sign-in" />}
        />
        <Route
          path="/dashboard/admin/classes"
          element={user && user.role === 'administrator' ? <ClassesPage user={user} /> : <Navigate to="/auth/sign-in" />}
        />
        <Route
          path="/dashboard/admin/courses"
          element={user && user.role === 'administrator' ? <CoursesPage user={user} /> : <Navigate to="/auth/sign-in" />}
        />
        <Route
          path="/dashboard/admin/course/:id"
          element={user && user.role === 'administrator' ? <CourseContentPage user={user} /> : <Navigate to="/auth/sign-in" />}
        />
        <Route
          path="/dashboard/admin/analytics"
          element={user && user.role === 'administrator' ? <AnalyticsPage user={user} /> : <Navigate to="/auth/sign-in" />}
        />
        <Route
          path="/dashboard/admin/events"
          element={user && user.role === 'administrator' ? <EventsPage user={user} /> : <Navigate to="/auth/sign-in" />}
        />
        <Route
          path="/dashboard/admin/notifications"
          element={user && user.role === 'administrator' ? <NotificationsPage user={user} /> : <Navigate to="/auth/sign-in" />}
        />
        <Route
          path="/dashboard/admin/settings"
          element={user && user.role === 'administrator' ? <AdminSettingsPage user={user} /> : <Navigate to="/auth/sign-in" />}
        />
        <Route
          path="/dashboard/admin/profile"
          element={user && user.role === 'administrator' ? <ProfilePage user={user} /> : <Navigate to="/auth/sign-in" />}
        />
        
        {/* Administrator Routes (alias for Admin) */}
        <Route
          path="/dashboard/administrator"
          element={user && user.role === 'administrator' ? <AdminHomePage user={user} /> : <Navigate to="/auth/sign-in" />}
        />
        <Route
          path="/dashboard/administrator/users"
          element={user && user.role === 'administrator' ? <UsersPage user={user} /> : <Navigate to="/auth/sign-in" />}
        />
        <Route
          path="/dashboard/administrator/classes"
          element={user && user.role === 'administrator' ? <ClassesPage user={user} /> : <Navigate to="/auth/sign-in" />}
        />
        <Route
          path="/dashboard/administrator/courses"
          element={user && user.role === 'administrator' ? <CoursesPage user={user} /> : <Navigate to="/auth/sign-in" />}
        />
        <Route
          path="/dashboard/administrator/course/:id"
          element={user && user.role === 'administrator' ? <CourseContentPage user={user} /> : <Navigate to="/auth/sign-in" />}
        />
        <Route
          path="/dashboard/administrator/analytics"
          element={user && user.role === 'administrator' ? <AnalyticsPage user={user} /> : <Navigate to="/auth/sign-in" />}
        />
        <Route
          path="/dashboard/administrator/events"
          element={user && user.role === 'administrator' ? <EventsPage user={user} /> : <Navigate to="/auth/sign-in" />}
        />
        <Route
          path="/dashboard/administrator/notifications"
          element={user && user.role === 'administrator' ? <NotificationsPage user={user} /> : <Navigate to="/auth/sign-in" />}
        />
        <Route
          path="/dashboard/administrator/settings"
          element={user && user.role === 'administrator' ? <AdminSettingsPage user={user} /> : <Navigate to="/auth/sign-in" />}
        />
        <Route
          path="/dashboard/administrator/profile"
          element={user && user.role === 'administrator' ? <ProfilePage user={user} /> : <Navigate to="/auth/sign-in" />}
        />

        {/* Student Routes */}
        <Route
          path="/dashboard/student"
          element={user && user.role === 'student' ? <StudentDashboard user={user} /> : <Navigate to="/auth/sign-in" />}
        />
        <Route
          path="/dashboard/student/courses"
          element={user && user.role === 'student' ? <StudentCourses user={user} /> : <Navigate to="/auth/sign-in" />}
        />
        <Route
          path="/dashboard/student/materials"
          element={user && user.role === 'student' ? <StudentMaterials user={user} /> : <Navigate to="/auth/sign-in" />}
        />
        <Route
          path="/dashboard/student/library"
          element={user && user.role === 'student' ? <StudentLibrary user={user} /> : <Navigate to="/auth/sign-in" />}
        />
        <Route
          path="/dashboard/student/certificates"
          element={user && user.role === 'student' ? <StudentCertificates user={user} /> : <Navigate to="/auth/sign-in" />}
        />
        <Route
          path="/dashboard/student/attendance"
          element={user && user.role === 'student' ? <StudentAttendance user={user} /> : <Navigate to="/auth/sign-in" />}
        />
        <Route
          path="/dashboard/student/payments"
          element={user && user.role === 'student' ? <StudentPayments user={user} /> : <Navigate to="/auth/sign-in" />}
        />
        <Route
          path="/dashboard/student/documents"
          element={user && user.role === 'student' ? <StudentDocuments user={user} /> : <Navigate to="/auth/sign-in" />}
        />
        <Route
          path="/dashboard/student/assignments"
          element={user && user.role === 'student' ? <StudentAssignments user={user} /> : <Navigate to="/auth/sign-in" />}
        />
        <Route
          path="/dashboard/student/support"
          element={user && user.role === 'student' ? <StudentSupport user={user} /> : <Navigate to="/auth/sign-in" />}
        />
        <Route
          path="/dashboard/student/feedback"
          element={user && user.role === 'student' ? <StudentFeedback user={user} /> : <Navigate to="/auth/sign-in" />}
        />
        <Route
          path="/dashboard/student/schedule"
          element={user && user.role === 'student' ? <StudentSchedule user={user} /> : <Navigate to="/auth/sign-in" />}
        />
        <Route
          path="/dashboard/student/grades"
          element={user && user.role === 'student' ? <StudentGrades user={user} /> : <Navigate to="/auth/sign-in" />}
        />
        <Route
          path="/dashboard/student/profile"
          element={user && user.role === 'student' ? <ProfilePage user={user} /> : <Navigate to="/auth/sign-in" />}
        />
        <Route
          path="/dashboard/student/settings"
          element={user && user.role === 'student' ? <SettingsPage user={user} /> : <Navigate to="/auth/sign-in" />}
        />

        {/* Teacher Routes */}
        <Route
          path="/dashboard/teacher/*"
          element={
            <ProtectedRoute userRole="teacher">
              <Routes>
                <Route path="/" element={<TeacherDashboard user={user as User} />} />
                <Route path="/classes" element={<TeacherClasses user={user as User} />} />
                <Route path="/materials" element={<TeacherMaterials user={user as User} />} />
                <Route path="/students" element={<TeacherStudents user={user as User} />} />
                <Route path="/attendance" element={<TeacherAttendance user={user as User} />} />
                <Route path="/grading" element={<TeacherGrading user={user as User} />} />
                <Route path="/assignments" element={<TeacherAssignments user={user as User} />} />
                <Route path="/messages" element={<TeacherMessages user={user as User} />} />
                <Route path="/documents" element={<TeacherDocuments user={user as User} />} />
                <Route path="/calendar" element={<TeacherCalendar user={user as User} />} />
                <Route path="/analytics" element={<TeacherAnalytics user={user as User} />} />
                <Route path="/grades" element={<TeacherGrades user={user as User} />} />
                <Route path="/curriculum" element={<TeacherCurriculum user={user as User} />} />
                <Route path="/schedule" element={<TeacherSchedule user={user as User} />} />
                <Route path="/feedback" element={<TeacherFeedback user={user as User} />} />
                <Route path="/reports" element={<TeacherReports user={user as User} />} />
                <Route path="/profile" element={<ProfilePage user={user as User} />} />
                <Route path="/settings" element={<SettingsPage user={user as User} />} />
              </Routes>
            </ProtectedRoute>
          }
        />

        {/* Parent Routes */}
        <Route
          path="/dashboard/parent/*"
          element={
            <ProtectedRoute userRole="parent">
              <Routes>
                <Route path="/" element={<ParentDashboard user={user as User} />} />
                <Route path="/children" element={<ParentChildren user={user as User} />} />
                <Route path="/progress" element={<ParentProgress user={user as User} />} />
                <Route path="/monitoring" element={<ParentMonitoring user={user as User} />} />
                <Route path="/messages" element={<ParentMessages user={user as User} />} />
                <Route path="/payments" element={<ParentPayments user={user as User} />} />
                <Route path="/documents" element={<ParentDocuments user={user as User} />} />
                <Route path="/attendance" element={<ParentAttendance user={user as User} />} />
                <Route path="/grades" element={<ParentGrades user={user as User} />} />
                <Route path="/schedule" element={<ParentSchedule user={user as User} />} />
                <Route path="/feedback" element={<ParentFeedback user={user as User} />} />
                <Route path="/profile" element={<ProfilePage user={user as User} />} />
                <Route path="/settings" element={<SettingsPage user={user as User} />} />
              </Routes>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;