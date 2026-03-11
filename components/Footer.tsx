const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]

export default function Footer() {
  return (
    <footer
      className="py-12"
      style={{
        borderTop: '1px solid rgba(255,255,255,0.06)',
        background: 'var(--bg-primary)',
      }}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 text-center md:text-left">
          {/* Brand */}
          <div>
            <span
              className="text-base font-extrabold tracking-tight"
              style={{
                background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-purple))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Nouman Khatib
            </span>
            <p
              className="text-xs font-mono mt-0.5"
              style={{ color: 'var(--text-dim)' }}
            >
              Full-Stack Developer
            </p>
          </div>

          {/* Nav links */}
          <nav className="flex items-center flex-wrap justify-center gap-4 sm:gap-6">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="footer-nav-link text-sm font-mono"
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Copyright */}
          <span
            className="text-xs font-mono"
            style={{ color: 'var(--text-dim)' }}
          >
            © {new Date().getFullYear()} · Built with precision.
          </span>
        </div>
      </div>
    </footer>
  )
}
