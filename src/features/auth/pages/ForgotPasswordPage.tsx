import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function ForgotPasswordPage() {
  const [sent, setSent] = useState(false)

  if (sent) {
    return (
      <div className="text-center py-4">
        <h3 className="font-bold text-ntc-dark mb-1">Đã gửi email</h3>
        <p className="text-sm text-muted-foreground mb-4">Kiểm tra hộp thư và làm theo hướng dẫn để đặt lại mật khẩu.</p>
        <Link to="/login"><Button variant="outline" size="sm">Quay lại đăng nhập</Button></Link>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-2xl font-bold tracking-tight text-ntc-dark mb-1">Quên mật khẩu?</h2>
      <p className="text-sm text-muted-foreground mb-8">Nhập email để nhận link đặt lại mật khẩu</p>
      <form onSubmit={(e) => { e.preventDefault(); setSent(true) }} className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="email@example.com" required />
        </div>
        <Button type="submit" className="w-full">Gửi link đặt lại</Button>
      </form>
      <p className="text-xs text-center text-muted-foreground mt-6">
        <Link to="/login" className="text-ntc-red hover:underline">← Quay lại đăng nhập</Link>
      </p>
    </div>
  )
}
