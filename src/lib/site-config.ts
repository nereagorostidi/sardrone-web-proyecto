export const LANDING_URL = "https://drone-sar.vercel.app";
export const LANDING_JOURNAL_URL = "https://drone-sar.vercel.app/journal.html";

export type NavChild = {
  label: string;
  href: string;
  description: string;
};

export type NavItem = {
  label: string;
  href: string;
  eyebrow: string;
  children?: NavChild[];
};

export const NAV_ITEMS: NavItem[] = [
  {
    label: "Proyecto",
    href: "/proyecto",
    eyebrow: "01",
    children: [
      {
        label: "Introducción",
        href: "/proyecto/introduccion",
        description: "El problema SAR y la solución propuesta.",
      },
      {
        label: "Objetivos",
        href: "/proyecto/objetivos",
        description: "Objetivo académico y disciplinas de la carrera.",
      },
      {
        label: "Metodología",
        href: "/proyecto/metodologia",
        description: "Desarrollo en paralelo y validación por etapas.",
      },
      {
        label: "Filosofía",
        href: "/proyecto/filosofia",
        description: "Ingeniería full-stack frente a solución comercial cerrada.",
      },
      {
        label: "Normativa y legislación",
        href: "/proyecto/normativa",
        description: "EASA, AESA, categoría A1/A3, registro de operador y Remote ID.",
      },
    ],
  },
  {
    label: "Arquitectura técnica",
    href: "/arquitectura",
    eyebrow: "02",
    children: [
      {
        label: "Comunicaciones",
        href: "/arquitectura/comunicaciones",
        description: "Enlace múltiple redundante y seguridad de las comunicaciones.",
      },
      {
        label: "Hardware",
        href: "/arquitectura/hardware",
        description: "Electrónica, sensores e integración a bordo.",
      },
      {
        label: "Software & Cloud",
        href: "/arquitectura/software",
        description: "Python, MAVLink y AWS.",
      },
    ],
  },
  {
    label: "Inteligencia Artificial",
    href: "/ia",
    eyebrow: "03",
  },
  {
    label: "Multimedia",
    href: "/multimedia",
    eyebrow: "04",
  },
  {
    label: "Impacto y futuro",
    href: "/impacto",
    eyebrow: "05",
  },
  {
    label: "Colaboradores",
    href: "/colaboradores",
    eyebrow: "06",
  },
];
