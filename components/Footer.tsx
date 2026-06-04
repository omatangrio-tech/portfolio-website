'use client';

import { Github, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer
      className="futuristic-section"
      style={{
        background: 'rgba(15,23,42,0.65)',
        borderTop: '1px solid rgba(148,163,184,0.2)',
        padding: '56px 0 34px',
      }}
    >
      <div className="section-shell">
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 24,
            marginBottom: 32,
          }}
        >
          <div>
            <div
              style={{
                fontSize: 20,
                fontWeight: 800,
                color: '#93c5fd',
                letterSpacing: '0.02em',
              }}
            >
              Om.dev
            </div>
            <p style={{ color: '#94a3b8', fontSize: 14, marginTop: 6 }}>
              Building the web, one component at a time.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 16 }}>
            <a
              href="https://github.com/ATeam-Learing"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              style={{ color: '#94a3b8', transition: 'color 0.2s' }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = '#93c5fd')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = '#94a3b8')}
            >
              <Github size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/patel-om-5b1804298"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              style={{ color: '#94a3b8', transition: 'color 0.2s' }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = '#93c5fd')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = '#94a3b8')}
            >
              <Linkedin size={20} />
            </a>
          </div>
        </div>
        <div
          style={{
            borderTop: '1px solid rgba(148,163,184,0.2)',
            paddingTop: 24,
            textAlign: 'center',
          }}
        >
          <p style={{ fontSize: 13, color: '#94a3b8' }}>
            Designed &amp; Built by Patel Om © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
