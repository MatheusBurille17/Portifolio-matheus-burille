"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import RevealText from "@/components/RevealText";
import ScrollReveal from "@/components/ScrollReveal";
import SectionLabel from "@/components/ui/SectionLabel";

const STEPS = [
  { index: "01", label: "Entendimento" },
  { index: "02", label: "Estratégia" },
  { index: "03", label: "Design" },
  { index: "04", label: "Desenvolvimento" },
  { index: "05", label: "Refinamento" },
  { index: "06", label: "Publicação" },
];

/** Prova de capacidade: o método aparece antes do detalhamento do processo. */
export default function Capability() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 55%"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 26, restDelta: 0.001 });
  const counter = useTransform(progress, [0, 1], [0, STEPS.length]);

  return (
    <section id="processo" aria-labelledby="capacidade-titulo" className="relative py-24 md:py-36">
      <div className="shell">
        <SectionLabel index="03">Método</SectionLabel>

        <div className="mt-8 grid gap-8 md:mt-10 md:grid-cols-12 md:items-end">
          <RevealText
            as="h2"
            id="capacidade-titulo"
            text={"Seu projeto\nnão começa no código."}
            className="display-lg md:col-span-7"
          />
          <ScrollReveal delay={0.15} className="md:col-span-4 md:col-start-9 md:pb-3">
            <p className="max-w-sm text-sm leading-relaxed text-bone-dim md:text-[0.9375rem]">
              Antes da primeira linha, existe entendimento, estratégia e decisão de design. É isso
              que separa um site que funciona de um site que só existe.
            </p>
          </ScrollReveal>
        </div>

        {/* Trilho de etapas com linha desenhada pelo scroll */}
        <div ref={ref} className="relative mt-16 md:mt-24">
          <div
            aria-hidden
            className="absolute left-[0.4375rem] top-0 h-full w-px bg-bone/10 md:left-0 md:top-[0.4375rem] md:h-px md:w-full"
          />
          <motion.div
            aria-hidden
            style={reduceMotion ? undefined : { scaleY: progress }}
            className="absolute left-[0.4375rem] top-0 h-full w-px origin-top bg-accent md:hidden"
          />
          <motion.div
            aria-hidden
            style={reduceMotion ? undefined : { scaleX: progress }}
            className="absolute left-0 top-[0.4375rem] hidden h-px w-full origin-left bg-accent md:block"
          />

          <ol className="relative grid gap-8 md:grid-cols-6 md:gap-4">
            {STEPS.map((step, index) => (
              <motion.li
                key={step.index}
                initial={reduceMotion ? undefined : { opacity: 0, y: 18 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-15% 0px" }}
                transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-start gap-4 md:block md:pt-0"
              >
                <span
                  aria-hidden
                  className="mt-[0.3125rem] block size-3.5 shrink-0 rounded-full border border-accent bg-ink md:mt-0"
                />
                <div className="md:mt-6">
                  <span className="font-mono text-[0.6875rem] text-accent">{step.index}</span>
                  <p className="mt-1.5 text-base font-medium tracking-tight text-bone md:text-[1.0625rem]">
                    {step.label}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>

          <div className="mt-12 flex items-center gap-4 border-t border-bone/10 pt-6 md:mt-16">
            <StepCounter value={counter} />
            <p className="text-sm text-bone-dim">etapas acompanhadas de perto, sem caixa-preta.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Contador que sobe conforme o trilho é percorrido. */
function StepCounter({ value }: { value: MotionValue<number> }) {
  const reduceMotion = useReducedMotion();
  const rounded = useTransform(value, (latest) => String(Math.round(latest)).padStart(2, "0"));

  if (reduceMotion) {
    return <span className="font-mono text-2xl text-accent">06</span>;
  }

  return <motion.span className="font-mono text-2xl tabular-nums text-accent">{rounded}</motion.span>;
}
