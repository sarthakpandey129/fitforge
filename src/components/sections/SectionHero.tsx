"use client";

import SectionOverlay from "./SectionOverlay";

export default function SectionHero() {
  return (
    <SectionOverlay progressRange={[0, 0.18]} position="bottom">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <p className="text-[10px] md:text-xs font-medium tracking-[0.3em] uppercase text-fg-muted mb-4 md:mb-6">
          Introducing FITFORGE
        </p>
        <h1 className="text-4xl md:text-6xl lg:text-[5.5rem] font-light tracking-tight leading-[0.92] mb-5">
          Your body is
          <br />a system.
        </h1>
        <p className="text-sm md:text-base lg:text-lg font-light text-fg-muted leading-relaxed max-w-md mx-auto">
          FITFORGE turns your body, training, nutrition and progress into one
          intelligent system.
        </p>
        <div className="mt-8 flex items-center justify-center gap-2 text-fg-dim">
          <span className="text-[10px] tracking-[0.2em] uppercase">
            Scroll to explore
          </span>
          <svg
            width="10"
            height="14"
            viewBox="0 0 12 16"
            fill="none"
            className="animate-bounce"
          >
            <path
              d="M6 0v12m0 0l4.5-4.5M6 12L1.5 7.5"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </SectionOverlay>
  );
}
