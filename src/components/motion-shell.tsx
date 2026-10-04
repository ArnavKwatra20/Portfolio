"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import Lenis from "lenis";

type MotionShellProps = {
  children: React.ReactNode;
};

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

type Particle = {
  x: number;
  y: number;
  radius: number;
  drift: number;
  speed: number;
  phase: number;
};

export function AmbientParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    let animationFrame = 0;
    let lastFrame = 0;
    let width = 0;
    let height = 0;
    let particles: Particle[] = [];

    const resize = () => {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      const count = Math.min(42, Math.max(18, Math.round((width * height) / 36000)));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: 0.55 + Math.random() * 1.2,
        drift: (Math.random() - 0.5) * 0.16,
        speed: 0.08 + Math.random() * 0.2,
        phase: Math.random() * Math.PI * 2,
      }));
      draw(0, false);
    };

    const draw = (time: number, animate: boolean) => {
      context.clearRect(0, 0, width, height);
      particles.forEach((particle) => {
        const shimmer = animate ? 0.2 + (Math.sin(time * 0.0007 + particle.phase) + 1) * 0.12 : 0.28;
        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fillStyle = `rgba(207, 157, 119, ${shimmer})`;
        context.fill();

        if (animate) {
          particle.y -= particle.speed;
          particle.x += particle.drift;
          if (particle.y < -4) {
            particle.y = height + 4;
            particle.x = Math.random() * width;
          }
          if (particle.x < -4) particle.x = width + 4;
          if (particle.x > width + 4) particle.x = -4;
        }
      });
    };

    const animate = (time: number) => {
      if (time - lastFrame >= 1000 / 30) {
        draw(time, true);
        lastFrame = time;
      }
      animationFrame = window.requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });
    if (!prefersReducedMotion) {
      animationFrame = window.requestAnimationFrame(animate);
    }

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
    };
  }, [prefersReducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="ambient-particles"
      aria-hidden="true"
    />
  );
}

function CinematicIntro() {
  const prefersReducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const dismiss = useCallback(() => {
    setVisible(false);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    try {
      const navigationType = performance
        .getEntriesByType("navigation")
        .at(0);
      const isRefresh =
        navigationType instanceof PerformanceNavigationTiming &&
        navigationType.type === "reload";
      const hasSeenIntro = window.sessionStorage.getItem(
        "arnav-portfolio-intro-seen",
      );

      if (hasSeenIntro && !isRefresh) return;

      setVisible(true);
      window.sessionStorage.setItem("arnav-portfolio-intro-seen", "true");
      const timeout = window.setTimeout(dismiss, 2600);
      return () => window.clearTimeout(timeout);
    } catch {
      setVisible(true);
      const timeout = window.setTimeout(dismiss, 2600);
      return () => window.clearTimeout(timeout);
    }
  }, [dismiss, prefersReducedMotion]);

  useEffect(() => {
    if (!visible) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [dismiss, visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="cinematic-intro"
          role="status"
          aria-label="Loading Arnav Kwatra portfolio"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.55, ease: [0.76, 0, 0.24, 1] } }}
        >
          <motion.div
            className="cinematic-intro__content"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12, transition: { duration: 0.3 } }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="cinematic-intro__eyebrow">Arnav Kwatra · Portfolio</span>
            <span className="cinematic-intro__mark">AK</span>
            <span className="cinematic-intro__caption">A more human kind of digital.</span>
            <span className="cinematic-intro__progress" aria-hidden="true">
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.35, ease: [0.65, 0, 0.35, 1] }}
              />
            </span>
            <button
              className="cinematic-intro__skip"
              type="button"
              onClick={dismiss}
            >
              Skip intro
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function SmoothScroll() {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });
    let frame = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };

    frame = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, [prefersReducedMotion]);

  return null;
}

function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { damping: 28, stiffness: 360, mass: 0.45 });
  const springY = useSpring(cursorY, { damping: 28, stiffness: 360, mass: 0.45 });
  const [active, setActive] = useState(false);
  const [hovering, setHovering] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const handleMove = (event: PointerEvent) => {
      cursorX.set(event.clientX);
      cursorY.set(event.clientY);
      setActive(true);
    };
    const handleOver = (event: PointerEvent) => {
      setHovering(
        event.target instanceof Element &&
          Boolean(event.target.closest("a, button, input, textarea, [role='button']")),
      );
    };
    const handleLeave = () => setActive(false);

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerover", handleOver);
    document.documentElement.addEventListener("pointerleave", handleLeave);

    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerover", handleOver);
      document.documentElement.removeEventListener("pointerleave", handleLeave);
    };
  }, [cursorX, cursorY, prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <motion.div
      ref={cursorRef}
      className={`custom-cursor${active ? " is-active" : ""}${hovering ? " is-hovering" : ""}`}
      style={{ x: springX, y: springY }}
      aria-hidden="true"
    />
  );
}

export default function MotionShell({ children }: MotionShellProps) {
  return (
    <>
      <CinematicIntro />
      <SmoothScroll />
      <CustomCursor />
      {children}
    </>
  );
}
