import type { User } from '@/types'

const mockUsers: User[] = [
  { id: 'u1', name: 'Nguyễn Văn An', email: 'student@ntc.vn', role: 'student', classId: 'c1', className: 'HSK2 - Thứ 3&5' },
  { id: 'u2', name: 'Trần Thị Bình', email: 'student2@ntc.vn', role: 'student', classId: 'c1', className: 'HSK2 - Thứ 3&5' },
  { id: 'u3', name: 'Lê Minh Châu', email: 'student3@ntc.vn', role: 'student', classId: 'c2', className: 'HSK1 - Thứ 2&4' },
  { id: 't1', name: 'Phạm Thanh Hoa', email: 'teacher@ntc.vn', role: 'teacher' },
  { id: 't2', name: 'Vũ Đức Nam', email: 'teacher2@ntc.vn', role: 'teacher' },
  { id: 'a1', name: 'Admin NTC', email: 'admin@ntc.vn', role: 'admin' },
]

export async function mockLogin(email: string, _password: string): Promise<User> {
  await new Promise((r) => setTimeout(r, 500))

  const user = mockUsers.find((u) => u.email.toLowerCase() === email.toLowerCase())
  if (!user) throw new Error('Email hoặc mật khẩu không đúng')
  return user
}

export function getMockUsers() {
  return mockUsers
}
