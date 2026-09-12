"use client";

import SectionOverlay from "./SectionOverlay";
import FeaturePill from "@/components/ui/FeaturePill";

export default function SectionMeasure() {
  return (
    <SectionOverlay progressRange={[0.18, 0.35]} position="center" align="left">
      <div className="px-8 md:px-16 lg:px-24 w-full">
        <div className="max-w-2xl">
          <p className="text-[10px] font-medium tracking-[0.3em] uppercase text-black/30 mb-4">
            01 — MEASURE
          </p>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-black leading-[0.9] mb-6">
            UNDERSTAND<br />
            <span className="gradient-text">YOUR BODY.</span>
          </h2>
          <p className="text-base md:text-lg font-medium text-black/40 max-w-md mb-10">
            Track 40+ biomarkers. See what's changing, understand why, and know exactly where you stand.
          </p>
          <div className="flex flex-wrap gap-3">
            <FeaturePill label="Body Composition" />
            <FeaturePill label="Biomarkers" />
            <FeaturePill label="AI Analysis" />
          </div>
        </div>
      </div>
    </SectionOverlay>
  );
}
