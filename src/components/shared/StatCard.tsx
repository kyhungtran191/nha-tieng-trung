import type { LucideIcon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface StatCardProps {
  label: string
  value: string | number
  icon: LucideIcon
  trend?: string
  color?: 'red' | 'green' | 'amber' | 'blue'
}

const colorMap = {
  red: 'bg-ntc-red/10 text-ntc-red',
  green: 'bg-green-100 text-green-700',
  amber: 'bg-amber-100 text-amber-700',
  blue: 'bg-blue-100 text-blue-700',
}

export function StatCard({ label, value, icon: Icon, trend, color = 'red' }: StatCardProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs text-muted-foreground">{label}</p>
            <p className="text-2xl font-bold font-mono tracking-tight text-ntc-dark mt-0.5">{value}</p>
            {trend && <p className="text-xs text-muted-foreground mt-1">{trend}</p>}
          </div>
          <div className={cn('p-2 rounded', colorMap[color])}>
            <Icon size={18} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
