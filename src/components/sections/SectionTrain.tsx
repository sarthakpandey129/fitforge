"use client";

import SectionOverlay from "./SectionOverlay";
import FeaturePill from "@/components/ui/FeaturePill";

export default function SectionTrain() {
  return (
    <SectionOverlay progressRange={[0.58, 0.75]} position="center" align="left">
      <div className="px-8 md:px-16 lg:px-24 w-full">
        <div className="max-w-2xl">
          <p className="text-[10px] font-medium tracking-[0.3em] uppercase text-black/30 mb-4">
            03 — TRAIN
          </p>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-black leading-[0.9] mb-6">
            TRAIN WITH<br />
            <span className="gradient-text">PURPOSE.</span>
          </h2>
          <p className="text-base md:text-lg font-medium text-black/40 max-w-md mb-10">
            Intelligent programming that builds on every rep. Progressive overload, deload cycles, and real-time adjustments.
          </p>
          <div className="flex flex-wrap gap-3">
            <FeaturePill label="Progressive Overload" />
            <FeaturePill label="Recovery Windows" />
            <FeaturePill label="Volume Tracking" />
          </div>
        </div>
      </div>
    </SectionOverlay>
  );
}
