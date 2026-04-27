import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuthStore } from '@/store/auth.store'
import { mockLogin } from '@/lib/mock/auth'

export function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuthStore()
  const navigate = useNavigate()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const user = await mockLogin(email, password)
      login(user)
      const redirectMap = { student: '/student/dashboard', teacher: '/teacher/dashboard', admin: '/admin/dashboard' }
      navigate(redirectMap[user.role], { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Đăng nhập thất bại')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2 className="text-lg font-bold tracking-tight text-ntc-dark mb-1">Đăng nhập</h2>
      <p className="text-sm text-muted-foreground mb-6">Nhập email và mật khẩu để tiếp tục</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="student@ntc.vn"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Mật khẩu</Label>
            <Link to="/forgot-password" className="text-xs text-ntc-red hover:underline">
              Quên mật khẩu?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && (
          <p className="text-sm text-ntc-red bg-ntc-red/5 border border-ntc-red/20 rounded px-3 py-2">
            {error}
          </p>
        )}

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
        </Button>
      </form>

      <p className="text-xs text-center text-muted-foreground mt-6">
        Chưa có tài khoản?{' '}
        <Link to="/register" className="text-ntc-red hover:underline font-medium">
          Đăng ký ngay
        </Link>
      </p>

      <div className="mt-4 p-3 bg-muted rounded text-xs text-muted-foreground">
        <p className="font-medium mb-1">Tài khoản demo:</p>
        <p>student@ntc.vn · teacher@ntc.vn · admin@ntc.vn</p>
        <p>Mật khẩu: bất kỳ</p>
      </div>
    </div>
  )
}
