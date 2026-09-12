"use client";

import SectionOverlay from "./SectionOverlay";
import FeaturePill from "@/components/ui/FeaturePill";

export default function SectionFuel() {
  return (
    <SectionOverlay progressRange={[0.38, 0.55]} position="center" align="right">
      <div className="px-8 md:px-16 lg:px-24 w-full flex justify-end">
        <div className="max-w-2xl text-right flex flex-col items-end">
          <p className="text-[10px] font-medium tracking-[0.3em] uppercase text-black/30 mb-4">
            02 — FUEL
          </p>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-black leading-[0.9] mb-6">
            FUEL WITH<br />
            <span className="gradient-text">INTENT.</span>
          </h2>
          <p className="text-base md:text-lg font-medium text-black/40 max-w-md ml-auto mb-10">
            Smart nutrition that adapts to your training load, recovery needs, and personal goals.
          </p>
          <div className="flex flex-wrap gap-3 justify-end">
            <FeaturePill label="Macro Tracking" />
            <FeaturePill label="Meal Plans" />
            <FeaturePill label="Hydration" />
          </div>
        </div>
      </div>
    </SectionOverlay>
  );
}
