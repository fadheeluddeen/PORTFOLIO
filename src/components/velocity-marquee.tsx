import { useRef, type ReactNode } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";

import { cn } from "@/lib/utils";

type VelocityMarqueeProps = {
  children: ReactNode;
  /** px per second at rest; negative scrolls the other way */
  baseVelocity?: number;
  className?: string;
};

/**
 * Infinite marquee whose speed and direction react to scroll velocity —
 * scroll down and it accelerates, scroll up and it flows backwards.
 */
export function VelocityMarquee({
  children,
  baseVelocity = 60,
  className,
}: VelocityMarqueeProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [-1500, 0, 1500], [-4, 0, 4], {
    clamp: false,
  });

  const directionRef = useRef(baseVelocity >= 0 ? 1 : -1);
  const trackRef = useRef<HTMLDivElement>(null);

  // baseX wraps within one copy's width so the two copies tile seamlessly
  const x = useTransform(baseX, (v) => {
    const track = trackRef.current;
    const half = track ? track.scrollWidth / 2 : 0;
    if (!half) return "0px";
    const wrapped = ((v % half) + half) % half;
    return `${-wrapped}px`;
  });

  useAnimationFrame((_, delta) => {
    const vf = velocityFactor.get();
    if (vf < 0) directionRef.current = -1;
    else if (vf > 0) directionRef.current = 1;

    let moveBy = Math.abs(baseVelocity) * directionRef.current * (delta / 1000);
    moveBy += moveBy * Math.abs(vf);
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className={cn("overflow-hidden whitespace-nowrap", className)}>
      <motion.div ref={trackRef} className="flex w-max" style={{ x }}>
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0">{children}</div>
      </motion.div>
    </div>
  );
}
