"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { ArrowUpRight, Plus } from "lucide-react";
import { projects } from "@/data/projects";
import { generateWhatsAppLink } from "@/lib/whatsapp";
import RevealText from "@/components/RevealText";
import ScrollReveal from "@/components/ScrollReveal";
import SectionLabel from "@/components/ui/SectionLabel";
import { UnderlineLink } from "@/components/ui/Cta";

export default function Portfolio() {
  return (
    <section id="projetos" aria-labelledby="projetos-titulo" className="relative py-24 md:py-36">
      <div className="shell">
        <SectionLabel index="02">Portfólio</SectionLabel>

        <div className="mt-8 flex flex-col gap-6 md:mt-10 md:flex-row md:items-end md:justify-between">
          <RevealText
            as="h2"
            id="projetos-titulo"
            text="Projetos selecionados"
            className="display-lg max-w-[12ch]"
          />
          <ScrollReveal delay={0.15} className="md:max-w-sm md:pb-3">
            <p className="text-sm leading-relaxed text-bone-dim md:text-[0.9375rem]">
              Alguns dos projetos que transformei de ideia em experiência digital.
            </p>
          </ScrollReveal>
        </div>

        <div className="mt-14 space-y-20 md:mt-20 md:space-y-28">
          {projects.map((project) => (
            <ProjectShowcase key={project.slug} project={project} />
          ))}
          <UpcomingSlot />
        </div>
      </div>
    </section>
  );
}

function ProjectShowcase({ project }: { project: (typeof projects)[number] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imageY = useSpring(useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]), {
    stiffness: 120,
    damping: 30,
  });

  return (
    <article ref={ref} className="group/project">
      <div className="border-b border-bone/10 pb-5">
        <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
          <h3 className="display-md w-full sm:w-auto">{project.name}</h3>
          <span className="eyebrow text-bone-faint">{project.category}</span>
          <span className="eyebrow ml-auto font-mono text-accent">{project.year}</span>
        </div>
      </div>

      {/* Mockup de navegador */}
      <ScrollReveal clip duration={1.1} distance={0} className="mt-8 md:mt-10">
        <motion.a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="view"
          aria-label={`Visitar ${project.name} em nova aba`}
          whileHover={reduceMotion ? undefined : { y: -6 }}
          transition={{ type: "spring", stiffness: 220, damping: 24 }}
          className="block overflow-hidden rounded-xl border border-bone/12 bg-ink-raised shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)] md:rounded-2xl"
        >
          <div className="flex items-center gap-3 border-b border-bone/10 bg-bone/[0.03] px-4 py-3">
            <span className="flex gap-1.5">
              <span className="size-2.5 rounded-full bg-bone/15" />
              <span className="size-2.5 rounded-full bg-bone/15" />
              <span className="size-2.5 rounded-full bg-bone/15" />
            </span>
            <span className="mx-auto flex max-w-full items-center gap-2 truncate rounded-md bg-ink/60 px-3 py-1 text-[0.6875rem] text-bone-faint">
              <span className="size-1.5 shrink-0 rounded-full bg-accent" />
              <span className="truncate">{project.url.replace("https://", "")}</span>
            </span>
            <ArrowUpRight className="size-4 shrink-0 text-bone-faint transition-all duration-500 group-hover/project:-translate-y-0.5 group-hover/project:translate-x-0.5 group-hover/project:text-accent" />
          </div>

          <div className="relative aspect-[2/1] overflow-hidden">
            <motion.div style={reduceMotion ? undefined : { y: imageY }} className="absolute -inset-y-[8%] inset-x-0">
              <Image
                src={project.image}
                alt={project.imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 92vw, 1280px"
                className="object-cover object-top transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/project:scale-[1.03]"
                priority={false}
              />
            </motion.div>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent" />
          </div>
        </motion.a>
      </ScrollReveal>

      {/* Metadados */}
      <div className="mt-8 grid gap-8 md:grid-cols-12 md:gap-6">
        <ScrollReveal className="md:col-span-5" delay={0.05}>
          <p className="max-w-md text-base leading-relaxed text-bone/85">{project.summary}</p>
          <div className="mt-6">
            <UnderlineLink href={project.url} external className="text-bone">
              Visitar projeto
              <ArrowUpRight className="size-4" />
            </UnderlineLink>
          </div>
        </ScrollReveal>

        <ScrollReveal className="md:col-span-4 md:col-start-7" delay={0.1}>
          <span className="eyebrow text-bone-faint">Tecnologias</span>
          <ul className="mt-4 flex flex-wrap gap-x-2 gap-y-2">
            {project.stack.map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-bone/12 px-3 py-1.5 text-[0.75rem] text-bone-dim"
              >
                {tech}
              </li>
            ))}
          </ul>
        </ScrollReveal>

        <ScrollReveal className="md:col-span-2 md:col-start-11" delay={0.15}>
          <dl className="space-y-3">
            {project.highlights.map((item) => (
              <div key={item.label}>
                <dt className="eyebrow text-bone-faint">{item.label}</dt>
                <dd className="mt-1 text-sm text-bone/85">{item.value}</dd>
              </div>
            ))}
          </dl>
        </ScrollReveal>
      </div>
    </article>
  );
}

/** Espaço reservado para os próximos projetos — honesto e visualmente interessante. */
function UpcomingSlot() {
  const reduceMotion = useReducedMotion();

  return (
    <ScrollReveal>
      <a
        href={generateWhatsAppLink(
          "Olá, Matheus! Vi seu portfólio e quero que meu projeto seja o próximo da lista.",
        )}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative block overflow-hidden rounded-xl border border-dashed border-bone/15 bg-bone/[0.015] px-6 py-14 transition-colors duration-500 hover:border-accent/40 md:rounded-2xl md:px-12 md:py-20"
      >
        <div className="grid-backdrop pointer-events-none absolute inset-0 opacity-40 transition-opacity duration-700 group-hover:opacity-70" />
        <motion.div
          aria-hidden
          animate={reduceMotion ? undefined : { opacity: [0.25, 0.5, 0.25] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-[36rem] max-w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(205,255,74,0.10),transparent_65%)] blur-2xl"
        />

        <div className="relative flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <span className="eyebrow text-bone-faint">Próximo projeto</span>
            <p className="display-md mt-4 max-w-[14ch] text-bone">Novos projetos em construção.</p>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-bone-dim">
              A agenda está aberta. O próximo caso desta página pode ser o seu.
            </p>
          </div>

          <span className="inline-flex size-16 shrink-0 items-center justify-center rounded-full border border-bone/15 text-bone-dim transition-all duration-500 group-hover:border-accent group-hover:bg-accent group-hover:text-ink md:size-20">
            <Plus className="size-6 transition-transform duration-700 group-hover:rotate-90" />
          </span>
        </div>
      </a>
    </ScrollReveal>
  );
}
