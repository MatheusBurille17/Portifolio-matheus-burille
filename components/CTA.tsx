"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Cta } from "@/components/ui/Cta";
import { generateWhatsAppLink } from "@/lib/whatsapp";

const SECRET = "Você chegou até aqui. Talvez esteja na hora de tirar seu projeto do papel.";

export default function CTA() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [hovering, setHovering] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const glowX = useSpring(x, { stiffness: 120, damping: 24 });
  const glowY = useSpring(y, { stiffness: 120, damping: 24 });
  const noteX = useSpring(x, { stiffness: 280, damping: 30 });
  const noteY = useSpring(y, { stiffness: 280, damping: 30 });

  const handleMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set(event.clientX - rect.left);
    y.set(event.clientY - rect.top);
  };

  return (
    <section aria-labelledby="cta-titulo" className="relative overflow-hidden py-24 md:py-40">
      <div
        ref={ref}
        onPointerMove={handleMove}
        onPointerEnter={(event) => event.pointerType === "mouse" && setHovering(true)}
        onPointerLeave={() => setHovering(false)}
        className="shell relative"
      >
        {/* Luz que segue o cursor */}
        {!reduceMotion ? (
          <motion.div
            aria-hidden
            style={{ x: glowX, y: glowY }}
            animate={{ opacity: hovering ? 1 : 0 }}
            transition={{ duration: 0.6 }}
            className="pointer-events-none absolute left-0 top-0 hidden size-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(205,255,74,0.08),transparent_60%)] blur-2xl lg:block"
          />
        ) : null}

        {/* Bilhete secreto revelado no hover (desktop) */}
        <AnimatePresence>
          {hovering && !reduceMotion ? (
            <motion.div
              aria-hidden
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              style={{ x: noteX, y: noteY }}
              className="pointer-events-none absolute left-0 top-0 z-20 hidden lg:block"
            >
              <p className="max-w-[17rem] translate-x-8 translate-y-8 rounded-xl border border-bone/12 bg-ink-raised/95 px-4 py-3 text-[0.8125rem] leading-snug text-bone-dim backdrop-blur-md">
                {SECRET}
              </p>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <div className="relative text-center">
          <motion.h2
            id="cta-titulo"
            className="display-xl mx-auto max-w-[14ch]"
            initial={reduceMotion ? undefined : "hidden"}
            whileInView={reduceMotion ? undefined : "visible"}
            viewport={{ once: true, margin: "-15% 0px" }}
          >
            {["Tem uma ideia?", "Vamos colocar ela na tela."].map((line, index) => (
              <span key={line} className="block overflow-hidden pb-[0.08em]">
                <motion.span
                  className={index === 1 ? "block text-bone-dim" : "block"}
                  variants={{ hidden: { y: "110%" }, visible: { y: 0 } }}
                  transition={{ duration: 1, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </motion.h2>

          <motion.div
            initial={reduceMotion ? undefined : { opacity: 0, y: 20 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex justify-center md:mt-12"
          >
            <Cta href={generateWhatsAppLink()} external className="px-8 py-4 text-base">
              Começar um projeto
              <ArrowUpRight className="size-4" />
            </Cta>
          </motion.div>

          {/* Mesma mensagem, visível sem hover em telas menores */}
          <p className="mx-auto mt-10 max-w-sm text-[0.8125rem] leading-relaxed text-bone-faint lg:hidden">
            {SECRET}
          </p>
        </div>
      </div>
    </section>
  );
}
