// Adaptive quality helpers for Three.js scenes.
export type QualityTier = "low" | "medium" | "high";

export function detectQuality(): QualityTier {
  if (typeof window === "undefined") return "medium";
  const mem = (navigator as any).deviceMemory as number | undefined;
  const cores = navigator.hardwareConcurrency || 4;
  const isMobile = /Mobi|Android/i.test(navigator.userAgent);
  const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  if (reducedMotion) return "low";
  if (isMobile || (mem && mem <= 4) || cores <= 4) return "low";
  if ((mem && mem <= 8) || cores <= 8) return "medium";
  return "high";
}

export function pixelRatioFor(tier: QualityTier): number {
  const dpr = typeof window !== "undefined" ? window.devicePixelRatio : 1;
  if (tier === "low") return Math.min(dpr, 1);
  if (tier === "medium") return Math.min(dpr, 1.5);
  return Math.min(dpr, 2);
}
