import { Badge } from '@/components/ui/badge'
import type { SubmissionStatus } from '@/types'

const submissionConfig: Record<SubmissionStatus, { label: string; variant: 'warning' | 'info' | 'success' }> = {
  pending: { label: 'Chờ nộp', variant: 'warning' },
  submitted: { label: 'Đã nộp', variant: 'info' },
  graded: { label: 'Đã chấm', variant: 'success' },
}

export function SubmissionStatusBadge({ status }: { status: SubmissionStatus }) {
  const config = submissionConfig[status]
  return <Badge variant={config.variant}>{config.label}</Badge>
}

export function LessonStatusBadge({ status }: { status: 'draft' | 'published' }) {
  return (
    <Badge variant={status === 'published' ? 'success' : 'secondary'}>
      {status === 'published' ? 'Đã đăng' : 'Nháp'}
    </Badge>
  )
}

export function PaymentStatusBadge({ status }: { status: 'paid' | 'unpaid' | 'overdue' }) {
  const config = {
    paid: { label: 'Đã đóng', variant: 'success' as const },
    unpaid: { label: 'Chưa đóng', variant: 'warning' as const },
    overdue: { label: 'Quá hạn', variant: 'destructive' as const },
  }
  const c = config[status]
  return <Badge variant={c.variant}>{c.label}</Badge>
}
