'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { testimonials } from '@/lib/data'

gsap.registerPlugin(ScrollTrigger)

const accentMap = {
  blue:   { color: 'var(--accent-blue)',   bg: 'rgba(59,130,246,0.15)',  border: 'rgba(59,130,246,0.3)',  gradient: 'linear-gradient(135deg, var(--accent-blue), var(--accent-purple))' },
  purple: { color: 'var(--accent-purple)', bg: 'rgba(168,85,247,0.15)', border: 'rgba(168,85,247,0.3)', gradient: 'linear-gradient(135deg, var(--accent-purple), var(--accent-blue))' },
  green:  { color: 'var(--accent-green)',  bg: 'rgba(0,255,136,0.1)',   border: 'rgba(0,255,136,0.2)',   gradient: 'linear-gradient(135deg, var(--accent-green), var(--accent-cyan))' },
}

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll('.testimonial-card-item')
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50, scale: 0.94 },
          {
            scrollTrigger: { trigger: gridRef.current, start: 'top 80%', once: true },
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.15,
            ease: 'power3.out',
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="section"
      style={{ background: 'var(--bg-secondary)' }}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-16">
          <div className="section-label-row justify-center">
            <span className="section-label-line" />
            <span className="section-label-text">Testimonials</span>
            <span className="section-label-line" />
          </div>
          <h2 className="section-heading">
            What They <span className="gradient-text">Say</span>
          </h2>
        </div>

        {/* Cards Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6"
        >
          {testimonials.map((t, i) => {
            const accent = accentMap[t.accent]
            return (
              <div
                key={i}
                className="testimonial-card-item relative p-6 sm:p-8 rounded-2xl overflow-hidden group transition-all duration-300"
                style={{
                  background: 'var(--glass-bg)',
                  border: `1px solid ${accent.border}`,
                  backdropFilter: 'blur(var(--glass-blur))',
                  WebkitBackdropFilter: 'blur(var(--glass-blur))',
                  opacity: 0,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)'
                  e.currentTarget.style.boxShadow = `0 20px 50px rgba(0,0,0,0.3), 0 0 30px ${accent.bg}`
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                {/* Top accent line */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px]"
                  style={{ background: accent.gradient }}
                />

                {/* Large quote mark */}
                <div
                  className="text-5xl sm:text-6xl font-black leading-none mb-3 sm:mb-4 select-none"
                  style={{ color: accent.color, opacity: 0.25, fontFamily: 'serif' }}
                >
                  &ldquo;
                </div>

                {/* Quote text */}
                <p
                  className="text-[13px] sm:text-sm leading-relaxed mb-6 sm:mb-8 italic pl-4 sm:pl-5"
                  style={{
                    color: 'var(--text-secondary)',
                    borderLeft: `2px solid ${accent.color}`,
                  }}
                >
                  {t.text}
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 mt-auto">
                  <div
                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold text-white shrink-0"
                    style={{ background: accent.gradient }}
                  >
                    {t.avatar}
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-sm sm:text-[15px] truncate">{t.name}</div>
                    <div
                      className="text-[11px] sm:text-xs truncate"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {t.role}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
