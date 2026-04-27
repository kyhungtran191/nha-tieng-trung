import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Eye, EyeOff, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuthStore } from '@/store/auth.store'
import { mockLogin } from '@/lib/mock/auth'
import { cn } from '@/lib/utils'

const demoAccounts = [
  { email: 'student@ntc.vn', role: 'Học sinh' },
  { email: 'teacher@ntc.vn', role: 'Giáo viên' },
  { email: 'admin@ntc.vn', role: 'Admin' },
]

export function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
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
    <div className="space-y-8">
      {/* Heading */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-ntc-dark">Chào mừng trở lại</h1>
        <p className="text-sm text-muted-foreground mt-1">Đăng nhập để tiếp tục học tập</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-sm font-medium">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="email@ntc.vn"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-11 text-sm"
            required
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="text-sm font-medium">Mật khẩu</Label>
            <Link to="/forgot-password" className="text-xs text-ntc-red hover:underline font-medium">
              Quên mật khẩu?
            </Link>
          </div>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Nhập mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-11 text-sm pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        {error && (
          <div className="flex items-start gap-2 text-sm text-ntc-red bg-ntc-red/5 border border-ntc-red/20 rounded px-3 py-2.5">
            <span className="mt-0.5">⚠</span>
            <span>{error}</span>
          </div>
        )}

        <Button
          type="submit"
          className="w-full h-11 text-sm font-semibold gap-2"
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Đang đăng nhập...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              Đăng nhập <ArrowRight size={15} />
            </span>
          )}
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs text-muted-foreground">
          <span className="bg-white px-3">Tài khoản demo</span>
        </div>
      </div>

      {/* Demo accounts — click to fill */}
      <div className="grid grid-cols-3 gap-2">
        {demoAccounts.map((acc) => (
          <button
            key={acc.email}
            type="button"
            onClick={() => { setEmail(acc.email); setPassword('demo123') }}
            className={cn(
              'flex flex-col items-center gap-1 px-2 py-3 rounded border border-border text-center transition-all hover:border-ntc-red/40 hover:bg-ntc-red/5',
              email === acc.email && 'border-ntc-red bg-ntc-red/5',
            )}
          >
            <span className="text-xs font-medium text-ntc-dark">{acc.role}</span>
            <span className="text-[10px] text-muted-foreground leading-tight break-all">{acc.email}</span>
          </button>
        ))}
      </div>

      <p className="text-xs text-center text-muted-foreground">
        Chưa có tài khoản?{' '}
        <Link to="/register" className="text-ntc-red hover:underline font-semibold">
          Đăng ký ngay
        </Link>
      </p>
    </div>
  )
}
