"use client";

import { useState, type FormEvent } from "react";
import { ArrowUpRight, Check, ChevronDown, Mail } from "lucide-react";
import RevealText from "@/components/RevealText";
import ScrollReveal from "@/components/ScrollReveal";
import SectionLabel from "@/components/ui/SectionLabel";
import { UnderlineLink } from "@/components/ui/Cta";
import Magnetic from "@/components/MagneticButton";
import { site } from "@/lib/site";
import {
  buildBriefingMessage,
  buildMailtoLink,
  generateWhatsAppLink,
  type ProjectBriefing,
} from "@/lib/whatsapp";

const PROJECT_TYPES = ["Landing Page", "Site institucional", "Site profissional", "Outro"];

const EMPTY: ProjectBriefing = {
  name: "",
  company: "",
  phone: "",
  email: "",
  projectType: "",
  message: "",
};

const fieldClass =
  "w-full border-b border-bone/15 bg-transparent py-3 text-[0.9375rem] text-bone outline-none transition-colors duration-300 placeholder:text-bone-faint focus:border-accent aria-[invalid=true]:border-red-400/70";

export default function Contact() {
  const [form, setForm] = useState<ProjectBriefing>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof ProjectBriefing, boolean>>>({});
  const [sent, setSent] = useState(false);

  const update = (key: keyof ProjectBriefing, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
    if (errors[key]) setErrors((current) => ({ ...current, [key]: false }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = {
      name: form.name.trim().length < 2,
      projectType: form.projectType === "",
      message: form.message.trim().length < 10,
    };
    setErrors(nextErrors);
    if (Object.values(nextErrors).some(Boolean)) return;

    window.open(generateWhatsAppLink(buildBriefingMessage(form)), "_blank", "noopener,noreferrer");
    setSent(true);
  };

  return (
    <section id="contato" aria-labelledby="contato-titulo" className="relative py-24 md:py-36">
      <div className="shell">
        <SectionLabel index="06">Contato</SectionLabel>

        <div className="mt-8 grid gap-14 md:mt-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <RevealText
              as="h2"
              id="contato-titulo"
              text={"Vamos conversar\nsobre seu projeto."}
              className="display-lg"
            />

            <ScrollReveal delay={0.12}>
              <p className="mt-8 max-w-md text-base leading-relaxed text-bone-dim">
                Me conte um pouco sobre o que você está pensando. A partir disso, podemos entender o
                que faz sentido para o seu negócio.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.2} className="mt-12">
              <div className="rounded-xl border border-bone/10 bg-bone/[0.02] p-6">
                <span className="eyebrow text-bone-faint">Prefere falar direto?</span>
                <div className="mt-5 flex flex-col gap-4">
                  <Magnetic className="self-start" strength={8}>
                    <a
                      href={generateWhatsAppLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2.5 text-xl font-medium tracking-tight text-bone transition-colors duration-300 hover:text-accent md:text-2xl"
                    >
                      WhatsApp
                      <ArrowUpRight className="size-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>
                  </Magnetic>
                  <UnderlineLink href={`mailto:${site.email}`} className="self-start text-sm">
                    <Mail className="mr-1.5 inline size-3.5 align-[-2px]" />
                    {site.email}
                  </UnderlineLink>
                </div>
                <p className="mt-6 inline-flex items-center gap-2 text-[0.8125rem] text-bone-dim">
                  <span className="size-1.5 rounded-full bg-accent animate-pulse-dot" />
                  {site.available ? "Disponível para novos projetos" : "Agenda fechada no momento"}
                </p>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
            <form onSubmit={handleSubmit} noValidate className="space-y-8">
              <div className="grid gap-8 sm:grid-cols-2">
                <Field label="Nome" htmlFor="nome" required error={errors.name}>
                  <input
                    id="nome"
                    name="nome"
                    autoComplete="name"
                    placeholder="Como devo te chamar"
                    value={form.name}
                    onChange={(event) => update("name", event.target.value)}
                    aria-invalid={errors.name ? "true" : undefined}
                    aria-describedby={errors.name ? "erro-nome" : undefined}
                    className={fieldClass}
                  />
                  {errors.name ? (
                    <span id="erro-nome" className="mt-2 block text-xs text-red-400">
                      Informe seu nome.
                    </span>
                  ) : null}
                </Field>

                <Field label="Empresa" htmlFor="empresa">
                  <input
                    id="empresa"
                    name="empresa"
                    autoComplete="organization"
                    placeholder="Opcional"
                    value={form.company}
                    onChange={(event) => update("company", event.target.value)}
                    className={fieldClass}
                  />
                </Field>

                <Field label="WhatsApp" htmlFor="whatsapp">
                  <input
                    id="whatsapp"
                    name="whatsapp"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="(00) 00000-0000"
                    value={form.phone}
                    onChange={(event) => update("phone", event.target.value)}
                    className={fieldClass}
                  />
                </Field>

                <Field label="E-mail" htmlFor="email">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="voce@empresa.com"
                    value={form.email}
                    onChange={(event) => update("email", event.target.value)}
                    className={fieldClass}
                  />
                </Field>
              </div>

              <Field label="Tipo de projeto" htmlFor="tipo" required error={errors.projectType}>
                <div className="relative">
                  <select
                    id="tipo"
                    name="tipo"
                    value={form.projectType}
                    onChange={(event) => update("projectType", event.target.value)}
                    aria-invalid={errors.projectType ? "true" : undefined}
                    aria-describedby={errors.projectType ? "erro-tipo" : undefined}
                    className={`${fieldClass} ${form.projectType ? "" : "text-bone-faint"} cursor-pointer appearance-none pr-8`}
                  >
                    <option value="">Selecione uma opção</option>
                    {PROJECT_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    aria-hidden
                    className="pointer-events-none absolute right-1 top-1/2 size-4 -translate-y-1/2 text-bone-faint"
                  />
                </div>
                {errors.projectType ? (
                  <span id="erro-tipo" className="mt-2 block text-xs text-red-400">
                    Escolha o tipo de projeto.
                  </span>
                ) : null}
              </Field>

              <Field
                label="Conte um pouco sobre o projeto"
                htmlFor="mensagem"
                required
                error={errors.message}
              >
                <textarea
                  id="mensagem"
                  name="mensagem"
                  rows={4}
                  placeholder="O que você precisa, para quem é e qual o objetivo."
                  value={form.message}
                  onChange={(event) => update("message", event.target.value)}
                  aria-invalid={errors.message ? "true" : undefined}
                  aria-describedby={errors.message ? "erro-mensagem" : undefined}
                  className={`${fieldClass} resize-none`}
                />
                {errors.message ? (
                  <span id="erro-mensagem" className="mt-2 block text-xs text-red-400">
                    Escreva pelo menos uma frase sobre o projeto.
                  </span>
                ) : null}
              </Field>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-4 pt-2">
                <Magnetic strength={10}>
                  <button
                    type="submit"
                    className="group inline-flex items-center gap-2.5 rounded-full bg-accent px-7 py-3.5 text-sm font-medium text-ink transition-colors duration-300 hover:bg-bone"
                  >
                    Enviar projeto
                    <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </button>
                </Magnetic>

                <p className="text-xs leading-relaxed text-bone-faint">
                  O envio abre uma conversa no WhatsApp com os dados preenchidos.
                </p>
              </div>

              {sent ? (
                <p
                  role="status"
                  className="flex flex-wrap items-center gap-2 rounded-lg border border-accent/30 bg-accent/[0.06] px-4 py-3 text-[0.8125rem] text-bone"
                >
                  <Check className="size-4 shrink-0 text-accent" />
                  Conversa aberta no WhatsApp. Se a janela não abrir,{" "}
                  <a
                    href={buildMailtoLink(form)}
                    className="underline decoration-accent underline-offset-4"
                  >
                    envie o mesmo briefing por e-mail
                  </a>
                  .
                </p>
              ) : null}
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  htmlFor,
  required,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  error?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className={`eyebrow block transition-colors duration-300 ${error ? "text-red-400" : "text-bone-faint"}`}
      >
        {label}
        {required ? <span className="ml-1 text-accent">*</span> : null}
      </label>
      <div className="mt-1">{children}</div>
    </div>
  );
}
