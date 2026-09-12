"use client";
import Link from "next/link";
import React from "react";

interface GlowButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: "light" | "dark";
}

export default function GlowButton({ href, children, variant = "dark" }: GlowButtonProps) {
  const isLight = variant === "light";

  return (
    <Link
      href={href}
      className={`
        interactive group relative inline-flex items-center justify-center rounded-full px-10 py-4
        transition-all duration-300 hover:scale-[1.02]
        ${isLight ? "bg-black text-white hover:shadow-[0_0_40px_rgba(255,107,53,0.4)]" : "bg-white text-black hover:glow-accent"}
      `}
    >
      <span className="absolute inset-[-2px] rounded-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-warm)] opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-50 -z-10"></span>
      <span className="absolute inset-[-2px] rounded-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-warm)] opacity-0 transition-opacity duration-300 group-hover:opacity-100 -z-10"></span>
      
      <span className={`absolute inset-0 rounded-full ${isLight ? "bg-black" : "bg-white"} -z-10`}></span>

      <span className="relative z-10 flex items-center font-medium">
        {children}
        <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
      </span>
    </Link>
  );
}
