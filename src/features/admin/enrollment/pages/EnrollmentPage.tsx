import { useState } from 'react'
import { Plus, UserPlus } from 'lucide-react'
import { mockEnrollments, mockClasses, getMockUsers } from '@/lib/mock/users'
import { PageHeader } from '@/components/shared/PageHeader'
import { EmptyState } from '@/components/shared/EmptyState'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { formatDate } from '@/lib/utils'

export function EnrollmentPage() {
  const [open, setOpen] = useState(false)
  const students = getMockUsers().filter((u) => u.role === 'student')

  return (
    <div>
      <PageHeader
        title="Đăng ký học"
        description={`${mockEnrollments.length} học viên đang đăng ký`}
        action={
          <Button size="sm" onClick={() => setOpen(true)}>
            <Plus size={14} className="mr-1" /> Đăng ký học viên
          </Button>
        }
      />

      {mockEnrollments.length === 0 ? (
        <EmptyState icon={UserPlus} title="Chưa có đăng ký nào" />
      ) : (
        <div className="space-y-2">
          {mockEnrollments.map((e) => (
            <Card key={e.id}>
              <CardContent className="p-4 flex items-center gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="font-medium text-ntc-dark">{e.studentName}</p>
                    <Badge variant={e.status === 'active' ? 'success' : e.status === 'pending' ? 'warning' : 'secondary'}>
                      {e.status === 'active' ? 'Đang học' : e.status === 'pending' ? 'Chờ duyệt' : 'Đã nghỉ'}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{e.className} · Ngày vào: {formatDate(e.enrolledDate)}</p>
                </div>
                <Button size="sm" variant="ghost" className="text-xs text-muted-foreground">Xóa</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader><DialogTitle>Đăng ký học viên vào lớp</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label>Học viên</Label>
              <Select>
                <SelectTrigger><SelectValue placeholder="Chọn học viên" /></SelectTrigger>
                <SelectContent>
                  {students.map((s) => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Lớp</Label>
              <Select>
                <SelectTrigger><SelectValue placeholder="Chọn lớp" /></SelectTrigger>
                <SelectContent>
                  {mockClasses.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" size="sm" onClick={() => setOpen(false)}>Hủy</Button>
            <Button size="sm" onClick={() => setOpen(false)}>Đăng ký</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
