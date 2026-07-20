/**
 * Website-only presentation layer. All real content lives in
 * `resume-data.ts` (the single source of truth shared with the PDF
 * generator). This file just re-shapes it for the components + adds
 * things that only make sense on the website (nav links, hero copy,
 * asset URL prefixing via import.meta.env.BASE_URL).
 */
import {
  profile,
  summary,
  skillGroups as skillGroupsData,
  jobs,
  education,
  projectList,
  certificationItems,
  certificationsInProgress,
  achievements,
} from "./resume-data";

export const site = {
  ...profile,
  resumePath: `${import.meta.env.BASE_URL}Fadheeluddeen_Resume.pdf`,
  profilePath: `${import.meta.env.BASE_URL}profile.jpeg`,
} as const;

export const navLinks = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#certifications", label: "Certifications" },
  { href: "#contact", label: "Contact" },
] as const;

export const hero = {
  kicker: "AI / ML Engineer · Chennai",
  headline: "Build your systems with",
  highlight: "AI-Guided Precision.",
  tagline: summary,
  stats: [
    { value: "2", label: "Internships" },
    { value: String(projectList.length), label: "Projects shipped" },
    { value: "7.05", label: "CGPA" },
    { value: "2026", label: "B.E. CSE grad" },
  ],
} as const;

export const about = {
  kicker: "About",
  title: "A little about my work.",
  subtitle: "Computer Science graduate targeting AI/ML engineering roles.",
  paragraphs: [
    summary,
    "Focused on building reliable, end-to-end intelligent systems — from GPU-accelerated OCR pipelines to internal web applications used by real teams.",
  ],
  cards: [
    { icon: "🧠", label: "Focus areas", value: "LLMs · Vision · OCR" },
    { icon: "⌨️", label: "Stack today", value: "Python · React · Firebase" },
    { icon: "🎓", label: "Education", value: "B.E. CSE, 2026 · CGPA 7.05" },
    { icon: "🏆", label: "Leadership", value: "Led 300+ at symposium" },
  ],
} as const;

export const skillGroups = skillGroupsData;

export const experience = {
  kicker: "Experience",
  title: "Where I've worked.",
  subtitle: "Two internships focused on AI pipelines, automation, and full-stack delivery.",
  jobs,
  education,
} as const;

export const projects = {
  kicker: "Projects",
  title: "Selected work.",
  subtitle: "Things I've built end-to-end — from GPU pipelines to production dashboards.",
  githubLabel: "All projects on GitHub ↗",
  items: projectList.map((p) => ({
    ...p,
    image: p.image
      ? `${import.meta.env.BASE_URL}${encodeURIComponent(p.image)}`
      : `${import.meta.env.BASE_URL}profile.jpeg`,
  })),
} as const;

export const certifications = {
  kicker: "Certifications & Learning",
  title: "Always learning something.",
  subtitle: "Workshops, competitions, and coursework — with the credentials to back them up.",
  items: certificationItems.map((c) => ({
    title: c.title,
    org: c.org,
    year: "year" in c ? c.year : "",
    featured: "featured" in c ? c.featured : false,
    image:
      "image" in c && c.image
        ? `${import.meta.env.BASE_URL}${encodeURIComponent(c.image)}`
        : "",
  })),
  inProgress: certificationsInProgress,
  achievements,
} as const;

export const contact = {
  kicker: "Contact",
  title: "Let's build something.",
  subtitle: "Open to AI/ML engineering roles. Reach out on any of these channels.",
} as const;
