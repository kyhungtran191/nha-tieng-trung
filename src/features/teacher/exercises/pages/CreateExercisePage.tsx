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
import { mockLessons } from '@/lib/mock/lessons'
import type { QuestionType } from '@/types'

const questionTypes: { value: QuestionType; label: string }[] = [
  { value: 'multiple_choice', label: 'Trắc nghiệm' },
  { value: 'fill_blank', label: 'Điền vào chỗ trống' },
  { value: 'matching', label: 'Nối từ' },
  { value: 'essay', label: 'Tự luận' },
  { value: 'file_upload', label: 'Nộp file' },
]

export function CreateExercisePage() {
  const navigate = useNavigate()
  const [questions, setQuestions] = useState<Array<{ type: QuestionType; text: string; points: number }>>([
    { type: 'multiple_choice', text: '', points: 25 },
  ])

  function addQuestion() {
    setQuestions((q) => [...q, { type: 'multiple_choice', text: '', points: 25 }])
  }

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      <PageHeader title="Tạo bài tập mới" />

      <Card>
        <CardHeader><CardTitle className="text-sm">Thông tin bài tập</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label>Tiêu đề bài tập</Label>
            <Input placeholder="VD: Bài tập từ vựng bài 1" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label>Liên kết bài học</Label>
              <Select>
                <SelectTrigger><SelectValue placeholder="Chọn bài học" /></SelectTrigger>
                <SelectContent>
                  {mockLessons.map((l) => <SelectItem key={l.id} value={l.id}>{l.title}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Hạn nộp</Label>
              <Input type="datetime-local" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm">Câu hỏi ({questions.length} câu)</CardTitle>
            <Button size="sm" variant="outline" onClick={addQuestion}><Plus size={12} className="mr-1" /> Thêm câu</Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {questions.map((q, i) => (
            <div key={i} className="border border-border rounded p-3 space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-muted-foreground w-8">C{i + 1}.</span>
                <Select value={q.type} onValueChange={(v) => setQuestions((prev) => prev.map((x, idx) => idx === i ? { ...x, type: v as QuestionType } : x))}>
                  <SelectTrigger className="flex-1 h-8 text-xs"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {questionTypes.map((t) => <SelectItem key={t.value} value={t.value} className="text-xs">{t.label}</SelectItem>)}
                  </SelectContent>
                </Select>
                <Input type="number" className="w-20 h-8 text-xs font-mono" value={q.points} min={1} onChange={(e) => setQuestions((prev) => prev.map((x, idx) => idx === i ? { ...x, points: Number(e.target.value) } : x))} />
                <span className="text-xs text-muted-foreground">đ</span>
                <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-ntc-red" onClick={() => setQuestions((prev) => prev.filter((_, idx) => idx !== i))}>
                  <Trash2 size={12} />
                </Button>
              </div>
              <Textarea placeholder="Nội dung câu hỏi..." className="min-h-[60px] text-sm" value={q.text} onChange={(e) => setQuestions((prev) => prev.map((x, idx) => idx === i ? { ...x, text: e.target.value } : x))} />
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={() => navigate('/teacher/exercises')}>Hủy</Button>
        <Button variant="outline">Lưu nháp</Button>
        <Button onClick={() => navigate('/teacher/exercises')}>Đăng bài tập</Button>
      </div>
    </div>
  )
}
