'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects } from '@/lib/data'

gsap.registerPlugin(ScrollTrigger)

const accentMap = {
  blue:   { color: 'var(--accent-blue)',   glow: 'rgba(59,130,246,0.4)',  bg: 'rgba(59,130,246,0.1)',  border: 'rgba(59,130,246,0.15)',  hex: '#3b82f6' },
  purple: { color: 'var(--accent-purple)', glow: 'rgba(168,85,247,0.4)', bg: 'rgba(168,85,247,0.1)', border: 'rgba(168,85,247,0.15)', hex: '#a855f7' },
  green:  { color: 'var(--accent-green)',  glow: 'rgba(0,255,136,0.3)',   bg: 'rgba(0,255,136,0.1)',  border: 'rgba(0,255,136,0.15)',  hex: '#00ff88' },
  cyan:   { color: 'var(--accent-cyan)',   glow: 'rgba(6,182,212,0.3)',   bg: 'rgba(6,182,212,0.1)',  border: 'rgba(6,182,212,0.15)',  hex: '#06b6d4' },
  orange: { color: 'var(--accent-orange)', glow: 'rgba(249,115,22,0.3)', bg: 'rgba(249,115,22,0.1)', border: 'rgba(249,115,22,0.15)', hex: '#f97316' },
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll('.project-card-item')
        gsap.fromTo(
          cards,
          { opacity: 0, y: 60, scale: 0.9 },
          {
            scrollTrigger: { trigger: gridRef.current, start: 'top 80%', once: true },
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: 'power3.out',
          }
        )
      }

      // 3D tilt on desktop — inside context for proper cleanup
      if (window.innerWidth >= 768 && gridRef.current) {
        const cards = gridRef.current.querySelectorAll<HTMLElement>('.project-card-item')
        const cleanupFns: Array<() => void> = []
        cards.forEach((card) => {
          const onMove = (e: MouseEvent) => {
            const rect = card.getBoundingClientRect()
            const cx = rect.width / 2
            const cy = rect.height / 2
            const rotateX = ((e.clientY - rect.top - cy) / cy) * -8
            const rotateY = ((e.clientX - rect.left - cx) / cx) * 8
            gsap.to(card, { rotateX, rotateY, scale: 1.02, duration: 0.4, ease: 'power2.out', transformPerspective: 800 })
          }
          const onLeave = () => {
            gsap.to(card, { rotateX: 0, rotateY: 0, scale: 1, duration: 0.6, ease: 'power3.out' })
          }
          card.addEventListener('mousemove', onMove)
          card.addEventListener('mouseleave', onLeave)
          cleanupFns.push(() => {
            card.removeEventListener('mousemove', onMove)
            card.removeEventListener('mouseleave', onLeave)
          })
        })
        return () => cleanupFns.forEach((fn) => fn())
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="section"
      style={{ background: 'var(--bg-primary)' }}
    >
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <div className="mb-16">
          <div className="section-label-row">
            <span className="section-label-line" />
            <span className="section-label-text">Work</span>
          </div>
          <h2 className="section-heading mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-lg max-w-xl" style={{ color: 'var(--text-muted)' }}>
            Production systems powering real-world scale — no prototypes, no toy projects.
          </p>
        </div>

        {/* Grid */}
        <div
          ref={gridRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project) => {
            const accent = accentMap[project.accent]
            const CardWrapper = project.url ? 'a' : 'div'
            const wrapperProps = project.url
              ? { href: project.url, target: '_blank', rel: 'noopener noreferrer' }
              : {}
            return (
              <CardWrapper
                key={project.id}
                {...(wrapperProps as any)}
                className="project-card project-card-item relative rounded-2xl p-8 overflow-hidden transition-all duration-300 block"
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                  opacity: 0,
                  cursor: project.url ? 'pointer' : 'default',
                  textDecoration: 'none',
                  color: 'inherit',
                }}
                data-cursor={project.url ? 'Visit' : 'Details'}
                onMouseEnter={(e: React.MouseEvent<HTMLElement>) => {
                  e.currentTarget.style.borderColor = accent.border
                  e.currentTarget.style.boxShadow = `0 20px 60px rgba(0,0,0,0.3), 0 0 40px ${accent.glow}`
                }}
                onMouseLeave={(e: React.MouseEvent<HTMLElement>) => {
                  e.currentTarget.style.borderColor = 'var(--border-subtle)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                {/* Header row */}
                <div className="flex items-start justify-between mb-4 gap-3">
                  <h3 className="text-xl font-extrabold">{project.name}</h3>
                  <span
                    className="font-mono text-[11px] px-2 py-1 rounded-md whitespace-nowrap shrink-0"
                    style={{
                      background: accent.bg,
                      color: accent.color,
                      border: `1px solid ${accent.border}`,
                    }}
                  >
                    {project.year}
                  </span>
                </div>

                {/* Tag */}
                <div
                  className="font-mono text-[11px] mb-3"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {project.tag}
                </div>

                {/* Impact Badge */}
                <div
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-sm font-bold mb-4"
                  style={{
                    background: `linear-gradient(135deg, ${accent.bg}, rgba(168,85,247,0.05))`,
                    border: `1px solid ${accent.border}`,
                    color: accent.color,
                  }}
                >
                  📊 {project.impact}
                </div>

                {/* Description */}
                <p
                  className="text-sm leading-relaxed mb-5"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {project.description}
                </p>

                {/* Stack */}
                <div className="flex flex-wrap gap-1.5">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md text-[11px] font-semibold font-mono"
                      style={{
                        background: accent.bg,
                        color: accent.color,
                        border: `1px solid ${accent.border}`,
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </CardWrapper>
            )
          })}
        </div>
      </div>
    </section>
  )
}
