'use client';

import { motion } from 'framer-motion';
import { projects } from '@/data/projects';
import { ExternalLink, Github } from 'lucide-react';
import { useEffect, useState } from 'react';

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

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }
  }
};

export default function Projects() {
  const [hasReducedMotion, setHasReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setHasReducedMotion(mediaQuery.matches);
  }, []);

  return (
    <motion.section
      id="projects"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={hasReducedMotion ? {} : sectionVariants}
      className="w-full py-24 bg-surface"
    >
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        <motion.div variants={cardVariants} className="mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Featured <span className="text-cyan-400">Projects</span>
          </h2>
          <div className="w-20 h-1 bg-cyan-400 rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              whileHover={hasReducedMotion ? {} : { y: -8 }}
              className="group relative flex flex-col bg-background border border-white/10 rounded-2xl p-6 hover:shadow-[0_10px_30px_rgba(6,182,212,0.15)] hover:border-cyan-400/50 transition-all duration-300 overflow-hidden"
            >
              {/* Shimmer Effect */}
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover:animate-[shimmer_1.5s_infinite]" />

              <div className="flex justify-between items-start mb-6 relative z-10">
                <div className="w-12 h-12 bg-cyan-400/10 text-cyan-400 rounded-xl flex items-center justify-center">
                  <Code2Icon />
                </div>
                <div className="flex gap-4 text-gray-400">
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">
                    <Github size={20} />
                  </a>
                  {project.liveDemo !== '#' && (
                    <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">
                      <ExternalLink size={20} />
                    </a>
                  )}
                </div>
              </div>

              <h3 className="text-xl font-bold text-white mb-3 relative z-10">{project.name}</h3>
              <p className="text-gray-400 mb-6 flex-grow relative z-10 line-clamp-4">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 relative z-10 mt-auto pt-4 border-t border-white/5">
                {project.tags.map((tag) => (
                  <span key={tag} className="text-xs font-mono text-cyan-400 bg-cyan-400/10 px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}} />
    </motion.section>
  );
}

function Code2Icon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6"></polyline>
      <polyline points="8 6 2 12 8 18"></polyline>
    </svg>
  );
}
