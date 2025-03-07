'use client';

import { useEffect } from 'react';

export function ScrollAnimations() {
  useEffect(() => {
    // Function to check if an element is in viewport
    const isInViewport = (element: Element) => {
      const rect = element.getBoundingClientRect();
      return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
        rect.bottom >= 0
      );
    };

    // Function to handle scroll and reveal elements
    const handleScroll = () => {
      const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
      
      revealElements.forEach((element) => {
        if (isInViewport(element)) {
          element.classList.add('active');
        }
      });
    };

    // Initial check on load
    handleScroll();

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Clean up
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return null; // This component doesn't render anything
} 