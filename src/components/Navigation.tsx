"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const NAV_LINKS = [
  { label: "SYSTEM", href: "#system" },
  { label: "METHOD", href: "#method" },
  { label: "START", href: "/signup" },
];

export default function Navigation() {
  const progressRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const bar = progressRef.current;
    if (!bar) return;

    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      bar.style.transform = `scaleX(${Math.min(progress, 1)})`;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Subtle blur effect when scrolling
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const onScroll = () => {
      if (window.scrollY > 50) {
        nav.classList.add("bg-white/40", "backdrop-blur-xl");
      } else {
        nav.classList.remove("bg-white/40", "backdrop-blur-xl");
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Scroll progress */}
      <div className="fixed top-0 left-0 w-full h-[2px] z-[100]">
        <div
          ref={progressRef}
          className="scroll-progress h-full bg-black"
          style={{ transform: "scaleX(0)", transformOrigin: "left" }}
        />
      </div>

      {/* Nav bar */}
      <nav
        ref={navRef}
        className="fixed top-0 left-0 w-full z-50 transition-all duration-700 py-6"
      >
        <div className="px-8 md:px-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-black text-sm font-bold tracking-[0.2em] uppercase hover:opacity-60 transition-opacity duration-300"
          >
            FITFORGE
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-black/60 text-xs font-semibold tracking-[0.15em] uppercase hover:text-black transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile burger */}
          <button
            className="md:hidden text-black p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-5 flex flex-col gap-1">
              <span
                className={`block h-[1.5px] bg-black transition-transform duration-300 ${mobileOpen ? "rotate-45 translate-y-[4px]" : ""}`}
              />
              <span
                className={`block h-[1.5px] bg-black transition-opacity duration-300 ${mobileOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`block h-[1.5px] bg-black transition-transform duration-300 ${mobileOpen ? "-rotate-45 -translate-y-[4px]" : ""}`}
              />
            </div>
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden overflow-hidden transition-[max-height] duration-500 ease-out ${mobileOpen ? "max-h-60" : "max-h-0"}`}
        >
          <div className="px-8 pb-6 pt-4 flex flex-col gap-6 bg-white/95 backdrop-blur-3xl">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-black/60 text-xs font-semibold tracking-[0.2em] uppercase hover:text-black transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}
