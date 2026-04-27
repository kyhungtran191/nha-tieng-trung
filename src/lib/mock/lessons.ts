import type { Lesson } from '@/types'

export const mockLessons: Lesson[] = [
  {
    id: 'l1',
    title: 'Bài 1: Xin chào & Giới thiệu bản thân',
    subject: 'HSK2',
    classId: 'c1',
    className: 'HSK2 - Thứ 3&5',
    publishDate: '2026-04-25',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    teacherNotes: 'Học sinh cần nắm vững cách phát âm 4 thanh điệu cơ bản. Chú ý phân biệt thanh 2 và thanh 3.',
    status: 'published',
    vocabulary: [
      { id: 'v1', hanzi: '你好', pinyin: 'nǐ hǎo', meaning: 'Xin chào' },
      { id: 'v2', hanzi: '我', pinyin: 'wǒ', meaning: 'Tôi' },
      { id: 'v3', hanzi: '叫', pinyin: 'jiào', meaning: 'Tên là / Gọi là' },
      { id: 'v4', hanzi: '什么', pinyin: 'shén me', meaning: 'Cái gì / Gì' },
      { id: 'v5', hanzi: '名字', pinyin: 'míng zi', meaning: 'Tên' },
    ],
  },
  {
    id: 'l2',
    title: 'Bài 2: Số đếm và ngày tháng',
    subject: 'HSK2',
    classId: 'c1',
    className: 'HSK2 - Thứ 3&5',
    publishDate: '2026-04-27',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    teacherNotes: 'Luyện tập đếm từ 1-100 và cách hỏi ngày tháng.',
    status: 'published',
    vocabulary: [
      { id: 'v6', hanzi: '一', pinyin: 'yī', meaning: 'Một' },
      { id: 'v7', hanzi: '二', pinyin: 'èr', meaning: 'Hai' },
      { id: 'v8', hanzi: '三', pinyin: 'sān', meaning: 'Ba' },
      { id: 'v9', hanzi: '今天', pinyin: 'jīn tiān', meaning: 'Hôm nay' },
      { id: 'v10', hanzi: '明天', pinyin: 'míng tiān', meaning: 'Ngày mai' },
    ],
  },
  {
    id: 'l3',
    title: 'Bài 3: Gia đình',
    subject: 'HSK2',
    classId: 'c1',
    className: 'HSK2 - Thứ 3&5',
    publishDate: '2026-04-29',
    videoUrl: '',
    teacherNotes: 'Từ vựng về các thành viên trong gia đình.',
    status: 'draft',
    vocabulary: [
      { id: 'v11', hanzi: '爸爸', pinyin: 'bà ba', meaning: 'Bố' },
      { id: 'v12', hanzi: '妈妈', pinyin: 'mā ma', meaning: 'Mẹ' },
      { id: 'v13', hanzi: '哥哥', pinyin: 'gē ge', meaning: 'Anh trai' },
      { id: 'v14', hanzi: '姐姐', pinyin: 'jiě jie', meaning: 'Chị gái' },
    ],
  },
  {
    id: 'l4',
    title: 'Bài 1: Chào hỏi cơ bản',
    subject: 'HSK1',
    classId: 'c2',
    className: 'HSK1 - Thứ 2&4',
    publishDate: '2026-04-26',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    teacherNotes: 'Bài học đầu tiên, tập trung vào phát âm và nhận diện thanh điệu.',
    status: 'published',
    vocabulary: [
      { id: 'v15', hanzi: '你', pinyin: 'nǐ', meaning: 'Bạn / Anh / Chị' },
      { id: 'v16', hanzi: '好', pinyin: 'hǎo', meaning: 'Tốt / Khoẻ' },
      { id: 'v17', hanzi: '谢谢', pinyin: 'xiè xiè', meaning: 'Cảm ơn' },
    ],
  },
]

export async function fetchLessons(classId?: string): Promise<Lesson[]> {
  await new Promise((r) => setTimeout(r, 400))
  if (classId) return mockLessons.filter((l) => l.classId === classId)
  return mockLessons
}

export async function fetchLesson(id: string): Promise<Lesson> {
  await new Promise((r) => setTimeout(r, 300))
  const lesson = mockLessons.find((l) => l.id === id)
  if (!lesson) throw new Error('Không tìm thấy bài học')
  return lesson
}
