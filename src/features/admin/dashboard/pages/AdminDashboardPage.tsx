import { Link } from 'react-router-dom'
import { Users, GraduationCap, UserPlus, CreditCard } from 'lucide-react'
import { getMockUsers, mockClasses, mockEnrollments, mockPayments } from '@/lib/mock/users'
import { StatCard } from '@/components/shared/StatCard'
import { PageHeader } from '@/components/shared/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PaymentStatusBadge } from '@/components/shared/StatusBadge'
import { Button } from '@/components/ui/button'
import { formatDate } from '@/lib/utils'

export function AdminDashboardPage() {
  const users = getMockUsers()
  const students = users.filter((u) => u.role === 'student')
  const teachers = users.filter((u) => u.role === 'teacher')
  const unpaid = mockPayments.filter((p) => p.status !== 'paid').length
  const revenue = mockPayments.filter((p) => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0)

  return (
    <div className="space-y-6">
      <PageHeader
        title="Tổng quan"
        description="Quản lý trung tâm Nhà Tiếng Trung"
        action={
          <div className="flex gap-2">
            <Link to="/admin/users"><Button size="sm" variant="outline">+ Thêm người dùng</Button></Link>
            <Link to="/admin/classes"><Button size="sm">+ Tạo lớp</Button></Link>
          </div>
        }
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard label="Học sinh" value={students.length} icon={Users} color="blue" />
        <StatCard label="Giáo viên" value={teachers.length} icon={GraduationCap} color="green" />
        <StatCard label="Lớp học" value={mockClasses.length} icon={UserPlus} color="amber" />
        <StatCard label="Chưa đóng học phí" value={unpaid} icon={CreditCard} color="red" trend={`Doanh thu: ${(revenue / 1000000).toFixed(1)}M`} />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm">Đăng ký gần đây</CardTitle>
              <Link to="/admin/enrollment" className="text-xs text-ntc-red hover:underline">Xem tất cả</Link>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {mockEnrollments.map((e) => (
              <div key={e.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div>
                  <p className="text-sm font-medium">{e.studentName}</p>
                  <p className="text-xs text-muted-foreground">{e.className} · {formatDate(e.enrolledDate)}</p>
                </div>
                <span className="text-xs font-medium text-green-600">Đang học</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm">Học phí cần thu</CardTitle>
              <Link to="/admin/payments" className="text-xs text-ntc-red hover:underline">Xem tất cả</Link>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {mockPayments.filter(p => p.status !== 'paid').map((p) => (
              <div key={p.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div>
                  <p className="text-sm font-medium">{p.studentName}</p>
                  <p className="text-xs text-muted-foreground">{p.className}</p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-sm font-bold text-ntc-dark">{(p.amount / 1000).toFixed(0)}k</p>
                  <PaymentStatusBadge status={p.status} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
