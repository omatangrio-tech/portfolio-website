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
      style={{
        background: '#f8fafc',
        border: '1px solid var(--border)',
        borderRadius: 16,
        padding: '24px 16px',
        textAlign: 'center',
        transition: 'all 0.3s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--blue-border)';
        e.currentTarget.style.boxShadow = 'var(--shadow-md)';
        e.currentTarget.style.transform = 'translateY(-3px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--border)';
        e.currentTarget.style.boxShadow = 'none';
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
      style={{
        background: 'white',
        padding: '100px 0',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 clamp(24px, 5vw, 64px)',
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Left Column - Photo */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div
              style={{
                position: 'relative',
                width: 320,
                height: 400,
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
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  borderRadius: 20,
                  overflow: 'hidden',
                  border: '3px solid rgba(37, 99, 235, 0.15)',
                  boxShadow: 'var(--shadow-lg)',
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
            <h2
              style={{
                fontSize: 'clamp(36px, 5vw, 52px)',
                fontWeight: 800,
                color: '#0f172a',
                lineHeight: 1.1,
              }}
            >
              About <span className="gradient-text">Me</span>
            </h2>
            <div
              style={{
                width: 56,
                height: 3,
                background: 'linear-gradient(90deg, #2563eb, #f97316)',
                margin: '12px 0 24px',
              }}
            />
            <p
              style={{
                fontSize: 17,
                lineHeight: 1.9,
                color: '#475569',
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
