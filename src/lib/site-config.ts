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
        href: "/proyecto#introduccion",
        description: "El problema SAR y la solución propuesta.",
      },
      {
        label: "Objetivos",
        href: "/proyecto#objetivos",
        description: "Objetivo académico y competencias de la carrera.",
      },
      {
        label: "Filosofía",
        href: "/proyecto#filosofia",
        description: "Ingeniería full-stack frente a solución comercial cerrada.",
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
        href: "/arquitectura#comunicaciones",
        description: "Triple enlace redundante y seguridad de las comunicaciones.",
      },
      {
        label: "Hardware",
        href: "/arquitectura#hardware",
        description: "Electrónica, sensores e integración a bordo.",
      },
      {
        label: "Software & Cloud",
        href: "/arquitectura#software",
        description: "Python, MAVLink, AWS y N8N.",
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
