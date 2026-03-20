import Loader from '@/components/Loader'
import Cursor from '@/components/Cursor'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Services from '@/components/Services'
import Impact from '@/components/Impact'
import Projects from '@/components/Projects'
import Skills from '@/components/Skills'
import Timeline from '@/components/Timeline'
import Testimonials from '@/components/Testimonials'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Loader />
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Impact />
        <Projects />
        <Skills />
        <Timeline />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
