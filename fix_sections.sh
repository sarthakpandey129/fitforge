#!/bin/bash

# SectionHero
cat << 'INNER_EOF' > src/components/sections/SectionHero.tsx
"use client";
import SectionOverlay from "./SectionOverlay";
export default function SectionHero() {
  return (
    <SectionOverlay progressRange={[0.0, 0.15]} position="center" align="center">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h1 className="text-5xl md:text-7xl font-semibold tracking-tight text-white mb-6">
          FITFORGE Pro
        </h1>
        <p className="text-lg md:text-xl text-white/60 max-w-md mx-auto">
          The most advanced performance tracker ever engineered.
        </p>
      </div>
    </SectionOverlay>
  );
}
INNER_EOF

# SectionMeasure
cat << 'INNER_EOF' > src/components/sections/SectionMeasure.tsx
"use client";
import SectionOverlay from "./SectionOverlay";
export default function SectionMeasure() {
  return (
    <SectionOverlay progressRange={[0.20, 0.35]} position="center" align="left">
      <div className="max-w-xl px-6 md:px-12">
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-4">
          Unprecedented Insight.
        </h2>
        <p className="text-lg text-white/60">
          Every component meticulously designed to capture bio-metrics with zero latency. A revolution from the inside out.
        </p>
      </div>
    </SectionOverlay>
  );
}
INNER_EOF

# SectionFuel
cat << 'INNER_EOF' > src/components/sections/SectionFuel.tsx
"use client";
import SectionOverlay from "./SectionOverlay";
export default function SectionFuel() {
  return (
    <SectionOverlay progressRange={[0.40, 0.55]} position="center" align="right">
      <div className="max-w-xl px-6 md:px-12 ml-auto text-right">
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-4">
          Architectural Marvel.
        </h2>
        <p className="text-lg text-white/60">
          Multi-layered thermal processing and a high-density logic board, suspended perfectly to eliminate interference.
        </p>
      </div>
    </SectionOverlay>
  );
}
INNER_EOF

# SectionTrain
cat << 'INNER_EOF' > src/components/sections/SectionTrain.tsx
"use client";
import SectionOverlay from "./SectionOverlay";
export default function SectionTrain() {
  return (
    <SectionOverlay progressRange={[0.60, 0.75]} position="center" align="left">
      <div className="max-w-xl px-6 md:px-12">
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-4">
          Relentless Power.
        </h2>
        <p className="text-lg text-white/60">
          Quad-core battery cells ensure you never stop. Precision engineered for maximum endurance in extreme conditions.
        </p>
      </div>
    </SectionOverlay>
  );
}
INNER_EOF

# SectionFinal
cat << 'INNER_EOF' > src/components/sections/SectionFinal.tsx
"use client";
import SectionOverlay from "./SectionOverlay";
export default function SectionFinal() {
  return (
    <SectionOverlay progressRange={[0.85, 1.0]} position="center" align="center">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-5xl md:text-6xl font-semibold tracking-tight text-white mb-8">
          The future of fitness.
        </h2>
        <button className="px-8 py-4 bg-white text-black rounded-full font-medium text-lg hover:bg-gray-200 transition-colors">
          Pre-order Now
        </button>
      </div>
    </SectionOverlay>
  );
}
INNER_EOF

chmod +x fix_sections.sh
./fix_sections.sh
