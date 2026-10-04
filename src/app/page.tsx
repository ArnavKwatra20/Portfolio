import {
  ArrowDown,
  ArrowUpRight,
  Code2,
  Github,
  Instagram,
  Layers3,
  Linkedin,
  Mail,
  Palette,
  MoveUpRight,
} from "lucide-react";
import ContactForm from "@/components/contact-form";
import AtmosphericBg from "@/components/AtmosphericBg";
import Magnetic from "@/components/Magnetic";
import Navbar from "@/components/Navbar";
import MotionShell, { AmbientParticles, Reveal } from "@/components/motion-shell";
import Projects from "@/components/projects";
import TextReveal from "@/components/TextReveal";

const services = [
  {
    number: "01",
    icon: Code2,
    title: "Front-end development",
    description:
      "Fast, accessible interfaces that feel considered at every screen size.",
    details: "Next.js · React · Design systems",
  },
  {
    number: "02",
    icon: Layers3,
    title: "Product engineering",
    description:
      "From a useful first release to the details that make a product last.",
    details: "Full-stack · APIs · Performance",
  },
  {
    number: "03",
    icon: Palette,
    title: "Interface design",
    description:
      "Clear visual systems that give good ideas a more human way to work.",
    details: "Prototyping · UI systems · Art direction",
  },
];

const technologies = [
  "TypeScript",
  "React",
  "Next.js",
  "Tailwind CSS",
  "Node.js",
  "Figma",
  "PostgreSQL",
  "Framer Motion",
];

const deliverySteps = [
  {
    number: "01",
    day: "Day 1",
    title: "Read",
    description: "I get to know your brief, goals, and the people you want to reach.",
  },
  {
    number: "02",
    day: "Day 1",
    title: "Evaluate",
    description: "We align on scope, content, and the right direction before I build.",
  },
  {
    number: "03",
    day: "Days 2–3",
    title: "Produce",
    description: "I build, refine, and prepare the finished experience for launch.",
  },
];

const emailAddress =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "kwatra.arnav11@gmail.com";
const githubUrl =
  process.env.NEXT_PUBLIC_GITHUB_URL ?? "https://github.com/ArnavKwatra20";
const linkedinUrl =
  process.env.NEXT_PUBLIC_LINKEDIN_URL ??
  "https://www.linkedin.com/in/arnav-kwatra-003788292/";

export default function Home() {
  return (
    <MotionShell>
      <main>
        <AtmosphericBg />
        <AmbientParticles />
        <div className="grain" aria-hidden="true" />

        <Navbar />

        <section className="hero section-wrap" id="top" aria-labelledby="hero-title">
          <div className="hero__atmosphere" aria-hidden="true" />
          <div className="hero__content">
            <Reveal>
              <p className="eyebrow">
                <span className="status-dot" />
                Independent web developer
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <TextReveal as="h1" id="hero-title">
                Functional <em>art</em>
                <br />
                for the digital age.
              </TextReveal>
            </Reveal>
            <Reveal delay={0.16}>
              <div className="hero__bottom">
                <p className="hero__intro">
                  Thoughtful design and dependable engineering for ideas that
                  deserve to be out in the world.
                </p>
                <Magnetic>
                  <a className="button button--primary" href="#contact">
                    Let&apos;s build something good
                    <MoveUpRight size={15} strokeWidth={1.6} />
                  </a>
                </Magnetic>
              </div>
            </Reveal>
          </div>
          <a className="hero__scroll" href="#about">
            <span>Scroll to explore</span>
            <ArrowDown size={14} strokeWidth={1.4} />
          </a>
          <p className="hero__index" aria-hidden="true">
            01 / 06
          </p>
        </section>

        <section className="about section-wrap section-space" id="about">
          <Reveal className="section-label">
            <span className="eyebrow">A little about how I work</span>
            <span className="section-label__rule" />
          </Reveal>
          <div className="about__grid">
            <Reveal>
              <TextReveal>
                The best digital
                <br />
                experiences feel
                <br />
                <em>effortless.</em>
              </TextReveal>
            </Reveal>
            <Reveal delay={0.1} className="about__copy">
              <p className="about__lead">
                I bring design and development together to make digital
                experiences that feel clear, useful, and unmistakably human.
              </p>
              <p>
                That means listening before making, keeping the complicated
                parts out of your way, and caring about every detail—from the
                first sketch to the last line of code. The result is thoughtful
                work that looks good, works beautifully, and gives people a
                reason to stay.
              </p>
              <a className="text-link" href="#services">
                A thoughtful process, end to end
                <ArrowUpRight size={15} strokeWidth={1.5} />
              </a>
            </Reveal>
          </div>
        </section>

        <section className="services section-wrap section-space" id="services">
          <Reveal className="section-heading">
            <div>
              <span className="eyebrow">What I can help with</span>
              <TextReveal>Good ideas, made real.</TextReveal>
            </div>
            <p>
              A considered partner from early thinking through launch and
              whatever comes next.
            </p>
          </Reveal>
          <div className="service-grid">
            {services.map(({ number, icon: Icon, title, description, details }, index) => (
              <Reveal key={number} delay={index * 0.07} className="service-card">
                <div className="service-card__top">
                  <span className="service-card__number">{number}</span>
                  <Icon size={20} strokeWidth={1.25} aria-hidden="true" />
                </div>
                <h3>{title}</h3>
                <p>{description}</p>
                <span className="service-card__details">{details}</span>
              </Reveal>
            ))}
          </div>
        </section>

        <Projects />

        <section className="stack section-space" aria-labelledby="stack-title">
          <div className="section-wrap">
            <Reveal className="stack__heading">
              <span className="eyebrow">A few tools I reach for</span>
              <TextReveal id="stack-title">The right tool, for the right reason.</TextReveal>
            </Reveal>
          </div>
          <div
            className="marquee"
            role="region"
            aria-label={`Technologies: ${technologies.join(", ")}`}
          >
            <div className="marquee__track" aria-hidden="true">
              {[0, 1].map((copy) => (
                <div className="marquee__group" key={copy}>
                  {technologies.map((technology) => (
                    <span className="marquee__item" key={`${copy}-${technology}`}>
                      {technology}
                      <span className="marquee__separator">✳</span>
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="section-wrap">
            <p className="stack__note">
              Tools are just a starting point. Good judgment is what makes them
              useful.
            </p>
          </div>
        </section>

        <section
          className="delivery-section section-wrap"
          aria-labelledby="delivery-title"
        >
          <Reveal className="delivery-section__heading">
            <span className="eyebrow">A clear path to launch</span>
            <TextReveal id="delivery-title">
              From first read to final production in 2–3 working days.
            </TextReveal>
          </Reveal>
          <Reveal delay={0.08}>
            <ol className="delivery-timeline">
              {deliverySteps.map((step) => (
                <li className="delivery-timeline__step" key={step.number}>
                  <span className="delivery-timeline__number">{step.number}</span>
                  <span className="delivery-timeline__day">{step.day}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </section>

        <section className="contact section-wrap section-space" id="contact">
          <Reveal className="contact__intro">
            <span className="eyebrow">Have something in mind?</span>
            <TextReveal>
              Let&apos;s make
              <br />
              something <em>matter.</em>
            </TextReveal>
            <p>
              Tell me a little about what you&apos;re working on. I&apos;ll get
              back to you with a thoughtful next step.
            </p>
            <div className="contact__socials">
              {emailAddress ? (
                <a href={`mailto:${emailAddress}`}>
                  Email <ArrowUpRight size={13} />
                </a>
              ) : (
                <span>Email details coming soon</span>
              )}
              <a href={githubUrl} target="_blank" rel="noreferrer">
                <Github size={14} strokeWidth={1.5} />
                GitHub
                <ArrowUpRight size={12} />
              </a>
              <a href={linkedinUrl} target="_blank" rel="noreferrer">
                <Linkedin size={14} strokeWidth={1.5} />
                LinkedIn
                <ArrowUpRight size={12} />
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="contact__form-wrap">
            <ContactForm emailAddress={emailAddress} />
          </Reveal>
        </section>

        <footer className="site-footer section-wrap">
          <a className="wordmark wordmark--footer" href="#top">
            <span className="wordmark__symbol">AK</span>
            <span className="wordmark__label">Made with care.</span>
          </a>
          <span>Independent by nature. Thoughtful by design.</span>
          <nav className="footer-socials" aria-label="Contact and social links">
            {[
              {
                label: "Instagram",
                href: process.env.NEXT_PUBLIC_INSTAGRAM_URL,
                icon: Instagram,
                envName: "NEXT_PUBLIC_INSTAGRAM_URL",
              },
              {
                label: "GitHub",
                href: githubUrl,
                icon: Github,
                envName: "NEXT_PUBLIC_GITHUB_URL",
              },
              {
                label: "LinkedIn",
                href: linkedinUrl,
                icon: Linkedin,
                envName: "NEXT_PUBLIC_LINKEDIN_URL",
              },
              {
                label: "Gmail",
                href: emailAddress ? `mailto:${emailAddress}` : undefined,
                icon: Mail,
                envName: "NEXT_PUBLIC_CONTACT_EMAIL",
              },
            ].map(({ label, href, icon: Icon, envName }) => (
              <Magnetic key={label}>
                <a
                  aria-label={
                    href
                      ? label
                      : `${label} is not configured; open the contact form`
                  }
                  href={href ?? "#contact"}
                  title={href ? label : `Set ${envName} to configure ${label}`}
                  {...(href && !href.startsWith("mailto:")
                    ? { target: "_blank", rel: "noreferrer" }
                    : {})}
                >
                  <Icon size={16} strokeWidth={1.5} aria-hidden="true" />
                </a>
              </Magnetic>
            ))}
          </nav>
          <a href="#top" className="footer-top">
            Back to top <ArrowUpRight size={13} />
          </a>
        </footer>
      </main>
    </MotionShell>
  );
}
