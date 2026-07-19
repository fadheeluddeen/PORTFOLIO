import { useState } from "react";
import { Copy, Check, Mail, Phone, Linkedin, Github, ArrowUpRight } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { contact, site } from "@/data/portfolio";

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
  { icon: Github, label: "GitHub", value: "View profile", href: site.github, copy: false },
];

export function ContactSection() {
  const [copied, setCopied] = useState<string | null>(null);

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
    <section id="contact" className="section-anchor relative py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-12 text-center">
          <span className="text-primary text-sm font-bold tracking-wide uppercase">
            {contact.kicker}
          </span>
          <h2 className="font-display mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
            {contact.title}
          </h2>
          <p className="text-muted-foreground mt-3">{contact.subtitle}</p>
        </div>

        <div className="bg-3d radius-morph relative mb-10 overflow-hidden p-8 md:p-12">
          <div className="relative z-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div className="space-y-2">
              <h3 className="font-display text-2xl font-extrabold tracking-tight md:text-3xl">
                Have an idea that needs shipping?
              </h3>
              <p className="max-w-md opacity-90">
                I'm currently open to AI/ML engineering roles — reply fast, prototype faster.
              </p>
            </div>
            <Button asChild size="lg" variant="secondary" className="btn-3d rounded-full px-8">
              <a href={`mailto:${site.email}`}>
                Say hello <ArrowUpRight />
              </a>
            </Button>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {channels.map((channel) => (
            <div
              key={channel.label}
              className="tilt-card glass-panel flex items-center justify-between rounded-2xl p-4"
            >
              <a
                href={channel.href}
                target={channel.href.startsWith("http") ? "_blank" : undefined}
                rel={channel.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="flex min-w-0 items-center gap-3"
              >
                <div className="bg-accent flex size-10 shrink-0 items-center justify-center rounded-xl">
                  <channel.icon className="text-accent-foreground size-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-muted-foreground text-xs font-bold tracking-wide uppercase">
                    {channel.label}
                  </p>
                  <p className="truncate text-sm font-bold">{channel.value}</p>
                </div>
              </a>
              {channel.copy && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8 shrink-0"
                  onClick={() => handleCopy(channel.value, channel.label)}
                >
                  {copied === channel.label ? (
                    <Check className="size-4 text-emerald-500" />
                  ) : (
                    <Copy className="size-4" />
                  )}
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
