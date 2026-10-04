"use client";

import Link from "next/link";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { type PointerEvent } from "react";
import { Reveal } from "./motion-shell";
import TextReveal from "./TextReveal";
import { projects, type PortfolioProject } from "@/lib/projects";

function ProjectArtwork({ project }: { project: PortfolioProject }) {
  return (
    <span className={`project-art project-art--${project.art}`}>
      <span className={`project-screen project-screen--${project.art}`}>
        <span className="project-screen__top">
          <span className="project-screen__brand">
            {project.art === "cafe-blues" && "cafe blues"}
            {project.art === "flowstate" && "flowstate"}
            {project.art === "process-analyzer" && "PROCESS / 01"}
            {project.art === "clientflow" && "clientflow"}
          </span>
          <span className="project-screen__dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
        </span>
        {project.art === "cafe-blues" && (
          <span className="cafe-preview">
            <span className="cafe-preview__eyebrow">Mumbai · Est. 2024</span>
            <span className="cafe-preview__title">
              Good coffee.
              <br />
              <em>Slow mornings.</em>
            </span>
            <span className="cafe-preview__button">Explore the menu ↗</span>
          </span>
        )}
        {project.art === "flowstate" && (
          <span className="flow-preview">
            <span className="flow-preview__heading">Automations &amp; Workflows</span>
            <span className="flow-preview__stats">
              <i>Active <b>08</b></i>
              <i>Runs <b>124</b></i>
              <i>Success <b>96%</b></i>
            </span>
            <span className="flow-preview__canvas">
              <i>TRIGGER</i>
              <b aria-hidden="true">···</b>
              <i>AI STEP</i>
              <b aria-hidden="true">···</b>
              <i>ACTION</i>
            </span>
          </span>
        )}
        {project.art === "process-analyzer" && (
          <span className="analyzer-preview">
            <span className="analyzer-preview__heading">System overview</span>
            <span className="analyzer-preview__metrics">
              <i>CPU <b>23.4%</b><span /></i>
              <i>MEMORY <b>61.8%</b><span /></i>
              <i>NETWORK <b>48 MB/s</b><span /></i>
            </span>
            <span className="analyzer-preview__chart" aria-hidden="true">
              <i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i />
            </span>
          </span>
        )}
        {project.art === "clientflow" && (
          <span className="client-preview">
            <span className="client-preview__heading">Candidate workspace</span>
            <span className="client-preview__profile">
              <i aria-hidden="true">AM</i>
              <b>Alex Morgan<small>Product Designer</small></b>
            </span>
            <span className="client-preview__sources">
              <i>Resume <b>Reviewed</b></i>
              <i>Portfolio <b>3 sources</b></i>
              <i>GitHub <b>12 repositories</b></i>
            </span>
            <span className="client-preview__evidence">
              EVIDENCE · “Led a cross-functional redesign…”
            </span>
          </span>
        )}
      </span>
      <span className="project-card__shade" aria-hidden="true" />
      <span className="project-card__overlay">
        <span>Read the case study</span>
        <ArrowUpRight size={18} strokeWidth={1.4} />
      </span>
    </span>
  );
}

function ProjectCard({ project }: { project: PortfolioProject }) {
  const prefersReducedMotion = useReducedMotion();
  const targetX = useMotionValue(0);
  const targetY = useMotionValue(0);
  const rotateX = useSpring(targetX, { damping: 24, stiffness: 180, mass: 0.35 });
  const rotateY = useSpring(targetY, { damping: 24, stiffness: 180, mass: 0.35 });

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const relativeX = (event.clientX - bounds.left) / bounds.width - 0.5;
    const relativeY = (event.clientY - bounds.top) / bounds.height - 0.5;
    targetX.set(relativeY * -5);
    targetY.set(relativeX * 5);
  };

  const resetTilt = () => {
    targetX.set(0);
    targetY.set(0);
  };

  return (
    <motion.div
      className={`project-card project-card--${project.art}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1000,
        transformStyle: "preserve-3d",
      }}
    >
      <Link
        className="project-card__button"
        href={`/work/${project.slug}`}
        aria-label={`Read the ${project.name} case study`}
      >
        <ProjectArtwork project={project} />
        <span className="project-card__meta">
          <span>
            <span className="project-card__number">{project.number}</span>
            <span className="project-card__name">{project.name}</span>
          </span>
          <span className="project-card__type">
            {project.type}
            {project.status === "In development" && (
              <span className="project-card__coming">Coming soon</span>
            )}
          </span>
        </span>
      </Link>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section className="work section-wrap section-space" id="work">
      <Reveal className="section-heading work__heading">
        <div>
          <span className="eyebrow">Selected work</span>
          <TextReveal>Thoughtful work, made real.</TextReveal>
        </div>
        <p>
          A mix of shipped products and ideas in progress, shaped around real
          people and useful details.
        </p>
      </Reveal>
      <div className="project-grid">
        {projects.map((project, index) => (
          <Reveal key={project.slug} delay={index * 0.08}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
