import { Outlet, NavLink } from 'react-router-dom'
import { LayoutDashboard, BookOpen, ClipboardList, BookMarked, BarChart2, CalendarDays } from 'lucide-react'
import { Sidebar } from './Sidebar'
import { TopBar } from './TopBar'
import { useAuthStore } from '@/store/auth.store'
import { cn } from '@/lib/utils'

const navItems = [
  { label: 'Dashboard', href: '/student/dashboard', icon: LayoutDashboard },
  { label: 'Bài học', href: '/student/lessons', icon: BookOpen },
  { label: 'Bài tập', href: '/student/exercises', icon: ClipboardList },
  { label: 'Từ vựng', href: '/student/vocabulary', icon: BookMarked },
  { label: 'Tiến độ', href: '/student/progress', icon: BarChart2 },
  { label: 'Lịch học', href: '/student/schedule', icon: CalendarDays },
]

const mobileNavItems = navItems.slice(0, 5)

export function StudentLayout() {
  const { user } = useAuthStore()
  const greeting = user ? `Xin chào, ${user.name.split(' ').at(-1)}！` : ''

  return (
    <div className="flex h-screen bg-surface overflow-hidden">
      <Sidebar items={navItems} />

      <div className="flex flex-col flex-1 min-w-0">
        <TopBar greeting={greeting} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-border flex">
        {mobileNavItems.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            className={({ isActive }) =>
              cn(
                'flex-1 flex flex-col items-center justify-center py-2 gap-0.5 text-xs transition-colors',
                isActive ? 'text-ntc-red' : 'text-muted-foreground',
              )
            }
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
