import { useState } from 'react'
import { Plus, GraduationCap } from 'lucide-react'
import { mockClasses, getMockUsers } from '@/lib/mock/users'
import { PageHeader } from '@/components/shared/PageHeader'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'

export function ClassManagementPage() {
  const [open, setOpen] = useState(false)
  const teachers = getMockUsers().filter((u) => u.role === 'teacher')

  return (
    <div>
      <PageHeader
        title="Lớp học"
        description={`${mockClasses.length} lớp`}
        action={
          <Button size="sm" onClick={() => setOpen(true)}>
            <Plus size={14} className="mr-1" /> Tạo lớp
          </Button>
        }
      />
      <div className="space-y-2">
        {mockClasses.map((cls) => (
          <Card key={cls.id}>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="p-2 bg-ntc-red/10 rounded shrink-0">
                <GraduationCap size={18} className="text-ntc-red" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="font-semibold text-ntc-dark">{cls.name}</p>
                  <Badge variant={cls.status === 'active' ? 'success' : 'secondary'}>
                    {cls.status === 'active' ? 'Đang học' : 'Đã kết thúc'}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">GV: {cls.teacherName} · {cls.schedule}</p>
                <p className="text-xs text-muted-foreground font-mono">{cls.studentCount} học sinh</p>
              </div>
              <Button size="sm" variant="outline">Sửa</Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader><DialogTitle>Tạo lớp học mới</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label>Tên lớp</Label>
              <Input placeholder="VD: HSK2 - Thứ 3&5" />
            </div>
            <div className="space-y-1.5">
              <Label>Giáo viên phụ trách</Label>
              <Select>
                <SelectTrigger><SelectValue placeholder="Chọn giáo viên" /></SelectTrigger>
                <SelectContent>
                  {teachers.map((t) => <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Lịch học</Label>
              <Input placeholder="VD: Thứ 3 & 5, 18:00-20:00" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" size="sm" onClick={() => setOpen(false)}>Hủy</Button>
            <Button size="sm" onClick={() => setOpen(false)}>Tạo lớp</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
