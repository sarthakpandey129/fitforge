"use client";

import Navigation from "@/components/Navigation";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollManager from "@/components/ScrollManager";
import SceneCanvas from "@/components/SceneCanvas";
import SectionHero from "@/components/sections/SectionHero";
import SectionMeasure from "@/components/sections/SectionMeasure";
import SectionFuel from "@/components/sections/SectionFuel";
import SectionTrain from "@/components/sections/SectionTrain";
import SectionAdapt from "@/components/sections/SectionAdapt";
import SectionFinal from "@/components/sections/SectionFinal";

export default function Home() {
  return (
    <SmoothScroll>
      <Navigation />

      <ScrollManager>
        {/* Fixed 3D Canvas — stays behind text overlays */}
        <SceneCanvas />

        {/* Section text overlays — fixed positioned, opacity driven by scroll */}
        <SectionHero />
        <SectionMeasure />
        <SectionFuel />
        <SectionTrain />
        <SectionAdapt />
        <SectionFinal />

        {/*
          Scroll spacer: this creates the scrollable height.
          Each act gets ~100vh of scroll distance = 600vh total.
        */}
        <div className="relative z-0" style={{ height: "600vh" }} />
      </ScrollManager>

      {/* Footer */}
      <footer className="relative z-20 bg-bg border-t border-fg-dim/10 py-12">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-fg-dim">
            FITFORGE
          </span>
          <span className="text-xs text-fg-dim">
            Iteration 1 — The System
          </span>
        </div>
      </footer>
    </SmoothScroll>
  );
}
