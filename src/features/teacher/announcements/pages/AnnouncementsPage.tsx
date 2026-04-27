import { useState } from 'react'
import { Plus, Megaphone } from 'lucide-react'
import { mockAnnouncements, mockClasses } from '@/lib/mock/users'
import { PageHeader } from '@/components/shared/PageHeader'
import { EmptyState } from '@/components/shared/EmptyState'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { formatDate } from '@/lib/utils'

export function AnnouncementsPage() {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <PageHeader
        title="Thông báo"
        action={
          <Button size="sm" onClick={() => setOpen(true)}>
            <Plus size={14} className="mr-1" /> Đăng thông báo
          </Button>
        }
      />

      {mockAnnouncements.length === 0 ? (
        <EmptyState icon={Megaphone} title="Chưa có thông báo nào" description="Đăng thông báo để học sinh nắm được lịch học." />
      ) : (
        <div className="space-y-3">
          {mockAnnouncements.map((ann) => (
            <Card key={ann.id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="info">{ann.className}</Badge>
                      <span className="text-xs text-muted-foreground">{formatDate(ann.publishedAt)}</span>
                    </div>
                    <p className="font-semibold text-ntc-dark">{ann.title}</p>
                    <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{ann.body}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Đăng thông báo mới</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label>Tiêu đề</Label>
              <Input placeholder="VD: Nghỉ lễ 30/4..." />
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
            <div className="space-y-1.5">
              <Label>Nội dung</Label>
              <Textarea placeholder="Nội dung thông báo..." className="min-h-[100px]" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" size="sm" onClick={() => setOpen(false)}>Hủy</Button>
            <Button size="sm" onClick={() => setOpen(false)}>Đăng</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
