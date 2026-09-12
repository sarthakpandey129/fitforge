"use client";

import GlowButton from "@/components/ui/GlowButton";

export default function FinalCTA() {
  return (
    <section className="bg-[#0a0a0a] py-40 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white leading-[0.9] mb-6">
          Ready to build<br />
          <span className="gradient-text">your system?</span>
        </h2>
        <p className="text-lg font-medium text-white/30 max-w-md mx-auto mb-12">
          Join thousands building smarter fitness systems. Start free, upgrade when you're ready.
        </p>
        
        <GlowButton href="/signup" variant="dark">
          Get Started Free
        </GlowButton>

        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 mt-10">
          <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-white/20">
            ✦ Free Forever Plan
          </span>
          <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-white/20">
            ✦ No Credit Card
          </span>
          <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-white/20">
            ✦ Cancel Anytime
          </span>
        </div>
      </div>
    </section>
  );
}
