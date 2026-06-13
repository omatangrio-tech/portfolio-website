'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface SkillItem {
  name: string;
  level: number;
  icon?: string;
}

interface AnimatedSkillBarsProps {
  skills: SkillItem[];
}

export default function AnimatedSkillBars({ skills }: AnimatedSkillBarsProps) {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !isVisible) {
        setIsVisible(true);
        animateBars();
      }
    }, { threshold: 0.3 });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  const animateBars = () => {
    const bars = document.querySelectorAll('[data-skill-bar]');
    bars.forEach((bar, idx) => {
      gsap.from(bar, {
        width: 0,
        duration: 1.2,
        delay: idx * 0.15,
        ease: 'power3.out',
      });
    });
  };

  return (
    <div ref={containerRef} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {skills.map((skill) => (
        <div key={skill.name} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {skill.icon && <span style={{ fontSize: 18 }}>{skill.icon}</span>}
              <span style={{ fontSize: 14, fontWeight: 600, color: '#e2e8f0' }}>{skill.name}</span>
            </div>
            <span style={{ fontSize: 12, color: '#94a3b8', fontWeight: 500 }}>{skill.level}%</span>
          </div>
          <div
            style={{
              width: '100%',
              height: 6,
              background: 'rgba(148, 163, 184, 0.15)',
              borderRadius: 999,
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <div
              data-skill-bar
              style={{
                height: '100%',
                width: `${skill.level}%`,
                background: `linear-gradient(90deg, #d4b78f ${0}%, #c9ab84 ${50}%, #9a8566 ${100}%)`,
                borderRadius: 999,
                boxShadow: '0 0 12px rgba(212, 183, 143, 0.4)',
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
