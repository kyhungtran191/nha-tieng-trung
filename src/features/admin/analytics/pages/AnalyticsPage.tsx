import { PageHeader } from '@/components/shared/PageHeader'
import { StatCard } from '@/components/shared/StatCard'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, BookOpen, Trophy, TrendingUp } from 'lucide-react'
import { getMockUsers, mockClasses } from '@/lib/mock/users'
import { mockSubmissions } from '@/lib/mock/submissions'
import { cn } from '@/lib/utils'

const months = ['T1','T2','T3','T4','T5','T6','T7','T8','T9','T10','T11','T12']
const studentGrowth = [5, 6, 6, 8, 8, 10, 12, 14, 15, 16, 17, 18]
const completionRates = [60, 65, 70, 72, 75, 80, 85, 82, 78, 80, 85, 88]

const classBars = [
  { name: 'HSK1 - Thứ 2&4', avg: 82, count: 10 },
  { name: 'HSK2 - Thứ 3&5', avg: 75, count: 8 },
  { name: 'HSK3 - Cuối tuần', avg: 88, count: 6 },
]

export function AnalyticsPage() {
  const users = getMockUsers()
  const students = users.filter((u) => u.role === 'student')
  const graded = mockSubmissions.filter((s) => s.status === 'graded')
  const avgScore = graded.length > 0
    ? Math.round(graded.reduce((sum, s) => sum + (s.totalScore ?? 0), 0) / graded.length)
    : 0

  return (
    <div className="space-y-6">
      <PageHeader title="Thống kê" description="Tổng quan hoạt động trung tâm" />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard label="Tổng học sinh" value={students.length} icon={Users} color="blue" trend="↑ 2 tháng này" />
        <StatCard label="Lớp đang học" value={mockClasses.filter(c => c.status === 'active').length} icon={BookOpen} color="green" />
        <StatCard label="Điểm TB toàn trường" value={`${avgScore}`} icon={Trophy} color="amber" />
        <StatCard label="Tỉ lệ hoàn thành" value="82%" icon={TrendingUp} color="red" />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Student growth chart */}
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Tăng trưởng học sinh</CardTitle></CardHeader>
          <CardContent>
            <div className="flex items-end gap-1 h-28">
              {studentGrowth.map((val, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full bg-blue-400/80 rounded-sm" style={{ height: `${(val / 20) * 80}px` }} />
                  <span className="text-xs text-muted-foreground">{months[i]}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Completion rate chart */}
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Tỉ lệ hoàn thành bài tập (%)</CardTitle></CardHeader>
          <CardContent>
            <div className="flex items-end gap-1 h-28">
              {completionRates.map((val, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className={cn('w-full rounded-sm', val >= 80 ? 'bg-green-400/80' : 'bg-amber-400/80')}
                    style={{ height: `${(val / 100) * 80}px` }}
                  />
                  <span className="text-xs text-muted-foreground">{months[i]}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Avg score by class */}
      <Card>
        <CardHeader className="pb-2"><CardTitle className="text-sm">Điểm trung bình theo lớp</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {classBars.map((c) => (
            <div key={c.name} className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-medium">{c.name}</span>
                <span className="font-mono text-muted-foreground">{c.avg}/100 · {c.count} học sinh</span>
              </div>
              <div className="h-2 bg-muted rounded-sm overflow-hidden">
                <div className="h-full bg-ntc-red/70 rounded-sm" style={{ width: `${c.avg}%` }} />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
