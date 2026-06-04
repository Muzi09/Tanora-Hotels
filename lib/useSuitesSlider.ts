"use client";

import { useEffect } from "react";

/**
 * Wires the west/east buttons in the suites section to scroll the
 * horizontal `.snap-x` rail. Mirrors the original `script` block.
 */
export function useSuitesSlider() {
  useEffect(() => {
    const slider = document.querySelector(".snap-x") as HTMLElement | null;
    const nextBtn = document.querySelector(
      'button[data-icon="east"]'
    ) as HTMLButtonElement | null;
    const prevBtn = document.querySelector(
      'button[data-icon="west"]'
    ) as HTMLButtonElement | null;

    if (!slider || !nextBtn || !prevBtn) return;

    const onNext = () =>
      slider.scrollBy({ left: 350, behavior: "smooth" });
    const onPrev = () =>
      slider.scrollBy({ left: -350, behavior: "smooth" });

    nextBtn.addEventListener("click", onNext);
    prevBtn.addEventListener("click", onPrev);

    return () => {
      nextBtn.removeEventListener("click", onNext);
      prevBtn.removeEventListener("click", onPrev);
    };
  }, []);
}
