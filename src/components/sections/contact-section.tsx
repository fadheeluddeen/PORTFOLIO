import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Copy, Check, Mail, Phone, Linkedin, Github, ArrowUpRight } from "lucide-react";
import { toast } from "sonner";

import { AuroraBackground } from "@/components/aurora-background";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Magnetic } from "@/components/magnetic";
import { SectionHeader, SectionShell } from "@/components/layout/section-shell";
import { contact, site } from "@/data/portfolio";

gsap.registerPlugin(ScrollTrigger);

const channels = [
  { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
  { icon: Phone, label: "Phone", value: site.phone, href: `tel:${site.phone.replace(/\s/g, "")}` },
  { icon: Linkedin, label: "LinkedIn", value: "Connect", href: site.linkedin },
  { icon: Github, label: "GitHub", value: "View profile", href: site.github },
];

export function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.children,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.4)",
            scrollTrigger: { trigger: cardsRef.current, start: "top 85%", toggleActions: "play none none reverse" },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const handleCopy = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(label);
      toast.success(`${label} copied to clipboard`);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      toast.error("Failed to copy");
    }
  };

  return (
    <SectionShell id="contact">
      <SectionHeader kicker={contact.kicker} title={contact.title} subtitle={contact.subtitle} />

      <div className="glow-border relative mb-10 overflow-hidden rounded-2xl border p-8 md:p-12">
        <AuroraBackground variant="hero" className="rounded-2xl opacity-70" />
        <div className="relative z-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div className="space-y-2">
            <h3 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
              Have an idea that needs shipping?
            </h3>
            <p className="text-muted-foreground max-w-md">
              I reply fast, prototype faster, and I'm currently open to AI/ML roles and freelance builds.
            </p>
          </div>
          <Magnetic strength={0.45}>
            <Button asChild size="lg" className="shadow-primary/30 rounded-full px-8 shadow-lg">
              <a href={`mailto:${site.email}`}>
                Say hello <ArrowUpRight />
              </a>
            </Button>
          </Magnetic>
        </div>
      </div>

      <div ref={cardsRef} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {channels.map((channel) => (
          <Card key={channel.label} className="group shadow-none transition-all duration-300 hover:border-primary/50">
            <CardContent className="flex items-center justify-between p-4">
              <a
                href={channel.href}
                target={channel.href.startsWith("http") ? "_blank" : undefined}
                rel={channel.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="flex items-center gap-3"
              >
                <div className="bg-primary/10 flex size-10 items-center justify-center rounded-lg transition-colors group-hover:bg-primary/20">
                  <channel.icon className="text-primary size-5" />
                </div>
                <div>
                  <p className="text-muted-foreground text-xs font-medium uppercase tracking-wider">{channel.label}</p>
                  <p className="font-semibold">{channel.value}</p>
                </div>
              </a>
              {channel.label !== "LinkedIn" && channel.label !== "GitHub" && (
                <Button variant="ghost" size="icon" className="size-8" onClick={() => handleCopy(channel.value, channel.label)}>
                  {copied === channel.label ? <Check className="text-green-500 size-4" /> : <Copy className="size-4" />}
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </SectionShell>
  );
}
