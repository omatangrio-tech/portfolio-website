'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

interface Testimonial {
  name: string;
  role: string;
  company: string;
  text: string;
  rating: number;
  avatar?: string;
}

const testimonials: Testimonial[] = [
  {
    name: 'Rajesh Kumar',
    role: 'Product Manager',
    company: 'The Leansuite',
    text: 'Patel Om delivered exceptional frontend work with attention to detail and performance optimization. The dashboards he built improved our user engagement by 45%.',
    rating: 5,
  },
  {
    name: 'Priya Sharma',
    role: 'CEO',
    company: 'Fitness Tech Startup',
    text: 'Outstanding developer with great communication skills. He turned our vision into reality with a responsive, beautiful gym management system. Highly recommend!',
    rating: 5,
  },
  {
    name: 'Amit Patel',
    role: 'CTO',
    company: 'TechVentures',
    text: 'Patel Om shows deep understanding of modern web technologies. His code is clean, well-documented, and production-ready. A true professional.',
    rating: 5,
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  const goToPrevious = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  const goToNext = () => setCurrent((prev) => (prev + 1) % testimonials.length);

  return (
    <section
      id="testimonials"
      className="futuristic-section section-reveal"
      style={{
        padding: '100px 0',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <div className="section-shell">
        {/* Title */}
        <div style={{ marginBottom: 56, textAlign: 'center' }}>
          <div className="section-kicker">Testimonials</div>
          <h2 className="display-title" style={{ marginTop: 8 }}>
            What <span style={{ color: '#d4b78f' }}>Clients Say</span>
          </h2>
          <p className="section-subtitle" style={{ maxWidth: 560, margin: '16px auto 0' }}>
            Trusted by teams and individuals who value quality frontend development
          </p>
        </div>

        {/* Carousel */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 24,
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <button
            onClick={goToPrevious}
            style={{
              background: 'rgba(201, 171, 132, 0.14)',
              border: '1px solid rgba(201, 171, 132, 0.34)',
              borderRadius: 999,
              width: 44,
              height: 44,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#d4b78f',
              transition: 'all 0.3s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(201, 171, 132, 0.24)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(201, 171, 132, 0.14)';
            }}
          >
            <ChevronLeft size={20} />
          </button>

          <div
            className="premium-panel light-border-hover"
            style={{
              borderRadius: 20,
              padding: 36,
              maxWidth: 600,
              minHeight: 320,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
                {Array(testimonials[current].rating)
                  .fill(0)
                  .map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      style={{ fill: '#f59e0b', color: '#f59e0b' }}
                    />
                  ))}
              </div>
              <p
                style={{
                  fontSize: 16,
                  color: '#cbd5e1',
                  lineHeight: 1.8,
                  fontStyle: 'italic',
                }}
              >
                "{testimonials[current].text}"
              </p>
            </div>

            <div style={{ marginTop: 24, borderTop: '1px solid rgba(148, 163, 184, 0.18)', paddingTop: 24 }}>
              <p style={{ fontSize: 15, fontWeight: 600, color: '#e2e8f0' }}>
                {testimonials[current].name}
              </p>
              <p style={{ fontSize: 13, color: '#94a3b8', marginTop: 4 }}>
                {testimonials[current].role} at {testimonials[current].company}
              </p>
            </div>
          </div>

          <button
            onClick={goToNext}
            style={{
              background: 'rgba(201, 171, 132, 0.14)',
              border: '1px solid rgba(201, 171, 132, 0.34)',
              borderRadius: 999,
              width: 44,
              height: 44,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#d4b78f',
              transition: 'all 0.3s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(201, 171, 132, 0.24)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(201, 171, 132, 0.14)';
            }}
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Indicators */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 8,
            marginTop: 32,
          }}
        >
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              style={{
                width: current === idx ? 24 : 8,
                height: 8,
                background: current === idx ? '#d4b78f' : 'rgba(148, 163, 184, 0.3)',
                border: 'none',
                borderRadius: 999,
                cursor: 'pointer',
                transition: 'all 0.3s',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
