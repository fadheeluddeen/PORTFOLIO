import { useState } from "react";
import { Copy, Check, Mail, Phone, Linkedin, Github, ArrowUpRight, Terminal as TerminalIcon } from "lucide-react";
import { toast } from "sonner";
import { contact, site } from "@/data/portfolio";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const channels = [
  { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}`, copy: true },
  {
    icon: Phone,
    label: "Phone",
    value: site.phone,
    href: `tel:${site.phone.replace(/\s/g, "")}`,
    copy: true,
  },
  { icon: Linkedin, label: "LinkedIn", value: "Connect", href: site.linkedin, copy: false },
  { icon: Github, label: "GitHub", value: "View Profile", href: site.github, copy: false },
];

export function ContactSection() {
  const [copied, setCopied] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".command-center",
        { y: 50, opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
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
    <section ref={containerRef} id="contact" className="relative py-32 md:py-48 bg-foreground overflow-hidden z-10 w-full shrink-0">

      {/* Dark Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-primary/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="mx-auto max-w-4xl px-6 relative z-10">

        {/* Floating Command Center */}
        <div className="command-center relative p-[1px] rounded-[3rem] bg-gradient-to-b from-white/10 to-transparent shadow-[0_0_80px_rgba(0,0,0,0.5)]">
          <div className="relative bg-background/5 backdrop-blur-3xl rounded-[calc(3rem-1px)] p-8 md:p-14 lg:p-16 border border-white/5 flex flex-col md:flex-row items-center justify-between gap-12 overflow-hidden">

            {/* Inner glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

            {/* Left: Copy & Actions */}
            <div className="w-full md:w-1/2 relative z-10 flex flex-col">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 w-fit mb-8">
                <TerminalIcon className="size-4 text-primary" />
                <span className="text-secondary tracking-widest text-xs font-bold uppercase">
                  {contact.kicker}
                </span>
              </div>

              <h2 className="font-display text-4xl lg:text-5xl font-bold tracking-tight text-background leading-tight mb-4 drop-shadow-md">
                Ready to <span className="text-primary italic">Deploy?</span>
              </h2>
              <p className="text-background/70 text-lg mb-10 w-full max-w-md">
                Currently open for new opportunities. I reply swiftly and build faster. Let's engineer something great.
              </p>

              <a
                href={`mailto:${site.email}`}
                className="group relative inline-flex items-center justify-center gap-3 rounded-full bg-primary px-8 py-4 text-foreground font-bold overflow-hidden transition-transform duration-300 hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(253,196,53,0.3)] w-fit"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Initiate Comms <ArrowUpRight className="size-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300" />
              </a>
            </div>

            {/* Right: Channels Grid */}
            <div className="w-full md:w-1/2 relative z-10 grid grid-cols-1 gap-4">
              {channels.map((channel) => (
                <a
                  key={channel.label}
                  href={channel.href}
                  target={channel.href.startsWith("http") ? "_blank" : undefined}
                  rel={channel.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group flex items-center justify-between p-4 md:p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-white/20 transition-all duration-300 hover:bg-white/10 hover:shadow-xl"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex size-12 items-center justify-center rounded-xl bg-white/10 text-background group-hover:scale-110 group-hover:text-primary transition-all duration-300 shadow-inner">
                      <channel.icon className="size-5" />
                    </div>
                    <div>
                      <p className="text-background/50 text-[0.65rem] font-bold tracking-widest uppercase mb-1">
                        {channel.label}
                      </p>
                      <p className="text-background font-bold tracking-wide">
                        {channel.value}
                      </p>
                    </div>
                  </div>

                  {channel.copy && (
                    <button
                      title="Copy to clipboard"
                      className="flex size-10 items-center justify-center rounded-xl bg-background/10 text-background/60 hover:text-background hover:bg-white/20 transition-all duration-200"
                      onClick={(e) => handleCopy(channel.value, channel.label, e)}
                    >
                      {copied === channel.label ? (
                        <Check className="size-5 text-emerald-400" />
                      ) : (
                        <Copy className="size-5" />
                      )}
                    </button>
                  )}

                  {!channel.copy && (
                    <div className="flex size-10 items-center justify-center rounded-xl bg-background/10 text-background/60 group-hover:text-background group-hover:bg-white/20 transition-all duration-200">
                      <ArrowUpRight className="size-5" />
                    </div>
                  )}
                </a>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
