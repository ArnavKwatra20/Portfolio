import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDown, ArrowLeft, ArrowUpRight, ExternalLink } from "lucide-react";
import { notFound } from "next/navigation";
import MotionShell, { AmbientParticles, Reveal } from "@/components/motion-shell";
import { getProject, projects } from "@/lib/projects";

type CaseStudyPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) return { title: "Case study not found | Arnav Kwatra" };

  return {
    title: `${project.name} — Case study | Arnav Kwatra`,
    description: project.description,
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  const currentIndex = projects.findIndex((item) => item.slug === project.slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <MotionShell>
      <main className={`case-study case-study--${project.art}`}>
        <AmbientParticles />
        <div className="grain" aria-hidden="true" />
        <header className="case-header section-wrap">
          <Link className="case-header__brand" href="/#top" aria-label="Arnav Kwatra home">
            <span className="wordmark__symbol">AK</span>
            <span className="wordmark__label">Arnav<br />Kwatra</span>
          </Link>
          <Link className="case-header__back" href="/#work">
            <ArrowLeft size={14} />
            All projects
          </Link>
        </header>

        <section className="case-hero section-wrap">
          <Reveal className="case-hero__copy">
            <span className="eyebrow">
              {project.number} / 04&nbsp;&nbsp; · &nbsp;&nbsp;{project.type}
            </span>
            <h1>{project.name}</h1>
            <p>{project.description}</p>
            <span className={`case-status${project.status === "In development" ? " case-status--upcoming" : ""}`}>
              <i />
              {project.status}
            </span>
          </Reveal>
          <Reveal delay={0.1} className="case-hero__art">
            <span className={`project-screen project-screen--${project.art}`}>
              <span className="project-screen__top">
                <span className="project-screen__brand">{project.name}</span>
                <span className="project-screen__dots" aria-hidden="true">
                  <i /><i /><i />
                </span>
              </span>
              <span className="case-art__statement">
                {project.art === "cafe-blues" && <>Good coffee.<br /><em>Slow mornings.</em></>}
                {project.art === "flowstate" && <>Make the work<br /><em>flow.</em></>}
                {project.art === "process-analyzer" && <>See the system.<br /><em>Understand it.</em></>}
                {project.art === "clientflow" && <>Evidence first.<br /><em>People always.</em></>}
              </span>
              <span className="case-art__caption">{project.type}</span>
            </span>
          </Reveal>
          <a className="case-hero__scroll" href="#overview">
            Explore the case study <ArrowDown size={14} />
          </a>
        </section>

        <section className="case-overview section-wrap" id="overview">
          <Reveal className="case-overview__label">
            <span className="eyebrow">The brief</span>
            <h2>A clear idea,<br /><em>carefully made.</em></h2>
          </Reveal>
          <div className="case-overview__content">
            <Reveal>
              <h3>The challenge</h3>
              <p>{project.challenge}</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h3>The approach</h3>
              <p>{project.approach}</p>
            </Reveal>
            <Reveal delay={0.16}>
              <h3>The solution</h3>
              <p>{project.solution}</p>
            </Reveal>
          </div>
        </section>

        <section className="case-details section-wrap">
          <Reveal className="case-details__heading">
            <span className="eyebrow">A closer look</span>
            <h2>Considered at every step.</h2>
          </Reveal>
          <div className="case-details__grid">
            <Reveal className="case-highlights">
              <h3>What it includes</h3>
              <ul>
                {project.highlights.map((highlight) => (
                  <li key={highlight}>
                    <span aria-hidden="true">↗</span>
                    {highlight}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.1} className="case-stack">
              <h3>Tools &amp; technology</h3>
              <div className="case-stack__tags">
                {project.stack.map((technology) => (
                  <span key={technology}>{technology}</span>
                ))}
              </div>
              <p>
                Chosen to fit the experience—not the other way around.
              </p>
            </Reveal>
          </div>
          <Reveal className="case-visit">
            <span className="case-visit__copy">
              <span className="eyebrow">Take a closer look</span>
              <span className="case-visit__name">{project.name}</span>
            </span>
            <a
              className="case-visit__link"
              href={project.visitUrl}
              target="_blank"
              rel="noreferrer"
            >
              Visit website
              <ExternalLink size={15} strokeWidth={1.5} />
            </a>
          </Reveal>
        </section>

        <section className="case-next section-wrap">
          <span className="eyebrow">Next in selected work</span>
          <Link href={`/work/${nextProject.slug}`} className="case-next__link">
            <span>
              <small>{nextProject.number} / 04</small>
              {nextProject.name}
            </span>
            <ArrowUpRight size={24} strokeWidth={1.3} />
          </Link>
          <Link href="/#contact" className="text-link">
            Have a similar idea? Let&apos;s talk
            <ArrowUpRight size={15} strokeWidth={1.5} />
          </Link>
        </section>

        <footer className="site-footer section-wrap">
          <Link className="wordmark wordmark--footer" href="/#top">
            <span className="wordmark__symbol">AK</span>
            <span className="wordmark__label">Made with care.</span>
          </Link>
          <span>Independent by nature. Thoughtful by design.</span>
          <Link href="/#work" className="footer-top">
            All projects <ArrowUpRight size={13} />
          </Link>
        </footer>
      </main>
    </MotionShell>
  );
}
