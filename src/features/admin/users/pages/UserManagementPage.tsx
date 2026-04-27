import { useState } from 'react'
import { UserPlus, Users } from 'lucide-react'
import { getMockUsers } from '@/lib/mock/users'
import { PageHeader } from '@/components/shared/PageHeader'
import { EmptyState } from '@/components/shared/EmptyState'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { Role } from '@/types'

export function UserManagementPage() {
  const [tab, setTab] = useState<'student' | 'teacher'>('student')
  const [inviteOpen, setInviteOpen] = useState(false)

  const users = getMockUsers().filter((u) => u.role === tab)

  const roleBadgeVariant: Record<Role, 'info' | 'success' | 'secondary'> = {
    student: 'info',
    teacher: 'success',
    admin: 'secondary',
  }

  return (
    <div>
      <PageHeader
        title="Người dùng"
        description={`${getMockUsers().length} tài khoản`}
        action={
          <Button size="sm" onClick={() => setInviteOpen(true)}>
            <UserPlus size={14} className="mr-1" /> Mời người dùng
          </Button>
        }
      />

      <Tabs value={tab} onValueChange={(v) => setTab(v as typeof tab)} className="mb-4">
        <TabsList>
          <TabsTrigger value="student">Học sinh ({getMockUsers().filter(u => u.role === 'student').length})</TabsTrigger>
          <TabsTrigger value="teacher">Giáo viên ({getMockUsers().filter(u => u.role === 'teacher').length})</TabsTrigger>
        </TabsList>
      </Tabs>

      {users.length === 0 ? (
        <EmptyState icon={Users} title="Chưa có người dùng nào" />
      ) : (
        <div className="space-y-2">
          {users.map((user) => (
            <Card key={user.id}>
              <CardContent className="p-4 flex items-center gap-4">
                <Avatar className="h-9 w-9 shrink-0">
                  <AvatarFallback className="bg-ntc-red/10 text-ntc-red text-xs font-bold">
                    {user.name.split(' ').map(n => n[0]).slice(-2).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-ntc-dark">{user.name}</p>
                    <Badge variant={roleBadgeVariant[user.role]}>{user.role === 'student' ? 'Học sinh' : 'Giáo viên'}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                  {user.className && <p className="text-xs text-muted-foreground">{user.className}</p>}
                </div>
                <div className="flex gap-2 shrink-0">
                  <Button size="sm" variant="ghost" className="text-xs text-muted-foreground">Vô hiệu</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={inviteOpen} onOpenChange={setInviteOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader><DialogTitle>Mời người dùng</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label>Email</Label>
              <Input type="email" placeholder="email@example.com" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" size="sm" onClick={() => setInviteOpen(false)}>Hủy</Button>
            <Button size="sm" onClick={() => setInviteOpen(false)}>Gửi lời mời</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
