export const motionTokens = {
  duration: {
    fast: 0.15,
    base: 0.25,
    slow: 0.4,
  },
  ease: {
    standard: [0.2, 0.8, 0.2, 1],
    out: [0, 0.9, 0.2, 1],
  },
  spring: {
    tight: { type: "spring", stiffness: 300, damping: 24 },
    soft: { type: "spring", stiffness: 120, damping: 20 },
  },
}

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

