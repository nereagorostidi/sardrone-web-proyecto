import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Brain,
  Cpu,
  Radio,
  Wifi,
  ShieldCheck,
  Cable,
  Camera,
  Users,
} from "lucide-react";
import { RadialDiagram } from "@/components/diagrams/radial-diagram";
import { SectionHeading } from "@/components/section-heading";
import { IMAGES } from "@/lib/images";
import { LANDING_URL } from "@/lib/site-config";

const FOCUS_NODES = [
  {
    id: "electronica",
    label: "Electrónica digital",
    description: "Diseño de alimentación e integración de hardware",
    icon: <Cpu strokeWidth={1.75} />,
    colorVar: "var(--color-accent)",
  },
  {
    id: "ia",
    label: "Inteligencia artificial",
    description: "Detección en tiempo real con YOLO",
    icon: <Brain strokeWidth={1.75} />,
    colorVar: "var(--color-mesh-violet)",
  },
  {
    id: "cloud",
    label: "IoT & nube",
    description: "MQTT, AWS, N8N y telemetría en la nube",
    icon: <Wifi strokeWidth={1.75} />,
    colorVar: "var(--color-mesh-cyan)",
  },
  {
    id: "rf",
    label: "Radiofrecuencia",
    description: "Triple enlace de comunicaciones redundante",
    icon: <Radio strokeWidth={1.75} />,
    colorVar: "var(--color-signal)",
  },
];

const QUICK_LINKS = [
  {
    href: "/arquitectura#comunicaciones",
    icon: Cable,
    title: "Arquitectura técnica",
    description: "Triple enlace redundante, hardware modular y stack cloud.",
  },
  {
    href: "/ia",
    icon: Camera,
    title: "Inteligencia artificial",
    description: "Detección de personas en tiempo real con YOLO.",
  },
  {
    href: "/multimedia",
    icon: ShieldCheck,
    title: "Multimedia",
    description: "Vuelos reales y detecciones sobre vídeo de campo.",
  },
  {
    href: "/colaboradores",
    icon: Users,
    title: "Colaboradores",
    description: "El Club Alas de Galapagar y el resto de apoyos.",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="relative flex min-h-[94vh] items-end overflow-hidden bg-ink">
        <Image
          src={IMAGES.heroDrone.src}
          alt={IMAGES.heroDrone.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "50% 18%" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/45 via-ink/5 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-paper via-paper/85 to-transparent" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-14 pt-40 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-line bg-paper/90 px-3.5 py-1.5 backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
            </span>
            <span className="font-telemetry text-[10.5px] uppercase text-ink-muted">
              En desarrollo · TFG Ingeniería de Telecomunicaciones
            </span>
          </div>

          <h1 className="mt-6 max-w-3xl text-balance text-[40px] font-extrabold leading-[1.05] tracking-tight text-ink sm:text-[56px] lg:text-[64px]">
            Encontrar lo invisible, contrarreloj.
          </h1>
          <p className="mt-5 max-w-xl text-[16.5px] leading-relaxed text-ink-muted sm:text-[18px]">
            Guardian Eye es un dron autónomo de Búsqueda y Rescate diseñado desde cero,
            con triple enlace de comunicaciones redundante, visión por computador y
            arquitectura cloud propia — donde un dron comercial es una caja negra
            cerrada, este es un sistema abierto, programable y auditable.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/arquitectura"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-[14px] font-semibold text-white transition-transform hover:-translate-y-0.5"
            >
              Ver arquitectura
              <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
            </Link>
            <a
              href={LANDING_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-line bg-paper px-5 py-3 text-[14px] font-semibold text-ink transition-transform hover:-translate-y-0.5"
            >
              Apoyar el proyecto
              <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
            </a>
          </div>

          <dl className="mt-10 grid max-w-lg grid-cols-3 gap-6 border-t border-line pt-6 font-telemetry text-[11px] uppercase text-ink-faint">
            <div>
              <dt>Enlace RC</dt>
              <dd className="mt-1 text-[13px] font-semibold normal-case text-ink">2.4 GHz</dd>
            </div>
            <div>
              <dt>Telemetría</dt>
              <dd className="mt-1 text-[13px] font-semibold normal-case text-ink">915 MHz</dd>
            </div>
            <div>
              <dt>Enlace remoto</dt>
              <dd className="mt-1 text-[13px] font-semibold normal-case text-ink">4G / LTE</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="mesh-bg border-y border-line bg-surface py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Más que una nota"
            title="Un desafío de ingeniería integral"
            description="Cuatro años de carrera convergen en un único dispositivo funcional: electrónica de potencia, inteligencia artificial, redes IoT en la nube y radiofrecuencia trabajando como un solo sistema."
          />
          <div className="mt-14">
            <RadialDiagram
              centerLabel="Guardian Eye"
              centerSublabel="TFG · Un sistema"
              nodes={FOCUS_NODES}
            />
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Explora el proyecto"
            title="Documentación técnica completa"
            description="Esta web profundiza en cada capa del sistema. Para la versión corta, pensada para colaborar o donar material, visita la landing de micromecenazgo."
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {QUICK_LINKS.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group flex flex-col rounded-2xl border border-line bg-paper p-6 transition-all hover:-translate-y-1 hover:border-accent/40 hover:shadow-[var(--shadow-soft)]"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent">
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <span className="mt-4 text-[15px] font-bold text-ink">{link.title}</span>
                  <span className="mt-1.5 text-[13px] leading-relaxed text-ink-muted">
                    {link.description}
                  </span>
                  <span className="mt-4 inline-flex items-center gap-1 text-[12.5px] font-semibold text-accent opacity-0 transition-opacity group-hover:opacity-100">
                    Ver más <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-ink py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-8 rounded-3xl border border-white/10 bg-white/5 p-8 sm:p-10 lg:flex-row lg:items-center">
            <div className="max-w-xl">
              <p className="font-telemetry text-[11px] uppercase text-white/60">
                Landing de micromecenazgo
              </p>
              <h3 className="mt-3 text-[24px] font-extrabold leading-tight text-white sm:text-[28px]">
                ¿Quieres donar material o enviar vídeos de entrenamiento?
              </h3>
              <p className="mt-3 text-[14.5px] leading-relaxed text-white/70">
                La versión corta del proyecto está pensada para eso: patrocinio,
                donaciones de componentes y una comunidad que aporta vídeos para
                seguir entrenando el modelo de detección.
              </p>
            </div>
            <a
              href={LANDING_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-6 py-3.5 text-[14px] font-semibold text-ink transition-transform hover:-translate-y-0.5"
            >
              Ir a la landing corta
              <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
