"use client";

import dynamic from "next/dynamic";

const SceneCanvasInner = dynamic(() => import("./SceneCanvasInner"), {
  ssr: false,
  loading: () => (
    <div className="canvas-container flex items-center justify-center">
      <div className="w-8 h-8 border border-fg-dim border-t-accent rounded-full animate-spin" />
    </div>
  ),
});

export default function SceneCanvas() {
  return <SceneCanvasInner />;
}
