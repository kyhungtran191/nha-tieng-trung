import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useAuthStore } from '@/store/auth.store'
import { mockLessons } from '@/lib/mock/lessons'
import { mockExercises } from '@/lib/mock/exercises'
import { PageHeader } from '@/components/shared/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn, formatDate } from '@/lib/utils'

const MONTH_NAMES = ['Tháng 1','Tháng 2','Tháng 3','Tháng 4','Tháng 5','Tháng 6','Tháng 7','Tháng 8','Tháng 9','Tháng 10','Tháng 11','Tháng 12']
const DAY_NAMES = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7']

export function SchedulePage() {
  const { user } = useAuthStore()
  const now = new Date()
  const [viewDate, setViewDate] = useState(new Date(now.getFullYear(), now.getMonth(), 1))
  const [selectedDay, setSelectedDay] = useState(now.getDate())

  const year = viewDate.getFullYear()
  const month = viewDate.getMonth()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const firstDayOfWeek = new Date(year, month, 1).getDay()

  const lessons = mockLessons.filter((l) => l.classId === user?.classId && l.status === 'published')
  const exercises = mockExercises.filter((e) => e.classId === user?.classId)

  function hasLesson(day: number) {
    return lessons.some((l) => {
      const d = new Date(l.publishDate)
      return d.getFullYear() === year && d.getMonth() === month && d.getDate() === day
    })
  }

  function hasExercise(day: number) {
    return exercises.some((e) => {
      const d = new Date(e.deadline)
      return d.getFullYear() === year && d.getMonth() === month && d.getDate() === day
    })
  }

  const selectedLessons = lessons.filter((l) => {
    const d = new Date(l.publishDate)
    return d.getFullYear() === year && d.getMonth() === month && d.getDate() === selectedDay
  })
  const selectedExercises = exercises.filter((e) => {
    const d = new Date(e.deadline)
    return d.getFullYear() === year && d.getMonth() === month && d.getDate() === selectedDay
  })

  function prevMonth() { setViewDate(new Date(year, month - 1, 1)) }
  function nextMonth() { setViewDate(new Date(year, month + 1, 1)) }

  return (
    <div className="space-y-4">
      <PageHeader title="Lịch học" />

      <div className="grid md:grid-cols-[1fr_280px] gap-4">
        {/* Calendar */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm">{MONTH_NAMES[month]} {year}</CardTitle>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" onClick={prevMonth}><ChevronLeft size={14} /></Button>
                <Button variant="ghost" size="icon" onClick={nextMonth}><ChevronRight size={14} /></Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-3 pt-0">
            <div className="grid grid-cols-7 mb-1">
              {DAY_NAMES.map((d) => (
                <div key={d} className="text-center text-xs font-medium text-muted-foreground py-1">{d}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-0.5">
              {Array.from({ length: firstDayOfWeek }).map((_, i) => <div key={`e${i}`} />)}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1
                const isToday = year === now.getFullYear() && month === now.getMonth() && day === now.getDate()
                const isSelected = day === selectedDay
                return (
                  <button
                    key={day}
                    onClick={() => setSelectedDay(day)}
                    className={cn(
                      'relative flex flex-col items-center justify-center h-9 text-sm rounded transition-colors',
                      isSelected ? 'bg-ntc-red text-white' : isToday ? 'border border-ntc-red text-ntc-red font-semibold' : 'hover:bg-muted',
                    )}
                  >
                    {day}
                    <div className="flex gap-0.5 absolute bottom-0.5">
                      {hasLesson(day) && <span className={cn('w-1 h-1 rounded-sm', isSelected ? 'bg-white/70' : 'bg-blue-400')} />}
                      {hasExercise(day) && <span className={cn('w-1 h-1 rounded-sm', isSelected ? 'bg-white/70' : 'bg-amber-400')} />}
                    </div>
                  </button>
                )
              })}
            </div>
            <div className="flex gap-4 mt-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-blue-400 inline-block" /> Bài học</div>
              <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-amber-400 inline-block" /> Hạn bài tập</div>
            </div>
          </CardContent>
        </Card>

        {/* Day detail */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Ngày {selectedDay}/{month + 1}/{year}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {selectedLessons.length === 0 && selectedExercises.length === 0 && (
              <p className="text-xs text-muted-foreground">Không có sự kiện nào.</p>
            )}
            {selectedLessons.map((l) => (
              <div key={l.id} className="border-l-2 border-blue-400 pl-3">
                <Badge variant="info" className="mb-1">Bài học</Badge>
                <p className="text-sm font-medium text-ntc-dark leading-snug">{l.title}</p>
                <p className="text-xs text-muted-foreground">{l.subject}</p>
              </div>
            ))}
            {selectedExercises.map((e) => (
              <div key={e.id} className="border-l-2 border-amber-400 pl-3">
                <Badge variant="warning" className="mb-1">Hạn nộp</Badge>
                <p className="text-sm font-medium text-ntc-dark leading-snug">{e.title}</p>
                <p className="text-xs text-muted-foreground">{formatDate(e.deadline)}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
