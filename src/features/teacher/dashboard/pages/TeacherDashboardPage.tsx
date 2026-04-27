import { Link } from 'react-router-dom'
import { Inbox, BookOpen, ClipboardList, Users } from 'lucide-react'
import { useAuthStore } from '@/store/auth.store'
import { mockSubmissions } from '@/lib/mock/submissions'
import { mockLessons } from '@/lib/mock/lessons'
import { mockAnnouncements } from '@/lib/mock/users'
import { StatCard } from '@/components/shared/StatCard'
import { PageHeader } from '@/components/shared/PageHeader'
import { SubmissionStatusBadge } from '@/components/shared/StatusBadge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { formatDate } from '@/lib/utils'

export function TeacherDashboardPage() {
  const { user } = useAuthStore()
  const pending = mockSubmissions.filter((s) => s.status === 'pending')
  const lessons = mockLessons.filter((l) => l.status === 'published')
  const recentSubmissions = mockSubmissions.slice(0, 5)

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Xin chào, ${user?.name.split(' ').at(-1)}！`}
        description="Tổng quan giảng dạy"
        action={
          <div className="flex gap-2">
            <Link to="/teacher/lessons/new"><Button size="sm" variant="outline">+ Bài học</Button></Link>
            <Link to="/teacher/exercises/new"><Button size="sm">+ Bài tập</Button></Link>
          </div>
        }
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard label="Chờ chấm" value={pending.length} icon={Inbox} color="red" trend="Cần xử lý" />
        <StatCard label="Bài đã đăng" value={lessons.length} icon={BookOpen} color="blue" />
        <StatCard label="Bài tập" value={3} icon={ClipboardList} color="green" />
        <StatCard label="Học sinh" value={18} icon={Users} color="amber" />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm">Bài nộp gần đây</CardTitle>
              <Link to="/teacher/submissions" className="text-xs text-ntc-red hover:underline">Xem tất cả</Link>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {recentSubmissions.map((s) => (
              <Link key={s.id} to={`/teacher/submissions/${s.id}`}>
                <div className="flex items-center justify-between py-2 border-b border-border last:border-0 hover:bg-muted/50 rounded px-1 transition-colors">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium truncate">{s.studentName}</p>
                    <p className="text-xs text-muted-foreground truncate">{s.exerciseTitle}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <SubmissionStatusBadge status={s.status} />
                  </div>
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm">Bài học gần đây</CardTitle>
              <Link to="/teacher/lessons" className="text-xs text-ntc-red hover:underline">Xem tất cả</Link>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {lessons.slice(0, 4).map((l) => (
              <div key={l.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium truncate">{l.title}</p>
                  <p className="text-xs text-muted-foreground">{l.className} · {formatDate(l.publishDate)}</p>
                </div>
                <Link to={`/teacher/lessons/${l.id}/edit`}>
                  <Button size="sm" variant="ghost" className="text-xs">Sửa</Button>
                </Link>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {mockAnnouncements.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm">Thông báo đã đăng</CardTitle>
              <Link to="/teacher/announcements" className="text-xs text-ntc-red hover:underline">Quản lý</Link>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {mockAnnouncements.map((a) => (
              <div key={a.id} className="border-l-2 border-ntc-red pl-3 py-1">
                <p className="text-sm font-medium">{a.title}</p>
                <p className="text-xs text-muted-foreground">{a.className} · {formatDate(a.publishedAt)}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
