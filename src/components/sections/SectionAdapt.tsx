"use client";

import SectionOverlay from "./SectionOverlay";

export default function SectionAdapt() {
  return (
    <SectionOverlay progressRange={[0.64, 0.86]}>
      <div className="max-w-3xl mx-auto px-6 text-center">
        <p className="text-[10px] md:text-xs font-medium tracking-[0.3em] uppercase text-fg-muted mb-4">
          Adapt
        </p>
        <h2 className="text-3xl md:text-5xl lg:text-7xl font-light tracking-tight leading-[0.95] mb-6">
          Nothing stays
          <br />
          static.
        </h2>
        <p className="text-base md:text-lg lg:text-xl font-light text-fg-muted leading-relaxed max-w-md mx-auto">
          Your plan evolves as you do.
        </p>
      </div>
    </SectionOverlay>
  );
}
