import { useState, useEffect, useRef } from "react";
import { Copy, Check, Mail, Phone, Linkedin, Github, ArrowUpRight } from "lucide-react";
import { toast } from "sonner";
import { contact, site } from "@/data/portfolio";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const channels = [
  { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}`, copy: true, color: "oklch(0.65 0.20 15)" },
  {
    icon: Phone,
    label: "Phone",
    value: site.phone,
    href: `tel:${site.phone.replace(/\s/g, "")}`,
    copy: true,
    color: "oklch(0.60 0.20 280)"
  },
  { icon: Linkedin, label: "LinkedIn", value: "Connect", href: site.linkedin, copy: false, color: "oklch(0.60 0.15 250)" },
  { icon: Github, label: "GitHub", value: "View Profile", href: site.github, copy: false, color: "var(--foreground)" },
];

export function ContactSection() {
  const [copied, setCopied] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      // Animate the main headline
      gsap.fromTo(
        ".contact-headline",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-headline",
            start: "top 85%",
          }
        }
      );

      // Bounce in the channel pills
      gsap.fromTo(
        ".contact-pill",
        { scale: 0.8, opacity: 0, y: 20 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: ".contact-grid",
            start: "top 85%",
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleCopy = async (text: string, label: string, e: React.MouseEvent) => {
    e.preventDefault();
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
    <section ref={containerRef} id="contact" className="relative py-24 bg-transparent overflow-hidden w-full shrink-0 border-t border-border/50">

      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-3xl px-6 relative z-10 text-center">

        <div className="contact-headline mb-12">
          <span className="inline-block px-3 py-1 mb-6 rounded-full bg-surface-secondary text-primary font-bold text-xs tracking-widest uppercase border border-border shadow-sm">
            {contact.kicker}
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-foreground drop-shadow-sm mb-4">
            Let's build something <span className="text-3d italic pe-2">great</span>.
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            I'm currently open for new opportunities. Whether it's a question, a project idea, or just saying hi — I'd love to hear from you.
          </p>
        </div>

        {/* Contact Links Grid */}
        <div className="contact-grid flex flex-wrap justify-center gap-4 md:gap-6">
          {channels.map((channel) => {
            const Icon = channel.icon;
            return (
              <a
                key={channel.label}
                href={channel.href}
                target={channel.href.startsWith("http") ? "_blank" : undefined}
                rel={channel.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="contact-pill group relative flex items-center gap-3 p-2 pr-4 rounded-full bg-card shadow-md border border-border hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                onClick={channel.copy ? (e) => handleCopy(channel.value, channel.label, e) : undefined}
              >
                {/* Icon Circle */}
                <span
                  className="flex size-10 shrink-0 items-center justify-center rounded-full text-white shadow-inner transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
                  style={{ backgroundColor: channel.color }}
                >
                  {channel.copy && copied === channel.label ? (
                    <Check className="size-4" />
                  ) : (
                    <Icon className="size-4" />
                  )}
                </span>

                {/* Text Group */}
                <div className="flex flex-col items-start pr-2">
                  <span className="text-[0.65rem] font-bold tracking-widest uppercase text-muted-foreground group-hover:text-foreground transition-colors">
                    {channel.label}
                  </span>
                  <span className="text-sm font-semibold text-foreground">
                    {channel.copy && copied === channel.label ? "Copied!" : channel.value}
                  </span>
                </div>

                {/* Optional copy/link indicator icon */}
                {!channel.copy && (
                  <ArrowUpRight className="size-4 text-muted-foreground opacity-50 group-hover:opacity-100 transition-opacity absolute right-4 hidden sm:block" />
                )}
                {channel.copy && copied !== channel.label && (
                  <Copy className="size-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity absolute right-4 hidden sm:block" />
                )}
              </a>
            );
          })}
        </div>

      </div>
    </section>
  );
}
