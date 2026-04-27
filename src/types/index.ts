export type Role = 'student' | 'teacher' | 'admin'

export interface User {
  id: string
  name: string
  email: string
  role: Role
  avatarUrl?: string
  classId?: string
  className?: string
}

export interface Class {
  id: string
  name: string
  teacherId: string
  teacherName: string
  schedule: string
  studentCount: number
  status: 'active' | 'inactive'
}

export interface Lesson {
  id: string
  title: string
  subject: string
  classId: string
  className: string
  publishDate: string
  videoUrl?: string
  teacherNotes?: string
  vocabulary: VocabularyItem[]
  status: 'draft' | 'published'
}

export interface VocabularyItem {
  id: string
  hanzi: string
  pinyin: string
  meaning: string
}

export type QuestionType = 'multiple_choice' | 'fill_blank' | 'matching' | 'essay' | 'file_upload'

export interface Question {
  id: string
  type: QuestionType
  text: string
  points: number
  options?: string[]
  correctAnswer?: string
  matchPairs?: Array<{ left: string; right: string }>
}

export interface Exercise {
  id: string
  title: string
  lessonId: string
  lessonTitle: string
  classId: string
  deadline: string
  questions: Question[]
  status: 'draft' | 'published'
  submissionsCount?: number
}

export type SubmissionStatus = 'pending' | 'submitted' | 'graded'

export interface SubmissionAnswer {
  questionId: string
  answer: string
  score?: number
  feedback?: string
}

export interface Submission {
  id: string
  studentId: string
  studentName: string
  exerciseId: string
  exerciseTitle: string
  classId: string
  className: string
  submittedAt: string
  status: SubmissionStatus
  answers: SubmissionAnswer[]
  totalScore?: number
  maxScore: number
  overallFeedback?: string
}

export interface Announcement {
  id: string
  title: string
  body: string
  classId: string
  className: string
  publishedAt: string
  teacherName: string
}

export interface Payment {
  id: string
  studentId: string
  studentName: string
  classId: string
  className: string
  month: string
  amount: number
  status: 'paid' | 'unpaid' | 'overdue'
}

export interface Enrollment {
  id: string
  studentId: string
  studentName: string
  classId: string
  className: string
  enrolledDate: string
  status: 'active' | 'pending' | 'dropped'
}

export interface StudentProgress {
  userId: string
  streak: number
  totalLessonsViewed: number
  totalExercisesSubmitted: number
  averageScore: number
  hskLevel: number
  hskProgress: number
}
