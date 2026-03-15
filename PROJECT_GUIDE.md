# Portfolio Project — Complete Guide

> Written for someone new to Next.js. Covers every library we use, why we chose it, how security works, and how data flows through the app from top to bottom.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Folder Structure](#2-folder-structure)
3. [How Next.js Works (For Beginners)](#3-how-nextjs-works-for-beginners)
4. [Every Library We Use & Why](#4-every-library-we-use--why)
5. [Security — What We Added & Why](#5-security--what-we-added--why)
6. [Data Flow — From Data to Screen](#6-data-flow--from-data-to-screen)
7. [Component-by-Component Breakdown](#7-component-by-component-breakdown)
8. [Styling System](#8-styling-system)
9. [Animation System](#9-animation-system)
10. [How to Run the Project](#10-how-to-run-the-project)

---

## 1. Project Overview

This is a **personal portfolio website** for Nouman Khatib — a Senior Full Stack Developer. It is a single-page application (SPA) with smooth scroll sections, 3D particle effects, GSAP animations, and a fully custom design system.

**Built with:** Next.js 16 · React 18 · TypeScript · Tailwind CSS · GSAP · Three.js

---

## 2. Folder Structure

```
noumaan_portfolio/
│
├── app/                        ← Next.js App Router root
│   ├── layout.tsx              ← Wraps every page (fonts, metadata, html shell)
│   ├── page.tsx                ← The homepage — assembles all sections
│   └── globals.css             ← Global CSS variables and base styles
│
├── components/                 ← Every visible section of the page
│   ├── Loader.tsx              ← Full-screen loading animation
│   ├── Cursor.tsx              ← Custom mouse cursor
│   ├── Navbar.tsx              ← Top navigation bar
│   ├── Hero.tsx                ← First section (name + tagline + particles)
│   ├── About.tsx               ← About me + orbit animation
│   ├── Services.tsx            ← Service cards grid
│   ├── Impact.tsx              ← Animated metric counters
│   ├── Projects.tsx            ← Enterprise projects grid
│   ├── Skills.tsx              ← Skill categories tabs
│   ├── Timeline.tsx            ← Career timeline
│   ├── Testimonials.tsx        ← Testimonial cards
│   ├── Contact.tsx             ← Contact buttons
│   ├── Footer.tsx              ← Footer
│   └── ParticleScene.tsx       ← Three.js 3D particle background
│
├── lib/
│   ├── data.ts                 ← ALL content data (projects, skills, etc.)
│   └── utils.ts                ← Helper: cn() for merging class names
│
├── next.config.js              ← Next.js config + security headers
├── tailwind.config.ts          ← Custom design tokens (colors, animations)
├── tsconfig.json               ← TypeScript settings
└── package.json                ← Dependencies
```

---

## 3. How Next.js Works (For Beginners)

### The App Router

Next.js uses a special folder called `app/` where **the file path = the URL**.

```
app/page.tsx        →  yoursite.com/
app/about/page.tsx  →  yoursite.com/about
app/blog/page.tsx   →  yoursite.com/blog
```

This project only has one page (`app/page.tsx`) because it's a single-page portfolio.

### layout.tsx — The Outer Shell

`app/layout.tsx` wraps **every page** on the site. Think of it like an HTML template that every page gets inserted into. It sets up:
- The `<html>` and `<body>` tags
- Global fonts (loaded once, used everywhere)
- SEO metadata (title, description, Open Graph)

```
layout.tsx
└── page.tsx         ← your page gets injected here as {children}
    └── Hero, About, Projects... (all sections)
```

### Server vs Client Components

Next.js has two types of components:

| Type | How to spot it | What it can do |
|------|---------------|----------------|
| **Server Component** | No `'use client'` at top | Runs on server, no interactivity, no hooks |
| **Client Component** | Has `'use client'` at top | Runs in browser, can use useState/useEffect/GSAP |

In this project, almost every component is a **Client Component** (`'use client'`) because they all have animations, mouse events, or scroll effects.

`layout.tsx` and `Footer.tsx` are Server Components — they don't need any browser APIs.

### How the Page Renders

1. Browser requests the site
2. Next.js serves the HTML (fast first paint)
3. React "hydrates" — attaches event listeners and starts animations
4. GSAP + Three.js kick in for interactive effects

---

## 4. Every Library We Use & Why

### Core Framework

#### `next` — v16.1.6
**What:** The React framework that powers the whole site.
**Why:** Handles routing, server-side rendering, image optimization, font loading, and build tooling all in one. Without it, you'd need to wire up webpack, Babel, routing, etc. yourself.
**Key features used:** App Router, `next/font` for Google Fonts, `next/dynamic` for lazy loading Three.js.

#### `react` + `react-dom` — v18
**What:** The UI library. Everything you see is a React component.
**Why:** Components let you split the UI into reusable, isolated pieces. React 18 brings concurrent features for smoother rendering.

#### `typescript` — v5
**What:** JavaScript with types.
**Why:** Catches bugs before they happen. For example, if `lib/data.ts` defines a `Project` type, TypeScript will error if you try to use a field that doesn't exist — before you even run the code. Every interface in `data.ts` is a TypeScript type.

---

### Styling

#### `tailwindcss` — v3.4.1
**What:** A CSS framework where you style directly in your JSX using class names.
**Why:** Instead of writing a separate CSS file, you write `className="flex items-center gap-4 text-sm font-bold"`. Fast to write, easy to maintain, no unused CSS in production.
**How it's customised here:** `tailwind.config.ts` adds custom colors (all the `--accent-*` colors), custom animations (orbit, float, pulse-glow), and custom shadows (glow effects).

#### `clsx` — v2.1.1
**What:** A tiny helper to conditionally combine CSS class names.
**Why:** Instead of messy template literals: `` `card ${isActive ? 'active' : ''}` ``, you write `clsx('card', { active: isActive })`. Cleaner and handles edge cases.

#### `tailwind-merge` — v2.3.0
**What:** Merges Tailwind classes and resolves conflicts.
**Why:** If you pass `text-sm` and `text-lg` to the same element, Tailwind Merge keeps only `text-lg`. Used in `lib/utils.ts` via the `cn()` helper, which combines both `clsx` and `tailwind-merge`.

```typescript
// lib/utils.ts
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

// Usage in a component:
<div className={cn('base-class', isActive && 'text-blue-500', className)} />
```

---

### Animation

#### `gsap` — v3.12.5
**What:** GreenSock Animation Platform — the industry standard for web animations.
**Why:** Far more powerful and performant than CSS animations. Handles complex sequences, scroll-based triggers, staggered reveals, and smooth easing. Three.js handles 3D, but GSAP handles everything else.

**Plugins used in this project:**
- `ScrollTrigger` — triggers animations when elements scroll into view
- `ScrollToPlugin` — smooth scrolling when nav links are clicked

**Examples in this project:**
```
Hero.tsx      → staggered character reveal, typewriter effect
Impact.tsx    → counters that animate up from 0 to 100M+
Projects.tsx  → cards fade + scale in on scroll, 3D tilt on hover
Timeline.tsx  → vertical line that draws itself as you scroll
Contact.tsx   → buttons that magnetically follow the cursor
```

#### `three` — v0.167.0
**What:** Three.js — a 3D graphics library that uses WebGL.
**Why:** Powers the particle system in the Hero background. Renders 900 particles on desktop, connects nearby ones with lines, and tracks mouse movement for a parallax effect. Pure CSS/Canvas 2D can't do this efficiently.
**Where:** Only used in `ParticleScene.tsx`, which is **dynamically imported** (lazy loaded) so it doesn't slow down the initial page load.

---

### Dev Tools

#### `eslint` + `eslint-config-next` — v9 / v16.1.6
**What:** A code linter — finds bugs and style issues automatically.
**Why:** Catches common React mistakes (missing keys in lists, unused variables, accessibility issues) before you ship. `eslint-config-next` is Next.js's own ruleset tuned for Next.js projects.

#### `playwright` — v1.58.2
**What:** End-to-end browser testing framework.
**Why:** Lets you write automated tests that open a real browser, click through the site, and verify it works correctly. Currently installed but tests are not yet written.

#### `autoprefixer` + `postcss`
**What:** CSS post-processors.
**Why:** Autoprefixer automatically adds vendor prefixes (`-webkit-`, `-moz-`) to CSS so it works across all browsers. PostCSS is the pipeline that runs it. Required for Tailwind to work.

---

## 5. Security — What We Added & Why

Security is handled at two levels: **dependency level** and **HTTP header level**.

### Dependency Security

We updated all critical dependencies to remove known CVEs:

| Package | Old Version | New Version | Vulnerabilities Fixed |
|---------|------------|-------------|----------------------|
| `next` | 14.2.5 | 16.1.6 | 14 CVEs: cache poisoning, SSRF, auth bypass, DoS |
| `eslint-config-next` | 14.2.5 | 16.1.6 | glob CLI command injection |
| `eslint` | 8.x | 9.39.4 | Required peer for new eslint-config-next |

After updating: `npm audit` reports **0 vulnerabilities**.

---

### HTTP Security Headers (`next.config.js`)

HTTP headers are instructions sent with every server response telling the browser how to behave. They are the first line of defence against common web attacks.

```js
// next.config.js
const securityHeaders = [
  { key: 'X-Frame-Options',        value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy',        value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy',     value: 'camera=(), microphone=(), geolocation=()' },
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'Content-Security-Policy', value: "default-src 'self'; ..." },
]
```

**What each header does:**

#### `X-Frame-Options: DENY`
**Attack it prevents:** Clickjacking
**How clickjacking works:** An attacker embeds your site in a hidden `<iframe>` inside their malicious page. The user thinks they're clicking on the attacker's page, but they're actually clicking buttons on your site.
**What this header does:** Tells browsers to **never load this site inside an iframe** — not even from the same domain.

#### `X-Content-Type-Options: nosniff`
**Attack it prevents:** MIME-type sniffing attacks
**How the attack works:** A browser might "sniff" a file's content and decide it's JavaScript even if the server says it's an image. An attacker could upload a file with malicious JS disguised as an image.
**What this header does:** Tells the browser to **trust the Content-Type header exactly** and never guess.

#### `Referrer-Policy: strict-origin-when-cross-origin`
**Attack it prevents:** Information leakage via the Referer header
**How the attack works:** When you click a link to another site, your browser sends a `Referer` header revealing what URL you came from. This can leak private URL parameters (e.g., `yoursite.com/reset-password?token=abc123`).
**What this header does:** Only sends the **origin** (e.g., `yoursite.com`) — never the full URL — when navigating to a different site.

#### `Permissions-Policy: camera=(), microphone=(), geolocation=()`
**Attack it prevents:** Unauthorised access to device hardware
**How the attack works:** A malicious script or third-party embed could silently request access to the user's camera, microphone, or location.
**What this header does:** **Blocks all access** to camera, mic, and location APIs for this site and any embedded content.

#### `Strict-Transport-Security` (HSTS)
**Attack it prevents:** Protocol downgrade attacks and man-in-the-middle attacks
**How the attack works:** Without HSTS, an attacker on the same network (e.g., a coffee shop WiFi) can intercept HTTP requests before they get upgraded to HTTPS, allowing them to read or modify traffic.
**What this header does:** Tells browsers to **always use HTTPS** for the next 2 years (`max-age=63072000`), even if the user types `http://`. `preload` submits the domain to browser preload lists.

#### `Content-Security-Policy` (CSP)
**Attack it prevents:** Cross-Site Scripting (XSS)
**How XSS works:** If an attacker can inject JavaScript into your page (e.g., via a comment form), that script can steal cookies, read private data, or act as the user. CSP is the strongest defence.
**What this header does:** Creates an allowlist of exactly where scripts, styles, images, and fonts can load from. Anything not on the list is blocked.

```
default-src 'self'        → Only load resources from this domain by default
script-src 'self' 'unsafe-inline' 'unsafe-eval'  → Scripts from this domain + inline (needed for GSAP/Next.js)
style-src 'self' 'unsafe-inline'  → Styles from this domain + inline (needed for Tailwind)
img-src 'self' data: https:       → Images from this domain, data URIs, or any HTTPS source
font-src 'self' data:             → Fonts from this domain or data URIs
connect-src 'self'                → Fetch/XHR only to this domain
frame-ancestors 'none'            → Same as X-Frame-Options: DENY (stronger version)
```

> **Note:** `'unsafe-inline'` and `'unsafe-eval'` are needed because GSAP and Next.js inject inline styles/scripts. In a future hardening step, these can be replaced with nonces for even tighter security.

---

## 6. Data Flow — From Data to Screen

All content lives in one file: `lib/data.ts`. No database, no API — it's a static site.

```
lib/data.ts
│
├── metrics[]       → Impact.tsx      (100M+ requests, 500M+ users, etc.)
├── services[]      → Services.tsx    (6 service cards)
├── projects[]      → Projects.tsx    (15 project cards)
├── skills[]        → Skills.tsx      (6 categories, 30+ skills)
├── timeline        → Timeline.tsx    (9 career milestones)
├── testimonials[]  → Testimonials.tsx (3 testimonials)
├── techOrbs[]      → About.tsx       (orbit animation icons)
└── orbitIcons      → About.tsx       (emoji icons)
```

**How it works in practice — example with Projects:**

```typescript
// lib/data.ts — defines the data
export const projects: Project[] = [
  {
    id: 'uifp',
    name: 'UIFP',
    tag: 'Unified Identity & Fingerprinting',
    impact: '500M+ Users',
    description: "Global Unique ID system...",
    stack: ['Node.js', 'Cassandra', 'ClickHouse'],
    accent: 'purple',
    year: '2021–Present',
  },
  // ... 14 more
]

// components/Projects.tsx — consumes the data
import { projects } from '@/lib/data'

export default function Projects() {
  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <div key={project.id}>
          <h3>{project.name}</h3>
          <p>{project.description}</p>
        </div>
      ))}
    </div>
  )
}
```

The `@/` path alias means "root of the project". It's configured in `tsconfig.json` under `paths`.

---

## 7. Component-by-Component Breakdown

### Page Assembly (`app/page.tsx`)

The homepage is just a list of all section components stacked in order:

```
Loader           ← shows on first load, hides after 2.6s
Cursor           ← floats above everything (position: fixed)
Navbar           ← sticky top bar
  Hero           ← full-height first section
  About          ← orbit + stats
  Services       ← 6 service cards
  Impact         ← 4 metric counters
  Projects       ← 15 project cards
  Skills         ← tabbed skill categories
  Timeline       ← scroll-driven career history
  Testimonials   ← 3 quote cards
  Contact        ← CTA + email/social buttons
Footer           ← bottom bar
```

### Key Patterns Used Across Components

#### Pattern 1: `useRef` + GSAP
Every animated component uses `useRef` to get a reference to the DOM element, then GSAP animates it:

```typescript
const sectionRef = useRef<HTMLElement>(null)

useEffect(() => {
  const ctx = gsap.context(() => {
    gsap.fromTo(sectionRef.current,
      { opacity: 0, y: 60 },    // from
      { opacity: 1, y: 0,       // to
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
      }
    )
  }, sectionRef)

  return () => ctx.revert()  // cleanup on unmount
}, [])
```

#### Pattern 2: Dynamic Import (Lazy Loading)
`ParticleScene.tsx` (Three.js) is heavy. It's only loaded when needed using Next.js `dynamic`:

```typescript
// In Hero.tsx
const ParticleScene = dynamic(() => import('./ParticleScene'), { ssr: false })
//                                                              ↑ don't run on server
```

`ssr: false` means Three.js only loads in the browser, never on the server (Three.js needs `window` which doesn't exist on the server).

#### Pattern 3: `'use client'`
Any component that uses `useState`, `useEffect`, `useRef`, GSAP, or browser APIs needs `'use client'` at the very top:

```typescript
'use client'
import { useEffect, useRef } from 'react'
```

---

## 8. Styling System

### CSS Variables (`app/globals.css`)

All colours and design tokens are defined as CSS custom properties (variables). This means changing one value updates the whole site:

```css
:root {
  --bg-primary:    #050510;   /* main background */
  --bg-card:       #0f0f23;   /* card backgrounds */
  --accent-blue:   #3b82f6;
  --accent-purple: #a855f7;
  --accent-green:  #00ff88;
  --accent-cyan:   #06b6d4;
  --accent-orange: #f97316;
  --text-primary:  #f0f0ff;
  --text-muted:    #8888aa;
}
```

Components reference these with `style={{ color: 'var(--accent-blue)' }}` for dynamic coloring that can't be done with Tailwind classes alone.

### Accent Color System

Projects, skills, services, and timeline items each have an `accent` property (`'blue' | 'purple' | 'green' | 'cyan' | 'orange'`). Components map that to full color objects:

```typescript
const accentMap = {
  blue:   { color: 'var(--accent-blue)',   glow: 'rgba(59,130,246,0.4)', bg: 'rgba(59,130,246,0.1)' },
  purple: { color: 'var(--accent-purple)', glow: 'rgba(168,85,247,0.4)', ... },
  // etc.
}

// Usage:
const accent = accentMap[project.accent]
<div style={{ color: accent.color, background: accent.bg }}>
```

---

## 9. Animation System

### GSAP ScrollTrigger

Most animations trigger when the element enters the viewport:

```typescript
gsap.fromTo(cards,
  { opacity: 0, y: 60, scale: 0.9 },
  {
    opacity: 1, y: 0, scale: 1,
    duration: 0.7,
    stagger: 0.1,           // each card animates 0.1s after the previous
    ease: 'power3.out',
    scrollTrigger: {
      trigger: gridRef.current,
      start: 'top 80%',    // start when top of grid reaches 80% of viewport
      once: true           // only animate once
    }
  }
)
```

### Three.js Particle System (`ParticleScene.tsx`)

- Creates a `BufferGeometry` with 900 particles (desktop) / 400 (tablet) / 0 (mobile — saves battery)
- Each particle has random position, velocity, and one of 4 colours
- Every frame: particles move, bounce off bounds, connect to nearby particles with lines
- Mouse movement shifts the camera slightly (parallax)
- Runs at 60fps using `requestAnimationFrame`

### Custom Cursor (`Cursor.tsx`)

- Two elements: a small dot (precise) and a larger ring (delayed)
- Ring position is interpolated toward the dot position each frame (smooth following)
- `IntersectionObserver` watches which section is visible and changes the cursor colour
- Disabled on touch devices using `window.matchMedia('(hover: hover)')`

---

## 10. How to Run the Project

```bash
# Install dependencies
npm install

# Start development server (with hot reload)
npm run dev
# → Open http://localhost:3000

# Build for production
npm run build

# Start production server
npm start

# Check for code issues
npm run lint

# Check for security vulnerabilities
npm audit
```

### Environment

No `.env` file is needed — this is a fully static site with no API keys, database connections, or server-side secrets.

---

## Quick Reference

| I want to... | Edit this file |
|---|---|
| Change project data | `lib/data.ts` → `projects[]` |
| Change skills | `lib/data.ts` → `skills[]` |
| Change colours | `app/globals.css` → CSS variables |
| Add a new section | Create `components/NewSection.tsx`, import in `app/page.tsx` |
| Change security headers | `next.config.js` → `securityHeaders` array |
| Add a new font | `app/layout.tsx` → import from `next/font/google` |
| Change animations | Find the component, edit the `gsap.fromTo(...)` call |
| Check for vulnerabilities | Run `npm audit` |
