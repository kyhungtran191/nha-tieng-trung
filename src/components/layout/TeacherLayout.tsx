import { Outlet } from 'react-router-dom'
import { LayoutDashboard, BookOpen, ClipboardList, Inbox, Users, Megaphone } from 'lucide-react'
import { Sidebar } from './Sidebar'
import { TopBar } from './TopBar'

const navItems = [
  { label: 'Dashboard', href: '/teacher/dashboard', icon: LayoutDashboard },
  { label: 'Bài học', href: '/teacher/lessons', icon: BookOpen },
  { label: 'Bài tập', href: '/teacher/exercises', icon: ClipboardList },
  { label: 'Bài nộp', href: '/teacher/submissions', icon: Inbox, badge: 3 },
  { label: 'Học sinh', href: '/teacher/students', icon: Users },
  { label: 'Thông báo', href: '/teacher/announcements', icon: Megaphone },
]

export function TeacherLayout() {
  return (
    <div className="flex h-screen bg-surface overflow-hidden">
      <Sidebar items={navItems} />
      <div className="flex flex-col flex-1 min-w-0">
        <TopBar />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
