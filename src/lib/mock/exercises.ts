import type { Exercise } from '@/types'

export const mockExercises: Exercise[] = [
  {
    id: 'e1',
    title: 'Bài tập 1: Xin chào & Giới thiệu',
    lessonId: 'l1',
    lessonTitle: 'Bài 1: Xin chào & Giới thiệu bản thân',
    classId: 'c1',
    deadline: '2026-04-30T23:59:00',
    status: 'published',
    submissionsCount: 5,
    questions: [
      {
        id: 'q1',
        type: 'multiple_choice',
        text: '"你好" có nghĩa là gì?',
        points: 20,
        options: ['Cảm ơn', 'Xin chào', 'Tạm biệt', 'Xin lỗi'],
        correctAnswer: 'Xin chào',
      },
      {
        id: 'q2',
        type: 'fill_blank',
        text: 'Điền vào chỗ trống: 我___ 小明。(Tôi tên là Tiểu Minh)',
        points: 20,
        correctAnswer: '叫',
      },
      {
        id: 'q3',
        type: 'multiple_choice',
        text: '"名字" (míng zi) có nghĩa là gì?',
        points: 20,
        options: ['Số điện thoại', 'Địa chỉ', 'Tên', 'Tuổi'],
        correctAnswer: 'Tên',
      },
      {
        id: 'q4',
        type: 'essay',
        text: 'Hãy tự giới thiệu bản thân bằng tiếng Trung (ít nhất 3 câu). Dùng Pinyin nếu chưa thuộc Hán tự.',
        points: 40,
      },
    ],
  },
  {
    id: 'e2',
    title: 'Bài tập 2: Số đếm và ngày tháng',
    lessonId: 'l2',
    lessonTitle: 'Bài 2: Số đếm và ngày tháng',
    classId: 'c1',
    deadline: '2026-05-05T23:59:00',
    status: 'published',
    submissionsCount: 2,
    questions: [
      {
        id: 'q5',
        type: 'multiple_choice',
        text: '"今天" (jīn tiān) có nghĩa là?',
        points: 25,
        options: ['Ngày mai', 'Hôm qua', 'Hôm nay', 'Tuần tới'],
        correctAnswer: 'Hôm nay',
      },
      {
        id: 'q6',
        type: 'fill_blank',
        text: 'Viết số 3 bằng Hán tự: ___',
        points: 25,
        correctAnswer: '三',
      },
      {
        id: 'q7',
        type: 'matching',
        text: 'Nối Hán tự với nghĩa tương ứng:',
        points: 50,
        matchPairs: [
          { left: '一', right: 'Một' },
          { left: '二', right: 'Hai' },
          { left: '明天', right: 'Ngày mai' },
          { left: '今天', right: 'Hôm nay' },
        ],
      },
    ],
  },
  {
    id: 'e3',
    title: 'Bài tập: Chào hỏi cơ bản HSK1',
    lessonId: 'l4',
    lessonTitle: 'Bài 1: Chào hỏi cơ bản',
    classId: 'c2',
    deadline: '2026-05-03T23:59:00',
    status: 'published',
    submissionsCount: 8,
    questions: [
      {
        id: 'q8',
        type: 'multiple_choice',
        text: '"谢谢" đọc là?',
        points: 50,
        options: ['nǐ hǎo', 'xiè xiè', 'zài jiàn', 'duì bu qǐ'],
        correctAnswer: 'xiè xiè',
      },
      {
        id: 'q9',
        type: 'essay',
        text: 'Viết một đoạn hội thoại ngắn chào hỏi.',
        points: 50,
      },
    ],
  },
]

export async function fetchExercises(classId?: string): Promise<Exercise[]> {
  await new Promise((r) => setTimeout(r, 400))
  if (classId) return mockExercises.filter((e) => e.classId === classId)
  return mockExercises
}

export async function fetchExercise(id: string): Promise<Exercise> {
  await new Promise((r) => setTimeout(r, 300))
  const exercise = mockExercises.find((e) => e.id === id)
  if (!exercise) throw new Error('Không tìm thấy bài tập')
  return exercise
}
