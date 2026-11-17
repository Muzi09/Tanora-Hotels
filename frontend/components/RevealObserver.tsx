"use client";

import { useReveal } from "@/lib/useReveal";

/**
 * Mounts the global scroll-reveal IntersectionObserver. Renders nothing.
 * Placed once at the top of the page so all `.reveal` elements
 * (rendered by both server and client components) are observed.
 */
export default function RevealObserver() {
  useReveal();
  return null;
}
