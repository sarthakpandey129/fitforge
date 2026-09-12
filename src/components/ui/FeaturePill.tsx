"use client";
import React from "react";

interface FeaturePillProps {
  label: string;
  dark?: boolean;
}

export default function FeaturePill({ label, dark = false }: FeaturePillProps) {
  return (
    <span
      className={`
        inline-flex items-center rounded-full px-4 py-1.5 
        text-[10px] md:text-xs font-medium tracking-[0.2em] uppercase
        transition-all duration-300
        ${
          dark
            ? "border border-white/10 text-white/60 hover:border-white/30 hover:text-white/80"
            : "border border-black/10 text-black/50 hover:border-black/30 hover:text-black/80"
        }
      `}
    >
      {label}
    </span>
  );
}
