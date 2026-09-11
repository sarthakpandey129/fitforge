"use client";

import Navigation from "@/components/Navigation";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollManager from "@/components/ScrollManager";
import SequencePlayer from "@/components/SequencePlayer";
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
        {/* Fixed Canvas Image Sequence — stays behind text overlays */}
        <SequencePlayer />

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

      {/* Product Story Section */}
      <section className="relative z-20 bg-white py-32 px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center mb-24">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-black mb-6">
            FITNESS ISN'T ONE NUMBER.
          </h2>
          <p className="text-lg md:text-xl font-medium text-black/50 max-w-2xl mx-auto">
            Your goals, body, activity, nutrition, training and budget all influence the plan.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-px bg-black/5 rounded-[2rem] overflow-hidden border border-black/5">
          {["BODY", "GOAL", "NUTRITION", "TRAINING", "RECOVERY", "BUDGET"].map((item) => (
            <div key={item} className="bg-white p-12 flex items-center justify-center aspect-square hover:bg-black/[0.02] transition-colors">
              <span className="text-sm font-bold tracking-[0.2em] text-black/80">{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-20 bg-white border-t border-black/5 py-12">
        <div className="max-w-5xl mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-black/30">
            FITFORGE
          </span>
          <span className="text-xs font-medium text-black/30">
            Iteration 1 — The System
          </span>
        </div>
      </footer>
    </SmoothScroll>
  );
}
