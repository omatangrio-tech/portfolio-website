'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const navStyle: React.CSSProperties = scrolled
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
        <div style={{ display: 'flex', alignItems: 'center', gap: scrolled ? 36 : 24 }} className="hidden md:flex">
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

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'white',
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
            padding: '24px clamp(24px, 5vw, 64px)',
          }}
        >
          {/* Header row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 64 }}>
            <span
              style={{
                fontFamily: '"Plus Jakarta Sans", sans-serif',
                fontSize: 22,
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32, alignItems: 'center', flex: 1, justifyContent: 'center' }}>
            {navLinks.map((link, idx) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                style={{
                  fontFamily: '"Plus Jakarta Sans", sans-serif',
                  fontSize: 24,
                  fontWeight: 700,
                  color: activeSection === link.id ? '#2563eb' : '#0f172a',
                  textDecoration: 'none',
                  animation: `float 4s ease-in-out ${idx * 0.1}s infinite`,
                }}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, '#contact')}
              style={{
                background: '#2563eb',
                color: 'white',
                borderRadius: 999,
                padding: '12px 36px',
                fontSize: 16,
                fontWeight: 600,
                textDecoration: 'none',
                marginTop: 16,
              }}
            >
              Hire Me
            </a>
          </div>
        </div>
      )}
    </>
  );
}
