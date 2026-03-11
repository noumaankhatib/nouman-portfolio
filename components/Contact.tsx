'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (innerRef.current) {
        const children = innerRef.current.children
        gsap.fromTo(
          children,
          { opacity: 0, y: 40 },
          {
            scrollTrigger: { trigger: innerRef.current, start: 'top 80%', once: true },
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: 'power3.out',
          }
        )
      }

      // Magnetic buttons
      if (window.innerWidth >= 768) {
        const btns = sectionRef.current?.querySelectorAll<HTMLElement>('.magnetic-btn')
        btns?.forEach((btn) => {
          const onMove = (e: MouseEvent) => {
            const rect = btn.getBoundingClientRect()
            const x = e.clientX - rect.left - rect.width / 2
            const y = e.clientY - rect.top - rect.height / 2
            gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.3, ease: 'power2.out' })
          }
          const onLeave = () => {
            gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' })
          }
          btn.addEventListener('mousemove', onMove)
          btn.addEventListener('mouseleave', onLeave)
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="section relative overflow-hidden"
      style={{ background: 'var(--bg-secondary)' }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 60% at 50% 100%, rgba(59,130,246,0.08) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-[1200px] mx-auto px-6 relative z-[1]">
        <div
          ref={innerRef}
          className="text-center max-w-[700px] mx-auto"
        >
          {/* Section Label */}
          <div className="section-label-row justify-center mb-6">
            <span className="section-label-line" />
            <span className="section-label-text">Get in Touch</span>
            <span className="section-label-line" />
          </div>

          {/* Availability Badge */}
          <div
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-8 text-sm font-semibold"
            style={{
              background: 'rgba(0,255,136,0.08)',
              border: '1px solid rgba(0,255,136,0.2)',
              color: 'var(--accent-green)',
            }}
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{
                background: 'var(--accent-green)',
                animation: 'pulse-glow 2s ease-in-out infinite',
              }}
            />
            Open to new projects
          </div>

          {/* Heading */}
          <h2 className="section-heading mb-4">
            Let&apos;s Build <span className="gradient-text">Something</span>
          </h2>
          <p
            className="text-lg leading-relaxed mb-12"
            style={{ color: 'var(--text-muted)' }}
          >
            Got a system that needs to scale? An identity problem to solve? A migration that
            can&apos;t fail? I&apos;m available for freelance engineering projects worldwide.
          </p>

          {/* Email Button */}
          <div className="mb-6">
            <a
              href="mailto:noumaankhatib@gmail.com"
              className="contact-email-btn magnetic-btn"
              data-cursor="Email"
            >
              <span>✉</span>
              noumaankhatib@gmail.com
            </a>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-4 mb-8 flex-wrap">
            <a
              href="https://github.com/noumaankhatib"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link magnetic-btn inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-semibold text-[15px] transition-all duration-300 hover:-translate-y-0.5"
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent-blue)'
                e.currentTarget.style.boxShadow = 'var(--glow-blue)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-subtle)'
                e.currentTarget.style.boxShadow = 'none'
              }}
              data-cursor="GitHub"
            >
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/noumaankhatib"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link magnetic-btn inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-semibold text-[15px] transition-all duration-300 hover:-translate-y-0.5"
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent-blue)'
                e.currentTarget.style.boxShadow = 'var(--glow-blue)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-subtle)'
                e.currentTarget.style.boxShadow = 'none'
              }}
              data-cursor="LinkedIn"
            >
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </a>
          </div>

          {/* Secondary CTA */}
          <a
            href="https://calendly.com"
            target="_blank"
            rel="noopener noreferrer"
            className="magnetic-btn inline-flex items-center gap-2 px-8 py-4 rounded-xl text-[15px] font-semibold transition-all duration-300 hover:-translate-y-0.5"
            style={{
              background: 'transparent',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-hover)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--accent-blue)'
              e.currentTarget.style.background = 'rgba(59,130,246,0.05)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-hover)'
              e.currentTarget.style.background = 'transparent'
            }}
          >
            📅 Schedule a Call
          </a>
        </div>
      </div>
    </section>
  )
}
