'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
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
  const trackRef = useRef<HTMLDivElement>(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const total = testimonials.length

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index)
    if (trackRef.current) {
      const isMobile = window.innerWidth < 768
      const isTablet = window.innerWidth < 1024
      const offset = isMobile ? 100 : isTablet ? 50 : 33.333
      gsap.to(trackRef.current, {
        xPercent: -index * offset,
        duration: 0.6,
        ease: 'power3.inOut',
      })
    }
  }, [])

  const startAutoplay = useCallback(() => {
    if (autoplayRef.current) clearInterval(autoplayRef.current)
    autoplayRef.current = setInterval(() => {
      setCurrentSlide((prev) => {
        const next = (prev + 1) % total
        if (trackRef.current) {
          const isMobile = window.innerWidth < 768
          const isTablet = window.innerWidth < 1024
          const offset = isMobile ? 100 : isTablet ? 50 : 33.333
          gsap.to(trackRef.current, {
            xPercent: -next * offset,
            duration: 0.6,
            ease: 'power3.inOut',
          })
        }
        return next
      })
    }, 5000)
  }, [total])

  useEffect(() => {
    startAutoplay()

    const ctx = gsap.context(() => {
      if (trackRef.current) {
        const cards = trackRef.current.querySelectorAll('.testimonial-card-item')
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40, scale: 0.95 },
          {
            scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.12,
            ease: 'power3.out',
          }
        )
      }
    }, sectionRef)

    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current)
      ctx.revert()
    }
  }, [startAutoplay])

  const handleDotClick = (i: number) => {
    goToSlide(i)
    if (autoplayRef.current) clearInterval(autoplayRef.current)
    startAutoplay()
  }

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="section"
      style={{ background: 'var(--bg-secondary)' }}
    >
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <div className="mb-16">
          <div className="section-label-row">
            <span className="section-label-line" />
            <span className="section-label-text">Testimonials</span>
          </div>
          <h2 className="section-heading">
            What They <span className="gradient-text">Say</span>
          </h2>
        </div>

        {/* Carousel */}
        <div className="relative overflow-hidden">
          <div
            ref={trackRef}
            className="flex gap-6"
            style={{ willChange: 'transform' }}
          >
            {testimonials.map((t, i) => {
              const accent = accentMap[t.accent]
              return (
                <div
                  key={i}
                  className="testimonial-card-item flex-shrink-0 p-8 rounded-2xl"
                  style={{
                    minWidth: 'min(calc(33.333% - 16px), calc(100vw - 64px))',
                    maxWidth: 'min(calc(33.333% - 16px), calc(100vw - 64px))',
                    background: 'var(--glass-bg)',
                    border: '1px solid var(--glass-border)',
                    backdropFilter: 'blur(var(--glass-blur))',
                    WebkitBackdropFilter: 'blur(var(--glass-blur))',
                    opacity: 0,
                  }}
                >
                  {/* Large quote mark */}
                  <div
                    className="text-6xl font-black leading-none mb-4"
                    style={{ color: accent.color, opacity: 0.3, fontFamily: 'serif' }}
                  >
                    "
                  </div>

                  {/* Quote text */}
                  <p
                    className="text-sm leading-relaxed mb-6 italic pl-5"
                    style={{
                      color: 'var(--text-secondary)',
                      borderLeft: `2px solid ${accent.color}`,
                      overflowWrap: 'break-word',
                      wordBreak: 'break-word',
                    }}
                  >
                    &ldquo;{t.text}&rdquo;
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <div
                      className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
                      style={{ background: accent.gradient }}
                    >
                      {t.avatar}
                    </div>
                    <div>
                      <div className="font-bold text-[15px]">{t.name}</div>
                      <div
                        className="text-xs"
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

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => handleDotClick(i)}
              className="testimonial-dot h-2 rounded-full transition-all duration-300"
              style={{
                width: currentSlide === i ? '24px' : '8px',
                background: currentSlide === i ? 'var(--accent-blue)' : 'var(--border-hover)',
                borderRadius: currentSlide === i ? '4px' : '50%',
              }}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
