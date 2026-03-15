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
  accent: 'blue' | 'purple' | 'green' | 'cyan' | 'orange'
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
    title: 'Scalable Backend Systems',
    description: "Building highly scalable, distributed systems handling 100M+ daily requests with Node.js and microservices architecture.",
    accent: 'blue',
    tags: ['Node.js', 'Express', 'Microservices', 'Cassandra', 'Redis'],
  },
  {
    icon: '⚡',
    title: 'Data Engineering',
    description: "Expert in data migration, reconciliation, and analytics with 2B+ records processed using modern data tools like DuckDB and ClickHouse.",
    accent: 'purple',
    tags: ['Cassandra', 'ClickHouse', 'DuckDB', 'Metabase', 'Data Migration'],
  },
  {
    icon: '🔐',
    title: 'Identity & Auth Platforms',
    description: "Specialized in IDAM solutions, authentication APIs, and secure identity platforms for enterprise scale across multiple channels.",
    accent: 'green',
    tags: ['LDAP', 'OAuth', 'SSO', 'SAML', 'JWT'],
  },
  {
    icon: '☁️',
    title: 'DevOps & Cloud Infrastructure',
    description: "End-to-end deployment pipelines, containerized environments, and cloud infrastructure setup for reliable, zero-downtime production systems.",
    accent: 'cyan',
    tags: ['Docker', 'Kubernetes', 'Azure', 'Jenkins', 'NGINX'],
  },
  {
    icon: '📊',
    title: 'Monitoring & Performance',
    description: "Real-time observability dashboards, application performance tuning, and proactive alerting systems to keep your infrastructure healthy.",
    accent: 'orange',
    tags: ['ELK Stack', 'Prometheus', 'Grafana', 'JMeter', 'OpenTelemetry'],
  },
  {
    icon: '🖥️',
    title: 'Full-Stack Web Development',
    description: "Modern, responsive web applications with React and Next.js — from pixel-perfect UIs to robust server-side APIs, delivered production-ready.",
    accent: 'blue',
    tags: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'REST APIs'],
  },
]

export const projects: Project[] = [
  {
    id: 'uifp',
    name: 'UIFP',
    tag: 'Unified Identity & Fingerprinting',
    impact: '500M+ Users',
    description: "Global Unique ID system providing single user identification across all RIL subsidiaries. Maps individual unique IDs across services, enabling cross-domain user identification and unlocking new business opportunities.",
    stack: ['Node.js', 'Cassandra', 'Data Migration', 'ClickHouse'],
    accent: 'purple',
    year: '2021–Present',
  },
  {
    id: 'data-analytics',
    name: 'Data Analytics Platform',
    tag: 'Analytics & Reporting',
    impact: '500M+ Records Analysed',
    description: "Built and managed a data analytics platform for identity and user data insights. Used ClickHouse for high-performance analytical queries, DuckDB for in-process data analysis, and Metabase for business intelligence dashboards and reporting.",
    stack: ['ClickHouse', 'Metabase', 'DuckDB'],
    accent: 'purple',
    year: '2021-Ongoing',
  },
  {
    id: 'jioid',
    name: 'JioID',
    tag: 'Universal Identity Platform',
    impact: '100M+ Users',
    description: "One global solution for sign-up, login and account management across all Jio services. Provides 360° customer view, single sign-on across devices, and supports social logins. Every user onboarded to any Jio service gets a JioID.",
    stack: ['Node.js', 'Cassandra', 'Redis', 'REST APIs', 'SSO'],
    accent: 'blue',
    year: '2019–Present',
  },
  {
    id: 'data-migration',
    name: 'Data Migration & Reconciliation',
    tag: 'Data Engineering',
    impact: '2B+ Records',
    description: "Led data migration and reconciliation projects across all identity platforms. Processed 2B+ records and major role in leading data analysts for correction of 500M+ records using Node.js pipelines, RabbitMQ for event-driven processing, and Cassandra for high-volume storage.",
    stack: ['Node.js', 'RabbitMQ', 'Cassandra'],
    accent: 'green',
    year: '2019-Ongoing',
  },
  {
    id: 'jiomoney',
    name: 'JioMoney',
    tag: 'Payment Platform',
    impact: '1M+ Txn/Day',
    description: "Safe and secure digital payment solution for physical and online channels. Implemented user identity storage in Oracle Identity Directory with low-latency, high-availability applications handling NoSQL data storage.",
    stack: ['Node.js', 'Cassandra', 'OID', 'LDAP', 'Spring Boot'],
    accent: 'orange',
    year: '2019–2020',
  },
  {
    id: 'inventory-management',
    name: 'Inventory Management UI',
    tag: 'Server Management',
    impact: '500+ Servers',
    description: "React-based Inventory Management application backed by MySQL to centrally manage server-related details. Features role-based access control (RBAC) for secure access, allowing Admin, Viewer roles to view/modify data based on permissions.",
    stack: ['React', 'MySQL', 'RBAC', 'Node.js'],
    accent: 'green',
    year: '2018–2019',
  },
  {
    id: 'monitoring-ui',
    name: 'Monitoring UI Dashboard',
    tag: 'Real-time Operations',
    impact: 'Centralized Ops',
    description: "React-based Monitoring Dashboard for managing and controlling Node.js processes across servers. Provides capabilities to add, start, stop, and monitor Node.js services with real-time status visibility.",
    stack: ['React', 'Node.js', 'WebSocket', 'Real-time'],
    accent: 'blue',
    year: '2017–2018',
  },
  {
    id: 'automation-ui',
    name: 'Automation UI',
    tag: 'Test Dashboard',
    impact: '1000+ Tests/Day',
    description: "React Automation Dashboard integrated with JMeter test scripts to collect and display automated test execution results. Runs as a daily scheduled job, fetching test results project-wise in structured format.",
    stack: ['React', 'JMeter', 'Automation', 'CI/CD'],
    accent: 'orange',
    year: '2017–2018',
  },
  {
    id: 'idam',
    name: 'IDAM',
    tag: 'Identity Access Management',
    impact: '100M+ Daily Requests',
    description: "Centralized system managing identity of Jio Customers providing single identity/one-time authentication for access to various channels. Handles authentication APIs for JioTV, JioSaavn, Hotstar with 100M+ daily requests.",
    stack: ['Node.js', 'Cassandra', 'RabbitMQ', 'LDAP', 'Java'],
    accent: 'cyan',
    year: '2016–Present',
  },
  {
    id: 'trial-wifi',
    name: 'Trial WiFi IDAM APIs',
    tag: 'Infrastructure',
    impact: 'Multi-Venue Auth',
    description: "APIs for free Wi-Fi solutions in office campuses, hotels & malls. End users can use unlimited Wi-Fi post OTP verification. Provides Identity Management APIs enabling IDAM functionality for Jio Apps/Services.",
    stack: ['Node.js', 'REST APIs', 'OTP', 'Authentication'],
    accent: 'cyan',
    year: 'Completed',
  },
  {
    id: 'jtl-idam',
    name: 'JTL IDAM',
    tag: 'IoT Authentication',
    impact: '10K+ Devices',
    description: "Jio Things Limited (JTL) bundled IoT experiences providing authentication for IoT devices. Includes device tracking, network connectivity management, and IoT platform for monitoring device communications.",
    stack: ['Node.js', 'IoT', 'Device Auth', 'Cassandra'],
    accent: 'blue',
    year: 'Completed',
  },
  {
    id: 'jaam',
    name: 'JAAM',
    tag: 'Agent Authentication',
    impact: 'High Availability',
    description: "Jio Agent Authentication Management system providing authentication for Jio POS Agents. Configured as failover to OID/OIM, ensuring continuous agent authentication availability.",
    stack: ['Node.js', 'Agent Auth', 'Failover', 'OID/OIM'],
    accent: 'purple',
    year: 'Completed',
  },
  {
    id: 'mindfulqalb',
    name: 'MindfulQalb',
    tag: 'Mental Wellness Platform · Live',
    impact: '🌐 Live Web App',
    description: "A beautifully crafted mindfulness and mental wellness platform designed to nurture inner peace. Features guided spiritual practices, reflective journaling tools, community engagement, and a calm digital space for emotional well-being. Built with modern web technologies for a seamless, responsive experience.",
    stack: ['React', 'Next.js', 'Tailwind CSS', 'Node.js', 'Vercel'],
    accent: 'green',
    year: '2026',
    url: 'https://www.mindfulqalb.com/',
  },
  {
    id: 'junaid-portfolio',
    name: 'Junaid Portfolio',
    tag: 'Developer Portfolio · Live',
    impact: '🌐 Live Website',
    description: "A premium, modern developer portfolio featuring cinematic scroll animations, interactive particle effects, and a sleek dark-mode design. Showcases projects, skills timeline, and professional experience with buttery-smooth Framer Motion transitions and fully responsive layout.",
    stack: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'Vercel'],
    accent: 'purple',
    year: '2026',
    url: 'https://junaid-portfolio-nu.vercel.app/',
  },
]

export const skills: SkillCategory[] = [
  {
    category: 'Backend',
    color: 'blue',
    items: [
      { name: 'Node.js', level: 98 },
      { name: 'TypeScript', level: 95 },
      { name: 'Express.js', level: 95 },
      { name: 'REST APIs', level: 98 },
      { name: 'GraphQL', level: 85 },
      { name: 'ORM Modules', level: 90 },
    ],
  },
  {
    category: 'Databases & Data',
    color: 'purple',
    items: [
      { name: 'Cassandra', level: 95 },
      { name: 'ClickHouse', level: 90 },
      { name: 'DuckDB', level: 85 },
      { name: 'SQL/PostgreSQL', level: 92 },
      { name: 'Data Migration', level: 98 },
      { name: 'Metabase', level: 88 },
    ],
  },
  {
    category: 'Caching & Messaging',
    color: 'green',
    items: [
      { name: 'Redis', level: 95 },
      { name: 'RabbitMQ', level: 92 },
      { name: 'Hazelcast', level: 85 },
      { name: 'Socket.io', level: 88 },
      { name: 'Message Queues', level: 90 },
      { name: 'Caching Strategies', level: 95 },
    ],
  },
  {
    category: 'DevOps & Cloud',
    color: 'cyan',
    items: [
      { name: 'Docker', level: 92 },
      { name: 'Kubernetes', level: 88 },
      { name: 'Azure', level: 85 },
      { name: 'CI/CD (Jenkins/Bamboo)', level: 90 },
      { name: 'NGINX/PM2', level: 92 },
      { name: 'Shell Scripting', level: 88 },
    ],
  },
  {
    category: 'Monitoring & Logging',
    color: 'orange',
    items: [
      { name: 'ELK Stack', level: 90 },
      { name: 'Prometheus', level: 88 },
      { name: 'Grafana', level: 90 },
      { name: 'OpenTelemetry', level: 85 },
      { name: 'JMeter', level: 88 },
      { name: 'Performance Tuning', level: 92 },
    ],
  },
  {
    category: 'Frontend',
    color: 'blue',
    items: [
      { name: 'React.js', level: 92 },
      { name: 'TypeScript', level: 90 },
      { name: 'Tailwind CSS', level: 88 },
      { name: 'Framer Motion', level: 85 },
      { name: 'Redux/Zustand', level: 85 },
      { name: 'Next.js', level: 82 },
    ],
  },
]

export const timeline: TimelineEntry = {
  company: 'Reliance Jio',
  role: 'Senior Full Stack Developer',
  period: 'November 2016 — Present',
  location: 'India (Remote Worldwide)',
  items: [
    { year: '2021–Present', title: 'UIFP — Unified Identity & Fingerprinting', description: 'Global Unique ID system mapping users across all RIL subsidiaries for cross-domain identification. Leading data migration for 500M+ users.', color: 'purple' },
    { year: '2021-Ongoing', title: 'Data Analytics Platform', description: 'Built analytics platform for identity data insights using ClickHouse for analytical queries, DuckDB for in-process analysis, and Metabase for BI dashboards.', color: 'purple' },
    { year: '2019–Present', title: 'JioID — Universal Identity Platform', description: 'One global solution for sign-up, login and account management across all Jio services. 360° customer view with RESTful APIs and universal SSO.', color: 'blue' },
    { year: '2019–2020', title: 'JioMoney — Payment Platform', description: 'Secure digital payment solution with Oracle Identity Directory integration for low-latency, high-availability applications.', color: 'orange' },
    { year: '2019-Ongoing', title: 'Data Migration & Reconciliation', description: 'Led data migration and reconciliation across all identity platforms. Processed 2B+ records using Node.js, RabbitMQ, and Cassandra.', color: 'green' },
    { year: '2018–2019', title: 'Inventory Management UI', description: 'React-based server management application with MySQL backend and role-based access control (RBAC) for centralized operations.', color: 'cyan' },
    { year: '2017–2018', title: 'Monitoring UI & Automation Dashboard', description: 'Real-time Node.js process monitoring dashboard and JMeter-integrated automation test reporting system.', color: 'blue' },
    { year: '2016–Present', title: 'IDAM — Identity Access Management', description: 'Centralized identity management handling authentication APIs for JioTV, JioSaavn, Hotstar with 100M+ daily requests.', color: 'cyan' },
    { year: '2016–2017', title: 'Trial WiFi & JTL IDAM APIs', description: 'Free Wi-Fi authentication APIs for campuses/hotels and IoT device authentication for Jio Things Limited.', color: 'orange' },
  ],
}

export const testimonials: Testimonial[] = [
  {
    name: 'Alisha Patel',
    role: 'DevOps, Jio Platforms Ltd',
    text: "The Monitoring UI dashboard Nouman built has transformed how we manage Node.js processes across servers. Real-time visibility and centralized control have reduced our incident response time by 60%.",
    avatar: 'AP',
    accent: 'blue',
  },
  {
    name: 'Sharique Ansari',
    role: 'Engineering Manager, Reliance Digital',
    text: "Working with Nouman on the JioID project was a game-changer. He built the universal SSO solution that seamlessly integrates across all Jio services. His expertise in Node.js and Cassandra is outstanding.",
    avatar: 'SA',
    accent: 'purple',
  },
  {
    name: 'Sanjog Shine',
    role: 'Senior Architect, Jio',
    text: "Nouman led the data migration of 2B+ records flawlessly. His systematic approach to reconciliation and his expertise with ClickHouse and DuckDB ensured zero data loss. Highly recommended!",
    avatar: 'SS',
    accent: 'green',
  },
]

export const techOrbs: TechOrb[] = [
  { name: 'Node.js', color: '#68a063' },
  { name: 'React', color: '#06b6d4' },
  { name: 'Cassandra', color: '#1287b1' },
  { name: 'Redis', color: '#dc382d' },
  { name: 'Docker', color: '#2496ed' },
  { name: 'TypeScript', color: '#3178c6' },
  { name: 'ClickHouse', color: '#f9d71c' },
  { name: 'RabbitMQ', color: '#ff6600' },
]

export const orbitIcons = ['⚡', '🗄️', '☁️', '🔒', '📊', '🚀']
