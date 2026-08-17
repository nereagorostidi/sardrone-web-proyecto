import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CircuitBoard, Radio, Server } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: "Arquitectura técnica",
  description:
    "Enlace múltiple de comunicaciones redundante, hardware modular y stack de software y cloud de Guardian Eye.",
};

const SECTIONS = [
  {
    href: "/arquitectura/comunicaciones",
    icon: Radio,
    colorVar: "var(--color-signal)",
    title: "Comunicaciones",
    description:
      "Enlace múltiple redundante — RC, telemetría, 4G/LTE y WiFi — y la red privada Tailscale que protege cada uno de esos canales.",
  },
  {
    href: "/arquitectura/hardware",
    icon: CircuitBoard,
    colorVar: "var(--color-accent)",
    title: "Hardware",
    description:
      "Pixhawk 6C y Raspberry Pi 5 como dos cerebros complementarios, sensores, pipeline de componentes y lo que aún queda por cerrar.",
  },
  {
    href: "/arquitectura/software",
    icon: Server,
    colorVar: "var(--color-mesh-violet)",
    title: "Software & Cloud",
    description:
      "Cuatro servicios Python, MQTT, un backend Flask en AWS, InfluxDB y el resto de la pila que lleva los datos del sensor al panel.",
  },
];

export default function ArquitecturaHubPage() {
  return (
    <>
      <PageHero
        eyebrow="Sec. 02 · Arquitectura técnica"
        title="Varios enlaces, dos cerebros, una nube"
        description="Cómo se comunica el dron, cómo se reparte el trabajo entre la controladora de vuelo y el ordenador de a bordo, y cómo viajan los datos hasta la nube. Cada capa tiene su propia página, con contenido ampliado."
        tone="signal"
        image={{ src: IMAGES.serverRack.src, alt: IMAGES.serverRack.alt }}
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
