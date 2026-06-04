'use client';

import { useState } from 'react';
import { Mail, Phone, Linkedin, Github, Send } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorText, setErrorText] = useState('');
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [isButtonPressed, setIsButtonPressed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'loading') return;
    setStatus('loading');
    setErrorText('');

    try {
      const { error } = await supabase.from('contact_messages').insert([formData]);
      if (error) {
        if (error.code === 'PGRST205') {
          setStatus('error');
          setErrorText('Supabase table "contact_messages" is missing. Run the SQL shown below once.');
          setTimeout(() => setStatus('idle'), 7000);
          return;
        }
        throw new Error(error.message || 'Failed to send message');
      }

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err: unknown) {
      setStatus('error');
      setErrorText(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const contactDetails = [
    {
      icon: <Mail size={20} />,
      label: 'Email',
      value: 'omatangrio@gmail.com',
      href: 'mailto:omatangrio@gmail.com',
    },
    {
      icon: <Phone size={20} />,
      label: 'Phone',
      value: '+91 6353826919',
      href: 'tel:+916353826919',
    },
    {
      icon: <Linkedin size={20} />,
      label: 'LinkedIn',
      value: 'patel-om-5b1804298',
      href: 'https://www.linkedin.com/in/patel-om-5b1804298',
    },
    {
      icon: <Github size={20} />,
      label: 'GitHub',
      value: 'ATeam-Learing',
      href: 'https://github.com/ATeam-Learing',
    },
  ];

  return (
    <section
      id="contact"
      className="futuristic-section section-reveal"
      style={{
        padding: '100px 0',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <div className="section-shell">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Left Column: Get in touch & Contact cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            <div>
              <div className="awwards-header-row" style={{ marginBottom: 12 }}>
                <div className="awwards-index">05</div>
                <div>
                  <div className="section-kicker">Contact</div>
                  <h2 className="section-title" style={{ marginTop: 8 }}>
                    Get In <span className="gradient-text">Touch</span>
                  </h2>
                  <p className="section-subtitle" style={{ lineHeight: 1.6 }}>
                    Have a project in mind? I'd love to hear from you.
                  </p>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {contactDetails.map((item, idx) => {
                const isHovered = hoveredCard === idx;
                return (
                  <a
                    key={idx}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => setHoveredCard(idx)}
                    onMouseLeave={() => setHoveredCard(null)}
                    className="premium-panel light-border-hover depth-card hover-lift-soft"
                    style={{
                      borderRadius: 12,
                      padding: '16px 20px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 16,
                      textDecoration: 'none',
                      transition: 'all 0.3s ease',
                      transform: isHovered ? 'translateX(4px)' : 'translateX(0)',
                    }}
                  >
                    {/* Icon wrapper */}
                    <div
                      className="depth-layer"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        background: 'rgba(37,99,235,0.2)',
                        color: '#93c5fd',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {item.icon}
                    </div>

                    <div className="depth-layer">
                      <div
                        style={{
                          fontSize: 11,
                          textTransform: 'uppercase',
                          color: '#94a3b8',
                          fontWeight: 600,
                          letterSpacing: '0.06em',
                        }}
                      >
                        {item.label}
                      </div>
                      <div
                        style={{
                          fontSize: 'clamp(13px, 3.6vw, 14px)',
                          color: '#e2e8f0',
                          fontWeight: 500,
                          wordBreak: 'break-word',
                        }}
                      >
                        {item.value}
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="premium-panel light-border-hover depth-card hover-lift-soft" style={{ borderRadius: 20, padding: 'clamp(18px, 4vw, 28px)' }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {/* Name */}
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label
                  htmlFor="name"
                  style={{
                    fontSize: 13,
                    fontWeight: 500,
                    color: '#94a3b8',
                    marginBottom: 8,
                  }}
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{
                    background: 'rgba(15,23,42,0.45)',
                    border: '1.5px solid rgba(148,163,184,0.3)',
                    borderRadius: 12,
                    height: 52,
                    padding: '0 18px',
                    fontSize: 15,
                    color: '#e2e8f0',
                    outline: 'none',
                    transition: 'all 0.2s ease',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#2563eb';
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(37,99,235,0.08)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
              </div>

              {/* Email */}
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label
                  htmlFor="email"
                  style={{
                    fontSize: 13,
                    fontWeight: 500,
                    color: '#94a3b8',
                    marginBottom: 8,
                  }}
                >
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{
                    background: 'rgba(15,23,42,0.45)',
                    border: '1.5px solid rgba(148,163,184,0.3)',
                    borderRadius: 12,
                    height: 52,
                    padding: '0 18px',
                    fontSize: 15,
                    color: '#e2e8f0',
                    outline: 'none',
                    transition: 'all 0.2s ease',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#2563eb';
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(37,99,235,0.08)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
              </div>

              {/* Message */}
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label
                  htmlFor="message"
                  style={{
                    fontSize: 13,
                    fontWeight: 500,
                    color: '#94a3b8',
                    marginBottom: 8,
                  }}
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  required
                  placeholder="Hello, I'd like to talk about..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  style={{
                    background: 'rgba(15,23,42,0.45)',
                    border: '1.5px solid rgba(148,163,184,0.3)',
                    borderRadius: 12,
                    minHeight: 160,
                    padding: '16px 18px',
                    fontSize: 15,
                    color: '#e2e8f0',
                    outline: 'none',
                    resize: 'none',
                    transition: 'all 0.2s ease',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#2563eb';
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(37,99,235,0.08)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={status === 'loading'}
                style={{
                  width: '100%',
                  height: 56,
                  background: 'linear-gradient(135deg,#2563eb,#1d4ed8)',
                  color: 'white',
                  fontSize: 16,
                  fontWeight: 600,
                  borderRadius: 12,
                  border: 'none',
                  cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  transition: 'transform 0.14s ease, filter 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease',
                  boxShadow: 'var(--shadow-blue)',
                  transform: isButtonPressed ? 'scale(0.985)' : 'scale(1)',
                  filter: status === 'loading' ? 'saturate(0.9) brightness(0.96)' : 'none',
                  opacity: status === 'loading' ? 0.95 : 1,
                }}
                onMouseEnter={(e) => {
                  if (status !== 'loading') {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (status !== 'loading') {
                    e.currentTarget.style.transform = 'translateY(0)';
                  }
                }}
                onMouseDown={() => setIsButtonPressed(true)}
                onMouseUp={() => setIsButtonPressed(false)}
                onTouchStart={() => setIsButtonPressed(true)}
                onTouchEnd={() => setIsButtonPressed(false)}
                aria-busy={status === 'loading'}
              >
                {status === 'loading' ? 'Sending...' : 'Send Message'}
                <Send size={18} />
              </button>

              {/* Success state */}
              {status === 'success' && (
                <div
                  style={{
                    padding: '16px 20px',
                    background: '#10b981',
                    color: 'white',
                    borderRadius: 12,
                    fontWeight: 600,
                    fontSize: 15,
                    textAlign: 'center',
                    boxShadow: '0 4px 12px rgba(16,185,129,0.2)',
                  }}
                >
                  ✓ Message sent! I'll get back to you soon.
                </div>
              )}

              {/* Error state */}
              {status === 'error' && (
                <div
                  style={{
                    padding: '16px 20px',
                    background: '#ef4444',
                    color: 'white',
                    borderRadius: 12,
                    fontWeight: 600,
                    fontSize: 15,
                    textAlign: 'center',
                    boxShadow: '0 4px 12px rgba(239,68,68,0.2)',
                  }}
                >
                  ✗ {errorText || 'Something went wrong. Please try again.'}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
