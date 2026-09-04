"use client";

import SectionOverlay from "./SectionOverlay";
import CTAButton from "../ui/CTAButton";

export default function SectionFinal() {
  return (
    <SectionOverlay progressRange={[0.82, 1.0]} id="start">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-5xl lg:text-7xl font-light tracking-tight leading-[0.95] mb-6">
          One body.
          <br />
          One system.
          <br />
          <span className="text-fg-muted">Built around you.</span>
        </h2>
        <div className="mt-10">
          <CTAButton href="/start">Build Your System</CTAButton>
        </div>
      </div>
    </SectionOverlay>
  );
}
