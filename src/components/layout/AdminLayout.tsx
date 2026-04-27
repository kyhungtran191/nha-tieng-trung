import { Outlet } from 'react-router-dom'
import { LayoutDashboard, Users, GraduationCap, UserPlus, CreditCard, BarChart2 } from 'lucide-react'
import { Sidebar } from './Sidebar'
import { TopBar } from './TopBar'

const navItems = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Người dùng', href: '/admin/users', icon: Users },
  { label: 'Lớp học', href: '/admin/classes', icon: GraduationCap },
  { label: 'Đăng ký', href: '/admin/enrollment', icon: UserPlus },
  { label: 'Học phí', href: '/admin/payments', icon: CreditCard },
  { label: 'Thống kê', href: '/admin/analytics', icon: BarChart2 },
]

export function AdminLayout() {
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
