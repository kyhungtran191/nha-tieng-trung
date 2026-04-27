import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(date))
}

export function formatScore(score: number, max = 100): string {
  return `${score}/${max}`
}

export function formatRelativeTime(date: string | Date): string {
  const now = new Date()
  const target = new Date(date)
  const diffMs = target.getTime() - now.getTime()
  const diffHours = Math.round(diffMs / (1000 * 60 * 60))
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays > 1) return `còn ${diffDays} ngày`
  if (diffDays === 1) return 'còn 1 ngày'
  if (diffHours > 0) return `còn ${diffHours} giờ`
  if (diffHours === 0) return 'hôm nay'
  return 'đã hết hạn'
}
