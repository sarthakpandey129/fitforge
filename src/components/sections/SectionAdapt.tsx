"use client";

import SectionOverlay from "./SectionOverlay";
import FeaturePill from "@/components/ui/FeaturePill";

export default function SectionAdapt() {
  return (
    <SectionOverlay progressRange={[0.78, 0.90]} position="center" align="center">
      <div className="max-w-3xl mx-auto px-6 text-center flex flex-col items-center">
        <p className="text-[10px] font-medium tracking-[0.3em] uppercase text-black/30 mb-4">
          04 — ADAPT
        </p>
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-black leading-[0.9] mb-6">
          <span className="gradient-text">Nothing</span> stays<br />static.
        </h2>
        <p className="text-base md:text-lg font-medium text-black/40 max-w-md mx-auto mb-8">
          Your plan evolves as you do. Every workout, every meal, every night of sleep feeds back into the system.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <FeaturePill label="AI Adaptation" />
          <FeaturePill label="Auto-Deload" />
          <FeaturePill label="Smart Recovery" />
        </div>
      </div>
    </SectionOverlay>
  );
}
