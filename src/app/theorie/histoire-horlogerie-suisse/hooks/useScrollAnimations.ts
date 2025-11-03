// hooks/useScrollAnimations.ts
'use client';

import { useEffect } from 'react';

export function useScrollAnimations() {
  useEffect(() => {
    // Navigation scroll effect
    const nav = document.querySelector('.nav-header');
    const handleScroll = () => {
      if (window.scrollY > 50 && nav) {
        nav.classList.add('scrolled');
      } else if (nav) {
        nav.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Parallax effect
    const heroBackground = document.querySelector('.hero-background');
    const handleParallax = () => {
      if (heroBackground) {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        (heroBackground as HTMLElement).style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
      }
    };

    window.addEventListener('scroll', handleParallax);

    // Fade-in animations avec Intersection Observer
    const fadeElements = document.querySelectorAll(
      '.timeline-card, .region-card, .manufacture-card'
    );

    const observerOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    fadeElements.forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', handleParallax);
      fadeElements.forEach((el) => observer.unobserve(el));
    };
  }, []);
}
