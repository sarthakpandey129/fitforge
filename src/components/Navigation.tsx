"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const NAV_LINKS = [
  { label: "SYSTEM", href: "#system" },
  { label: "METHOD", href: "#method" },
  { label: "START", href: "#start" },
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

  /* fade nav bg on scroll */
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const onScroll = () => {
      if (window.scrollY > 80) {
        nav.classList.add("bg-bg/80", "backdrop-blur-md");
      } else {
        nav.classList.remove("bg-bg/80", "backdrop-blur-md");
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
          className="scroll-progress h-full bg-accent"
          style={{ transform: "scaleX(0)" }}
        />
      </div>

      {/* Nav bar */}
      <nav
        ref={navRef}
        className="fixed top-0 left-0 w-full z-50 transition-colors duration-500"
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 h-14 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-fg text-sm font-medium tracking-[0.25em] uppercase hover:text-accent transition-colors duration-300"
          >
            FITFORGE
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-fg-muted text-xs font-medium tracking-[0.2em] uppercase hover:text-fg transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile burger */}
          <button
            className="md:hidden text-fg p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-5 flex flex-col gap-1">
              <span
                className={`block h-[1.5px] bg-fg transition-transform duration-300 ${mobileOpen ? "rotate-45 translate-y-[4px]" : ""}`}
              />
              <span
                className={`block h-[1.5px] bg-fg transition-opacity duration-300 ${mobileOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`block h-[1.5px] bg-fg transition-transform duration-300 ${mobileOpen ? "-rotate-45 -translate-y-[4px]" : ""}`}
              />
            </div>
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden overflow-hidden transition-[max-height] duration-500 ease-out ${mobileOpen ? "max-h-60" : "max-h-0"}`}
        >
          <div className="px-6 pb-6 pt-2 flex flex-col gap-4 bg-bg/95 backdrop-blur-md">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-fg-muted text-xs font-medium tracking-[0.2em] uppercase hover:text-fg transition-colors duration-300"
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
