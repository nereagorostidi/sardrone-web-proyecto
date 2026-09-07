import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Film, FolderOpen, Video } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { MediaGallery, type MediaItem } from "@/components/media-gallery";
import { PageHero } from "@/components/page-hero";
import { IMAGES, type SiteImage } from "@/lib/images";
import { LANDING_URL } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Multimedia",
  description:
    "Vuelos reales, detecciones YOLO sobre vídeo de campo y el montaje del hardware de Guardian Eye.",
};

const DETECTION_YOUTUBE_ID = "jjvX-JZZbLM";
const CLUB_YOUTUBE_ID = "2HKlq-o7WxM";
const FLIGHT_INFERENCE_YOUTUBE_ID = "1aA_bSsyBIM";
const FULL_DRONE_YOUTUBE_ID = "zdFFK4bk9Iw";

const deteccionPoster: SiteImage = {
  src: `https://img.youtube.com/vi/${DETECTION_YOUTUBE_ID}/hqdefault.jpg`,
  alt: "Fotograma del vídeo de detección de personas del dron en el Club Alas de Galapagar",
  credit: "YouTube",
};

const clubPoster: SiteImage = {
  src: `https://img.youtube.com/vi/${CLUB_YOUTUBE_ID}/hqdefault.jpg`,
  alt: "Fotograma del vídeo de presentación del Club Alas de Galapagar",
  credit: "YouTube / Alas de Galapagar",
};

const flightInferencePoster: SiteImage = {
  src: `https://img.youtube.com/vi/${FLIGHT_INFERENCE_YOUTUBE_ID}/hqdefault.jpg`,
  alt: "Fotograma del vuelo de prueba con el dron sobrevolando un campo y el recuadro de su cámara detectando personas con YOLO",
  credit: "YouTube",
};

const fullDronePoster: SiteImage = {
  src: `https://img.youtube.com/vi/${FULL_DRONE_YOUTUBE_ID}/hqdefault.jpg`,
  alt: "Fotograma del vídeo del dron Guardian Eye ya ensamblado, con la Pixhawk 6X y el Edge Companion montados",
  credit: "YouTube",
};

const ITEMS: MediaItem[] = [
  {
    id: "vuelo-inferencia-abordo",
    title: "Vuelo de prueba con detección a bordo, en tiempo real",
    description:
      "Vuelo real con la Raspberry Pi 5 y el acelerador Hailo ejecutando YOLO a bordo, en tiempo real, sobre el vídeo de la propia cámara del dron. El recuadro inferior es esa cámara, con las detecciones de personas dibujadas en directo durante el vuelo.",
    poster: flightInferencePoster,
    tag: "Destacado · IA en directo",
    featured: true,
    youtubeId: FLIGHT_INFERENCE_YOUTUBE_ID,
  },
  {
    id: "deteccion-alas-galapagar",
    title: "Detección de personas — Club Alas de Galapagar",
    description:
      "Vídeo aéreo grabado con un DJI Neo 2 en las instalaciones del club. La detección YOLO se aplicó después, en post-proceso, sobre el vídeo ya grabado: sirve para ver el modelo localizando personas en distintas posturas (andando, corriendo, tumbadas, agachadas), no como prueba de inferencia a bordo.",
    poster: deteccionPoster,
    tag: "IA · post-proceso",
    youtubeId: DETECTION_YOUTUBE_ID,
  },
  {
    id: "dron-completo",
    title: "El dron completo, ensamblado",
    description:
      "Recorrido alrededor de Guardian Eye ya montado: la Pixhawk 6X, el Edge Companion (Raspberry Pi 5 + Hailo-8), el GPS, las antenas de telemetría y la batería, todo en un mismo cuerpo.",
    poster: fullDronePoster,
    tag: "Hardware",
    youtubeId: FULL_DRONE_YOUTUBE_ID,
  },
  {
    id: "club-alas-galapagar",
    title: "Club Alas de Galapagar",
    description:
      "Vídeo de presentación del club de aeromodelismo y radiocontrol que acoge los vuelos de prueba y la recogida del dataset de Guardian Eye.",
    poster: clubPoster,
    tag: "Colaborador",
    youtubeId: CLUB_YOUTUBE_ID,
  },
];

export default function MultimediaPage() {
  return (
    <>
      <PageHero
        eyebrow="Sec. 05 · Multimedia"
        title="El proyecto en vídeo"
        description="Vuelos reales, detección YOLO —a bordo en tiempo real y en post-proceso sobre vídeo de campo— y el montaje del hardware de Guardian Eye."
        image={{ src: IMAGES.droneSnowMountain.src, alt: IMAGES.droneSnowMountain.alt }}
      />

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Galería"
            title="Vuelos, detecciones y montaje"
            description="El vídeo destacado abre en una ventana ampliada; el resto se reproduce bajo demanda para no penalizar el rendimiento de la página."
          />

          <div className="mt-6 flex items-start gap-3 rounded-2xl border border-accent/30 bg-accent-soft p-5">
            <Film className="mt-0.5 h-4.5 w-4.5 shrink-0 text-accent" strokeWidth={1.75} />
            <p className="text-[13px] leading-relaxed text-ink">
              La pieza destacada, <span className="font-semibold">Vuelo de prueba con
              detección a bordo</span>, muestra la Raspberry Pi 5 ejecutando YOLO{" "}
              <span className="font-semibold">en tiempo real durante el vuelo</span>, sobre
              el vídeo de la propia cámara del dron: la prueba más directa de que la
              detección descrita en la sección de{" "}
              <span className="font-medium">Inteligencia Artificial</span> funciona a bordo
              y no solo en teoría. El vídeo <span className="font-semibold">Detección de
              personas — Club Alas de Galapagar</span> es anterior: se grabó con un DJI
              Neo 2 y la inferencia se añadió después, en post-proceso, sobre el vídeo ya
              grabado.
            </p>
          </div>

          <div className="mt-10">
            <MediaGallery items={ITEMS} />
          </div>

          <div className="mt-16 grid gap-8 rounded-3xl border border-line bg-ink p-8 sm:p-10 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-white">
                <Video className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <h3 className="mt-4 text-[21px] font-extrabold leading-tight text-white">
                ¿Tienes vídeos de entrenamiento?
              </h3>
              <p className="mt-3 text-[13.5px] leading-relaxed text-white/70">
                La comunidad puede enviar vídeos aéreos de personas, grabados desde
                distintas alturas y ángulos, para seguir ampliando el dataset de
                entrenamiento. Esto se gestiona desde la landing corta del proyecto.
              </p>
            </div>
            <a
              href={LANDING_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-[14px] font-semibold text-ink transition-transform hover:-translate-y-0.5 lg:justify-self-end"
            >
              Enviar un vídeo
              <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
            </a>
          </div>

          <Link
            href="/multimedia/documentacion"
            className="group mt-16 flex flex-col items-start justify-between gap-4 rounded-3xl border border-line bg-paper p-7 transition-colors hover:border-accent/40 sm:flex-row sm:items-center"
          >
            <div className="flex items-start gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
                <FolderOpen className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <div>
                <p className="text-[15px] font-bold text-ink">Documentación y recursos</p>
                <p className="mt-1 text-[13px] leading-relaxed text-ink-muted">
                  Los repositorios de código, guías oficiales de montaje, normativa y varios
                  documentos técnicos propios en PDF descargable.
                </p>
              </div>
            </div>
            <span className="inline-flex shrink-0 items-center gap-1 text-[12.5px] font-semibold text-accent">
              Ver todo <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        </div>
      </section>
    </>
  );
}
