"use client";
import SectionOverlay from "./SectionOverlay";

export default function SectionMeasure() {
  return (
    <SectionOverlay progressRange={[0.20, 0.35]} position="center" align="left">
      <div className="max-w-xl px-12 md:px-20 w-full text-left">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-black/90">
          UNDERSTAND YOUR BODY.
        </h2>
      </div>
    </SectionOverlay>
  );
}
