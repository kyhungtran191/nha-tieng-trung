import { useState } from 'react'
import { Link } from 'react-router-dom'
import { BookOpen } from 'lucide-react'
import { useAuthStore } from '@/store/auth.store'
import { mockLessons } from '@/lib/mock/lessons'
import { PageHeader } from '@/components/shared/PageHeader'
import { EmptyState } from '@/components/shared/EmptyState'
import { LessonStatusBadge } from '@/components/shared/StatusBadge'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { formatDate } from '@/lib/utils'

type Filter = 'all' | 'published' | 'draft'

export function LessonListPage() {
  const { user } = useAuthStore()
  const [filter, setFilter] = useState<Filter>('all')

  const lessons = mockLessons
    .filter((l) => l.classId === user?.classId)
    .filter((l) => filter === 'all' || l.status === filter)

  return (
    <div>
      <PageHeader title="Bài học" description={`Lớp ${user?.className ?? ''}`} />

      <Tabs value={filter} onValueChange={(v) => setFilter(v as Filter)} className="mb-4">
        <TabsList>
          <TabsTrigger value="all">Tất cả</TabsTrigger>
          <TabsTrigger value="published">Đã đăng</TabsTrigger>
          <TabsTrigger value="draft">Nháp</TabsTrigger>
        </TabsList>
      </Tabs>

      {lessons.length === 0 ? (
        <EmptyState icon={BookOpen} title="Chưa có bài học nào" description="Giáo viên chưa đăng bài học nào trong tuần này." />
      ) : (
        <div className="space-y-2">
          {lessons.map((lesson, idx) => (
            <Link key={lesson.id} to={`/student/lessons/${lesson.id}`}>
              <Card className="hover:border-ntc-red/30 hover:shadow-sm transition-all cursor-pointer">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="flex items-center justify-center w-10 h-10 bg-muted rounded font-mono text-sm font-bold text-muted-foreground shrink-0">
                    {String(idx + 1).padStart(2, '0')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                      <Badge variant="info">{lesson.subject}</Badge>
                      <LessonStatusBadge status={lesson.status} />
                    </div>
                    <p className="font-medium text-ntc-dark truncate">{lesson.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{formatDate(lesson.publishDate)}</p>
                  </div>
                  <div className="text-xs text-muted-foreground shrink-0">
                    {lesson.vocabulary.length} từ vựng
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
