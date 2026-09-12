"use client";

import { useEffect, useRef } from "react";

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
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const scrollY = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? Math.max(0, Math.min(1, scrollY / maxScroll)) : 0;
      
      const [start, end] = progressRange;
      const range = end - start;
      
      let opacity = 0;
      let scale = 0.96;
      let translateY = 20;
      let blur = 6;
      let visibility = "hidden";
      
      if (progress >= start && progress <= end) {
        visibility = "visible";
        
        const fadeZone = range * 0.2; // 20% of range for fade in/out
        if (progress < start + fadeZone) {
          const t = (progress - start) / fadeZone;
          // Cubic ease-in-out
          opacity = t * t * (3 - 2 * t);
          scale = 0.96 + (0.04 * t);
          translateY = 20 * (1 - t);
          blur = 6 * (1 - t);
        } else if (progress > end - fadeZone) {
          const t = (end - progress) / fadeZone;
          opacity = t * t * (3 - 2 * t);
          scale = 0.96 + (0.04 * t);
          translateY = -20 * (1 - t);
          blur = 6 * (1 - t);
        } else {
          opacity = 1;
          scale = 1;
          translateY = 0;
          blur = 0;
        }
      }

      containerRef.current.style.visibility = visibility as any;
      containerRef.current.style.opacity = opacity.toString();
      containerRef.current.style.transform = `scale(${scale}) translateY(${translateY}px)`;
      containerRef.current.style.filter = `blur(${blur}px)`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [progressRange]);

  return (
    <div
      id={id}
      className={`fixed inset-0 pointer-events-none flex flex-col z-10 ${POSITION_CLASSES[position]} ${className}`}
    >
      <div 
        ref={containerRef}
        className={`w-full flex flex-col pointer-events-auto will-change-[opacity,transform,filter] ${ALIGN_CLASSES[align]}`}
        style={{
          visibility: "hidden",
          opacity: 0,
          transform: "scale(0.96) translateY(20px)",
          filter: "blur(6px)"
        }}
      >
        {children}
      </div>
    </div>
  );
}
