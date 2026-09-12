"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  {
    title: "Body",
    description: "Composition, weight, measurements — your complete physical profile.",
    svg: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="5" r="3"/>
        <path d="M12 8v8M8 12h8M10 20l2-4 2 4"/>
      </svg>
    )
  },
  {
    title: "Goal",
    description: "Fat loss, muscle gain, performance — your system adapts to your target.",
    svg: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10"/>
        <circle cx="12" cy="12" r="6"/>
        <circle cx="12" cy="12" r="2"/>
      </svg>
    )
  },
  {
    title: "Nutrition",
    description: "Macros, meals, hydration — fuel calculated for your exact needs.",
    svg: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10"/>
        <path d="M12 2c3 3 4.5 7 4.5 10s-1.5 7-4.5 10"/>
        <path d="M2 12h10"/>
      </svg>
    )
  },
  {
    title: "Training",
    description: "Progressive overload, volume management, intelligent deload cycles.",
    svg: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M6 5v14M18 5v14M6 12h12M3 8v8M21 8v8"/>
      </svg>
    )
  },
  {
    title: "Recovery",
    description: "Sleep quality, rest days, stress management — recovery drives growth.",
    svg: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
      </svg>
    )
  },
  {
    title: "Budget",
    description: "Supplement stacks, meal budgets — optimized for what you can invest.",
    svg: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="6" width="20" height="14" rx="2"/>
        <path d="M2 10h20"/>
        <circle cx="18" cy="14" r="1"/>
      </svg>
    )
  }
];

export default function BentoGrid() {
  const gridRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!gridRef.current) return;

    gsap.fromTo(
      cardsRef.current,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 80%",
          once: true
        }
      }
    );
  }, []);

  return (
    <section id="system" className="bg-[#0a0a0a] py-32 px-6 md:px-12">
      <div className="max-w-4xl mx-auto text-center mb-20">
        <p className="text-[10px] font-medium tracking-[0.35em] uppercase text-white/25 mb-4">
          THE SYSTEM
        </p>
        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white mb-6">
          Everything works together.
        </h2>
        <p className="text-lg font-medium text-white/30 max-w-xl mx-auto">
          Your goals, body, activity, nutrition, training and budget all influence the plan.
        </p>
      </div>

      <div 
        ref={gridRef} 
        className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {FEATURES.map((feature, index) => (
          <div
            key={feature.title}
            ref={(el) => {
              if (el) cardsRef.current[index] = el;
            }}
            className="glass-card p-8 md:p-10 hover:border-white/15 transition-all duration-500 hover:translate-y-[-4px]"
          >
            <div className="text-white/60">
              {feature.svg}
            </div>
            <h3 className="text-sm font-bold tracking-[0.15em] uppercase text-white/80 mt-6 mb-2">
              {feature.title}
            </h3>
            <p className="text-sm font-medium text-white/30">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
