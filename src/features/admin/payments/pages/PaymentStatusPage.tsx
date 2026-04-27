import { useState } from 'react'
import { mockPayments } from '@/lib/mock/users'
import { PageHeader } from '@/components/shared/PageHeader'
import { PaymentStatusBadge } from '@/components/shared/StatusBadge'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'

type Filter = 'all' | 'paid' | 'unpaid' | 'overdue'

export function PaymentStatusPage() {
  const [filter, setFilter] = useState<Filter>('all')

  const payments = mockPayments.filter((p) => filter === 'all' || p.status === filter)
  const totalRevenue = mockPayments.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0)
  const pending = mockPayments.filter(p => p.status !== 'paid').reduce((sum, p) => sum + p.amount, 0)

  return (
    <div>
      <PageHeader title="Học phí" description="Quản lý thu học phí" />

      <div className="grid grid-cols-2 gap-3 mb-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Đã thu tháng này</p>
            <p className="font-mono text-xl font-bold text-green-600">{(totalRevenue / 1000000).toFixed(1)}M</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Chưa thu</p>
            <p className="font-mono text-xl font-bold text-ntc-red">{(pending / 1000000).toFixed(1)}M</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={filter} onValueChange={(v) => setFilter(v as Filter)} className="mb-4">
        <TabsList>
          <TabsTrigger value="all">Tất cả</TabsTrigger>
          <TabsTrigger value="paid">Đã đóng</TabsTrigger>
          <TabsTrigger value="unpaid">Chưa đóng</TabsTrigger>
          <TabsTrigger value="overdue">Quá hạn</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="space-y-2">
        {payments.map((p) => (
          <Card key={p.id} className={p.status === 'overdue' ? 'border-ntc-red/30' : ''}>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="flex-1 min-w-0">
                <p className="font-medium text-ntc-dark">{p.studentName}</p>
                <p className="text-xs text-muted-foreground">{p.className} · Tháng {p.month.split('-')[1]}/{p.month.split('-')[0]}</p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="font-mono font-bold text-ntc-dark">{(p.amount / 1000).toFixed(0)}k</span>
                <PaymentStatusBadge status={p.status} />
                {p.status !== 'paid' && (
                  <Button size="sm" variant="outline" className="text-xs">Đánh dấu đã thu</Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
