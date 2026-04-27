import { Navigate } from 'react-router-dom'
import type { ReactNode } from 'react'
import type { Role } from '@/types'
import { useAuthStore } from '@/store/auth.store'

interface AuthGuardProps {
  role: Role
  children: ReactNode
}

export function AuthGuard({ role, children }: AuthGuardProps) {
  const { isAuthenticated, user } = useAuthStore()

  if (!isAuthenticated || !user) return <Navigate to="/login" replace />

  if (user.role !== role) {
    const redirectMap: Record<Role, string> = {
      student: '/student/dashboard',
      teacher: '/teacher/dashboard',
      admin: '/admin/dashboard',
    }
    return <Navigate to={redirectMap[user.role]} replace />
  }

  return <>{children}</>
}
