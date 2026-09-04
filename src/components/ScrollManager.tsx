"use client";

import { createContext, useContext, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ── Context to share scroll progress globally ── */

interface ScrollContextValue {
  progress: React.RefObject<number>;
}

const ScrollContext = createContext<ScrollContextValue>({
  progress: { current: 0 },
});

export function useScrollProgress() {
  return useContext(ScrollContext);
}

/* ── The scroll manager pins the 3D canvas and maps scroll to progress ── */

export default function ScrollManager({
  children,
}: {
  children: React.ReactNode;
}) {
  const triggerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<number>(0);

  useEffect(() => {
    const trigger = triggerRef.current;
    if (!trigger) return;

    const st = ScrollTrigger.create({
      trigger,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.5,
      onUpdate: (self) => {
        progressRef.current = self.progress;
      },
    });

    return () => {
      st.kill();
    };
  }, []);

  return (
    <ScrollContext.Provider value={{ progress: progressRef }}>
      {/* 
        This div is the scroll-trigger container.
        Its height (set via className) determines how much scroll
        drives the animation. 600vh = 6 acts × 100vh each.
      */}
      <div ref={triggerRef} className="relative" id="system">
        {children}
      </div>
    </ScrollContext.Provider>
  );
}
