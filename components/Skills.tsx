'use client';

import { useState } from 'react';
import { skills } from '@/data/skills';

export default function Skills() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section
      id="skills"
      style={{
        background: '#f8fafc',
        padding: '100px 0',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 clamp(24px, 5vw, 64px)',
          textAlign: 'center',
        }}
      >
        {/* Title & Subtitle */}
        <h2
          style={{
            fontSize: 'clamp(36px, 5vw, 52px)',
            fontWeight: 800,
            color: '#0f172a',
            lineHeight: 1.1,
          }}
        >
          My Tech <span className="gradient-text">Stack</span>
        </h2>
        <p
          style={{
            color: '#94a3b8',
            fontSize: 'clamp(15px, 2.8vw, 17px)',
            marginTop: 12,
            marginBottom: 56,
          }}
        >
          Technologies and tools I bring to every project
        </p>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[14px]">
          {skills.map((skill, idx) => {
            const isHovered = hoveredIdx === idx;
            return (
              <div
                key={skill.name}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                style={{
                  background: 'white',
                  border: '1px solid',
                  borderColor: isHovered ? `${skill.color}4d` : 'var(--border)', // 0.3 opacity hex suffix is 4d
                  borderRadius: 16,
                  padding: '28px 16px',
                  textAlign: 'center',
                  minHeight: 120,
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: isHovered ? 'var(--shadow-md)' : 'var(--shadow-sm)',
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
                <div style={{ fontSize: 36, lineHeight: 1 }}>{skill.icon}</div>

                {/* Name */}
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: '#0f172a',
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
