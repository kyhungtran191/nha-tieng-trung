import { Outlet } from 'react-router-dom'

export function PublicLayout() {
  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="text-3xl font-noto text-ntc-red">家</span>
            <div>
              <p className="text-xl font-bold tracking-tight text-ntc-dark leading-none">Nhà Tiếng Trung</p>
              <p className="text-xs text-muted-foreground">中文之家</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-border rounded p-6 shadow-sm">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
