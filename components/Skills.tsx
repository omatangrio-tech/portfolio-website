'use client';

import { useState } from 'react';
import { skills } from '@/data/skills';
import AnimatedSkillBars from './AnimatedSkillBars';

export default function Skills() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const proficiencies = [
    { name: 'React.js & Next.js', level: 95, icon: '⚛️' },
    { name: 'TypeScript', level: 88, icon: '🔷' },
    { name: 'Angular & Ionic', level: 85, icon: '🅰️' },
    { name: 'Tailwind CSS', level: 92, icon: '🎨' },
    { name: 'Firebase & Supabase', level: 82, icon: '🔥' },
    { name: 'UI/UX Design', level: 80, icon: '✨' },
  ];

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
      <div className="section-shell">
        {/* Title & Subtitle */}
        <div className="awwards-header-row" style={{ marginBottom: 56 }}>
          <div className="awwards-index">02</div>
          <div>
            <div className="section-kicker">Capabilities</div>
            <h2 className="display-title" style={{ marginTop: 8 }}>
              My Tech <span style={{ color: '#d4b78f' }}>Stack</span>
            </h2>
            <p className="section-subtitle">
              Technologies and tools I bring to every project
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 56, alignItems: 'start' }}>
          {/* Proficiency Bars */}
          <div
            className="premium-panel light-border-hover"
            style={{
              borderRadius: 20,
              padding: 32,
            }}
          >
            <h3 style={{ fontSize: 18, fontWeight: 700, color: '#e2e8f0', marginBottom: 32 }}>
              Proficiency Levels
            </h3>
            <AnimatedSkillBars skills={proficiencies} />
          </div>

          {/* Tech Stack Grid */}
          <div>
            <div style={{ marginBottom: 24 }}>
              <p style={{ fontSize: 14, color: '#94a3b8', fontWeight: 500, letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 8 }}>
                Tools & Technologies
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-2 gap-[14px]">
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
                      padding: '24px 18px',
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
        </div>
      </div>
    </section>
  );
}
