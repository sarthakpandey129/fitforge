"use client";

import SectionOverlay from "./SectionOverlay";
import DataLabel from "../ui/DataLabel";

const LEFT_LABELS = ["Age", "Height", "Weight"];
const RIGHT_LABELS = ["Activity", "Goal", "Training"];

export default function SectionMeasure() {
  return (
    <SectionOverlay progressRange={[0.14, 0.36]} position="bottom">
      <div className="w-full max-w-5xl mx-auto px-6">
        <div className="text-center mb-8">
          <p className="text-[10px] md:text-xs font-medium tracking-[0.3em] uppercase text-fg-muted mb-3">
            Measure
          </p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[0.92]">
            Understand
            <br />
            the variables.
          </h2>
        </div>

        {/* Data labels in a single responsive row */}
        <div className="flex items-center justify-center gap-4 md:gap-8 flex-wrap">
          {[...LEFT_LABELS, ...RIGHT_LABELS].map((label, i) => (
            <DataLabel
              key={label}
              label={label}
              align={i < 3 ? "right" : "left"}
            />
          ))}
        </div>
      </div>
    </SectionOverlay>
  );
}
