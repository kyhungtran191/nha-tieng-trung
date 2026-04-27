import { Link } from 'react-router-dom'
import { Users } from 'lucide-react'
import { getMockUsers } from '@/lib/mock/users'
import { mockSubmissions } from '@/lib/mock/submissions'
import { PageHeader } from '@/components/shared/PageHeader'
import { EmptyState } from '@/components/shared/EmptyState'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

export function StudentListPage() {
  const students = getMockUsers().filter((u) => u.role === 'student')

  function getAvgScore(studentId: string) {
    const graded = mockSubmissions.filter((s) => s.studentId === studentId && s.status === 'graded')
    if (graded.length === 0) return '—'
    const avg = Math.round(graded.reduce((sum, s) => sum + (s.totalScore ?? 0), 0) / graded.length)
    return avg
  }

  function getSubmissionCount(studentId: string) {
    return mockSubmissions.filter((s) => s.studentId === studentId).length
  }

  return (
    <div>
      <PageHeader title="Học sinh" description={`${students.length} học sinh`} />
      {students.length === 0 ? (
        <EmptyState icon={Users} title="Chưa có học sinh nào" />
      ) : (
        <div className="space-y-2">
          {students.map((student) => (
            <Card key={student.id}>
              <CardContent className="p-4 flex items-center gap-4">
                <Avatar className="h-10 w-10 shrink-0">
                  <AvatarFallback className="bg-ntc-red/10 text-ntc-red font-medium">
                    {student.name.split(' ').map((n) => n[0]).slice(-2).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-ntc-dark">{student.name}</p>
                  <p className="text-xs text-muted-foreground">{student.className} · {student.email}</p>
                </div>
                <div className="hidden md:flex items-center gap-6 text-sm text-muted-foreground shrink-0">
                  <div className="text-center">
                    <p className="font-mono font-bold text-ntc-dark">{getSubmissionCount(student.id)}</p>
                    <p className="text-xs">Bài đã nộp</p>
                  </div>
                  <div className="text-center">
                    <p className="font-mono font-bold text-ntc-dark">{getAvgScore(student.id)}</p>
                    <p className="text-xs">Điểm TB</p>
                  </div>
                </div>
                <Link to={`/teacher/students/${student.id}`}>
                  <Button size="sm" variant="outline">Xem</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
