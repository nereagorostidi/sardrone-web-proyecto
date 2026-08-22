import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Brain, Cpu } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { PageHero } from "@/components/page-hero";
import { SubpageNav } from "@/components/subpage-nav";
import { IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: "Piezas de un dron",
  description:
    "La anatomía básica de cualquier multirrotor — chasis, motores, ESCs, PDB, batería, controladora de vuelo y radios — explicada con las piezas reales de Guardian Eye.",
};

const PARTS = [
  {
    image: IMAGES.buildPlates,
    title: "Chasis (frame)",
    text: "El esqueleto del dron: una o varias placas centrales de fibra de carbono de las que salen los brazos. Tiene que ser rígido y ligero a la vez — la fibra de carbono es el material estándar por esa razón.",
  },
  {
    image: IMAGES.buildArms,
    title: "Motores y hélices",
    text: "Motores brushless (sin escobillas), uno por brazo, cada uno con su propia hélice. Un cuadricóptero como Guardian Eye lleva cuatro; dos giran en un sentido y dos en el contrario, para cancelar el par de reacción entre sí.",
  },
  {
    image: IMAGES.buildEsc,
    title: "ESC (Electronic Speed Controller)",
    text: "Un controlador de velocidad por motor. Traduce la orden de la controladora de vuelo ('gira más rápido', 'gira más despacio') en la corriente exacta que necesita cada motor, muchas veces por segundo.",
  },
  {
    image: IMAGES.buildPdb,
    title: "PDB (placa de distribución de potencia)",
    text: "Reparte la corriente de la batería entre los cuatro ESC y regula la tensión (normalmente 5V y 12V) que alimenta a la controladora de vuelo y al resto de la electrónica de a bordo.",
  },
  {
    image: IMAGES.buildBatteryCharger,
    title: "Batería LiPo",
    text: "La fuente de energía de todo el sistema — motores, controladora y electrónica incluidos. Las baterías LiPo (litio-polímero) se eligen por su alta densidad energética, pero exigen un cargador balanceador para no dañar sus celdas.",
  },
  {
    image: IMAGES.buildPixhawk,
    title: "Controladora de vuelo (FC)",
    text: "El 'cerebro' que mantiene el dron estable en el aire: lee los sensores decenas de veces por segundo y ajusta la velocidad de cada motor en tiempo real. En Guardian Eye es una Pixhawk 6X — el detalle completo está en la página de Hardware.",
    link: { href: "/arquitectura/hardware", label: "Ver la arquitectura de hardware" },
  },
  {
    image: IMAGES.pieceGps,
    title: "GPS y brújula",
    text: "Da a la controladora la posición y la orientación del dron, imprescindibles para el vuelo autónomo por waypoints y para funciones como el retorno automático al punto de despegue.",
  },
  {
    image: IMAGES.buildRadioControl,
    title: "Receptor de radiocontrol (RC)",
    text: "Recibe las órdenes del mando del piloto y se las pasa directamente a la controladora de vuelo — es el canal de control manual que no depende de ningún ordenador de a bordo.",
  },
  {
    image: IMAGES.pieceTelemetry,
    title: "Radio de telemetría",
    text: "Un enlace de radio independiente del RC que envía datos de vuelo (posición, batería, estado) a una estación en tierra, para poder monitorizar el dron sin tener que mirarlo directamente.",
  },
];

export default function PiezasPage() {
  return (
    <>
      <PageHero
        eyebrow="Construcción · Piezas de un dron"
        breadcrumbs={[
          { label: "Inicio", href: "/" },
          { label: "Construcción del dron", href: "/construccion" },
          { label: "Piezas de un dron" },
        ]}
        title="La anatomía básica de cualquier multirrotor"
        description="Antes de entrar en el montaje del kit Holybro o en el Edge Computing, esto es lo que necesita cualquier dron multirrotor para volar — con las piezas reales de Guardian Eye como ejemplo de cada una."
        tone="accent"
        image={{ src: IMAGES.circuitMacro.src, alt: IMAGES.circuitMacro.alt }}
      />

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="De la energía al vuelo"
            title="Nueve piezas, un mismo sistema"
            description="Ningún componente funciona aislado: la batería alimenta a la PDB, la PDB reparte corriente a los ESC, los ESC mueven los motores, y todo ese conjunto mecánico solo vuela de forma estable porque la controladora lo corrige constantemente a partir de lo que le dicen el GPS, la brújula y el resto de sensores."
          />

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PARTS.map((part) => (
              <div
                key={part.title}
                className="flex flex-col overflow-hidden rounded-3xl border border-line bg-paper"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={part.image.src}
                    alt={part.image.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-[15px] font-bold text-ink">{part.title}</p>
                  <p className="mt-2 flex-1 text-[13.5px] leading-relaxed text-ink-muted">
                    {part.text}
                  </p>
                  {part.link && (
                    <Link
                      href={part.link.href}
                      className="mt-3 text-[12.5px] font-semibold text-accent underline underline-offset-2 hover:text-accent-ink"
                    >
                      {part.link.label} →
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 grid gap-8 rounded-3xl border border-line bg-ink p-8 sm:p-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <div>
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-white">
                <Brain className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <h3 className="mt-4 text-[22px] font-extrabold leading-tight text-white">
                Hay una décima pieza: el ordenador de a bordo
              </h3>
              <p className="mt-3 text-[14px] leading-relaxed text-white/70">
                Las nueve piezas anteriores son las que necesita cualquier dron para volar
                de forma estable. Pero Guardian Eye añade un segundo ordenador —
                independiente de la controladora de vuelo— dedicado exclusivamente a
                procesar vídeo y ejecutar el modelo de IA que detecta personas. Esa pieza es
                lo bastante distinta como para merecer su propia página.
              </p>
            </div>
            <div className="grid gap-4">
              <div className="flex gap-3 rounded-2xl border border-white/10 bg-white/5 p-5">
                <Cpu className="h-5 w-5 shrink-0 text-white" strokeWidth={1.75} />
                <p className="text-[13.5px] leading-relaxed text-white/85">
                  Una Raspberry Pi 5 con un acelerador Hailo-8L y un módem 4G — el
                  &ldquo;segundo cerebro&rdquo; de Guardian Eye, que piensa pero no vuela.
                </p>
              </div>
              <Link
                href="/construccion/edge-computing"
                className="inline-flex items-center justify-center rounded-full border border-white/20 px-4 py-2.5 text-[13px] font-semibold text-white transition-colors hover:border-white/40"
              >
                Ir a Cerebro 2: Edge Computing →
              </Link>
            </div>
          </div>

          <SubpageNav
            hub={{ label: "Volver a Construcción", href: "/construccion" }}
            next={{ label: "Cerebro 1: armazón y Pixhawk", href: "/construccion/armazon" }}
          />
        </div>
      </section>
    </>
  );
}
