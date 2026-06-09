'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!show) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      style={{
        position: 'fixed',
        bottom: 20,
        right: 16,
        width: 44,
        height: 44,
        background: '#7a6a52',
        color: 'white',
        borderRadius: '50%',
        border: '1px solid rgba(201,171,132,0.45)',
        boxShadow: '0 4px 14px rgba(15,23,42,0.26)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        transition: 'all 0.3s ease',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.background = '#9a8566';
        (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.background = '#7a6a52';
        (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
      }}
    >
      <ArrowUp size={20} />
    </button>
  );
}
