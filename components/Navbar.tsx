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
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
        background: scrolled
          ? 'rgba(2, 6, 23, 0.8)'
          : 'linear-gradient(180deg, rgba(2, 6, 23, 0.5) 0%, transparent 100%)',
        borderBottom: scrolled ? '1px solid rgba(212, 183, 143, 0.1)' : 'none',
        transition: 'all 0.3s ease',
      }}
    >
      <div
        style={{
          maxWidth: '1240px',
          margin: '0 auto',
          padding: scrolled ? '12px 64px' : '20px 64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          transition: 'padding 0.3s ease',
        }}
      >
        {/* Logo */}
        <a
          href="#home"
          style={{
            fontSize: '22px',
            fontWeight: 800,
            color: '#e2e8f0',
            textDecoration: 'none',
            letterSpacing: '-0.02em',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <span
            style={{
              width: 10,
              height: 10,
              background: 'linear-gradient(135deg, #d4b78f, #f59e0b)',
              borderRadius: '50%',
            }}
          />
          Om.dev
        </a>

        {/* Desktop Menu */}
        <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '32px' }}>
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById(link.id);
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                  setActiveSection(link.id);
                }}
                style={{
                  color: activeSection === link.id ? '#d4b78f' : '#cbd5e1',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: activeSection === link.id ? 600 : 500,
                  transition: 'color 0.3s ease',
                  cursor: 'pointer',
                  borderBottom: activeSection === link.id ? '2px solid #d4b78f' : '2px solid transparent',
                  paddingBottom: '4px',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = '#d4b78f';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color =
                    activeSection === link.id ? '#d4b78f' : '#cbd5e1';
                }}
              >
                {link.label}
              </a>
            ))}
          </div>

          <a
            href="#contact"
            style={{
              padding: '10px 24px',
              background: 'linear-gradient(135deg, #d4b78f 0%, #c9ab84 100%)',
              color: '#0f172a',
              borderRadius: '6px',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 20px rgba(212, 183, 143, 0.4)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              (e.currentTarget as HTMLElement).style.boxShadow = 'none';
            }}
          >
            Let's Talk
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            color: '#d4b78f',
            cursor: 'pointer',
            fontSize: '24px',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.opacity = '0.7';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.opacity = '1';
          }}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            background: 'rgba(2, 6, 23, 0.95)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            padding: '20px 64px',
            borderTop: '1px solid rgba(212, 183, 143, 0.1)',
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById(link.id);
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                setActiveSection(link.id);
                setMobileMenuOpen(false);
              }}
              style={{
                color: activeSection === link.id ? '#d4b78f' : '#cbd5e1',
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: 500,
                padding: '8px 0',
                transition: 'color 0.3s ease',
                cursor: 'pointer',
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
