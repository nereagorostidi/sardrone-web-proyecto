import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BookOpen, Cable, CircuitBoard, Cpu, MapPin, Zap } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { PageHero } from "@/components/page-hero";
import { SubpageNav } from "@/components/subpage-nav";
import { IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: "Hardware",
  description:
    "Pixhawk 6X y Raspberry Pi 5 como dos cerebros complementarios, sensores e integración a bordo de Guardian Eye.",
};

const HARDWARE_ITEMS = [
  { label: "Flight Controller", value: "Pixhawk 6X (Holybro), firmware ArduPilot" },
  { label: "GPS", value: "Holybro M10 GPS" },
  { label: "Receptor de radio", value: "FlySky FS-iA10B (mando FS-i6X)" },
  { label: "Cámara", value: "Raspberry Pi Camera Module 3 (CSI)" },
  { label: "Sensor ambiental", value: "Bosch BME680 — I2C, temperatura/humedad/presión/VOC" },
  { label: "Módem de datos", value: "4G/LTE por USB" },
  { label: "Buses", value: "MAVLink (UART) · I2C · GPIO" },
];

const GLOSSARY = [
  {
    term: "RTOS",
    def: "Sistema operativo en tiempo real: garantiza que una tarea crítica (como mantener el dron estable) se ejecute siempre dentro de un plazo fijo, algo que un sistema operativo de propósito general como Linux no puede prometer.",
  },
  {
    term: "I2C / GPIO",
    def: "Dos formas más de conectar electrónica sencilla, junto al UART que la Pixhawk usa para hablar MAVLink: I2C para varios sensores compartiendo el mismo bus (como el BME680), GPIO para señales digitales simples.",
  },
];

export default function HardwarePage() {
  return (
    <>
      <PageHero
        eyebrow="Arquitectura · Hardware"
        breadcrumbs={[
          { label: "Inicio", href: "/" },
          { label: "Arquitectura técnica", href: "/arquitectura" },
          { label: "Hardware" },
        ]}
        title="Dos cerebros mejor que uno"
        description="La Pixhawk y la Raspberry Pi no compiten por las mismas tareas: cada una domina un dominio distinto, y se comunican entre sí por MAVLink sobre UART."
        image={{ src: IMAGES.circuitBoard.src, alt: IMAGES.circuitBoard.alt }}
      />

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Separación de responsabilidades"
            title="Por qué dos ordenadores y no uno solo"
            description="Podría parecer más simple resolverlo todo con un único ordenador de a bordo. El problema es que un mismo proceso corriendo la inferencia de un modelo de IA no puede garantizar, al mismo tiempo, la latencia de milisegundos que necesita el control de motores. Separar 'lo que no puede fallar' de 'lo que piensa' es una decisión de arquitectura, no una limitación de recursos."
          />

          <div className="mt-14 grid gap-5 lg:grid-cols-2">
            <div className="rounded-3xl border border-line bg-paper p-7">
              <p className="font-telemetry text-[10.5px] uppercase text-ink-faint">
                Dominio de vuelo · Reflejos
              </p>
              <h3 className="mt-2 text-[19px] font-bold text-ink">Pixhawk 6X</h3>
              <p className="mt-3 text-[14px] leading-relaxed text-ink-muted">
                Corre en tiempo real (RTOS) con firmware ArduPilot. Su única prioridad es
                mantenerse en el aire: estabilización crítica, gestión de motores y
                seguridad de vuelo. Es la parte del sistema que no puede fallar nunca —
                por eso corre un sistema operativo en tiempo real y no Linux de propósito
                general.
              </p>
            </div>
            <div className="rounded-3xl border border-accent/30 bg-accent-soft p-7">
              <p className="font-telemetry text-[10.5px] uppercase text-accent">
                Dominio de aplicación · Inteligencia
              </p>
              <h3 className="mt-2 text-[19px] font-bold text-ink">
                Raspberry Pi 5 — Edge Companion
              </h3>
              <p className="mt-3 text-[14px] leading-relaxed text-ink-muted">
                Corre Linux y se encarga de pensar y ver: visión por computador, las
                comunicaciones 4G, la gestión de la misión y la conexión con la nube (AWS),
                sin sobrecargar la controladora de vuelo. Incorpora un acelerador{" "}
                <span className="font-medium text-ink">Hailo-8L</span> para ejecutar la
                inferencia de YOLO sin saturar la CPU.
              </p>
            </div>
          </div>

          <div className="mt-6 flex items-start gap-3 rounded-2xl border border-line bg-paper p-6">
            <MapPin className="h-5 w-5 shrink-0 text-accent" strokeWidth={1.75} />
            <p className="text-[13.5px] leading-relaxed text-ink-muted">
              La Raspberry Pi también se conecta a la red segura de Tailscale, lo que
              permite acceder a ella de forma remota sin necesidad de configurar una IP fija
              ni abrir puertos en el router — algo especialmente útil trabajando desde el
              campo, en el club de vuelo.
            </p>
          </div>

          <div className="mt-16">
            <SectionHeading
              eyebrow="Cómo hablan los dos cerebros"
              title="MAVLink: por qué elegimos Pixhawk y no algo más barato"
              description="La Pixhawk 6X no es la controladora de vuelo más económica del mercado — pero es la que nos permite que la Raspberry Pi hable con ella de tú a tú."
            />

            <div className="mt-8 space-y-5">
              <p className="text-[14.5px] leading-relaxed text-ink-muted">
                Existen controladoras de vuelo bastante más baratas que la Pixhawk 6X. En el
                mundo del FPV racing es habitual usar controladoras con firmware{" "}
                <span className="font-medium text-ink">Betaflight</span> o{" "}
                <span className="font-medium text-ink">iNav</span> —por ejemplo una{" "}
                <span className="font-medium text-ink">SpeedyBee F405</span>—, pensadas sobre
                todo para vuelo acrobático manual, con poca o ninguna atención a exponer sus
                datos y sus órdenes a un ordenador externo. El propio dron que nos prestó José
                Manuel (ver{" "}
                <Link
                  href="/colaboradores"
                  className="font-semibold text-accent underline underline-offset-2"
                >
                  Colaboradores
                </Link>
                ) monta una controladora DJI Naza: un sistema cerrado, sin firmware abierto ni
                un protocolo estandarizado para que un ordenador externo la controle. Elegimos
                la Pixhawk 6X, con firmware{" "}
                <span className="font-medium text-ink">ArduPilot</span>, justo por lo
                contrario: habla{" "}
                <span className="font-medium text-ink">MAVLink</span>, un protocolo abierto
                pensado para que un ordenador externo —en nuestro caso, la Raspberry Pi— pueda
                enviarle órdenes de vuelo y leer sus datos en tiempo real, con la misma
                solidez que usaría una estación de tierra profesional.
              </p>

              <p className="text-[14.5px] leading-relaxed text-ink-muted">
                <span className="font-semibold text-ink">ArduPilot</span> es el firmware de
                código abierto que corre dentro de la Pixhawk 6X: el programa que de verdad
                estabiliza el dron, gestiona sus motores y ejecuta cada orden de vuelo. Es uno
                de los dos grandes firmwares de autopiloto de código abierto que existen hoy
                (el otro es PX4), con más de una década de desarrollo detrás — lo que se
                traduce en documentación madura y un soporte muy completo de MAVLink.
              </p>

              <p className="text-[14.5px] leading-relaxed text-ink-muted">
                <span className="font-semibold text-ink">MAVLink</span> (Micro Air Vehicle
                Link) es un protocolo de mensajería ligero, pensado específicamente para
                vehículos no tripulados con recursos limitados: en vez de una conexión pesada
                tipo HTTP, define mensajes muy compactos y de formato fijo. Por ejemplo, un
                mensaje{" "}
                <code className="font-telemetry text-[12.5px] text-ink">HEARTBEAT</code> que
                la Pixhawk envía varias veces por segundo para decir «sigo aquí, y este es mi
                estado», o un mensaje{" "}
                <code className="font-telemetry text-[12.5px] text-ink">COMMAND_LONG</code>{" "}
                que se usa para pedir que arme motores, despegue o inicie una misión. Es un
                estándar abierto —no depende de un único fabricante— adoptado tanto por
                ArduPilot como por PX4, y es el mismo protocolo que ya usan Mission Planner o
                QGroundControl para hablar con la Pixhawk por telemetría (ver{" "}
                <Link
                  href="/arquitectura/comunicaciones"
                  className="font-semibold text-accent underline underline-offset-2"
                >
                  Comunicaciones
                </Link>
                ).
              </p>

              <p className="text-[14.5px] leading-relaxed text-ink-muted">
                Físicamente, la Pixhawk 6X saca ese protocolo por varios puertos{" "}
                <span className="font-medium text-ink">TELEM</span> (TELEM1, TELEM2...),
                además de sus puertos dedicados de GPS y de RC. Cada puerto TELEM es una
                conexión serie <span className="font-medium text-ink">UART</span> — un
                estándar de comunicación simple, de solo dos cables (uno para transmitir y
                otro para recibir), pensado para conectar dos dispositivos directamente sin
                necesidad de un bus compartido ni de mucha electrónica intermedia. Es
                precisamente esa disponibilidad de puertos TELEM libres lo que nos permite,
                además del enlace de radio de 433 MHz hacia la estación de tierra, conectar un
                segundo dispositivo por otro puerto TELEM: nuestra Raspberry Pi 5. La propia
                Raspberry Pi le habla MAVLink a la Pixhawk exactamente igual que lo haría una
                estación de tierra — solo que por cable, en vez de por radio.
              </p>
            </div>

            <div className="mt-6 flex items-start gap-3 rounded-2xl border border-accent/30 bg-accent-soft p-6">
              <Cable className="mt-0.5 h-5 w-5 shrink-0 text-accent" strokeWidth={1.75} />
              <p className="text-[13.5px] leading-relaxed text-ink">
                <span className="font-semibold">
                  Lo que gana el proyecto por tener un ordenador de a bordo hablando MAVLink:
                </span>{" "}
                que la Raspberry Pi deje de ser solo un ordenador de vídeo y se convierta en un
                segundo cerebro de verdad. Al hablar MAVLink directamente con la Pixhawk, puede
                tanto leer en tiempo real la posición, la altitud o el estado de la batería del
                dron —los mismos datos que seguiría un GCS— como enviarle órdenes de vuelo:
                armar o desarmar motores, iniciar una misión, forzar un regreso a casa (RTL).
                En Guardian Eye, ese canal es exactamente el que usa{" "}
                <code className="font-telemetry text-[12px] text-ink">receptor.py</code>, el
                proceso que recibe comandos desde el panel de control (PWA) por MQTT y los
                traduce en órdenes MAVLink reales contra la Pixhawk (ver{" "}
                <Link
                  href="/arquitectura/datos"
                  className="font-semibold underline underline-offset-2"
                >
                  Datos e IoT
                </Link>{" "}
                y{" "}
                <Link
                  href="/arquitectura/software"
                  className="font-semibold underline underline-offset-2"
                >
                  Software &amp; Cloud
                </Link>{" "}
                para el resto del recorrido de un comando).
              </p>
            </div>

            <p className="mt-6 text-[14.5px] leading-relaxed text-ink-muted">
              Todo esto se programa en Python usando{" "}
              <span className="font-medium text-ink">pymavlink</span>, la librería de
              referencia del propio proyecto ArduPilot para hablar MAVLink desde código:
              permite tanto construir y enviar un mensaje MAVLink concreto —por ejemplo, uno de
              armado— como escuchar los mensajes que la Pixhawk envía constantemente y extraer
              de ellos la telemetría. Es esa misma librería, no una reimplementación propia del
              protocolo, la que usa{" "}
              <code className="font-telemetry text-[12.5px] text-ink">receptor.py</code> en la
              Raspberry Pi para traducir cada comando que llega por MQTT en la llamada MAVLink
              correspondiente.
            </p>
          </div>

          <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:items-start">
            <div>
              <p className="font-telemetry text-[10.5px] uppercase text-ink-faint">
                Pipeline de hardware modular
              </p>
              <dl className="mt-4 divide-y divide-line rounded-2xl border border-line bg-paper">
                {HARDWARE_ITEMS.map((item) => (
                  <div key={item.label} className="flex flex-col gap-1 p-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                    <dt className="text-[13px] font-semibold text-ink">{item.label}</dt>
                    <dd className="font-telemetry text-[12px] text-ink-muted sm:text-right">{item.value}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 flex items-start gap-2 text-[12.5px] leading-relaxed text-ink-faint">
                <CircuitBoard className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={1.75} />
                Protección térmica de los componentes críticos y especificaciones finales de
                chasis, motores y batería:{" "}
                <span className="font-semibold text-ink-muted">
                  [placeholder — el dron definitivo está en fase de adquisición/montaje]
                </span>
                .
              </p>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-line">
              <Image
                src={IMAGES.circuitMacro.src}
                alt={IMAGES.circuitMacro.alt}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="mt-16">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4.5 w-4.5 text-accent" strokeWidth={1.75} />
              <p className="font-telemetry text-[10.5px] uppercase text-ink-faint">
                Glosario rápido
              </p>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {GLOSSARY.map((g) => (
                <div key={g.term} className="rounded-2xl border border-line bg-surface p-5">
                  <p className="font-telemetry text-[12px] font-bold text-ink">{g.term}</p>
                  <p className="mt-2 text-[12.5px] leading-relaxed text-ink-muted">{g.def}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex items-start gap-3 rounded-2xl border border-accent/30 bg-accent-soft p-6">
            <Cpu className="mt-0.5 h-5 w-5 shrink-0 text-accent" strokeWidth={1.75} />
            <p className="text-[13.5px] leading-relaxed text-ink">
              <span className="font-semibold">¿Por qué un acelerador Hailo-8L y no solo CPU?</span>{" "}
              Ejecutar un modelo de detección de objetos como YOLO fotograma a fotograma es
              costoso computacionalmente. Un acelerador de IA dedicado descarga ese trabajo
              de la CPU, permitiendo que la Raspberry Pi siga gestionando comunicaciones y
              misión a la vez que procesa vídeo en tiempo real, sin cuellos de botella.
            </p>
          </div>

          <div className="mt-4 flex items-start gap-3 rounded-2xl border border-line bg-paper p-6 opacity-80">
            <Zap className="mt-0.5 h-5 w-5 shrink-0 text-ink-faint" strokeWidth={1.75} />
            <p className="text-[12.5px] leading-relaxed text-ink-faint">
              Nota: el LiDAR y la visión térmica aparecen en algunos materiales de difusión
              iniciales del proyecto (tipo pitch-deck), pero están descartados de la
              arquitectura real — esta página documenta únicamente el hardware efectivamente
              usado.
            </p>
          </div>

          <SubpageNav
            hub={{ label: "Volver a Arquitectura", href: "/arquitectura" }}
            next={{ label: "Comunicaciones", href: "/arquitectura/comunicaciones" }}
          />
        </div>
      </section>
    </>
  );
}
