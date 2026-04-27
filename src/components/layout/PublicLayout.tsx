import { Outlet } from 'react-router-dom'

const chineseChars = ['学', '习', '汉', '语', '你', '好', '中', '文', '语', '言', '家', '园']

export function PublicLayout() {
  return (
    <div className="min-h-screen flex">
      {/* Left — brand panel */}
      <div className="hidden lg:flex lg:w-[52%] bg-ntc-red flex-col relative overflow-hidden">
        {/* Decorative scattered characters */}
        {chineseChars.map((char, i) => (
          <span
            key={i}
            className="absolute font-noto font-bold text-white/10 select-none pointer-events-none"
            style={{
              fontSize: `${3 + (i % 5) * 1.8}rem`,
              top: `${(i * 17 + 8) % 90}%`,
              left: `${(i * 23 + 5) % 85}%`,
              transform: `rotate(${(i % 3 === 0 ? -1 : 1) * (i % 20)}deg)`,
            }}
          >
            {char}
          </span>
        ))}

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between h-full p-12">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <span className="text-5xl font-noto text-white/90">家</span>
            <div>
              <p className="text-2xl font-bold text-white tracking-tight leading-none">Nhà Tiếng Trung</p>
              <p className="text-sm text-white/60 font-noto mt-0.5">中文之家</p>
            </div>
          </div>

          {/* Hero text */}
          <div className="space-y-6">
            <div>
              <p className="text-5xl font-noto text-white font-bold leading-tight mb-3">
                学好汉语，<br />走向世界。
              </p>
              <p className="text-white/70 text-lg leading-relaxed max-w-sm">
                Học tiếng Trung hiệu quả — cùng giáo viên tận tâm và lộ trình rõ ràng từ HSK1 đến HSK6.
              </p>
            </div>

            {/* Stats row */}
            <div className="flex gap-8">
              {[
                { value: '500+', label: 'Học viên' },
                { value: 'HSK 1–6', label: 'Cấp độ' },
                { value: '98%', label: 'Hài lòng' },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-2xl font-bold text-white font-mono">{s.value}</p>
                  <p className="text-xs text-white/60 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <p className="text-white/40 text-xs">© 2026 Nhà Tiếng Trung. All rights reserved.</p>
        </div>
      </div>

      {/* Right — form panel */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 bg-white">
        {/* Mobile logo */}
        <div className="flex items-center gap-2 mb-10 lg:hidden">
          <span className="text-3xl font-noto text-ntc-red">家</span>
          <div>
            <p className="text-lg font-bold text-ntc-dark leading-none">Nhà Tiếng Trung</p>
            <p className="text-xs text-muted-foreground font-noto">中文之家</p>
          </div>
        </div>

        <div className="w-full max-w-sm">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
