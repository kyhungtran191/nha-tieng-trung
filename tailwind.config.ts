import type { Config } from 'tailwindcss'
import animate from 'tailwindcss-animate'

const config: Config = {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ntc: {
          red: '#C0392B',
          dark: '#1A1A1A',
        },
        surface: '#FAFAFA',
        border: '#EBEBEB',
        background: '#FFFFFF',
        foreground: '#1A1A1A',
        muted: {
          DEFAULT: '#F5F5F5',
          foreground: '#6B6B6B',
        },
        accent: {
          DEFAULT: '#F5F5F5',
          foreground: '#1A1A1A',
        },
        destructive: {
          DEFAULT: '#C0392B',
          foreground: '#FFFFFF',
        },
        card: {
          DEFAULT: '#FFFFFF',
          foreground: '#1A1A1A',
        },
        popover: {
          DEFAULT: '#FFFFFF',
          foreground: '#1A1A1A',
        },
        primary: {
          DEFAULT: '#C0392B',
          foreground: '#FFFFFF',
        },
        secondary: {
          DEFAULT: '#F5F5F5',
          foreground: '#1A1A1A',
        },
        input: '#EBEBEB',
        ring: '#C0392B',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        noto: ['Noto Sans SC', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '4px',
        sm: '2px',
        md: '4px',
        lg: '4px',
        xl: '4px',
        '2xl': '4px',
        full: '4px',
      },
      boxShadow: {
        sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.08)',
        md: '0 2px 6px 0 rgb(0 0 0 / 0.08)',
      },
    },
  },
  plugins: [animate],
}

export default config
