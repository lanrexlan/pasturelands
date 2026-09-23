"use client";

import { useRef, type ReactNode } from "react";

/**
 * Tilts its content a few degrees towards the pointer, for a sense of depth
 * on desktop. Does nothing on touch screens or with reduced motion.
 */
export function Tilt({ children, className = "", max = 6 }: { children: ReactNode; className?: string; max?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  function move(e: React.PointerEvent) {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse" || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(px * max).toFixed(2)}deg)`;
  }

  function leave() {
    if (ref.current) ref.current.style.transform = "";
  }

  return (
    <div className={`[perspective:1400px] ${className}`} onPointerMove={move} onPointerLeave={leave}>
      <div ref={ref} className="transition-transform duration-300 ease-out will-change-transform [transform-style:preserve-3d]">
        {children}
      </div>
    </div>
  );
}
