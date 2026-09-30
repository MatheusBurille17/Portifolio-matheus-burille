"use client";

import { motion, useScroll, useSpring } from "motion/react";

/** Fio fino de progresso no topo da página. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[95] h-px origin-left bg-accent/70"
    />
  );
}
