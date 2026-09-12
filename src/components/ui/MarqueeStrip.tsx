"use client";
import React from "react";

interface MarqueeStripProps {
  items: string[];
  speed?: number; // in seconds
  dark?: boolean;
}

export default function MarqueeStrip({ items, speed = 30, dark = false }: MarqueeStripProps) {
  const duplicatedItems = [...items, ...items];
  const animationStyle = { animation: `marquee ${speed}s linear infinite` };

  return (
    <div
      className={`
        w-full overflow-hidden whitespace-nowrap py-6 flex items-center
        ${dark ? "bg-[var(--color-dark)] text-white/20" : "bg-bg text-black/15"}
      `}
    >
      <div className="flex w-max" style={animationStyle}>
        {duplicatedItems.map((item, index) => (
          <div key={index} className="flex items-center">
            <span className="text-sm md:text-base font-bold tracking-[0.15em] uppercase mx-4">
              {item}
            </span>
            <span className={`mx-4 ${dark ? "text-white/10" : "text-black/10"}`}>◆</span>
          </div>
        ))}
      </div>
    </div>
  );
}
