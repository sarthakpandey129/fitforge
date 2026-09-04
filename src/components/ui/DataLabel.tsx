"use client";

interface DataLabelProps {
  label: string;
  align?: "left" | "right";
}

export default function DataLabel({ label, align = "left" }: DataLabelProps) {
  return (
    <div
      className={`data-label flex items-center gap-3 ${align === "right" ? "flex-row-reverse" : ""}`}
    >
      <div className="w-6 h-[1px] data-label-line" />
      <span className="text-[10px] md:text-xs font-medium tracking-[0.25em] uppercase text-fg-muted">
        {label}
      </span>
    </div>
  );
}
