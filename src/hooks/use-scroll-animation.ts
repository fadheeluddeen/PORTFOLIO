import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollAnimationOptions {
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  toggleActions?: string;
  stagger?: number;
  children?: boolean;
}

export function useScrollAnimation<T extends HTMLElement>(
  options: ScrollAnimationOptions = {}
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const {
      from = { opacity: 0, y: 50 },
      to = { opacity: 1, y: 0, duration: 1 },
      start = "top 85%",
      end = "bottom 20%",
      scrub = false,
      toggleActions = "play none none reverse",
      stagger = 0.1,
      children = false,
    } = options;

    const tl = gsap.timeline({
      scrollTrigger: { trigger: element, start, end, scrub, toggleActions },
    });

    if (children) {
      const items = element.children;
      if (items.length > 0) {
        gsap.set(items, from);
        tl.to(items, { ...to, stagger, ease: "power3.out" });
      }
    } else {
      tl.fromTo(element, from, { ...to, ease: "power3.out" });
    }

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === element) st.kill();
      });
    };
  }, [options]);

  return ref;
}

export const fadeUp = {
  from: { opacity: 0, y: 60 },
  to: { opacity: 1, y: 0, duration: 0.8 },
};

export const fadeIn = {
  from: { opacity: 0 },
  to: { opacity: 1, duration: 0.8 },
};

export const slideInLeft = {
  from: { opacity: 0, x: -80 },
  to: { opacity: 1, x: 0, duration: 0.8 },
};

export const slideInRight = {
  from: { opacity: 0, x: 80 },
  to: { opacity: 1, x: 0, duration: 0.8 },
};

export const scaleUp = {
  from: { opacity: 0, scale: 0.8 },
  to: { opacity: 1, scale: 1, duration: 0.8 },
};

export const staggerChildren = {
  children: true,
  stagger: 0.15,
};
