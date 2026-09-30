"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/data/services";
import RevealText from "@/components/RevealText";
import SectionLabel from "@/components/ui/SectionLabel";

export default function Services() {
  const [active, setActive] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 250, damping: 28, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 250, damping: 28, mass: 0.5 });

  const positioned = useRef(false);

  const handleMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (reduceMotion || event.pointerType !== "mouse" || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const nextX = event.clientX - rect.left;
    const nextY = event.clientY - rect.top;

    // No primeiro movimento a miniatura aparece já sob o cursor, sem voar da origem.
    if (!positioned.current) {
      positioned.current = true;
      springX.jump(nextX);
      springY.jump(nextY);
    }

    x.set(nextX);
    y.set(nextY);
  };

  const handleLeave = () => {
    positioned.current = false;
    setActive(null);
  };

  return (
    <section id="servicos" aria-labelledby="servicos-titulo" className="relative py-24 md:py-36">
      <div className="shell">
        <SectionLabel index="01">O que eu faço</SectionLabel>

        <RevealText
          as="h2"
          id="servicos-titulo"
          text={"Não faço apenas sites.\nCrio experiências digitais."}
          className="display-lg mt-8 max-w-[16ch] md:mt-10"
        />

        <div
          ref={containerRef}
          onPointerMove={handleMove}
          onPointerLeave={handleLeave}
          className="relative mt-14 md:mt-20"
        >
          {/* Preview flutuante que acompanha o cursor (desktop) */}
          <AnimatePresence>
            {active !== null && !reduceMotion ? (
              <motion.div
                key="preview"
                aria-hidden
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                style={{ x: springX, y: springY }}
                className="pointer-events-none absolute left-0 top-0 z-20 hidden lg:block"
              >
                <div className="-translate-x-1/2 -translate-y-1/2">
                  <ServicePreview index={active} />
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>

          <ul className="border-t border-bone/10">
            {services.map((service, index) => {
              const isActive = active === index;
              const isDimmed = active !== null && !isActive;

              return (
                <li key={service.id} className="border-b border-bone/10">
                  <div
                    onPointerEnter={(event) => {
                      if (event.pointerType === "mouse") setActive(index);
                    }}
                    onFocus={() => setActive(index)}
                    onBlur={() => setActive(null)}
                    className="group relative block"
                  >
                    <motion.div
                      animate={{ opacity: isDimmed ? 0.35 : 1 }}
                      transition={{ duration: 0.4 }}
                      className="grid gap-4 py-8 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:grid-cols-12 md:items-baseline md:gap-6 md:py-10 lg:group-hover:translate-x-3"
                    >
                      <span className="font-mono text-xs text-accent md:col-span-1">
                        {service.index}
                      </span>

                      <h3 className="display-md md:col-span-5">{service.title}</h3>

                      <p className="max-w-md text-sm leading-relaxed text-bone-dim md:col-span-5 md:text-[0.9375rem]">
                        {service.description}
                      </p>

                      <span className="hidden justify-end md:col-span-1 md:flex">
                        <ArrowUpRight className="size-5 text-bone-faint transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent" />
                      </span>
                    </motion.div>

                    {/* Tags reveladas no hover (desktop) / sempre visíveis no mobile */}
                    <div className="overflow-hidden pb-2 md:max-h-0 md:pb-0 md:transition-[max-height,padding] md:duration-500 md:ease-[cubic-bezier(0.16,1,0.3,1)] md:group-hover:max-h-24 md:group-hover:pb-8">
                      <div className="flex flex-wrap gap-2 md:pl-[calc(8.333%+1.5rem)]">
                        {service.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-bone/12 px-3 py-1.5 text-[0.75rem] text-bone-dim"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Linha de destaque que cresce no hover */}
                    <span
                      aria-hidden
                      className="absolute bottom-[-1px] left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

/** Miniaturas abstratas — uma linguagem visual diferente para cada serviço. */
function ServicePreview({ index }: { index: number }) {
  const frame =
    "h-52 w-72 overflow-hidden rounded-xl border border-bone/12 bg-ink-raised/95 p-4 shadow-[0_24px_80px_-24px_rgba(0,0,0,0.9)] backdrop-blur-md";

  if (index === 0) {
    return (
      <div className={frame}>
        <div className="h-2 w-16 rounded-full bg-bone/25" />
        <div className="mt-3 h-6 w-full rounded bg-bone/12" />
        <div className="mt-2 h-6 w-2/3 rounded bg-bone/[0.08]" />
        <div className="mt-4 space-y-2">
          <div className="h-7 rounded-md border border-bone/12 bg-bone/[0.03]" />
          <div className="h-7 rounded-md border border-bone/12 bg-bone/[0.03]" />
        </div>
        <motion.div
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="mt-4 flex h-8 items-center justify-center rounded-full bg-accent text-[0.6875rem] font-medium text-ink"
        >
          Quero orçamento
        </motion.div>
      </div>
    );
  }

  if (index === 1) {
    return (
      <div className={frame}>
        <div className="flex items-center gap-2 border-b border-bone/10 pb-3">
          <div className="h-2 w-10 rounded-full bg-accent/70" />
          <div className="ml-auto flex gap-1.5">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="h-1.5 w-6 rounded-full bg-bone/20" />
            ))}
          </div>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2">
          <div className="col-span-2 h-20 rounded-md bg-bone/[0.08]" />
          <div className="space-y-2">
            <div className="h-9 rounded-md bg-bone/[0.05]" />
            <div className="h-9 rounded-md bg-bone/[0.05]" />
          </div>
        </div>
        <div className="mt-3 space-y-1.5">
          <div className="h-1.5 w-full rounded-full bg-bone/12" />
          <div className="h-1.5 w-4/5 rounded-full bg-bone/10" />
          <div className="h-1.5 w-3/5 rounded-full bg-bone/[0.07]" />
        </div>
      </div>
    );
  }

  return (
    <div className={`${frame} relative`}>
      <div className="grid-backdrop absolute inset-0 opacity-50" />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="absolute left-1/2 top-1/2 size-32 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-accent/40"
      />
      <motion.div
        animate={{ scale: [1, 1.12, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-1/2 top-1/2 size-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(205,255,74,0.22),transparent_70%)]"
      />
      <motion.div
        animate={{ y: [-6, 6, -6] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-5 left-5 rounded-lg border border-bone/15 bg-ink/80 px-3 py-1.5 font-mono text-[0.625rem] text-bone-dim"
      >
        transform: scale()
      </motion.div>
    </div>
  );
}
