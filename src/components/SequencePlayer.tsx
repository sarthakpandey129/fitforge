"use client";

import { useEffect, useRef, useState } from "react";
import { useScrollProgress } from "./ScrollManager";

const TOTAL_FRAMES = 240;
const FRAME_PREFIX = "/sequence/frame_";
const FRAME_SUFFIX = ".jpg";

function padStart(num: number, size: number) {
  let s = num + "";
  while (s.length < size) s = "0" + s;
  return s;
}

export default function SequencePlayer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loadedFrames, setLoadedFrames] = useState(0);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const { progress } = useScrollProgress();
  const requestRef = useRef<number | null>(null);
  const [fadeOut, setFadeOut] = useState(false);
  const [displayNone, setDisplayNone] = useState(false);

  // Preload all images
  useEffect(() => {
    let loaded = 0;
    const images: HTMLImageElement[] = [];
    
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = `${FRAME_PREFIX}${padStart(i, 4)}${FRAME_SUFFIX}`;
      img.onload = () => {
        loaded++;
        setLoadedFrames(loaded);
      };
      images.push(img);
    }
    
    imagesRef.current = images;
  }, []);

  // Draw loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const render = () => {
      // Ensure canvas matches screen size perfectly
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      // Update canvas resolution if needed
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      const p = progress.current ?? 0;
      
      // Map progress 0-1 to frame 0-239
      const frameIndex = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.floor(p * TOTAL_FRAMES))
      );
      
      const img = imagesRef.current[frameIndex];
      
      if (img && img.complete && img.naturalWidth > 0) {
        // Implement object-fit: cover logic
        const imgRatio = img.naturalWidth / img.naturalHeight;
        const canvasRatio = width / height;
        
        let drawWidth, drawHeight, offsetX, offsetY;
        
        if (imgRatio > canvasRatio) {
          // Image is wider than canvas
          drawHeight = height;
          drawWidth = height * imgRatio;
          offsetX = (width - drawWidth) / 2;
          offsetY = 0;
        } else {
          // Canvas is wider than image
          drawWidth = width;
          drawHeight = width / imgRatio;
          offsetX = 0;
          offsetY = (height - drawHeight) / 2;
        }
        
        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      }
      
      requestRef.current = requestAnimationFrame(render);
    };
    
    requestRef.current = requestAnimationFrame(render);
    
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [loadedFrames]);

  const isLoaded = loadedFrames === TOTAL_FRAMES;
  const percentage = Math.round((loadedFrames / TOTAL_FRAMES) * 100);

  useEffect(() => {
    if (isLoaded) {
      setFadeOut(true);
      const timer = setTimeout(() => {
        setDisplayNone(true);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isLoaded]);

  return (
    <>
      {!displayNone && (
        <div
          className={`fixed inset-0 z-[60] flex items-center justify-center bg-[#0a0a0a] transition-opacity duration-[800ms] ${
            fadeOut ? "opacity-0" : "opacity-100"
          }`}
        >
          <div className="flex flex-col items-center">
            <h1 className="text-xs font-bold tracking-[0.5em] uppercase text-white/80 mb-12">
              FITFORGE
            </h1>
            <div className="w-48 h-[1px] bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-300 ease-out"
                style={{
                  width: `${percentage}%`,
                  background:
                    "linear-gradient(90deg, var(--color-accent), var(--color-accent-warm))",
                }}
              />
            </div>
            <p className="text-[10px] font-medium tracking-[0.3em] text-white/30 mt-4 tabular-nums">
              {padStart(percentage, 3)}%
            </p>
          </div>
        </div>
      )}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full z-0 bg-white pointer-events-none"
      />
    </>
  );
}
