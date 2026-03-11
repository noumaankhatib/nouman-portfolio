import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Nouman Khatib — Senior Full Stack Developer | Systems That Scale to Billions',
  description: 'Senior Full Stack Developer with 8+ years building systems that handle 100M+ daily requests, serve 500M+ users, and deliver 99.9% uptime. Available for freelance projects worldwide.',
  keywords: 'Nouman Khatib, Full Stack Developer, Node.js, React, PostgreSQL, Redis, Identity Platform, Backend Engineer, Remote Developer, Freelance',
  authors: [{ name: 'Nouman Khatib' }],
  openGraph: {
    type: 'website',
    title: "Nouman Khatib — I Build Systems That Scale to Billions",
    description: "8+ Years · 100M+ Daily Requests · 500M+ Users · 99.9% Uptime",
  },
  twitter: {
    card: 'summary_large_image',
    title: "Nouman Khatib — Systems That Scale to Billions",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark">
      <body className={`${inter.variable} ${jetbrains.variable} font-sans`}>
        {children}
      </body>
    </html>
  )
}
