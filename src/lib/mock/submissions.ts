import type { Submission } from '@/types'

export const mockSubmissions: Submission[] = [
  {
    id: 's1',
    studentId: 'u1',
    studentName: 'Nguyễn Văn An',
    exerciseId: 'e1',
    exerciseTitle: 'Bài tập 1: Xin chào & Giới thiệu',
    classId: 'c1',
    className: 'HSK2 - Thứ 3&5',
    submittedAt: '2026-04-26T10:30:00',
    status: 'graded',
    maxScore: 100,
    totalScore: 85,
    overallFeedback: 'Bài làm tốt! Phần tự giới thiệu rất tự nhiên. Cần chú ý thêm dấu thanh khi viết Pinyin.',
    answers: [
      { questionId: 'q1', answer: 'Xin chào', score: 20 },
      { questionId: 'q2', answer: '叫', score: 20 },
      { questionId: 'q3', answer: 'Tên', score: 20 },
      { questionId: 'q4', answer: 'Xin chào! Tôi tên là Văn An. Tôi là học sinh. Tôi học tiếng Trung.', score: 25, feedback: 'Tốt nhưng cần dùng thêm Hán tự.' },
    ],
  },
  {
    id: 's2',
    studentId: 'u2',
    studentName: 'Trần Thị Bình',
    exerciseId: 'e1',
    exerciseTitle: 'Bài tập 1: Xin chào & Giới thiệu',
    classId: 'c1',
    className: 'HSK2 - Thứ 3&5',
    submittedAt: '2026-04-26T14:15:00',
    status: 'pending',
    maxScore: 100,
    answers: [
      { questionId: 'q1', answer: 'Xin chào' },
      { questionId: 'q2', answer: '叫' },
      { questionId: 'q3', answer: 'Tên' },
      { questionId: 'q4', answer: 'Nǐ hǎo! Wǒ jiào Thị Bình.' },
    ],
  },
  {
    id: 's3',
    studentId: 'u1',
    studentName: 'Nguyễn Văn An',
    exerciseId: 'e2',
    exerciseTitle: 'Bài tập 2: Số đếm và ngày tháng',
    classId: 'c1',
    className: 'HSK2 - Thứ 3&5',
    submittedAt: '2026-04-28T09:00:00',
    status: 'submitted',
    maxScore: 100,
    answers: [
      { questionId: 'q5', answer: 'Hôm nay' },
      { questionId: 'q6', answer: '三' },
      { questionId: 'q7', answer: 'matched' },
    ],
  },
]

export async function fetchSubmissions(filters?: { classId?: string; exerciseId?: string; status?: string }): Promise<Submission[]> {
  await new Promise((r) => setTimeout(r, 400))
  let results = mockSubmissions
  if (filters?.classId) results = results.filter((s) => s.classId === filters.classId)
  if (filters?.exerciseId) results = results.filter((s) => s.exerciseId === filters.exerciseId)
  if (filters?.status) results = results.filter((s) => s.status === filters.status)
  return results
}

export async function fetchSubmission(id: string): Promise<Submission> {
  await new Promise((r) => setTimeout(r, 300))
  const sub = mockSubmissions.find((s) => s.id === id)
  if (!sub) throw new Error('Không tìm thấy bài nộp')
  return sub
}
