import type { Metadata } from "next";
import Image from "next/image";
import {
  Antenna,
  Camera,
  Cloud,
  CircuitBoard,
  Database,
  Gamepad2,
  GitBranch,
  KeyRound,
  Lock,
  MapPin,
  Radio,
  Route,
  SatelliteDish,
  Server,
  Thermometer,
  Wifi,
  Workflow,
} from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { TripleLinkDiagram } from "@/components/diagrams/triple-link-diagram";
import { FlowDiagram } from "@/components/diagrams/flow-diagram";
import { IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: "Arquitectura técnica",
  description:
    "Triple enlace de comunicaciones redundante, hardware modular y stack de software y cloud de Guardian Eye.",
};

const LINK_CARDS = [
  {
    id: "rf",
    icon: Gamepad2,
    label: "Mando RC",
    freq: "2.4 GHz",
    colorVar: "var(--color-signal)",
    purpose:
      "Seguridad y normativa: control manual prioritario. Pilota el dron en tiempo real sin pasar por ningún ordenador ni por la estación de tierra.",
    detail: "FlySky FS-i6X (mando) / FS-iA10B (receptor)",
  },
  {
    id: "tlm",
    icon: SatelliteDish,
    label: "Telemetría",
    freq: "915 MHz",
    colorVar: "var(--color-accent)",
    purpose:
      "Monitorización local: posición, batería y estado hacia la estación de tierra (Mission Planner o QGroundControl).",
    detail: "Banda ISM · módulo TELEM a bordo + receptor USB en tierra",
  },
  {
    id: "4g",
    icon: Cloud,
    label: "4G / LTE",
    freq: "Innovación",
    colorVar: "var(--color-mesh-violet)",
    purpose:
      "Control global vía Internet: módem USB en la Raspberry Pi, sin el límite de alcance de una radio convencional.",
    detail: "Conexión a AWS EC2 · panel de control y N8N",
  },
];

const HARDWARE_ITEMS = [
  { label: "Flight Controller", value: "Pixhawk 6C (Holybro), firmware ArduPilot" },
  { label: "GPS", value: "Holybro M10 GPS" },
  { label: "Receptor de radio", value: "FlySky FS-iA10B (mando FS-i6X)" },
  { label: "Cámara", value: "Raspberry Pi Camera Module 3 (CSI)" },
  { label: "Sensor ambiental", value: "Bosch BME680 — I2C, temperatura/humedad/presión/VOC" },
  { label: "Módem de datos", value: "4G/LTE por USB" },
  { label: "Buses", value: "MAVLink (UART) · I2C · GPIO" },
];

const FLOW_STEPS = [
  { id: "sensor", label: "Sensor", detail: "BME680 vía I2C", icon: <Thermometer strokeWidth={1.75} /> },
  { id: "mqtt", label: "MQTT", detail: "Mosquitto, puerto 1883, QoS 1", icon: <Radio strokeWidth={1.75} /> },
  { id: "bridge", label: "Puente", detail: "mqtt-to-influx en el servidor", icon: <Workflow strokeWidth={1.75} /> },
  { id: "influx", label: "InfluxDB", detail: "Series temporales por dominio", icon: <Database strokeWidth={1.75} /> },
  { id: "panel", label: "Panel", detail: "Panel de control web", icon: <Server strokeWidth={1.75} /> },
];

export default function ArquitecturaPage() {
  return (
    <>
      <header className="border-b border-line bg-surface pt-32 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="font-telemetry text-[11px] uppercase text-accent">Sec. 02 · Arquitectura técnica</p>
          <h1 className="mt-3 max-w-2xl text-balance text-[36px] font-extrabold leading-[1.1] tracking-tight text-ink sm:text-[46px]">
            Tres enlaces, dos cerebros, una nube
          </h1>
          <p className="mt-4 max-w-xl text-[15.5px] leading-relaxed text-ink-muted">
            Cómo se comunica el dron, cómo se reparte el trabajo entre la controladora de
            vuelo y el ordenador de a bordo, y cómo viajan los datos hasta la nube.
          </p>
        </div>
      </header>

      <section id="comunicaciones" className="scroll-mt-24 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Comunicaciones"
            title="Triple enlace de comunicaciones redundante"
            description="Combinar tres tipos de comunicación distintos significa que hay múltiples formas de llegar al dron. Si falla el WiFi, se puede usar el módem 4G. La telemetría puede llegar por varias vías. Y el control del dron siempre puede caer, como última medida de seguridad, sobre el enlace RC."
          />

          <div className="mt-16">
            <TripleLinkDiagram />
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {LINK_CARDS.map((link) => {
              const Icon = link.icon;
              return (
                <div
                  key={link.id}
                  className="rounded-2xl border bg-paper p-6"
                  style={{ borderColor: `color-mix(in oklab, ${link.colorVar} 30%, var(--color-line))` }}
                >
                  <span
                    className="flex h-11 w-11 items-center justify-center rounded-xl"
                    style={{ backgroundColor: `color-mix(in oklab, ${link.colorVar} 14%, white)`, color: link.colorVar }}
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <p className="mt-4 text-[15px] font-bold text-ink">{link.label}</p>
                  <p className="font-telemetry text-[11px] uppercase" style={{ color: link.colorVar }}>
                    {link.freq}
                  </p>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-ink-muted">{link.purpose}</p>
                  <p className="mt-3 border-t border-line pt-3 font-telemetry text-[10.5px] uppercase text-ink-faint">
                    {link.detail}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-16 grid gap-8 rounded-3xl border border-line bg-ink p-8 sm:p-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <div>
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-white">
                <Lock className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <h3 className="mt-4 text-[22px] font-extrabold leading-tight text-white">
                Seguridad de las comunicaciones con Tailscale
              </h3>
              <p className="mt-3 text-[14px] leading-relaxed text-white/70">
                Tailscale es una red privada virtual (VPN) que crea una malla segura entre
                todos los dispositivos del proyecto — el dron y su Raspberry Pi, el ordenador
                de tierra y el servidor en la nube — como si todos estuvieran conectados a la
                misma red local, estén donde estén.
              </p>
            </div>
            <div className="grid gap-4">
              <div className="flex gap-3 rounded-2xl border border-white/10 bg-white/5 p-5">
                <Wifi className="h-5 w-5 shrink-0 text-white" strokeWidth={1.75} />
                <p className="text-[13.5px] leading-relaxed text-white/85">
                  Permite conectarse al dron y a su ordenador de a bordo aunque no tengan una
                  dirección IP fija o pública — por ejemplo, cuando están conectados a través
                  de una tarjeta 4G.
                </p>
              </div>
              <div className="flex gap-3 rounded-2xl border border-white/10 bg-white/5 p-5">
                <KeyRound className="h-5 w-5 shrink-0 text-white" strokeWidth={1.75} />
                <p className="text-[13.5px] leading-relaxed text-white/85">
                  Cifra todo el tráfico entre el dron, el ordenador de tierra y la nube, de
                  modo que nadie pueda interceptar ni manipular las comunicaciones ni los
                  comandos de vuelo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="hardware" className="scroll-mt-24 border-t border-line bg-surface py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Hardware"
            title="Dos cerebros mejor que uno"
            description="La Pixhawk y la Raspberry Pi no compiten por las mismas tareas: cada una domina un dominio distinto, y se comunican entre sí por MAVLink sobre UART."
          />

          <div className="mt-14 grid gap-5 lg:grid-cols-2">
            <div className="rounded-3xl border border-line bg-paper p-7">
              <p className="font-telemetry text-[10.5px] uppercase text-ink-faint">
                Dominio de vuelo · Reflejos
              </p>
              <h3 className="mt-2 text-[19px] font-bold text-ink">Pixhawk 6C</h3>
              <p className="mt-3 text-[14px] leading-relaxed text-ink-muted">
                Corre en tiempo real (RTOS) con firmware ArduPilot. Su única prioridad es
                mantenerse en el aire: estabilización crítica, gestión de motores y
                seguridad de vuelo. Es la parte del sistema que no puede fallar nunca.
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
        </div>
      </section>

      <section id="software" className="scroll-mt-24 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Software & Cloud"
            title="Python, MAVLink y una pila cloud propia"
            description="Cuatro procesos independientes, cada uno responsable de un dominio de datos, publican por MQTT hacia un backend Flask en AWS que almacena la telemetría en InfluxDB."
          />

          <div className="mt-14 grid gap-4 sm:grid-cols-2">
            {[
              {
                icon: Route,
                title: "sensor.py",
                text: "Lee el BME680 (I2C) y publica en dronsar/{dron_id}/ambiental.",
              },
              {
                icon: Server,
                title: "sistema.py",
                text: "Estado de la Raspberry Pi: CPU, RAM, disco, temperatura, uptime.",
              },
              {
                icon: SatelliteDish,
                title: "vuelo.py",
                text: "Telemetría de vuelo vía MAVLink, validada primero contra ArduPilot SITL con pymavlink.",
              },
              {
                icon: Camera,
                title: "deteccion.py",
                text: "Inferencia YOLO sobre la cámara y publicación de alertas de persona detectada.",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="flex gap-4 rounded-2xl border border-line bg-paper p-5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface text-accent">
                    <Icon className="h-4.5 w-4.5" strokeWidth={1.75} />
                  </span>
                  <div>
                    <p className="font-telemetry text-[13px] text-ink">{item.title}</p>
                    <p className="mt-1 text-[13px] leading-relaxed text-ink-muted">{item.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <p className="mt-4 text-[12.5px] leading-relaxed text-ink-faint">
            Cada proceso corre como un servicio systemd independiente con su propia base de
            datos SQLite local: si la red falla, los datos se guardan y se reenvían en
            cuanto vuelve la conexión (patrón store-and-forward).
          </p>

          <div className="mt-16">
            <p className="font-telemetry mb-6 text-[10.5px] uppercase text-ink-faint">
              Flujo de datos: del sensor al panel de control
            </p>
            <FlowDiagram steps={FLOW_STEPS} />
          </div>

          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border border-line bg-surface p-6">
              <p className="text-[13.5px] font-bold text-ink">AWS EC2 + Flask</p>
              <p className="mt-2 text-[13px] leading-relaxed text-ink-muted">
                Instancia t3.small dentro de una VPC. Flask expone una API REST tanto para
                comandos de vuelo como para reconfigurar en caliente cada colector (por
                ejemplo, cambiar el intervalo del sensor) sin reiniciar procesos.
              </p>
            </div>
            <div className="rounded-2xl border border-line bg-surface p-6">
              <p className="text-[13.5px] font-bold text-ink">MQTT · Mosquitto</p>
              <p className="mt-2 text-[13px] leading-relaxed text-ink-muted">
                Broker autoalojado en el EC2, puerto 1883, QoS 1. Jerarquía de topics{" "}
                <code className="font-telemetry text-[11.5px]">dronsar/{"{dron_id}"}/{"{dominio}"}</code>, con
                comodines como <code className="font-telemetry text-[11.5px]">dronsar/+/deteccion</code>.
              </p>
            </div>
            <div className="rounded-2xl border border-line bg-surface p-6">
              <p className="text-[13.5px] font-bold text-ink">InfluxDB</p>
              <p className="mt-2 text-[13px] leading-relaxed text-ink-muted">
                Cada dominio se guarda como una measurement de serie temporal, con el
                identificador del dron como tag indexado — así se puede filtrar y agrupar
                por dron de forma eficiente.
              </p>
            </div>
            <div className="rounded-2xl border border-line bg-surface p-6">
              <p className="text-[13.5px] font-bold text-ink">N8N</p>
              <p className="mt-2 text-[13px] leading-relaxed text-ink-muted">
                Pieza declarada de automatización y orquestación dentro del stack cloud del
                proyecto, para encadenar acciones futuras sobre las alertas de detección.
              </p>
            </div>
            <div className="rounded-2xl border border-line bg-surface p-6">
              <p className="text-[13.5px] font-bold text-ink">nginx + Cloudflare</p>
              <p className="mt-2 text-[13px] leading-relaxed text-ink-muted">
                Proxy inverso que sirve el panel de control web y gestiona HTTPS, con
                Cloudflare como DNS sobre el dominio del proyecto.
              </p>
            </div>
            <div className="flex flex-col justify-between rounded-2xl border border-dashed border-line bg-paper p-6">
              <div className="flex items-center gap-2">
                <GitBranch className="h-4 w-4 text-ink-faint" strokeWidth={1.75} />
                <p className="text-[13.5px] font-bold text-ink">Código abierto</p>
              </div>
              <p className="mt-2 text-[13px] leading-relaxed text-ink-muted">
                Los tres repositorios del stack están publicados en GitHub — ver detalle en{" "}
                <span className="font-medium text-ink">Impacto y futuro</span>.
              </p>
            </div>
          </div>

          <div className="mt-6 flex items-start gap-3 rounded-2xl border border-signal/30 bg-signal-soft p-5">
            <Antenna className="mt-0.5 h-4.5 w-4.5 shrink-0 text-signal-ink" strokeWidth={1.75} />
            <p className="text-[13px] leading-relaxed text-ink">
              Está previsto ampliar el panel con análisis semántico sobre las detecciones
              apoyado en modelos de lenguaje en la nube (AWS Bedrock) — es una línea de
              trabajo futura, no una funcionalidad ya validada.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
