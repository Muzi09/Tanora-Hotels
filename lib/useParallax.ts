"use client";

import { useEffect } from "react";

/**
 * Implements the JS-based parallax fallback. On every scroll, the first
 * `.parallax-bg` element gets a `translateY(scrolled * 0.4)`. Disabled on
 * viewports <= 768px to match the original CSS media query.
 */
export function useParallax() {
  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.pageYOffset;
      const parallax = document.querySelector(
        ".parallax-bg"
      ) as HTMLElement | null;
      if (parallax && window.innerWidth > 768) {
        parallax.style.transform = `translateY(${scrolled * 0.4}px)`;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
}
