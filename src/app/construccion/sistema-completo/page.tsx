import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { PageHero } from "@/components/page-hero";
import { PhotoLightboxGrid } from "@/components/photo-lightbox-grid";
import { SubpageNav } from "@/components/subpage-nav";
import { IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: "El sistema completo",
  description:
    "Guardian Eye ya ensamblado: el armazón con la Pixhawk 6X y el Edge Companion montados en un mismo cuerpo, en fotos reales desde distintos ángulos y en vídeo.",
};

const GALLERY = [
  {
    image: IMAGES.fullDroneFront,
    caption:
      "El dron entero, de frente en tres cuartos: el mástil del GPS, la placa de la Pixhawk 6X con su cableado, la Raspberry Pi 5 en su carcasa y la batería sujeta debajo, sobre el tren de aterrizaje.",
  },
  {
    image: IMAGES.fullDroneTop,
    caption:
      "Vista cenital: los cuatro brazos con sus motores y hélices, la placa central con la Pixhawk 6X y el domo del GPS, y la Raspberry Pi 5 con la batería en la bandeja inferior.",
  },
  {
    image: IMAGES.fullDroneRear,
    caption:
      "Desde atrás: la cámara y el módem 4G asoman bajo el chasis y las antenas de telemetría quedan desplegadas hacia los lados.",
  },
  {
    image: IMAGES.fullDroneStack,
    caption:
      "El conjunto de electrónica a bordo visto de lado: la Raspberry Pi 5 con su HAT Hailo-8 junto a la Pixhawk 6X, el cableado de alimentación y datos, la antena y el pack de batería.",
  },
  {
    image: IMAGES.fullDroneTopElectronics,
    caption:
      "Detalle de la integración de los dos cerebros: la Pixhawk 6X, el hub USB, la Raspberry Pi 5 y el mazo de cables que los une, todo sobre la placa central de fibra de carbono.",
  },
];

const VIDEOS = [
  {
    id: "zdFFK4bk9Iw",
    title: "Vista general del dron completo",
    caption:
      "Recorrido alrededor del dron ya ensamblado: se ven los dos cerebros montados, el cableado entre ellos, el GPS, las antenas y la batería.",
  },
  {
    id: "biQ8FhS7yX8",
    title: "Plano general",
    caption:
      "Un plano corto del conjunto, con el detalle de la electrónica apilada sobre la placa central.",
  },
];

export default function SistemaCompletoPage() {
  return (
    <>
      <PageHero
        eyebrow="Construcción · Sistema completo"
        breadcrumbs={[
          { label: "Inicio", href: "/" },
          { label: "Construcción del dron", href: "/construccion" },
          { label: "El sistema completo" },
        ]}
        title="Los dos cerebros, en un mismo cuerpo"
        description="Guardian Eye es la suma de sus dos cerebros: el armazón con la Pixhawk 6X que lo mantiene en el aire, y el Edge Companion —Raspberry Pi 5 y Hailo-8— que procesa vídeo y decide qué enviar a tierra. Esta página los reúne ya montados en el mismo dron, vistos desde distintos ángulos y en vídeo."
        tone="accent"
        image={{ src: IMAGES.fullDroneFront.src, alt: IMAGES.fullDroneFront.alt, objectPosition: "50% 55%" }}
      />

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Galería"
            title="El dron ya ensamblado"
            description="Fotos reales del dron completo, con las dos piezas ya documentadas por separado montadas en un mismo cuerpo: el detalle de cada una está en Cerebro 1: armazón y Pixhawk y en Cerebro 2: Edge Computing."
          />

          <div className="mt-10">
            <PhotoLightboxGrid photos={GALLERY} />
          </div>

          <div className="mt-20">
            <SectionHeading
              eyebrow="En vídeo"
              title="El conjunto, en movimiento"
              description="Dos planos del dron ya montado. El vuelo real con detección de personas a bordo está en la sección de Multimedia."
            />

            <div className="mt-10 grid gap-8 lg:grid-cols-2">
              {VIDEOS.map((video) => (
                <figure key={video.id}>
                  <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-line bg-ink">
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${video.id}`}
                      title={video.title}
                      className="absolute inset-0 h-full w-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <figcaption className="mt-3 text-[13px] leading-relaxed text-ink-muted">
                    <span className="font-semibold text-ink">{video.title}.</span>{" "}
                    {video.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>

          <Link
            href="/multimedia"
            className="group mt-16 flex flex-col items-start justify-between gap-4 rounded-3xl border border-line bg-paper p-7 transition-colors hover:border-accent/40 sm:flex-row sm:items-center"
          >
            <div>
              <p className="text-[15px] font-bold text-ink">
                El vuelo con detección a bordo
              </p>
              <p className="mt-1 max-w-xl text-[13px] leading-relaxed text-ink-muted">
                En Multimedia está el vídeo del dron volando con la Raspberry Pi haciendo
                inferencia YOLO en tiempo real, con el recuadro de su propia cámara.
              </p>
            </div>
            <span className="inline-flex shrink-0 items-center gap-1 text-[12.5px] font-semibold text-accent">
              Ver en Multimedia
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>

          <SubpageNav
            hub={{ label: "Volver a Construcción", href: "/construccion" }}
            prev={{ label: "Cerebro 2: Edge Computing", href: "/construccion/edge-computing" }}
          />
        </div>
      </section>
    </>
  );
}
