'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { skills } from '@/lib/data'

gsap.registerPlugin(ScrollTrigger)

const colorMap: Record<string, {
  color: string; hex: string; bg: string; border: string;
  glow: string; gradient: string; rgbA: string
}> = {
  blue:   { color: 'var(--accent-blue)',   hex: '#3b82f6', bg: 'rgba(59,130,246,0.08)',  border: 'rgba(59,130,246,0.25)', glow: '0 0 30px rgba(59,130,246,0.35)',  gradient: 'linear-gradient(135deg, #3b82f6, #6366f1)', rgbA: '59,130,246' },
  purple: { color: 'var(--accent-purple)', hex: '#a855f7', bg: 'rgba(168,85,247,0.08)', border: 'rgba(168,85,247,0.25)', glow: '0 0 30px rgba(168,85,247,0.35)', gradient: 'linear-gradient(135deg, #a855f7, #3b82f6)', rgbA: '168,85,247' },
  green:  { color: 'var(--accent-green)',  hex: '#00ff88', bg: 'rgba(0,255,136,0.06)',  border: 'rgba(0,255,136,0.2)',  glow: '0 0 30px rgba(0,255,136,0.3)',  gradient: 'linear-gradient(135deg, #00ff88, #06b6d4)', rgbA: '0,255,136' },
  cyan:   { color: 'var(--accent-cyan)',   hex: '#06b6d4', bg: 'rgba(6,182,212,0.08)',  border: 'rgba(6,182,212,0.25)', glow: '0 0 30px rgba(6,182,212,0.35)',  gradient: 'linear-gradient(135deg, #06b6d4, #3b82f6)', rgbA: '6,182,212' },
  orange: { color: 'var(--accent-orange)', hex: '#f97316', bg: 'rgba(249,115,22,0.08)', border: 'rgba(249,115,22,0.25)', glow: '0 0 30px rgba(249,115,22,0.35)', gradient: 'linear-gradient(135deg, #f97316, #a855f7)', rgbA: '249,115,22' },
}

const categoryIcons: Record<string, string> = {
  'Backend': '⚙️',
  'Databases & Data': '🗄️',
  'Caching & Messaging': '🚀',
  'DevOps & Cloud': '☁️',
  'Monitoring & Logging': '📊',
  'Frontend': '🖥️',
}

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const showcaseRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const chipsContainerRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const isAnimating = useRef(false)
  const hasRevealed = useRef(false)

  const accent = colorMap[skills[active].color]

  const animateChipsIn = useCallback(() => {
    if (!chipsContainerRef.current) return
    const chips = chipsContainerRef.current.querySelectorAll('.skill-orb')
    gsap.fromTo(chips,
      { opacity: 0, scale: 0, y: 30, rotation: -8 },
      {
        opacity: 1, scale: 1, y: 0, rotation: 0,
        duration: 0.5, stagger: 0.04,
        ease: 'back.out(1.8)',
        onComplete: () => { isAnimating.current = false },
      }
    )
  }, [])

  const switchCategory = useCallback((index: number) => {
    if (index === active || isAnimating.current) return
    isAnimating.current = true

    if (!chipsContainerRef.current) return
    const chips = chipsContainerRef.current.querySelectorAll('.skill-orb')

    gsap.to(chips, {
      opacity: 0, scale: 0.6, y: -20, rotation: 8,
      duration: 0.3, stagger: 0.02,
      ease: 'power2.in',
      onComplete: () => {
        setActive(index)
        setTimeout(animateChipsIn, 50)
      },
    })

    const newAccent = colorMap[skills[index].color]
    if (glowRef.current) {
      gsap.to(glowRef.current, {
        background: `radial-gradient(ellipse 50% 60% at 50% 40%, rgba(${newAccent.rgbA},0.12) 0%, transparent 70%)`,
        duration: 0.8, ease: 'power2.out',
      })
    }
  }, [active, animateChipsIn])

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(headerRef.current.children,
          { opacity: 0, y: 30 },
          {
            scrollTrigger: { trigger: headerRef.current, start: 'top 85%', once: true },
            opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
          }
        )
      }

      if (showcaseRef.current) {
        ScrollTrigger.create({
          trigger: showcaseRef.current,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            if (hasRevealed.current) return
            hasRevealed.current = true

            gsap.fromTo(showcaseRef.current,
              { opacity: 0, y: 50, scale: 0.96 },
              { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out' }
            )

            setTimeout(animateChipsIn, 300)
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [animateChipsIn])

  useEffect(() => {
    if (!chipsContainerRef.current) return
    const orbs = chipsContainerRef.current.querySelectorAll<HTMLElement>('.skill-orb')
    const tweens: gsap.core.Tween[] = []
    orbs.forEach((orb, i) => {
      const t = gsap.to(orb, {
        y: `${-4 + (i % 3) * 2}`,
        duration: 2 + (i % 4) * 0.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 0.15,
      })
      tweens.push(t)
    })
    return () => tweens.forEach((t) => t.kill())
  }, [active])

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="section relative overflow-hidden"
      style={{ background: 'var(--bg-secondary)' }}
    >
      {/* Ambient glow */}
      <div
        ref={glowRef}
        className="absolute inset-0 pointer-events-none transition-all duration-700"
        style={{
          background: `radial-gradient(ellipse 50% 60% at 50% 40%, rgba(${accent.rgbA},0.12) 0%, transparent 70%)`,
        }}
      />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 relative z-[1]">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-10 sm:mb-16">
          <div className="section-label-row justify-center">
            <span className="section-label-line" />
            <span className="section-label-text">Expertise</span>
            <span className="section-label-line" />
          </div>
          <h2 className="section-heading mb-4">
            Technical <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: 'var(--text-muted)' }}>
            A comprehensive toolkit for building enterprise-grade distributed systems.
          </p>
        </div>

        {/* Showcase Card */}
        <div
          ref={showcaseRef}
          className="relative rounded-2xl sm:rounded-3xl overflow-hidden"
          style={{
            background: 'var(--glass-bg)',
            border: '1px solid var(--glass-border)',
            backdropFilter: 'blur(var(--glass-blur))',
            WebkitBackdropFilter: 'blur(var(--glass-blur))',
            opacity: 0,
          }}
        >
          {/* Top gradient border */}
          <div
            className="absolute top-0 left-0 right-0 h-[2px] transition-all duration-500"
            style={{ background: accent.gradient }}
          />

          {/* Category Tabs */}
          <div
            className="flex gap-1 p-2 sm:p-3 overflow-x-auto scrollbar-none"
            style={{ borderBottom: '1px solid var(--border-subtle)' }}
          >
            {skills.map((cat, i) => {
              const catAccent = colorMap[cat.color]
              const isActive = i === active
              return (
                <button
                  key={cat.category}
                  onClick={() => switchCategory(i)}
                  className="flex items-center gap-2 px-3 sm:px-5 py-2.5 sm:py-3 rounded-xl text-[13px] sm:text-sm font-semibold whitespace-nowrap transition-all duration-300 shrink-0"
                  style={{
                    background: isActive ? catAccent.bg : 'transparent',
                    color: isActive ? catAccent.color : 'var(--text-muted)',
                    border: `1px solid ${isActive ? catAccent.border : 'transparent'}`,
                    boxShadow: isActive ? `0 0 15px rgba(${catAccent.rgbA},0.15)` : 'none',
                  }}
                >
                  <span className="text-base sm:text-lg">{categoryIcons[cat.category] || '💡'}</span>
                  <span className="hidden sm:inline">{cat.category}</span>
                </button>
              )
            })}
          </div>

          {/* Main Display */}
          <div className="p-6 sm:p-10 md:p-12">
            {/* Category Header */}
            <div className="flex items-center gap-4 sm:gap-5 mb-8 sm:mb-10">
              <div
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-3xl sm:text-4xl shrink-0"
                style={{
                  background: accent.bg,
                  border: `1px solid ${accent.border}`,
                  boxShadow: accent.glow,
                  animation: 'float 3s ease-in-out infinite',
                }}
              >
                {categoryIcons[skills[active].category] || '💡'}
              </div>
              <div>
                <h3
                  className="text-xl sm:text-2xl md:text-3xl font-extrabold mb-1 transition-colors duration-500"
                  style={{ color: accent.color }}
                >
                  {skills[active].category}
                </h3>
                <p
                  className="text-sm font-mono"
                  style={{ color: 'var(--text-dim)' }}
                >
                  {skills[active].items.length} technologies
                </p>
              </div>
            </div>

            {/* Skill Orbs */}
            <div
              ref={chipsContainerRef}
              className="flex flex-wrap gap-3 sm:gap-4"
            >
              {skills[active].items.map((skill) => (
                <div
                  key={skill.name}
                  className="skill-orb group relative cursor-default"
                  style={{ opacity: 0 }}
                >
                  <div
                    className="relative px-5 py-3 sm:px-6 sm:py-3.5 rounded-xl font-semibold text-sm sm:text-[15px] transition-all duration-300 group-hover:-translate-y-1.5 group-hover:scale-105"
                    style={{
                      background: `linear-gradient(135deg, rgba(${accent.rgbA},0.1), rgba(${accent.rgbA},0.04))`,
                      border: `1px solid ${accent.border}`,
                      color: accent.color,
                      letterSpacing: '-0.01em',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = `${accent.glow}, inset 0 1px 0 rgba(255,255,255,0.1)`
                      e.currentTarget.style.borderColor = accent.hex
                      e.currentTarget.style.background = `linear-gradient(135deg, rgba(${accent.rgbA},0.2), rgba(${accent.rgbA},0.08))`
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = 'none'
                      e.currentTarget.style.borderColor = accent.border
                      e.currentTarget.style.background = `linear-gradient(135deg, rgba(${accent.rgbA},0.1), rgba(${accent.rgbA},0.04))`
                    }}
                  >
                    {/* Pulse ring on hover */}
                    <span
                      className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none"
                      style={{
                        border: `1px solid ${accent.hex}`,
                        animation: 'skill-pulse 1.5s ease-out infinite',
                      }}
                    />
                    {skill.name}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom stats bar */}
          <div
            className="grid grid-cols-3 sm:grid-cols-6 gap-px"
            style={{ borderTop: '1px solid var(--border-subtle)' }}
          >
            {skills.map((cat, i) => {
              const c = colorMap[cat.color]
              const isActive = i === active
              return (
                <button
                  key={cat.category}
                  onClick={() => switchCategory(i)}
                  className="relative py-3 sm:py-4 flex flex-col items-center gap-1 transition-all duration-300"
                  style={{
                    background: isActive ? `rgba(${c.rgbA},0.06)` : 'var(--bg-secondary)',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.background = `rgba(${c.rgbA},0.04)`
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.background = 'var(--bg-secondary)'
                  }}
                >
                  {isActive && (
                    <div
                      className="absolute top-0 left-4 right-4 h-[2px] rounded-b-sm"
                      style={{ background: c.gradient }}
                    />
                  )}
                  <span className="text-base sm:text-lg">{categoryIcons[cat.category] || '💡'}</span>
                  <span
                    className="font-mono text-[10px] font-bold transition-colors duration-300"
                    style={{ color: isActive ? c.color : 'var(--text-dim)' }}
                  >
                    {cat.items.length}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
