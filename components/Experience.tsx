'use client';

import { motion, useInView } from 'framer-motion';
import { experiences } from '@/data/experience';
import { useEffect, useState, useRef } from 'react';

export default function Experience() {
  const [hasReducedMotion, setHasReducedMotion] = useState(false);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setHasReducedMotion(mediaQuery.matches);
  }, []);

  return (
    <section id="experience" className="w-full py-24 bg-background">
      <div className="container mx-auto px-6 md:px-12 max-w-4xl" ref={containerRef}>
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Work <span className="text-cyan-400">Experience</span>
          </h2>
          <div className="w-20 h-1 bg-cyan-400 rounded-full" />
        </motion.div>

        <div className="relative">
          {/* Vertical Line */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-white/10 origin-top transform md:-translate-x-1/2"
          />

          <div className="flex flex-col gap-12">
            {experiences.map((exp, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={exp.id} className="relative flex flex-col md:flex-row items-center w-full">
                  
                  {/* Timeline Dot */}
                  <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-cyan-400 border-4 border-background transform -translate-x-1/2 md:mt-0 mt-6 z-10">
                    <div className="absolute inset-0 rounded-full bg-cyan-400 animate-ping opacity-75" />
                  </div>

                  {/* Card Container */}
                  <motion.div
                    initial={
                      hasReducedMotion
                        ? { opacity: 0 }
                        : { opacity: 0, x: isEven ? -50 : 50 }
                    }
                    whileInView={
                      hasReducedMotion
                        ? { opacity: 1 }
                        : { opacity: 1, x: 0 }
                    }
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className={`w-full md:w-1/2 pl-8 md:px-12 ${
                      isEven ? 'md:pr-12 md:pl-0 md:text-right' : 'md:ml-auto'
                    }`}
                  >
                    <div className="bg-surface p-6 rounded-2xl border border-white/5 hover:border-cyan-400/30 transition-colors shadow-lg">
                      <h3 className="text-xl font-bold text-white mb-1">{exp.role}</h3>
                      <h4 className="text-cyan-400 font-medium mb-3">{exp.company}</h4>
                      {exp.duration && (
                        <p className="text-sm text-gray-500 mb-4 font-mono">{exp.duration}</p>
                      )}
                      <ul className={`text-gray-300 space-y-2 text-sm ${isEven ? 'md:list-inside' : 'list-inside'}`}>
                        {exp.points.map((point, i) => (
                          <li key={i} className="flex gap-2">
                            <span className="text-cyan-400 mt-1 flex-shrink-0">▹</span>
                            <span className={isEven ? 'md:text-left text-left' : 'text-left'}>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
