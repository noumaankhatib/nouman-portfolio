'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { orbitIcons } from '@/lib/data'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: '8+', label: 'Years Experience' },
  { value: '500M+', label: 'Users Served' },
  { value: '99.9%', label: 'Uptime' },
  { value: '2B+', label: 'Records Migrated' },
]

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const quoteRef = useRef<HTMLQuoteElement>(null)
  const textColRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const orbContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Quote from left
      if (quoteRef.current) {
        gsap.fromTo(
          quoteRef.current,
          { opacity: 0, x: -60 },
          {
            scrollTrigger: { trigger: quoteRef.current, start: 'top 85%', once: true },
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power3.out',
          }
        )
      }

      // Text paragraphs from right
      if (textColRef.current) {
        const paras = textColRef.current.querySelectorAll('p, h2')
        gsap.fromTo(
          paras,
          { opacity: 0, x: 60 },
          {
            scrollTrigger: { trigger: textColRef.current, start: 'top 85%', once: true },
            opacity: 1,
            x: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power3.out',
          }
        )
      }

      // Stats scale in
      if (statsRef.current) {
        const statItems = statsRef.current.querySelectorAll('.stat-item')
        gsap.fromTo(
          statItems,
          { opacity: 0, scale: 0.85 },
          {
            scrollTrigger: { trigger: statsRef.current, start: 'top 85%', once: true },
            opacity: 1,
            scale: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: 'back.out(1.4)',
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="about"
      className="section"
      style={{ background: 'var(--bg-secondary)' }}
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          {/* Left Column */}
          <div>
            {/* Section Label */}
            <div className="section-label-row mb-6">
              <span className="section-label-line" />
              <span className="section-label-text">About Me</span>
            </div>

            {/* Quote */}
            <blockquote
              ref={quoteRef}
              className="text-3xl font-extrabold leading-tight mb-8 pl-6"
              style={{
                borderLeft: '3px solid var(--accent-blue)',
                letterSpacing: '-0.5px',
                opacity: 0,
              }}
            >
              "I don't write code. I{' '}
              <span className="gradient-text">architect systems</span> that outlive hype cycles."
            </blockquote>

            {/* Orbit Animation */}
            <div className="flex justify-center mb-8">
              <div
                ref={orbContainerRef}
                className="relative"
                style={{ width: '280px', height: '280px' }}
              >
                {/* Center NK */}
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full flex items-center justify-center text-3xl font-black text-white z-[2]"
                  style={{
                    background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-purple))',
                    boxShadow: 'var(--glow-blue)',
                  }}
                >
                  NK
                </div>

                {/* Orbit ring */}
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                  style={{
                    width: '240px',
                    height: '240px',
                    border: '1px dashed rgba(59,130,246,0.2)',
                  }}
                />

                {/* Orbit icons */}
                {orbitIcons.map((icon, i) => (
                  <div
                    key={i}
                    className="orbit-icon"
                    style={{
                      top: '50%',
                      left: '50%',
                      marginTop: '-22px',
                      marginLeft: '-22px',
                      '--orbit-duration': `${18 + i * 3}s`,
                      '--orbit-delay': `${-(i * 3)}s`,
                    } as React.CSSProperties}
                  >
                    {icon}
                  </div>
                ))}
              </div>
            </div>

            {/* Stats Grid */}
            <div ref={statsRef} className="grid grid-cols-2 gap-4">
              {stats.map(({ value, label }) => (
                <div
                  key={label}
                  className="stat-item p-4 rounded-xl text-center"
                  style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-subtle)',
                  }}
                >
                  <div
                    className="text-2xl font-black font-mono mb-1 gradient-text"
                  >
                    {value}
                  </div>
                  <div
                    className="text-xs font-semibold"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div ref={textColRef}>
            <h2
              className="section-heading mb-6"
              style={{ opacity: 0 }}
            >
              The Engineer Behind{' '}
              <span className="gradient-text">Jio&apos;s Scale.</span>
            </h2>
            <p
              className="text-base leading-relaxed mb-5"
              style={{ color: 'var(--text-secondary)', opacity: 0 }}
            >
              I&apos;m a Senior Full Stack Developer with 8+ years of experience building large-scale distributed
              systems at Reliance Jio — India&apos;s largest telecom platform serving 500M+ subscribers.
            </p>
            <p
              className="text-base leading-relaxed mb-5"
              style={{ color: 'var(--text-secondary)', opacity: 0 }}
            >
              I specialize in designing high-throughput backend architectures, identity platforms, and real-time
              data pipelines that handle 100M+ daily requests with 99.9% uptime. My work spans the full stack:
              from Node.js and Java microservices to React dashboards and WebSocket-powered monitoring tools.
            </p>
            <p
              className="text-base leading-relaxed"
              style={{ color: 'var(--text-secondary)', opacity: 0 }}
            >
              I&apos;ve led critical projects including universal identity federation, payment platforms processing
              1M+ transactions daily, and massive data migrations of 2B+ records. I thrive in complex,
              high-stakes environments where system reliability isn&apos;t optional — it&apos;s existential.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
