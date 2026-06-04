'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

interface StatCardProps {
  target: number;
  label: string;
  suffix?: string;
}

function StatCard({ target, label, suffix = '+' }: StatCardProps) {
  const [count, setCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasStarted = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasStarted.current) {
            hasStarted.current = true;
            const duration = 1800; // 1.8 seconds
            const steps = 60;
            const stepTime = duration / steps;
            const increment = target / steps;
            let current = 0;

            const interval = setInterval(() => {
              current += increment;
              if (current >= target) {
                setCount(target);
                clearInterval(interval);
              } else {
                setCount(current);
              }
            }, stepTime);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [target]);

  const formattedCount = count % 1 === 0 ? count.toFixed(0) : count.toFixed(1);

  return (
    <div
      ref={containerRef}
      className="glass-card light-border-hover"
      style={{
        borderRadius: 16,
        padding: '24px 16px',
        textAlign: 'center',
        transition: 'all 0.3s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-3px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <span className="gradient-text" style={{ fontSize: 40, fontWeight: 800, display: 'block', marginBottom: 8 }}>
        {formattedCount}
        {suffix}
      </span>
      <span
        style={{
          fontSize: 12,
          color: '#94a3b8',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          fontWeight: 600,
        }}
      >
        {label}
      </span>
    </div>
  );
}

export default function About() {
  return (
    <section
      id="about"
      className="futuristic-section section-reveal"
      style={{
        padding: '100px 0',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <div className="section-shell">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Left Column - Photo */}
          <div className="depth-scene" style={{ display: 'flex', justifyContent: 'center' }}>
            <div
              className="glass-card light-border-hover depth-card"
              style={{
                position: 'relative',
                width: 'min(100%, 320px)',
                height: 'clamp(300px, 78vw, 400px)',
                borderRadius: 24,
                padding: 14,
              }}
            >
              {/* Decorative spinning dashed ring */}
              <div
                style={{
                  position: 'absolute',
                  inset: -16,
                  border: '2px dashed rgba(37, 99, 235, 0.15)',
                  borderRadius: '50%',
                  animation: 'spin-slow 20s linear infinite',
                  pointerEvents: 'none',
                }}
              />
              <div
                className="depth-layer"
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  borderRadius: 20,
                  overflow: 'hidden',
                  border: '1px solid rgba(148, 163, 184, 0.24)',
                }}
              >
                <Image
                  src="/images/patel-om-concert.png"
                  alt="Patel Om"
                  fill
                  style={{ objectFit: 'cover' }}
                  priority
                />
              </div>
            </div>
          </div>

          {/* Right Column - Text Bio */}
          <div>
            <div className="awwards-header-row" style={{ marginBottom: 24 }}>
              <div className="awwards-index">01</div>
              <div>
                <div className="section-kicker">Profile</div>
                <h2 className="section-title" style={{ marginTop: 8 }}>
                  About <span className="gradient-text">Me</span>
                </h2>
                <div className="futuristic-divider" style={{ margin: '12px 0 0', maxWidth: 260 }} />
              </div>
            </div>
            <p
              style={{
                fontSize: 'clamp(15px, 2.8vw, 17px)',
                lineHeight: 1.9,
                color: '#94a3b8',
                marginBottom: 32,
              }}
            >
              I'm Patel Om, a passionate Frontend Developer with 2.5 years of experience building modern, responsive
              web applications. I specialize in React.js, Next.js, Angular, and Ionic Framework, and love crafting
              pixel-perfect UIs that deliver great user experiences. I focus on writing clean, maintainable code,
              collaborating with design and backend teams, and bringing ideas to life with high performance.
            </p>

            {/* Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <StatCard target={2.5} label="Years Exp" />
              <StatCard target={3} label="Projects" />
              <StatCard target={10} label="Techs" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
