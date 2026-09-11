"use client";
import SectionOverlay from "./SectionOverlay";

export default function SectionFinal() {
  return (
    <SectionOverlay progressRange={[0.85, 1.0]} position="bottom" align="center">
      <div className="max-w-3xl mx-auto px-6 text-center w-full pb-20">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-black/90 mb-4">
          ONE SYSTEM. BUILT AROUND YOU.
        </h2>
      </div>
    </SectionOverlay>
  );
}
