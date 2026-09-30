"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { navLinks, site } from "@/lib/site";
import { generateWhatsAppLink } from "@/lib/whatsapp";
import Magnetic from "@/components/MagneticButton";

const sectionIds = navLinks.map((link) => link.href.replace("#", ""));

export default function Header() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("inicio");

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 24);
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.2, 0.6] },
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[90]">
        {/* Fundo do header no mobile — no desktop quem carrega o blur é a pílula de navegação */}
        <div
          aria-hidden
          className={`absolute inset-0 border-b bg-ink/75 backdrop-blur-xl transition-opacity duration-500 lg:hidden ${
            scrolled && !open ? "border-bone/10 opacity-100" : "border-transparent opacity-0"
          }`}
        />
        <motion.div
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className={`shell relative flex items-center justify-between transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            scrolled ? "py-3" : "py-5 md:py-7"
          }`}
        >
          <a
            href="#inicio"
            aria-label={`${site.name} — voltar ao início`}
            className="group relative z-10 flex items-baseline gap-2"
          >
            <span className="text-[0.95rem] font-medium tracking-[-0.01em] text-bone transition-opacity duration-300 group-hover:opacity-70">
              <span className="hidden sm:inline">MATHEUS BURILLE</span>
              <span className="sm:hidden">MB.</span>
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse-dot" />
          </a>

          <nav
            aria-label="Navegação principal"
            className={`pointer-events-auto absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 rounded-full border px-2 py-1.5 transition-all duration-500 lg:flex ${
              scrolled
                ? "border-bone/10 bg-ink/70 backdrop-blur-xl"
                : "border-transparent bg-transparent"
            }`}
          >
            {navLinks.map((link) => {
              const id = link.href.replace("#", "");
              const isActive = active === id;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative rounded-full px-3.5 py-1.5 text-[0.8125rem] transition-colors duration-300 ${
                    isActive ? "text-ink" : "text-bone-dim hover:text-bone"
                  }`}
                >
                  {isActive ? (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-accent"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  ) : null}
                  {link.label}
                </a>
              );
            })}
          </nav>

          <div className="relative z-10 flex items-center gap-3">
            <Magnetic className="hidden md:block">
              <a
                href={generateWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full border border-bone/15 bg-bone/[0.03] px-5 py-2.5 text-[0.8125rem] text-bone backdrop-blur-md transition-colors duration-300 hover:border-accent/60 hover:text-accent"
              >
                Vamos conversar
                <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </Magnetic>

            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="menu-mobile"
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              className="inline-flex size-10 items-center justify-center rounded-full border border-bone/15 bg-ink/50 text-bone backdrop-blur-md transition-colors hover:border-bone/35 lg:hidden"
            >
              {open ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </motion.div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="menu-mobile"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[85] flex flex-col justify-between bg-ink px-5 pb-10 pt-28 md:px-10 lg:hidden"
          >
            <div className="grid-backdrop pointer-events-none absolute inset-0 opacity-40" />
            <nav aria-label="Navegação mobile" className="relative flex flex-col">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12 + index * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="group flex items-baseline justify-between border-b border-bone/10 py-4 text-3xl font-medium tracking-tight text-bone sm:text-4xl"
                >
                  {link.label}
                  <span className="font-mono text-xs text-bone-faint">
                    0{index + 1}
                  </span>
                </motion.a>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.6 }}
              className="relative space-y-5"
            >
              <a
                href={generateWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-4 text-sm font-medium text-ink"
              >
                Vamos conversar
                <ArrowUpRight className="size-4" />
              </a>
              <p className="text-center text-xs text-bone-faint">
                {site.email}
              </p>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
