"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

type Glow = {
  x: number;
  y: number;
  radius: number;
  color: string;
  phase: number;
  speed: number;
};

export default function AtmosphericBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d", { alpha: false });
    if (!canvas || !context) return;

    let width = 0;
    let height = 0;
    let frame = 0;
    let previousFrame = 0;
    let pointerX = 0.5;
    let pointerY = 0.42;
    let easedX = pointerX;
    let easedY = pointerY;
    let visible = !document.hidden;
    const glows: Glow[] = [
      { x: 0.27, y: 0.24, radius: 0.5, color: "68, 48, 39", phase: 0, speed: 0.00013 },
      { x: 0.76, y: 0.4, radius: 0.42, color: "63, 49, 42", phase: 1.8, speed: 0.0001 },
      { x: 0.52, y: 0.86, radius: 0.37, color: "116, 69, 49", phase: 3.4, speed: 0.00008 },
    ];

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const scale = Math.min(0.55, Math.sqrt(520_000 / (width * height)));
      canvas.width = Math.max(1, Math.round(width * scale));
      canvas.height = Math.max(1, Math.round(height * scale));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(scale, 0, 0, scale, 0, 0);
      draw(performance.now(), true);
    };

    const draw = (time: number, staticFrame = false) => {
      if (!staticFrame && time - previousFrame < 1000 / 60) {
        frame = window.requestAnimationFrame((nextTime) => draw(nextTime));
        return;
      }
      previousFrame = time;
      easedX += (pointerX - easedX) * 0.018;
      easedY += (pointerY - easedY) * 0.018;
      context.fillStyle = "#141110";
      context.fillRect(0, 0, width, height);

      for (const [index, glow] of glows.entries()) {
        const drift = staticFrame ? 0 : Math.sin(time * glow.speed + glow.phase);
        const x = width * (glow.x + drift * 0.035 + (easedX - 0.5) * (index === 2 ? 0.045 : 0.07));
        const y = height * (glow.y + Math.cos(time * glow.speed + glow.phase) * 0.026 + (easedY - 0.5) * 0.045);
        const radius = Math.max(width, height) * glow.radius;
        const gradient = context.createRadialGradient(x, y, 0, x, y, radius);
        gradient.addColorStop(0, `rgba(${glow.color}, ${index === 2 ? 0.115 : 0.12})`);
        gradient.addColorStop(0.46, `rgba(${glow.color}, ${index === 2 ? 0.055 : 0.06})`);
        gradient.addColorStop(1, `rgba(${glow.color}, 0)`);
        context.fillStyle = gradient;
        context.fillRect(0, 0, width, height);
      }

      if (!staticFrame && visible && !prefersReducedMotion) {
        frame = window.requestAnimationFrame((nextTime) => draw(nextTime));
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      pointerX = event.clientX / window.innerWidth;
      pointerY = event.clientY / window.innerHeight;
    };
    const handleVisibilityChange = () => {
      visible = !document.hidden;
      if (visible && !prefersReducedMotion) {
        frame = window.requestAnimationFrame((time) => draw(time));
      } else {
        window.cancelAnimationFrame(frame);
      }
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);
    if (!prefersReducedMotion && visible) {
      frame = window.requestAnimationFrame((time) => draw(time));
    }

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [prefersReducedMotion]);

  return <canvas ref={canvasRef} className="atmospheric-bg" aria-hidden="true" />;
}
