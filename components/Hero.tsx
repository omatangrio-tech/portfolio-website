'use client';

import { useEffect, useState } from 'react';
import { Github, Linkedin, ArrowUpRight } from 'lucide-react';

export default function Hero() {
  const [typedText, setTypedText] = useState('');
  const roles = ['Frontend Developer', 'React & Next.js Developer', 'Angular & Ionic Developer'];
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter effect
  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timer: NodeJS.Timeout;

    if (!isDeleting) {
      if (charIndex < currentRole.length) {
        timer = setTimeout(() => {
          setTypedText((prev) => prev + currentRole.charAt(charIndex));
          setCharIndex((prev) => prev + 1);
        }, 80);
      } else {
        // Pause at completion
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 1800);
      }
    } else {
      if (charIndex > 0) {
        timer = setTimeout(() => {
          setTypedText((prev) => prev.slice(0, -1));
          setCharIndex((prev) => prev - 1);
        }, 45);
      } else {
        // Finished deleting, move to next role
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
        timer = setTimeout(() => {}, 300);
      }
    }

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, roleIndex]);

  const handleScrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingTop: 'clamp(96px, 14vw, 140px)',
        overflow: 'hidden',
        background: '#f8fafc',
      }}
    >
      {/* Decorative BG elements */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          right: '-5%',
          width: 'clamp(240px, 40vw, 400px)',
          height: 'clamp(240px, 40vw, 400px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 70%)',
          filter: 'blur(60px)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '15%',
          left: '-5%',
          width: 'clamp(190px, 30vw, 300px)',
          height: 'clamp(190px, 30vw, 300px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(249,115,22,0.06) 0%, transparent 70%)',
          filter: 'blur(60px)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(circle, rgba(15,23,42,0.06) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 clamp(24px, 5vw, 64px)',
          width: '100%',
          zIndex: 1,
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* LEFT COL (55%) */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Badge */}
            <div
              style={{
                border: '1px solid rgba(37,99,235,0.25)',
                background: 'rgba(37,99,235,0.06)',
                color: '#2563eb',
                borderRadius: 999,
                padding: '6px 18px',
                fontSize: 13,
                fontWeight: 600,
                marginBottom: 24,
                animation: 'badge-pulse 2.5s ease infinite',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <span>✦</span> Available for Freelance
            </div>

            {/* H1 */}
            <h1
              style={{
                fontFamily: '"Bebas Neue", sans-serif',
                fontSize: 'clamp(38px, 10vw, 88px)',
                fontWeight: 400,
                lineHeight: 1.05,
                color: '#0f172a',
                letterSpacing: '0.02em',
              }}
            >
              Hi, I'm <br />
              <span className="gradient-text">Patel Om</span>
            </h1>

            {/* Subtitle */}
            <div
              style={{
                fontSize: 'clamp(18px, 2.2vw, 26px)',
                color: '#475569',
                fontWeight: 400,
                minHeight: 'clamp(30px, 7vw, 36px)',
                marginTop: 16,
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
              }}
            >
              <span>I am a&nbsp;</span>
              <span style={{ fontWeight: 600, color: '#2563eb', borderRight: '2px solid #2563eb' }}>
                {typedText}
              </span>
            </div>

            {/* Divider */}
            <div
              style={{
                width: 100,
                height: 2,
                background: 'linear-gradient(90deg, #2563eb, #f97316)',
                margin: '24px 0',
              }}
            />

            {/* Buttons Row */}
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 8 }}>
              <button
                onClick={() => handleScrollToSection('projects')}
                style={{
                  background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
                  color: 'white',
                  padding: '12px clamp(18px, 6vw, 36px)',
                  borderRadius: 12,
                  fontSize: 'clamp(14px, 3.6vw, 16px)',
                  fontWeight: 600,
                  border: 'none',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                View My Work
              </button>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: 'white',
                  border: '2px solid #2563eb',
                  color: '#2563eb',
                  padding: '10px clamp(18px, 6vw, 34px)',
                  borderRadius: 12,
                  fontSize: 'clamp(14px, 3.6vw, 16px)',
                  fontWeight: 600,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#2563eb';
                  e.currentTarget.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'white';
                  e.currentTarget.style.color = '#2563eb';
                }}
              >
                Download CV
              </a>
            </div>

            {/* Social Links */}
            <div style={{ display: 'flex', gap: 16, marginTop: 32 }}>
              <a
                href="https://github.com/ATeam-Learing"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                style={{ color: '#94a3b8', transition: 'color 0.2s' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#2563eb')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#94a3b8')}
              >
                <Github size={22} />
              </a>
              <a
                href="https://www.linkedin.com/in/patel-om-5b1804298"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                style={{ color: '#94a3b8', transition: 'color 0.2s' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#2563eb')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#94a3b8')}
              >
                <Linkedin size={22} />
              </a>
            </div>
          </div>

          {/* RIGHT COL (45%) */}
          <div className="lg:col-span-5 flex flex-col gap-6 relative" style={{ zIndex: 2 }}>
            {/* Card 1 - Currently Building */}
            <div
              style={{
                background: 'white',
                border: '1px solid var(--border)',
                borderRadius: 16,
                padding: '20px clamp(16px, 4vw, 24px)',
                transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(37,99,235,0.35)';
                e.currentTarget.style.boxShadow = '0 0 0 2px rgba(59,130,246,0.14)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                <span
                  style={{
                    width: 8,
                    height: 8,
                    background: '#10b981',
                    borderRadius: '50%',
                    animation: 'pulse-dot 2s infinite',
                  }}
                />
                <span style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#94a3b8' }}>
                  Live Project
                </span>
              </div>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#0f172a' }}>The Leansuite</div>
              <a
                href="https://theleansuite.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: 13,
                  color: '#2563eb',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 4,
                  marginTop: 4,
                }}
              >
                theleansuite.com <ArrowUpRight size={14} />
              </a>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 12 }}>
                {['Next.js', 'TypeScript', 'Angular'].map((t) => (
                  <span
                    key={t}
                    style={{
                      background: '#eff6ff',
                      color: '#2563eb',
                      border: '1px solid rgba(37,99,235,0.2)',
                      borderRadius: 999,
                      fontSize: 11,
                      padding: '3px 10px',
                      fontWeight: 500,
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Card 2 - Quick Stats */}
            <div
              style={{
                background: 'white',
                border: '1px solid var(--border)',
                borderRadius: 16,
                padding: '20px clamp(16px, 4vw, 24px)',
                transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(37,99,235,0.35)';
                e.currentTarget.style.boxShadow = '0 0 0 2px rgba(59,130,246,0.14)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="gradient-text" style={{ fontSize: 28, fontWeight: 800 }}>2.5+</div>
                  <div style={{ fontSize: 12, color: '#475569', fontWeight: 500 }}>Years Exp</div>
                </div>
                <div>
                  <div className="gradient-text" style={{ fontSize: 28, fontWeight: 800 }}>3+</div>
                  <div style={{ fontSize: 12, color: '#475569', fontWeight: 500 }}>Projects</div>
                </div>
                <div>
                  <div className="gradient-text" style={{ fontSize: 28, fontWeight: 800 }}>10+</div>
                  <div style={{ fontSize: 12, color: '#475569', fontWeight: 500 }}>Technologies</div>
                </div>
                <div>
                  <div className="gradient-text" style={{ fontSize: 28, fontWeight: 800 }}>100%</div>
                  <div style={{ fontSize: 12, color: '#475569', fontWeight: 500 }}>Passion</div>
                </div>
              </div>
            </div>

            {/* Card 3 - Tech Stack badges */}
            <div
              style={{
                background: 'white',
                border: '1px solid var(--border)',
                borderRadius: 16,
                padding: '20px clamp(16px, 4vw, 24px)',
                transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(37,99,235,0.35)';
                e.currentTarget.style.boxShadow = '0 0 0 2px rgba(59,130,246,0.14)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: '#94a3b8',
                  fontWeight: 600,
                  marginBottom: 12,
                }}
              >
                My Stack
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {['⚛️ React', '▲ Next.js', '🅰️ Angular', '📱 Ionic', '🔷 TypeScript', '🔥 Firebase'].map((badge) => (
                  <div
                    key={badge}
                    style={{
                      background: '#f8fafc',
                      border: '1px solid var(--border)',
                      borderRadius: 8,
                      padding: '6px 12px',
                      fontSize: 12,
                      color: '#475569',
                      fontWeight: 500,
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(37,99,235,0.25)';
                      e.currentTarget.style.color = '#2563eb';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border)';
                      e.currentTarget.style.color = '#475569';
                    }}
                  >
                    {badge}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MARQUEE STRIP */}
      <div
        style={{
          marginTop: 'clamp(32px, 8vw, 64px)',
          background: 'white',
          borderTop: '1px solid var(--border)',
          borderBottom: '1px solid var(--border)',
          padding: '14px 0',
          overflow: 'hidden',
          width: '100%',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div
          style={{
            display: 'flex',
            width: '300%',
            animation: 'marquee 26s linear infinite',
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.animationPlayState = 'paused';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.animationPlayState = 'running';
          }}
        >
          {Array(3)
            .fill(
              'React.js ✦ Next.js ✦ TypeScript ✦ Angular ✦ Ionic ✦ Tailwind CSS ✦ Firebase ✦ Supabase ✦ GitHub ✦ Vercel ✦ '
            )
            .map((text, idx) => (
              <span
                key={idx}
                style={{
                  fontSize: 13,
                  color: '#94a3b8',
                  letterSpacing: '0.06em',
                  fontWeight: 500,
                }}
              >
                {text.split('✦').map((word: string, wIdx: number) => {
                  if (word.trim() === '') return null;
                  return (
                    <span key={wIdx}>
                      {word}
                      <span style={{ color: '#2563eb', margin: '0 10px' }}>✦</span>
                    </span>
                  );
                })}
              </span>
            ))}
        </div>
      </div>
    </section>
  );
}
