import { Link } from 'react-router-dom'
import { BookOpen, ClipboardList, BookMarked, Flame, Trophy, Clock } from 'lucide-react'
import { useAuthStore } from '@/store/auth.store'
import { StatCard } from '@/components/shared/StatCard'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { mockLessons } from '@/lib/mock/lessons'
import { mockExercises } from '@/lib/mock/exercises'
import { mockAnnouncements } from '@/lib/mock/users'
import { formatDate, formatRelativeTime } from '@/lib/utils'

export function StudentDashboardPage() {
  const { user } = useAuthStore()
  const firstName = user?.name.split(' ').at(-1) ?? 'bạn'

  const todayLesson = mockLessons.find((l) => l.classId === user?.classId && l.status === 'published')
  const pendingExercises = mockExercises.filter((e) => e.classId === user?.classId)
  const announcements = mockAnnouncements.filter((a) => a.classId === user?.classId)

  return (
    <div className="space-y-6">
      {/* Greeting */}
      <div className="bg-ntc-red rounded p-5 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-80">欢迎回来</p>
            <h1 className="text-2xl font-bold tracking-tight mt-0.5">
              Xin chào, {firstName}！
            </h1>
            <p className="text-sm opacity-80 mt-1">{user?.className}</p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1.5 justify-end">
              <Flame size={18} className="text-orange-300" />
              <span className="text-2xl font-mono font-bold">7</span>
            </div>
            <p className="text-xs opacity-70">ngày liên tiếp</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard label="Bài đã học" value={12} icon={BookOpen} color="blue" />
        <StatCard label="Bài đã nộp" value={8} icon={ClipboardList} color="green" />
        <StatCard label="Điểm TB" value="85" icon={Trophy} color="amber" />
        <StatCard label="Từ đã học" value={64} icon={BookMarked} color="red" />
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {/* Today's lesson */}
        <div className="md:col-span-2 space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Bài học hôm nay
              </CardTitle>
            </CardHeader>
            <CardContent>
              {todayLesson ? (
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <Badge variant="info" className="mb-2">{todayLesson.subject}</Badge>
                    <h3 className="font-semibold text-ntc-dark leading-snug">{todayLesson.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{formatDate(todayLesson.publishDate)}</p>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{todayLesson.teacherNotes}</p>
                  </div>
                  <Link to={`/student/lessons/${todayLesson.id}`}>
                    <Button size="sm">Vào học</Button>
                  </Link>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">Không có bài học mới hôm nay.</p>
              )}
            </CardContent>
          </Card>

          {/* Pending exercises */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Bài tập cần làm
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {pendingExercises.length > 0 ? (
                pendingExercises.slice(0, 3).map((ex) => (
                  <div key={ex.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-ntc-dark truncate">{ex.title}</p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <Clock size={12} className="text-muted-foreground" />
                        <span className="text-xs text-amber-600 font-medium">{formatRelativeTime(ex.deadline)}</span>
                      </div>
                    </div>
                    <Link to={`/student/exercises/${ex.id}`}>
                      <Button size="sm" variant="outline">Làm bài</Button>
                    </Link>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">Không có bài tập nào đang chờ.</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Announcements */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Thông báo
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {announcements.length > 0 ? (
              announcements.map((ann) => (
                <div key={ann.id} className="border-l-2 border-ntc-red pl-3">
                  <p className="text-sm font-medium text-ntc-dark leading-snug">{ann.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{ann.body}</p>
                  <p className="text-xs text-muted-foreground mt-1">{formatDate(ann.publishedAt)}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">Chưa có thông báo.</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Ôn từ vựng', href: '/student/vocabulary', icon: BookMarked, desc: 'Flashcard hôm nay' },
          { label: 'Xem lịch học', href: '/student/schedule', icon: Clock, desc: 'Buổi học tiếp theo' },
          { label: 'Tiến độ học', href: '/student/progress', icon: Trophy, desc: 'Xem điểm số' },
        ].map((item) => (
          <Link key={item.href} to={item.href}>
            <Card className="hover:border-ntc-red/30 hover:shadow-sm transition-all cursor-pointer h-full">
              <CardContent className="p-4 flex flex-col items-center text-center gap-2">
                <div className="p-2 bg-ntc-red/10 rounded">
                  <item.icon size={18} className="text-ntc-red" />
                </div>
                <div>
                  <p className="text-sm font-medium text-ntc-dark">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
