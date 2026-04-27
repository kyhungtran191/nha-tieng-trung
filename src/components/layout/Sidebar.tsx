import { NavLink } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { useUIStore } from '@/store/ui.store'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface NavItem {
  label: string
  href: string
  icon: LucideIcon
  badge?: number
}

interface SidebarProps {
  items: NavItem[]
}

export function Sidebar({ items }: SidebarProps) {
  const { sidebarCollapsed, toggleSidebar } = useUIStore()

  return (
    <aside
      className={cn(
        'hidden md:flex flex-col h-full bg-white border-r border-border transition-all duration-200',
        sidebarCollapsed ? 'w-16' : 'w-60',
      )}
    >
      <div className={cn('flex items-center h-14 px-4 border-b border-border shrink-0', sidebarCollapsed && 'justify-center px-0')}>
        {!sidebarCollapsed && (
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <span className="text-xl font-noto text-ntc-red">家</span>
            <div className="min-w-0">
              <p className="text-sm font-bold tracking-tight text-ntc-dark leading-none truncate">Nhà Tiếng Trung</p>
              <p className="text-xs text-muted-foreground">中文之家</p>
            </div>
          </div>
        )}
        {sidebarCollapsed && <span className="text-xl font-noto text-ntc-red">家</span>}
      </div>

      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
        {items.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-2 py-2 text-sm rounded transition-colors',
                sidebarCollapsed && 'justify-center px-0',
                isActive
                  ? 'bg-ntc-red/10 text-ntc-red font-medium'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground',
              )
            }
            title={sidebarCollapsed ? item.label : undefined}
          >
            <item.icon size={18} className="shrink-0" />
            {!sidebarCollapsed && (
              <span className="flex-1 truncate">{item.label}</span>
            )}
            {!sidebarCollapsed && item.badge != null && item.badge > 0 && (
              <span className="ml-auto bg-ntc-red text-white text-xs font-mono px-1.5 py-0.5 rounded">
                {item.badge}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      <button
        onClick={toggleSidebar}
        className="flex items-center justify-center h-10 border-t border-border hover:bg-muted transition-colors text-muted-foreground"
      >
        {sidebarCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>
    </aside>
  )
}
