'use client';

import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [isPointerDevice, setIsPointerDevice] = useState(false);
  const isHoveredRef = useRef(false);

  useEffect(() => {
    const media = window.matchMedia('(hover: hover) and (pointer: fine)');
    const apply = () => setIsPointerDevice(media.matches);
    apply();
    media.addEventListener('change', apply);
    return () => media.removeEventListener('change', apply);
  }, []);

  useEffect(() => {
    if (visible && isPointerDevice) {
      document.documentElement.classList.add('custom-cursor-active');
    } else {
      document.documentElement.classList.remove('custom-cursor-active');
    }
    return () => document.documentElement.classList.remove('custom-cursor-active');
  }, [visible, isPointerDevice]);

  useEffect(() => {
    if (!isPointerDevice) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let lastX = 0;
    let lastY = 0;
    let ringX = 0;
    let ringY = 0;

    const onMouseMove = (e: MouseEvent) => {
      lastX = e.clientX;
      lastY = e.clientY;
      setVisible(true);

      dot.style.transform = `translate3d(${e.clientX - 4}px, ${e.clientY - 4}px, 0)`;

      // Lerp ring position for smooth follow
      ringX += (lastX - ringX) * 0.15;
      ringY += (lastY - ringY) * 0.15;
      ring.style.transform = `translate3d(${ringX - 15}px, ${ringY - 15}px, 0)`;
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      isHoveredRef.current = Boolean(target.closest('a, button, [role="button"], input, textarea'));
      updateCursor();
    };

    const onMouseOut = () => {
      isHoveredRef.current = false;
      updateCursor();
    };

    const updateCursor = () => {
      if (isHoveredRef.current) {
        dot.style.opacity = '1';
        dot.style.background = 'rgba(245, 158, 11, 0.9)';
        ring.style.borderColor = 'rgba(245, 158, 11, 0.6)';
        ring.style.opacity = '1';
      } else {
        dot.style.opacity = '1';
        dot.style.background = 'rgba(212, 183, 143, 0.7)';
        ring.style.borderColor = 'rgba(212, 183, 143, 0.4)';
        ring.style.opacity = '0.7';
      }
    };

    const onMouseLeave = () => {
      setVisible(false);
      dot.style.opacity = '0';
      ring.style.opacity = '0';
    };

    const onMouseEnter = () => {
      setVisible(true);
      updateCursor();
    };

    const onTouchStart = () => {
      setVisible(false);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);
    window.addEventListener('mouseout', onMouseOut);
    window.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('mouseenter', onMouseEnter);
    window.addEventListener('touchstart', onTouchStart);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      window.removeEventListener('mouseout', onMouseOut);
      window.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('mouseenter', onMouseEnter);
      window.removeEventListener('touchstart', onTouchStart);
    };
  }, [visible, isPointerDevice]);

  return (
    <>
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          width: '30px',
          height: '30px',
          border: '1.5px solid rgba(212, 183, 143, 0.4)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 10001,
          opacity: 0,
          willChange: 'transform',
        }}
      />
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          width: '8px',
          height: '8px',
          background: 'rgba(212, 183, 143, 0.7)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 10001,
          opacity: 0,
          willChange: 'transform',
        }}
      />
    </>
  );
}
