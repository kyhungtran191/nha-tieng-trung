import { Navigate } from 'react-router-dom'
import { useAuthStore } from '@/store/auth.store'

export function RoleRedirect() {
  const { isAuthenticated, user } = useAuthStore()

  if (!isAuthenticated || !user) return <Navigate to="/login" replace />

  const redirectMap = {
    student: '/student/dashboard',
    teacher: '/teacher/dashboard',
    admin: '/admin/dashboard',
  }

  return <Navigate to={redirectMap[user.role]} replace />
}
