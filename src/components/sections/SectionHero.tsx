"use client";

import SectionOverlay from "./SectionOverlay";
import ScrollIndicator from "@/components/ui/ScrollIndicator";
import GlowButton from "@/components/ui/GlowButton";

export default function SectionHero() {
  return (
    <>
      <SectionOverlay progressRange={[0.0, 0.15]} position="bottom" align="center">
        <div className="max-w-3xl px-6 text-center pb-24 mx-auto flex flex-col items-center">
          <p className="text-[10px] md:text-xs font-semibold tracking-[0.35em] text-black/40 uppercase mb-6">
            THE SYSTEM
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-black leading-[0.9] mb-6">
            Your body.<br />
            <span className="gradient-text">Your system.</span>
          </h1>
          <p className="text-base md:text-lg font-medium text-black/40 max-w-md mx-auto mb-10">
            Personalized nutrition, training and recovery — built around you.
          </p>
          <GlowButton href="/start" variant="light">
            Begin Your System
          </GlowButton>
        </div>
      </SectionOverlay>
      <ScrollIndicator />
    </>
  );
}
