import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Inbox } from 'lucide-react'
import { mockSubmissions } from '@/lib/mock/submissions'
import { PageHeader } from '@/components/shared/PageHeader'
import { EmptyState } from '@/components/shared/EmptyState'
import { SubmissionStatusBadge } from '@/components/shared/StatusBadge'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { formatDate } from '@/lib/utils'
import type { SubmissionStatus } from '@/types'

export function SubmissionsInboxPage() {
  const [filter, setFilter] = useState<'all' | SubmissionStatus>('all')

  const submissions = mockSubmissions.filter((s) => filter === 'all' || s.status === filter)

  return (
    <div>
      <PageHeader title="Bài nộp" description={`${mockSubmissions.filter(s => s.status === 'pending').length} bài chờ chấm`} />

      <Tabs value={filter} onValueChange={(v) => setFilter(v as typeof filter)} className="mb-4">
        <TabsList>
          <TabsTrigger value="all">Tất cả ({mockSubmissions.length})</TabsTrigger>
          <TabsTrigger value="pending">Chờ chấm ({mockSubmissions.filter(s => s.status === 'pending').length})</TabsTrigger>
          <TabsTrigger value="submitted">Đã nộp</TabsTrigger>
          <TabsTrigger value="graded">Đã chấm</TabsTrigger>
        </TabsList>
      </Tabs>

      {submissions.length === 0 ? (
        <EmptyState icon={Inbox} title="Không có bài nộp nào" />
      ) : (
        <div className="space-y-2">
          {submissions.map((s) => (
            <Card key={s.id} className={s.status === 'pending' ? 'border-amber-200' : ''}>
              <CardContent className="p-4 flex items-center gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <SubmissionStatusBadge status={s.status} />
                    <span className="text-xs text-muted-foreground">{s.className}</span>
                  </div>
                  <p className="font-medium text-ntc-dark">{s.studentName}</p>
                  <p className="text-xs text-muted-foreground truncate">{s.exerciseTitle}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Nộp: {formatDate(s.submittedAt)}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {s.totalScore != null && (
                    <span className="font-mono text-sm font-bold text-ntc-dark">{s.totalScore}/{s.maxScore}</span>
                  )}
                  <Link to={`/teacher/submissions/${s.id}`}>
                    <Button size="sm" variant={s.status === 'pending' ? 'default' : 'outline'}>
                      {s.status === 'pending' ? 'Chấm bài' : 'Xem'}
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
