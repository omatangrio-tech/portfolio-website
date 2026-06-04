import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Experience from '@/components/Experience';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="w-full">
        <Hero />
        <div className="cinematic-divider" aria-hidden="true" />
        <About />
        <div className="cinematic-divider" aria-hidden="true" />
        <Skills />
        <div className="cinematic-divider" aria-hidden="true" />
        <Projects />
        <div className="cinematic-divider" aria-hidden="true" />
        <Experience />
        <div className="cinematic-divider" aria-hidden="true" />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
