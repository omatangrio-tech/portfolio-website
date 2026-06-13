'use client';

import { useEffect, useRef } from 'react';

interface Confetti {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
}

export default function WowEffects() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const confettiPieces: Confetti[] = [];

    const createConfetti = (x: number, y: number, count: number = 50) => {
      for (let i = 0; i < count; i++) {
        confettiPieces.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 8,
          vy: Math.random() * -12 - 5,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.2,
          life: 0,
          maxLife: Math.random() * 0.8 + 0.8,
          size: Math.random() * 8 + 4,
          color: ['#d4b78f', '#c9ab84', '#f59e0b', '#9a8566'][Math.floor(Math.random() * 4)],
        });
      }
    };

    // Create confetti on click
    const handleClick = (e: MouseEvent) => {
      createConfetti(e.clientX, e.clientY, 30);
    };

    // Animated background ripple
    interface Ripple {
      x: number;
      y: number;
      radius: number;
      maxRadius: number;
      opacity: number;
      color: string;
    }
    const ripples: Ripple[] = [];

    const createRipple = (x: number, y: number) => {
      ripples.push({
        x,
        y,
        radius: 0,
        maxRadius: 200,
        opacity: 0.6,
        color: 'rgba(212, 183, 143, 0.4)',
      });
    };

    let animationId: number;
    let clickCount = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw and update confetti
      for (let i = confettiPieces.length - 1; i >= 0; i--) {
        const conf = confettiPieces[i];
        conf.x += conf.vx;
        conf.y += conf.vy;
        conf.vy += 0.3; // gravity
        conf.life += 0.016; // ~60fps
        conf.rotation += conf.rotationSpeed;

        const alpha = Math.max(0, 1 - conf.life / conf.maxLife);
        if (alpha <= 0) {
          confettiPieces.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = conf.color;
        ctx.translate(conf.x, conf.y);
        ctx.rotate(conf.rotation);
        ctx.fillRect(-conf.size / 2, -conf.size / 2, conf.size, conf.size);
        ctx.restore();
      }

      // Draw and update ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const ripple = ripples[i];
        ripple.radius += 3;
        ripple.opacity = 0.6 * (1 - ripple.radius / ripple.maxRadius);

        if (ripple.radius >= ripple.maxRadius) {
          ripples.splice(i, 1);
          continue;
        }

        ctx.strokeStyle = `rgba(212, 183, 143, ${ripple.opacity})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        ctx.stroke();
      }

      animationId = requestAnimationFrame(animate);
    };

    // Add click listener for ripples and confetti
    window.addEventListener('click', (e) => {
      handleClick(e);
      clickCount++;
      if (clickCount > 2) {
        createRipple(e.clientX, e.clientY);
        clickCount = 0;
      }
    });

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    animate();

    return () => {
      window.removeEventListener('click', handleClick);
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
        zIndex: 5000,
      }}
    />
  );
}
