'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return
    if (window.matchMedia('(hover: none)').matches) return
    if (window.innerWidth < 768) return

    let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0
    let raf: number

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const track = () => {
      ringX += (mouseX - ringX) * 0.12
      ringY += (mouseY - ringY) * 0.12
      dot.style.left = mouseX + 'px'
      dot.style.top = mouseY + 'px'
      ring.style.left = ringX + 'px'
      ring.style.top = ringY + 'px'
      raf = requestAnimationFrame(track)
    }
    track()

    window.addEventListener('mousemove', onMouseMove, { passive: true })

    const interactive = 'a, button, .project-card, .service-card, .testimonial-dot, .social-link'
    const onOver = (e: MouseEvent) => {
      const t = (e.target as Element).closest(interactive)
      if (t) {
        ring.classList.add('hovered')
        const label = ring.querySelector('#cursor-label') as HTMLElement
        if (label) label.textContent = (t as HTMLElement).dataset.cursor || 'View'
      }
    }
    const onOut = (e: MouseEvent) => {
      const t = (e.target as Element).closest(interactive)
      if (t) ring.classList.remove('hovered')
    }

    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)

    // Section color shifts
    const sections = [
      { id: 'hero', color: '#3b82f6' },
      { id: 'about', color: '#a855f7' },
      { id: 'services', color: '#06b6d4' },
      { id: 'impact', color: '#3b82f6' },
      { id: 'projects', color: '#a855f7' },
      { id: 'skills', color: '#00ff88' },
      { id: 'timeline', color: '#06b6d4' },
      { id: 'testimonials', color: '#a855f7' },
      { id: 'contact', color: '#3b82f6' },
    ]

    sections.forEach(({ id, color }) => {
      const el = document.getElementById(id)
      if (!el) return
      ScrollTrigger.create({
        trigger: el,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => {
          dot.style.background = color
          dot.style.boxShadow = `0 0 10px ${color}`
          ring.style.borderColor = color + '99'
        },
        onEnterBack: () => {
          dot.style.background = color
          dot.style.boxShadow = `0 0 10px ${color}`
          ring.style.borderColor = color + '99'
        },
      })
    })

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
    }
  }, [])

  return (
    <>
      <div ref={ringRef} id="cursor-ring">
        <span id="cursor-label" />
      </div>
      <div ref={dotRef} id="cursor-dot" />
    </>
  )
}
