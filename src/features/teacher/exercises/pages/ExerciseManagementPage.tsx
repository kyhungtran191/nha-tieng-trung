import { Link } from 'react-router-dom'
import { Plus, Pencil } from 'lucide-react'
import { mockExercises } from '@/lib/mock/exercises'
import { PageHeader } from '@/components/shared/PageHeader'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { LessonStatusBadge } from '@/components/shared/StatusBadge'
import { formatDate } from '@/lib/utils'

export function ExerciseManagementPage() {
  return (
    <div>
      <PageHeader
        title="Quản lý bài tập"
        action={
          <Link to="/teacher/exercises/new">
            <Button size="sm"><Plus size={14} className="mr-1" /> Tạo bài tập</Button>
          </Link>
        }
      />
      <div className="space-y-2">
        {mockExercises.map((ex) => (
          <Card key={ex.id}>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <LessonStatusBadge status={ex.status} />
                  <Badge variant="secondary" className="font-mono">{ex.questions.length} câu</Badge>
                </div>
                <p className="font-medium text-ntc-dark truncate">{ex.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Hạn: {formatDate(ex.deadline)} · {ex.submissionsCount ?? 0} bài nộp
                </p>
              </div>
              <Link to={`/teacher/exercises/${ex.id}/edit`}>
                <Button size="sm" variant="outline"><Pencil size={12} className="mr-1" /> Sửa</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
