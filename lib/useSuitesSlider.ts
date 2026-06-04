"use client";

import { useEffect } from "react";

/**
 * Keeps the suites rail moving automatically in an endless horizontal loop.
 */
export function useSuitesSlider() {
  useEffect(() => {
    const slider = document.querySelector(".suite-rail") as HTMLElement | null;

    if (!slider) return;

    const step = 380;
    const intervalId = window.setInterval(() => {
      const maxScrollLeft = slider.scrollWidth - slider.clientWidth;

      if (slider.scrollLeft >= maxScrollLeft - 1) {
        slider.scrollTo({ left: 0, behavior: "smooth" });
        return;
      }

      slider.scrollBy({ left: step, behavior: "smooth" });
    }, 3200);

    return () => window.clearInterval(intervalId);
  }, []);
}
