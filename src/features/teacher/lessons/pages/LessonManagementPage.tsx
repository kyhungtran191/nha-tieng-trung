import { Link } from 'react-router-dom'
import { Plus, Pencil } from 'lucide-react'
import { mockLessons } from '@/lib/mock/lessons'
import { PageHeader } from '@/components/shared/PageHeader'
import { LessonStatusBadge } from '@/components/shared/StatusBadge'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { formatDate } from '@/lib/utils'

export function LessonManagementPage() {
  return (
    <div>
      <PageHeader
        title="Quản lý bài học"
        action={
          <Link to="/teacher/lessons/new">
            <Button size="sm"><Plus size={14} className="mr-1" /> Tạo bài học</Button>
          </Link>
        }
      />
      <div className="space-y-2">
        {mockLessons.map((lesson) => (
          <Card key={lesson.id}>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <Badge variant="info">{lesson.subject}</Badge>
                  <LessonStatusBadge status={lesson.status} />
                  <span className="text-xs text-muted-foreground">{lesson.className}</span>
                </div>
                <p className="font-medium text-ntc-dark truncate">{lesson.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{formatDate(lesson.publishDate)} · {lesson.vocabulary.length} từ vựng</p>
              </div>
              <Link to={`/teacher/lessons/${lesson.id}/edit`}>
                <Button size="sm" variant="outline">
                  <Pencil size={12} className="mr-1" /> Sửa
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
