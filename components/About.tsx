"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import RevealText from "@/components/RevealText";
import ScrollReveal from "@/components/ScrollReveal";
import SectionLabel from "@/components/ui/SectionLabel";
import { site } from "@/lib/site";

const FACTS = [
  { label: "Idade", value: "19 anos" },
  { label: "Atuação", value: "Desenvolvedor Web" },
  { label: "Formação", value: "Engenharia da Computação" },
  { label: "Base", value: site.location },
];

const TIMELINE = [
  { year: "2024", text: "Início na programação" },
  { year: "2025", text: "Primeiros projetos web" },
  { year: "2026", text: "Desenvolvimento de projetos profissionais" },
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const panelY = useSpring(useTransform(scrollYProgress, [0, 1], [30, -30]), {
    stiffness: 100,
    damping: 28,
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);

  return (
    <section id="sobre" aria-labelledby="sobre-titulo" className="relative py-24 md:py-36">
      <div className="shell">
        <SectionLabel index="04">Sobre</SectionLabel>

        <div ref={ref} className="mt-8 grid gap-14 md:mt-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <RevealText
              as="h2"
              id="sobre-titulo"
              text="Por trás do código."
              className="display-lg"
            />

            <div className="mt-8 max-w-xl space-y-5 text-base leading-relaxed text-bone-dim md:mt-10 md:text-lg">
              <ScrollReveal>
                <p>
                  Sou <span className="text-bone">Matheus Burille</span>, desenvolvedor web e
                  estudante de Engenharia da Computação.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.08}>
                <p>
                  Gosto de transformar ideias em produtos digitais que sejam bonitos, rápidos e
                  fáceis de usar.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.16}>
                <p>
                  Meu foco está em criar experiências web modernas que ajudam empresas e
                  profissionais a apresentarem melhor aquilo que fazem.
                </p>
              </ScrollReveal>
            </div>

            <ScrollReveal delay={0.2} className="mt-12 md:mt-14">
              <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-bone/10 bg-bone/10 sm:grid-cols-4">
                {FACTS.map((fact) => (
                  <div key={fact.label} className="bg-ink px-5 py-6">
                    <dt className="eyebrow text-bone-faint">{fact.label}</dt>
                    <dd className="mt-3 text-[0.9375rem] leading-snug tracking-tight text-bone">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </ScrollReveal>
          </div>

          {/* Retrato + linha do tempo */}
          <div className="lg:col-span-4 lg:col-start-9">
            <motion.div style={reduceMotion ? undefined : { y: panelY }}>
              <ScrollReveal clip distance={0} duration={1.1}>
                <figure className="group relative overflow-hidden rounded-xl border border-bone/10 bg-ink-raised">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <motion.div
                      style={reduceMotion ? undefined : { y: imageY }}
                      className="absolute -inset-y-[6%] inset-x-0"
                    >
                      <Image
                        src="/about/matheus.jpg"
                        alt="Matheus Burille, de braços cruzados"
                        fill
                        sizes="(max-width: 1024px) 90vw, 360px"
                        className="object-cover object-[center_12%] grayscale-[0.18] transition-[filter,transform] duration-[1.1s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:grayscale-0 group-hover:scale-[1.03]"
                      />
                    </motion.div>

                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-ink/5"
                    />
                  </div>

                  <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 px-5 pb-5 pt-16">
                    <p className="max-w-[16ch] font-serif text-[0.95rem] italic leading-snug text-bone/90">
                      Detalhe não é enfeite. É o que faz o site parecer profissional.
                    </p>
                    <span className="eyebrow shrink-0 text-accent">MB.</span>
                  </figcaption>
                </figure>
              </ScrollReveal>

              <ScrollReveal delay={0.12} className="mt-8">
                <span className="eyebrow text-bone-faint">Linha do tempo</span>
                <ol className="mt-5 space-y-0">
                  {TIMELINE.map((item, index) => (
                    <li
                      key={item.year}
                      className="group flex items-baseline gap-5 border-t border-bone/10 py-4 last:border-b"
                    >
                      <span className="font-mono text-xs text-accent">{item.year}</span>
                      <span className="text-sm text-bone-dim transition-colors duration-300 group-hover:text-bone">
                        {item.text}
                      </span>
                      <span
                        aria-hidden
                        className="ml-auto size-1.5 shrink-0 rounded-full bg-bone/20 transition-colors duration-300 group-hover:bg-accent"
                        style={{ transitionDelay: `${index * 20}ms` }}
                      />
                    </li>
                  ))}
                </ol>
              </ScrollReveal>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
