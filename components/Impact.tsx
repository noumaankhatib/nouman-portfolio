'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { metrics } from '@/lib/data'

gsap.registerPlugin(ScrollTrigger)

const accentColorMap = {
  blue: { color: 'var(--accent-blue)', glow: 'rgba(59,130,246,0.4)', border: 'rgba(59,130,246,0.3)', gradient: 'linear-gradient(135deg, var(--accent-blue), var(--accent-cyan))' },
  purple: { color: 'var(--accent-purple)', glow: 'rgba(168,85,247,0.4)', border: 'rgba(168,85,247,0.3)', gradient: 'linear-gradient(135deg, var(--accent-purple), var(--accent-blue))' },
  green: { color: 'var(--accent-green)', glow: 'rgba(0,255,136,0.3)', border: 'rgba(0,255,136,0.2)', gradient: 'linear-gradient(135deg, var(--accent-green), var(--accent-cyan))' },
  cyan: { color: 'var(--accent-cyan)', glow: 'rgba(6,182,212,0.3)', border: 'rgba(6,182,212,0.2)', gradient: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-blue))' },
}

export default function Impact() {
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!gridRef.current) return

      metrics.forEach((metric) => {
        const valueEl = document.getElementById(`impact-metric-${metric.label.replace(/\s+/g, '-')}`)
        if (!valueEl) return

        const isDecimal = metric.value % 1 !== 0
        const obj = { val: 0 }

        ScrollTrigger.create({
          trigger: valueEl,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            gsap.to(obj, {
              val: metric.value,
              duration: 2,
              ease: 'power2.out',
              onUpdate: () => {
                valueEl.textContent = (isDecimal ? obj.val.toFixed(1) : Math.floor(obj.val)) + metric.suffix
              },
            })
          },
        })
      })

      // Animate items in
      const items = gridRef.current.querySelectorAll('.impact-item')
      gsap.fromTo(
        items,
        { opacity: 0, y: 40 },
        {
          scrollTrigger: { trigger: gridRef.current, start: 'top 80%', once: true },
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="impact"
      className="section relative overflow-hidden"
      style={{ background: 'var(--bg-secondary)' }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 50% 80% at 20% 50%, rgba(59,130,246,0.06) 0%, transparent 70%),
            radial-gradient(ellipse 50% 80% at 80% 50%, rgba(168,85,247,0.06) 0%, transparent 70%)
          `,
        }}
      />

      <div className="max-w-[1200px] mx-auto px-6 relative z-[1]">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="section-label-row justify-center">
            <span className="section-label-line" />
            <span className="section-label-text">By the Numbers</span>
            <span className="section-label-line" />
          </div>
          <h2 className="section-heading">
            Real-World <span className="gradient-text">Impact</span>
          </h2>
        </div>

        {/* Metrics Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-10"
        >
          {metrics.map((metric) => {
            const accent = accentColorMap[metric.accent]
            return (
              <div
                key={metric.label}
                className="impact-item text-center py-10 px-5 rounded-2xl relative overflow-hidden"
                style={{
                  background: 'var(--bg-card)',
                  border: `1px solid ${accent.border}`,
                  opacity: 0,
                }}
              >
                {/* Top accent line */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] rounded-t-full"
                  style={{ background: accent.gradient }}
                />

                {/* Counter */}
                <div
                  id={`impact-metric-${metric.label.replace(/\s+/g, '-')}`}
                  className="font-mono font-black leading-none mb-3"
                  style={{
                    fontSize: 'clamp(36px, 5vw, 64px)',
                    letterSpacing: '-2px',
                    background: accent.gradient,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  0{metric.suffix}
                </div>

                <div
                  className="text-base font-bold mb-2"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {metric.label}
                </div>
                <div
                  className="text-xs leading-relaxed"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {metric.description}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
