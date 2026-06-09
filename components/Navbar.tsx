'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const navLinks = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Skills', href: '#skills', id: 'skills' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Experience', href: '#experience', id: 'experience' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  const palette = {
    accent: '#d4b78f',
    accentSoft: '#bfa177',
    textPrimary: '#e2e8f0',
    textMuted: '#94a3b8',
    borderSoft: 'rgba(148, 163, 184, 0.24)',
    borderHover: 'rgba(212, 183, 143, 0.52)',
    surfaceStrong: 'rgba(15, 23, 42, 0.84)',
    surfaceSoft: 'rgba(15, 23, 42, 0.64)',
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const media = window.matchMedia('(min-width: 768px)');
    const apply = () => setIsDesktop(media.matches);
    apply();
    media.addEventListener('change', apply);
    return () => media.removeEventListener('change', apply);
  }, []);

  useEffect(() => {
    if (isDesktop) {
      setMobileMenuOpen(false);
    }
  }, [isDesktop]);

  useEffect(() => {
    let rafId = 0;
    let ticking = false;

    const updateActiveSection = () => {
      const sections = navLinks
        .map((link) => {
          const el = document.getElementById(link.id);
          if (!el) return null;
          return { id: link.id, top: el.offsetTop };
        })
        .filter((s): s is { id: string; top: number } => s !== null)
        .sort((a, b) => a.top - b.top);

      if (sections.length === 0) return;

      const navOffset = isDesktop ? 110 : 96;
      const probeY = window.scrollY + navOffset + window.innerHeight * 0.2;

      let currentId = sections[0].id;
      for (let i = 0; i < sections.length; i += 1) {
        const current = sections[i];
        const next = sections[i + 1];
        if (probeY >= current.top && (!next || probeY < next.top)) {
          currentId = current.id;
          break;
        }
      }

      setActiveSection((prev) => (prev === currentId ? prev : currentId));
    };

    const onScrollOrResize = () => {
      if (ticking) return;
      ticking = true;
      rafId = window.requestAnimationFrame(() => {
        updateActiveSection();
        ticking = false;
      });
    };

    updateActiveSection();
    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize);

    return () => {
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
      window.cancelAnimationFrame(rafId);
    };
  }, [isDesktop]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      const navOffset = isDesktop ? 96 : 84;
      const y = target.getBoundingClientRect().top + window.scrollY - navOffset;
      window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
    }
  };

  const navStyle: React.CSSProperties = isDesktop
    ? {
        position: 'fixed',
        top: scrolled ? 14 : 0,
        left: '50%',
        transform: `translateX(-50%) ${scrolled ? 'translateY(0)' : 'translateY(-2px)'}`,
        width: scrolled
          ? 'min(940px, calc(100vw - 28px))'
          : 'calc(100vw - clamp(36px, 11vw, 180px))',
        background: scrolled ? palette.surfaceStrong : palette.surfaceSoft,
        backdropFilter: scrolled ? 'blur(20px) saturate(128%)' : 'blur(10px) saturate(112%)',
        border: `1px solid ${scrolled ? palette.borderSoft : 'rgba(148, 163, 184, 0.18)'}`,
        borderRadius: scrolled ? 9999 : 18,
        padding: scrolled ? '11px clamp(20px, 3vw, 34px)' : '15px clamp(22px, 5vw, 56px)',
        boxShadow: scrolled ? '0 8px 26px rgba(2, 6, 23, 0.28)' : 'none',
        transition:
          'top 0.48s cubic-bezier(0.22, 1, 0.36, 1), width 0.48s cubic-bezier(0.22, 1, 0.36, 1), border-radius 0.48s cubic-bezier(0.22, 1, 0.36, 1), padding 0.48s cubic-bezier(0.22, 1, 0.36, 1), background 0.32s ease, border-color 0.32s ease, box-shadow 0.32s ease, transform 0.48s cubic-bezier(0.22, 1, 0.36, 1)',
        zIndex: 999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }
    : {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        background: palette.surfaceStrong,
        border: `1px solid ${palette.borderSoft}`,
        borderRadius: 14,
        padding: '14px clamp(16px, 5vw, 24px)',
        transition: 'background 0.28s ease, border-color 0.28s ease',
        zIndex: 999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      };

  return (
    <>
      <nav style={navStyle}>
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => handleLinkClick(e, '#home')}
          style={{
            fontSize: 20,
            fontWeight: 800,
            color: palette.accent,
            textDecoration: 'none',
            letterSpacing: '0.02em',
          }}
        >
          Om.dev
        </a>

        {/* Links - Desktop */}
        <div
          style={{ alignItems: 'center', gap: scrolled ? 26 : 18 }}
          className="hidden md:flex"
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                style={{
                  fontSize: 14,
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? palette.accent : palette.textMuted,
                  textDecoration: 'none',
                  position: 'relative',
                  border: `1px solid ${isActive ? palette.borderHover : 'transparent'}`,
                  borderRadius: 9999,
                  transition: 'color 0.2s ease, border-color 0.2s ease, background 0.2s ease',
                  padding: '6px 10px',
                  letterSpacing: '0.01em',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = palette.textPrimary;
                    e.currentTarget.style.borderColor = 'rgba(148, 163, 184, 0.35)';
                    e.currentTarget.style.background = 'rgba(148, 163, 184, 0.05)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = palette.textMuted;
                    e.currentTarget.style.borderColor = 'transparent';
                    e.currentTarget.style.background = 'transparent';
                  }
                }}
              >
                {link.label}
                {isActive && (
                  <span
                    style={{
                      position: 'absolute',
                      bottom: -2,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: 4,
                      height: 4,
                      borderRadius: '50%',
                      background: palette.accent,
                    }}
                  />
                )}
              </a>
            );
          })}
        </div>

        {/* Action Button - Desktop */}
        <div className="hidden md:block">
          <a
            href="#contact"
            onClick={(e) => handleLinkClick(e, '#contact')}
            style={{
              background: 'rgba(212, 183, 143, 0.14)',
              color: palette.accent,
              border: `1px solid ${palette.borderHover}`,
              borderRadius: 999,
              padding: '9px 20px',
              fontSize: 13,
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'background 0.2s ease, border-color 0.2s ease, color 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(212, 183, 143, 0.22)';
              e.currentTarget.style.borderColor = palette.accentSoft;
              e.currentTarget.style.color = '#f8fafc';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(212, 183, 143, 0.14)';
              e.currentTarget.style.borderColor = palette.borderHover;
              e.currentTarget.style.color = palette.accent;
            }}
          >
            Hire Me
          </a>
        </div>

        {/* Hamburger - Mobile */}
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="md:hidden"
          style={{
            background: 'none',
            border: 'none',
            color: palette.accent,
            padding: 4,
          }}
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>
      </nav>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            onClick={() => setMobileMenuOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
                background: 'rgba(15, 23, 42, 0.45)',
              zIndex: 1000,
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: 'min(88vw, 360px)',
                height: '100%',
                background: 'rgba(15,23,42,0.97)',
                borderLeft: '1px solid rgba(148,163,184,0.24)',
                boxShadow: '-8px 0 26px rgba(2, 6, 23, 0.2)',
                display: 'flex',
                flexDirection: 'column',
                padding: '20px clamp(16px, 5vw, 28px)',
              }}
            >
              {/* Header row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
                <span
                  style={{
                    fontSize: 'clamp(19px, 4.5vw, 22px)',
                    fontWeight: 800,
                    color: palette.accent,
                  }}
                >
                  Om.dev
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: palette.accent,
                    padding: 4,
                  }}
                  aria-label="Close menu"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Links list */}
              <motion.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={{
                  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.08 } },
                  hidden: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
                }}
                style={{ display: 'flex', flexDirection: 'column', gap: 8 }}
              >
                {navLinks.map((link) => (
                  <motion.a
                    key={link.id}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    variants={{
                      hidden: { opacity: 0, x: 16 },
                      visible: { opacity: 1, x: 0 },
                    }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    style={{
                      fontSize: 'clamp(18px, 6vw, 22px)',
                      fontWeight: 700,
                      color: activeSection === link.id ? palette.accent : '#e2e8f0',
                      textDecoration: 'none',
                      padding: '10px 0',
                      border: `1px solid ${activeSection === link.id ? palette.borderHover : 'rgba(148, 163, 184, 0.16)'}`,
                      borderRadius: 8,
                      paddingLeft: 10,
                      paddingRight: 10,
                    }}
                  >
                    {link.label}
                  </motion.a>
                ))}
              </motion.div>

              <motion.a
                href="#contact"
                onClick={(e) => handleLinkClick(e, '#contact')}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.22, delay: 0.15, ease: 'easeOut' }}
                style={{
                  background: 'rgba(212, 183, 143, 0.14)',
                  color: palette.accent,
                  border: `1px solid ${palette.borderHover}`,
                  borderRadius: 999,
                  padding: '12px 20px',
                  fontSize: 'clamp(14px, 4vw, 16px)',
                  fontWeight: 600,
                  textDecoration: 'none',
                  marginTop: 'auto',
                  marginBottom: 12,
                  textAlign: 'center',
                }}
              >
                Hire Me
              </motion.a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
