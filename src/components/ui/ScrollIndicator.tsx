"use client";
import { useEffect, useState } from "react";

export default function ScrollIndicator() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`
        fixed bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2
        transition-opacity duration-500 pointer-events-none
        ${isVisible ? "opacity-100" : "opacity-0"}
      `}
    >
      <span className="text-[10px] font-medium tracking-[0.3em] uppercase text-black/40">
        Scroll to explore
      </span>
      <svg
        className="w-4 h-4 text-black/30 animate-[bounce-subtle_2s_infinite]"
        style={{ animationName: "bounce-subtle", animationDuration: "2s", animationIterationCount: "infinite" }}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    </div>
  );
}
