"use client";

import { useEffect } from "react";

/**
 * Attaches an IntersectionObserver to every `.reveal` element currently in
 * the document, and to every `.reveal` element added later. Matches the
 * scroll-reveal behavior in the original HTML: when a `.reveal` element
 * intersects the viewport (threshold 0.1), it gets the `active` class.
 */
export function useReveal() {
  useEffect(() => {
    const revealCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    };

    const revealObserver = new IntersectionObserver(revealCallback, {
      threshold: 0.1,
    });

    const observe = () => {
      document.querySelectorAll(".reveal").forEach((el) => {
        revealObserver.observe(el);
      });
    };

    observe();

    // Watch for new `.reveal` elements that may be added later
    const mo = new MutationObserver(() => observe());
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      revealObserver.disconnect();
      mo.disconnect();
    };
  }, []);
}
