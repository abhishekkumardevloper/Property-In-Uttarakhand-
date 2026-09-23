"use client";

import { useEffect, useRef } from "react";
import { useMousePosition } from "@/hooks/useMousePosition";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const { x, y } = useMousePosition();
  const ringPos = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    // Lerp ring position for smooth lag
    const animate = () => {
      if (ringRef.current) {
        ringPos.current.x += (x - ringPos.current.x) * 0.12;
        ringPos.current.y += (y - ringPos.current.y) * 0.12;
        ringRef.current.style.left = `${ringPos.current.x}px`;
        ringRef.current.style.top = `${ringPos.current.y}px`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [x, y]);

  useEffect(() => {
    if (dotRef.current) {
      dotRef.current.style.left = `${x}px`;
      dotRef.current.style.top = `${y}px`;
    }
  }, [x, y]);

  useEffect(() => {
    const interactiveEls = document.querySelectorAll(
      "a, button, [data-cursor]"
    );

    const enter = (e: Event) => {
      document.body.classList.add("cursor-hover");
      const target = e.target as HTMLElement;
      const label = target.dataset.cursor;
      if (label && labelRef.current) {
        labelRef.current.textContent = label;
        labelRef.current.style.opacity = "1";
      }
    };

    const leave = () => {
      document.body.classList.remove("cursor-hover");
      if (labelRef.current) {
        labelRef.current.style.opacity = "0";
      }
    };

    interactiveEls.forEach((el) => {
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
    });

    return () => {
      interactiveEls.forEach((el) => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
      });
    };
  }, []);

  return (
    <div className="custom-cursor hidden md:block">
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{ position: "fixed", pointerEvents: "none", zIndex: 9999 }}
      />
      <div
        ref={ringRef}
        className="cursor-ring"
        style={{ position: "fixed", pointerEvents: "none", zIndex: 9998 }}
      >
        <div
          ref={labelRef}
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "8px",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--color-gold)",
            opacity: 0,
            transition: "opacity 0.2s ease",
            fontFamily: "var(--font-inter)",
          }}
        />
      </div>
    </div>
  );
}
