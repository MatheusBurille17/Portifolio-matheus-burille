/**
 * Ponto único de configuração do site.
 * Troque aqui número de WhatsApp, e-mail e redes sociais.
 */
export const site = {
  name: "Matheus Burille",
  shortName: "MB.",
  role: "Desenvolvedor Web",
  title: "Matheus Burille — Desenvolvimento Web & Experiências Digitais",
  description:
    "Desenvolvimento de sites, landing pages e experiências digitais modernas para empresas e profissionais.",
  url: "https://matheusburille.com.br",
  locale: "pt_BR",
  location: "Brasil",
  email: "contato@matheusburille.com.br",
  /** Formato internacional, apenas dígitos: 55 + DDD + número. */
  whatsappNumber: "5546991200310",
  available: true,
  socials: {
    instagram: "https://www.instagram.com/matheus.burille/",
    github: "https://github.com/MatheusBurille17/",
    linkedin: "https://www.linkedin.com/in/matheusburille",
  },
} as const;

export const navLinks = [
  { label: "Início", href: "#inicio" },
  { label: "Serviços", href: "#servicos" },
  { label: "Projetos", href: "#projetos" },
  { label: "Processo", href: "#processo" },
  { label: "Sobre", href: "#sobre" },
  { label: "Contato", href: "#contato" },
] as const;
