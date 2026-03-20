'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Cursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot  = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return
    if (window.matchMedia('(hover: none)').matches) return
    if (window.innerWidth < 768) return

    // ── State ──────────────────────────────────────────────────────────
    let mouseX = 0, mouseY = 0
    let ringX  = 0, ringY  = 0
    let raf: number
    let started      = false
    let currentColor = '#3b82f6'

    // Start fully invisible; fade in on first move
    gsap.set([dot, ring], { opacity: 0, xPercent: -50, yPercent: -50 })

    // ── rAF tracking loop — uses transform instead of left/top ─────────
    const track = () => {
      // Ring follows with spring-like lag (lerp factor 0.10)
      ringX += (mouseX - ringX) * 0.10
      ringY += (mouseY - ringY) * 0.10

      // Dot snaps — use transform for GPU compositing
      gsap.set(dot,  { x: mouseX, y: mouseY })
      gsap.set(ring, { x: ringX,  y: ringY  })

      raf = requestAnimationFrame(track)
    }

    // ── Mouse move ─────────────────────────────────────────────────────
    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY

      if (!started) {
        started = true
        // Snap ring to cursor on first move so it doesn't sweep in from (0,0)
        ringX = mouseX
        ringY = mouseY
        gsap.to([dot, ring], { opacity: 1, duration: 0.4, ease: 'power2.out' })
        track()
      }
    }

    // ── Mouse leave / enter window ────────────────────────────────────
    const onMouseLeaveWindow = () => gsap.to([dot, ring], { opacity: 0, duration: 0.3 })
    const onMouseEnterWindow = () => { if (started) gsap.to([dot, ring], { opacity: 1, duration: 0.3 }) }
    document.addEventListener('mouseleave', onMouseLeaveWindow)
    document.addEventListener('mouseenter', onMouseEnterWindow)

    // ── Mouse down / up — squish feedback ─────────────────────────────
    const onMouseDown = () => {
      gsap.to(dot,  { scale: 0.5, duration: 0.12, ease: 'power3.out' })
      gsap.to(ring, { scale: 0.85, duration: 0.15, ease: 'power3.out' })
    }
    const onMouseUp = () => {
      gsap.to(dot,  { scale: 1, duration: 0.4, ease: 'elastic.out(1.2, 0.5)' })
      gsap.to(ring, { scale: 1, duration: 0.4, ease: 'elastic.out(1.2, 0.5)' })
    }
    window.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mouseup',   onMouseUp)

    // ── Section color transitions (smoothly via GSAP) ──────────────────
    const setColor = (color: string) => {
      currentColor = color
      gsap.to(ring, { borderColor: color + '99', duration: 0.5 })
      gsap.to(dot,  { backgroundColor: color, boxShadow: `0 0 12px ${color}`, duration: 0.5 })
    }

    const sections: { id: string; color: string }[] = [
      { id: 'hero',         color: '#3b82f6' },
      { id: 'about',        color: '#a855f7' },
      { id: 'services',     color: '#06b6d4' },
      { id: 'impact',       color: '#3b82f6' },
      { id: 'projects',     color: '#a855f7' },
      { id: 'skills',       color: '#00ff88' },
      { id: 'timeline',     color: '#06b6d4' },
      { id: 'testimonials', color: '#a855f7' },
      { id: 'contact',      color: '#3b82f6' },
    ]

    const sectionTriggers: ReturnType<typeof ScrollTrigger.create>[] = []
    sections.forEach(({ id, color }) => {
      const el = document.getElementById(id)
      if (!el) return
      sectionTriggers.push(ScrollTrigger.create({
        trigger: el,
        start: 'top center',
        end:   'bottom center',
        onEnter:     () => setColor(color),
        onEnterBack: () => setColor(color),
      }))
    })

    window.addEventListener('mousemove', onMouseMove, { passive: true })

    return () => {
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener('mousemove',  onMouseMove)
      window.removeEventListener('mousedown',  onMouseDown)
      window.removeEventListener('mouseup',    onMouseUp)
      document.removeEventListener('mouseleave', onMouseLeaveWindow)
      document.removeEventListener('mouseenter', onMouseEnterWindow)
      sectionTriggers.forEach(t => t.kill())
    }
  }, [])

  return (
    <>
      <div ref={ringRef} id="cursor-ring" />
      <div ref={dotRef} id="cursor-dot" />
    </>
  )
}
