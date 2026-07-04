export const site = {
  name: "Fadheeluddeen K",
  shortName: "Fadheel",
  brand: "Fadheel.dev",
  title: "AI / ML Engineer",
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
  { href: "#blog", label: "Blog" },
  { href: "#testimonials", label: "Voices" },
  { href: "#contact", label: "Contact" },
] as const;

export const hero = {
  kicker: "Portfolio · Chapter 01",
  headline: "Hi, I'm Fadheel.",
  highlight: "I build AI that actually ships.",
  tagline:
    "Crafting AI-driven applications, vision pipelines and full-stack systems — one panel at a time.",
  caption: {
    title: "currently shipping",
    subtitle: "OCR + LLM pipelines",
  },
  badge: "Now hiring (me!)",
  floatBadge: {
    primary: "B.E. CSE · 2026",
    secondary: "AI / ML Engineer",
  },
  stats: [
    { value: "2", label: "Internships" },
    { value: "6+", label: "Projects shipped" },
    { value: "7.05", label: "CGPA" },
    { value: "AI / ML", label: "Specializing in" },
  ],
} as const;

export const about = {
  kicker: "Chapter · About",
  title: "A small, loud intro — 一人称.",
  subtitle: "Quick character sheet. Stats, story arc, and the things I lose sleep over.",
  paragraphs: [
    "Computer Science graduate (B.E., 2026) targeting AI/ML engineering roles. I build AI-driven applications, computer-vision/OCR pipelines, and full-stack systems. Comfortable across Python, machine learning, LLMs, generative AI and prompt engineering, with hands-on internship experience in automation and full-stack development.",
    "I like the unglamorous parts of AI — labeling data at 2am, debugging CUDA errors, writing pipelines that won't break when a colleague pushes a sloppy commit. I think great engineering looks suspiciously like good storytelling: clear panels, consistent characters, no plot holes.",
  ],
  cards: [
    { icon: "🔥", label: "What I love", value: "LLMs · Vision · Agents" },
    { icon: "⌨", label: "Stack today", value: "Python · React · Mongo" },
    { icon: "☕", label: "Fuel", value: "Filter coffee, mostly" },
    { icon: "🏆", label: "Recent win", value: "Led 300+ at symposium" },
  ],
  achievements: [
    "Team Lead — National-Level Technical Symposium (300+ participants).",
    "AI & ML Hackathon participant.",
  ],
} as const;

export const marqueeSkills = [
  "Python",
  "Machine Learning",
  "PyTorch",
  "LLMs",
  "React.js",
  "Computer Vision",
  "Node.js",
  "EasyOCR",
  "SQL",
  "Hugging Face",
  "Docker",
  "TensorFlow",
  "Firebase",
  "Prompt Engineering",
  "Git",
  "MongoDB",
  "n8n",
  "Power BI",
] as const;

export const skillGroups = [
  {
    title: "Languages",
    tags: ["Python", "SQL", "JavaScript", "C", "C++"],
  },
  {
    title: "AI / ML",
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
    tags: [
      "PyTorch",
      "TensorFlow",
      "scikit-learn",
      "NumPy",
      "Pandas",
      "Matplotlib",
      "OpenCV",
      "EasyOCR",
      "Hugging Face",
    ],
  },
  {
    title: "Data & Visualization",
    tags: ["Power BI", "Excel", "SQL", "Data Analysis", "Dashboards"],
  },
  {
    title: "Web & Backend",
    tags: ["React.js", "Node.js", "Express.js", "REST APIs", "HTML5", "CSS3"],
  },
  {
    title: "Databases",
    tags: ["MySQL", "PostgreSQL", "MongoDB", "Firebase"],
  },
  {
    title: "DevOps & Tools",
    tags: ["Git", "GitHub", "Docker", "Linux", "n8n", "CI/CD", "VS Code"],
  },
] as const;

export const experience = {
  kicker: "Chapter · Arc",
  title: "Story so far — the arcs.",
  subtitle:
    "Two internships, a handful of student projects, and one obsession that won't quit: making AI useful.",
  jobs: [
    {
      role: "Engineer Intern",
      company: "Technavious",
      location: "Chennai",
      period: "May 2026 — Present",
      bullets: [
        "Developing an OCR / computer-vision pipeline for the SensorSync O&M platform with PyTorch, CUDA, EasyOCR and Qwen2.5-VL.",
        "Administering the dcist-user-ui GitHub repository — Git Flow strategy and contributor management.",
        "Contributing to internal web application development using React, TypeScript and Firebase.",
      ],
      tags: ["PyTorch", "EasyOCR", "Qwen2.5-VL", "React", "Firebase"],
    },
    {
      role: "Software & Automation Intern",
      company: "SolidPro",
      location: "Chennai",
      period: "2 Months",
      bullets: [
        "Built workflow automations using n8n to reduce manual operational tasks.",
        "Developed a full-stack application using React and Node.js.",
        "Performed scripting, debugging and testing on production workflows with Python.",
      ],
      tags: ["n8n", "Python", "React", "Node.js"],
    },
  ],
  education: [
    {
      school: "K. Ramakrishnan College of Technology",
      detail: "B.E. Computer Science — 2026\nCGPA: 7.05 · Tiruchirappalli",
    },
    {
      school: "Samadh Higher Secondary School",
      detail:
        "HSC — Mathematics & Science · Trichy\nFoundation in Math, Physics and Computer Science.",
    },
  ],
  certifications: [
    "Mathematics for ML and Data Science",
    "Supervised Machine Learning",
    "Deep Learning & Neural Networks",
    "Introduction to MongoDB",
    "Google Cloud — in progress",
  ],
} as const;

export const projects = {
  kicker: "Chapter · Works",
  title: "Selected projects — six panels.",
  subtitle: "Things I built end-to-end, mostly at midnight, often for fun.",
  githubLabel: "All on GitHub ↗",
  items: [
    {
      panel: "#01 — Panel",
      title: "AI-Driven Interactive Interview System",
      description:
        "Resume-aware interview simulator that asks contextual questions and gives constructive feedback.",
      image:
        `${import.meta.env.BASE_URL}projects/interview.svg`,
      tags: ["Python", "LLMs", "NLP", "Prompt Engineering"],
    },
    {
      panel: "#02 — Panel",
      title: "Symptom-Based Medical Diagnosis Tool",
      description:
        "Lightweight rule + ML system that predicts likely medical conditions from symptom inputs.",
      image:
        `${import.meta.env.BASE_URL}projects/medical.svg`,
      tags: ["Python", "scikit-learn", "Decision Trees"],
    },
    {
      panel: "#03 — Panel",
      title: "AI-Based UI Generator",
      description:
        "Generates clean React UI layouts from natural-language prompts — design at the speed of thought.",
      image:
        `${import.meta.env.BASE_URL}projects/uigen.svg`,
      tags: ["JavaScript", "React", "AI Automation"],
    },
    {
      panel: "#04 — Panel",
      title: "TSPL IT Ticketing Portal",
      description:
        "Role-based IT ticketing system with a help-center module, built for an enterprise workflow.",
      image:
        `${import.meta.env.BASE_URL}projects/ticketing.svg`,
      tags: ["React 19", "TypeScript", "Vite", "Firebase"],
    },
    {
      panel: "#05 — Panel",
      title: "Claude Counter Desktop",
      description:
        "Open-source Electron app wrapping claude.ai with live usage tracking and quota awareness.",
      image:
        `${import.meta.env.BASE_URL}projects/counter.svg`,
      tags: ["Electron", "Node.js", "JavaScript", "pnpm"],
    },
    {
      panel: "#06 — Panel",
      title: "Microcontroller Display System",
      description:
        "I2C-based hardware display assembly with embedded firmware — bare-metal precision.",
      image:
        `${import.meta.env.BASE_URL}projects/microcontroller.svg`,
      tags: ["C", "C++", "Embedded", "I2C"],
    },
  ],
} as const;

export const testimonials = {
  kicker: "Chapter · Voices",
  title: "Kind words from the supporting cast.",
  subtitle: "Mentors, leads and teammates I've worked with.",
  items: [
    {
      quote:
        "Fadheel ships fast and asks the right questions. His OCR pipeline cut our manual review time in half — and he documented every panel of the work.",
      name: "Engineering Lead",
      role: "Technavious",
      initial: "E",
    },
    {
      quote:
        "Rare combination of curiosity and discipline. He picks up new ML tooling overnight and still writes clean, reviewable code.",
      name: "Senior Mentor",
      role: "AI/ML Bootcamp",
      initial: "S",
    },
    {
      quote:
        "From n8n workflows to full-stack features — he was the intern we counted on when timelines were tight.",
      name: "Team Lead",
      role: "SolidPro",
      initial: "T",
    },
  ],
} as const;

export const blog = {
  kicker: "Chapter · Notes",
  title: "Field notes — from the dojo.",
  subtitle: "Short essays about AI, engineering and the messy in-between.",
  posts: [
    {
      category: "Computer Vision",
      title: "Building OCR Pipelines That Actually Survive Production",
      excerpt:
        "Notes from shipping an EasyOCR + Qwen2.5-VL pipeline — what works, what breaks, and what no tutorial tells you.",
      readTime: "6 min read",
      image:
        "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=900&q=70",
    },
    {
      category: "LLMs",
      title: "Prompt Engineering Is Software Engineering",
      excerpt:
        "A pragmatic framework for designing prompts the same way you design APIs — versioned, tested, observable.",
      readTime: "8 min read",
      image:
        "https://images.unsplash.com/photo-1655720828018-edd2daec9349?auto=format&fit=crop&w=900&q=70",
    },
    {
      category: "Machine Learning",
      title: "From scikit-learn to PyTorch: A Beginner's Bridge",
      excerpt:
        "If classical ML is your home base, here's the smallest possible path to feeling at home in deep learning.",
      readTime: "5 min read",
      image:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=70",
    },
  ],
} as const;

export const contact = {
  kicker: "Chapter · Final Panel",
  title: "Let's build — something.",
  subtitle: "No forms, no funnels. Pick the channel that works for you, tap to copy, and say hi.",
} as const;
