import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Package, Wrench, Zap } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { PageHero } from "@/components/page-hero";
import { SubpageNav } from "@/components/subpage-nav";
import { IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: "Cerebro 1: armazón y Pixhawk",
  description:
    "Por qué se compró el kit Holybro X500 V2 en vez de piezas sueltas, y el montaje paso a paso del armazón y la Pixhawk 6X, con fotos propias.",
};

const STEPS = [
  {
    image: IMAGES.buildUnboxing,
    title: "1. Así llega el kit",
    text: "El Holybro X500 V2 (6X & M10 & 433 MHz) trae el chasis, los motores, las hélices, la controladora, el GPS y la radio de telemetría ya pensados para funcionar juntos.",
  },
  {
    image: IMAGES.buildPixhawk,
    title: "2. El primer cerebro: Pixhawk 6X",
    text: "La controladora de vuelo. Es la placa que no puede fallar nunca: corre en tiempo real y mantiene el dron estable en el aire.",
  },
  {
    image: IMAGES.buildPdb,
    title: "3. La placa de distribución de potencia",
    text: "Reparte la corriente de la batería a los cuatro ESC y regula la tensión que alimenta a la Pixhawk y al resto de la electrónica.",
  },
  {
    image: IMAGES.buildEsc,
    title: "4. Un ESC, cableado a su motor",
    text: "Cada motor lleva su propio ESC, que traduce las órdenes de la Pixhawk en la velocidad de giro exacta de cada hélice.",
  },
  {
    image: IMAGES.buildArms,
    title: "5. Los cuatro brazos, ya con motor",
    text: "Antes de tocar el chasis, cada brazo de fibra de carbono se prepara por separado con su motor y su cableado.",
  },
  {
    image: IMAGES.buildPlates,
    title: "6. Las placas del chasis",
    text: "La placa superior y la inferior, de fibra de carbono, son el esqueleto sobre el que se atornilla todo lo demás.",
  },
  {
    image: IMAGES.buildCenterPlate,
    title: "7. Primer brazo atornillado",
    text: "La PDB se monta primero sobre la placa central, y los brazos se van añadiendo uno a uno.",
  },
  {
    image: IMAGES.buildSkeleton,
    title: "8. El esqueleto completo",
    text: "Con los cuatro brazos y el tren de aterrizaje montados, ya se reconoce la silueta de un cuadricóptero — todavía sin ningún componente de control.",
  },
  {
    image: IMAGES.buildPixhawkMounted,
    title: "9. La Pixhawk, atornillada",
    text: "El primer cerebro ya en su sitio, con el cableado del GPS y de los ESC empezando a conectarse a sus puertos correspondientes.",
  },
  {
    image: IMAGES.buildWiringDetail,
    title: "10. Detalle del cableado",
    text: "Cada cable tiene un puerto específico — TELEM, GPS, POWER, RC IN — nada se conecta a la primera toma que se encuentra.",
  },
  {
    image: IMAGES.buildFrameDone,
    title: "11. El armazón, terminado",
    text: "Con las hélices montadas, la parte mecánica y de vuelo ya está lista: el cuerpo y el primer cerebro. Falta el segundo — la Raspberry Pi y el resto del Edge Companion.",
  },
  {
    image: IMAGES.buildRadioControl,
    title: "12. Emisora y receptor FlySky FS-i6X",
    text: "El mando con el que se pilota el dron manualmente — la garantía de control que no depende de ningún ordenador de a bordo.",
  },
  {
    image: IMAGES.buildBatteryCharger,
    title: "13. Batería LiPo y cargador",
    text: "La batería 4S de la que sale toda la energía del sistema, y el cargador balanceador necesario para no dañar sus celdas.",
  },
];

export default function ArmazonPage() {
  return (
    <>
      <PageHero
        eyebrow="Construcción · Cerebro 1"
        breadcrumbs={[
          { label: "Inicio", href: "/" },
          { label: "Construcción del dron", href: "/construccion" },
          { label: "Cerebro 1: armazón y Pixhawk" },
        ]}
        title="Del kit Holybro al armazón que vuela"
        description="La parte mecánica de Guardian Eye y su primer cerebro — la Pixhawk 6X, la controladora de vuelo — montados a partir del kit Holybro X500 V2. Todas las fotos de esta página son del montaje real, no de catálogo."
        image={{ src: IMAGES.buildFrameDone.src, alt: IMAGES.buildFrameDone.alt, objectPosition: "50% 40%" }}
      />

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            <SectionHeading
              eyebrow="Por qué un kit y no piezas sueltas"
              title="Menos compatibilidad que comprobar, menos soldadura"
              description="La alternativa habría sido comprar cada pieza por separado: chasis, motores, ESCs, PDB, controladora, GPS, radio de telemetría... y comprobar a mano que todas encajan y son compatibles entre sí. El Holybro X500 V2 llega con todo ese conjunto ya validado por el fabricante para funcionar junto, lo que además reduce buena parte de la soldadura que exigiría montar los componentes por separado."
            />
            <div className="rounded-2xl border border-line bg-surface p-6">
              <div className="flex items-center gap-2">
                <Package className="h-4.5 w-4.5 text-signal" strokeWidth={1.75} />
                <p className="font-telemetry text-[10.5px] uppercase text-signal-ink">
                  Lo que trae el kit
                </p>
              </div>
              <p className="mt-3 text-[13.5px] leading-relaxed text-ink-muted">
                Chasis X500 V2, cuatro motores y hélices, cuatro ESC, PDB, controladora
                Pixhawk 6X, GPS/brújula M10 y un par de radios de telemetría a 433 MHz.
                La batería LiPo 4S, el cargador y la emisora FlySky FS-i6X se pidieron
                como accesorios adicionales en el mismo pedido.
              </p>
            </div>
          </div>

          <div className="mt-16">
            <SectionHeading
              eyebrow="Paso a paso"
              title="Del desembalaje al armazón terminado"
              description="Trece momentos del montaje real, en orden. No es un manual exhaustivo pieza por tornillo — para eso está la guía oficial de Holybro — sino la secuencia que explica cómo se pasa de una caja de piezas sueltas a un armazón que ya puede volar."
            />

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {STEPS.map((step) => (
                <div
                  key={step.title}
                  className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-line"
                >
                  <Image
                    src={step.image.src}
                    alt={step.image.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent p-5">
                    <p className="font-telemetry text-[10px] uppercase text-white/70">
                      {step.title}
                    </p>
                    <p className="mt-1 text-[12.5px] leading-snug text-white/90">
                      {step.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 grid gap-8 rounded-3xl border border-line bg-ink p-8 sm:p-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <div>
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-white">
                <Zap className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <h3 className="mt-4 text-[22px] font-extrabold leading-tight text-white">
                Este armazón ya vuela — pero todavía no ve ni piensa
              </h3>
              <p className="mt-3 text-[14px] leading-relaxed text-white/70">
                Con la Pixhawk 6X montada y calibrada, el dron ya es capaz de despegar,
                mantenerse estable y responder al mando RC. Pero no lleva cámara, no
                procesa vídeo y no ejecuta el modelo de detección de personas — todo eso
                depende del segundo cerebro, montado aparte y conectado a la Pixhawk por
                un puerto TELEM.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex gap-3 rounded-2xl border border-white/10 bg-white/5 p-5">
                <Wrench className="h-5 w-5 shrink-0 text-white" strokeWidth={1.75} />
                <p className="text-[13.5px] leading-relaxed text-white/85">
                  El detalle de esa segunda pieza — Raspberry Pi 5, Hailo-8L y módem 4G —
                  está en la siguiente página de esta sección.
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
            prev={{ label: "Piezas de un dron", href: "/construccion/piezas" }}
            next={{ label: "Cerebro 2: Edge Computing", href: "/construccion/edge-computing" }}
          />
        </div>
      </section>
    </>
  );
}
