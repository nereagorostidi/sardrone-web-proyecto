import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Camera } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { PageHero } from "@/components/page-hero";
import { SubpageNav } from "@/components/subpage-nav";
import { IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: "Cerebro 2: Edge Computing",
  description:
    "La Raspberry Pi 5, el acelerador Hailo-8 y el módem 4G de Guardian Eye — el montaje real, paso a paso, del ordenador de a bordo que procesa vídeo y ejecuta el modelo de detección de personas.",
};

const STEPS = [
  {
    image: IMAGES.edgePiezas,
    title: "1. Las piezas, antes de montar",
    text: "La cámara con su cable plano, el HAT Hailo-8 con su regleta extensora de GPIO y la Raspberry Pi 5 — separadas, antes de empezar a unirlas.",
  },
  {
    image: IMAGES.edgeRaspberryPi5,
    title: "2. La Raspberry Pi 5, en su carcasa",
    text: "El segundo cerebro, ya en su carcasa oficial. La regleta de GPIO puesta encima es la que eleva el HAT para dejar los pines de UART e I2C accesibles.",
  },
  {
    image: IMAGES.edgeHailoHat,
    title: "3. El acelerador: Raspberry Pi AI HAT+",
    text: "Empotrado en esta placa va el Hailo-8, el chip que ejecuta YOLO a 26 TOPS sin saturar la CPU. La regleta extensora ya viene soldada de fábrica en el propio HAT.",
  },
  {
    image: IMAGES.edgeGpioRiser,
    title: "4. Encajando la regleta extensora",
    text: "Antes de apilar el HAT, la regleta se ajusta sobre el conector GPIO de la Pi — con el cableado del sensor ambiental ya conectado a sus pines.",
  },
  {
    image: IMAGES.edgeCamara,
    title: "5. La cámara y su cable plano",
    text: "El cable CSI conecta la cámara directamente a la Raspberry Pi. Es la fuente de vídeo sobre la que corre, fotograma a fotograma, la detección de personas.",
  },
  {
    image: IMAGES.edgeBme680,
    title: "6. Sensor ambiental BME680",
    text: "Cableado a los pines I2C: mide temperatura, humedad, presión y compuestos orgánicos volátiles — información útil para valorar si la zona de la víctima es habitable.",
  },
  {
    image: IMAGES.edgeModem4g,
    title: "7. Módem 4G/LTE, por USB",
    text: "El enlace de datos de largo alcance de Guardian Eye. Se alimenta y se conecta directamente por USB a la Raspberry Pi, con sus dos antenas externas.",
  },
  {
    image: IMAGES.edgeMontajeCompleto,
    title: "8. Todo conectado",
    text: "Cámara, sensor ambiental y módem 4G, ya cableados a la Raspberry Pi: el Edge Companion completo, listo para ir a bordo del dron. La cámara negra de detrás es una segunda cámara USB opcional, sin relación con la CSI que usa el sistema de detección.",
  },
  {
    image: IMAGES.edgePixhawkUart,
    title: "9. El cable que une los dos cerebros",
    text: "Desde los puertos TELEM y GPS1 de la Pixhawk 6X sale el cableado que sube hasta la carcasa de la Raspberry Pi — el enlace UART por el que hablan MAVLink.",
  },
  {
    image: IMAGES.edgeBotonApagado,
    title: "10. Un pulsador para apagar en condiciones",
    text: "Montado junto a la Pixhawk: un módulo de encoder rotatorio del que solo se usa el pulsador integrado (SW), conectado a un pin GPIO de la Raspberry Pi para lanzar un apagado ordenado antes de cortar la alimentación — en vez de arriesgarse a corromper la tarjeta con un corte en caliente.",
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
        image={{ src: IMAGES.edgeMontajeCompleto.src, alt: IMAGES.edgeMontajeCompleto.alt, objectPosition: "50% 35%" }}
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

          <div className="mt-16">
            <SectionHeading
              eyebrow="Paso a paso"
              title="Del desembalaje al Edge Companion completo"
              description="Nueve momentos del montaje real, en orden: de las piezas sueltas al segundo cerebro ya cableado y listo para ir a bordo del dron."
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

          <div className="mt-16 flex items-start gap-3 rounded-3xl border border-dashed border-accent/40 bg-accent-soft p-7 sm:p-8">
            <Camera className="mt-0.5 h-5 w-5 shrink-0 text-accent" strokeWidth={1.75} />
            <div>
              <p className="text-[15px] font-bold text-ink">
                ¿Y la segunda cámara USB que se ve en las fotos?
              </p>
              <p className="mt-2 text-[13.5px] leading-relaxed text-ink-muted">
                La cámara secundaria USB nos ha servido como alternativa a la cámara CSI,
                ya que carecíamos de un gimbal que nos permitiera experimentar con
                diferentes ángulos de vuelo para esta última.
              </p>
            </div>
          </div>

          <SubpageNav
            hub={{ label: "Volver a Construcción", href: "/construccion" }}
            prev={{ label: "Cerebro 1: armazón y Pixhawk", href: "/construccion/armazon" }}
            next={{ label: "El sistema completo", href: "/construccion/sistema-completo" }}
          />
        </div>
      </section>
    </>
  );
}
