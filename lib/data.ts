export interface Metric {
  value: number
  suffix: string
  label: string
  description: string
  accent: 'blue' | 'purple' | 'green' | 'cyan'
}

export interface Service {
  icon: string
  title: string
  description: string
  accent: 'blue' | 'purple' | 'green'
  tags: string[]
}

export interface Project {
  id: string
  name: string
  tag: string
  impact: string
  description: string
  stack: string[]
  accent: 'blue' | 'purple' | 'green' | 'cyan' | 'orange'
  year: string
  url?: string
}

export interface SkillItem {
  name: string
  level: number
  color?: string
}

export interface SkillCategory {
  category: string
  color: 'blue' | 'purple' | 'green' | 'cyan' | 'orange'
  items: SkillItem[]
}

export interface TimelineItem {
  year: string
  title: string
  description: string
  color: 'blue' | 'purple' | 'cyan' | 'orange' | 'green'
}

export interface TimelineEntry {
  company: string
  role: string
  period: string
  location: string
  items: TimelineItem[]
}

export interface Testimonial {
  name: string
  role: string
  text: string
  avatar: string
  accent: 'blue' | 'purple' | 'green'
}

export interface TechOrb {
  name: string
  color: string
}

// ALL DATA — from existing data.js
export const metrics: Metric[] = [
  { value: 100, suffix: 'M+', label: 'Daily Requests', description: 'Peak throughput across identity & auth services', accent: 'blue' },
  { value: 500, suffix: 'M+', label: 'Users Served', description: "Across Jio's ecosystem of products", accent: 'purple' },
  { value: 2, suffix: 'B+', label: 'Records Migrated', description: 'Zero-downtime data migration at scale', accent: 'green' },
  { value: 99.9, suffix: '%', label: 'Uptime Delivered', description: 'Enterprise-grade reliability, always', accent: 'cyan' },
]

export const services: Service[] = [
  {
    icon: '🏗️',
    title: 'SaaS Architecture & Backend Systems',
    description: "From 0 to 100M requests. I design the backbone — microservices, message queues, caching layers, and APIs that never break under pressure.",
    accent: 'blue',
    tags: ['Node.js', 'Java', 'Kafka', 'Redis', 'PostgreSQL'],
  },
  {
    icon: '⚡',
    title: 'Performance Engineering',
    description: "Bottlenecks don't survive my debugger. I profile, optimize, and scale systems to handle exponential traffic growth with predictable latency.",
    accent: 'purple',
    tags: ['Load Testing', 'Profiling', 'Caching', 'CDN', 'Query Optimization'],
  },
  {
    icon: '🔐',
    title: 'Identity & Auth Platforms',
    description: "SSO, OAuth 2.0, LDAP, SAML — enterprise-grade identity federation with zero compromise on security or user experience.",
    accent: 'green',
    tags: ['OAuth 2.0', 'SSO', 'LDAP', 'SAML', 'JWT'],
  },
]

export const projects: Project[] = [
  {
    id: 'jioid',
    name: 'JioID',
    tag: 'Identity Platform',
    impact: '100M+ Users',
    description: "Universal identity platform powering single sign-on across Jio's entire product ecosystem. Architected the core authentication service handling 100M+ daily auth requests with sub-200ms response times.",
    stack: ['Node.js', 'Redis', 'PostgreSQL', 'OAuth 2.0', 'Docker'],
    accent: 'blue',
    year: '2023',
  },
  {
    id: 'uifp',
    name: 'UIFP',
    tag: 'Identity Federation',
    impact: '500M+ Users',
    description: "Unified Identity Federation Platform connecting 30+ Jio services under a single identity layer. Designed the federation protocol, token exchange, and session management for half a billion users.",
    stack: ['Java', 'Spring Boot', 'Kafka', 'Redis', 'Kubernetes'],
    accent: 'purple',
    year: '2024',
  },
  {
    id: 'idam',
    name: 'IDAM',
    tag: 'Auth Infrastructure',
    impact: 'Multi-Platform Auth',
    description: "Identity & Access Management system for JioTV, JioSaavn, and Hotstar. Built granular role-based access control and multi-tenant authentication serving millions of concurrent streams.",
    stack: ['Node.js', 'MongoDB', 'LDAP', 'SAML', 'React'],
    accent: 'cyan',
    year: '2022',
  },
  {
    id: 'jiomoney',
    name: 'JioMoney',
    tag: 'Payment Platform',
    impact: '1M+ Txn/Day',
    description: "Core payment processing platform handling 1M+ daily transactions. Designed the transaction pipeline with idempotency guarantees, fraud detection hooks, and real-time settlement tracking.",
    stack: ['Java', 'PostgreSQL', 'RabbitMQ', 'Redis', 'Docker'],
    accent: 'orange',
    year: '2018',
  },
  {
    id: 'migration',
    name: 'Data Migration Engine',
    tag: 'Data Engineering',
    impact: '2B+ Records',
    description: "Massive-scale data migration engine that moved 2B+ records across database systems with 99.9% accuracy and zero downtime. Built checkpointing, validation, and rollback mechanisms.",
    stack: ['Python', 'PostgreSQL', 'Apache Spark', 'Airflow', 'S3'],
    accent: 'green',
    year: '2021',
  },
  {
    id: 'monitoring',
    name: 'Monitoring Dashboard',
    tag: 'Real-time Analytics',
    impact: 'Live WebSocket Feeds',
    description: "Real-time system monitoring dashboard with WebSocket-powered live feeds, custom alerting rules, and interactive performance visualizations for infrastructure health tracking.",
    stack: ['React', 'D3.js', 'WebSocket', 'Node.js', 'Grafana'],
    accent: 'blue',
    year: '2020',
  },
  {
    id: 'mindfulqalb',
    name: 'MindfulQalb',
    tag: 'Mental Wellness Platform',
    impact: 'Live Web App',
    description: "A mindfulness and mental wellness platform built to nurture inner peace. Features guided practices, reflective journaling, and a calm digital space for spiritual and emotional well-being.",
    stack: ['React', 'Next.js', 'Tailwind CSS', 'Node.js'],
    accent: 'green',
    year: '2024',
    url: 'https://www.mindfulqalb.com/',
  },
  {
    id: 'junaid-portfolio',
    name: 'Junaid Portfolio',
    tag: 'Portfolio Website',
    impact: 'Live Portfolio',
    description: "A sleek, modern developer portfolio showcasing projects, skills, and professional experience. Built with smooth animations and a responsive design to make a strong first impression.",
    stack: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
    accent: 'purple',
    year: '2024',
    url: 'https://junaid-portfolio-nu.vercel.app/',
  },
]

export const skills: SkillCategory[] = [
  {
    category: 'Backend',
    color: 'blue',
    items: [
      { name: 'Node.js', level: 95 },
      { name: 'Java / Spring Boot', level: 90 },
      { name: 'Python', level: 80 },
      { name: 'REST API Design', level: 95 },
      { name: 'GraphQL', level: 75 },
      { name: 'Microservices', level: 92 },
    ],
  },
  {
    category: 'Database & Cache',
    color: 'purple',
    items: [
      { name: 'PostgreSQL', level: 92 },
      { name: 'MongoDB', level: 88 },
      { name: 'Redis', level: 90 },
      { name: 'Elasticsearch', level: 78 },
      { name: 'Apache Kafka', level: 85 },
    ],
  },
  {
    category: 'DevOps & Cloud',
    color: 'green',
    items: [
      { name: 'Docker', level: 90 },
      { name: 'Kubernetes', level: 82 },
      { name: 'AWS', level: 85 },
      { name: 'CI/CD Pipelines', level: 88 },
      { name: 'Nginx / Load Balancing', level: 85 },
    ],
  },
  {
    category: 'Frontend',
    color: 'cyan',
    items: [
      { name: 'React', level: 90 },
      { name: 'TypeScript', level: 88 },
      { name: 'Next.js', level: 82 },
      { name: 'HTML5 / CSS3', level: 92 },
      { name: 'WebSocket / Real-time', level: 88 },
    ],
  },
]

export const timeline: TimelineEntry = {
  company: 'Reliance Jio Platforms',
  role: 'Senior Full Stack Developer',
  period: 'Nov 2016 — Present',
  location: 'Mumbai, India (Remote Worldwide)',
  items: [
    { year: '2024', title: 'UIFP — Unified Identity Federation', description: 'Led architecture for 500M+ user identity federation across 30+ services', color: 'purple' },
    { year: '2023', title: 'JioID — Universal Identity Platform', description: 'Built SSO platform handling 100M+ daily authentication requests', color: 'blue' },
    { year: '2022', title: 'IDAM — Multi-Platform Auth', description: 'Designed auth infrastructure for JioTV, JioSaavn & Hotstar', color: 'cyan' },
    { year: '2021', title: 'Data Migration Engine', description: 'Migrated 2B+ records with 99.9% accuracy and zero downtime', color: 'green' },
    { year: '2020', title: 'Real-time Monitoring Dashboard', description: 'Built WebSocket-powered live monitoring for infrastructure health', color: 'blue' },
    { year: '2019', title: 'Performance Engineering', description: 'Optimized API response times from 800ms to sub-200ms at scale', color: 'orange' },
    { year: '2018', title: 'JioMoney Payment Platform', description: 'Architected payment pipeline processing 1M+ daily transactions', color: 'orange' },
    { year: '2017', title: 'Core Backend Services', description: "Developed foundational microservices for Jio's digital ecosystem", color: 'blue' },
  ],
}

export const testimonials: Testimonial[] = [
  {
    name: 'Engineering Director',
    role: 'Reliance Jio Platforms',
    text: "Nouman's ability to architect systems that handle massive scale is unparalleled. His work on the identity platform was nothing short of extraordinary.",
    avatar: 'ED',
    accent: 'blue',
  },
  {
    name: 'Product Lead',
    role: 'Identity & Access Management',
    text: "He doesn't just write code — he thinks in systems. Every solution he delivers is built to last and built to scale.",
    avatar: 'PL',
    accent: 'purple',
  },
  {
    name: 'Technical Architect',
    role: 'Data Engineering Team',
    text: "Working with Nouman on the data migration project gave me confidence that even the most complex engineering challenges have elegant solutions.",
    avatar: 'TA',
    accent: 'green',
  },
]

export const techOrbs: TechOrb[] = [
  { name: 'Node.js', color: '#68a063' },
  { name: 'React', color: '#06b6d4' },
  { name: 'PostgreSQL', color: '#336791' },
  { name: 'Redis', color: '#dc382d' },
  { name: 'Docker', color: '#2496ed' },
  { name: 'TypeScript', color: '#3178c6' },
  { name: 'AWS', color: '#f97316' },
  { name: 'Kafka', color: '#a855f7' },
]

export const orbitIcons = ['⚡', '🗄️', '☁️', '🔒', '📊', '🚀']
