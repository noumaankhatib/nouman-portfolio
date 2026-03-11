'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { skills } from '@/lib/data'

gsap.registerPlugin(ScrollTrigger)

const colorMap = {
  blue:   { color: 'var(--accent-blue)',   bg: 'rgba(59,130,246,0.1)',  bar: 'linear-gradient(90deg, #3b82f6, #a855f7)' },
  purple: { color: 'var(--accent-purple)', bg: 'rgba(168,85,247,0.1)', bar: 'linear-gradient(90deg, #a855f7, #3b82f6)' },
  green:  { color: 'var(--accent-green)',  bg: 'rgba(0,255,136,0.1)',  bar: 'linear-gradient(90deg, #00ff88, #06b6d4)' },
  cyan:   { color: 'var(--accent-cyan)',   bg: 'rgba(6,182,212,0.1)',  bar: 'linear-gradient(90deg, #06b6d4, #3b82f6)' },
  orange: { color: 'var(--accent-orange)', bg: 'rgba(249,115,22,0.1)', bar: 'linear-gradient(90deg, #f97316, #a855f7)' },
}

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Category cards animate in
      const categories = sectionRef.current?.querySelectorAll('.skill-category-card')
      if (categories) {
        gsap.fromTo(
          categories,
          { opacity: 0, y: 40 },
          {
            scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: 'power3.out',
          }
        )
      }

      // Skill bars animate width
      const bars = sectionRef.current?.querySelectorAll<HTMLElement>('.skill-bar-inner')
      bars?.forEach((bar) => {
        const level = bar.dataset.level || '0'
        ScrollTrigger.create({
          trigger: bar,
          start: 'top 90%',
          once: true,
          onEnter: () => {
            gsap.to(bar, {
              width: level + '%',
              duration: 1.2,
              ease: 'power3.out',
            })
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="section"
      style={{ background: 'var(--bg-secondary)' }}
    >
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <div className="mb-16">
          <div className="section-label-row">
            <span className="section-label-line" />
            <span className="section-label-text">Expertise</span>
          </div>
          <h2 className="section-heading mb-4">
            Technical <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-lg max-w-xl" style={{ color: 'var(--text-muted)' }}>
            Full-stack depth with specialization in distributed backend systems and high-throughput architectures.
          </p>
        </div>

        {/* 2x2 Grid */}
        <div className="grid md:grid-cols-2 gap-12">
          {skills.map((category) => {
            const accent = colorMap[category.color]
            return (
              <div
                key={category.category}
                className="skill-category-card"
                style={{ opacity: 0 }}
              >
                {/* Category Title */}
                <h3
                  className="text-lg font-bold mb-6 flex items-center gap-3"
                >
                  <span
                    className="w-1 h-5 rounded-sm"
                    style={{ background: accent.color }}
                  />
                  <span style={{ color: accent.color }}>{category.category}</span>
                </h3>

                {/* Skills */}
                <div className="flex flex-col gap-5">
                  {category.items.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between mb-2">
                        <span
                          className="text-sm font-semibold font-mono"
                          style={{ color: 'var(--text-secondary)' }}
                        >
                          {skill.name}
                        </span>
                        <span
                          className="font-mono text-[13px]"
                          style={{ color: 'var(--text-muted)' }}
                        >
                          {skill.level}%
                        </span>
                      </div>
                      <div
                        className="w-full h-2 rounded-full overflow-hidden"
                        style={{ background: 'var(--bg-card)' }}
                      >
                        <div
                          className="skill-bar-inner skill-bar-fill h-full w-0 rounded-full"
                          data-level={skill.level}
                          style={{ background: accent.bar }}
                        />
                      </div>
                    </div>
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
