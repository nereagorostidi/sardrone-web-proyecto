import type { Metadata } from "next";
import Image from "next/image";
import { BookOpen, CircuitBoard, Cpu, MapPin, Zap } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { PageHero } from "@/components/page-hero";
import { SubpageNav } from "@/components/subpage-nav";
import { IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: "Hardware",
  description:
    "Pixhawk 6C y Raspberry Pi 5 como dos cerebros complementarios, sensores e integración a bordo de Guardian Eye.",
};

const HARDWARE_ITEMS = [
  { label: "Flight Controller", value: "Pixhawk 6C (Holybro), firmware ArduPilot" },
  { label: "GPS", value: "Holybro M10 GPS" },
  { label: "Receptor de radio", value: "FlySky FS-iA10B (mando FS-i6X)" },
  { label: "Cámara", value: "Raspberry Pi Camera Module 3 (CSI)" },
  { label: "Sensor ambiental", value: "Bosch BME680 — I2C, temperatura/humedad/presión/VOC" },
  { label: "Módem de datos", value: "4G/LTE por USB" },
  { label: "Buses", value: "MAVLink (UART) · I2C · GPIO" },
];

const GLOSSARY = [
  {
    term: "RTOS",
    def: "Sistema operativo en tiempo real: garantiza que una tarea crítica (como mantener el dron estable) se ejecute siempre dentro de un plazo fijo, algo que un sistema operativo de propósito general como Linux no puede prometer.",
  },
  {
    term: "MAVLink",
    def: "Protocolo de mensajería ligero y abierto, estándar de facto para comunicar controladoras de vuelo con estaciones de tierra y ordenadores de a bordo.",
  },
  {
    term: "UART / I2C / GPIO",
    def: "Tres formas distintas de conectar electrónica: UART para enlaces serie punto a punto (Pixhawk↔Raspberry Pi), I2C para varios sensores compartiendo el mismo bus, GPIO para señales digitales simples.",
  },
];

export default function HardwarePage() {
  return (
    <>
      <PageHero
        eyebrow="Arquitectura · Hardware"
        breadcrumbs={[
          { label: "Inicio", href: "/" },
          { label: "Arquitectura técnica", href: "/arquitectura" },
          { label: "Hardware" },
        ]}
        title="Dos cerebros mejor que uno"
        description="La Pixhawk y la Raspberry Pi no compiten por las mismas tareas: cada una domina un dominio distinto, y se comunican entre sí por MAVLink sobre UART."
        tone="signal"
        image={{ src: IMAGES.circuitBoard.src, alt: IMAGES.circuitBoard.alt }}
      />

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Separación de responsabilidades"
            title="Por qué dos ordenadores y no uno solo"
            description="Podría parecer más simple resolverlo todo con un único ordenador de a bordo. El problema es que un mismo proceso corriendo la inferencia de un modelo de IA no puede garantizar, al mismo tiempo, la latencia de milisegundos que necesita el control de motores. Separar 'lo que no puede fallar' de 'lo que piensa' es una decisión de arquitectura, no una limitación de recursos."
          />

          <div className="mt-14 grid gap-5 lg:grid-cols-2">
            <div className="rounded-3xl border border-line bg-paper p-7">
              <p className="font-telemetry text-[10.5px] uppercase text-ink-faint">
                Dominio de vuelo · Reflejos
              </p>
              <h3 className="mt-2 text-[19px] font-bold text-ink">Pixhawk 6C</h3>
              <p className="mt-3 text-[14px] leading-relaxed text-ink-muted">
                Corre en tiempo real (RTOS) con firmware ArduPilot. Su única prioridad es
                mantenerse en el aire: estabilización crítica, gestión de motores y
                seguridad de vuelo. Es la parte del sistema que no puede fallar nunca —
                por eso corre un sistema operativo en tiempo real y no Linux de propósito
                general.
              </p>
            </div>
            <div className="rounded-3xl border border-accent/30 bg-accent-soft p-7">
              <p className="font-telemetry text-[10.5px] uppercase text-accent">
                Dominio de aplicación · Inteligencia
              </p>
              <h3 className="mt-2 text-[19px] font-bold text-ink">
                Raspberry Pi 5 — Edge Companion
              </h3>
              <p className="mt-3 text-[14px] leading-relaxed text-ink-muted">
                Corre Linux y se encarga de pensar y ver: visión por computador, las
                comunicaciones 4G, la gestión de la misión y la conexión con la nube (AWS),
                sin sobrecargar la controladora de vuelo. Incorpora un acelerador{" "}
                <span className="font-medium text-ink">Hailo-8L</span> para ejecutar la
                inferencia de YOLO sin saturar la CPU.
              </p>
            </div>
          </div>

          <div className="mt-6 flex items-start gap-3 rounded-2xl border border-line bg-paper p-6">
            <MapPin className="h-5 w-5 shrink-0 text-accent" strokeWidth={1.75} />
            <p className="text-[13.5px] leading-relaxed text-ink-muted">
              La Raspberry Pi también se conecta a la red segura de Tailscale, lo que
              permite acceder a ella de forma remota sin necesidad de configurar una IP fija
              ni abrir puertos en el router — algo especialmente útil trabajando desde el
              campo, en el club de vuelo.
            </p>
          </div>

          <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:items-start">
            <div>
              <p className="font-telemetry text-[10.5px] uppercase text-ink-faint">
                Pipeline de hardware modular
              </p>
              <dl className="mt-4 divide-y divide-line rounded-2xl border border-line bg-paper">
                {HARDWARE_ITEMS.map((item) => (
                  <div key={item.label} className="flex flex-col gap-1 p-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                    <dt className="text-[13px] font-semibold text-ink">{item.label}</dt>
                    <dd className="font-telemetry text-[12px] text-ink-muted sm:text-right">{item.value}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 flex items-start gap-2 text-[12.5px] leading-relaxed text-ink-faint">
                <CircuitBoard className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={1.75} />
                Protección térmica de los componentes críticos y especificaciones finales de
                chasis, motores y batería:{" "}
                <span className="font-semibold text-ink-muted">
                  [placeholder — el dron definitivo está en fase de adquisición/montaje]
                </span>
                .
              </p>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-line">
              <Image
                src={IMAGES.circuitMacro.src}
                alt={IMAGES.circuitMacro.alt}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="mt-16">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4.5 w-4.5 text-accent" strokeWidth={1.75} />
              <p className="font-telemetry text-[10.5px] uppercase text-ink-faint">
                Glosario rápido
              </p>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              {GLOSSARY.map((g) => (
                <div key={g.term} className="rounded-2xl border border-line bg-surface p-5">
                  <p className="font-telemetry text-[12px] font-bold text-ink">{g.term}</p>
                  <p className="mt-2 text-[12.5px] leading-relaxed text-ink-muted">{g.def}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex items-start gap-3 rounded-2xl border border-accent/30 bg-accent-soft p-6">
            <Cpu className="mt-0.5 h-5 w-5 shrink-0 text-accent" strokeWidth={1.75} />
            <p className="text-[13.5px] leading-relaxed text-ink">
              <span className="font-semibold">¿Por qué un acelerador Hailo-8L y no solo CPU?</span>{" "}
              Ejecutar un modelo de detección de objetos como YOLO fotograma a fotograma es
              costoso computacionalmente. Un acelerador de IA dedicado descarga ese trabajo
              de la CPU, permitiendo que la Raspberry Pi siga gestionando comunicaciones y
              misión a la vez que procesa vídeo en tiempo real, sin cuellos de botella.
            </p>
          </div>

          <div className="mt-4 flex items-start gap-3 rounded-2xl border border-line bg-paper p-6 opacity-80">
            <Zap className="mt-0.5 h-5 w-5 shrink-0 text-ink-faint" strokeWidth={1.75} />
            <p className="text-[12.5px] leading-relaxed text-ink-faint">
              Nota: el LiDAR y la visión térmica aparecen en algunos materiales de difusión
              iniciales del proyecto (tipo pitch-deck), pero están descartados de la
              arquitectura real — esta página documenta únicamente el hardware efectivamente
              usado.
            </p>
          </div>

          <SubpageNav
            hub={{ label: "Volver a Arquitectura", href: "/arquitectura" }}
            prev={{ label: "Comunicaciones", href: "/arquitectura/comunicaciones" }}
            next={{ label: "Software & Cloud", href: "/arquitectura/software" }}
          />
        </div>
      </section>
    </>
  );
}
