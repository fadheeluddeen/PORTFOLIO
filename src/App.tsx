import { useEffect, Suspense, lazy } from "react";
import { Toaster } from "sonner";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { BackToTop } from "@/components/back-to-top";
import { ScrollProgress } from "@/components/scroll-progress";
import { Header } from "@/components/layout/header";
import { HeroSection } from "@/components/sections/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { ExperienceSection } from "@/components/sections/experience-section";

const ProjectsSection = lazy(() =>
  import("@/components/sections/projects-section").then((m) => ({ default: m.ProjectsSection })),
);
const CertificationsSection = lazy(() =>
  import("@/components/sections/certifications-section").then((m) => ({
    default: m.CertificationsSection,
  })),
);
const ContactSection = lazy(() =>
  import("@/components/sections/contact-section").then((m) => ({ default: m.ContactSection })),
);
const Footer = lazy(() =>
  import("@/components/layout/footer").then((m) => ({ default: m.Footer })),
);

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  useEffect(() => {
    ScrollTrigger.refresh();
    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="bg-background min-h-screen">
      <ScrollProgress />
      <Header />
      <main className="overflow-x-clip">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <Suspense
          fallback={
            <div className="text-muted-foreground flex h-96 items-center justify-center">
              Loading...
            </div>
          }
        >
          <ProjectsSection />
          <CertificationsSection />
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
