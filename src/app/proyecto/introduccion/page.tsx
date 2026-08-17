import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  Gauge,
  Lightbulb,
  MountainSnow,
  ShieldCheck,
  Users,
} from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { PageHero } from "@/components/page-hero";
import { SubpageNav } from "@/components/subpage-nav";
import { IMAGES } from "@/lib/images";

const TECHNICAL_LINKS = [
  {
    href: "/arquitectura/comunicaciones",
    title: "Cómo se comunica",
    description:
      "Enlace múltiple y redundante (RC, telemetría, 4G/LTE, WiFi) asegurado con Tailscale bajo el paradigma Zero Trust Network.",
  },
  {
    href: "/ia",
    title: "Cómo detecta personas",
    description:
      "Visión por computador con OpenCV y un modelo YOLO entrenado a medida, ejecutado a bordo en tiempo real.",
  },
];

export const metadata: Metadata = {
  title: "Introducción",
  description:
    "El problema de la Búsqueda y Rescate (SAR), la brecha en las herramientas actuales y la solución que propone Guardian Eye.",
};

export default function IntroduccionPage() {
  return (
    <>
      <PageHero
        eyebrow="Proyecto · Introducción"
        breadcrumbs={[
          { label: "Inicio", href: "/" },
          { label: "Proyecto", href: "/proyecto" },
          { label: "Introducción" },
        ]}
        title="El desafío: encontrar lo invisible contrarreloj"
        description="Las misiones de Búsqueda y Rescate (SAR, Search and Rescue) son una carrera contra el tiempo. Los excursionistas perdidos, el humo incipiente o los terrenos difíciles requieren ojos en el cielo — pero las herramientas actuales presentan una brecha crítica."
        underConstruction
        image={{ src: IMAGES.foggyForest.src, alt: IMAGES.foggyForest.alt }}
      />

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <SectionHeading
                eyebrow="El contexto"
                title="Por qué cada minuto cuenta en una misión SAR"
                description="En una búsqueda sobre terreno abierto —montaña, bosque o zona rural— la persona perdida puede estar expuesta a hipotermia, deshidratación o lesiones. Cuanto más tarda un equipo de rescate en cubrir el área, menor es la probabilidad de un desenlace favorable. Es exactamente el tipo de tarea —cubrir grandes extensiones desde el aire, de forma rápida y repetible— en la que un dron aporta más que un equipo a pie por sí solo."
              />

              <div className="mt-10 space-y-5">
                <div className="flex gap-4 rounded-2xl border border-line bg-paper p-5">
                  <AlertTriangle className="h-5 w-5 shrink-0 text-signal" strokeWidth={1.75} />
                  <div>
                    <p className="text-[13.5px] font-bold text-ink">El problema</p>
                    <p className="mt-1 text-[14px] leading-relaxed text-ink-muted">
                      Los drones comerciales profesionales orientados a emergencias son
                      &ldquo;cajas negras&rdquo; cerradas y extremadamente costosas,
                      imposibles de modificar por el usuario: no se puede auditar su
                      firmware, adaptar su lógica de detección ni integrarlas con
                      herramientas propias.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 rounded-2xl border border-line bg-paper p-5">
                  <Gauge className="h-5 w-5 shrink-0 text-ink-faint" strokeWidth={1.75} />
                  <div>
                    <p className="text-[13.5px] font-bold text-ink">La brecha</p>
                    <p className="mt-1 text-[14px] leading-relaxed text-ink-muted">
                      Falta de herramientas asequibles, hackeables y autónomas para grupos
                      locales de emergencia y voluntarios, que en muchos casos dependen de
                      material cedido o de aeromodelismo adaptado a mano.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 rounded-2xl border border-accent/30 bg-accent-soft p-5">
                  <Lightbulb className="h-5 w-5 shrink-0 text-accent" strokeWidth={1.75} />
                  <div>
                    <p className="text-[13.5px] font-bold text-ink">La solución Guardian Eye</p>
                    <p className="mt-1 text-[14px] leading-relaxed text-ink-muted">
                      Un sistema diseñado desde cero para apoyar la búsqueda en condiciones
                      de baja visibilidad, apoyándose en visión por computador allí donde el
                      ojo humano tiene menos oportunidades de encontrar a tiempo a la persona
                      buscada — sin sustituir al equipo humano, sino ampliando su alcance.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-line">
              <Image
                src={IMAGES.foggyForest.src}
                alt={IMAGES.foggyForest.alt}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/70 to-transparent p-6">
                <p className="font-telemetry text-[10px] uppercase text-white/70">
                  Escenario representativo
                </p>
                <p className="mt-1 text-[13px] text-white/90">
                  Terreno de baja visibilidad, el tipo de entorno donde una misión SAR
                  pierde minutos críticos.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16 grid gap-4 lg:grid-cols-2">
            <div className="rounded-2xl border border-line bg-surface p-6">
              <div className="flex items-center gap-2">
                <MountainSnow className="h-4.5 w-4.5 text-accent" strokeWidth={1.75} />
                <p className="font-telemetry text-[10.5px] uppercase text-ink-faint">
                  Un rol complementario, no un sustituto
                </p>
              </div>
              <p className="mt-3 text-[14px] leading-relaxed text-ink-muted">
                Un dron no reemplaza a los equipos caninos ni a los rescatadores sobre el
                terreno: cubre lo que a ellos les cuesta más — grandes superficies, en poco
                tiempo, desde una perspectiva que el suelo no ofrece. Guardian Eye está
                pensado como una herramienta más dentro del protocolo de búsqueda de un
                club o grupo de emergencia, no como una solución aislada.
              </p>
            </div>
            <div className="rounded-2xl border border-line bg-surface p-6">
              <div className="flex items-center gap-2">
                <Users className="h-4.5 w-4.5 text-accent" strokeWidth={1.75} />
                <p className="font-telemetry text-[10.5px] uppercase text-ink-faint">
                  Pensado para grupos locales
                </p>
              </div>
              <p className="mt-3 text-[14px] leading-relaxed text-ink-muted">
                El coste y la naturaleza cerrada del hardware profesional dejan fuera a
                clubes de aeromodelismo, agrupaciones de voluntarios y protección civil
                local. Guardian Eye documenta cada decisión de diseño precisamente para que
                ese tipo de grupos puedan replicarlo, entenderlo y adaptarlo.
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-3xl border border-line bg-surface p-8">
            <div className="flex items-start gap-3">
              <ShieldCheck className="h-5 w-5 shrink-0 text-accent" strokeWidth={1.75} />
              <div>
                <p className="text-[15px] font-bold text-ink">Marco regulatorio cumplido</p>
                <p className="mt-2 max-w-3xl text-[14px] leading-relaxed text-ink-muted">
                  El proyecto opera bajo el certificado de piloto AESA A1/A3 y un número de
                  operador registrado, en cumplimiento del RD 517/2024 (España) y el
                  Reglamento (UE) 2019/947 —el marco EASA por categorías: abierta,
                  específica y certificada—. La categoría abierta A1/A3 permite volar sobre
                  zonas sin sobrevolar personas no involucradas y manteniendo la distancia
                  de seguridad reglamentaria, sin necesitar una autorización operacional
                  específica previa, siempre que se cumplan los límites de peso y altura de
                  la normativa. Cada vuelo verifica la zona con la aplicación oficial{" "}
                  <span className="font-medium text-ink">ENAIRE Drones</span> antes de
                  despegar. Detalle completo en{" "}
                  <Link
                    href="/proyecto/normativa"
                    className="font-medium text-accent underline underline-offset-2"
                  >
                    Normativa y legislación
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16">
            <SectionHeading
              eyebrow="Profundiza"
              title="Cómo lo resolvemos técnicamente"
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {TECHNICAL_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group flex items-center justify-between gap-4 rounded-2xl border border-line bg-paper p-6 transition-colors hover:border-accent/40"
                >
                  <div>
                    <p className="text-[13.5px] font-bold text-ink">{link.title}</p>
                    <p className="mt-1 text-[13px] leading-relaxed text-ink-muted">
                      {link.description}
                    </p>
                  </div>
                  <ArrowRight
                    className="h-4 w-4 shrink-0 text-ink-faint transition-transform group-hover:translate-x-0.5 group-hover:text-accent"
                    strokeWidth={2}
                  />
                </Link>
              ))}
            </div>
          </div>

          <SubpageNav
            hub={{ label: "Volver a Proyecto", href: "/proyecto" }}
            next={{ label: "Objetivos", href: "/proyecto/objetivos" }}
          />
        </div>
      </section>
    </>
  );
}
