/**
 * SINGLE SOURCE OF TRUTH for everything resume-related.
 *
 * - The live website (portfolio.ts re-exports + decorates this data)
 * - The downloadable PDF (scripts/generate-resume.tsx renders this data)
 *
 * both read from this file. Add a project, tweak a bullet, update a skill —
 * edit it ONCE here, and both the site and the PDF pick it up on the next
 * `npm run build` (which happens automatically on every push via
 * .github/workflows/deploy.yml).
 *
 * No import.meta / Vite-only syntax in this file — it has to be importable
 * from plain Node (the resume-generation script) as well as from the app.
 */

export const profile = {
  name: "Fadheeluddeen K",
  shortName: "Fadheel",
  title: "AI / ML Engineer",
  roles: ["AI Engineer", "Machine Learning Engineer", "Data Scientist", "Generative AI / NLP Engineer"],
  location: "Chennai, Tamil Nadu",
  email: "trichyfadheel@gmail.com",
  phone: "+91 86674 24522",
  linkedin: "https://www.linkedin.com/in/fadheeluddeen",
  github: "https://github.com/fadheeluddeen",
} as const;

export const summary =
  "Computer Science graduate (B.E., 2026) targeting AI/ML engineering roles, with hands-on experience building AI-driven applications, computer-vision/OCR pipelines, and full-stack systems. Skilled in Python and machine learning with practical exposure to LLMs, generative AI, prompt engineering, and deep learning, backed by full-stack and automation experience across two internships. Focused on building reliable, end-to-end intelligent systems.";

export const skillGroups = [
  { title: "Programming", icon: "code", tags: ["Python", "SQL", "JavaScript", "C", "C++"] },
  {
    title: "AI / ML",
    icon: "psychology",
    tags: [
      "Machine Learning",
      "Deep Learning",
      "Neural Networks",
      "NLP",
      "Computer Vision",
      "Generative AI",
      "LLMs",
      "Prompt Engineering",
    ],
  },
  {
    title: "ML Libraries & Tools",
    icon: "auto_awesome",
    tags: ["PyTorch", "TensorFlow", "scikit-learn", "NumPy", "Pandas", "Matplotlib", "OpenCV", "EasyOCR", "Hugging Face"],
  },
  {
    title: "Data & Visualization",
    icon: "insights",
    tags: ["Power BI", "Excel", "SQL", "Data Analysis", "Dashboards"],
  },
  {
    title: "Web & Backend",
    icon: "dns",
    tags: ["React.js", "Node.js", "Express.js", "REST APIs", "HTML5", "CSS3"],
  },
  { title: "Databases", icon: "database", tags: ["MySQL", "PostgreSQL", "MongoDB", "Firebase"] },
  {
    title: "DevOps & Tools",
    icon: "terminal",
    tags: ["Git", "GitHub", "Docker", "Linux", "n8n", "CI/CD", "VS Code"],
  },
] as const;

export const jobs = [
  {
    role: "Engineer Intern",
    company: "Technavious",
    location: "Chennai",
    period: "May 2026 — Present",
    bullets: [
      "Developing an OCR / computer-vision pipeline for the SensorSync O&M platform — set up PyTorch with CUDA and evaluated OCR models (EasyOCR, Qwen2.5-VL) to automate reading extraction from instrument displays.",
      "Administered the dcist-user-ui GitHub repository — configured a Git Flow branching model and managed contributor access.",
      "Contributing to internal web-application development with React, TypeScript, and Firebase, including debugging, testing, and feature delivery alongside the team.",
    ],
    tags: ["PyTorch", "CUDA", "EasyOCR", "Qwen2.5-VL", "React", "Firebase"],
  },
  {
    role: "Software & Automation Intern",
    company: "SolidPro Engineering Support",
    location: "Chennai",
    period: "Sep 2025 — Nov 2025",
    bullets: [
      "Skill-oriented internship in the Digital Transformation department — built workflow automations using n8n, reducing manual operational tasks; developed a full-stack app with React and Node.js.",
      "Used Python for scripting and backend logic; performed debugging, testing, and iterative improvement on real production workflows.",
      "Completed with an overall intern evaluation score of 8/10, rated 'Superior' on learning appetite.",
    ],
    tags: ["n8n", "Python", "React", "Node.js"],
  },
] as const;

export const education = [
  {
    school: "K. Ramakrishnan College of Technology",
    detail: "B.E., Computer Science — 2026 · CGPA: 7.05 · Tiruchirappalli",
  },
  { school: "Samadh Higher Secondary School", detail: "HSC (Mathematics & Science) · Trichy" },
] as const;

/**
 * Add a new project by adding an object to this array — that's the whole
 * workflow. `image` is just a filename that must exist in /public.
 * Leave it as "" if you don't have an image yet (the card will skip it).
 */
export const projectList = [
  {
    title: "InstrumentSync",
    subtitle: "Field-Instrument Data Automation Platform",
    description:
      "End-to-end system that captures readings from field test instruments for data-centre capacity assessments — pulls data electronically from memory-based instruments, reads display-only meters via GPU-accelerated OCR, and publishes to a live dashboard with Excel/Word report export, eliminating manual data entry.",
    image: "ocr pipelines.jpg",
    tags: ["Python", "PyTorch", "CUDA", "EasyOCR", "Qwen2.5-VL", "Flask"],
    status: "Completed",
  },
  {
    title: "Personal Portfolio Website",
    subtitle: "Animated, CI/CD-deployed portfolio",
    description:
      "Animated, responsive portfolio deployed on GitHub Pages via a CI/CD pipeline (GitHub Actions), with scroll-driven animations and interactive project showcases.",
    image: "profile.jpeg",
    tags: ["Vite 7", "React 19", "TypeScript", "Tailwind v4", "shadcn/ui", "GSAP"],
    status: "Live",
  },
  {
    title: "AI-Driven Interactive Interview System",
    subtitle: "Resume-aware mock interviewer",
    description:
      "Simulates interviews from uploaded resumes; generates technical questions and assesses answers with improvement-oriented feedback.",
    image: "project-01-interview.jpg",
    tags: ["Python", "LLMs", "NLP", "Prompt Engineering"],
    status: "Completed",
  },
  {
    title: "Symptom-Based Medical Diagnosis Tool",
    subtitle: "Preliminary diagnosis assistant",
    description:
      "Predicts possible conditions from user-reported symptoms using decision-tree and rule-based logic for quick preliminary analysis.",
    image: "project-02-medical.jpg",
    tags: ["Python", "scikit-learn", "Machine Learning"],
    status: "Completed",
  },
  {
    title: "AI-Based UI Generator",
    subtitle: "Prompt-to-layout tool",
    description:
      "Generates UI layouts from textual requirements, translating functional descriptions into React UI components to speed up frontend work.",
    image: "project-03-ui-generator.png",
    tags: ["JavaScript", "React", "AI Automation"],
    status: "Completed",
  },
  {
    title: "TSPL IT Ticketing Portal",
    subtitle: "Enterprise IT ticketing system",
    description:
      "Internal IT ticketing system with department configuration, role-based access, SLA management, and a Help Center module.",
    image: "project-04-ticketing.jpg",
    tags: ["React 19", "TypeScript", "Vite", "Firebase"],
    status: "Completed",
  },
  {
    title: "Claude Counter Desktop",
    subtitle: "Open-source Electron app",
    description:
      "Electron desktop app wrapping claude.ai with injected usage-counter scripts; resolved a Node v24 install issue and shipped a Windows installer on GitHub (MIT).",
    image: "project-05-claude.jpeg",
    tags: ["Electron", "Node.js", "JavaScript", "pnpm"],
    status: "Open Source",
  },
  {
    title: "Microcontroller Display System",
    subtitle: "I2C embedded hardware",
    description:
      "I2C-based hardware display assembly with embedded firmware, handled circuit assembly, soldering, and hardware/software debugging for reliable output.",
    image: "project-06-microcontroller.jpg",
    tags: ["C", "C++", "Embedded", "I2C"],
    status: "Completed",
  },
] as const;

/**
 * Certifications & credentials. Items with an `image` (a filename in /public)
 * render as scanned-certificate cards in the website gallery; the rest show as
 * text-only coursework. `featured: true` pins a credential to the front of the
 * gallery. The `image`/`featured`/`year` fields are website-only — the PDF just
 * reads `title` + `org`.
 */
export const certificationItems = [
  {
    title: "AI & ML Hackathon — 1st Place Winner",
    org: "Techgyan · IIT Madras",
    year: "2025",
    image: "cert-hackathon-winner.jpg",
    featured: true,
  },
  {
    title: "National Conference — Paper Presentation",
    org: "Nandha College of Technology",
    year: "2026",
    image: "cert-conference.jpg",
    featured: true,
  },
  {
    title: "Artificial Intelligence & Machine Learning Workshop",
    org: "Techgyan · IIT Madras",
    year: "2025",
    image: "cert-aiml-workshop.jpg",
  },
  {
    title: "Artificial Intelligence Workshop",
    org: "Techgyan · IIT Madras",
    year: "2025",
    image: "cert-ai-workshop.jpg",
  },
  {
    title: "AI & ML Hackathon — Participant",
    org: "Techgyan · IIT Madras",
    year: "2025",
    image: "cert-hackathon.jpg",
  },
  {
    title: "Introduction to MongoDB",
    org: "MongoDB University",
    year: "2024",
    image: "cert-mongodb.png",
  },
  {
    title: "Software & Automation Internship",
    org: "SolidPro Engineering Support",
    year: "2025",
    image: "cert-solidpro.png",
  },
  { title: "Mathematics for Machine Learning and Data Science", org: "Coursera" },
  { title: "Supervised Machine Learning: Regression and Classification", org: "Coursera" },
  { title: "Deep Learning & Neural Networks", org: "Coursera" },
] as const;

export const certificationsInProgress = [
  "Claude AI (Anthropic) certification course",
  "Microsoft Azure Cloud AI",
  "Google Cloud",
] as const;

export const achievements = [
  "1st Place — AI & ML Hackathon, Techgyan @ IIT Madras (Apr 2025).",
  'Presented the paper "Computer Vision-Based Intelligent Crowd Anomaly Detection System" at the 9th National-Level Conference on Modern Trends in Engineering & Technological Sciences, Nandha College of Technology (Mar 2026).',
  "Team Lead — National-Level Technical Symposium, led a 300+ participant event (speakers, logistics, coordination).",
  "Completed AI & ML workshops at IIT Madras (Techgyan, Apr 2025).",
] as const;
