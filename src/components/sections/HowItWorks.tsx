"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    num: "01",
    title: "Tell us about you",
    description: "Your body stats, goals, dietary preferences, training history, and budget."
  },
  {
    num: "02",
    title: "Get your system",
    description: "AI builds your personalized nutrition, training, and recovery plan."
  },
  {
    num: "03",
    title: "Evolve together",
    description: "Track progress, log workouts, and watch your system adapt in real-time."
  }
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.fromTo(
      stepsRef.current,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true
        }
      }
    );
  }, []);

  return (
    <section id="method" className="bg-white py-32 px-6 md:px-12" ref={sectionRef}>
      <div className="text-center mb-20">
        <p className="text-[10px] font-medium tracking-[0.35em] uppercase text-black/25 mb-4">
          HOW IT WORKS
        </p>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-black">
          Three steps. One system.
        </h2>
      </div>

      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start gap-8 md:gap-4">
        {STEPS.map((step, index) => (
          <div key={step.num} className="flex flex-col md:flex-row flex-1 items-start w-full">
            <div 
              ref={(el) => {
                if (el) stepsRef.current[index] = el;
              }}
              className="flex-1 text-center w-full"
            >
              <div className="w-12 h-12 rounded-full border-2 border-black/10 flex items-center justify-center mx-auto mb-6">
                <span className="text-sm font-bold text-black/60">{step.num}</span>
              </div>
              <h3 className="text-lg font-bold tracking-tight text-black mb-3">
                {step.title}
              </h3>
              <p className="text-sm font-medium text-black/40 max-w-xs mx-auto">
                {step.description}
              </p>
            </div>
            
            {/* Connecting line (hidden on last step) */}
            {index < STEPS.length - 1 && (
              <div className="hidden md:block w-full h-[1px] bg-black/10 mt-6 flex-shrink" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
