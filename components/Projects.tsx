'use client';

import { useState } from 'react';
import { Globe, Dumbbell, Utensils, FolderOpen, Github, ExternalLink } from 'lucide-react';
import { projects } from '@/data/projects';

export default function Projects() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

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
      style={{
        background: 'white',
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
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p
            style={{
              color: '#94a3b8',
              fontSize: 'clamp(15px, 2.8vw, 17px)',
              marginTop: 12,
            }}
          >
            A showcase of my recent development work
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => {
            const isHovered = hoveredIdx === idx;
            const isComingSoon = idx === 1 || idx === 2;

            return (
              <div
                key={project.id}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                style={{
                  background: 'white',
                  border: '1px solid var(--border)',
                  borderRadius: 20,
                  overflow: 'hidden',
                  boxShadow: isHovered ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
                  transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {/* TOP AREA */}
                <div
                  style={{
                    height: 200,
                    background: getTopBg(idx),
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
                      fontFamily: '"Plus Jakarta Sans", sans-serif',
                      fontSize: 'clamp(56px, 18vw, 80px)',
                      fontWeight: 900,
                      color: '#0f172a',
                      opacity: 0.06,
                      userSelect: 'none',
                    }}
                  >
                    {getInitials(idx)}
                  </span>
                  {/* Icon */}
                  {renderIcon(idx)}
                </div>

                {/* CARD BODY */}
                <div
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
                    {isComingSoon && (
                      <span
                        style={{
                          background: '#fff7ed',
                          color: '#f97316',
                          border: '1px solid rgba(249,115,22,0.2)',
                          borderRadius: 999,
                          fontSize: 11,
                          padding: '3px 10px',
                          fontWeight: 600,
                        }}
                      >
                        Coming Soon
                      </span>
                    )}
                  </div>

                  {/* Project Name */}
                  <h3
                    style={{
                      fontFamily: '"Plus Jakarta Sans", sans-serif',
                      fontSize: 20,
                      fontWeight: 700,
                      color: '#0f172a',
                      marginTop: 14,
                    }}
                  >
                    {project.name}
                  </h3>

                  {/* Description */}
                  <p
                    style={{
                      fontSize: 14,
                      color: '#475569',
                      lineHeight: 1.75,
                      marginTop: 8,
                      flexGrow: 1,
                    }}
                  >
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 16 }}>
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          background: 'rgba(37,99,235,0.06)',
                          color: '#2563eb',
                          border: '1px solid rgba(37,99,235,0.15)',
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
                      onMouseEnter={(e) => (e.currentTarget.style.color = '#2563eb')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = '#94a3b8')}
                    >
                      Live Demo <ExternalLink size={14} />
                    </a>
                    <a
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
                      onMouseEnter={(e) => (e.currentTarget.style.color = '#2563eb')}
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
