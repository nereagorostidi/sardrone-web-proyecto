import type { Metadata } from "next";
import Link from "next/link";
import { siGrafana } from "simple-icons";
import {
  Antenna,
  Camera,
  Cloud,
  Code2,
  Cpu,
  GitBranch,
  KeyRound,
  PlaneTakeoff,
  Route,
  SatelliteDish,
  Server,
  Settings2,
  Smartphone,
  Workflow,
} from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { BrandIcon } from "@/components/brand-icon";
import { FlowDiagram, type FlowGroup } from "@/components/diagrams/flow-diagram";
import { PanelPhoneMockup } from "@/components/panel-phone-mockup";
import { PageHero } from "@/components/page-hero";
import { SubpageNav } from "@/components/subpage-nav";
import { IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: "Software & Cloud",
  description:
    "El panel de control (PWA) que envía órdenes al dron, cómo llegan por MQTT y MAVLink hasta la Pixhawk, y el resto de la pila cloud: Flask en AWS, InfluxDB, nginx y Cloudflare.",
};

const COMMAND_STEPS = [
  { id: "panel", label: "Panel (PWA)", detail: "Botón del panel de control", icon: <Smartphone strokeWidth={1.75} /> },
  { id: "api", label: "API REST", detail: "Flask · POST /api/command", icon: <Server strokeWidth={1.75} /> },
  { id: "mqtt", label: "MQTT", detail: "dronsar/{dron_id}/comandos · QoS 1", icon: <Route strokeWidth={1.75} /> },
  { id: "receptor", label: "Receptor (Pi)", detail: "Suscrito al topic de comandos", icon: <Workflow strokeWidth={1.75} /> },
  { id: "mavlink", label: "MAVLink → Pixhawk", detail: "Arma, despega, aterriza…", icon: <SatelliteDish strokeWidth={1.75} /> },
];

const COMMAND_GROUPS: FlowGroup[] = [
  { label: "AWS Cloud", icon: <Cloud strokeWidth={1.75} />, stepIds: ["panel", "api", "mqtt"] },
  { label: "Raspberry Pi · a bordo del dron", icon: <Cpu strokeWidth={1.75} />, stepIds: ["receptor", "mavlink"] },
];

const PANEL_GROUPS = [
  {
    icon: PlaneTakeoff,
    title: "Vuelo",
    text: "Armar y desarmar motores, despegar a una altitud concreta, iniciar una misión, mantener posición, aterrizar o volver al punto de partida (RTL).",
  },
  {
    icon: Camera,
    title: "Cámara",
    text: "El vídeo en directo del dron se ve dentro del propio panel, sin salir de la app ni abrir otra herramienta, con botones para empezar y detener la grabación.",
  },
  {
    icon: Settings2,
    title: "Sistema y sensores",
    text: "No todo son órdenes de vuelo: también se puede reconfigurar en caliente el intervalo de envío del sensor ambiental, el throttling del vídeo, o apagar la Raspberry Pi en remoto.",
  },
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
        title="Un panel de control (PWA) y la infraestructura cloud detrás de él"
        description="Toda esta arquitectura de hardware, comunicaciones y datos está gobernada por un desarrollo abierto, sobre el que se ha construido el software que recoge los datos de los sensores, controla el dron y gestiona el vídeo y la IA — con una arquitectura pensada para ir sumando funcionalidades de forma escalable, apoyada en la flexibilidad que da la nube para desplegar cada servicio que necesita el sistema: el broker de mensajería, el streaming de vídeo, el puente IoT o los servidores web del panel de control."
        image={{ src: IMAGES.serverRoom.src, alt: IMAGES.serverRoom.alt }}
      />

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="El panel de control"
            title="Una PWA para operar el dron desde el móvil"
            description="Guardian Eye no se controla solo con la emisora de radio: hemos construido un panel de control en forma de página web, instalable como aplicación (PWA) en el móvil o el escritorio, desde el que operar el dron a distancia."
          />

          <div className="mt-6 flex items-start gap-3 rounded-2xl border border-accent/30 bg-accent-soft p-5">
            <Smartphone className="mt-0.5 h-5 w-5 shrink-0 text-accent" strokeWidth={1.75} />
            <p className="text-[13px] leading-relaxed text-ink">
              <span className="font-semibold text-ink">¿Qué es una PWA?</span> Una Progressive
              Web App es una página web que se comporta como una aplicación instalada: se
              añade a la pantalla de inicio con su propio icono, se abre a pantalla completa
              sin la barra del navegador, y funciona igual de bien en el móvil que en el
              escritorio. Es tan cómoda precisamente por eso — una sola página web hace de web
              y de app, sin tener que programar ni mantener dos versiones distintas del panel.
            </p>
          </div>

          <p className="mt-6 max-w-3xl text-[15px] leading-relaxed text-ink-muted">
            El panel no se limita a las operaciones principales de vuelo. También permite
            interactuar con los sensores y con la propia Raspberry Pi — reconfigurar en
            caliente un colector o apagar el equipo en remoto — sin necesidad de tocar el dron
            físicamente ni reiniciar ningún proceso a bordo.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {PANEL_GROUPS.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-2xl border border-line bg-surface p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent">
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <p className="mt-4 text-[14.5px] font-bold text-ink">{item.title}</p>
                  <p className="mt-2 text-[13px] leading-relaxed text-ink-muted">{item.text}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-16">
            <SectionHeading
              eyebrow="Cómo llega un comando hasta el dron"
              title="De un botón en el móvil a una orden MAVLink"
              description="El panel no habla con el dron directamente: la orden atraviesa varias capas antes de llegar al autopiloto."
            />
            <p className="mt-6 max-w-3xl text-[14.5px] leading-relaxed text-ink-muted">
              Al pulsar un botón, el panel hace una petición HTTP a una API REST (Flask) que
              corre en el mismo servidor en la nube. Esa API no envía la orden directamente al
              dron: la publica como un mensaje en el broker MQTT, siguiendo la misma
              arquitectura de publicador/suscriptor que el resto del sistema — el mismo patrón
              que la telemetría, pero en sentido contrario. La Raspberry Pi, a bordo del dron,
              ejecuta un proceso suscrito a ese canal de comandos: en cuanto llega un mensaje
              nuevo, lo interpreta y lo traduce a una instrucción MAVLink, el protocolo con el
              que se habla con la controladora de vuelo Pixhawk — que es quien realmente arma
              los motores, despega o aterriza.
            </p>
            <div className="mt-10">
              <FlowDiagram
                steps={COMMAND_STEPS}
                groups={COMMAND_GROUPS}
                connectorNotes={{ mqtt: "Internet / 4G" }}
              />
            </div>
            <p className="mt-6 max-w-3xl text-[13px] leading-relaxed text-ink-muted">
              Código real de cada capa, en los repositorios abiertos del proyecto:{" "}
              <a
                href="https://github.com/nereagorostidi/drone-cloud-server/tree/main/www/control"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 font-semibold text-accent underline underline-offset-2"
              >
                <Code2 className="h-3.5 w-3.5" /> panel (PWA)
              </a>
              ,{" "}
              <a
                href="https://github.com/nereagorostidi/drone-cloud-server/tree/main/api-rest"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 font-semibold text-accent underline underline-offset-2"
              >
                <Code2 className="h-3.5 w-3.5" /> API REST
              </a>{" "}
              y{" "}
              <a
                href="https://github.com/nereagorostidi/drone-edge-companion/blob/main/receptor.py"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 font-semibold text-accent underline underline-offset-2"
              >
                <Code2 className="h-3.5 w-3.5" /> receptor.py
              </a>
              .
            </p>

            <div className="mt-10 flex flex-row flex-wrap justify-center gap-10">
              <div>
                <PanelPhoneMockup variant="vuelo" />
                <p className="mt-3 text-center text-[11.5px] font-semibold uppercase tracking-wide text-ink-faint">
                  Control de vuelo
                </p>
              </div>
              <div>
                <PanelPhoneMockup variant="camara" />
                <p className="mt-3 text-center text-[11.5px] font-semibold uppercase tracking-wide text-ink-faint">
                  Vídeo en directo
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16">
            <SectionHeading
              eyebrow="La infraestructura cloud"
              title="Qué corre en AWS, pieza por pieza"
              description="Aquí está el inventario de lo que corre en la nube — sin repetir lo que ya se explica en el resto de páginas de Arquitectura."
            />
            <p className="mt-6 max-w-3xl text-[14.5px] leading-relaxed text-ink-muted">
              El panel, la API, el broker y la base de datos no viven en abstracto: hoy corren
              en el mismo servidor EC2, por simplicidad — no porque el software dependa de que
              sea así. Cada proceso habla con el resto por red (HTTP, MQTT) y resuelve la
              dirección de cada pieza desde su configuración (un host en el{" "}
              <code className="font-telemetry text-[12.5px]">.env</code>), no desde un valor
              fijo en el código. Repartir mañana esos servicios entre varias máquinas —o mover
              InfluxDB a su propio servidor— es un cambio de configuración, no una reescritura
              del software.
            </p>
            <p className="mt-4 max-w-3xl text-[14.5px] leading-relaxed text-ink-muted">
              Tampoco hace falta que sea en la nube: no es estrictamente necesario montar todo
              esto en AWS ni en ningún otro proveedor cloud. Flask, Mosquitto, InfluxDB y nginx
              son software estándar que funcionaría igual de bien en un servidor propio, físico
              — no hay ninguna pieza aquí que dependa de un servicio exclusivo de AWS. Hemos
              optado por la nube por la flexibilidad y la escalabilidad que ofrece —añadir o
              redimensionar recursos bajo demanda, sin mantenimiento físico—, no porque el
              proyecto dependa técnicamente de estar ahí.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border border-line bg-surface p-6">
              <p className="text-[13.5px] font-bold text-ink">AWS EC2 + Flask</p>
              <p className="mt-2 text-[13px] leading-relaxed text-ink-muted">
                Instancia t3.small dentro de una VPC — toda la gestión del sistema vive en la
                nube de Amazon (AWS), lo que da una base escalable y gestionable desde
                cualquier sitio, sin depender de estar físicamente junto al dron. Aquí corre
                el broker MQTT, la API REST del panel de control descrita arriba, y el puente
                hacia InfluxDB.
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
            <div className="rounded-2xl border border-line bg-surface p-6">
              <p className="flex items-center gap-2 text-[13.5px] font-bold text-ink">
                <BrandIcon path={siGrafana.path} color={`#${siGrafana.hex}`} className="h-4 w-4" />
                Grafana
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-ink-muted">
                Paneles de monitorización sobre InfluxDB: permite consultar visualmente las
                series temporales de telemetría y sensores, sin tener que escribir una
                consulta contra la base de datos cada vez.
              </p>
            </div>
            <div className="rounded-2xl border border-line bg-surface p-6">
              <p className="flex items-center gap-2 text-[13.5px] font-bold text-ink">
                <KeyRound className="h-4 w-4 text-accent" strokeWidth={1.75} />
                Acceso seguro · Tailscale
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-ink-muted">
                El EC2 y el resto de piezas de esta página son alcanzables desde la red
                privada de Tailscale, sin exponer puertos públicos innecesarios — detalle
                completo en{" "}
                <Link href="/arquitectura/comunicaciones" className="font-semibold text-accent underline underline-offset-2">
                  Comunicaciones
                </Link>
                .
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

          <p className="mt-6 max-w-3xl text-[13px] leading-relaxed text-ink-muted">
            Qué publica cada uno de los cuatro procesos a bordo (<code className="font-telemetry text-[11.5px]">sensor.py</code>,{" "}
            <code className="font-telemetry text-[11.5px]">sistema.py</code>,{" "}
            <code className="font-telemetry text-[11.5px]">vuelo.py</code>,{" "}
            <code className="font-telemetry text-[11.5px]">deteccion.py</code>) y por qué están
            separados está explicado en detalle en{" "}
            <Link href="/arquitectura/datos" className="font-semibold text-accent underline underline-offset-2">
              Datos e IoT
            </Link>
            .
          </p>

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
            prev={{ label: "Datos e IoT", href: "/arquitectura/datos" }}
          />
        </div>
      </section>
    </>
  );
}
