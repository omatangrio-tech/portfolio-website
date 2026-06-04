'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import Image from 'next/image';

const titles = ["Frontend Developer", "React & Next.js Developer", "Angular & Ionic Developer"];

export default function Hero() {
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Typewriter effect
  useEffect(() => {
    const currentTitle = titles[titleIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && displayText === currentTitle) {
      // Pause at end of typing
      timeout = setTimeout(() => setIsDeleting(true), 1500);
    } else if (isDeleting && displayText === '') {
      // Move to next word
      setIsDeleting(false);
      setTitleIndex((prev) => (prev + 1) % titles.length);
    } else {
      // Typing/Deleting speed
      const speed = isDeleting ? 40 : 80;
      timeout = setTimeout(() => {
        setDisplayText(currentTitle.substring(0, displayText.length + (isDeleting ? -1 : 1)));
      }, speed);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, titleIndex]);

  // Magnetic button effect
  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // Max offset 8px
    const offsetX = (x / rect.width) * 16;
    const offsetY = (y / rect.height) * 16;

    target.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    const target = e.currentTarget;
    target.style.transform = 'translate(0px, 0px)';
  };

  const headingText = "Hi, I'm Patel Om 👋".split(" ");

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-20">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-cyan-400/10 rounded-full blur-[120px] animate-[float_6s_ease-in-out_infinite]" />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-indigo-500/10 rounded-full blur-[100px] animate-[float_8s_ease-in-out_infinite_reverse]" />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <div className="container relative z-10 mx-auto px-6 flex flex-col items-center text-center">
        <h1 className="text-5xl md:text-7xl font-bold font-heading mb-6 flex flex-wrap justify-center gap-x-4">
          {headingText.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 * i, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="h-12 mb-10"
        >
          <span className="text-2xl md:text-3xl text-gray-400 font-medium">
            {displayText}
            <span className="animate-pulse text-cyan-400">|</span>
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-6 items-center"
        >
          <a
            href="#projects"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded-full transition-colors duration-300 ease-out flex items-center gap-2 will-change-transform"
          >
            View My Work
          </a>
          <a
            href="/resume.pdf"
            download
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="px-8 py-4 bg-transparent border border-white/20 hover:border-cyan-400 hover:text-cyan-400 font-semibold rounded-full transition-colors duration-300 ease-out will-change-transform"
          >
            Download CV
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500"
      >
        <span className="text-sm tracking-widest uppercase text-white/50">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown className="w-5 h-5 text-cyan-400" />
        </motion.div>
      </motion.div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes float {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-30px) scale(1.05); }
        }
      `}} />
    </section>
  );
}
