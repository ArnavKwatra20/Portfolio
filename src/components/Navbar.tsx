"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import Magnetic from "./Magnetic";

const sections = [
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "work", label: "Work" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const updateScrollState = () => setScrolled(window.scrollY > 50);
    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort((first, second) => first.boundingClientRect.top - second.boundingClientRect.top);
        if (visibleSections[0]) setActiveSection(visibleSections[0].target.id);
      },
      { rootMargin: "-25% 0px -60% 0px", threshold: 0 },
    );

    sections.forEach(({ id }) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => {
      window.removeEventListener("scroll", updateScrollState);
      observer.disconnect();
    };
  }, []);

  return (
    <motion.header
      className={`site-header${scrolled ? " is-scrolled" : ""}`}
      initial={prefersReducedMotion ? false : { opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{ x: "-50%" }}
    >
      <a className="wordmark" href="#top" aria-label="Go to top">
        <span className="wordmark__symbol">AK</span>
        <span className="wordmark__label">
          Arnav
          <br />
          Kwatra
        </span>
      </a>
      <nav className="main-nav" aria-label="Main navigation">
        {sections.map(({ id, label }) => (
          <a
            aria-current={activeSection === id ? "location" : undefined}
            className={activeSection === id ? "is-active" : undefined}
            href={`#${id}`}
            key={id}
          >
            {label}
            {activeSection === id && (
              <motion.span
                className="main-nav__indicator"
                layoutId="active-nav-indicator"
                transition={
                  prefersReducedMotion
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 380, damping: 32 }
                }
              />
            )}
          </a>
        ))}
      </nav>
      <Magnetic>
        <a className="header-contact" href="#contact">
          Let&apos;s talk <ArrowUpRight size={14} strokeWidth={1.5} />
        </a>
      </Magnetic>
    </motion.header>
  );
}
