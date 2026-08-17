import type { Metadata } from "next";
import { BookOpen, Recycle, Wrench } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { PhilosophyComparison } from "@/components/diagrams/philosophy-comparison";
import { OpenSourceCard } from "@/components/open-source-card";
import { PageHero } from "@/components/page-hero";
import { SubpageNav } from "@/components/subpage-nav";
import { IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: "Filosofía",
  description:
    "Por qué Guardian Eye se ha diseñado como una arquitectura abierta y programable en lugar de comprar una solución comercial cerrada.",
};

const REASONS = [
  {
    icon: Wrench,
    title: "Reparable y auditable",
    text: "Si un componente falla, se sustituye por una pieza estándar del mercado (una Raspberry Pi, un módulo GPS) en lugar de depender del fabricante único de una caja cerrada.",
  },
  {
    icon: BookOpen,
    title: "Documentable de verdad",
    text: "Un firmware propietario no se puede explicar en una memoria de TFG más allá de lo que dice el folleto comercial. Un stack abierto sí se puede documentar hasta el último detalle.",
  },
  {
    icon: Recycle,
    title: "Reutilizable después del TFG",
    text: "El mismo diseño sirve de base para otros proyectos —de investigación, de club o de otro estudiante— sin pedir permiso a nadie ni pagar una licencia.",
  },
];

export default function FilosofiaPage() {
  return (
    <>
      <PageHero
        eyebrow="Proyecto · Filosofía"
        breadcrumbs={[
          { label: "Inicio", href: "/" },
          { label: "Proyecto", href: "/proyecto" },
          { label: "Filosofía" },
        ]}
        title="Arquitectura abierta frente a solución comercial cerrada"
        description="No se compra una solución cerrada; se diseña la arquitectura para tener control total sobre los datos y la lógica de vuelo."
        underConstruction
        image={{ src: IMAGES.circuitMacro.src, alt: IMAGES.circuitMacro.alt }}
      />

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="La decisión de fondo"
            title="Por qué importa que sea abierto, no solo que vuele"
            description="Cualquier dron de gama alta puede grabar vídeo y volar de forma estable. La diferencia de Guardian Eye no está en volar, sino en que cada capa del sistema —desde el firmware de vuelo hasta el modelo de detección— es propia, modificable y explicable."
          />

          <div className="mt-12">
            <PhilosophyComparison />
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {REASONS.map((reason) => {
              const Icon = reason.icon;
              return (
                <div key={reason.title} className="rounded-2xl border border-line bg-paper p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent">
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <p className="mt-4 text-[14px] font-bold text-ink">{reason.title}</p>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-ink-muted">
                    {reason.text}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-10">
            <OpenSourceCard />
          </div>

          <div className="mt-8 rounded-2xl border border-line bg-surface p-6">
            <p className="text-[13.5px] leading-relaxed text-ink-muted">
              Como referencia concreta: frente a un dron de consumo reciente como el{" "}
              <span className="font-medium text-ink">DJI Neo 2</span> —controladora de vuelo
              propietaria no documentada, protocolo de control cifrado, app cerrada y
              procesamiento a bordo no programable—, Guardian Eye se apoya en{" "}
              <span className="font-medium text-ink">Pixhawk + ArduPilot</span> (firmware
              abierto), <span className="font-medium text-ink">MAVLink</span> (protocolo
              estándar abierto para comunicar controladora de vuelo y estación de tierra),
              una estación de tierra intercambiable (Mission Planner o QGroundControl), una
              Raspberry Pi 5 completamente programable y una pila cloud propia y auditable.
            </p>
          </div>

          <p className="mt-6 text-[13px] leading-relaxed text-ink-faint">
            Esto no es una crítica al DJI Neo 2 como producto de consumo — está bien
            resuelto para lo que fue diseñado. Es, simplemente, una herramienta pensada para
            otro objetivo: un dron listo para volar sin abrir el capó, mientras que Guardian
            Eye está pensado precisamente para poder abrirlo.
          </p>

          <SubpageNav
            hub={{ label: "Volver a Proyecto", href: "/proyecto" }}
            prev={{ label: "Metodología", href: "/proyecto/metodologia" }}
            next={{ label: "Normativa y legislación", href: "/proyecto/normativa" }}
          />
        </div>
      </section>
    </>
  );
}
