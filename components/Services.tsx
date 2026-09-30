"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/data/services";
import RevealText from "@/components/RevealText";
import SectionLabel from "@/components/ui/SectionLabel";

export default function Services() {
  const [active, setActive] = useState<number | null>(null);

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

        <div className="relative mt-14 md:mt-20">
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
                    onPointerLeave={() => setActive(null)}
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
