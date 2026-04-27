import { useParams, useNavigate } from 'react-router-dom'
import { mockExercises } from '@/lib/mock/exercises'
import { PageHeader } from '@/components/shared/PageHeader'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export function EditExercisePage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const exercise = mockExercises.find((e) => e.id === id)

  if (!exercise) return <div className="text-center py-16 text-muted-foreground">Không tìm thấy bài tập.</div>

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      <PageHeader title="Chỉnh sửa bài tập" />

      <Card>
        <CardHeader><CardTitle className="text-sm">Thông tin</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label>Tiêu đề</Label>
            <Input defaultValue={exercise.title} />
          </div>
          <div className="space-y-1.5">
            <Label>Hạn nộp</Label>
            <Input type="datetime-local" defaultValue={exercise.deadline.slice(0, 16)} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-sm">Câu hỏi ({exercise.questions.length} câu)</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {exercise.questions.map((q, i) => (
            <div key={q.id} className="border border-border rounded p-3 space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-muted-foreground">C{i + 1}.</span>
                <Badge variant="secondary" className="text-xs">{q.type}</Badge>
                <span className="ml-auto text-xs font-mono text-muted-foreground">{q.points}đ</span>
              </div>
              <Textarea defaultValue={q.text} className="min-h-[60px] text-sm" />
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={() => navigate('/teacher/exercises')}>Hủy</Button>
        <Button onClick={() => navigate('/teacher/exercises')}>Lưu thay đổi</Button>
      </div>
    </div>
  )
}
