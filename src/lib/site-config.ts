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
        label: "Hardware",
        href: "/arquitectura/hardware",
        description: "Electrónica, sensores e integración a bordo.",
      },
      {
        label: "Comunicaciones",
        href: "/arquitectura/comunicaciones",
        description: "Enlace múltiple redundante y seguridad de las comunicaciones.",
      },
      {
        label: "Vídeo",
        href: "/arquitectura/video",
        description: "Analógico vs. digital, VTX y cómo transmitimos en directo.",
      },
      {
        label: "Datos e IoT",
        href: "/arquitectura/datos",
        description: "MQTT, buffer resiliente y el porqué de cada decisión de arquitectura.",
      },
      {
        label: "Software & Cloud",
        href: "/arquitectura/software",
        description: "Python, MAVLink y AWS.",
      },
    ],
  },
  {
    label: "Construcción del dron",
    href: "/construccion",
    eyebrow: "03",
    children: [
      {
        label: "Piezas de un dron",
        href: "/construccion/piezas",
        description: "La anatomía básica de cualquier multirrotor, pieza a pieza.",
      },
      {
        label: "Cerebro 1: armazón y Pixhawk",
        href: "/construccion/armazon",
        description: "Del kit Holybro X500 V2 al armazón volando, paso a paso y con fotos propias.",
      },
      {
        label: "Cerebro 2: Edge Computing",
        href: "/construccion/edge-computing",
        description: "Raspberry Pi 5, Hailo-8L y el módem 4G — el ordenador de a bordo.",
      },
    ],
  },
  {
    label: "Inteligencia Artificial",
    href: "/ia",
    eyebrow: "04",
  },
  {
    label: "Multimedia",
    href: "/multimedia",
    eyebrow: "05",
    children: [
      {
        label: "Galería",
        href: "/multimedia",
        description: "Vuelos, detecciones YOLO y el montaje del hardware, en vídeo y foto.",
      },
      {
        label: "Documentación y recursos",
        href: "/multimedia/documentacion",
        description: "Repositorios, guías oficiales, normativa y PDFs técnicos descargables.",
      },
    ],
  },
  {
    label: "Impacto y futuro",
    href: "/impacto",
    eyebrow: "06",
  },
  {
    label: "Colaboradores",
    href: "/colaboradores",
    eyebrow: "07",
  },
];
