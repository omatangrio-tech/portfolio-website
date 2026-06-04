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
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    navLinks.forEach((link) => {
      const el = document.getElementById(link.id);
      if (el) observer.observe(el);
    });

    return () => {
      navLinks.forEach((link) => {
        const el = document.getElementById(link.id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navStyle: React.CSSProperties = isDesktop
    ? scrolled
      ? {
          position: 'fixed',
          top: 16,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'min(880px, 92vw)',
          background: 'rgba(255, 255, 255, 0.92)',
          backdropFilter: 'blur(20px) saturate(180%)',
          border: '1px solid rgba(37, 99, 235, 0.15)',
          borderRadius: 9999,
          padding: '12px 32px',
          boxShadow: '0 4px 24px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(255, 255, 255, 0.5)',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          zIndex: 999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }
      : {
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          background: 'white',
          borderBottom: '1px solid var(--border)',
          padding: '16px clamp(24px, 5vw, 64px)',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
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
        background: 'white',
        borderBottom: '1px solid var(--border)',
        padding: '14px clamp(16px, 5vw, 24px)',
        transition: 'all 0.3s ease',
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
            fontFamily: '"Plus Jakarta Sans", sans-serif',
            fontSize: 22,
            fontWeight: 800,
            color: '#2563eb',
            textDecoration: 'none',
          }}
        >
          Om.dev
        </a>

        {/* Links - Desktop */}
        <div
          style={{ alignItems: 'center', gap: scrolled ? 28 : 20 }}
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
                  fontFamily: '"DM Sans", sans-serif',
                  fontSize: 14,
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? '#2563eb' : '#475569',
                  textDecoration: 'none',
                  position: 'relative',
                  transition: 'color 0.2s',
                  padding: '4px 0',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.color = '#2563eb';
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.color = '#475569';
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
                      background: '#2563eb',
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
              background: '#2563eb',
              color: 'white',
              borderRadius: 999,
              padding: '9px 24px',
              fontSize: 13,
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#1d4ed8')}
            onMouseLeave={(e) => (e.currentTarget.style.background = '#2563eb')}
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
            color: '#2563eb',
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
              background: 'rgba(15, 23, 42, 0.4)',
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
                background: 'white',
                borderLeft: '1px solid var(--border)',
                boxShadow: '-12px 0 36px rgba(2, 6, 23, 0.15)',
                display: 'flex',
                flexDirection: 'column',
                padding: '20px clamp(16px, 5vw, 28px)',
              }}
            >
              {/* Header row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
                <span
                  style={{
                    fontFamily: '"Plus Jakarta Sans", sans-serif',
                    fontSize: 'clamp(19px, 4.5vw, 22px)',
                    fontWeight: 800,
                    color: '#2563eb',
                  }}
                >
                  Om.dev
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#2563eb',
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
                      fontFamily: '"Plus Jakarta Sans", sans-serif',
                      fontSize: 'clamp(18px, 6vw, 22px)',
                      fontWeight: 700,
                      color: activeSection === link.id ? '#2563eb' : '#0f172a',
                      textDecoration: 'none',
                      padding: '10px 0',
                      borderBottom: '1px solid rgba(15, 23, 42, 0.06)',
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
                  background: '#2563eb',
                  color: 'white',
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
