import { Link } from 'react-router-dom'
import { ClipboardList, Clock } from 'lucide-react'
import { useAuthStore } from '@/store/auth.store'
import { mockExercises } from '@/lib/mock/exercises'
import { mockSubmissions } from '@/lib/mock/submissions'
import { PageHeader } from '@/components/shared/PageHeader'
import { EmptyState } from '@/components/shared/EmptyState'
import { SubmissionStatusBadge } from '@/components/shared/StatusBadge'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { formatDate, formatRelativeTime } from '@/lib/utils'
import type { SubmissionStatus } from '@/types'

export function ExerciseListPage() {
  const { user } = useAuthStore()

  const exercises = mockExercises.filter((e) => e.classId === user?.classId)

  function getStatus(exerciseId: string): SubmissionStatus {
    const sub = mockSubmissions.find((s) => s.exerciseId === exerciseId && s.studentId === user?.id)
    return sub?.status ?? 'pending'
  }

  return (
    <div>
      <PageHeader title="Bài tập" description="Danh sách bài tập được giao" />

      {exercises.length === 0 ? (
        <EmptyState icon={ClipboardList} title="Chưa có bài tập nào" description="Giáo viên chưa giao bài tập nào." />
      ) : (
        <div className="space-y-2">
          {exercises.map((ex) => {
            const status = getStatus(ex.id)
            return (
              <Card key={ex.id} className="hover:border-ntc-red/30 transition-all">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <SubmissionStatusBadge status={status} />
                    </div>
                    <p className="font-medium text-ntc-dark truncate">{ex.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5 truncate">{ex.lessonTitle}</p>
                    <div className="flex items-center gap-1.5 mt-1">
                      <Clock size={12} className="text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">Hạn: {formatDate(ex.deadline)}</span>
                      <span className="text-xs font-medium text-amber-600">· {formatRelativeTime(ex.deadline)}</span>
                    </div>
                  </div>
                  <Link to={`/student/exercises/${ex.id}`}>
                    <Button size="sm" variant={status === 'pending' ? 'default' : 'outline'}>
                      {status === 'pending' ? 'Làm bài' : 'Xem lại'}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
