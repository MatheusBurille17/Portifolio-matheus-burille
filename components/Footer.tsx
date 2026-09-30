"use client";

import { ArrowUp } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { site } from "@/lib/site";
import { generateWhatsAppLink } from "@/lib/whatsapp";
import { UnderlineLink } from "@/components/ui/Cta";

const YEAR = 2026;

export default function Footer() {
  const reduceMotion = useReducedMotion();

  const links = [
    { label: "Instagram", href: site.socials.instagram },
    { label: "GitHub", href: site.socials.github },
    { label: "LinkedIn", href: site.socials.linkedin },
    { label: "WhatsApp", href: generateWhatsAppLink() },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-bone/10 pt-16 md:pt-20">
      <div className="shell">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="text-[0.95rem] font-medium tracking-tight text-bone">MATHEUS BURILLE</p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-bone-dim">
              Websites, landing pages e experiências digitais.
            </p>
          </div>

          <nav aria-label="Redes e contato" className="md:col-span-4">
            <span className="eyebrow text-bone-faint">Onde me encontrar</span>
            <ul className="mt-5 grid grid-cols-2 gap-y-3">
              {links.map((link) => (
                <li key={link.label}>
                  <UnderlineLink href={link.href} external className="text-sm">
                    {link.label}
                  </UnderlineLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3 md:text-right">
            <span className="eyebrow text-bone-faint">Voltar</span>
            <div className="mt-5 md:flex md:justify-end">
              <a
                href="#inicio"
                className="group inline-flex items-center gap-2.5 text-sm text-bone-dim transition-colors duration-300 hover:text-bone"
              >
                Ao topo
                <span className="inline-flex size-8 items-center justify-center rounded-full border border-bone/15 transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-ink">
                  <ArrowUp className="size-3.5" />
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Assinatura tipográfica */}
        <div aria-hidden className="mt-16 overflow-hidden md:mt-20">
          <motion.p
            initial={reduceMotion ? undefined : { y: "22%", opacity: 0 }}
            whileInView={reduceMotion ? undefined : { y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-5% 0px" }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="whitespace-nowrap text-center text-[clamp(2.4rem,11.2vw,10rem)] font-medium leading-[0.85] tracking-[-0.055em] text-gradient-bone opacity-[0.14]"
          >
            MATHEUS BURILLE
          </motion.p>
        </div>

        <div className="flex flex-col gap-3 border-t border-bone/10 py-7 text-xs text-bone-faint sm:flex-row sm:items-center sm:justify-between">
          <p>© {YEAR} {site.name}.</p>
          <p>Feito com código, café e atenção aos detalhes.</p>
        </div>
      </div>
    </footer>
  );
}
