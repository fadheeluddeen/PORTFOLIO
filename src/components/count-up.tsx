import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const match = value.match(/^([\d.]+)(.*)$/);
    if (!match) {
      el.textContent = value;
      return;
    }

    const target = parseFloat(match[1]);
    const suffix = match[2] ?? "";
    const decimals = match[1].includes(".")
      ? match[1].split(".")[1].length
      : 0;
    const state = { n: 0 };

    const tween = gsap.to(state, {
      n: target,
      duration: 1.6,
      ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 90%", once: true },
      onUpdate: () => {
        el.textContent = state.n.toFixed(decimals) + suffix;
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [value]);

  return <span ref={ref}>{value}</span>;
}
