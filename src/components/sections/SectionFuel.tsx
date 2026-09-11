"use client";
import SectionOverlay from "./SectionOverlay";

export default function SectionFuel() {
  return (
    <SectionOverlay progressRange={[0.40, 0.55]} position="center" align="right">
      <div className="max-w-xl px-12 md:px-20 ml-auto w-full text-right">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-black/90">
          FUEL WITH INTENT.
        </h2>
      </div>
    </SectionOverlay>
  );
}
