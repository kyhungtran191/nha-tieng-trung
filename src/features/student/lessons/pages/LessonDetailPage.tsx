import { useParams, Link, useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight, ArrowLeft, ClipboardList } from 'lucide-react'
import { mockLessons } from '@/lib/mock/lessons'
import { mockExercises } from '@/lib/mock/exercises'
import { useAuthStore } from '@/store/auth.store'
import { PageHeader } from '@/components/shared/PageHeader'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatDate } from '@/lib/utils'

export function LessonDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { user } = useAuthStore()
  const navigate = useNavigate()

  const classLessons = mockLessons.filter((l) => l.classId === user?.classId && l.status === 'published')
  const lessonIdx = classLessons.findIndex((l) => l.id === id)
  const lesson = classLessons[lessonIdx]
  const prevLesson = classLessons[lessonIdx - 1]
  const nextLesson = classLessons[lessonIdx + 1]
  const linkedExercise = mockExercises.find((e) => e.lessonId === id)

  if (!lesson) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground">Không tìm thấy bài học.</p>
        <Link to="/student/lessons"><Button variant="outline" className="mt-4" size="sm">Quay lại</Button></Link>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto space-y-5">
      <button onClick={() => navigate('/student/lessons')} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft size={14} /> Danh sách bài học
      </button>

      <PageHeader
        title={lesson.title}
        action={linkedExercise && (
          <Link to={`/student/exercises/${linkedExercise.id}`}>
            <Button size="sm">
              <ClipboardList size={14} className="mr-1" /> Làm bài tập
            </Button>
          </Link>
        )}
      />

      <div className="flex items-center gap-2 flex-wrap">
        <Badge variant="info">{lesson.subject}</Badge>
        <span className="text-xs text-muted-foreground">{formatDate(lesson.publishDate)}</span>
      </div>

      {/* Video */}
      {lesson.videoUrl ? (
        <div className="aspect-video bg-ntc-dark rounded overflow-hidden">
          <iframe src={lesson.videoUrl} className="w-full h-full" allowFullScreen title={lesson.title} />
        </div>
      ) : (
        <div className="aspect-video bg-muted rounded flex items-center justify-center">
          <p className="text-sm text-muted-foreground">Video chưa được đăng tải</p>
        </div>
      )}

      {/* Teacher notes */}
      {lesson.teacherNotes && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Ghi chú của giáo viên</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-foreground leading-relaxed">{lesson.teacherNotes}</p>
          </CardContent>
        </Card>
      )}

      {/* Vocabulary */}
      {lesson.vocabulary.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Từ vựng bài học ({lesson.vocabulary.length} từ)</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left px-4 py-2 font-medium text-muted-foreground">Hán tự</th>
                  <th className="text-left px-4 py-2 font-medium text-muted-foreground">Pinyin</th>
                  <th className="text-left px-4 py-2 font-medium text-muted-foreground">Nghĩa</th>
                </tr>
              </thead>
              <tbody>
                {lesson.vocabulary.map((v, i) => (
                  <tr key={v.id} className={i % 2 === 0 ? 'bg-white' : 'bg-surface'}>
                    <td className="px-4 py-2.5 font-noto text-lg text-ntc-dark">{v.hanzi}</td>
                    <td className="px-4 py-2.5 font-mono text-muted-foreground">{v.pinyin}</td>
                    <td className="px-4 py-2.5 text-foreground">{v.meaning}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between pt-2 border-t border-border">
        {prevLesson ? (
          <Link to={`/student/lessons/${prevLesson.id}`}>
            <Button variant="outline" size="sm">
              <ChevronLeft size={14} className="mr-1" /> Bài trước
            </Button>
          </Link>
        ) : <div />}
        {nextLesson ? (
          <Link to={`/student/lessons/${nextLesson.id}`}>
            <Button variant="outline" size="sm">
              Bài tiếp <ChevronRight size={14} className="ml-1" />
            </Button>
          </Link>
        ) : <div />}
      </div>
    </div>
  )
}
