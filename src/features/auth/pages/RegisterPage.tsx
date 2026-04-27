import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export function RegisterPage() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="text-center py-4">
        <div className="text-3xl font-noto mb-3">✓</div>
        <h3 className="font-bold text-ntc-dark mb-1">Đăng ký thành công!</h3>
        <p className="text-sm text-muted-foreground mb-4">Tài khoản của bạn đang chờ xét duyệt từ admin.</p>
        <Link to="/login">
          <Button variant="outline" size="sm">Quay lại đăng nhập</Button>
        </Link>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-lg font-bold tracking-tight text-ntc-dark mb-1">Đăng ký tài khoản</h2>
      <p className="text-sm text-muted-foreground mb-6">Điền thông tin để tạo tài khoản học tập</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="name">Họ và tên</Label>
          <Input id="name" placeholder="Nguyễn Văn An" required />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="email@example.com" required />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="role">Vai trò</Label>
          <Select required>
            <SelectTrigger id="role">
              <SelectValue placeholder="Chọn vai trò" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="student">Học sinh</SelectItem>
              <SelectItem value="teacher">Giáo viên</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="password">Mật khẩu</Label>
          <Input id="password" type="password" placeholder="Tối thiểu 8 ký tự" required />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="confirm">Xác nhận mật khẩu</Label>
          <Input id="confirm" type="password" placeholder="Nhập lại mật khẩu" required />
        </div>

        <Button type="submit" className="w-full">Đăng ký</Button>
      </form>

      <p className="text-xs text-center text-muted-foreground mt-6">
        Đã có tài khoản?{' '}
        <Link to="/login" className="text-ntc-red hover:underline font-medium">
          Đăng nhập
        </Link>
      </p>
    </div>
  )
}
