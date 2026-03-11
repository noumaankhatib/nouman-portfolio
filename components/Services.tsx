'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { services } from '@/lib/data'

gsap.registerPlugin(ScrollTrigger)

const accentMap = {
  blue: { color: 'var(--accent-blue)', glow: 'var(--glow-blue)', bg: 'rgba(59,130,246,0.1)', border: 'rgba(59,130,246,0.15)' },
  purple: { color: 'var(--accent-purple)', glow: 'var(--glow-purple)', bg: 'rgba(168,85,247,0.1)', border: 'rgba(168,85,247,0.15)' },
  green: { color: 'var(--accent-green)', glow: 'var(--glow-green)', bg: 'rgba(0,255,136,0.1)', border: 'rgba(0,255,136,0.15)' },
}

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll('.service-card')
        gsap.fromTo(
          cards,
          { opacity: 0, scale: 0.92, y: 40 },
          {
            scrollTrigger: { trigger: gridRef.current, start: 'top 80%', once: true },
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
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
      id="services"
      className="section"
      style={{ background: 'var(--bg-primary)' }}
    >
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <div className="mb-16">
          <div className="section-label-row">
            <span className="section-label-line" />
            <span className="section-label-text">What I Do</span>
          </div>
          <h2 className="section-heading mb-4">
            Core <span className="gradient-text">Services</span>
          </h2>
          <p className="text-lg max-w-xl" style={{ color: 'var(--text-muted)' }}>
            Specialized engineering for companies that can&apos;t afford to fail at scale.
          </p>
        </div>

        {/* Grid */}
        <div
          ref={gridRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service) => {
            const accent = accentMap[service.accent]
            return (
              <div
                key={service.title}
                className="service-card relative p-10 rounded-2xl overflow-hidden transition-all duration-300 group"
                style={{
                  background: 'var(--glass-bg)',
                  border: '1px solid var(--glass-border)',
                  backdropFilter: 'blur(var(--glass-blur))',
                  WebkitBackdropFilter: 'blur(var(--glass-blur))',
                  opacity: 0,
                }}
                data-cursor="Explore"
                onMouseEnter={(e) => {
                  const el = e.currentTarget
                  el.style.transform = 'translateY(-6px)'
                  el.style.boxShadow = accent.glow
                  el.style.borderColor = accent.border
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget
                  el.style.transform = 'translateY(0)'
                  el.style.boxShadow = 'none'
                  el.style.borderColor = 'var(--glass-border)'
                }}
              >
                {/* Icon */}
                <span
                  className="text-5xl mb-6 block transition-transform duration-300 group-hover:scale-110"
                >
                  {service.icon}
                </span>

                {/* Title */}
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>

                {/* Description */}
                <p
                  className="text-sm leading-relaxed mb-5"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {service.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-md text-xs font-semibold font-mono"
                      style={{
                        background: accent.bg,
                        color: accent.color,
                        border: `1px solid ${accent.border}`,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
