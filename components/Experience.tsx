'use client';

import { useState } from 'react';
import { experiences } from '@/data/experience';

export default function Experience() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section
      id="experience"
      className="futuristic-section section-reveal"
      style={{
        padding: '100px 0',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <div className="section-shell" style={{ maxWidth: 860 }}>
        {/* Title */}
        <div style={{ marginBottom: 56 }}>
          <div className="awwards-header-row">
            <div className="awwards-index">04</div>
            <div>
              <div className="section-kicker">Timeline</div>
              <h2 className="section-title">
                Work <span className="gradient-text">Experience</span>
              </h2>
              <div className="futuristic-divider" style={{ margin: '12px 0 0', maxWidth: 320 }} />
            </div>
          </div>
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
              background: 'linear-gradient(to bottom, #7a6a52, #9ca3af, transparent)',
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
                  gap: 'clamp(12px, 3vw, 32px)',
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
                      border: '2px solid #7a6a52',
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
                      background: 'linear-gradient(135deg, #7a6a52, #9a8566)',
                      boxShadow: '0 0 0 4px rgba(201,171,132,0.14), 0 0 16px rgba(15,23,42,0.26)',
                      zIndex: 2,
                    }}
                  />
                </div>

                {/* Right Card */}
                <div
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className="premium-panel light-border-hover depth-card hover-lift-soft"
                  style={{
                    flex: 1,
                    borderRadius: 20,
                    padding: 'clamp(18px, 4vw, 28px) clamp(16px, 4.5vw, 32px)',
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
                      background: 'linear-gradient(90deg, #7a6a52, #9a8566)',
                    }}
                  />

                  {/* Header Row */}
                  <div
                    className="depth-layer"
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
                        fontSize: 'clamp(18px, 4vw, 20px)',
                        fontWeight: 700,
                        color: '#e2e8f0',
                      }}
                    >
                      {exp.role}
                    </h3>
                    <span
                      style={{
                        background: 'rgba(201,171,132,0.16)',
                        color: '#d4b78f',
                        border: '1px solid rgba(201,171,132,0.34)',
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
                    className="depth-layer"
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
                        background: '#7a6a52',
                        borderRadius: '50%',
                      }}
                    />
                    <span
                      style={{
                        color: '#d4b78f',
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
                    className="depth-layer"
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
                            color: '#7a6a52',
                            flexShrink: 0,
                            fontSize: 14,
                          }}
                        >
                          ▹
                        </span>
                        <span
                          style={{
                            color: '#94a3b8',
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
