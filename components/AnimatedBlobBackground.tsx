'use client';

import { useEffect, useRef } from 'react';

interface Blob {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
}

export default function AnimatedBlobBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Reduced particle count for better performance
    const blobs: Blob[] = [];
    const blobCount = 20; // Reduced from 50

    for (let i = 0; i < blobCount; i++) {
      blobs.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.2, // Slower movement
        vy: (Math.random() - 0.5) * 0.2,
        radius: Math.random() * 50 + 20,
        opacity: Math.random() * 0.3 + 0.05,
      });
    }

    let animationId: number;
    let frameCount = 0;

    const animate = () => {
      // Clear canvas - optimize by only clearing once per frame
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw blobs with optimized rendering
      blobs.forEach((blob) => {
        blob.x += blob.vx;
        blob.y += blob.vy;

        // Wrap around edges
        if (blob.x < 0) blob.x = canvas.width;
        if (blob.x > canvas.width) blob.x = 0;
        if (blob.y < 0) blob.y = canvas.height;
        if (blob.y > canvas.height) blob.y = 0;

        // Draw gradient blob - simplified for performance
        const gradient = ctx.createRadialGradient(
          blob.x, blob.y, 0,
          blob.x, blob.y, blob.radius * 1.5
        );

        gradient.addColorStop(0, `rgba(212, 183, 143, ${blob.opacity})`);
        gradient.addColorStop(0.7, `rgba(212, 183, 143, ${blob.opacity * 0.4})`);
        gradient.addColorStop(1, `rgba(212, 183, 143, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(blob.x, blob.y, blob.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      frameCount++;
      animationId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 1,
        opacity: 0.5, // Reduced opacity
      }}
    />
  );
}
