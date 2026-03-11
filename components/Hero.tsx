'use client'
import { useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import gsap from 'gsap'
import { metrics } from '@/lib/data'

const ParticleScene = dynamic(() => import('./ParticleScene'), { ssr: false })

export default function Hero() {
  const sectionRef     = useRef<HTMLElement>(null)
  const badgeRef       = useRef<HTMLDivElement>(null)
  const nameRef        = useRef<HTMLHeadingElement>(null)
  const titleRef       = useRef<HTMLParagraphElement>(null)
  const taglineRef     = useRef<HTMLDivElement>(null)
  const subRef         = useRef<HTMLParagraphElement>(null)
  const ctasRef        = useRef<HTMLDivElement>(null)
  const metricsRef     = useRef<HTMLDivElement>(null)
  const scrollHintRef  = useRef<HTMLDivElement>(null)
  // Prevent React StrictMode double-execution
  const animationDone  = useRef(false)
  const typeInterval   = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    const runAnimations = () => {
      // Guard: only run once even in StrictMode dev
      if (animationDone.current) return
      animationDone.current = true

      const badge     = badgeRef.current
      const nameEl    = nameRef.current
      const title     = titleRef.current
      const taglineEl = taglineRef.current
      const sub       = subRef.current
      const ctas      = ctasRef.current
      const metricsEl = metricsRef.current
      const scrollHint = scrollHintRef.current
      if (!nameEl) return

      // ── Split name into individual chars with word-aware grouping ──
      const nameParts = ['NOUMAN', 'KHATIB']
      nameEl.innerHTML = ''
      nameParts.forEach((word, wIdx) => {
        const wordWrap = document.createElement('span')
        wordWrap.className = 'hero-name-word'
        wordWrap.style.display = 'inline-block'
        wordWrap.style.whiteSpace = 'nowrap'
        word.split('').forEach((ch) => {
          const span = document.createElement('span')
          span.className = 'hero-name-char'
          span.textContent = ch
          wordWrap.appendChild(span)
        })
        nameEl.appendChild(wordWrap)
        if (wIdx < nameParts.length - 1) {
          const space = document.createElement('span')
          space.className = 'hero-name-char char-space'
          nameEl.appendChild(space)
        }
      })
      const chars = nameEl.querySelectorAll('.hero-name-char:not(.char-space)')

      const tl = gsap.timeline({ delay: 0.15 })

      // Badge
      if (badge) {
        gsap.set(badge, { opacity: 0, y: -16 })
        tl.to(badge, { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out' }, 0)
      }

      // Name chars — stagger up from y:80
      tl.to(chars, {
        opacity: 1,
        y: 0,
        duration: 0.65,
        stagger: 0.032,
        ease: 'back.out(1.3)',
      }, 0.15)

      // Title — blur reveal
      if (title) {
        gsap.set(title, { opacity: 0, filter: 'blur(10px)', y: 10 })
        tl.to(title, { opacity: 1, filter: 'blur(0px)', y: 0, duration: 0.75, ease: 'power2.out' }, 0.55)
      }

      // Tagline — typewriter
      if (taglineEl) {
        const typedSpan  = taglineEl.querySelector<HTMLElement>('.typed-text')
        const cursorSpan = taglineEl.querySelector<HTMLElement>('.typed-cursor')
        if (typedSpan) {
          const fullText = "I Don't Just Build Apps. I Build Revenue Machines."
          typedSpan.textContent = ''
          gsap.set(taglineEl, { opacity: 1 })
          tl.call(() => {
            let idx = 0
            // Clear any stale interval from previous run
            if (typeInterval.current) clearInterval(typeInterval.current)
            typeInterval.current = setInterval(() => {
              if (idx < fullText.length) {
                typedSpan.textContent += fullText[idx]
                idx++
              } else {
                clearInterval(typeInterval.current!)
                typeInterval.current = null
                setTimeout(() => {
                  if (cursorSpan) cursorSpan.style.display = 'none'
                }, 1800)
              }
            }, 32)
          }, [], 0.95)
        }
      }

      // Sub text
      if (sub) {
        gsap.set(sub, { opacity: 0, y: 16 })
        tl.to(sub, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, 1.5)
      }

      // CTAs
      if (ctas) {
        gsap.set(ctas, { opacity: 0, y: 16 })
        tl.to(ctas, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, 1.65)
      }

      // Metrics row
      if (metricsEl) {
        gsap.set(metricsEl, { opacity: 0, y: 20 })
        tl.to(metricsEl, { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out' }, 1.8)

        // Roll-up counters
        metrics.forEach((metric, i) => {
          const id = `hero-metric-${metric.label.replace(/\s+/g, '-')}`
          const el = document.getElementById(id)
          if (!el) return
          const isDecimal = metric.value % 1 !== 0
          const obj = { val: 0 }
          tl.to(obj, {
            val: metric.value,
            duration: 2.2,
            ease: 'power2.out',
            onUpdate: () => {
              el.textContent = (isDecimal ? obj.val.toFixed(1) : Math.floor(obj.val)) + metric.suffix
            },
          }, 1.95 + i * 0.08)
        })
      }

      // Scroll hint
      if (scrollHint) {
        gsap.set(scrollHint, { opacity: 0 })
        tl.to(scrollHint, { opacity: 1, duration: 0.6 }, 2.6)
      }
    }

    // Trigger from loader or fall back after 2.5s
    const onLoaderDone = () => runAnimations()
    window.addEventListener('loaderComplete', onLoaderDone)
    const fallback = setTimeout(runAnimations, 2500)

    return () => {
      window.removeEventListener('loaderComplete', onLoaderDone)
      clearTimeout(fallback)
      if (typeInterval.current) clearInterval(typeInterval.current)
      // Allow re-run if component remounts (e.g. HMR)
      animationDone.current = false
    }
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Three.js particle canvas */}
      <ParticleScene />

      {/* Layered depth overlays */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: [
            'radial-gradient(ellipse 90% 60% at 50% 10%, rgba(59,130,246,0.10) 0%, transparent 65%)',
            'radial-gradient(ellipse 55% 40% at 85% 15%, rgba(168,85,247,0.07) 0%, transparent 55%)',
            'radial-gradient(ellipse 50% 35% at 10% 80%, rgba(0,255,136,0.04) 0%, transparent 50%)',
            'linear-gradient(180deg, rgba(5,5,16,0) 0%, rgba(5,5,16,0.3) 60%, rgba(5,5,16,1) 100%)',
          ].join(','),
        }}
      />

      {/* ── Content — centred ── */}
      <div
        className="relative z-[2] w-full max-w-[960px] mx-auto px-4 sm:px-6 text-center"
        style={{ paddingTop: 'calc(var(--nav-height) + 1.5rem)', paddingBottom: '4rem' }}
      >

        {/* Availability badge */}
        <div
          ref={badgeRef}
          className="inline-flex items-center gap-2 px-4 py-1.5 sm:px-5 sm:py-2 rounded-full mb-6 sm:mb-8 text-xs sm:text-sm font-semibold font-mono tracking-wide"
          style={{
            background: 'rgba(0,255,136,0.07)',
            border: '1px solid rgba(0,255,136,0.25)',
            color: 'var(--accent-green)',
          }}
        >
          <span
            className="w-2 h-2 rounded-full flex-shrink-0"
            style={{ background: 'var(--accent-green)', animation: 'pulse-glow 2s ease-in-out infinite' }}
          />
          Available for Projects
        </div>

        {/* Name — split-char reveal */}
        <h1
          ref={nameRef}
          className="hero-name font-black leading-none mb-4"
          aria-label="Nouman Khatib"
        >
          NOUMAN KHATIB
        </h1>

        {/* Title line */}
        <p
          ref={titleRef}
          className="hero-title-line font-mono mb-6"
        >
          <span className="hero-title-role">Senior Full Stack Developer</span>
          <span className="hero-title-sep hidden sm:inline">&nbsp;·&nbsp;</span>
          <br className="sm:hidden" />
          <span className="hero-title-meta">8+ Years · Node.js Expert · Remote Worldwide</span>
        </p>

        {/* Typewriter tagline */}
        <div
          ref={taglineRef}
          className="hero-tagline mx-auto mb-6"
          style={{
            opacity: 0,
          }}
        >
          <span className="typed-text" />
          <span className="typed-cursor" />
        </div>

        {/* Sub description */}
        <p
          ref={subRef}
          className="mx-auto mb-8 sm:mb-10 text-[13px] sm:text-[15px] leading-relaxed px-2 sm:px-0"
          style={{
            color: 'var(--text-muted)',
            maxWidth: '540px',
          }}
        >
          Expert in Node.js, data engineering, and enterprise identity solutions.
          Proven track record in designing highly scalable systems with 99.9% uptime.
        </p>

        {/* CTA buttons */}
        <div
          ref={ctasRef}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-10 sm:mb-16 px-2 sm:px-0"
        >
          <button
            onClick={() => scrollTo('contact')}
            className="group inline-flex items-center justify-center gap-2.5 w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl text-[14px] sm:text-[15px] font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, var(--accent-blue), #6366f1)',
              boxShadow: '0 4px 24px rgba(59,130,246,0.4), 0 1px 0 rgba(255,255,255,0.15) inset',
            }}
            data-cursor="Hire"
          >
            Start a Project
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button
            onClick={() => scrollTo('projects')}
            className="inline-flex items-center justify-center gap-2.5 w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl text-[14px] sm:text-[15px] font-semibold transition-all duration-300 hover:-translate-y-1 hover:bg-white/5"
            style={{
              background: 'transparent',
              color: 'var(--text-primary)',
              border: '1.5px solid var(--border-card)',
            }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(59,130,246,0.4)')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border-card)')}
            data-cursor="View"
          >
            View My Work
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M8 3v10M4 9l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* ── Metrics Row ── */}
        <div
          ref={metricsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-px rounded-xl sm:rounded-2xl overflow-hidden"
          style={{
            background: 'var(--border-subtle)',
            border: '1px solid var(--border-subtle)',
          }}
        >
          {metrics.map((metric, i) => {
            const gradients = [
              'linear-gradient(135deg, var(--accent-blue), #6366f1)',
              'linear-gradient(135deg, var(--accent-purple), var(--accent-blue))',
              'linear-gradient(135deg, var(--accent-green), var(--accent-cyan))',
              'linear-gradient(135deg, var(--accent-cyan), var(--accent-blue))',
            ]
            return (
              <div
                key={metric.label}
                className="flex flex-col items-center justify-center py-5 sm:py-7 px-3 sm:px-4 relative group transition-colors duration-300"
                style={{ background: 'var(--bg-secondary)' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg-card)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'var(--bg-secondary)')}
              >
                {/* Top accent */}
                <div
                  className="absolute top-0 left-8 right-8 h-[1.5px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: gradients[i] }}
                />
                <div
                  id={`hero-metric-${metric.label.replace(/\s+/g, '-')}`}
                  className="font-mono font-black leading-none mb-1.5"
                  style={{
                    fontSize: 'clamp(24px, 3.5vw, 36px)',
                    letterSpacing: '-0.04em',
                    background: gradients[i],
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  0{metric.suffix}
                </div>
                <div
                  className="font-mono font-semibold uppercase tracking-widest text-center"
                  style={{ fontSize: '10px', color: 'var(--text-muted)' }}
                >
                  {metric.label}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Scroll hint */}
      <div
        ref={scrollHintRef}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-[2]"
      >
        <span
          className="font-mono tracking-[0.3em] uppercase"
          style={{ fontSize: '9px', color: 'var(--text-dim)' }}
        >
          Scroll
        </span>
        <div
          className="w-px h-9 rounded-full"
          style={{
            background: 'linear-gradient(180deg, var(--accent-blue), transparent)',
            animation: 'scroll-line 2s ease-in-out infinite',
          }}
        />
      </div>
    </section>
  )
}
