import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#050510',
        'bg-secondary': '#0a0a1a',
        'bg-card': '#0f0f23',
        'bg-card-hover': '#14142e',
        'bg-elevated': '#161633',
        'accent-blue': '#3b82f6',
        'accent-purple': '#a855f7',
        'accent-green': '#00ff88',
        'accent-orange': '#f97316',
        'accent-cyan': '#06b6d4',
        'text-primary': '#f0f0ff',
        'text-secondary': '#c4c4dd',
        'text-muted': '#8888aa',
        'text-dim': '#555577',
      },
      boxShadow: {
        'glow-blue': '0 0 40px rgba(59,130,246,0.4)',
        'glow-purple': '0 0 40px rgba(168,85,247,0.4)',
        'glow-green': '0 0 30px rgba(0,255,136,0.3)',
        'glow-cyan': '0 0 30px rgba(6,182,212,0.3)',
        'glow-orange': '0 0 30px rgba(249,115,22,0.3)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'JetBrains Mono', 'Fira Code', 'Courier New', 'monospace'],
      },
      keyframes: {
        'badge-pulse': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.5', transform: 'scale(0.8)' },
        },
        'cursor-blink': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        'scroll-line': {
          '0%': { transform: 'scaleY(0)', transformOrigin: 'top' },
          '50%': { transform: 'scaleY(1)', transformOrigin: 'top' },
          '51%': { transform: 'scaleY(1)', transformOrigin: 'bottom' },
          '100%': { transform: 'scaleY(0)', transformOrigin: 'bottom' },
        },
        'orb-spin': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        'skill-shimmer': {
          '0%': { opacity: '0', transform: 'translateX(-100%)' },
          '50%': { opacity: '1' },
          '100%': { opacity: '0', transform: 'translateX(200%)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 0 0 rgba(0,255,136,0.4)' },
          '50%': { opacity: '0.7', boxShadow: '0 0 0 8px rgba(0,255,136,0)' },
        },
        'btn-spin': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        'loader-ring-pulse': {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.4' },
          '50%': { transform: 'scale(1.08)', opacity: '0.8' },
        },
        'orbit': {
          from: { transform: 'rotate(0deg) translateX(120px) rotate(0deg)' },
          to: { transform: 'rotate(360deg) translateX(120px) rotate(-360deg)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 0 0 rgba(0,255,136,0.4)' },
          '50%': { opacity: '0.7', boxShadow: '0 0 0 8px rgba(0,255,136,0)' },
        },
      },
      animation: {
        'badge-pulse': 'badge-pulse 2s ease-in-out infinite',
        'cursor-blink': 'cursor-blink 1s step-end infinite',
        'scroll-line': 'scroll-line 2s ease-in-out infinite',
        'orb-spin': 'orb-spin 20s linear infinite',
        'skill-shimmer': 'skill-shimmer 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'btn-spin': 'btn-spin 3s linear infinite',
        'loader-ring-pulse': 'loader-ring-pulse 1.5s ease-in-out infinite',
        'orbit': 'orbit 20s linear infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

export default config
