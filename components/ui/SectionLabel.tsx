"use client";

import { motion, useReducedMotion } from "motion/react";

type SectionLabelProps = {
  index?: string;
  children: string;
  className?: string;
};

/** Rótulo técnico de seção: índice + título curto + linha que cresce no scroll. */
export default function SectionLabel({ index, children, className = "" }: SectionLabelProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {index ? <span className="eyebrow font-mono text-accent">{index}</span> : null}
      <span className="eyebrow text-bone-dim">{children}</span>
      <motion.span
        aria-hidden
        className="h-px flex-1 bg-bone/15"
        initial={reduceMotion ? undefined : { scaleX: 0 }}
        whileInView={reduceMotion ? undefined : { scaleX: 1 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: "left" }}
      />
    </div>
  );
}
