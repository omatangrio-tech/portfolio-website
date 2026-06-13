'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useScrollAnimation() {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    gsap.to(ref.current, {
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 80%',
        end: 'top 20%',
        toggleActions: 'play none none reverse',
      },
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out',
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return ref;
}

export function useParallax() {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    gsap.to(ref.current, {
      scrollTrigger: {
        trigger: ref.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
        markers: false,
      },
      y: -100,
      duration: 1,
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return ref;
}
