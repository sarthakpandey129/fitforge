"use client";

import Link from "next/link";

interface CTAButtonProps {
  href: string;
  children: React.ReactNode;
}

export default function CTAButton({ href, children }: CTAButtonProps) {
  return (
    <Link
      href={href}
      className="cta-button interactive inline-flex items-center justify-center px-10 py-4 bg-fg/10 border border-fg/20 text-fg text-sm font-medium tracking-[0.15em] uppercase rounded-full relative z-10"
    >
      <span className="relative z-10">{children}</span>
    </Link>
  );
}
