"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import RevealText from "@/components/RevealText";
import SectionLabel from "@/components/ui/SectionLabel";

const REASONS = [
  {
    index: "01",
    title: "Primeira impressão",
    text: "Seu site é muitas vezes o primeiro contato entre uma pessoa e sua empresa.",
  },
  {
    index: "02",
    title: "Credibilidade",
    text: "Uma presença digital profissional ajuda a transmitir confiança.",
  },
  {
    index: "03",
    title: "Conversão",
    text: "A estrutura do site deve conduzir o visitante para uma ação.",
  },
  {
    index: "04",
    title: "Diferenciação",
    text: "Sua empresa não precisa parecer igual a todas as outras.",
  },
];

export default function WhyWebsite() {
  const [active, setActive] = useState(0);
  const items = useRef<(HTMLLIElement | null)[]>([]);

  /** O item ativo é sempre o mais próximo do centro da tela. */
  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const center = window.innerHeight / 2;
      let closest = 0;
      let smallest = Number.POSITIVE_INFINITY;

      items.current.forEach((item, index) => {
        if (!item) return;
        const rect = item.getBoundingClientRect();
        const distance = Math.abs(rect.top + rect.height / 2 - center);
        if (distance < smallest) {
          smallest = distance;
          closest = index;
        }
      });

      setActive(closest);
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section aria-labelledby="motivos-titulo" className="relative py-24 md:py-36">
      <div className="shell">
        <SectionLabel index="05">Diferencial</SectionLabel>

        <div className="mt-8 grid gap-12 md:mt-10 lg:grid-cols-12 lg:gap-16">
          {/* Coluna fixa que reage ao item em foco */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-36">
              <RevealText
                as="h2"
                id="motivos-titulo"
                text="Por que investir em um site?"
                className="display-lg max-w-[11ch]"
              />

              <div className="mt-10 hidden items-center gap-6 lg:flex">
                <div className="relative h-[4.5rem] w-24 overflow-hidden">
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.span
                      key={REASONS[active].index}
                      initial={{ y: "100%", opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: "-100%", opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute inset-0 font-mono text-[4rem] leading-none tracking-tighter text-accent"
                    >
                      {REASONS[active].index}
                    </motion.span>
                  </AnimatePresence>
                </div>
                <div className="flex-1">
                  <div className="h-px w-full bg-bone/15">
                    <motion.div
                      className="h-px bg-accent"
                      animate={{ width: `${((active + 1) / REASONS.length) * 100}%` }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </div>
                  <p className="mt-4 text-sm text-bone-dim">
                    {active + 1} de {REASONS.length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <ol className="lg:col-span-6 lg:col-start-7">
            {REASONS.map((reason, index) => (
              <ReasonItem
                key={reason.index}
                ref={(node) => {
                  items.current[index] = node;
                }}
                reason={reason}
                isActive={active === index}
              />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function ReasonItem({
  ref,
  reason,
  isActive,
}: {
  ref: (node: HTMLLIElement | null) => void;
  reason: (typeof REASONS)[number];
  isActive: boolean;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.li
      ref={ref}
      initial={reduceMotion ? undefined : { opacity: 0, y: 28 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="group border-t border-bone/10 py-9 last:border-b md:py-14"
    >
      <div className="flex items-baseline gap-5">
        <span className="font-mono text-[0.6875rem] text-accent lg:hidden">{reason.index}</span>
        <h3
          className={`text-2xl font-medium tracking-tight transition-colors duration-500 md:text-[2rem] ${
            isActive ? "text-bone" : "text-bone/60"
          }`}
        >
          {reason.title}
        </h3>
      </div>
      <p
        className={`mt-4 max-w-md text-sm leading-relaxed transition-colors duration-500 md:text-[0.9375rem] ${
          isActive ? "text-bone/85" : "text-bone-dim"
        }`}
      >
        {reason.text}
      </p>
    </motion.li>
  );
}
