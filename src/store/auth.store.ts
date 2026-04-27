import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User, Role } from '@/types'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  login: (user: User) => void
  logout: () => void
  setMockRole: (role: Role) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      login: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
      setMockRole: (role) => {
        const current = get().user
        if (current) set({ user: { ...current, role } })
      },
    }),
    {
      name: 'ntc-auth',
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    },
  ),
)
