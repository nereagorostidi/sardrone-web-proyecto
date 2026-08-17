import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Compass, Gavel, ShieldCheck, Target, Workflow } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: "Proyecto",
  description:
    "El problema SAR, los objetivos académicos, la metodología de desarrollo y la filosofía de arquitectura abierta detrás de Guardian Eye.",
};

const SECTIONS = [
  {
    href: "/proyecto/introduccion",
    icon: Compass,
    colorVar: "var(--color-accent)",
    title: "Introducción",
    description:
      "El problema de la búsqueda y rescate, la brecha en las herramientas disponibles hoy y la solución que propone Guardian Eye.",
  },
  {
    href: "/proyecto/objetivos",
    icon: Target,
    colorVar: "var(--color-mesh-violet)",
    title: "Objetivos",
    description:
      "El objetivo académico del TFG y las disciplinas de la carrera que consolida en un único sistema.",
  },
  {
    href: "/proyecto/metodologia",
    icon: Workflow,
    colorVar: "var(--color-mesh-cyan)",
    title: "Metodología",
    description:
      "Desarrollo en paralelo de electrónica, comunicaciones y software, y validación por etapas: simulación, hardware real y vuelo real.",
  },
  {
    href: "/proyecto/filosofia",
    icon: ShieldCheck,
    colorVar: "var(--color-signal)",
    title: "Filosofía",
    description:
      "Por qué se ha optado por una arquitectura abierta y programable en lugar de comprar una solución comercial cerrada.",
  },
  {
    href: "/proyecto/normativa",
    icon: Gavel,
    colorVar: "var(--color-accent)",
    title: "Normativa y legislación",
    description:
      "EASA, AESA, categoría abierta A1/A3, registro de operador, Remote ID y seguro obligatorio — la normativa UAS aplicada al proyecto.",
  },
];

export default function ProyectoHubPage() {
  return (
    <>
      <PageHero
        eyebrow="Sec. 01 · Proyecto"
        title="El planteamiento, los objetivos y la filosofía"
        description="Por qué existe Guardian Eye, qué disciplinas de la carrera consolida, cómo se desarrolla y valida, y por qué se ha diseñado como una arquitectura abierta en lugar de comprar una solución cerrada. Cada bloque tiene su propia página, con contenido ampliado."
        image={{ src: IMAGES.droneSnowMountain.src, alt: IMAGES.droneSnowMountain.alt }}
      />

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SECTIONS.map((section, i) => {
              const Icon = section.icon;
              return (
                <Link
                  key={section.href}
                  href={section.href}
                  className="group relative flex flex-col overflow-hidden rounded-3xl border border-line bg-paper p-7 transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
                >
                  <span
                    className="font-telemetry absolute right-6 top-6 text-[34px] font-bold opacity-10"
                    style={{ color: section.colorVar }}
                  >
                    0{i + 1}
                  </span>
                  <span
                    className="flex h-12 w-12 items-center justify-center rounded-xl"
                    style={{
                      backgroundColor: `color-mix(in oklab, ${section.colorVar} 14%, white)`,
                      color: section.colorVar,
                    }}
                  >
                    <Icon className="h-5.5 w-5.5" strokeWidth={1.75} />
                  </span>
                  <span className="mt-5 text-[18px] font-bold text-ink">{section.title}</span>
                  <span className="mt-2 text-[13.5px] leading-relaxed text-ink-muted">
                    {section.description}
                  </span>
                  <span className="mt-5 inline-flex items-center gap-1 text-[12.5px] font-semibold text-accent opacity-0 transition-opacity group-hover:opacity-100">
                    Leer sección <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
