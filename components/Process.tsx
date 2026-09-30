"use client";

import { motion, useReducedMotion } from "motion/react";
import ScrollReveal from "@/components/ScrollReveal";

const PROCESS = [
  {
    index: "01",
    title: "Descoberta",
    description: "Entendo seu negócio, público e objetivo.",
  },
  {
    index: "02",
    title: "Estratégia",
    description: "Defino estrutura, conteúdo e fluxo da página.",
  },
  {
    index: "03",
    title: "Design",
    description: "Transformo a estratégia em uma experiência visual.",
  },
  {
    index: "04",
    title: "Desenvolvimento",
    description: "Construo o site com tecnologia moderna e foco em performance.",
  },
  {
    index: "05",
    title: "Refinamento",
    description: "Testo responsividade, interações e detalhes.",
  },
  {
    index: "06",
    title: "Entrega",
    description: "Publico o projeto e deixo tudo pronto para você utilizar.",
  },
];

export default function Process() {
  const reduceMotion = useReducedMotion();

  return (
    <section aria-labelledby="processo-titulo" className="relative border-y border-bone/10 py-24 md:py-32">
      <div className="grid-backdrop pointer-events-none absolute inset-0 opacity-30 [mask-image:radial-gradient(90%_70%_at_50%_50%,#000,transparent)]" />

      <div className="shell relative">
        <h2 id="processo-titulo" className="sr-only">
          Como funciona o processo
        </h2>

        <div className="grid gap-px overflow-hidden rounded-xl border border-bone/10 bg-bone/10 sm:grid-cols-2 lg:grid-cols-3">
          {PROCESS.map((step, index) => (
            <motion.article
              key={step.index}
              initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.7, delay: (index % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group relative overflow-hidden bg-ink p-7 transition-colors duration-500 hover:bg-ink-raised md:p-9"
            >
              {/* Numeral fantasma */}
              <span
                aria-hidden
                className="pointer-events-none absolute -right-2 -top-6 select-none text-[6rem] font-medium leading-none tracking-tighter text-bone/[0.035] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1 group-hover:text-accent/10 md:text-[7.5rem]"
              >
                {step.index}
              </span>

              <div className="relative">
                <span className="font-mono text-[0.6875rem] text-accent">{step.index}</span>
                <h3 className="mt-5 text-xl font-medium tracking-tight text-bone md:text-2xl">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-xs text-sm leading-relaxed text-bone-dim">
                  {step.description}
                </p>
              </div>

              <span
                aria-hidden
                className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
              />
            </motion.article>
          ))}
        </div>

        <ScrollReveal delay={0.1} className="mt-12 md:mt-16">
          <p className="mx-auto max-w-3xl text-center text-xl leading-snug tracking-tight text-bone sm:text-2xl md:text-[2rem]">
            Do primeiro briefing ao site publicado,{" "}
            <span className="font-serif italic text-accent">você sabe exatamente</span> o que está
            acontecendo.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
