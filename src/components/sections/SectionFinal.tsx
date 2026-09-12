"use client";

import SectionOverlay from "./SectionOverlay";
import GlowButton from "@/components/ui/GlowButton";

export default function SectionFinal() {
  return (
    <SectionOverlay progressRange={[0.92, 1.0]} position="center" align="center">
      <div className="max-w-3xl mx-auto px-6 text-center flex flex-col items-center">
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-black leading-[0.9] mb-6">
          ONE SYSTEM.<br />
          <span className="gradient-text">BUILT AROUND YOU.</span>
        </h2>
        
        <GlowButton href="/start" variant="light">
          Start Building
        </GlowButton>
        
        <div className="flex items-center justify-center gap-6 mt-8">
          <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-black/25">Free to Start</span>
          <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-black/10">◆</span>
          <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-black/25">No Credit Card</span>
          <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-black/10">◆</span>
          <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-black/25">Cancel Anytime</span>
        </div>
      </div>
    </SectionOverlay>
  );
}
