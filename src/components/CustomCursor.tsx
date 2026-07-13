import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let dx = mx, dy = my;
    let raf = 0;

    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    const onDown = () => { if (dot.current) dot.current.style.scale = ""; };
    const onUp = () => { if (dot.current) dot.current.style.scale = ""; };

    const tick = () => {
      dx += (mx - dx) * 0.25;
      dy += (my - dy) * 0.35;

      if (dot.current) dot.current.style.transform = `translate(${dx - 10}px, ${dy - 10}px)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div
      ref={dot}
      className="fixed top-0 left-0 w-8 h-8 rounded-full bg-[var(--orange)] pointer-events-none z-[9999] mix-blend-difference"
      style={{ transition: "scale 0.15s cubic-bezier(0.16, 1, 0.3, 1)" }}
    />,
    document.body
  );
}
