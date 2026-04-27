import { Flame, Trophy, BookOpen, ClipboardList } from 'lucide-react'
import { useAuthStore } from '@/store/auth.store'
import { mockSubmissions } from '@/lib/mock/submissions'
import { PageHeader } from '@/components/shared/PageHeader'
import { StatCard } from '@/components/shared/StatCard'
import { SubmissionStatusBadge } from '@/components/shared/StatusBadge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { formatDate } from '@/lib/utils'

export function ProgressPage() {
  const { user } = useAuthStore()
  const submissions = mockSubmissions.filter((s) => s.studentId === user?.id)
  const graded = submissions.filter((s) => s.status === 'graded')
  const avgScore = graded.length > 0
    ? Math.round(graded.reduce((sum, s) => sum + (s.totalScore ?? 0), 0) / graded.length)
    : 0

  const weeklyScores = [72, 85, 78, 90, 85, 88, 92]
  const days = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN']

  return (
    <div className="space-y-6">
      <PageHeader title="Tiến độ học tập" />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard label="Chuỗi ngày" value="7" icon={Flame} color="red" trend="Kỷ lục: 14 ngày" />
        <StatCard label="Bài đã học" value={12} icon={BookOpen} color="blue" />
        <StatCard label="Bài đã nộp" value={submissions.length} icon={ClipboardList} color="green" />
        <StatCard label="Điểm trung bình" value={`${avgScore}`} icon={Trophy} color="amber" />
      </div>

      {/* HSK Progress */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Lộ trình HSK</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { level: 'HSK 1', progress: 100, color: 'bg-green-500' },
            { level: 'HSK 2', progress: 60, color: 'bg-ntc-red' },
            { level: 'HSK 3', progress: 0, color: 'bg-muted' },
          ].map((item) => (
            <div key={item.level} className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-medium">{item.level}</span>
                <span className="font-mono text-muted-foreground">{item.progress}%</span>
              </div>
              <Progress value={item.progress} />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Weekly chart */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Điểm tuần này</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end gap-2 h-28">
            {weeklyScores.map((score, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-xs font-mono text-muted-foreground">{score}</span>
                <div
                  className="w-full bg-ntc-red/80 rounded-sm transition-all"
                  style={{ height: `${(score / 100) * 80}px` }}
                />
                <span className="text-xs text-muted-foreground">{days[i]}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Submission history */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Lịch sử bài tập</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {submissions.length === 0 ? (
            <p className="text-sm text-muted-foreground p-4">Chưa có bài nộp nào.</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left px-4 py-2 font-medium text-muted-foreground">Bài tập</th>
                  <th className="text-left px-4 py-2 font-medium text-muted-foreground hidden md:table-cell">Nộp lúc</th>
                  <th className="text-center px-4 py-2 font-medium text-muted-foreground">Trạng thái</th>
                  <th className="text-right px-4 py-2 font-medium text-muted-foreground">Điểm</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((s, i) => (
                  <tr key={s.id} className={i % 2 === 0 ? 'bg-white' : 'bg-surface'}>
                    <td className="px-4 py-2.5 font-medium truncate max-w-[200px]">{s.exerciseTitle}</td>
                    <td className="px-4 py-2.5 text-muted-foreground hidden md:table-cell">{formatDate(s.submittedAt)}</td>
                    <td className="px-4 py-2.5 text-center"><SubmissionStatusBadge status={s.status} /></td>
                    <td className="px-4 py-2.5 text-right font-mono">
                      {s.totalScore != null ? `${s.totalScore}/${s.maxScore}` : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
