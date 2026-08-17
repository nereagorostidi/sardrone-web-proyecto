import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Brain,
  CircuitBoard,
  ClipboardList,
  Code2,
  Database,
  FileCheck,
  Globe,
  Leaf,
  Radio,
  Server,
  Thermometer,
  Wifi,
} from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { PageHero } from "@/components/page-hero";
import { SubpageNav } from "@/components/subpage-nav";
import { TechBadgeRow } from "@/components/tech-badges";
import { IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: "Objetivos",
  description:
    "El objetivo académico del TFG y las disciplinas de Ingeniería de Telecomunicación que Guardian Eye consolida en un único sistema.",
};

const DISCIPLINES = [
  {
    title: "Electrónica",
    icon: CircuitBoard,
    text: "Todo el material electrónico necesario para construir el dron: motores, servos, componentes eléctricos, la Raspberry Pi, sensores y baterías.",
  },
  {
    title: "Comunicaciones",
    icon: Radio,
    text: "Un núcleo amplio de tecnologías — LTE/4G, WiFi y distintos enlaces de radio — y también seguridad en las comunicaciones: cifrado, redes privadas y redundancia.",
  },
  {
    title: "IoT & cloud",
    icon: Wifi,
    text: "Una de mis áreas favoritas: brokers como Mosquitto y el uso de la nube para recopilar y almacenar toda la información que genera el dron.",
  },
  {
    title: "Bases de datos",
    icon: Database,
    text: "Entre SQL, NoSQL y series temporales, se ha escogido InfluxDB por ser la más apropiada para la gestión de datos IoT del proyecto, junto con SQLite para el tratamiento de datos en local.",
  },
  {
    title: "Programación",
    icon: Code2,
    text: "Python como lenguaje principal para interactuar con el dron: control de vuelo, scripts de misión y comunicación entre los distintos servicios del sistema.",
  },
  {
    title: "Inteligencia artificial",
    icon: Brain,
    text: "Durante la carrera trabajé con modelos de lenguaje (LLMs) en varias asignaturas. Dada la importancia actual de la IA, quería incluirla también en el proyecto de alguna forma — por eso Guardian Eye incorpora un sistema de redes neuronales basado en YOLO para la detección de personas.",
  },
  {
    title: "Sistemas",
    icon: Server,
    text: "Linux como base del sistema embarcado, aplicando directamente los conceptos de sistemas operativos vistos en la carrera.",
  },
  {
    title: "Normativa",
    icon: FileCheck,
    text: "Una visión tan importante en telecomunicaciones como poco vistosa: seguida de forma estricta, incluida la obtención de las licencias de vuelo y de operador necesarias.",
  },
  {
    title: "Gestión de proyectos",
    icon: ClipboardList,
    text: "Planificación, hitos y validación por etapas — la parte menos visible de un TFG, pero tan real como el propio hardware.",
  },
  {
    title: "Sostenibilidad (ODS)",
    icon: Leaf,
    text: "Los Objetivos de Desarrollo Sostenible como marco de referencia para pensar el impacto social del proyecto, más allá de la ingeniería pura.",
  },
  {
    title: "Programación Web",
    icon: Globe,
    text: "No considero esta web parte de los entregables del TFG en sí, pero quise aprovechar la optativa de Programación Web que cursé en la carrera para darle visibilidad al proyecto — el TFG no tiene por qué limitarse al ámbito de un requisito académico.",
  },
];

export default function ObjetivosPage() {
  return (
    <>
      <PageHero
        eyebrow="Proyecto · Objetivos"
        breadcrumbs={[
          { label: "Inicio", href: "/" },
          { label: "Proyecto", href: "/proyecto" },
          { label: "Objetivos" },
        ]}
        title="Diseñar una herramienta SAR profesional desde cero"
        description="El objetivo general es diseñar y construir, desde cero, un UAV autónomo de Búsqueda y Rescate (SAR, del inglés Search And Rescue) como Trabajo de Fin de Grado de Ingeniería de Tecnologías de Telecomunicación — consolidando varias de las principales disciplinas de la carrera en un único sistema funcional."
        underConstruction
        image={{
          src: IMAGES.heroDrone.src,
          alt: IMAGES.heroDrone.alt,
          objectPosition: "82% 30%",
        }}
      />

      <section className="border-b border-line bg-paper py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="La motivación real"
            title="Más que un requisito para titularme"
            description="El título del proyecto lo resume en una frase: un dron que facilite la búsqueda y rescate de personas. Pero detrás de ese objetivo hay una decisión bastante más personal."
          />

          <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:items-start">
            <div>
              <p className="text-[15.5px] leading-relaxed text-ink-muted">
                Quería un TFG que no se limitara a cumplir un expediente, sino que
                combinara una de mis pasiones —la aeronáutica y los aviones— con la
                oportunidad de profundizar en la mayor parte de las disciplinas que
                he cursado en la carrera. Ahí es donde entran los drones: un
                concepto que permite tocar muchísimas áreas distintas a la vez, y
                en el que además hay mucho margen para innovar.
              </p>
              <p className="mt-4 text-[15.5px] leading-relaxed text-ink-muted">
                Por eso, aunque el objetivo se resuma en una frase, detrás hay un
                intento consciente de consolidar el conocimiento de casi toda la
                carrera —electrónica, comunicaciones, IoT, bases de datos,
                programación, inteligencia artificial, sistemas, normativa,
                gestión de proyectos y sostenibilidad— en un único sistema real,
                no en asignaturas sueltas.
              </p>
              <p className="mt-4 text-[15.5px] leading-relaxed text-ink-muted">
                Dicho de forma concreta: mi objetivo ha sido poder cubrir, dentro
                de un mismo proyecto, cada una de las áreas principales de la
                carrera, para consolidar así una visión integradora de todo lo
                visto durante estos cuatro años.
              </p>

              <div className="mt-6 rounded-3xl border border-signal/30 bg-signal-soft p-6">
                <div className="flex items-start gap-3">
                  <Thermometer className="h-5 w-5 shrink-0 text-signal" strokeWidth={1.75} />
                  <div>
                    <p className="text-[15px] font-bold text-ink">
                      Un ejemplo de cómo encaja todo: los sensores ambientales
                    </p>
                    <p className="mt-2 text-[14px] leading-relaxed text-ink-muted">
                      A primera vista puede parecer que estos sensores están
                      metidos con calzador: ¿qué pinta un sensor de gases o de
                      temperatura en un dron pensado para encontrar personas?
                      Nada más lejos de la realidad. Por un lado, sirven para
                      comprobar si la zona donde se encuentra la víctima es
                      habitable —posibles emanaciones de gases, humo de un
                      incendio incipiente, o condiciones extremas de frío o
                      calor que puedan ponerla en riesgo—. Por otro, y no menos
                      importante: son el motivo por el que el IoT y los brokers
                      de mensajería (Mosquitto) tienen un papel tan central en
                      el sistema. Necesitaba una forma innovadora de cubrir esa
                      parte del proyecto, un área que me interesaba
                      especialmente, y estos sensores encajaban a la
                      perfección — no como un añadido a la telemetría de vuelo,
                      sino como parte real del objetivo de la misión. En el
                      fondo, el motivo para introducir el IoT no fue solo esa
                      utilidad concreta: fue también una forma más de cumplir
                      el objetivo de fondo de este proyecto — cubrir, dentro de
                      un mismo sistema, todas las áreas vistas a lo largo de la
                      carrera.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-line">
              <Image
                src={IMAGES.droneSnowMountain.src}
                alt={IMAGES.droneSnowMountain.alt}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/70 to-transparent p-6">
                <p className="font-telemetry text-[10px] uppercase text-white/70">
                  Por qué un dron
                </p>
                <p className="mt-1 text-[13px] text-white/90">
                  La aeronáutica es una pasión personal — y los drones concentran
                  casi todas las disciplinas de la carrera en un único sistema real.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-line">
              <Image
                src={IMAGES.circuitMacro.src}
                alt={IMAGES.circuitMacro.alt}
                fill
                sizes="(min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/70 to-transparent p-5">
                <p className="font-telemetry text-[10px] uppercase text-white/70">
                  Electrónica y integración de circuitos
                </p>
                <p className="mt-1 text-[12.5px] text-white/90">
                  La electrónica, los sensores y la integración de componentes son
                  un ámbito que quería dominar de verdad, no solo de forma teórica.
                </p>
              </div>
            </div>
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-line">
              <Image
                src={IMAGES.antennaTower.src}
                alt={IMAGES.antennaTower.alt}
                fill
                sizes="(min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/70 to-transparent p-5">
                <p className="font-telemetry text-[10px] uppercase text-white/70">
                  Comunicaciones avanzadas
                </p>
                <p className="mt-1 text-[12.5px] text-white/90">
                  Las comunicaciones —RF, 4G y su seguridad— son el núcleo que
                  mantiene conectado y resiliente todo el sistema.
                </p>
              </div>
            </div>
          </div>

          <p className="mt-16 max-w-3xl text-[15.5px] leading-relaxed text-ink-muted">
            En concreto, estas son las áreas que he querido cubrir en el
            proyecto:
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {DISCIPLINES.map((discipline) => {
              const Icon = discipline.icon;
              return (
                <div
                  key={discipline.title}
                  className="rounded-2xl border border-line bg-surface p-6"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent">
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <p className="mt-4 text-[14px] font-bold text-ink">{discipline.title}</p>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-ink-muted">
                    {discipline.text}
                  </p>
                </div>
              );
            })}
          </div>

          <blockquote className="mt-10 rounded-2xl border border-line bg-ink px-6 py-6 sm:px-8 sm:py-8">
            <p className="text-[15.5px] font-semibold italic leading-relaxed text-white sm:text-[17px]">
              &ldquo;El título dice &lsquo;un dron que facilite la búsqueda y
              rescate de personas&rsquo;. La realidad es que ha sido la excusa
              perfecta para consolidar cuatro años de carrera en un sistema
              real.&rdquo;
            </p>
          </blockquote>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Un sistema, no piezas sueltas"
            title="Nada se desarrolla de forma aislada"
            description="Un TFG dividido en piezas independientes —una placa, un script, un servidor y una memoria— no demuestra lo mismo que un único sistema donde esas piezas dependen unas de otras para funcionar. Ahí está, precisamente, la diferencia de este TFG: integrar todas las áreas de la carrera entre sí, en lugar de tratarlas como bloques monolíticos o islas aisladas — cada disciplina solo tiene sentido en Guardian Eye si las demás también funcionan."
          />

          <p className="mt-8 max-w-3xl text-[14.5px] leading-relaxed text-ink-muted">
            Cómo se organiza el desarrollo de estas piezas para que encajen entre
            sí, y cómo se valida cada una antes de confiar en ella, se explica en
            detalle en{" "}
            <Link href="/proyecto/metodologia" className="font-semibold text-accent underline underline-offset-2 hover:text-accent-ink">
              la página de Metodología
            </Link>
            .
          </p>

          <div className="mt-16">
            <SectionHeading
              eyebrow="El stack real"
              title="Las disciplinas, en herramientas concretas"
              description="Cada bloque académico se traduce en tecnologías reales, no en teoría de asignatura: esto es lo que efectivamente corre a bordo y en la nube."
            />
            <TechBadgeRow className="mt-8" />
          </div>

          <SubpageNav
            hub={{ label: "Volver a Proyecto", href: "/proyecto" }}
            prev={{ label: "Introducción", href: "/proyecto/introduccion" }}
            next={{ label: "Metodología", href: "/proyecto/metodologia" }}
          />
        </div>
      </section>
    </>
  );
}
