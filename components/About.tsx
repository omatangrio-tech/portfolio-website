'use client';

import { useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.7, 
      ease: [0.25, 0.46, 0.45, 0.94],
      staggerChildren: 0.1
    }
  }
};

const childVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } }
};

function CountUp({ end, duration = 2, suffix = '' }: { end: number, duration?: number, suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / (duration * 1000), 1);
      
      // Easing out function
      const easeOutQuart = 1 - Math.pow(1 - percentage, 4);
      
      setCount(Number((easeOutQuart * end).toFixed(1)));

      if (percentage < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end); // Ensure we end exactly on the target
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, isInView]);

  return (
    <span ref={ref}>
      {count % 1 === 0 ? count : count.toFixed(1)}
      {suffix}
    </span>
  );
}

export default function About() {
  const [hasReducedMotion, setHasReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setHasReducedMotion(mediaQuery.matches);
  }, []);

  return (
    <motion.section
      id="about"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={hasReducedMotion ? {} : sectionVariants}
      className="w-full py-24 bg-surface"
    >
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        <motion.div variants={childVariants} className="mb-12">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            About <span className="text-cyan-400">Me</span>
          </h2>
          <div className="w-20 h-1 bg-cyan-400 rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Image */}
          <motion.div 
            variants={childVariants}
            className="relative flex justify-center"
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full p-2">
              {/* Rotating Dashed Ring */}
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-cyan-400/50 animate-[spin_12s_linear_infinite]" />
              
              {/* Image Container with Glow */}
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 100, damping: 15 }}
                className="relative w-full h-full rounded-full overflow-hidden border-2 border-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.3)] bg-background-light"
              >
                <Image
                  src="/images/patel-om-concert.png"
                  alt="Patel Om"
                  fill
                  className="object-cover"
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Right: Text & Stats */}
          <motion.div variants={childVariants} className="flex flex-col gap-8">
            <p className="text-lg text-gray-300 leading-relaxed font-sans">
              I'm <span className="text-white font-semibold">Patel Om</span>, a passionate Frontend Developer with 2.5 years of experience building modern, responsive web applications. I specialize in React.js, Next.js, Angular, and Ionic Framework, and love crafting pixel-perfect UIs that deliver great user experiences.
            </p>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/10">
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-cyan-400 mb-2">
                  <CountUp end={2.5} suffix="+" />
                </span>
                <span className="text-sm text-gray-400 uppercase tracking-wider">Years Exp</span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-cyan-400 mb-2">
                  <CountUp end={3} suffix="+" />
                </span>
                <span className="text-sm text-gray-400 uppercase tracking-wider">Projects</span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-cyan-400 mb-2">
                  <CountUp end={10} suffix="+" />
                </span>
                <span className="text-sm text-gray-400 uppercase tracking-wider">Techs</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
