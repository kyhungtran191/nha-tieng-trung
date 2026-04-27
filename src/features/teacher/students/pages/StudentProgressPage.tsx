import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { getMockUsers } from '@/lib/mock/users'
import { mockSubmissions } from '@/lib/mock/submissions'
import { PageHeader } from '@/components/shared/PageHeader'
import { SubmissionStatusBadge } from '@/components/shared/StatusBadge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { formatDate } from '@/lib/utils'

const mockAttendance = [
  { date: '2026-04-22', status: 'present' as const },
  { date: '2026-04-24', status: 'present' as const },
  { date: '2026-04-27', status: 'absent' as const },
]

export function StudentProgressPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const student = getMockUsers().find((u) => u.id === id)
  const submissions = mockSubmissions.filter((s) => s.studentId === id)
  const graded = submissions.filter((s) => s.status === 'graded')
  const avgScore = graded.length > 0
    ? Math.round(graded.reduce((sum, s) => sum + (s.totalScore ?? 0), 0) / graded.length)
    : 0

  if (!student) return <div className="text-center py-16 text-muted-foreground">Không tìm thấy học sinh.</div>

  const initials = student.name.split(' ').map((n) => n[0]).slice(-2).join('')

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      <button onClick={() => navigate('/teacher/students')} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft size={14} /> Danh sách học sinh
      </button>

      <PageHeader title="Tiến độ học sinh" />

      <Card>
        <CardContent className="p-4 flex items-center gap-4">
          <Avatar className="h-12 w-12 shrink-0">
            <AvatarFallback className="bg-ntc-red/10 text-ntc-red font-bold">{initials}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="font-bold text-ntc-dark text-lg">{student.name}</p>
            <p className="text-sm text-muted-foreground">{student.email}</p>
            <p className="text-xs text-muted-foreground">{student.className}</p>
          </div>
          <div className="text-right">
            <p className="font-mono text-2xl font-bold text-ntc-dark">{avgScore}</p>
            <p className="text-xs text-muted-foreground">Điểm TB</p>
          </div>
        </CardContent>
      </Card>

      {/* Submissions */}
      <Card>
        <CardHeader className="pb-2"><CardTitle className="text-sm">Lịch sử bài tập ({submissions.length} bài)</CardTitle></CardHeader>
        <CardContent className="p-0">
          {submissions.length === 0 ? (
            <p className="p-4 text-sm text-muted-foreground">Chưa có bài nộp.</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left px-4 py-2 font-medium text-muted-foreground">Bài tập</th>
                  <th className="text-center px-4 py-2 font-medium text-muted-foreground">Trạng thái</th>
                  <th className="text-right px-4 py-2 font-medium text-muted-foreground">Điểm</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((s, i) => (
                  <tr key={s.id} className={i % 2 === 0 ? 'bg-white' : 'bg-surface'}>
                    <td className="px-4 py-2.5 truncate max-w-[180px]">{s.exerciseTitle}</td>
                    <td className="px-4 py-2.5 text-center"><SubmissionStatusBadge status={s.status} /></td>
                    <td className="px-4 py-2.5 text-right font-mono">{s.totalScore != null ? `${s.totalScore}/${s.maxScore}` : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>

      {/* Attendance */}
      <Card>
        <CardHeader className="pb-2"><CardTitle className="text-sm">Điểm danh</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          {mockAttendance.map((a) => (
            <div key={a.date} className="flex items-center justify-between py-1.5 border-b border-border last:border-0">
              <span className="text-sm">{formatDate(a.date)}</span>
              <span className={a.status === 'present' ? 'text-xs font-medium text-green-600' : 'text-xs font-medium text-ntc-red'}>
                {a.status === 'present' ? '✓ Có mặt' : '✗ Vắng'}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Teacher notes */}
      <Card>
        <CardHeader className="pb-2"><CardTitle className="text-sm">Ghi chú của giáo viên</CardTitle></CardHeader>
        <CardContent>
          <Label className="text-xs text-muted-foreground mb-1.5 block">Ghi chú riêng (chỉ giáo viên thấy)</Label>
          <Textarea placeholder="Nhận xét, ghi chú về học sinh này..." className="min-h-[80px]" />
        </CardContent>
      </Card>
    </div>
  )
}
