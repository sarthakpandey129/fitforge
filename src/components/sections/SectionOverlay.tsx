"use client";

import { useEffect, useRef } from "react";

interface SectionOverlayProps {
  /** Scroll progress range [start, end] where this section is visible */
  progressRange: [number, number];
  /** Text placement — "center" or "bottom" */
  position?: "center" | "bottom";
  children: React.ReactNode;
  className?: string;
  id?: string;
}

const POSITION_CLASSES = {
  center: "items-center justify-center",
  bottom: "items-end justify-center pb-16 md:pb-24 lg:pb-28",
} as const;

/**
 * A pinned overlay that fades in/out based on scroll progress.
 * Includes a gradient backdrop when position="bottom" for text readability.
 */
export default function SectionOverlay({
  progressRange,
  position = "bottom",
  children,
  className = "",
  id,
}: SectionOverlayProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const [start, end] = progressRange;
    const mid = (start + end) / 2;
    const fadeInEnd = start + (mid - start) * 0.35;
    const fadeOutStart = end - (end - mid) * 0.35;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;

      let opacity = 0;
      if (progress >= start && progress <= fadeInEnd) {
        opacity = (progress - start) / (fadeInEnd - start);
      } else if (progress > fadeInEnd && progress < fadeOutStart) {
        opacity = 1;
      } else if (progress >= fadeOutStart && progress <= end) {
        opacity = 1 - (progress - fadeOutStart) / (end - fadeOutStart);
      }

      let translateY = 0;
      if (progress < fadeInEnd && progress >= start) {
        translateY = (1 - opacity) * 25;
      } else if (progress >= fadeOutStart && progress <= end) {
        translateY = (1 - opacity) * -15;
      }

      el.style.opacity = `${Math.max(0, Math.min(1, opacity))}`;
      el.style.transform = `translateY(${translateY}px)`;
      el.style.pointerEvents = opacity > 0.5 ? "auto" : "none";
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [progressRange]);

  return (
    <div
      ref={ref}
      id={id}
      className={`section-overlay fixed inset-0 z-10 flex ${POSITION_CLASSES[position]} ${className}`}
      style={{ opacity: 0, pointerEvents: "none" }}
    >
      {/* Gradient backdrop for bottom-positioned text */}
      {position === "bottom" && (
        <div className="absolute bottom-0 left-0 right-0 h-[45vh] bg-gradient-to-t from-bg via-bg/50 to-transparent pointer-events-none" />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
