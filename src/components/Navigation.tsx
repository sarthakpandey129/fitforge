"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const NAV_LINKS = [
  { label: "SYSTEM", href: "#system" },
  { label: "METHOD", href: "#method" },
  { label: "PRICING", href: "#pricing" },
];

export default function Navigation() {
  const [isHidden, setIsHidden] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const lastScrollY = useRef(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const requestRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (requestRef.current) return;
      
      requestRef.current = requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
        
        if (documentHeight > 0) {
          setScrollProgress(currentScrollY / documentHeight);
        }

        if (currentScrollY > lastScrollY.current + 10 && currentScrollY > 100) {
          setIsHidden(true);
        } else if (currentScrollY < lastScrollY.current - 10) {
          setIsHidden(false);
        }
        lastScrollY.current = currentScrollY;
        requestRef.current = null;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isHidden ? "translate-y-[-110%]" : "translate-y-0"
      }`}
    >
      <div className="mx-4 md:mx-8">
        <nav className="relative flex items-center justify-between px-6 py-4 bg-white/70 backdrop-blur-2xl border-b border-black/5 rounded-2xl overflow-hidden">
          
          {/* Progress bar */}
          <div 
            className="absolute bottom-0 left-0 h-[2px] w-full origin-left"
            style={{ 
              transform: `scaleX(${scrollProgress})`,
              background: 'linear-gradient(90deg, var(--color-accent), var(--color-accent-warm))',
              transition: 'transform 0.1s ease-out'
            }}
          />

          <div className="flex items-center">
            <Link 
              href="/" 
              className="text-sm font-bold tracking-[0.2em] transition-all hover:tracking-[0.25em] duration-300"
            >
              FITFORGE
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-black/40 hover:text-black text-xs font-semibold tracking-[0.15em] uppercase transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/signup"
              className="bg-black text-white px-5 py-2 rounded-full text-xs font-semibold tracking-[0.15em] uppercase hover:bg-black/80 transition-colors"
            >
              START →
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className={`block w-6 h-0.5 bg-black transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-black transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
            <span className={`block w-6 h-0.5 bg-black transition-transform duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="absolute top-[120%] left-4 right-4 bg-white/95 backdrop-blur-2xl rounded-2xl border border-black/5 p-6 md:hidden shadow-lg flex flex-col space-y-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-black/60 hover:text-black text-sm font-semibold tracking-[0.15em] uppercase transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/signup"
            onClick={() => setIsMobileMenuOpen(false)}
            className="bg-black text-white px-5 py-3 rounded-full text-xs font-semibold tracking-[0.15em] uppercase hover:bg-black/80 transition-colors text-center mt-4"
          >
            START →
          </Link>
        </div>
      )}
    </header>
  );
}
