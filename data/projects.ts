export type Project = {
  slug: string;
  name: string;
  summary: string;
  category: string;
  year: string;
  url: string;
  /** Caminho em /public. Trocar por um novo screenshot ao publicar outro projeto. */
  image: string;
  imageAlt: string;
  stack: string[];
  highlights: { label: string; value: string }[];
};

export const projects: Project[] = [
  {
    slug: "escola-burille",
    name: "Escola Burille",
    summary: "Website institucional para uma escola de artes marciais.",
    category: "Site institucional",
    year: "2026",
    url: "https://escolaburille.com.br",
    image: "/projects/escola-burille.png",
    imageAlt: "Página inicial do site da Escola Burille",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    highlights: [
      { label: "Escopo", value: "Site completo" },
      { label: "Entrega", value: "Design + código" },
      { label: "Status", value: "No ar" },
    ],
  },
];
