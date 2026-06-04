'use client';

import { useState } from 'react';
import { experiences } from '@/data/experience';

export default function Experience() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section
      id="experience"
      style={{
        background: '#f8fafc',
        padding: '100px 0',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <div
        style={{
          maxWidth: 800,
          margin: '0 auto',
          padding: '0 clamp(24px, 5vw, 64px)',
        }}
      >
        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <h2
            style={{
              fontSize: 'clamp(36px, 5vw, 52px)',
              fontWeight: 800,
              color: '#0f172a',
              lineHeight: 1.1,
            }}
          >
            Work <span className="gradient-text">Experience</span>
          </h2>
          <div
            style={{
              width: 56,
              height: 3,
              background: 'linear-gradient(90deg, #2563eb, #f97316)',
              margin: '12px auto 0',
            }}
          />
        </div>

        {/* Timeline Container */}
        <div style={{ position: 'relative' }}>
          {/* Vertical line */}
          <div
            style={{
              position: 'absolute',
              left: 20,
              top: 0,
              bottom: 0,
              width: 2,
              background: 'linear-gradient(to bottom, #2563eb, #f97316, transparent)',
            }}
          />

          {/* Timeline Items */}
          {experiences.map((exp, idx) => {
            const isHovered = hoveredIdx === idx;

            return (
              <div
                key={exp.id}
                style={{
                  display: 'flex',
                  gap: 32,
                  marginBottom: 48,
                  position: 'relative',
                  alignItems: 'flex-start',
                }}
              >
                {/* Dot Column */}
                <div
                  style={{
                    width: 40,
                    flexShrink: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    paddingTop: 6,
                    position: 'relative',
                  }}
                >
                  {/* Ping Ring */}
                  <div
                    style={{
                      position: 'absolute',
                      width: 18,
                      height: 18,
                      border: '2px solid #2563eb',
                      borderRadius: '50%',
                      animation: 'ping 2s infinite',
                      pointerEvents: 'none',
                    }}
                  />
                  {/* Actual Dot */}
                  <div
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #2563eb, #f97316)',
                      boxShadow: '0 0 0 4px rgba(37,99,235,0.12), 0 0 20px rgba(37,99,235,0.25)',
                      zIndex: 2,
                    }}
                  />
                </div>

                {/* Right Card */}
                <div
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  style={{
                    flex: 1,
                    background: 'white',
                    border: '1px solid var(--border)',
                    borderRadius: 20,
                    padding: '28px 32px',
                    boxShadow: isHovered ? 'var(--shadow-md)' : 'var(--shadow-sm)',
                    borderColor: isHovered ? 'var(--blue-border)' : 'var(--border)',
                    transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {/* Top Accent line */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 3,
                      borderRadius: '3px 3px 0 0',
                      background: 'linear-gradient(90deg, #2563eb, #f97316)',
                    }}
                  />

                  {/* Header Row */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: 12,
                    }}
                  >
                    <h3
                      style={{
                        fontSize: 20,
                        fontWeight: 700,
                        fontFamily: '"Plus Jakarta Sans", sans-serif',
                        color: '#0f172a',
                      }}
                    >
                      {exp.role}
                    </h3>
                    <span
                      style={{
                        background: '#eff6ff',
                        color: '#2563eb',
                        border: '1px solid rgba(37,99,235,0.2)',
                        borderRadius: 999,
                        padding: '5px 16px',
                        fontSize: 12,
                        fontWeight: 500,
                      }}
                    >
                      {exp.duration}
                    </span>
                  </div>

                  {/* Company Row */}
                  <div
                    style={{
                      marginTop: 6,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                    }}
                  >
                    <span
                      style={{
                        width: 6,
                        height: 6,
                        background: '#2563eb',
                        borderRadius: '50%',
                      }}
                    />
                    <span
                      style={{
                        color: '#2563eb',
                        fontSize: 15,
                        fontWeight: 600,
                      }}
                    >
                      {exp.company}
                    </span>
                  </div>

                  {/* Divider */}
                  <div
                    style={{
                      margin: '16px 0',
                      height: 1,
                      background: 'var(--border)',
                    }}
                  />

                  {/* Bullets */}
                  <ul
                    style={{
                      listStyle: 'none',
                      padding: 0,
                      margin: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 10,
                    }}
                  >
                    {exp.points.map((pt, pIdx) => (
                      <li
                        key={pIdx}
                        style={{
                          display: 'flex',
                          gap: 10,
                          alignItems: 'flex-start',
                        }}
                      >
                        <span
                          style={{
                            color: '#2563eb',
                            flexShrink: 0,
                            fontSize: 14,
                          }}
                        >
                          ▹
                        </span>
                        <span
                          style={{
                            color: '#475569',
                            fontSize: 14,
                            lineHeight: 1.8,
                          }}
                        >
                          {pt}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
