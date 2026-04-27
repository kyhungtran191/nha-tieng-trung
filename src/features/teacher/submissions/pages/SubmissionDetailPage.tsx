import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, CheckCircle } from 'lucide-react'
import { mockSubmissions } from '@/lib/mock/submissions'
import { mockExercises } from '@/lib/mock/exercises'
import { PageHeader } from '@/components/shared/PageHeader'
import { SubmissionStatusBadge } from '@/components/shared/StatusBadge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { formatDate } from '@/lib/utils'

export function SubmissionDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const submission = mockSubmissions.find((s) => s.id === id)
  const exercise = submission ? mockExercises.find((e) => e.id === submission.exerciseId) : null

  const [scores, setScores] = useState<Record<string, number>>({})
  const [, setFeedbacks] = useState<Record<string, string>>({})
  const [overallFeedback, setOverallFeedback] = useState(submission?.overallFeedback ?? '')
  const [saved, setSaved] = useState(false)

  if (!submission || !exercise) {
    return <div className="text-center py-16 text-muted-foreground">Không tìm thấy bài nộp.</div>
  }

  const totalScore = Object.values(scores).reduce((sum, s) => sum + s, 0) +
    submission.answers.reduce((sum, a) => sum + (a.score ?? 0), 0)

  function handleSave() { setSaved(true) }

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      <button onClick={() => navigate('/teacher/submissions')} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft size={14} /> Danh sách bài nộp
      </button>

      <PageHeader title="Chấm bài" />

      {/* Student info */}
      <Card>
        <CardContent className="p-4 flex items-center justify-between flex-wrap gap-3">
          <div>
            <p className="font-semibold text-ntc-dark">{submission.studentName}</p>
            <p className="text-xs text-muted-foreground">{submission.className} · Nộp: {formatDate(submission.submittedAt)}</p>
            <p className="text-xs text-muted-foreground truncate">{submission.exerciseTitle}</p>
          </div>
          <div className="flex items-center gap-3">
            <SubmissionStatusBadge status={saved ? 'graded' : submission.status} />
            <span className="font-mono font-bold text-ntc-dark">{totalScore}/{submission.maxScore}</span>
          </div>
        </CardContent>
      </Card>

      {saved && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-3 flex items-center gap-2">
            <CheckCircle size={16} className="text-green-600" />
            <p className="text-sm text-green-700 font-medium">Đã lưu và trả bài thành công.</p>
          </CardContent>
        </Card>
      )}

      {/* Questions + grading */}
      {exercise.questions.map((q, idx) => {
        const answer = submission.answers.find((a) => a.questionId === q.id)
        const existingScore = answer?.score
        return (
          <Card key={q.id}>
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between gap-2">
                <CardTitle className="text-sm font-medium leading-snug">
                  <span className="font-mono text-muted-foreground mr-1">C{idx + 1}.</span>
                  {q.text}
                </CardTitle>
                <Badge variant="secondary" className="font-mono shrink-0">{q.points}đ</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="bg-muted rounded p-3">
                <p className="text-xs font-medium text-muted-foreground mb-1">Câu trả lời của học sinh:</p>
                <p className="text-sm">{answer?.answer || <span className="text-muted-foreground italic">Không có câu trả lời</span>}</p>
              </div>

              {q.type === 'essay' || q.type === 'file_upload' ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label className="text-xs w-20 shrink-0">Điểm (/{q.points})</Label>
                    <Input
                      type="number"
                      min={0}
                      max={q.points}
                      className="w-24 h-8 font-mono"
                      defaultValue={existingScore}
                      onChange={(e) => setScores((prev) => ({ ...prev, [q.id]: Number(e.target.value) }))}
                    />
                  </div>
                  <Textarea
                    placeholder="Nhận xét cho câu này..."
                    className="min-h-[60px] text-sm"
                    defaultValue={answer?.feedback}
                    onChange={(e) => setFeedbacks((prev) => ({ ...prev, [q.id]: e.target.value }))}
                  />
                </div>
              ) : (
                existingScore != null && (
                  <p className="text-xs text-muted-foreground font-mono">Điểm tự động: {existingScore}/{q.points}</p>
                )
              )}
            </CardContent>
          </Card>
        )
      })}

      {/* Overall feedback */}
      <Card>
        <CardHeader className="pb-2"><CardTitle className="text-sm">Nhận xét tổng thể</CardTitle></CardHeader>
        <CardContent>
          <Textarea
            placeholder="Nhận xét chung về bài làm..."
            className="min-h-[80px]"
            value={overallFeedback}
            onChange={(e) => setOverallFeedback(e.target.value)}
          />
        </CardContent>
      </Card>

      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={() => navigate('/teacher/submissions')}>Huỷ</Button>
        <Button onClick={handleSave} disabled={saved}>
          {saved ? 'Đã trả bài' : 'Lưu & Trả bài'}
        </Button>
      </div>
    </div>
  )
}
