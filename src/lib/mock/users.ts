import type { Class, Enrollment, Payment, Announcement } from '@/types'
import { getMockUsers } from './auth'

export { getMockUsers }

export const mockClasses: Class[] = [
  { id: 'c1', name: 'HSK2 - Thứ 3&5', teacherId: 't1', teacherName: 'Phạm Thanh Hoa', schedule: 'Thứ 3 & 5, 18:00-20:00', studentCount: 8, status: 'active' },
  { id: 'c2', name: 'HSK1 - Thứ 2&4', teacherId: 't2', teacherName: 'Vũ Đức Nam', schedule: 'Thứ 2 & 4, 18:00-20:00', studentCount: 10, status: 'active' },
  { id: 'c3', name: 'HSK3 - Cuối tuần', teacherId: 't1', teacherName: 'Phạm Thanh Hoa', schedule: 'Thứ 7, 09:00-12:00', studentCount: 6, status: 'active' },
]

export const mockEnrollments: Enrollment[] = [
  { id: 'en1', studentId: 'u1', studentName: 'Nguyễn Văn An', classId: 'c1', className: 'HSK2 - Thứ 3&5', enrolledDate: '2026-03-01', status: 'active' },
  { id: 'en2', studentId: 'u2', studentName: 'Trần Thị Bình', classId: 'c1', className: 'HSK2 - Thứ 3&5', enrolledDate: '2026-03-01', status: 'active' },
  { id: 'en3', studentId: 'u3', studentName: 'Lê Minh Châu', classId: 'c2', className: 'HSK1 - Thứ 2&4', enrolledDate: '2026-04-01', status: 'active' },
]

export const mockPayments: Payment[] = [
  { id: 'p1', studentId: 'u1', studentName: 'Nguyễn Văn An', classId: 'c1', className: 'HSK2 - Thứ 3&5', month: '2026-04', amount: 800000, status: 'paid' },
  { id: 'p2', studentId: 'u2', studentName: 'Trần Thị Bình', classId: 'c1', className: 'HSK2 - Thứ 3&5', month: '2026-04', amount: 800000, status: 'unpaid' },
  { id: 'p3', studentId: 'u3', studentName: 'Lê Minh Châu', classId: 'c2', className: 'HSK1 - Thứ 2&4', month: '2026-04', amount: 700000, status: 'overdue' },
  { id: 'p4', studentId: 'u1', studentName: 'Nguyễn Văn An', classId: 'c1', className: 'HSK2 - Thứ 3&5', month: '2026-03', amount: 800000, status: 'paid' },
]

export const mockAnnouncements: Announcement[] = [
  { id: 'an1', title: 'Nghỉ lễ 30/4 - 1/5', body: 'Lớp học sẽ nghỉ ngày 30/4 và 1/5. Buổi học tiếp theo vào ngày 3/5. Học sinh tự ôn bài và làm bài tập đã giao.', classId: 'c1', className: 'HSK2 - Thứ 3&5', publishedAt: '2026-04-25T08:00:00', teacherName: 'Phạm Thanh Hoa' },
  { id: 'an2', title: 'Kiểm tra giữa kỳ tuần tới', body: 'Học sinh ôn tập bài 1-5. Kiểm tra sẽ diễn ra vào buổi học ngày 5/5/2026. Nội dung: từ vựng, ngữ pháp, đọc hiểu.', classId: 'c1', className: 'HSK2 - Thứ 3&5', publishedAt: '2026-04-27T10:00:00', teacherName: 'Phạm Thanh Hoa' },
]

export async function fetchClasses(): Promise<Class[]> {
  await new Promise((r) => setTimeout(r, 400))
  return mockClasses
}

export async function fetchEnrollments(): Promise<Enrollment[]> {
  await new Promise((r) => setTimeout(r, 400))
  return mockEnrollments
}

export async function fetchPayments(): Promise<Payment[]> {
  await new Promise((r) => setTimeout(r, 400))
  return mockPayments
}

export async function fetchAnnouncements(classId?: string): Promise<Announcement[]> {
  await new Promise((r) => setTimeout(r, 300))
  if (classId) return mockAnnouncements.filter((a) => a.classId === classId)
  return mockAnnouncements
}
