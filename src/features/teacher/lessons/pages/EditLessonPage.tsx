import { useParams, useNavigate } from 'react-router-dom'
import { mockLessons } from '@/lib/mock/lessons'
import { PageHeader } from '@/components/shared/PageHeader'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function EditLessonPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const lesson = mockLessons.find((l) => l.id === id)

  if (!lesson) return <div className="text-center py-16 text-muted-foreground">Không tìm thấy bài học.</div>

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      <PageHeader title="Chỉnh sửa bài học" />

      <Card>
        <CardHeader><CardTitle className="text-sm">Thông tin bài học</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label>Tiêu đề</Label>
            <Input defaultValue={lesson.title} />
          </div>
          <div className="space-y-1.5">
            <Label>Link video</Label>
            <Input defaultValue={lesson.videoUrl} />
          </div>
          <div className="space-y-1.5">
            <Label>Ghi chú giáo viên</Label>
            <Textarea defaultValue={lesson.teacherNotes} className="min-h-[100px]" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-sm">Từ vựng ({lesson.vocabulary.length} từ)</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          {lesson.vocabulary.map((v) => (
            <div key={v.id} className="grid grid-cols-3 gap-2">
              <Input defaultValue={v.hanzi} className="font-noto" />
              <Input defaultValue={v.pinyin} />
              <Input defaultValue={v.meaning} />
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={() => navigate('/teacher/lessons')}>Hủy</Button>
        <Button onClick={() => navigate('/teacher/lessons')}>Lưu thay đổi</Button>
      </div>
    </div>
  )
}
