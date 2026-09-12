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
import MarqueeStrip from "@/components/ui/MarqueeStrip";
import BentoGrid from "@/components/sections/BentoGrid";
import HowItWorks from "@/components/sections/HowItWorks";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/sections/Footer";

const MARQUEE_ITEMS = [
  "PERSONALIZED TRAINING",
  "SMART NUTRITION",
  "AI-DRIVEN ADAPTATION",
  "BODY ANALYTICS",
  "RECOVERY OPTIMIZATION",
  "PROGRESSIVE OVERLOAD",
  "MACRO TRACKING",
  "REAL-TIME INSIGHTS",
];

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

      {/* Marquee Feature Strip — transition from scroll sequence to static content */}
      <MarqueeStrip items={MARQUEE_ITEMS} dark speed={25} />

      {/* Bento Feature Grid — "Everything works together" */}
      <BentoGrid />

      {/* How It Works — 3-step process */}
      <HowItWorks />

      {/* Marquee Strip — light variant for contrast */}
      <MarqueeStrip items={MARQUEE_ITEMS} speed={35} />

      {/* Final Conversion CTA */}
      <FinalCTA />

      {/* Premium Footer */}
      <Footer />
    </SmoothScroll>
  );
}
