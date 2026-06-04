'use client';

import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const isHoveredRef = useRef(false);
  const isClickedRef = useRef(false);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [visible, setVisible] = useState(false);
  const [isPointerDevice, setIsPointerDevice] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(hover: hover) and (pointer: fine)');
    const apply = () => setIsPointerDevice(media.matches);
    apply();
    media.addEventListener('change', apply);
    return () => media.removeEventListener('change', apply);
  }, []);

  // Sync cursor-none class with visibility state to hide system cursor safely
  useEffect(() => {
    if (visible && isPointerDevice) {
      document.documentElement.classList.add('custom-cursor-active');
    } else {
      document.documentElement.classList.remove('custom-cursor-active');
    }
    return () => {
      document.documentElement.classList.remove('custom-cursor-active');
    };
  }, [visible, isPointerDevice]);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    const fill = fillRef.current;
    if (!dot || !ring || !fill || !isPointerDevice) return;

    let animFrame: number;

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      
      if (!visible) {
        setVisible(true);
      }
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest('a, button, [role="button"], input, textarea');
      if (interactive) {
        isHoveredRef.current = true;
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest('a, button, [role="button"], input, textarea');
      if (interactive) {
        isHoveredRef.current = false;
      }
    };

    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest('a, button, [role="button"], input, textarea');
      if (!interactive) return;

      isClickedRef.current = true;
      if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
      clickTimeoutRef.current = setTimeout(() => {
        isClickedRef.current = false;
      }, 150);
    };

    const onMouseLeave = () => {
      dot.style.opacity = '0';
      ring.style.opacity = '0';
    };

    const onMouseEnter = () => {
      if (visible) {
        dot.style.opacity = '1';
        ring.style.opacity = '1';
      }
    };

    const onTouchStart = () => {
      // If user touches screen, disable custom cursor to restore defaults
      setVisible(false);
    };

    const animate = () => {
      if (visible) {
        // Move dot instantly inside anim frame to avoid rendering stutter
        dot.style.transform = `translate3d(${mousePos.current.x - 4}px, ${mousePos.current.y - 4}px, 0)`;
        dot.style.opacity = '1';
        dot.style.background = isHoveredRef.current ? '#f97316' : '#2563eb';

        // Lerp ring position smoothly
        ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.15;
        ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.15;
        ring.style.transform = `translate3d(${ringPos.current.x - 18}px, ${ringPos.current.y - 18}px, 0)`;
        ring.style.opacity = '1';

        fill.style.background = isHoveredRef.current ? 'rgba(37, 99, 235, 0.08)' : 'transparent';
        fill.style.transform = isClickedRef.current
          ? 'scale(1.8)'
          : isHoveredRef.current
            ? 'scale(1.4)'
            : 'scale(1)';
      } else {
        dot.style.opacity = '0';
        ring.style.opacity = '0';
      }
      
      animFrame = requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);
    document.addEventListener('click', onClick);
    document.addEventListener('touchstart', onTouchStart, { passive: true });
    document.documentElement.addEventListener('mouseleave', onMouseLeave);
    document.documentElement.addEventListener('mouseenter', onMouseEnter);
    
    animFrame = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      document.removeEventListener('click', onClick);
      document.removeEventListener('touchstart', onTouchStart);
      document.documentElement.removeEventListener('mouseleave', onMouseLeave);
      document.documentElement.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(animFrame);
      if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    };
  }, [visible, isPointerDevice]);

  if (!isPointerDevice) return null;

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          background: '#2563eb',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 100000,
          opacity: 0,
          transition: 'background 0.2s ease, opacity 0.2s ease',
          willChange: 'transform',
        }}
      />
      
      {/* Ring */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 36,
          height: 36,
          border: '2px solid rgba(37, 99, 235, 0.5)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99999,
          opacity: 0,
          transition: 'background 0.2s ease, border-color 0.2s ease, opacity 0.2s ease',
          willChange: 'transform',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          ref={fillRef}
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            background: 'transparent',
            transform: 'scale(1)',
            transition: 'transform 0.15s ease-out, background 0.2s ease',
          }}
        />
      </div>
    </>
  );
}
