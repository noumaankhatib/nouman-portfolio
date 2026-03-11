'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { timeline } from '@/lib/data'

gsap.registerPlugin(ScrollTrigger)

const colorMap = {
  blue:   'var(--accent-blue)',
  purple: 'var(--accent-purple)',
  cyan:   'var(--accent-cyan)',
  orange: 'var(--accent-orange)',
  green:  'var(--accent-green)',
}

export default function Timeline() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Line fills as user scrolls
      if (trackRef.current && lineRef.current) {
        ScrollTrigger.create({
          trigger: trackRef.current,
          start: 'top 70%',
          end: 'bottom 30%',
          scrub: 0.5,
          onUpdate: (self) => {
            if (lineRef.current) {
              lineRef.current.style.height = (self.progress * 100) + '%'
            }
          },
        })
      }

      // Items animate in from right
      const items = sectionRef.current?.querySelectorAll('.timeline-item')
      items?.forEach((item, i) => {
        gsap.fromTo(
          item,
          { opacity: 0, x: 30 },
          {
            scrollTrigger: { trigger: item, start: 'top 80%', once: true },
            opacity: 1,
            x: 0,
            duration: 0.6,
            delay: i * 0.05,
            ease: 'power3.out',
          }
        )
      })

      // Left column
      const leftCol = sectionRef.current?.querySelector('.timeline-left')
      if (leftCol) {
        gsap.fromTo(
          leftCol,
          { opacity: 0, x: -40 },
          {
            scrollTrigger: { trigger: leftCol, start: 'top 85%', once: true },
            opacity: 1,
            x: 0,
            duration: 0.8,
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
      id="timeline"
      className="section"
      style={{ background: 'var(--bg-primary)' }}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-10 md:gap-16 items-start">
          {/* Left: Intro */}
          <div className="timeline-left md:sticky md:top-24" style={{ opacity: 0 }}>
            <div className="section-label-row">
              <span className="section-label-line" />
              <span className="section-label-text">Journey</span>
            </div>
            <h2 className="section-heading mb-6">
              Work <span className="gradient-text">Experience</span>
            </h2>
            <p className="text-base leading-relaxed mb-6" style={{ color: 'var(--text-muted)' }}>
              8+ years of building enterprise-scale systems at Reliance Jio.
            </p>

            {/* Company Badge */}
            <div
              className="p-4 sm:p-6 rounded-xl sm:rounded-2xl"
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              <div className="text-xl font-extrabold mb-1">{timeline.company}</div>
              <div
                className="text-sm font-semibold mb-3"
                style={{ color: 'var(--accent-blue)' }}
              >
                {timeline.role}
              </div>
              <div
                className="font-mono text-xs"
                style={{ color: 'var(--text-muted)' }}
              >
                {timeline.period}
              </div>
              <div
                className="font-mono text-xs mt-1"
                style={{ color: 'var(--text-dim)' }}
              >
                {timeline.location}
              </div>
            </div>
          </div>

          {/* Right: Timeline track */}
          <div
            ref={trackRef}
            className="relative pl-12"
          >
            {/* Vertical line */}
            <div
              className="absolute left-4 top-0 w-0.5 rounded-sm"
              style={{
                height: '0%',
                background: 'linear-gradient(180deg, var(--accent-blue), var(--accent-purple))',
              }}
              ref={lineRef}
            />

            {timeline.items.map((item, i) => {
              const dotColor = colorMap[item.color]
              return (
                <div
                  key={i}
                  className="timeline-item relative pb-10"
                  style={{ opacity: 0 }}
                >
                  {/* Dot */}
                  <div
                    className="absolute -left-8 top-1.5 w-3 h-3 rounded-full z-[1]"
                    style={{
                      background: 'var(--bg-primary)',
                      border: `2px solid ${dotColor}`,
                      boxShadow: `0 0 8px ${dotColor}60`,
                    }}
                  />
                  <div
                    className="absolute -left-[26px] top-[9px] w-1.5 h-1.5 rounded-full"
                    style={{ background: dotColor }}
                  />

                  {/* Year */}
                  <div
                    className="font-mono text-[13px] font-bold mb-1"
                    style={{ color: dotColor }}
                  >
                    {item.year}
                  </div>

                  {/* Title */}
                  <h4 className="text-lg font-bold mb-1">{item.title}</h4>

                  {/* Description */}
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {item.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
