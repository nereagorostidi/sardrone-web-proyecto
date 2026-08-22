import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Cpu, Puzzle, Wrench } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: "Construcción del dron",
  description:
    "Cómo se monta Guardian Eye pieza a pieza: la anatomía de un multirrotor, el armazón y la Pixhawk 6X, y el Edge Companion con la Raspberry Pi.",
};

const SECTIONS = [
  {
    href: "/construccion/piezas",
    icon: Puzzle,
    colorVar: "var(--color-mesh-violet)",
    title: "Piezas de un dron",
    description:
      "La anatomía básica que comparte cualquier multirrotor — chasis, motores, ESCs, PDB, batería, controladora y radios — explicada con las piezas reales de Guardian Eye.",
  },
  {
    href: "/construccion/armazon",
    icon: Wrench,
    colorVar: "var(--color-signal)",
    title: "Cerebro 1: armazón y Pixhawk",
    description:
      "Por qué se compró el kit Holybro X500 V2 en vez de piezas sueltas, y el montaje paso a paso del armazón y la controladora de vuelo, con fotos propias.",
  },
  {
    href: "/construccion/edge-computing",
    icon: Cpu,
    colorVar: "var(--color-accent)",
    title: "Cerebro 2: Edge Computing",
    description:
      "La Raspberry Pi 5, el acelerador Hailo-8L y el módem 4G — el ordenador de a bordo que piensa, no el que vuela.",
  },
];

export default function ConstruccionHubPage() {
  return (
    <>
      <PageHero
        eyebrow="Sec. 03 · Construcción del dron"
        title="Del kit a un dron que vuela, pieza a pieza"
        description="Guardian Eye tiene, en realidad, dos cerebros: uno que reacciona (la controladora de vuelo) y otro que piensa (el ordenador de a bordo). Esta sección documenta cómo se monta cada uno, con fotos reales del propio proceso."
        tone="accent"
        image={{
          src: IMAGES.buildFrameDone.src,
          alt: IMAGES.buildFrameDone.alt,
          objectPosition: "50% 45%",
        }}
      />

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-5 lg:grid-cols-3">
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
