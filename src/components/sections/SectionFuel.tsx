"use client";

import SectionOverlay from "./SectionOverlay";

const NUTRIENTS = [
  { label: "Calories", value: "2,847", unit: "kcal" },
  { label: "Protein", value: "187", unit: "g" },
  { label: "Carbs", value: "312", unit: "g" },
  { label: "Fats", value: "89", unit: "g" },
  { label: "Micro", value: "100", unit: "%" },
];

export default function SectionFuel() {
  return (
    <SectionOverlay progressRange={[0.30, 0.52]} position="bottom">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <p className="text-[10px] md:text-xs font-medium tracking-[0.3em] uppercase text-fg-muted mb-3">
          Fuel
        </p>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[0.92] mb-8">
          Fuel with
          <br />
          precision.
        </h2>

        <div className="flex flex-wrap justify-center gap-6 md:gap-10">
          {NUTRIENTS.map((n) => (
            <div key={n.label} className="flex flex-col items-center gap-0.5">
              <span className="text-xl md:text-3xl font-light tracking-tight text-fg">
                {n.value}
              </span>
              <span className="text-[9px] md:text-[10px] font-medium tracking-[0.2em] uppercase text-fg-dim">
                {n.unit}
              </span>
              <span className="text-[9px] font-medium tracking-[0.25em] uppercase text-fg-muted mt-0.5">
                {n.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </SectionOverlay>
  );
}
