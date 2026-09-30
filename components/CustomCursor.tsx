"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";

type CursorMode = "default" | "link" | "view" | "drag";

const LABELS: Partial<Record<CursorMode, string>> = {
  view: "Ver",
  drag: "Arraste",
};

/**
 * Cursor customizado apenas para ponteiros precisos (desktop).
 * Elementos podem pedir um estado específico via `data-cursor="view"`.
 */
export default function CustomCursor() {
  const reduceMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState<CursorMode>("default");

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 1200, damping: 60, mass: 0.35 });
  const springY = useSpring(y, { stiffness: 1200, damping: 60, mass: 0.35 });
  const ringX = useSpring(x, { stiffness: 220, damping: 26, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 220, damping: 26, mass: 0.6 });

  useEffect(() => {
    if (reduceMotion) return;
    const query = window.matchMedia("(pointer: fine)");
    const sync = () => setEnabled(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, [reduceMotion]);

  useEffect(() => {
    if (!enabled) {
      document.body.removeAttribute("data-custom-cursor");
      return;
    }
    document.body.setAttribute("data-custom-cursor", "on");

    const resolveMode = (target: EventTarget | null): CursorMode => {
      if (!(target instanceof Element)) return "default";
      const marked = target.closest<HTMLElement>("[data-cursor]");
      if (marked) return (marked.dataset.cursor as CursorMode) ?? "default";
      if (target.closest('a, button, [role="button"], input, textarea, select, label')) {
        return "link";
      }
      return "default";
    };

    const onMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);
      setMode(resolveMode(event.target));
    };
    const onLeave = () => setVisible(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("blur", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
      document.body.removeAttribute("data-custom-cursor");
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const label = LABELS[mode];
  const ringSize = mode === "default" ? 34 : label ? 84 : 58;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[120] hidden lg:block">
      <motion.div
        className="absolute left-0 top-0 rounded-full bg-accent"
        style={{ x: springX, y: springY, width: 6, height: 6, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: visible && !label ? 1 : 0, scale: mode === "link" ? 0.6 : 1 }}
        transition={{ duration: 0.2 }}
      />
      <motion.div
        className="absolute left-0 top-0 flex items-center justify-center rounded-full border border-bone/30 backdrop-blur-[1px]"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: ringSize,
          height: ringSize,
          opacity: visible ? 1 : 0,
          backgroundColor: label ? "rgba(205,255,74,1)" : "rgba(242,241,237,0)",
          borderColor: label ? "rgba(205,255,74,1)" : "rgba(242,241,237,0.3)",
        }}
        transition={{ type: "spring", stiffness: 320, damping: 30 }}
      >
        <AnimatePresence>
          {label ? (
            <motion.span
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              className="text-[11px] font-medium uppercase tracking-[0.12em] text-ink"
            >
              {label}
            </motion.span>
          ) : null}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
