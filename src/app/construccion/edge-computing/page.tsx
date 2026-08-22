import type { Metadata } from "next";
import Link from "next/link";
import { Camera, Cpu, Radio, Thermometer, Wifi } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { PageHero } from "@/components/page-hero";
import { SubpageNav } from "@/components/subpage-nav";

export const metadata: Metadata = {
  title: "Cerebro 2: Edge Computing",
  description:
    "La Raspberry Pi 5, el acelerador Hailo-8L y el módem 4G de Guardian Eye — el ordenador de a bordo que procesa vídeo y ejecuta el modelo de detección de personas.",
};

const EDGE_COMPONENTS = [
  {
    icon: Cpu,
    title: "Raspberry Pi 5",
    text: "El ordenador de a bordo. Corre Linux de propósito general — no un RTOS como la Pixhawk— porque su trabajo no es reflejo inmediato, sino cómputo: procesar vídeo y ejecutar el modelo de IA.",
  },
  {
    icon: Cpu,
    title: "Hailo-8L",
    text: "Un acelerador de inferencia conectado por PCIe a la Raspberry Pi, dedicado a ejecutar el modelo YOLO mucho más rápido de lo que podría la propia CPU de la Pi por sí sola.",
  },
  {
    icon: Camera,
    title: "Cámara (CSI)",
    text: "Raspberry Pi Camera Module 3, conectada por el bus MIPI CSI. Es la fuente de vídeo sobre la que corre la detección de personas.",
  },
  {
    icon: Wifi,
    title: "Módem 4G/LTE (USB)",
    text: "El enlace de datos de largo alcance de Guardian Eye — el mismo que llevará, más adelante, las fotos de este montaje: el pincho USB del módem conectado a la Pi.",
  },
  {
    icon: Thermometer,
    title: "Sensor ambiental BME680",
    text: "Por bus I2C. Mide temperatura, humedad, presión y compuestos orgánicos volátiles (VOC) — información útil para valorar si la zona donde está la víctima es habitable.",
  },
  {
    icon: Radio,
    title: "UART hacia la Pixhawk",
    text: "El puerto TELEM1 de la Pixhawk se conecta a los pines GPIO de la Raspberry Pi por UART, usando MAVLink — así los dos cerebros se hablan entre sí sin depender de radio.",
  },
];

export default function EdgeComputingPage() {
  return (
    <>
      <PageHero
        eyebrow="Construcción · Cerebro 2"
        breadcrumbs={[
          { label: "Inicio", href: "/" },
          { label: "Construcción del dron", href: "/construccion" },
          { label: "Cerebro 2: Edge Computing" },
        ]}
        title="El segundo cerebro: el que piensa, no el que vuela"
        description="Si la Pixhawk 6X es el cerebro de los reflejos, la Raspberry Pi 5 es el cerebro de la aplicación: procesa vídeo, ejecuta el modelo de IA y decide qué es relevante enviar a tierra — sin tocar nunca el control de motores."
        tone="accent"
        underConstruction
      />

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Por qué un segundo ordenador"
            title="Separar lo que no puede fallar de lo que piensa"
            description="Ya se explica en detalle en la página de Hardware: correr la inferencia de un modelo de IA y, al mismo tiempo, garantizar la latencia de milisegundos que necesita el control de vuelo no es tarea para un único ordenador. Por eso Guardian Eye separa ambos dominios en dos placas físicas distintas, que solo se hablan entre sí por un enlace UART con MAVLink."
          />
          <p className="mt-6 max-w-3xl text-[14.5px] leading-relaxed text-ink-muted">
            El detalle de por qué esta separación es una decisión de arquitectura, y no
            una limitación de recursos, está en{" "}
            <Link
              href="/arquitectura/hardware"
              className="font-semibold text-accent underline underline-offset-2 hover:text-accent-ink"
            >
              Arquitectura · Hardware
            </Link>
            .
          </p>

          <div className="mt-14 rounded-3xl border border-dashed border-signal/40 bg-signal-soft p-7 sm:p-8">
            <div className="flex items-start gap-3">
              <Camera className="h-5 w-5 shrink-0 text-signal" strokeWidth={1.75} />
              <div>
                <p className="text-[15px] font-bold text-ink">
                  Fotos del montaje, pendientes de añadir
                </p>
                <p className="mt-2 text-[13.5px] leading-relaxed text-ink-muted">
                  A diferencia de la página del armazón, esta sección todavía no tiene
                  fotos reales del montaje de la Raspberry Pi, el Hailo-8L y el módem 4G
                  sobre el dron — están pendientes de tomarse. En cuanto estén
                  disponibles, esta página se ampliará con el mismo formato paso a paso
                  que la del armazón.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <SectionHeading
              eyebrow="Las piezas del segundo cerebro"
              title="Qué lleva montado, aunque el paso a paso llegue después"
              description="Mientras se documenta el montaje físico, esto es lo que compone el Edge Companion y qué papel cumple cada pieza."
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {EDGE_COMPONENTS.map((component) => {
                const Icon = component.icon;
                return (
                  <div
                    key={component.title}
                    className="rounded-2xl border border-line bg-surface p-6"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent">
                      <Icon className="h-5 w-5" strokeWidth={1.75} />
                    </span>
                    <p className="mt-4 text-[14px] font-bold text-ink">{component.title}</p>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-ink-muted">
                      {component.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <SubpageNav
            hub={{ label: "Volver a Construcción", href: "/construccion" }}
            prev={{ label: "Cerebro 1: armazón y Pixhawk", href: "/construccion/armazon" }}
          />
        </div>
      </section>
    </>
  );
}
