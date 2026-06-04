'use client';

import { motion } from 'framer-motion';
import { skills } from '@/data/skills';
import { Code2 } from 'lucide-react';
import { useEffect, useState } from 'react';

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.7, 
      ease: [0.25, 0.46, 0.45, 0.94],
      staggerChildren: 0.05
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5 }
  }
};

export default function Skills() {
  const [hasReducedMotion, setHasReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setHasReducedMotion(mediaQuery.matches);
  }, []);

  return (
    <motion.section
      id="skills"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={hasReducedMotion ? {} : sectionVariants}
      className="w-full py-24 bg-background"
    >
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        <motion.div variants={cardVariants} className="mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            My Tech <span className="text-cyan-400">Stack</span>
          </h2>
          <div className="w-20 h-1 bg-cyan-400 rounded-full" />
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={hasReducedMotion ? {} : { scale: 1.05 }}
              className="group relative p-6 rounded-2xl bg-surface-light border border-white/5 hover:border-cyan-400/50 transition-colors flex flex-col items-center justify-center text-center gap-4 overflow-hidden"
            >
              {/* Hover Glow */}
              <div className="absolute inset-0 bg-cyan-400/0 group-hover:bg-cyan-400/5 transition-colors" />
              
              <motion.div 
                className="text-cyan-400"
                whileHover={hasReducedMotion ? {} : { 
                  scale: [1, 1.2, 1],
                  transition: { duration: 0.3 }
                }}
              >
                <Code2 size={32} />
              </motion.div>
              
              <span className="font-medium text-gray-200 group-hover:text-white transition-colors">
                {skill.name}
              </span>

              {/* Animated underline */}
              <div className="absolute bottom-0 left-0 h-1 bg-cyan-400 w-0 group-hover:w-full transition-all duration-300 ease-out" />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
