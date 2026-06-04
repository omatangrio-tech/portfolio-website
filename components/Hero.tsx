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
      className="futuristic-section section-reveal"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingTop: 'clamp(96px, 14vw, 140px)',
        overflow: 'hidden',
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
          background: 'radial-gradient(circle, rgba(37,99,235,0.18) 0%, transparent 70%)',
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
          background: 'radial-gradient(circle, rgba(249,115,22,0.16) 0%, transparent 70%)',
          filter: 'blur(60px)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(circle, rgba(148,163,184,0.16) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      <div
        className="section-shell"
        style={{
          width: '100%',
          zIndex: 1,
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* LEFT COL (55%) */}
          <div className="lg:col-span-7 flex flex-col items-start" style={{ paddingTop: 16 }}>
            {/* Badge */}
            <div
              style={{
                border: '1px solid rgba(37,99,235,0.25)',
                background: 'rgba(37,99,235,0.14)',
                color: '#bfdbfe',
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
            <div className="section-kicker">Frontend Engineer Portfolio</div>
            <h1
              className="display-title"
              data-cursor="text"
              style={{
                fontSize: 'clamp(50px, 8.2vw, 112px)',
                lineHeight: 0.9,
                letterSpacing: '0.045em',
                textShadow: '0 6px 24px rgba(15,23,42,0.45)',
              }}
            >
              Hi, I'm <br />
              <span className="gradient-text">Patel Om</span>
            </h1>

            {/* Subtitle */}
            <div
              data-cursor="text"
              style={{
                fontSize: 'clamp(18px, 2.2vw, 26px)',
                color: '#94a3b8',
                fontWeight: 400,
                minHeight: 'clamp(30px, 7vw, 36px)',
                marginTop: 14,
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
              }}
            >
              <span>I am a&nbsp;</span>
              <span style={{ fontWeight: 600, color: '#60a5fa', borderRight: '2px solid #60a5fa' }}>
                {typedText}
              </span>
            </div>

            {/* Divider */}
            <div
              style={{
                width: 100,
                height: 2,
                background: 'linear-gradient(90deg, #3b82f6, #f97316)',
                margin: '24px 0',
              }}
            />

            {/* Buttons Row */}
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 8 }}>
              <button
                data-cursor="link"
                onClick={() => handleScrollToSection('projects')}
                style={{
                  background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
                  color: 'white',
                  padding: '12px clamp(18px, 6vw, 36px)',
                  borderRadius: 12,
                  fontSize: 'clamp(14px, 3.6vw, 16px)',
                  fontWeight: 600,
                  border: '1px solid rgba(96,165,250,0.4)',
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
                data-cursor="link"
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: 'rgba(15,23,42,0.4)',
                  border: '1px solid rgba(96,165,250,0.45)',
                  color: '#bfdbfe',
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
                  e.currentTarget.style.background = 'rgba(37,99,235,0.24)';
                  e.currentTarget.style.color = '#e2e8f0';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(15,23,42,0.4)';
                  e.currentTarget.style.color = '#bfdbfe';
                }}
              >
                Download CV
              </a>
            </div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 18 }}>
              {['Based in India', '2.5+ Years Experience', 'Open to Freelance'].map((item) => (
                <span
                  key={item}
                  className="glass-card light-border-hover"
                  data-cursor="card"
                  style={{
                    borderRadius: 999,
                    padding: '7px 12px',
                    color: '#cbd5e1',
                    fontSize: 11,
                    fontWeight: 500,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                  }}
                >
                  {item}
                </span>
              ))}
            </div>

            {/* Social Links */}
            <div style={{ display: 'flex', gap: 16, marginTop: 32 }}>
              <a
                href="https://github.com/ATeam-Learing"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                style={{ color: '#64748b', transition: 'color 0.2s' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#60a5fa')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#64748b')}
              >
                <Github size={22} />
              </a>
              <a
                href="https://www.linkedin.com/in/patel-om-5b1804298"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                style={{ color: '#64748b', transition: 'color 0.2s' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#60a5fa')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#64748b')}
              >
                <Linkedin size={22} />
              </a>
            </div>
          </div>

          {/* RIGHT COL (45%) */}
            <div className="lg:col-span-5 flex flex-col gap-6 relative depth-scene" style={{ zIndex: 2, marginTop: 20 }}>
            {/* Card 1 - Currently Building */}
            <div
              className="premium-panel light-border-hover depth-card hover-lift-soft"
              data-cursor="card"
              style={{
                borderRadius: 16,
                padding: '20px clamp(16px, 4vw, 24px)',
                transition: 'transform 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div className="depth-layer" style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                <span
                  style={{
                    width: 8,
                    height: 8,
                    background: '#10b981',
                    borderRadius: '50%',
                    animation: 'pulse-dot 2s infinite',
                  }}
                />
                <span style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#cbd5e1' }}>
                  Live Project
                </span>
              </div>
              <div className="depth-layer" style={{ fontSize: 18, fontWeight: 700, color: '#e2e8f0' }}>The Leansuite</div>
              <a
                className="depth-layer"
                data-cursor="link"
                href="https://theleansuite.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: 13,
                  color: '#93c5fd',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 4,
                  marginTop: 4,
                }}
              >
                theleansuite.com <ArrowUpRight size={14} />
              </a>
              <div className="depth-layer" style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 12 }}>
                {['Next.js', 'TypeScript', 'Angular'].map((t) => (
                  <span
                    key={t}
                    style={{
                      background: 'rgba(37,99,235,0.15)',
                      color: '#bfdbfe',
                      border: '1px solid rgba(37,99,235,0.3)',
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
              className="premium-panel light-border-hover depth-card hover-lift-soft"
              data-cursor="card"
              style={{
                borderRadius: 16,
                padding: '20px clamp(16px, 4vw, 24px)',
                transition: 'transform 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div className="grid grid-cols-2 gap-4 depth-layer">
                <div>
                  <div className="gradient-text" style={{ fontSize: 28, fontWeight: 800 }}>2.5+</div>
                  <div style={{ fontSize: 12, color: '#94a3b8', fontWeight: 500 }}>Years Exp</div>
                </div>
                <div>
                  <div className="gradient-text" style={{ fontSize: 28, fontWeight: 800 }}>3+</div>
                  <div style={{ fontSize: 12, color: '#94a3b8', fontWeight: 500 }}>Projects</div>
                </div>
                <div>
                  <div className="gradient-text" style={{ fontSize: 28, fontWeight: 800 }}>10+</div>
                  <div style={{ fontSize: 12, color: '#94a3b8', fontWeight: 500 }}>Technologies</div>
                </div>
                <div>
                  <div className="gradient-text" style={{ fontSize: 28, fontWeight: 800 }}>100%</div>
                  <div style={{ fontSize: 12, color: '#94a3b8', fontWeight: 500 }}>Passion</div>
                </div>
              </div>
            </div>

            {/* Card 3 - Tech Stack badges */}
            <div
              className="premium-panel light-border-hover depth-card hover-lift-soft"
              data-cursor="card"
              style={{
                borderRadius: 16,
                padding: '20px clamp(16px, 4vw, 24px)',
                transition: 'transform 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div
                className="depth-layer"
                style={{
                  fontSize: 11,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: '#cbd5e1',
                  fontWeight: 600,
                  marginBottom: 12,
                }}
              >
                My Stack
              </div>
              <div className="depth-layer" style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {['⚛️ React', '▲ Next.js', '🅰️ Angular', '📱 Ionic', '🔷 TypeScript', '🔥 Firebase'].map((badge) => (
                  <div
                    key={badge}
                    style={{
                      background: 'rgba(15,23,42,0.35)',
                      border: '1px solid rgba(148,163,184,0.2)',
                      borderRadius: 8,
                      padding: '6px 12px',
                      fontSize: 12,
                      color: '#94a3b8',
                      fontWeight: 500,
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(37,99,235,0.25)';
                      e.currentTarget.style.color = '#93c5fd';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border)';
                      e.currentTarget.style.color = '#94a3b8';
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
          background: 'rgba(15,23,42,0.5)',
          borderTop: '1px solid rgba(148,163,184,0.2)',
          borderBottom: '1px solid rgba(148,163,184,0.2)',
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
