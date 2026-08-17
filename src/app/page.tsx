import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Brain,
  Code2,
  Cpu,
  Drone,
  HandCoins,
  NotebookPen,
  Radio,
  Wifi,
} from "lucide-react";
import { OpenSourceCard } from "@/components/open-source-card";
import { RadialDiagram } from "@/components/diagrams/radial-diagram";
import { SectionHeading } from "@/components/section-heading";
import { TechBadgeRow } from "@/components/tech-badges";
import { IMAGES } from "@/lib/images";
import { LANDING_URL } from "@/lib/site-config";

const FOCUS_NODES = [
  {
    id: "electronica",
    label: "Electrónica & hardware",
    description: "Raspberry Pi, Pixhawk y Linux embebido",
    icon: <Cpu strokeWidth={1.75} />,
    colorVar: "var(--color-accent)",
  },
  {
    id: "comunicaciones",
    label: "Comunicaciones",
    description: "Seguridad, resiliencia y normativa AESA",
    icon: <Radio strokeWidth={1.75} />,
    colorVar: "var(--color-signal)",
  },
  {
    id: "ia",
    label: "Inteligencia artificial",
    description: "Modelos YOLO y LLM",
    icon: <Brain strokeWidth={1.75} />,
    colorVar: "var(--color-mesh-violet)",
  },
  {
    id: "cloud",
    label: "IoT & cloud",
    description: "MQTT, AWS y telemetría en la nube",
    icon: <Wifi strokeWidth={1.75} />,
    colorVar: "var(--color-mesh-cyan)",
  },
  {
    id: "programacion",
    label: "Programación",
    description: "Desarrollo web y scripting en Python",
    icon: <Code2 strokeWidth={1.75} />,
    colorVar: "var(--color-mesh-coral)",
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
            Rescate autónomo. Sistema abierto
          </h1>
          <p className="mt-5 max-w-xl text-[16.5px] leading-relaxed text-ink sm:text-[18px]">
            Guardian Eye nace para demostrar que la Búsqueda y Rescate no necesita
            depender de costosas y cerradas soluciones comerciales: un dron abierto,
            auditable y adaptable para localizar personas perdidas y evaluar el
            entorno de la víctima.
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
        </div>
      </section>

      <section className="border-b border-line bg-paper py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Cómo funciona"
            title="Un sistema abierto de extremo a extremo"
          />
          <div className="mt-10 grid gap-10 sm:grid-cols-2 sm:gap-12">
            <div>
              <p className="text-[15.5px] leading-relaxed text-ink-muted sm:text-[16.5px]">
                Nos basamos en los principios de{" "}
                <strong className="font-semibold text-accent">código abierto</strong>,
                con piezas y componentes de bajo coste fácilmente disponibles en
                diferentes tiendas online, para facilitar así la construcción a medida
                de un sistema que nos permite localizar personas perdidas en
                montes, costas o zonas de difícil acceso.
              </p>
              <p className="mt-4 text-[15.5px] leading-relaxed text-ink-muted sm:text-[16.5px]">
                Además, se incluye incluso la integración con diferentes sensores
                usando <strong className="font-semibold text-accent">IoT </strong>
                para comprobar las condiciones ambientales del entorno de la víctima — humedad,
                temperatura o toxicidad del aire — antes de que lleguen los
                equipos de rescate.
              </p>
              <p className="mt-4 text-[15.5px] leading-relaxed text-ink-muted sm:text-[16.5px]">
                En el ámbito del análisis de imagen, se utiliza un sistema de
                visión por computador (
                <strong className="font-semibold text-accent">OpenCV</strong>)
                integrado con una red neuronal (
                <strong className="font-semibold text-accent">YOLO</strong>)
                que ha sido entrenada específicamente para detectar
                e identificar elementos clave en el vídeo en tiempo real.
              </p>
            </div>
            <div>
              <p className="text-[15.5px] leading-relaxed text-ink-muted sm:text-[16.5px]">
                El sistema está diseñado bajo estrictos criterios de{" "}
                <strong className="font-semibold text-accent">
                  resiliencia y seguridad operativa
                </strong>
                . La arquitectura de comunicaciones garantiza una redundancia
                multicanal continua: mando de radiocontrol en{" "}
                <strong className="font-semibold text-accent">2.4 GHz</strong>,
                telemetría dedicada en{" "}
                <strong className="font-semibold text-accent">915 MHz</strong>,
                y enlaces de datos complementarios mediante 4G/LTE y Wi-Fi. De
                esta forma, nos aseguramos que el dron mantenga la conexión
                bajo cualquier circunstancia.
              </p>
              <p className="mt-4 text-[15.5px] leading-relaxed text-ink-muted sm:text-[16.5px]">
                La privacidad de los datos y garantizar que la red esté
                protegida frente a accesos no autorizados es igual de
                prioritario. Todo el ecosistema opera bajo una infraestructura cloud,
                completamente cifrada de extremo a extremo mediante el
                un sistema de {" "}
                <strong className="font-semibold text-accent">
                  Zero Trust Network
                </strong>{" "}
                (ZTNA), empleando{" "}
                <strong className="font-semibold text-accent">Tailscale</strong>{" "}
                para articular una{" "}
                <strong className="font-semibold text-accent">
                  VPN en malla (Mesh)
                </strong>{" "}
                privada, robusta e impenetrable.
              </p>
            </div>
          </div>

          <div className="mt-14">
            <OpenSourceCard />
          </div>

          <TechBadgeRow className="mt-6" />
        </div>
      </section>

      <section className="mesh-bg border-y border-line bg-surface py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-12">
            <div>
              <SectionHeading
                eyebrow="Más que un TFG"
                title="Un desafío de ingeniería integral"
              />
              <p className="mt-5 text-[15.5px] leading-relaxed text-ink-muted">
                Guardian Eye es el Trabajo de Fin de Grado de{" "}
                <strong className="font-semibold text-ink">Nerea Gorostidi García</strong>,
                en Ingeniería de Tecnologías de Telecomunicación por la{" "}
                <strong className="font-semibold text-ink">
                  Universidad Carlos III de Madrid
                </strong>{" "}
                (convocatoria 2026), titulado:
              </p>
              <blockquote className="mt-5 rounded-2xl border border-line bg-paper px-5 py-4 shadow-[var(--shadow-soft)]">
                <p className="text-[14.5px] font-semibold italic leading-snug text-ink">
                  &ldquo;Diseño e Implementación de un Sistema UAV Autónomo con
                  Comunicaciones 4G, Fusión de Sensores (Térmico/Visual) y Arquitectura
                  IoT para Misiones de Búsqueda y Rescate&rdquo;
                </p>
              </blockquote>
              <p className="mt-5 text-[15.5px] leading-relaxed text-ink-muted">
                Este proyecto destaca por sus peculiaridades como TFG:
                pocos TFG permiten combinar en un único sistema real disciplinas tan
                distintas como electrónica, comunicaciones, seguridad, resiliencia,
                normativa, IoT, cloud, programación e inteligencia artificial, en lugar de
                trabajarlas de forma aislada en asignaturas sueltas.
              </p>
              <p className="mt-4 text-[15.5px] leading-relaxed text-ink-muted">
                Ese enfoque integral permite profundizar en cada uno de esos ámbitos por
                separado y, al mismo tiempo, materializar en un dispositivo funcional el
                conocimiento acumulado a lo largo de estos cuatro años de carrera. Los{" "}
                <Link href="/proyecto/objetivos" className="font-semibold text-accent underline underline-offset-2 hover:text-accent-ink">
                  objetivos concretos del proyecto
                </Link>{" "}
                detallan cómo se traduce esa motivación en un sistema real.
              </p>
              <a
                href="https://drone-sar.vercel.app/journal.html"
                target="_blank"
                rel="noreferrer"
                className="group mt-6 flex items-center gap-4 rounded-2xl border border-line bg-paper px-5 py-4 transition-colors hover:border-accent/40"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
                  <NotebookPen className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <div className="flex-1">
                  <p className="text-[13.5px] font-bold text-ink">
                    Sigue el progreso del proyecto
                  </p>
                  <p className="mt-0.5 text-[12.5px] leading-relaxed text-ink-muted">
                    Voy publicando avances, decisiones y en qué estoy trabajando ahora
                    en el diario (journal) del proyecto.
                  </p>
                </div>
                <ArrowUpRight
                  className="h-4 w-4 shrink-0 text-ink-faint transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                  strokeWidth={2.5}
                />
              </a>
            </div>
            <RadialDiagram
              centerLabel="Guardian Eye"
              centerSublabel="TFG · Un sistema integral"
              centerIcon={<Drone strokeWidth={1.75} />}
              nodes={FOCUS_NODES}
            />
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
                ¿Quieres ayudarme en este proyecto?
              </h3>
              <p className="mt-3 text-[14.5px] leading-relaxed text-white/70">
                Puedes hacerlo enviándome imágenes para entrenar mi sistema, o
                donando material. Consulta la web especifica de colaboración,
                una micro-web dedicada al patrocinio, donaciones de componentes
                y conseguir comunidad que aporta vídeos para seguir entrenando
                el modelo de detección.
              </p>
            </div>
            <a
              href={LANDING_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-6 py-3.5 text-[14px] font-semibold text-ink transition-transform hover:-translate-y-0.5"
            >
              <HandCoins className="h-4 w-4" strokeWidth={2} />
              Visita la Web del Crowdfunding
              <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
