"use client";

import { useEffect, useRef } from "react";

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

interface SectionOverlayProps {
  progressRange: [number, number];
  position?: "top" | "center" | "bottom";
  align?: "left" | "center" | "right";
  children: React.ReactNode;
  className?: string;
  id?: string;
}

const ALIGN_CLASSES = {
  left: "items-start",
  center: "items-center",
  right: "items-end",
};

const POSITION_CLASSES = {
  top: "justify-start pt-32",
  center: "justify-center",
  bottom: "justify-end pb-32",
};

export default function SectionOverlay({
  progressRange,
  position = "center",
  align = "center",
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
    const fadeInEnd = start + (mid - start) * 0.2;
    const fadeOutStart = end - (end - mid) * 0.2;

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
        translateY = (1 - opacity) * 30;
      } else if (progress >= fadeOutStart && progress <= end) {
        translateY = (1 - opacity) * -30;
      }

      let blur = 0;
      if (progress >= start && progress <= fadeInEnd) {
        blur = (1 - opacity) * 8;
      } else if (progress >= fadeOutStart && progress <= end) {
        blur = (1 - opacity) * 8;
      }

      if (opacity <= 0) {
        el.style.display = "none";
      } else {
        el.style.display = "flex";
      }

      el.style.opacity = `${Math.max(0, Math.min(1, opacity))}`;
      el.style.transform = `translateY(${translateY}px)`;
      el.style.filter = `blur(${blur}px)`;
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
      className={`section-overlay fixed inset-0 z-10 w-full flex flex-col ${ALIGN_CLASSES[align]} ${POSITION_CLASSES[position]} ${className}`}
      style={{ opacity: 0, pointerEvents: "none", display: "none" }}
    >
      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
}
