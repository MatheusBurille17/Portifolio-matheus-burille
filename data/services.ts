export type Service = {
  id: string;
  index: string;
  title: string;
  description: string;
  /** Palavras-chave curtas que aparecem no hover. */
  tags: string[];
};

export const services: Service[] = [
  {
    id: "landing-pages",
    index: "01",
    title: "Landing Pages",
    description:
      "Páginas focadas em apresentar produtos, serviços ou campanhas e transformar visitantes em contatos.",
    tags: ["Copy orientada a ação", "Formulário / WhatsApp", "Carregamento rápido"],
  },
  {
    id: "sites-institucionais",
    index: "02",
    title: "Sites Institucionais",
    description:
      "Sites modernos para empresas e profissionais que precisam construir autoridade e presença digital.",
    tags: ["Estrutura de conteúdo", "Identidade aplicada", "SEO técnico"],
  },
  {
    id: "experiencias-web",
    index: "03",
    title: "Experiências Web",
    description:
      "Projetos personalizados com interações, animações e funcionalidades específicas.",
    tags: ["Animação e movimento", "Interações sob medida", "Integrações"],
  },
];
