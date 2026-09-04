"use client";

import SectionOverlay from "./SectionOverlay";

const TRAINING = [
  "Strength",
  "Volume",
  "Frequency",
  "Recovery",
  "Progression",
];

export default function SectionTrain() {
  return (
    <SectionOverlay progressRange={[0.47, 0.69]} id="method">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <p className="text-[10px] md:text-xs font-medium tracking-[0.3em] uppercase text-fg-muted mb-4">
          Train
        </p>
        <h2 className="text-3xl md:text-5xl lg:text-7xl font-light tracking-tight leading-[0.95] mb-12">
          Train with
          <br />
          intent.
        </h2>

        {/* Training parameters — horizontal line */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-10">
          {TRAINING.map((param, i) => (
            <div key={param} className="flex items-center gap-6 md:gap-10">
              <span className="text-[10px] md:text-xs font-medium tracking-[0.25em] uppercase text-fg-muted">
                {param}
              </span>
              {i < TRAINING.length - 1 && (
                <span className="hidden md:block w-8 h-[1px] bg-fg-dim" />
              )}
            </div>
          ))}
        </div>
      </div>
    </SectionOverlay>
  );
}
