"use client";
import SectionOverlay from "./SectionOverlay";

export default function SectionHero() {
  return (
    <SectionOverlay progressRange={[0.0, 0.15]} position="bottom" align="center">
      <div className="max-w-2xl mx-auto px-6 text-center pb-20">
        <h1 className="text-xs font-semibold tracking-[0.3em] text-black/60 uppercase mb-4">
          FITFORGE
        </h1>
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tighter text-black mb-4">
          Your body. Your system.
        </h2>
        <p className="text-base md:text-lg font-medium text-black/50 max-w-sm mx-auto">
          Personalized nutrition, training and recovery built around you.
        </p>
      </div>
    </SectionOverlay>
  );
}
