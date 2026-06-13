'use client';

import { useEffect, useState } from 'react';
import { Github, Linkedin, ArrowUpRight, Download } from 'lucide-react';

export default function Hero() {
  const [typedText, setTypedText] = useState('');
  const roles = ['Frontend Developer', 'React & Next.js Specialist', 'UI/UX Engineer'];
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timer: NodeJS.Timeout;

    if (!isDeleting) {
      if (charIndex < currentRole.length) {
        timer = setTimeout(() => {
          setTypedText((prev) => prev + currentRole.charAt(charIndex));
          setCharIndex((prev) => prev + 1);
        }, 60);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2000);
      }
    } else {
      if (charIndex > 0) {
        timer = setTimeout(() => {
          setTypedText((prev) => prev.slice(0, -1));
          setCharIndex((prev) => prev - 1);
        }, 30);
      } else {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
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
        paddingBottom: '100px',
        overflow: 'hidden',
      }}
    >
      <div
        className="section-shell"
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          zIndex: 1,
        }}
      >
        {/* Main Content */}
        <div style={{ maxWidth: '900px' }}>
          {/* Subtitle Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '8px 16px',
              background: 'rgba(212, 183, 143, 0.08)',
              border: '1px solid rgba(212, 183, 143, 0.2)',
              borderRadius: '24px',
              marginBottom: 32,
              fontSize: 13,
              fontWeight: 600,
              color: '#d4b78f',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
            }}
          >
            <span style={{ width: 6, height: 6, background: '#d4b78f', borderRadius: '50%' }} />
            Available for Projects
          </div>

          {/* Main Heading */}
          <h1
            style={{
              fontSize: 'clamp(48px, 10vw, 92px)',
              lineHeight: 1,
              fontWeight: 800,
              letterSpacing: '-0.02em',
              color: '#e2e8f0',
              marginBottom: 24,
            }}
          >
            Hi, I'm{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #d4b78f 0%, #f59e0b 100%)',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                WebkitBackgroundClip: 'text',
              }}
            >
              Patel Om
            </span>
          </h1>

          {/* Subtitle with Typewriter */}
          <p
            style={{
              fontSize: 'clamp(18px, 2.5vw, 28px)',
              color: '#cbd5e1',
              fontWeight: 400,
              lineHeight: 1.6,
              marginBottom: 16,
              minHeight: '40px',
            }}
          >
            I'm a{' '}
            <span
              style={{
                color: '#d4b78f',
                fontWeight: 600,
                borderRight: '2px solid #d4b78f',
                paddingRight: '6px',
                minWidth: '200px',
                display: 'inline-block',
              }}
            >
              {typedText}
            </span>
          </p>

          {/* Description */}
          <p
            style={{
              fontSize: 'clamp(16px, 1.8vw, 18px)',
              color: '#94a3b8',
              lineHeight: 1.8,
              maxWidth: '600px',
              marginBottom: 40,
            }}
          >
            Building high-performance web applications with modern technologies. Specialized in React, Next.js, and creating intuitive user experiences.
          </p>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 40 }}>
            <button
              onClick={() => handleScrollToSection('projects')}
              style={{
                padding: '14px 32px',
                background: 'linear-gradient(135deg, #d4b78f 0%, #c9ab84 100%)',
                color: '#0f172a',
                border: 'none',
                borderRadius: '8px',
                fontSize: 16,
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 8px 24px rgba(212, 183, 143, 0.3)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 32px rgba(212, 183, 143, 0.5)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 24px rgba(212, 183, 143, 0.3)';
              }}
            >
              Explore My Work
            </button>

            <a
              href="/resume.pdf"
              download
              style={{
                padding: '14px 32px',
                background: 'rgba(212, 183, 143, 0.1)',
                color: '#d4b78f',
                border: '1px solid rgba(212, 183, 143, 0.2)',
                borderRadius: '8px',
                fontSize: 16,
                fontWeight: 600,
                cursor: 'pointer',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(212, 183, 143, 0.15)';
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(212, 183, 143, 0.4)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(212, 183, 143, 0.1)';
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(212, 183, 143, 0.2)';
              }}
            >
              <Download size={18} />
              Download Resume
            </a>
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap', marginBottom: 60 }}>
            <div>
              <div style={{ fontSize: 32, fontWeight: 800, color: '#d4b78f', marginBottom: 4 }}>2.5+</div>
              <div style={{ fontSize: 14, color: '#94a3b8', fontWeight: 500 }}>Years Experience</div>
            </div>
            <div>
              <div style={{ fontSize: 32, fontWeight: 800, color: '#d4b78f', marginBottom: 4 }}>15+</div>
              <div style={{ fontSize: 14, color: '#94a3b8', fontWeight: 500 }}>Projects Completed</div>
            </div>
            <div>
              <div style={{ fontSize: 32, fontWeight: 800, color: '#d4b78f', marginBottom: 4 }}>10+</div>
              <div style={{ fontSize: 14, color: '#94a3b8', fontWeight: 500 }}>Technologies</div>
            </div>
          </div>

          {/* Social Links */}
          <div style={{ display: 'flex', gap: 20, paddingBottom: 40 }}>
            <a
              href="https://github.com/ATeam-Learing"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              style={{
                width: 48,
                height: 48,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(212, 183, 143, 0.08)',
                border: '1px solid rgba(212, 183, 143, 0.15)',
                borderRadius: '12px',
                color: '#d4b78f',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(212, 183, 143, 0.15)';
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(212, 183, 143, 0.3)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(212, 183, 143, 0.08)';
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(212, 183, 143, 0.15)';
              }}
            >
              <Github size={24} />
            </a>
            <a
              href="https://www.linkedin.com/in/patel-om-5b1804298"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              style={{
                width: 48,
                height: 48,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(212, 183, 143, 0.08)',
                border: '1px solid rgba(212, 183, 143, 0.15)',
                borderRadius: '12px',
                color: '#d4b78f',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(212, 183, 143, 0.15)';
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(212, 183, 143, 0.3)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(212, 183, 143, 0.08)';
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(212, 183, 143, 0.15)';
              }}
            >
              <Linkedin size={24} />
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
            animation: 'bounce 2s infinite',
          }}
        >
          <p style={{ fontSize: 12, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Scroll to explore
          </p>
          <div
            style={{
              width: 20,
              height: 32,
              border: '1px solid rgba(212, 183, 143, 0.3)',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'center',
              padding: '6px 0',
            }}
          >
            <div
              style={{
                width: 2,
                height: 6,
                background: '#d4b78f',
                borderRadius: '1px',
                animation: 'scroll-indicator 1.5s infinite',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
