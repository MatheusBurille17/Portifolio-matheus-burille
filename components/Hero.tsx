"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Cta } from "@/components/ui/Cta";
import { generateWhatsAppLink } from "@/lib/whatsapp";
import { site } from "@/lib/site";

const HEADLINE = [
  { text: "Sites que fazem", tone: "bone" },
  { text: "sua empresa parecer", tone: "bone" },
  { text: "tão boa", tone: "accent" },
  { text: "quanto ela realmente é.", tone: "dim" },
] as const;

const TICKER = [
  "Landing pages",
  "Sites institucionais",
  "Experiências web",
  "Next.js",
  "Design de interface",
  "Performance",
];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const contentY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 90]), {
    stiffness: 120,
    damping: 30,
  });
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const glowY = useTransform(scrollYProgress, [0, 1], [0, 160]);

  return (
    <section
      id="inicio"
      ref={ref}
      aria-label="Apresentação"
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden pb-6 pt-24 md:pt-28"
    >
      {/* Fundo: grade técnica + brilho suave */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="grid-backdrop absolute inset-0 opacity-[0.55] [mask-image:radial-gradient(120%_80%_at_50%_0%,#000_20%,transparent_75%)]" />
        <motion.div
          style={reduceMotion ? undefined : { y: glowY }}
          className="absolute left-1/2 top-[-18rem] h-[36rem] w-[64rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(205,255,74,0.10),transparent_62%)] blur-2xl"
        />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
      </div>

      <motion.div
        style={reduceMotion ? undefined : { y: contentY, opacity: contentOpacity }}
        className="shell relative flex flex-1 flex-col justify-center"
      >
        {/* Linha de status */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center gap-x-6 gap-y-3 border-b border-bone/10 pb-5"
        >
          <span className="inline-flex items-center gap-2.5 text-[0.8125rem] text-bone-dim">
            <span className="size-1.5 rounded-full bg-accent animate-pulse-dot" />
            {site.available ? "Disponível para novos projetos" : "Agenda fechada no momento"}
          </span>
          <span className="eyebrow ml-auto hidden text-bone-faint sm:block">
            Desenvolvimento web · {site.location}
          </span>
        </motion.div>

        {/* Headline */}
        <h1 className="display-xl mt-7 max-w-[18ch] md:mt-10">
          <span className="sr-only">
            Sites que fazem sua empresa parecer tão boa quanto ela realmente é.
          </span>
          <span aria-hidden>
            {HEADLINE.map((line, index) => (
              <span key={line.text} className="block overflow-hidden pb-[0.06em]">
                <motion.span
                  className="block will-change-transform"
                  initial={{ y: "108%" }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 1.1,
                    delay: 0.32 + index * 0.09,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {line.tone === "accent" ? (
                    <span className="font-serif font-normal italic text-accent">{line.text}</span>
                  ) : line.tone === "dim" ? (
                    <span className="text-bone-dim">{line.text}</span>
                  ) : (
                    line.text
                  )}
                </motion.span>
              </span>
            ))}
          </span>
        </h1>

        {/* Subheadline + CTAs + painel visual */}
        <div className="mt-9 grid gap-10 md:mt-12 lg:grid-cols-12 lg:items-start lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 xl:col-span-5"
          >
            <p className="max-w-xl text-base leading-relaxed text-bone-dim sm:text-lg">
              Desenvolvo sites, landing pages e experiências web modernas para empresas,
              profissionais e marcas que querem se destacar no digital.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Cta href={generateWhatsAppLink()} external>
                Quero um site
                <ArrowUpRight className="size-4" />
              </Cta>
              <Cta href="#projetos" variant="outline">
                Ver projetos
                <ArrowDown className="size-4 transition-transform duration-300 group-hover:translate-y-0.5" />
              </Cta>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 lg:col-start-8 xl:col-span-5 xl:col-start-9"
          >
            <HeroPanel />
          </motion.div>
        </div>
      </motion.div>

      {/* Ticker inferior */}
      <div className="relative mt-10 border-y border-bone/10 py-3.5">
        <div className="flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
          <div className="flex shrink-0 animate-marquee gap-10 pr-10 motion-reduce:animate-none">
            {[...TICKER, ...TICKER].map((item, index) => (
              <span
                key={`${item}-${index}`}
                className="flex shrink-0 items-center gap-10 whitespace-nowrap text-[0.8125rem] text-bone-faint"
              >
                {item}
                <span className="size-1 rounded-full bg-accent/50" />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/** Painel abstrato com "peças de interface" que reagem ao mouse. */
function HeroPanel() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      whileHover={reduceMotion ? undefined : { rotateX: -2, rotateY: 3 }}
      transition={{ type: "spring", stiffness: 180, damping: 20 }}
      style={{ transformPerspective: 1200 }}
      className="relative w-full rounded-2xl border border-bone/10 bg-gradient-to-b from-bone/[0.05] to-transparent p-1.5 backdrop-blur-sm"
    >
      <div className="rounded-xl border border-bone/[0.07] bg-ink-raised/80 p-5 sm:p-6">
        <div className="flex items-center justify-between">
          <span className="eyebrow text-bone-faint">Entrega padrão</span>
          <span className="font-mono text-[0.6875rem] text-accent">v.2026</span>
        </div>

        <ul className="mt-4 space-y-3">
          {[
            { label: "Design sob medida", value: "100%" },
            { label: "Responsivo", value: "4 breakpoints" },
            { label: "SEO técnico", value: "Incluso" },
            { label: "Performance", value: "Prioridade" },
          ].map((row, index) => (
            <li key={row.label} className="group/row">
              <div className="flex items-baseline justify-between gap-4 text-sm">
                <span className="text-bone/85">{row.label}</span>
                <span className="font-mono text-[0.75rem] text-bone-dim">{row.value}</span>
              </div>
              <motion.div
                className="mt-2 h-px origin-left bg-bone/12"
                initial={reduceMotion ? undefined : { scaleX: 0 }}
                animate={reduceMotion ? undefined : { scaleX: 1 }}
                transition={{ duration: 0.9, delay: 1.1 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="block h-px w-0 bg-accent transition-[width] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/row:w-full" />
              </motion.div>
            </li>
          ))}
        </ul>

        <div className="mt-5 flex items-center gap-3 rounded-lg border border-bone/[0.07] bg-bone/[0.02] px-4 py-3">
          <span className="size-1.5 shrink-0 rounded-full bg-accent animate-pulse-dot" />
          <p className="text-[0.8125rem] leading-snug text-bone-dim">
            Cada projeto é construído do zero. Nada de template pronto.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
