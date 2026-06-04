'use client';

import { useState } from 'react';
import { skills } from '@/data/skills';

export default function Skills() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section
      id="skills"
      className="futuristic-section section-reveal"
      style={{
        padding: '100px 0',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <div className="section-shell" style={{ textAlign: 'center' }}>
        {/* Title & Subtitle */}
        <div className="awwards-header-row" style={{ justifyContent: 'center', marginBottom: 18 }}>
          <div className="awwards-index">02</div>
          <div style={{ textAlign: 'left' }}>
            <div className="section-kicker">Capabilities</div>
            <h2 className="section-title">
              My Tech <span className="gradient-text">Stack</span>
            </h2>
            <p className="section-subtitle">
              Technologies and tools I bring to every project
            </p>
          </div>
        </div>
        <div className="futuristic-divider" style={{ margin: '0 auto 40px', maxWidth: 420 }} />

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[14px]">
          {skills.map((skill, idx) => {
            const isHovered = hoveredIdx === idx;
            return (
              <div
                key={skill.name}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="premium-panel light-border-hover depth-card hover-lift-soft"
                style={{
                  borderRadius: 16,
                  padding: '28px 16px',
                  textAlign: 'center',
                  minHeight: 120,
                  position: 'relative',
                  overflow: 'hidden',
                  transform: isHovered ? 'translateY(-5px)' : 'translateY(0)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {/* Top accent line */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 3,
                    background: skill.color,
                    opacity: isHovered ? 1 : 0,
                    transition: 'opacity 0.3s ease',
                  }}
                />

                {/* Icon */}
                <div className="depth-layer" style={{ fontSize: 36, lineHeight: 1 }}>{skill.icon}</div>

                {/* Name */}
                <div
                  className="depth-layer"
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: '#e2e8f0',
                    marginTop: 12,
                  }}
                >
                  {skill.name}
                </div>

                {/* Color dot */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 8,
                    right: 8,
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: skill.color,
                    opacity: 0.4,
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
