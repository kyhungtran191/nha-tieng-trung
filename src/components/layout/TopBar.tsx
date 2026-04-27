import { Bell, LogOut, User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAuthStore } from '@/store/auth.store'

interface TopBarProps {
  greeting?: string
}

export function TopBar({ greeting }: TopBarProps) {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()

  const initials = user?.name
    .split(' ')
    .map((n) => n[0])
    .slice(-2)
    .join('')
    .toUpperCase() ?? 'U'

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <header className="h-14 bg-white border-b border-border flex items-center px-4 gap-4 shrink-0">
      <div className="flex-1 min-w-0">
        {greeting && (
          <p className="text-sm text-muted-foreground truncate">{greeting}</p>
        )}
      </div>

      <Button variant="ghost" size="icon" className="relative">
        <Bell size={18} />
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-ntc-red/10 text-ntc-red text-xs font-medium">
                {initials}
              </AvatarFallback>
            </Avatar>
            {user && (
              <span className="hidden sm:block text-sm font-medium text-foreground max-w-[120px] truncate">
                {user.name}
              </span>
            )}
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuLabel className="font-normal">
            <p className="text-sm font-medium">{user?.name}</p>
            <p className="text-xs text-muted-foreground">{user?.email}</p>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <User size={14} className="mr-2" />
            Hồ sơ
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout} className="text-ntc-red focus:text-ntc-red">
            <LogOut size={14} className="mr-2" />
            Đăng xuất
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}
