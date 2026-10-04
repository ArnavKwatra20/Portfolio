"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { type PointerEvent, type ReactNode } from "react";

type MagneticProps = {
  children: ReactNode;
  className?: string;
  strength?: number;
};

export default function Magnetic({
  children,
  className,
  strength = 0.18,
}: MagneticProps) {
  const prefersReducedMotion = useReducedMotion();
  const targetX = useMotionValue(0);
  const targetY = useMotionValue(0);
  const x = useSpring(targetX, { damping: 22, stiffness: 210, mass: 0.3 });
  const y = useSpring(targetY, { damping: 22, stiffness: 210, mass: 0.3 });

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    targetX.set((event.clientX - bounds.left - bounds.width / 2) * strength);
    targetY.set((event.clientY - bounds.top - bounds.height / 2) * strength);
  };

  const reset = () => {
    targetX.set(0);
    targetY.set(0);
  };

  return (
    <motion.div
      className={className}
      style={{ x, y, display: "inline-flex" }}
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
    >
      {children}
    </motion.div>
  );
}
