import type { LucideIcon } from 'lucide-react'

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description?: string
  action?: React.ReactNode
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="p-3 bg-muted rounded mb-4">
        <Icon size={24} className="text-muted-foreground" />
      </div>
      <h3 className="text-sm font-semibold text-ntc-dark mb-1">{title}</h3>
      {description && <p className="text-xs text-muted-foreground max-w-xs">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}
