import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  BookOpen,
  Code2,
  Download,
  FileText,
  NotebookPen,
  ScrollText,
} from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { PageHero } from "@/components/page-hero";
import { SubpageNav } from "@/components/subpage-nav";
import { LANDING_JOURNAL_URL } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Documentación y recursos",
  description:
    "Repositorios de código, guías oficiales de montaje, normativa y documentos técnicos descargables de Guardian Eye.",
};

const REPOS = [
  {
    name: "yolo-pipeline-test",
    url: "https://github.com/nereagorostidi/yolo-pipeline-test",
    desc: "Taller de experimentación con OpenCV y YOLO en detección de objetos, para comprobar y validar la tecnología que se usaría después en el proyecto.",
  },
  {
    name: "drone-edge-companion",
    url: "https://github.com/nereagorostidi/drone-edge-companion",
    desc: "Servicios Python a bordo de la Raspberry Pi.",
  },
  {
    name: "drone-cloud-server",
    url: "https://github.com/nereagorostidi/drone-cloud-server",
    desc: "Backend Flask, MQTT y almacenamiento en InfluxDB.",
  },
];

const OFFICIAL_GUIDES = [
  {
    label: "Guía de montaje del kit X500 V2",
    url: "https://docs.holybro.com/drone-development-kit/px4-development-kit-x500v2/getting-started-build-guide",
    desc: "Guía oficial de Holybro, base del paso a paso propio de la página de Construcción.",
  },
  {
    label: "Ficha del kit PX4 Development Kit — X500 V2",
    url: "https://holybro.com/products/px4-development-kit-x500-v2",
    desc: "Especificaciones y contenido oficial del kit comprado para Guardian Eye.",
  },
];

const NORMATIVA_LINKS = [
  { label: "EASA — Drones y aeronaves no tripuladas", url: "https://www.easa.europa.eu/en/light/topics/drones" },
  { label: "AESA — Ámbito drones", url: "https://www.seguridadaerea.gob.es/es/ambitos/drones" },
  { label: "ENAIRE Drones", url: "https://drones.enaire.es/" },
];

const PDFS = [
  {
    file: "arquitectura-datos-iot.pdf",
    title: "Arquitectura de datos e IoT",
    desc: "Telemetría multi-dominio, buffer resiliente y detección de personas — el documento de referencia detrás de Datos e IoT.",
  },
  {
    file: "mavlink-explicado.pdf",
    title: "MAVLink explicado",
    desc: "Cómo se comunican el dron, la estación de tierra y los scripts en Python.",
  },
  {
    file: "pipeline-deteccion-personas.pdf",
    title: "Pipeline de detección de personas",
    desc: "De Roboflow al modelo embarcado, específico para búsqueda y rescate.",
  },
  {
    file: "transmision-video.pdf",
    title: "Problemática de transmisión de vídeo",
    desc: "Captura, almacenamiento y streaming a bordo: analógico frente a digital, y por qué importa la latencia.",
  },
  {
    file: "normativa-sanciones-deteccion.pdf",
    title: "Normativa, sanciones y detección de drones",
    desc: "Marco legal ampliado: infracciones y cómo detectan las autoridades un dron en vuelo.",
  },
  {
    file: "teleoperacion-simulacion.pdf",
    title: "De la simulación al vuelo real conectado a la nube",
    desc: "Arquitectura de teleoperación en ocho etapas, de SITL a producción en AWS.",
  },
];

export default function DocumentacionPage() {
  return (
    <>
      <PageHero
        eyebrow="Multimedia · Documentación y recursos"
        breadcrumbs={[
          { label: "Inicio", href: "/" },
          { label: "Multimedia", href: "/multimedia" },
          { label: "Documentación y recursos" },
        ]}
        title="Todo lo que hay para leer, además de ver"
        description="Repositorios de código, las guías oficiales en las que se apoya el montaje, normativa de referencia y varios documentos técnicos propios, en PDF, para quien quiera profundizar más allá de lo que cabe en cada página."
        tone="accent"
      />

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Código" title="Explora el código" />
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
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

          <div className="mt-16 grid gap-10 lg:grid-cols-2">
            <div>
              <SectionHeading eyebrow="Fabricante" title="Guías oficiales de montaje" />
              <div className="mt-6 flex flex-col gap-3">
                {OFFICIAL_GUIDES.map((g) => (
                  <a
                    key={g.url}
                    href={g.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-start gap-3 rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-accent/40"
                  >
                    <BookOpen className="mt-0.5 h-4.5 w-4.5 shrink-0 text-ink-faint" strokeWidth={1.75} />
                    <div>
                      <p className="text-[13.5px] font-semibold text-ink">{g.label}</p>
                      <p className="mt-1 text-[12.5px] leading-relaxed text-ink-muted">{g.desc}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div>
              <SectionHeading eyebrow="Marco legal" title="Normativa y organismos oficiales" />
              <div className="mt-6 flex flex-col gap-3">
                {NORMATIVA_LINKS.map((n) => (
                  <a
                    key={n.url}
                    href={n.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center justify-between gap-3 rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-accent/40"
                  >
                    <span className="flex items-center gap-3">
                      <ScrollText className="h-4.5 w-4.5 shrink-0 text-ink-faint" strokeWidth={1.75} />
                      <span className="text-[13.5px] font-semibold text-ink">{n.label}</span>
                    </span>
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-ink-faint transition-transform group-hover:translate-x-0.5" />
                  </a>
                ))}
                <Link
                  href="/proyecto/normativa"
                  className="text-[12.5px] font-semibold text-accent underline underline-offset-2 hover:text-accent-ink"
                >
                  Ver el detalle completo en Normativa y legislación →
                </Link>
              </div>
            </div>
          </div>

          <a
            href={LANDING_JOURNAL_URL}
            target="_blank"
            rel="noreferrer"
            className="group mt-16 flex flex-col items-start justify-between gap-4 rounded-3xl border border-line bg-ink p-7 sm:flex-row sm:items-center"
          >
            <div className="flex items-start gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white">
                <NotebookPen className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <div>
                <p className="text-[15px] font-bold text-white">Diario del proyecto</p>
                <p className="mt-1 text-[13px] leading-relaxed text-white/70">
                  El avance del TFG contado en tiempo real, entrada a entrada.
                </p>
              </div>
            </div>
            <span className="inline-flex shrink-0 items-center gap-1 text-[12.5px] font-semibold text-white">
              Leer el diario <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </span>
          </a>

          <div className="mt-16">
            <SectionHeading
              eyebrow="Lectura técnica"
              title="PDFs descargables"
              description="Seis documentos técnicos propios, en PDF, para quien quiera el detalle completo detrás de lo que resume cada página del sitio."
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {PDFS.map((pdf) => (
                <a
                  key={pdf.file}
                  href={`/docs/${pdf.file}`}
                  download
                  className="group flex flex-col rounded-2xl border border-line bg-paper p-6 transition-colors hover:border-accent/40"
                >
                  <FileText className="h-5 w-5 text-ink-faint" strokeWidth={1.75} />
                  <p className="mt-3 text-[14px] font-bold text-ink">{pdf.title}</p>
                  <p className="mt-1.5 flex-1 text-[12.5px] leading-relaxed text-ink-muted">{pdf.desc}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-[12px] font-semibold text-accent opacity-0 transition-opacity group-hover:opacity-100">
                    Descargar PDF <Download className="h-3.5 w-3.5" />
                  </span>
                </a>
              ))}
            </div>
          </div>

          <SubpageNav
            hub={{ label: "Volver a Multimedia", href: "/multimedia" }}
            prev={{ label: "Galería", href: "/multimedia" }}
          />
        </div>
      </section>
    </>
  );
}
