'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Loader() {
  const loaderRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const loader = loaderRef.current
    const bar = barRef.current
    const text = textRef.current
    if (!loader || !bar) return

    document.body.classList.add('loading')

    const paths = loader.querySelectorAll<SVGPathElement>('.loader-logo-path')
    const tl = gsap.timeline()

    paths.forEach((path, i) => {
      const len = path.getTotalLength ? path.getTotalLength() : 400
      gsap.set(path, { strokeDasharray: len, strokeDashoffset: len })
      tl.to(path, { strokeDashoffset: 0, duration: 0.9, ease: 'power2.inOut' }, i * 0.15)
    })

    gsap.to(bar, {
      width: '100%',
      duration: 1.6,
      ease: 'power1.inOut',
      onUpdate: function () {
        const pct = Math.round(this.progress() * 100)
        if (text) text.textContent = `Loading... ${pct}%`
      },
    })

    gsap.to(loader, {
      yPercent: -100,
      duration: 0.75,
      ease: 'power3.inOut',
      delay: 1.85,
      onComplete: () => {
        loader.style.display = 'none'
        document.body.classList.remove('loading')
        window.dispatchEvent(new CustomEvent('loaderComplete'))
      },
    })
  }, [])

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center gap-10"
      style={{ background: 'var(--bg-primary)' }}
    >
      <div className="relative w-[120px] h-[120px]">
        <svg
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full overflow-visible"
        >
          <path
            className="loader-logo-path"
            d="M 20 90 L 20 30 L 55 80 L 55 30"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            className="loader-logo-path loader-logo-path-2"
            d="M 70 30 L 70 90 M 70 58 L 95 30 M 70 58 L 98 90"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="60" cy="60" r="54" stroke="rgba(59,130,246,0.15)" strokeWidth="1" />
        </svg>
        <div
          className="absolute rounded-full border border-accent-blue/20"
          style={{
            inset: '-12px',
            animation: 'loader-ring-pulse 1.5s ease-in-out infinite',
          }}
        />
      </div>
      <div
        className="w-[240px] h-[2px] rounded-full overflow-hidden"
        style={{ background: 'rgba(255,255,255,0.05)' }}
      >
        <div
          ref={barRef}
          className="h-full w-0 rounded-full"
          style={{
            background: 'linear-gradient(90deg, #3b82f6, #a855f7)',
            boxShadow: '0 0 10px rgba(59,130,246,0.5)',
          }}
        />
      </div>
      <p
        ref={textRef}
        className="font-mono text-[11px] tracking-[0.3em] uppercase"
        style={{ color: 'var(--text-muted)' }}
      >
        Loading... 0%
      </p>
    </div>
  )
}
