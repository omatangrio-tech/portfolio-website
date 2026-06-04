'use client';

import { useState } from 'react';
import { Globe, Dumbbell, Utensils, FolderOpen, Github, ExternalLink } from 'lucide-react';
import { projects } from '@/data/projects';

export default function Projects() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  // Helper to get custom top background gradient based on project ID/index
  const getTopBg = (idx: number) => {
    switch (idx) {
      case 0:
        return 'linear-gradient(135deg, #eff6ff, #f0fdf4)'; // Leansuite
      case 1:
        return 'linear-gradient(135deg, #fff7ed, #fdf4ff)'; // Gym
      case 2:
        return 'linear-gradient(135deg, #f0fdf4, #eff6ff)'; // Tiffin
      default:
        return 'linear-gradient(135deg, #f8fafc, #f1f5f9)';
    }
  };

  // Helper to get project initials
  const getInitials = (idx: number) => {
    switch (idx) {
      case 0:
        return 'LS';
      case 1:
        return 'GYM';
      case 2:
        return 'TD';
      default:
        return 'PRJ';
    }
  };

  // Helper to render matching icon
  const renderIcon = (idx: number) => {
    switch (idx) {
      case 0:
        return <Globe size={52} color="#2563eb" style={{ opacity: 0.7 }} />;
      case 1:
        return <Dumbbell size={52} color="#f97316" style={{ opacity: 0.7 }} />;
      case 2:
        return <Utensils size={52} color="#10b981" style={{ opacity: 0.7 }} />;
      default:
        return <FolderOpen size={52} color="#2563eb" style={{ opacity: 0.7 }} />;
    }
  };

  return (
    <section
      id="projects"
      className="futuristic-section section-reveal"
      style={{
        padding: '100px 0',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <div className="section-shell">
        {/* Title */}
        <div style={{ marginBottom: 56 }}>
          <div className="awwards-header-row">
            <div className="awwards-index">03</div>
            <div>
              <div className="section-kicker">Selected Work</div>
              <h2 className="display-title" style={{ marginTop: 8 }}>
                Featured <span className="gradient-text">Projects</span>
              </h2>
              <p className="section-subtitle">
                A showcase of my recent development work
              </p>
            </div>
          </div>
          <div className="futuristic-divider" style={{ maxWidth: 480 }} />
        </div>

        <article
          className="premium-panel depth-card hover-lift-soft featured-project-strip"
          data-cursor="card"
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
            const y = ((e.clientY - rect.top) / rect.height - 0.5) * 8;
            setParallax({ x, y });
          }}
          onMouseLeave={() => setParallax({ x: 0, y: 0 })}
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div
              className="md:col-span-7 depth-layer"
              style={{ transform: `translate3d(${parallax.x * 0.7}px, ${parallax.y * 0.7}px, 18px)` }}
            >
              <div className="editorial-meta">Featured Case Study</div>
              <h3 className="display-title" style={{ fontSize: 'clamp(34px, 6vw, 62px)', marginTop: 10 }}>
                {projects[0].name}
              </h3>
              <p className="section-subtitle" style={{ marginTop: 10, maxWidth: 560 }}>
                {projects[0].description}
              </p>
              <div style={{ marginTop: 14, display: 'grid', gap: 6 }}>
                <div style={{ fontSize: 13, color: '#cbd5e1' }}>
                  <span style={{ color: '#93c5fd' }}>Role:</span> {projects[0].role}
                </div>
                <div style={{ fontSize: 13, color: '#cbd5e1' }}>
                  <span style={{ color: '#93c5fd' }}>Impact:</span> {projects[0].impact}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 14 }}>
                {projects[0].tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      background: 'rgba(37,99,235,0.16)',
                      color: '#bfdbfe',
                      border: '1px solid rgba(37,99,235,0.35)',
                      borderRadius: 999,
                      padding: '3px 12px',
                      fontSize: 12,
                      fontWeight: 500,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div
              className="md:col-span-5 depth-layer"
              style={{ transform: `translate3d(${parallax.x * -0.9}px, ${parallax.y * -0.9}px, 22px)` }}
            >
              <div
                className="project-preview-frame"
                style={{
                  borderRadius: 18,
                  minHeight: 220,
                  background: 'linear-gradient(135deg, #eff6ff, #f0fdf4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <span style={{ position: 'absolute', fontSize: 76, fontWeight: 900, color: '#0f172a', opacity: 0.12 }}>
                  LS
                </span>
                <Globe size={64} color="#2563eb" style={{ opacity: 0.78 }} />
              </div>
              <div style={{ display: 'flex', gap: 16, marginTop: 14 }}>
                <a
                  data-cursor="link"
                  href={projects[0].liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#93c5fd', fontSize: 13, fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4 }}
                >
                  View Live <ExternalLink size={14} />
                </a>
                <a
                  data-cursor="link"
                  href={projects[0].github}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#94a3b8', fontSize: 13, fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4 }}
                >
                  Source <Github size={14} />
                </a>
              </div>
            </div>
          </div>
        </article>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 depth-scene">
          {projects.slice(1).map((project, idx) => {
            const gridIndex = idx + 1;
            const isHovered = hoveredIdx === idx;
            const statusColor =
              project.status === 'Live'
                ? 'rgba(16,185,129,0.25)'
                : project.status === 'In Progress'
                  ? 'rgba(249,115,22,0.25)'
                  : 'rgba(59,130,246,0.25)';

            return (
              <div
                key={project.id}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="premium-panel light-border-hover depth-card hover-lift-soft"
                data-cursor="card"
                style={{
                  borderRadius: 20,
                  overflow: 'hidden',
                  transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {/* TOP AREA */}
                <div
                  className="project-preview-frame"
                  style={{
                    height: 200,
                    background: getTopBg(gridIndex),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    borderBottom: '1px solid var(--border)',
                  }}
                >
                  {/* Faded Initials Text */}
                  <span
                    style={{
                      position: 'absolute',
                      fontSize: 'clamp(56px, 18vw, 80px)',
                      fontWeight: 900,
                      color: '#0f172a',
                      opacity: 0.16,
                      userSelect: 'none',
                    }}
                  >
                    {getInitials(gridIndex)}
                  </span>
                  {/* Icon */}
                  <div className="depth-layer">{renderIcon(gridIndex)}</div>
                </div>

                {/* CARD BODY */}
                <div
                  className="depth-layer"
                  style={{
                    padding: 24,
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  {/* Top Row: FolderOpen + Badges/Links */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <FolderOpen size={22} color="#2563eb" />
                    <span
                      style={{
                        background: statusColor,
                        color: '#e2e8f0',
                        border: '1px solid rgba(148,163,184,0.35)',
                        borderRadius: 999,
                        fontSize: 11,
                        padding: '3px 10px',
                        fontWeight: 600,
                        letterSpacing: '0.03em',
                        textTransform: 'uppercase',
                      }}
                    >
                      {project.status}
                    </span>
                  </div>

                  {/* Project Name */}
                  <h3
                    style={{
                      fontSize: 20,
                      fontWeight: 700,
                      color: '#e2e8f0',
                      marginTop: 14,
                    }}
                  >
                    {project.name}
                  </h3>

                  {/* Description */}
                  <p
                    style={{
                      fontSize: 14,
                      color: '#94a3b8',
                      lineHeight: 1.75,
                      marginTop: 8,
                    }}
                  >
                    {project.description}
                  </p>
                  <div style={{ marginTop: 12, display: 'grid', gap: 6 }}>
                    <div style={{ fontSize: 12, color: '#cbd5e1', fontWeight: 500 }}>
                      <span style={{ color: '#93c5fd' }}>Role:</span> {project.role}
                    </div>
                    <div style={{ fontSize: 12, color: '#cbd5e1', fontWeight: 500 }}>
                      <span style={{ color: '#93c5fd' }}>Impact:</span> {project.impact}
                    </div>
                    <div style={{ fontSize: 12, color: '#94a3b8', lineHeight: 1.6 }}>{project.highlight}</div>
                  </div>

                  {/* Tags */}
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 16 }}>
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          background: 'rgba(37,99,235,0.16)',
                          color: '#bfdbfe',
                          border: '1px solid rgba(37,99,235,0.35)',
                          borderRadius: 999,
                          padding: '3px 12px',
                          fontSize: 12,
                          fontWeight: 500,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Links Row */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 16,
                      marginTop: 24,
                      borderTop: '1px solid var(--border)',
                      paddingTop: 16,
                    }}
                  >
                    <a
                      data-cursor="link"
                      href={project.liveDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: '#94a3b8',
                        fontSize: 13,
                        fontWeight: 600,
                        textDecoration: 'none',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 4,
                        transition: 'color 0.2s',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = '#93c5fd')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = '#94a3b8')}
                    >
                      Live Demo <ExternalLink size={14} />
                    </a>
                    <a
                      data-cursor="link"
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: '#94a3b8',
                        fontSize: 13,
                        fontWeight: 600,
                        textDecoration: 'none',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 4,
                        transition: 'color 0.2s',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = '#93c5fd')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = '#94a3b8')}
                    >
                      GitHub <Github size={14} />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
