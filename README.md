# Arnav Kwatra — Portfolio

A responsive, editorial-style developer portfolio built with Next.js, Tailwind CSS, Framer Motion, and Lucide.

## Features

- Cinematic hero with a low-resolution interactive atmosphere canvas, subtle particles, and film grain
- Magnetic CTA/social controls, spring-driven project-card tilt, and masked heading reveals
- First-visit intro with a skip action and reduced-motion support
- Responsive About, Services, Projects, Tech Stack, Contact, and footer sections
- Four individual, statically generated project case studies
- Accessible project navigation, contact form validation, and keyboard-friendly controls
- Scroll-aware floating navigation, reduced-motion-aware animation, custom cursor, smooth scrolling, and status indicator

## Projects

1. Cafe Blues
2. Flowstate AI
3. Process Strength Analyzer
4. ClientFlow

Project cards open case studies at `/work/<project-slug>`. The case studies link to the respective live websites.

## Getting started

Requires Node.js 20 or later.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Contact and social links

Copy `.env.example` to `.env.local`, then add the public contact address and profile URLs:

```env
NEXT_PUBLIC_CONTACT_EMAIL=
NEXT_PUBLIC_INSTAGRAM_URL=
NEXT_PUBLIC_GITHUB_URL=
NEXT_PUBLIC_LINKEDIN_URL=
```

The contact form validates locally and opens a pre-filled email in the visitor's email client; it does not send form data to a server.

## Checks

```bash
npm run lint
npm run typecheck
npm run build
```

## Deployment

Deploy this repository to Vercel using the Next.js framework preset. The production build can also be run locally with `npm run build` and served with `npm run start`.
