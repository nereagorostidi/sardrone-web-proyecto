import type { Metadata } from "next";
import { ArrowUpRight, Code2, Video } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { MediaGallery, type MediaItem } from "@/components/media-gallery";
import { IMAGES } from "@/lib/images";
import { LANDING_URL } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Multimedia",
  description:
    "Vuelos reales, detecciones YOLO sobre vídeo de campo y el montaje del hardware de Guardian Eye.",
};

const ITEMS: MediaItem[] = [
  {
    id: "deteccion-alas-galapagar",
    title: "Detección de personas — Club Alas de Galapagar",
    description:
      "El dron localiza personas en distintas posturas (andando, corriendo, tumbadas, agachadas) sobre vídeo real de campo.",
    poster: IMAGES.foggyForest,
    tag: "Destacado",
    featured: true,
    videoUrl: undefined,
  },
  {
    id: "vuelo-real",
    title: "Vuelo real de referencia",
    description: "Vuelo del 12 de julio de 2026 en el Club Alas de Galapagar, track GPS real.",
    poster: IMAGES.droneSnowMountain,
    tag: "Vuelo",
  },
  {
    id: "montaje-hardware",
    title: "Montaje del hardware",
    description: "Integración de Pixhawk 6C, Raspberry Pi 5 y sensores a bordo.",
    poster: IMAGES.circuitBoard,
    tag: "Timelapse",
  },
  {
    id: "pipeline-yolo",
    title: "Pipeline YOLO en acción",
    description: "Overlay de bounding boxes sobre vídeo de vuelo, prueba de concepto.",
    poster: IMAGES.circuitMacro,
    tag: "IA",
  },
  {
    id: "estacion-tierra",
    title: "Estación de tierra",
    description: "Mission Planner / QGroundControl monitorizando telemetría en directo.",
    poster: IMAGES.antennaTower,
    tag: "GCS",
  },
  {
    id: "panel-cloud",
    title: "Panel de control cloud",
    description: "Telemetría almacenada en InfluxDB, visualizada en el panel web del proyecto.",
    poster: IMAGES.serverRoom,
    tag: "Cloud",
  },
];

const REPOS = [
  { name: "yolo-pipeline-test", url: "https://github.com/nereagorostidi/yolo-pipeline-test", desc: "Entrenamiento y validación del modelo YOLO." },
  { name: "drone-edge-companion", url: "https://github.com/nereagorostidi/drone-edge-companion", desc: "Servicios Python a bordo de la Raspberry Pi." },
  { name: "drone-cloud-server", url: "https://github.com/nereagorostidi/drone-cloud-server", desc: "Backend Flask, MQTT y almacenamiento en InfluxDB." },
];

export default function MultimediaPage() {
  return (
    <>
      <header className="border-b border-line bg-surface pt-32 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="font-telemetry text-[11px] uppercase text-accent">Sec. 04 · Multimedia</p>
          <h1 className="mt-3 max-w-2xl text-balance text-[36px] font-extrabold leading-[1.1] tracking-tight text-ink sm:text-[46px]">
            El proyecto en vídeo
          </h1>
          <p className="mt-4 max-w-xl text-[15.5px] leading-relaxed text-ink-muted">
            Vuelos reales, detecciones sobre vídeo de campo y el montaje del hardware.
            Varias piezas están aún pendientes de publicación — se marcan como tal, no se
            simulan resultados que todavía no existen.
          </p>
        </div>
      </header>

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Galería"
            title="Vuelos, detecciones y montaje"
            description="El vídeo destacado abre en una ventana ampliada; el resto se reproduce bajo demanda para no penalizar el rendimiento de la página."
          />
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

          <div className="mt-16">
            <p className="font-telemetry mb-6 text-[10.5px] uppercase text-ink-faint">
              Explora el código
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              {REPOS.map((repo) => (
                <a
                  key={repo.name}
                  href={repo.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex flex-col rounded-2xl border border-line bg-paper p-6 transition-colors hover:border-accent/40"
                >
                  <Code2 className="h-5 w-5 text-ink-faint" strokeWidth={1.75} />
                  <p className="mt-3 font-telemetry text-[13px] text-ink">{repo.name}</p>
                  <p className="mt-1 text-[12.5px] leading-relaxed text-ink-muted">{repo.desc}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-[12px] font-semibold text-accent opacity-0 transition-opacity group-hover:opacity-100">
                    Ver repositorio <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
