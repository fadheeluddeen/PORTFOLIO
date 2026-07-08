import { useEffect } from "react";
import { Toaster } from "sonner";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Suspense, lazy } from "react";
import { AuroraBackground } from "@/components/aurora-background";
import { BackToTop } from "@/components/back-to-top";
import { ScrollProgress } from "@/components/scroll-progress";
import { SpotlightCursor } from "@/components/spotlight-cursor";
import { Header } from "@/components/layout/header";
import { HeroSection } from "@/components/sections/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { ExperienceSection } from "@/components/sections/experience-section";

const ProjectsSection = lazy(() => import("@/components/sections/projects-section").then((m) => ({ default: m.ProjectsSection })));
const TestimonialsSection = lazy(() => import("@/components/sections/testimonials-section").then((m) => ({ default: m.TestimonialsSection })));
const BlogSection = lazy(() => import("@/components/sections/blog-section").then((m) => ({ default: m.BlogSection })));
const ContactSection = lazy(() => import("@/components/sections/contact-section").then((m) => ({ default: m.ContactSection })));
const Footer = lazy(() => import("@/components/layout/footer").then((m) => ({ default: m.Footer })));

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  useEffect(() => {
    ScrollTrigger.refresh();
    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="dark min-h-screen">
      <AuroraBackground variant="ambient" />
      <SpotlightCursor />
      <ScrollProgress />
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <Suspense fallback={<div className="h-96 flex items-center justify-center text-muted-foreground">Loading...</div>}>
          <ProjectsSection />
          <TestimonialsSection />
          <BlogSection />
          <ContactSection />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
      <BackToTop />
      <Toaster position="bottom-center" richColors />
    </div>
  );
}
