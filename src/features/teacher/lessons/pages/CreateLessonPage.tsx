import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Trash2 } from 'lucide-react'
import { PageHeader } from '@/components/shared/PageHeader'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { mockClasses } from '@/lib/mock/users'

export function CreateLessonPage() {
  const navigate = useNavigate()
  const [vocab, setVocab] = useState([{ hanzi: '', pinyin: '', meaning: '' }])

  function addVocab() { setVocab((v) => [...v, { hanzi: '', pinyin: '', meaning: '' }]) }
  function removeVocab(i: number) { setVocab((v) => v.filter((_, idx) => idx !== i)) }

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      <PageHeader title="Tạo bài học mới" />

      <Card>
        <CardHeader><CardTitle className="text-sm">Thông tin bài học</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label>Tiêu đề bài học</Label>
            <Input placeholder="VD: Bài 1 - Xin chào và giới thiệu" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label>Môn học / Cấp độ</Label>
              <Select>
                <SelectTrigger><SelectValue placeholder="Chọn cấp độ" /></SelectTrigger>
                <SelectContent>
                  {['HSK1','HSK2','HSK3','HSK4'].map((h) => <SelectItem key={h} value={h}>{h}</SelectItem>)}
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
          <div className="space-y-1.5">
            <Label>Ngày đăng</Label>
            <Input type="date" />
          </div>
          <div className="space-y-1.5">
            <Label>Link video (YouTube)</Label>
            <Input placeholder="https://youtube.com/..." />
          </div>
          <div className="space-y-1.5">
            <Label>Ghi chú giáo viên</Label>
            <Textarea placeholder="Hướng dẫn học sinh cần chú ý..." className="min-h-[100px]" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm">Từ vựng</CardTitle>
            <Button size="sm" variant="outline" onClick={addVocab}><Plus size={12} className="mr-1" /> Thêm từ</Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          {vocab.map((v, i) => (
            <div key={i} className="grid grid-cols-[1fr_1fr_1fr_auto] gap-2 items-center">
              <Input placeholder="Hán tự" value={v.hanzi} onChange={(e) => setVocab((prev) => prev.map((x, idx) => idx === i ? { ...x, hanzi: e.target.value } : x))} className="font-noto" />
              <Input placeholder="Pinyin" value={v.pinyin} onChange={(e) => setVocab((prev) => prev.map((x, idx) => idx === i ? { ...x, pinyin: e.target.value } : x))} />
              <Input placeholder="Nghĩa tiếng Việt" value={v.meaning} onChange={(e) => setVocab((prev) => prev.map((x, idx) => idx === i ? { ...x, meaning: e.target.value } : x))} />
              <Button size="icon" variant="ghost" onClick={() => removeVocab(i)} className="text-muted-foreground hover:text-ntc-red">
                <Trash2 size={14} />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={() => navigate('/teacher/lessons')}>Hủy</Button>
        <Button variant="outline">Lưu nháp</Button>
        <Button onClick={() => navigate('/teacher/lessons')}>Đăng bài</Button>
      </div>
    </div>
  )
}
