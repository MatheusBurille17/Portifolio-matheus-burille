import { site } from "./site";

export const DEFAULT_WHATSAPP_MESSAGE =
  "Olá, Matheus! Conheci seu trabalho pelo site e gostaria de conversar sobre um projeto.";

/** Monta o link do WhatsApp a partir do número centralizado em `lib/site.ts`. */
export function generateWhatsAppLink(message: string = DEFAULT_WHATSAPP_MESSAGE) {
  const number = site.whatsappNumber.replace(/\D/g, "");
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export type ProjectBriefing = {
  name: string;
  company?: string;
  phone?: string;
  email?: string;
  projectType: string;
  message: string;
};

/** Transforma o formulário de contato em uma mensagem legível de WhatsApp. */
export function buildBriefingMessage(briefing: ProjectBriefing) {
  const lines = [
    "Olá, Matheus! Vim pelo site e quero conversar sobre um projeto.",
    "",
    `*Nome:* ${briefing.name}`,
    briefing.company ? `*Empresa:* ${briefing.company}` : null,
    briefing.phone ? `*WhatsApp:* ${briefing.phone}` : null,
    briefing.email ? `*E-mail:* ${briefing.email}` : null,
    `*Tipo de projeto:* ${briefing.projectType}`,
    "",
    "*Sobre o projeto:*",
    briefing.message,
  ];

  return lines.filter((line) => line !== null).join("\n");
}

/** Alternativa por e-mail com o mesmo briefing. */
export function buildMailtoLink(briefing: ProjectBriefing) {
  const subject = `Novo projeto — ${briefing.name}${briefing.company ? ` (${briefing.company})` : ""}`;
  const body = buildBriefingMessage(briefing).replace(/\*/g, "");
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
