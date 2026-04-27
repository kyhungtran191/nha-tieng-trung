import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Clock, CheckCircle } from 'lucide-react'
import { mockExercises } from '@/lib/mock/exercises'
import { mockSubmissions } from '@/lib/mock/submissions'
import { useAuthStore } from '@/store/auth.store'
import { PageHeader } from '@/components/shared/PageHeader'
import { SubmissionStatusBadge } from '@/components/shared/StatusBadge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog'
import { formatDate, formatRelativeTime, cn } from '@/lib/utils'
import type { Question } from '@/types'

export function ExerciseDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { user } = useAuthStore()
  const navigate = useNavigate()

  const exercise = mockExercises.find((e) => e.id === id)
  const submission = mockSubmissions.find((s) => s.exerciseId === id && s.studentId === user?.id)

  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({})
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  if (!exercise) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground">Không tìm thấy bài tập.</p>
        <Link to="/student/exercises"><Button variant="outline" className="mt-4" size="sm">Quay lại</Button></Link>
      </div>
    )
  }

  const isGraded = submission?.status === 'graded'
  const isSubmitted = submitted || submission?.status === 'submitted' || isGraded
  const totalPoints = exercise.questions.reduce((sum, q) => sum + q.points, 0)

  function getAnswerForQuestion(qId: string) {
    if (submission) return submission.answers.find((a) => a.questionId === qId)?.answer ?? ''
    return answers[qId] ?? selectedOptions[qId] ?? ''
  }

  function handleSubmit() {
    setSubmitted(true)
    setConfirmOpen(false)
  }

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      <button onClick={() => navigate('/student/exercises')} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft size={14} /> Danh sách bài tập
      </button>

      <PageHeader title={exercise.title} />

      <div className="flex items-center gap-3 flex-wrap">
        <SubmissionStatusBadge status={submission?.status ?? (submitted ? 'submitted' : 'pending')} />
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Clock size={12} />
          <span>Hạn: {formatDate(exercise.deadline)} · {formatRelativeTime(exercise.deadline)}</span>
        </div>
        <span className="text-xs text-muted-foreground font-mono">{totalPoints} điểm tổng</span>
      </div>

      {/* Graded score */}
      {isGraded && submission && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4 flex items-center gap-3">
            <CheckCircle size={20} className="text-green-600 shrink-0" />
            <div>
              <p className="font-semibold text-green-800">
                Điểm: <span className="font-mono">{submission.totalScore}/{submission.maxScore}</span>
              </p>
              {submission.overallFeedback && (
                <p className="text-sm text-green-700 mt-0.5">{submission.overallFeedback}</p>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Questions */}
      <div className="space-y-4">
        {exercise.questions.map((q, idx) => (
          <QuestionCard
            key={q.id}
            question={q}
            index={idx}
            answer={getAnswerForQuestion(q.id)}
            feedback={submission?.answers.find((a) => a.questionId === q.id)?.feedback}
            score={submission?.answers.find((a) => a.questionId === q.id)?.score}
            readOnly={isSubmitted}
            onAnswer={(val) => {
              if (q.type === 'multiple_choice') setSelectedOptions((prev) => ({ ...prev, [q.id]: val }))
              else setAnswers((prev) => ({ ...prev, [q.id]: val }))
            }}
          />
        ))}
      </div>

      {!isSubmitted && (
        <div className="flex justify-end gap-2 pt-2 border-t border-border">
          <Button variant="outline" size="sm">Lưu nháp</Button>
          <Button size="sm" onClick={() => setConfirmOpen(true)}>Nộp bài</Button>
        </div>
      )}

      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Xác nhận nộp bài</DialogTitle>
            <DialogDescription>Bạn chắc chắn muốn nộp bài? Sau khi nộp sẽ không thể chỉnh sửa.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" size="sm" onClick={() => setConfirmOpen(false)}>Hủy</Button>
            <Button size="sm" onClick={handleSubmit}>Nộp bài</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

interface QuestionCardProps {
  question: Question
  index: number
  answer: string
  feedback?: string
  score?: number
  readOnly: boolean
  onAnswer: (val: string) => void
}

function QuestionCard({ question, index, answer, feedback, score, readOnly, onAnswer }: QuestionCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-sm font-medium leading-snug">
            <span className="font-mono text-muted-foreground mr-2">Câu {index + 1}.</span>
            {question.text}
          </CardTitle>
          <Badge variant="secondary" className="font-mono shrink-0">{question.points}đ</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {question.type === 'multiple_choice' && (
          <div className="space-y-2">
            {question.options?.map((opt) => (
              <button
                key={opt}
                disabled={readOnly}
                onClick={() => onAnswer(opt)}
                className={cn(
                  'w-full text-left text-sm px-3 py-2 rounded border transition-colors',
                  answer === opt
                    ? 'border-ntc-red bg-ntc-red/5 text-ntc-red font-medium'
                    : 'border-border hover:border-muted-foreground',
                  readOnly && 'cursor-default',
                )}
              >
                {opt}
              </button>
            ))}
          </div>
        )}

        {question.type === 'fill_blank' && (
          <Input
            placeholder="Điền vào chỗ trống..."
            value={answer}
            readOnly={readOnly}
            onChange={(e) => onAnswer(e.target.value)}
          />
        )}

        {question.type === 'matching' && (
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              {question.matchPairs?.map((pair) => (
                <div key={pair.left} className="text-center border border-border rounded px-3 py-2 font-noto text-ntc-dark">{pair.left}</div>
              ))}
            </div>
            <div className="space-y-1">
              {question.matchPairs?.map((pair) => (
                <div key={pair.right} className="text-center border border-border rounded px-3 py-2 text-sm">{pair.right}</div>
              ))}
            </div>
          </div>
        )}

        {(question.type === 'essay' || question.type === 'file_upload') && (
          <Textarea
            placeholder={question.type === 'file_upload' ? 'Mô tả hoặc dán link ảnh bài làm...' : 'Viết câu trả lời của bạn...'}
            value={answer}
            readOnly={readOnly}
            onChange={(e) => onAnswer(e.target.value)}
            className="min-h-[120px]"
          />
        )}

        {feedback && (
          <div className="bg-blue-50 border border-blue-200 rounded px-3 py-2 text-xs text-blue-700">
            <span className="font-medium">Nhận xét GV:</span> {feedback}
          </div>
        )}
        {score != null && (
          <p className="text-xs text-muted-foreground font-mono text-right">Điểm câu này: {score}/{question.points}</p>
        )}
      </CardContent>
    </Card>
  )
}
