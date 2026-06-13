'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface CounterProps {
  value: number;
  label: string;
  suffix?: string;
}

export default function AnimatedCounter({ value, label, suffix = '' }: CounterProps) {
  const countRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !isVisible) {
        setIsVisible(true);
        gsap.to(countRef.current, {
          innerText: value,
          duration: 2.5,
          snap: { innerText: 1 },
          ease: 'power2.out',
          onUpdate() {
            if (countRef.current) {
              (countRef.current as HTMLElement).innerText = Math.ceil(
                parseFloat((countRef.current as any).innerText)
              ).toString();
            }
          },
        });
      }
    }, { threshold: 0.3 });

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, [value, isVisible]);

  return (
    <div style={{ textAlign: 'center' }}>
      <div
        ref={countRef}
        style={{
          fontSize: 'clamp(32px, 6vw, 56px)',
          fontWeight: 800,
          background: 'linear-gradient(135deg, #e2d3b7 0%, #b89a71 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          marginBottom: 8,
        }}
      >
        0
      </div>
      <div
        style={{
          fontSize: 'clamp(13px, 2vw, 16px)',
          color: '#94a3b8',
          fontWeight: 500,
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
        }}
      >
        {label}
      </div>
    </div>
  );
}
