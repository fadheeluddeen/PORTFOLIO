import { Suspense, lazy } from "react";
import { Toaster } from "sonner";

import { ScrollProgress } from "@/components/scroll-progress";
import { HeroSection } from "@/components/sections/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { FishBackground } from "@/components/FishBackground";

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

export default function App() {
  return (
    <div className="bg-transparent min-h-dvh">
      <FishBackground />
      <ScrollProgress />

      <div className="w-full flex-col overflow-x-hidden relative z-10 bg-transparent">
        <HeroSection />

        <div className="w-full flex-col sm:px-12 px-4 py-8 lg:px-24">
          <div className="mb-24 mt-12" id="about">
            <AboutSection />
          </div>

          <div className="mb-24" id="skills">
            <SkillsSection />
          </div>

          <div className="mb-24" id="experience">
            <ExperienceSection />
          </div>

          <div className="mb-24" id="projects">
            <Suspense
              fallback={
                <div className="text-muted-foreground flex h-96 items-center justify-center">
                  Loading...
                </div>
              }
            >
              <ProjectsSection />
            </Suspense>
          </div>

          <div className="mb-24" id="certifications">
            <Suspense fallback={null}>
              <CertificationsSection />
            </Suspense>
          </div>

          <div className="pb-32" id="contact">
            <Suspense fallback={null}>
              <ContactSection />
            </Suspense>
          </div>
        </div>
      </div>

      <Toaster position="bottom-center" richColors />
    </div>
  );
}
