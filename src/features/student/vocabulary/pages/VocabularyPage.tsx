import { useState } from 'react'
import { BookMarked, RotateCcw } from 'lucide-react'
import { useAuthStore } from '@/store/auth.store'
import { mockLessons } from '@/lib/mock/lessons'
import { PageHeader } from '@/components/shared/PageHeader'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import type { VocabularyItem } from '@/types'

type Rating = 'know' | 'unsure' | 'unknown'

export function VocabularyPage() {
  const { user } = useAuthStore()

  const allVocab = mockLessons
    .filter((l) => l.classId === user?.classId && l.status === 'published')
    .flatMap((l) => l.vocabulary)

  const [currentIdx, setCurrentIdx] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [ratings, setRatings] = useState<Record<string, Rating>>({})
  const [done, setDone] = useState(false)

  const current = allVocab[currentIdx]
  const progress = Math.round((currentIdx / allVocab.length) * 100)
  const known = Object.values(ratings).filter((r) => r === 'know').length
  const unsure = Object.values(ratings).filter((r) => r === 'unsure').length

  function rate(vocab: VocabularyItem, rating: Rating) {
    setRatings((prev) => ({ ...prev, [vocab.id]: rating }))
    if (currentIdx + 1 >= allVocab.length) {
      setDone(true)
    } else {
      setCurrentIdx((i) => i + 1)
      setFlipped(false)
    }
  }

  function restart() {
    setCurrentIdx(0)
    setFlipped(false)
    setRatings({})
    setDone(false)
  }

  if (allVocab.length === 0) {
    return (
      <div>
        <PageHeader title="Ôn từ vựng" />
        <div className="text-center py-16 text-muted-foreground">
          <BookMarked size={32} className="mx-auto mb-3 opacity-40" />
          <p className="text-sm">Chưa có từ vựng nào để ôn.</p>
        </div>
      </div>
    )
  }

  if (done) {
    return (
      <div>
        <PageHeader title="Ôn từ vựng" />
        <div className="max-w-sm mx-auto text-center py-12 space-y-4">
          <div className="text-5xl font-noto">🎉</div>
          <h2 className="text-xl font-bold text-ntc-dark">Hoàn thành!</h2>
          <p className="text-sm text-muted-foreground">Bạn đã ôn {allVocab.length} từ vựng</p>
          <div className="grid grid-cols-3 gap-3 text-center">
            {[
              { label: 'Thuộc rồi', value: known, color: 'text-green-600' },
              { label: 'Chưa chắc', value: unsure, color: 'text-amber-600' },
              { label: 'Chưa nhớ', value: allVocab.length - known - unsure, color: 'text-ntc-red' },
            ].map((s) => (
              <div key={s.label} className="bg-muted rounded p-3">
                <p className={cn('text-2xl font-mono font-bold', s.color)}>{s.value}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
          <Button onClick={restart} className="w-full">
            <RotateCcw size={14} className="mr-2" /> Ôn lại
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <PageHeader title="Ôn từ vựng" description={`${allVocab.length} từ từ các bài đã học`} />

      <div className="max-w-sm mx-auto space-y-5">
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{currentIdx + 1} / {allVocab.length}</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} />
        </div>

        {/* Flashcard */}
        <button
          onClick={() => setFlipped((f) => !f)}
          className="w-full min-h-[220px] bg-white border border-border rounded shadow-sm flex flex-col items-center justify-center gap-3 p-6 cursor-pointer hover:border-ntc-red/30 transition-all"
        >
          {!flipped ? (
            <>
              <p className="text-5xl font-noto text-ntc-dark">{current?.hanzi}</p>
              <p className="text-xs text-muted-foreground">Nhấn để lật thẻ</p>
            </>
          ) : (
            <>
              <p className="text-4xl font-noto text-ntc-dark">{current?.hanzi}</p>
              <p className="font-mono text-ntc-red text-lg">{current?.pinyin}</p>
              <p className="text-base text-foreground font-medium">{current?.meaning}</p>
            </>
          )}
        </button>

        {flipped && current && (
          <div className="grid grid-cols-3 gap-2">
            <Button variant="outline" className="border-green-300 text-green-700 hover:bg-green-50" onClick={() => rate(current, 'know')}>
              ✓ Thuộc rồi
            </Button>
            <Button variant="outline" className="border-amber-300 text-amber-700 hover:bg-amber-50" onClick={() => rate(current, 'unsure')}>
              ? Chưa chắc
            </Button>
            <Button variant="outline" className="border-ntc-red/30 text-ntc-red hover:bg-ntc-red/5" onClick={() => rate(current, 'unknown')}>
              ✗ Chưa nhớ
            </Button>
          </div>
        )}

        {!flipped && (
          <p className="text-center text-xs text-muted-foreground">Lật thẻ để xem Pinyin và nghĩa</p>
        )}
      </div>
    </div>
  )
}
