export const site = {
  name: "Fadheeluddeen K",
  shortName: "Fadheel",
  brand: "Fadheel.dev",
  title: "AI / ML Engineer",
  roles: ["AI Engineer", "Machine Learning Engineer", "Data Scientist", "Generative AI / NLP Engineer"],
  location: "Chennai, Tamil Nadu",
  email: "trichyfadheel@gmail.com",
  phone: "+91 86674 24522",
  linkedin: "https://www.linkedin.com/in/fadheeluddeen",
  github: "https://github.com/fadheeluddeen",
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
  tagline:
    "Computer Science graduate building AI-driven applications, computer-vision/OCR pipelines and full-stack systems — from GPU pipelines to production dashboards.",
  stats: [
    { value: "2", label: "Internships" },
    { value: "7", label: "Projects shipped" },
    { value: "7.05", label: "CGPA" },
    { value: "2026", label: "B.E. CSE grad" },
  ],
} as const;

export const about = {
  kicker: "About",
  title: "A little about my work.",
  subtitle: "Computer Science graduate targeting AI/ML engineering roles.",
  paragraphs: [
    "Computer Science graduate (B.E., 2026) targeting AI/ML engineering roles, with hands-on experience building AI-driven applications, computer-vision/OCR pipelines, and full-stack systems. Skilled in Python and machine learning with practical exposure to LLMs, generative AI, prompt engineering, and deep learning, backed by full-stack and automation experience across two internships.",
    "Focused on building reliable, end-to-end intelligent systems — from GPU-accelerated OCR pipelines to internal web applications used by real teams.",
  ],
  cards: [
    { icon: "🧠", label: "Focus areas", value: "LLMs · Vision · OCR" },
    { icon: "⌨️", label: "Stack today", value: "Python · React · Firebase" },
    { icon: "🎓", label: "Education", value: "B.E. CSE, 2026 · CGPA 7.05" },
    { icon: "🏆", label: "Leadership", value: "Led 300+ at symposium" },
  ],
} as const;

export const skillGroups = [
  {
    title: "Programming",
    icon: "code",
    tags: ["Python", "SQL", "JavaScript", "C", "C++"],
  },
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
  {
    title: "Databases",
    icon: "database",
    tags: ["MySQL", "PostgreSQL", "MongoDB", "Firebase"],
  },
  {
    title: "DevOps & Tools",
    icon: "terminal",
    tags: ["Git", "GitHub", "Docker", "Linux", "n8n", "CI/CD", "VS Code"],
  },
] as const;

export const experience = {
  kicker: "Experience",
  title: "Where I've worked.",
  subtitle: "Two internships focused on AI pipelines, automation, and full-stack delivery.",
  jobs: [
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
      company: "SolidPro",
      location: "Chennai",
      period: "2 Months",
      bullets: [
        "Built workflow automations using n8n, reducing manual operational tasks; developed a full-stack app with React and Node.js.",
        "Used Python for scripting and backend logic; performed debugging, testing, and iterative improvement on real production workflows.",
      ],
      tags: ["n8n", "Python", "React", "Node.js"],
    },
  ],
  education: [
    {
      school: "K. Ramakrishnan College of Technology",
      detail: "B.E., Computer Science — 2026 · CGPA: 7.05 · Tiruchirappalli",
    },
    {
      school: "Samadh Higher Secondary School",
      detail: "HSC (Mathematics & Science) · Trichy",
    },
  ],
} as const;

export const projects = {
  kicker: "Projects",
  title: "Selected work.",
  subtitle: "Things I've built end-to-end — from GPU pipelines to production dashboards.",
  githubLabel: "All projects on GitHub ↗",
  items: [
    {
      title: "InstrumentSync",
      subtitle: "Field-Instrument Data Automation Platform",
      description:
        "End-to-end system that captures readings from field test instruments for data-centre capacity assessments — pulls data electronically from memory-based instruments, reads display-only meters via GPU-accelerated OCR, and publishes to a live dashboard with Excel/Word report export, eliminating manual data entry.",
      image: `${import.meta.env.BASE_URL}ocr pipelines.jpg`,
      tags: ["Python", "PyTorch", "CUDA", "EasyOCR", "Qwen2.5-VL", "Flask"],
      status: "Completed",
    },
    {
      title: "Personal Portfolio Website",
      subtitle: "Animated, CI/CD-deployed portfolio",
      description:
        "Animated, responsive portfolio deployed on GitHub Pages via a CI/CD pipeline (GitHub Actions), with scroll-driven animations and interactive project showcases.",
      image: `${import.meta.env.BASE_URL}profile.jpeg`,
      tags: ["Vite 7", "React 19", "TypeScript", "Tailwind v4", "shadcn/ui", "GSAP"],
      status: "Live",
    },
    {
      title: "AI-Driven Interactive Interview System",
      subtitle: "Resume-aware mock interviewer",
      description:
        "Simulates interviews from uploaded resumes; generates technical questions and assesses answers with improvement-oriented feedback.",
      image: `${import.meta.env.BASE_URL}project-01-interview.jpg`,
      tags: ["Python", "LLMs", "NLP", "Prompt Engineering"],
      status: "Completed",
    },
    {
      title: "Symptom-Based Medical Diagnosis Tool",
      subtitle: "Preliminary diagnosis assistant",
      description:
        "Predicts possible conditions from user-reported symptoms using decision-tree and rule-based logic for quick preliminary analysis.",
      image: `${import.meta.env.BASE_URL}project-02-medical.jpg`,
      tags: ["Python", "scikit-learn", "Machine Learning"],
      status: "Completed",
    },
    {
      title: "AI-Based UI Generator",
      subtitle: "Prompt-to-layout tool",
      description:
        "Generates UI layouts from textual requirements, translating functional descriptions into React UI components to speed up frontend work.",
      image: `${import.meta.env.BASE_URL}project-03-ui-generator.png`,
      tags: ["JavaScript", "React", "AI Automation"],
      status: "Completed",
    },
    {
      title: "TSPL IT Ticketing Portal",
      subtitle: "Enterprise IT ticketing system",
      description:
        "Internal IT ticketing system with department configuration, role-based access, SLA management, and a Help Center module.",
      image: `${import.meta.env.BASE_URL}project-04-ticketing.jpg`,
      tags: ["React 19", "TypeScript", "Vite", "Firebase"],
      status: "Completed",
    },
    {
      title: "Claude Counter Desktop",
      subtitle: "Open-source Electron app",
      description:
        "Electron desktop app wrapping claude.ai with injected usage-counter scripts; resolved a Node v24 install issue and shipped a Windows installer on GitHub (MIT).",
      image: `${import.meta.env.BASE_URL}project-05-claude.jpeg`,
      tags: ["Electron", "Node.js", "JavaScript", "pnpm"],
      status: "Open Source",
    },
    {
      title: "Microcontroller Display System",
      subtitle: "I2C embedded hardware",
      description:
        "I2C-based hardware display assembly with embedded firmware, handled circuit assembly, soldering, and hardware/software debugging for reliable output.",
      image: `${import.meta.env.BASE_URL}project-06-microcontroller.jpg`,
      tags: ["C", "C++", "Embedded", "I2C"],
      status: "Completed",
    },
  ],
} as const;

export const certifications = {
  kicker: "Certifications & Learning",
  title: "Always learning something.",
  subtitle: "Coursework, workshops, and certifications in progress.",
  items: [
    { title: "Mathematics for Machine Learning and Data Science", org: "Coursera", icon: "functions" },
    { title: "Supervised Machine Learning: Regression and Classification", org: "Coursera", icon: "model_training" },
    { title: "Deep Learning & Neural Networks", org: "Coursera", icon: "hub" },
    { title: "Introduction to MongoDB", org: "MongoDB University", icon: "database" },
  ],
  inProgress: ["Claude AI (Anthropic) certification course", "Microsoft Azure Cloud AI", "Google Cloud"],
  achievements: [
    "Team Lead — National-Level Technical Symposium, led a 300+ participant event (speakers, logistics, coordination).",
    "AI & ML Hackathon participant.",
  ],
} as const;

export const contact = {
  kicker: "Contact",
  title: "Let's build something.",
  subtitle: "Open to AI/ML engineering roles. Reach out on any of these channels.",
} as const;
