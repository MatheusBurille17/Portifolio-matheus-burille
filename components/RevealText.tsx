"use client";

import { Fragment, type ElementType } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";

type RevealTextProps = {
  text: string;
  as?: ElementType;
  className?: string;
  id?: string;
  delay?: number;
  /** Mantém o mesmo ritmo entre títulos longos e curtos. */
  stagger?: number;
};

const word: Variants = {
  hidden: { y: "110%" },
  visible: { y: 0 },
};

/**
 * Revela um título palavra por palavra a partir de uma máscara.
 * Quebras de linha explícitas podem ser feitas com "\n".
 *
 * O gatilho de viewport fica no elemento externo: as palavras ficam
 * escondidas pelo `overflow-hidden` e nunca seriam detectadas sozinhas.
 */
export default function RevealText({
  text,
  as: Tag = "h2",
  className,
  id,
  delay = 0,
  stagger = 0.045,
}: RevealTextProps) {
  const reduceMotion = useReducedMotion();
  const lines = text.split("\n");
  let wordIndex = 0;

  if (reduceMotion) {
    return (
      <Tag className={className} id={id}>
        {lines.map((line, index) => (
          <Fragment key={index}>
            {index > 0 ? <br /> : null}
            {line}
          </Fragment>
        ))}
      </Tag>
    );
  }

  return (
    <Tag className={className} id={id}>
      <span className="sr-only">{text.replace(/\n/g, " ")}</span>
      <motion.span
        aria-hidden
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-12% 0px" }}
      >
        {lines.map((line, lineIndex) => (
          <span key={lineIndex} className="block">
            {line.split(" ").map((text) => {
              const currentDelay = delay + wordIndex * stagger;
              wordIndex += 1;
              return (
                <span
                  key={`${text}-${wordIndex}`}
                  className="inline-flex overflow-hidden pb-[0.12em] align-bottom"
                >
                  <motion.span
                    className="inline-block will-change-transform"
                    variants={word}
                    transition={{
                      duration: 0.85,
                      delay: currentDelay,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    {text}
                  </motion.span>
                  <span className="inline-block">&nbsp;</span>
                </span>
              );
            })}
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
