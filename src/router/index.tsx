import { createBrowserRouter, Navigate } from 'react-router-dom'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { StudentLayout } from '@/components/layout/StudentLayout'
import { TeacherLayout } from '@/components/layout/TeacherLayout'
import { AdminLayout } from '@/components/layout/AdminLayout'
import { AuthGuard } from '@/features/auth/components/AuthGuard'
import { RoleRedirect } from '@/features/auth/components/RoleRedirect'

import { LoginPage } from '@/features/auth/pages/LoginPage'
import { RegisterPage } from '@/features/auth/pages/RegisterPage'
import { ForgotPasswordPage } from '@/features/auth/pages/ForgotPasswordPage'

import { StudentDashboardPage } from '@/features/student/dashboard/pages/StudentDashboardPage'
import { LessonListPage } from '@/features/student/lessons/pages/LessonListPage'
import { LessonDetailPage } from '@/features/student/lessons/pages/LessonDetailPage'
import { ExerciseListPage } from '@/features/student/exercises/pages/ExerciseListPage'
import { ExerciseDetailPage } from '@/features/student/exercises/pages/ExerciseDetailPage'
import { VocabularyPage } from '@/features/student/vocabulary/pages/VocabularyPage'
import { ProgressPage } from '@/features/student/progress/pages/ProgressPage'
import { SchedulePage } from '@/features/student/schedule/pages/SchedulePage'

import { TeacherDashboardPage } from '@/features/teacher/dashboard/pages/TeacherDashboardPage'
import { LessonManagementPage } from '@/features/teacher/lessons/pages/LessonManagementPage'
import { CreateLessonPage } from '@/features/teacher/lessons/pages/CreateLessonPage'
import { EditLessonPage } from '@/features/teacher/lessons/pages/EditLessonPage'
import { ExerciseManagementPage } from '@/features/teacher/exercises/pages/ExerciseManagementPage'
import { CreateExercisePage } from '@/features/teacher/exercises/pages/CreateExercisePage'
import { EditExercisePage } from '@/features/teacher/exercises/pages/EditExercisePage'
import { SubmissionsInboxPage } from '@/features/teacher/submissions/pages/SubmissionsInboxPage'
import { SubmissionDetailPage } from '@/features/teacher/submissions/pages/SubmissionDetailPage'
import { StudentListPage } from '@/features/teacher/students/pages/StudentListPage'
import { StudentProgressPage } from '@/features/teacher/students/pages/StudentProgressPage'
import { AnnouncementsPage } from '@/features/teacher/announcements/pages/AnnouncementsPage'

import { AdminDashboardPage } from '@/features/admin/dashboard/pages/AdminDashboardPage'
import { UserManagementPage } from '@/features/admin/users/pages/UserManagementPage'
import { ClassManagementPage } from '@/features/admin/classes/pages/ClassManagementPage'
import { EnrollmentPage } from '@/features/admin/enrollment/pages/EnrollmentPage'
import { PaymentStatusPage } from '@/features/admin/payments/pages/PaymentStatusPage'
import { AnalyticsPage } from '@/features/admin/analytics/pages/AnalyticsPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RoleRedirect />,
  },
  {
    element: <PublicLayout />,
    children: [
      { path: '/login', element: <LoginPage /> },
      { path: '/register', element: <RegisterPage /> },
      { path: '/forgot-password', element: <ForgotPasswordPage /> },
    ],
  },
  {
    path: '/student',
    element: <AuthGuard role="student"><StudentLayout /></AuthGuard>,
    children: [
      { index: true, element: <Navigate to="/student/dashboard" replace /> },
      { path: 'dashboard', element: <StudentDashboardPage /> },
      { path: 'lessons', element: <LessonListPage /> },
      { path: 'lessons/:id', element: <LessonDetailPage /> },
      { path: 'exercises', element: <ExerciseListPage /> },
      { path: 'exercises/:id', element: <ExerciseDetailPage /> },
      { path: 'vocabulary', element: <VocabularyPage /> },
      { path: 'progress', element: <ProgressPage /> },
      { path: 'schedule', element: <SchedulePage /> },
    ],
  },
  {
    path: '/teacher',
    element: <AuthGuard role="teacher"><TeacherLayout /></AuthGuard>,
    children: [
      { index: true, element: <Navigate to="/teacher/dashboard" replace /> },
      { path: 'dashboard', element: <TeacherDashboardPage /> },
      { path: 'lessons', element: <LessonManagementPage /> },
      { path: 'lessons/new', element: <CreateLessonPage /> },
      { path: 'lessons/:id/edit', element: <EditLessonPage /> },
      { path: 'exercises', element: <ExerciseManagementPage /> },
      { path: 'exercises/new', element: <CreateExercisePage /> },
      { path: 'exercises/:id/edit', element: <EditExercisePage /> },
      { path: 'submissions', element: <SubmissionsInboxPage /> },
      { path: 'submissions/:id', element: <SubmissionDetailPage /> },
      { path: 'students', element: <StudentListPage /> },
      { path: 'students/:id', element: <StudentProgressPage /> },
      { path: 'announcements', element: <AnnouncementsPage /> },
    ],
  },
  {
    path: '/admin',
    element: <AuthGuard role="admin"><AdminLayout /></AuthGuard>,
    children: [
      { index: true, element: <Navigate to="/admin/dashboard" replace /> },
      { path: 'dashboard', element: <AdminDashboardPage /> },
      { path: 'users', element: <UserManagementPage /> },
      { path: 'classes', element: <ClassManagementPage /> },
      { path: 'enrollment', element: <EnrollmentPage /> },
      { path: 'payments', element: <PaymentStatusPage /> },
      { path: 'analytics', element: <AnalyticsPage /> },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
])
