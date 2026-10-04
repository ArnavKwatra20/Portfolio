"use client";

import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import {
  cloneElement,
  isValidElement,
  type ReactNode,
} from "react";

type TextRevealProps = {
  as?: "h1" | "h2";
  children: ReactNode;
  className?: string;
  id?: string;
  split?: "word" | "character";
  "aria-label"?: string;
};

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.08,
      staggerChildren: 0.045,
    },
  },
};

const wordVariants: Variants = {
  hidden: { opacity: 0, y: "105%" },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] },
  },
};

function revealNode(node: ReactNode, split: "word" | "character", keyPrefix: string): ReactNode {
  if (typeof node === "string" || typeof node === "number") {
    const parts = String(node).split(split === "word" ? /(\s+)/ : /(\s+)/);
    return parts.map((part, index) => {
      if (!part || /^\s+$/.test(part)) return part;
      const units = split === "word" ? [part] : Array.from(part);
      return units.map((unit, unitIndex) => (
        <span className="text-reveal__mask" key={`${keyPrefix}-${index}-${unitIndex}`}>
          <motion.span className="text-reveal__word" variants={wordVariants}>
            {unit}
          </motion.span>
        </span>
      ));
    });
  }

  if (Array.isArray(node)) {
    return node.map((child, index) => revealNode(child, split, `${keyPrefix}-${index}`));
  }

  if (isValidElement<{ children?: ReactNode }>(node) && node.props.children) {
    return cloneElement(
      node,
      undefined,
      revealNode(node.props.children, split, `${keyPrefix}-child`),
    );
  }

  return node;
}

export default function TextReveal({
  as = "h2",
  children,
  split = "word",
  ...headingProps
}: TextRevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const content = revealNode(children, split, "reveal");
  const props = {
    ...headingProps,
    className: `text-reveal${headingProps.className ? ` ${headingProps.className}` : ""}`,
    variants: containerVariants,
    initial: prefersReducedMotion ? false : "hidden",
    whileInView: "visible" as const,
    viewport: { once: true, amount: 0.65 },
  };

  return as === "h1" ? (
    <motion.h1 {...props}>{content}</motion.h1>
  ) : (
    <motion.h2 {...props}>{content}</motion.h2>
  );
}
