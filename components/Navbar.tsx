'use client'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#timeline', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeLink, setActiveLink] = useState('hero')

  useEffect(() => {
    const nav = navRef.current
    if (!nav) return

    // Scroll progress bar
    const updateProgress = () => {
      const scrolled = window.scrollY
      const max = document.documentElement.scrollHeight - window.innerHeight
      const pct = max > 0 ? (scrolled / max) * 100 : 0
      if (progressRef.current) progressRef.current.style.width = pct + '%'
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 80)
      updateProgress()
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    updateProgress()

    // Active link tracking via IntersectionObserver
    const sectionIds = ['hero', 'about', 'services', 'impact', 'projects', 'skills', 'timeline', 'testimonials', 'contact']
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveLink(entry.target.id)
          }
        })
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
    )

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      observer.disconnect()
    }
  }, [])

  const scrollTo = (href: string) => {
    const el = document.querySelector(href)
    if (el) {
      gsap.to(window, {
        scrollTo: { y: el, offsetY: 80 },
        duration: 1,
        ease: 'power3.inOut',
      })
    }
    if (mobileOpen) {
      setMobileOpen(false)
      document.body.classList.remove('no-scroll')
    }
  }

  const toggleMobile = () => {
    const next = !mobileOpen
    setMobileOpen(next)
    if (next) {
      document.body.classList.add('no-scroll')
    } else {
      document.body.classList.remove('no-scroll')
    }
  }

  return (
    <>
      {/* Scroll progress bar */}
      <div
        ref={progressRef}
        className="scroll-progress"
        style={{ width: '0%' }}
      />

      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-[1000] flex items-center justify-center px-4 sm:px-10 transition-all duration-300 ${scrolled ? 'navbar-scrolled' : ''}`}
        style={{ height: 'var(--nav-height)' }}
      >
        <div className="w-full max-w-[1200px] flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); scrollTo('#hero') }}
            className="font-extrabold text-xl tracking-tight"
          >
            <span className="gradient-text">NK</span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex gap-8 items-center">
            {navLinks.map(({ href, label }) => {
              const id = href.replace('#', '')
              const isActive = activeLink === id
              return (
                <a
                  key={href}
                  href={href}
                  onClick={(e) => { e.preventDefault(); scrollTo(href) }}
                  className="relative text-sm font-medium transition-colors duration-200 pb-1 group"
                  style={{ color: isActive ? 'var(--text-primary)' : 'var(--text-muted)' }}
                >
                  {label}
                  <span
                    className="absolute bottom-0 left-0 h-[2px] rounded-sm transition-all duration-300"
                    style={{
                      background: 'var(--accent-blue)',
                      width: isActive ? '100%' : '0%',
                    }}
                  />
                </a>
              )
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); scrollTo('#contact') }}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5"
              style={{
                background: 'var(--accent-blue)',
                boxShadow: 'var(--glow-blue)',
              }}
              data-cursor="Hire"
            >
              Hire Me →
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden flex flex-col gap-[5px] p-1 z-[1001]"
            onClick={toggleMobile}
            aria-label="Toggle mobile menu"
          >
            <span
              className="block w-6 h-0.5 rounded-sm transition-all duration-300"
              style={{
                background: 'var(--text-primary)',
                transform: mobileOpen ? 'translateY(7px) rotate(45deg)' : 'none',
              }}
            />
            <span
              className="block w-6 h-0.5 rounded-sm transition-all duration-300"
              style={{
                background: 'var(--text-primary)',
                opacity: mobileOpen ? 0 : 1,
              }}
            />
            <span
              className="block w-6 h-0.5 rounded-sm transition-all duration-300"
              style={{
                background: 'var(--text-primary)',
                transform: mobileOpen ? 'translateY(-7px) rotate(-45deg)' : 'none',
              }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Nav Drawer */}
      <div
        className="fixed inset-0 z-[999] flex flex-col items-center justify-center gap-8 transition-transform duration-500"
        style={{
          background: 'var(--bg-primary)',
          transform: mobileOpen ? 'translateX(0)' : 'translateX(100%)',
        }}
      >
        {navLinks.map(({ href, label }) => (
          <a
            key={href}
            href={href}
            onClick={(e) => { e.preventDefault(); scrollTo(href) }}
            className="text-3xl font-bold transition-colors duration-200"
            style={{ color: activeLink === href.replace('#', '') ? 'var(--text-primary)' : 'var(--text-muted)' }}
          >
            {label}
          </a>
        ))}
        <a
          href="#contact"
          onClick={(e) => { e.preventDefault(); scrollTo('#contact') }}
          className="mt-4 px-8 py-3 rounded-xl text-lg font-semibold text-white"
          style={{ background: 'var(--accent-blue)', boxShadow: 'var(--glow-blue)' }}
        >
          Hire Me →
        </a>
      </div>
    </>
  )
}
