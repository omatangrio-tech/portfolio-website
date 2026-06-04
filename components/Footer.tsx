'use client';

import { Github, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer
      style={{
        background: 'white',
        borderTop: '1px solid var(--border)',
        padding: '48px 0 32px',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 clamp(24px, 5vw, 64px)',
        }}
      >
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
                fontFamily: '"Plus Jakarta Sans", sans-serif',
                fontSize: 22,
                fontWeight: 800,
                color: '#2563eb',
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
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = '#2563eb')}
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
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = '#2563eb')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = '#94a3b8')}
            >
              <Linkedin size={20} />
            </a>
          </div>
        </div>
        <div
          style={{
            borderTop: '1px solid var(--border)',
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
