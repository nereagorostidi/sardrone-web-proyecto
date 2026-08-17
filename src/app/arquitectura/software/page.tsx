import type { Metadata } from "next";
import { Antenna, Camera, GitBranch, Layers3, Route, SatelliteDish, Server, Thermometer, Workflow } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { FlowDiagram } from "@/components/diagrams/flow-diagram";
import { PageHero } from "@/components/page-hero";
import { SubpageNav } from "@/components/subpage-nav";
import { IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: "Software & Cloud",
  description:
    "Cuatro servicios Python, MQTT, un backend Flask en AWS, InfluxDB y el resto de la pila cloud de Guardian Eye.",
};

const FLOW_STEPS = [
  { id: "sensor", label: "Sensor", detail: "BME680 vía I2C", icon: <Thermometer strokeWidth={1.75} /> },
  { id: "mqtt", label: "MQTT", detail: "Mosquitto, puerto 1883, QoS 1", icon: <Route strokeWidth={1.75} /> },
  { id: "bridge", label: "Puente", detail: "mqtt-to-influx en el servidor", icon: <Workflow strokeWidth={1.75} /> },
  { id: "influx", label: "InfluxDB", detail: "Series temporales por dominio", icon: <Layers3 strokeWidth={1.75} /> },
  { id: "panel", label: "Panel", detail: "Panel de control web", icon: <Server strokeWidth={1.75} /> },
];

export default function SoftwarePage() {
  return (
    <>
      <PageHero
        eyebrow="Arquitectura · Software & Cloud"
        breadcrumbs={[
          { label: "Inicio", href: "/" },
          { label: "Arquitectura técnica", href: "/arquitectura" },
          { label: "Software & Cloud" },
        ]}
        title="Python, MAVLink y una pila cloud propia"
        description="Cuatro procesos independientes, cada uno responsable de un dominio de datos, publican por MQTT hacia un backend Flask en AWS que almacena la telemetría en InfluxDB."
        tone="signal"
        image={{ src: IMAGES.serverRoom.src, alt: IMAGES.serverRoom.alt }}
      />

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Por qué MQTT y no HTTP"
            title="Un protocolo pensado para redes que fallan"
            description="MQTT es un protocolo de mensajería ligero, del tipo publicación/suscripción: cada proceso publica sus datos en un 'topic' (un canal con nombre) y cualquiera interesado se suscribe a él, sin necesidad de conocerse entre sí. A diferencia de una petición HTTP tradicional, está diseñado para redes inestables o de bajo ancho de banda — exactamente el escenario de un dron con conectividad 4G intermitente en el campo."
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
            cuanto vuelve la conexión (patrón store-and-forward). systemd es el gestor de
            servicios de Linux: si un proceso se cae, lo reinicia automáticamente sin
            intervención manual, algo esencial para un sistema que opera sin supervisión
            constante en el campo.
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
                Broker autoalojado en el EC2, puerto 1883, QoS 1 (el mensaje se entrega al
                menos una vez, con confirmación). Jerarquía de topics{" "}
                <code className="font-telemetry text-[11.5px]">dronsar/{"{dron_id}"}/{"{dominio}"}</code>, con
                comodines como <code className="font-telemetry text-[11.5px]">dronsar/+/deteccion</code>.
              </p>
            </div>
            <div className="rounded-2xl border border-line bg-surface p-6">
              <p className="text-[13.5px] font-bold text-ink">InfluxDB</p>
              <p className="mt-2 text-[13px] leading-relaxed text-ink-muted">
                Base de datos de series temporales: cada dominio se guarda como una
                measurement, con el identificador del dron como tag indexado — pensada
                específicamente para datos con marca de tiempo de alta frecuencia, a
                diferencia de una base de datos relacional genérica.
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

          <SubpageNav
            hub={{ label: "Volver a Arquitectura", href: "/arquitectura" }}
            prev={{ label: "Hardware", href: "/arquitectura/hardware" }}
          />
        </div>
      </section>
    </>
  );
}
