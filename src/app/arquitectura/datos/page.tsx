import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeftRight,
  BookOpen,
  Camera,
  Cloud,
  Cpu,
  Database,
  FileClock,
  Inbox,
  Layers,
  MapPin,
  Radio,
  Save,
  Server,
  SatelliteDish,
  ShieldCheck,
  Terminal,
  TestTube2,
  Thermometer,
  Video,
} from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { FlowDiagram, type FlowGroup } from "@/components/diagrams/flow-diagram";
import { RadialDiagram, type RadialNode } from "@/components/diagrams/radial-diagram";
import { PageHero } from "@/components/page-hero";
import { SubpageNav } from "@/components/subpage-nav";
import { IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: "Datos e IoT",
  description:
    "Por qué reforzamos el dron con brokers, MQTT y store-and-forward, y cómo lo usamos para mucho más que sensores: vídeo, localización de personas y comandos al propio dron.",
};

const GLOSSARY = [
  {
    term: "Broker",
    def: "Un intermediario de mensajería. Los procesos no se hablan entre sí directamente: publican en un canal (topic) y el broker se encarga de entregarlo a quien esté suscrito.",
  },
  {
    term: "MQTT",
    def: "El protocolo ligero de publicación/suscripción que habla con el broker — pensado específicamente para redes inestables o de bajo ancho de banda, no para una conexión siempre estable.",
  },
  {
    term: "Store-and-forward",
    def: "Cada dato se guarda primero en local y se reenvía cuando hay conexión confirmada. Si la red cae a mitad de camino, no se pierde nada: solo llega más tarde.",
  },
];

const PRINCIPLES = [
  {
    icon: Radio,
    title: "Edge-first",
    text: "El nodo opera de forma autónoma y la conexión con tierra es oportunista, no obligatoria: el dron captura y registra siempre, y envía cuando puede. Esencial en SAR, donde la cobertura de red es incierta.",
  },
  {
    icon: FileClock,
    title: "Store-and-forward",
    text: "Captura y envío van desacoplados. Cada medida se guarda primero en local — la fuente de verdad — y se reenvía cuando hay conexión confirmada. Si la red cae, no se pierde ningún intervalo.",
  },
  {
    icon: ArrowLeftRight,
    title: "Productor-consumidor",
    text: "Quien captura los datos y quien los envía no se hablan directamente, sino a través de un buffer local. Ese desacoplamiento permite que la captura no se detenga aunque falle el envío.",
  },
];

const BEYOND_IOT = [
  {
    icon: Video,
    title: "Información de vídeo",
    text: "Además de telemetría y datos ambientales, los procesos también publican información sobre las grabaciones que realiza el dron — no solo lecturas de sensores sueltas.",
  },
  {
    icon: MapPin,
    title: "Localización de personas detectadas",
    text: "Cada detección de YOLO se acompaña de la posición del dron en ese instante, para poder situar aproximadamente dónde se ha visto a una persona sobre el terreno.",
  },
  {
    icon: Terminal,
    title: "Comandos hacia el propio dron",
    text: "El canal no es de una sola dirección: el dron también se suscribe a un canal de comandos, por el que puede recibir instrucciones de alto nivel — iniciar una misión, aterrizar, empezar o detener una grabación — sin depender de una conexión directa punto a punto.",
  },
];

const PROCESSES = [
  {
    icon: Thermometer,
    title: "sensor.py",
    text: "Lee el sensor ambiental (BME680) y publica temperatura, humedad y calidad del aire — pensado para detectar indicios como humo de un incendio incipiente o condiciones extremas.",
  },
  {
    icon: Server,
    title: "sistema.py",
    text: "Publica el estado de salud de la propia Raspberry Pi — CPU, memoria, temperatura, tiempo de actividad — para poder detectar en remoto si el equipo de a bordo empieza a fallar.",
  },
  {
    icon: SatelliteDish,
    title: "vuelo.py",
    text: "Publica la telemetría de vuelo obtenida vía MAVLink: posición, altitud, velocidad y estado de la misión.",
  },
  {
    icon: Camera,
    title: "deteccion.py",
    text: "Ejecuta YOLO sobre el vídeo en directo y publica cada detección de persona junto con la posición del dron en ese instante.",
  },
];

const FLOW_STEPS = [
  { id: "yolo", label: "YOLO detecta", detail: "Inferencia sobre el fotograma", icon: <Layers strokeWidth={1.75} /> },
  { id: "posicion", label: "Lee posición", detail: "Consulta interna a vuelo.py", icon: <FileClock strokeWidth={1.75} /> },
  {
    id: "buffer",
    label: "Guarda en buffer local",
    detail: "SQLite · fuente de verdad",
    icon: <Save strokeWidth={1.75} />,
    badge: "↻ reintenta si falla",
  },
  { id: "mqtt", label: "Publica MQTT", detail: "dronsar/{dron_id}/deteccion · QoS 1", icon: <Radio strokeWidth={1.75} /> },
  { id: "ack", label: "ACK del broker", detail: "Confirma la recepción (QoS 1)", icon: <ShieldCheck strokeWidth={1.75} /> },
  { id: "influx", label: "InfluxDB", detail: "Punto con dron_id como tag", icon: <Database strokeWidth={1.75} /> },
];

const FLOW_GROUPS: FlowGroup[] = [
  { label: "Raspberry Pi · a bordo del dron", icon: <Cpu strokeWidth={1.75} />, stepIds: ["yolo", "posicion", "buffer"] },
  { label: "AWS Cloud", icon: <Cloud strokeWidth={1.75} />, stepIds: ["mqtt", "ack", "influx"] },
];

const PROCESS_NODES: RadialNode[] = [
  {
    id: "sensor",
    label: "sensor.py",
    description: "Ambiental: temperatura, humedad, aire",
    icon: <Thermometer strokeWidth={1.75} />,
    colorVar: "var(--color-accent)",
  },
  {
    id: "sistema",
    label: "sistema.py",
    description: "Salud de la Raspberry Pi",
    icon: <Server strokeWidth={1.75} />,
    colorVar: "var(--color-mesh-violet)",
  },
  {
    id: "vuelo",
    label: "vuelo.py",
    description: "Telemetría de vuelo (MAVLink)",
    icon: <SatelliteDish strokeWidth={1.75} />,
    colorVar: "var(--color-mesh-cyan)",
  },
  {
    id: "deteccion",
    label: "deteccion.py",
    description: "Detecciones YOLO + vídeo",
    icon: <Camera strokeWidth={1.75} />,
    colorVar: "var(--color-mesh-coral)",
  },
];

const BRIDGE_STEPS = [
  { id: "proceso", label: "Proceso a bordo", detail: "sensor.py, vuelo.py…", icon: <Cpu strokeWidth={1.75} /> },
  { id: "broker-local", label: "Broker local", detail: "Mosquitto en la Raspberry Pi", icon: <Server strokeWidth={1.75} /> },
  { id: "broker-remoto", label: "Broker remoto", detail: "Mosquitto en AWS EC2", icon: <Radio strokeWidth={1.75} /> },
  { id: "influx", label: "InfluxDB", detail: "Vía mqtt_to_influx.py", icon: <Database strokeWidth={1.75} /> },
];

const BRIDGE_GROUPS: FlowGroup[] = [
  { label: "Raspberry Pi · a bordo del dron", icon: <Cpu strokeWidth={1.75} />, stepIds: ["proceso", "broker-local"] },
  { label: "AWS Cloud", icon: <Cloud strokeWidth={1.75} />, stepIds: ["broker-remoto", "influx"] },
];

export default function DatosPage() {
  return (
    <>
      <PageHero
        eyebrow="Arquitectura · Datos e IoT"
        breadcrumbs={[
          { label: "Inicio", href: "/" },
          { label: "Arquitectura técnica", href: "/arquitectura" },
          { label: "Datos e IoT" },
        ]}
        title="Sensores, brokers y MQTT: por qué el dron piensa como un sistema IoT"
        description="Software & Cloud explica qué corre a bordo — cuatro procesos Python, MQTT, InfluxDB. Esta página explica por qué está diseñado así: el objetivo de sensorizar el dron sin depender de que la red funcione siempre, y cómo hemos llevado esa idea más allá de un IoT tradicional."
        tone="accent"
        image={{ src: IMAGES.circuitMacro.src, alt: IMAGES.circuitMacro.alt }}
      />

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Un objetivo del proyecto"
            title="Sensorizar el dron sin depender de que la red funcione siempre"
            description="Uno de los objetivos de Guardian Eye era dotar al dron de sensores propios, capaces de transmitir información sobre su entorno y su propio estado — no solo volar y grabar. Pero un dron real, y más aún en un entorno rural con cobertura 4G intermitente, es de los peores sitios posibles para dar por sentado que una conexión va a funcionar."
          />

          <p className="mt-6 max-w-3xl text-[15px] leading-relaxed text-ink-muted">
            En{" "}
            <Link href="/arquitectura/comunicaciones" className="font-semibold text-accent underline underline-offset-2">
              Comunicaciones
            </Link>{" "}
            ya se explica el enlace múltiple redundante que construimos para que el dron
            siempre tenga una vía de vuelta a tierra. Pero una base de comunicaciones robusta
            no basta por sí sola: siendo conscientes de que hasta el mejor enlace puede fallar,
            quisimos reforzar también esta capa aplicando los conceptos clave de las
            comunicaciones IoT — un broker de mensajería, el protocolo MQTT, y un procedimiento
            de store-and-forward que evita perder datos cuando la red falla a mitad de camino.
          </p>

          <div className="mt-8">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4.5 w-4.5 text-accent" strokeWidth={1.75} />
              <p className="font-telemetry text-[10.5px] uppercase text-ink-faint">
                Glosario rápido
              </p>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              {GLOSSARY.map((g) => (
                <div key={g.term} className="rounded-2xl border border-line bg-surface p-5">
                  <p className="font-telemetry text-[12px] font-bold text-ink">{g.term}</p>
                  <p className="mt-2 text-[12.5px] leading-relaxed text-ink-muted">{g.def}</p>
                </div>
              ))}
            </div>
            <p className="mt-3 text-[12.5px] leading-relaxed text-ink-faint">
              Detalle completo del broker (Mosquitto), la jerarquía de topics y el resto de la
              pila cloud en{" "}
              <Link href="/arquitectura/software" className="font-semibold text-accent underline underline-offset-2">
                Software & Cloud
              </Link>
              .
            </p>
          </div>

          <div className="mt-16">
            <SectionHeading
              eyebrow="Más allá de un IoT tradicional"
              title="No solo sensores hacia un panel"
              description="En un proyecto IoT típico, el broker existe solo para mover lecturas de sensores hacia una base de datos que después se consulta en un panel: sensores → MQTT → InfluxDB → Grafana. Guardian Eye parte de esa misma base, pero la hemos llevado más allá."
            />
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {BEYOND_IOT.map((item) => {
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
          </div>

          <div className="mt-16">
            <SectionHeading
              eyebrow="Los procesos que lo hacen posible"
              title="Cuatro procesos independientes, un mismo broker"
              description="Antes de entrar en el detalle del pipeline de detección (más abajo, el más completo de los cuatro), así es como los cuatro procesos conviven alrededor del mismo broker: cada uno publica en su propio dominio, de forma independiente del resto."
            />
            <div className="mt-10">
              <RadialDiagram
                centerLabel="Broker MQTT"
                centerSublabel="Mosquitto · AWS"
                centerIcon={<Cloud strokeWidth={1.75} />}
                nodes={PROCESS_NODES}
              />
            </div>
            <p className="mx-auto mt-6 max-w-2xl text-center text-[13px] leading-relaxed text-ink-faint">
              Los cuatro publican de forma independiente al mismo broker; desde ahí, un puente
              (<code className="font-telemetry text-[11.5px]">mqtt_to_influx.py</code>) los
              inserta en InfluxDB — detalle completo en{" "}
              <Link href="/arquitectura/software" className="font-semibold text-accent underline underline-offset-2">
                Software & Cloud
              </Link>
              .
            </p>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {PROCESSES.map((item) => {
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
            <p className="mt-6 max-w-3xl text-[13.5px] leading-relaxed text-ink-muted">
              Los cuatro procesos son independientes entre sí — cada uno con su propio ciclo, y
              si uno falla, los demás ni se enteran. La única excepción es detección, que
              necesita saber en qué posición estaba el dron en el instante exacto de cada
              detección: esa coordinación ocurre dentro de la propia Raspberry Pi, entre
              procesos que conviven en el mismo equipo, sin pasar por la red ni por el broker.
            </p>

            <div className="mt-6 flex items-start gap-3 rounded-2xl border border-line bg-paper p-5">
              <Inbox className="mt-0.5 h-5 w-5 shrink-0 text-accent" strokeWidth={1.75} />
              <p className="text-[13px] leading-relaxed text-ink-muted">
                No todos son solo emisores: tres de los cuatro (
                <code className="font-telemetry text-[11.5px]">sensor.py</code>,{" "}
                <code className="font-telemetry text-[11.5px]">sistema.py</code>,{" "}
                <code className="font-telemetry text-[11.5px]">deteccion.py</code>) también se
                suscriben a su propio topic de configuración, para cambiar su comportamiento
                en caliente desde el panel de control — el intervalo del sensor ambiental, el
                throttling del vídeo, empezar o parar una grabación, o apagar la propia
                Raspberry Pi (lo gestiona <code className="font-telemetry text-[11.5px]">sistema.py</code>,
                no un proceso aparte). Solo <code className="font-telemetry text-[11.5px]">vuelo.py</code> es
                puramente emisor.
              </p>
            </div>

            <div className="mt-4 flex items-start gap-3 rounded-2xl border border-line bg-paper p-5">
              <Inbox className="mt-0.5 h-5 w-5 shrink-0 text-accent" strokeWidth={1.75} />
              <p className="text-[13px] leading-relaxed text-ink-muted">
                Los comandos de navegación del dron —armar, desarmar, iniciar una misión,
                volver a casa— van por un canal aparte, hacia un quinto proceso dedicado:{" "}
                <code className="font-telemetry text-[11.5px]">receptor.py</code> se suscribe
                al topic de comandos de su dron y los traduce en órdenes MAVLink para el
                autopiloto, sin pasar por ninguno de los cuatro procesos anteriores. De dónde
                vienen esos comandos (el panel de control, una PWA) está explicado en detalle
                en{" "}
                <Link href="/arquitectura/software" className="font-semibold text-accent underline underline-offset-2">
                  Software & Cloud
                </Link>
                .
              </p>
            </div>
          </div>

          <div className="mt-16">
            <SectionHeading
              eyebrow="De la cámara a la nube"
              title="El camino completo de una detección"
              description="De los cuatro procesos de arriba, este es el más completo — y el que mejor ilustra el store-and-forward en la práctica. La secuencia que atraviesan los dos lados del sistema, edge y servidor, cada vez que YOLO localiza a una persona."
            />
            <div className="mt-10">
              <FlowDiagram
                steps={FLOW_STEPS}
                groups={FLOW_GROUPS}
                connectorNotes={{ buffer: "Internet / 4G" }}
              />
            </div>
            <p className="mt-6 max-w-3xl text-[13.5px] leading-relaxed text-ink-muted">
              La detección se escribe primero en el buffer local (paso «Guarda en buffer
              local» arriba) — ese es el store-and-forward en la práctica. El broker en AWS
              solo confirma que ha recibido el mensaje; quien decide que ya está a salvo y
              marca el registro como enviado en su propio buffer es la Raspberry Pi, no el
              servidor. Si la red se corta en cualquier punto de la cadena — antes o después
              de esa confirmación —, el registro sigue en el buffer local y se reintenta al
              recuperar la conexión: la detección nunca se pierde, aunque llegue tarde.
            </p>
          </div>

          <div className="mt-16 grid gap-4 sm:grid-cols-2">
            <div className="flex gap-3 rounded-2xl border border-signal/30 bg-signal-soft p-6">
              <ShieldCheck className="h-5 w-5 shrink-0 text-signal-ink" strokeWidth={1.75} />
              <div>
                <p className="text-[14px] font-bold text-ink">Solo píxeles, no geolocalización</p>
                <p className="mt-2 text-[13px] leading-relaxed text-ink-muted">
                  YOLO no entrega coordenadas geográficas: la alerta lleva la posición del dron más
                  la caja en píxeles del fotograma. Estimar la posición real de la persona en el
                  terreno exigiría georreferenciación (fusionar píxeles, altitud y actitud), que
                  queda como línea futura — con la resolución de trabajo actual, ese cálculo
                  tendría un margen de varios metros. Ver también las limitaciones descritas en{" "}
                  <Link href="/ia" className="font-semibold underline underline-offset-2">
                    Inteligencia Artificial
                  </Link>
                  .
                </p>
              </div>
            </div>
            <div className="flex gap-3 rounded-2xl border border-line bg-surface p-6">
              <TestTube2 className="h-5 w-5 shrink-0 text-accent" strokeWidth={1.75} />
              <div>
                <p className="text-[14px] font-bold text-ink">Validable sin hardware</p>
                <p className="mt-2 text-[13px] leading-relaxed text-ink-muted">
                  El flujo de detección se prueba con un vídeo real en CPU y una posición simulada;
                  el colector de vuelo, contra el simulador SITL. El desarrollo avanza en paralelo a
                  la compra y el montaje del hardware, siguiendo la misma filosofía de validación
                  por etapas que{" "}
                  <Link href="/proyecto/metodologia" className="font-semibold underline underline-offset-2">
                    Metodología
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16">
            <SectionHeading
              eyebrow="Cómo lo hemos reforzado técnicamente"
              title="Tres principios que sostienen esta arquitectura"
              description="Toda la arquitectura de datos de Guardian Eye se apoya en tres ideas. No son teoría: cada una responde a un problema real de operar un dron en el campo, con red intermitente."
            />
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {PRINCIPLES.map((p) => {
                const Icon = p.icon;
                return (
                  <div key={p.title} className="rounded-2xl border border-line bg-surface p-6">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent">
                      <Icon className="h-5 w-5" strokeWidth={1.75} />
                    </span>
                    <p className="mt-4 text-[14.5px] font-bold text-ink">{p.title}</p>
                    <p className="mt-2 text-[13px] leading-relaxed text-ink-muted">{p.text}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-16">
            <SectionHeading
              eyebrow="MQTT, bridges y nuestro store-and-forward"
              title="MQTT bridge: la solución lógica — y por qué construimos la nuestra"
              description="MQTT, con su paradigma de publicación/suscripción, encaja perfectamente en un sistema donde las comunicaciones pueden fallar. Cuando además hace falta persistir los datos y reintentar el envío al recuperar la conexión, la respuesta más lógica a priori es un MQTT bridge: dos brokers, uno a bordo del dron y otro en la nube, unidos por un puente que trae esa persistencia y esos reintentos de fábrica."
            />
            <p className="mt-6 max-w-3xl text-[14.5px] leading-relaxed text-ink-muted">
              En esta arquitectura, los procesos publicarían contra un broker que corre en la
              propia Raspberry Pi, no contra uno remoto. Ese broker local mantendría la
              conexión con el broker de AWS mediante una configuración de bridge — una función
              nativa de Mosquitto — que reenvía los topics indicados en cuanto hay red, y se
              encarga él mismo de reconectar si la conexión se cae.
            </p>
            <div className="mt-10">
              <FlowDiagram
                steps={BRIDGE_STEPS}
                groups={BRIDGE_GROUPS}
                connectorNotes={{ "broker-local": "Bridge MQTT" }}
              />
            </div>

            <div className="mt-10 flex items-start gap-3 rounded-2xl border border-accent/30 bg-accent-soft p-6">
              <ArrowLeftRight className="mt-0.5 h-5 w-5 shrink-0 text-accent" strokeWidth={1.75} />
              <div className="space-y-3 text-[13.5px] leading-relaxed text-ink">
                <p>
                  Sin embargo, en Guardian Eye hemos preferido construir nuestra propia versión
                  de esa persistencia y esos reintentos, en vez de apoyarnos en la función de
                  bridge nativa de Mosquitto: cada proceso guarda sus propios datos en un
                  buffer local (SQLite) y los reenvía él mismo en cuanto el broker confirma la
                  recepción — el store-and-forward que ya se explica en el diagrama de más
                  arriba (guardar → publicar por MQTT → marcar como enviado solo si hay
                  confirmación), hecho a medida en Python en cada proceso, en lugar de
                  delegarlo en la configuración de un bridge.
                </p>
                <p>
                  La ventaja se nota sobre todo pensando en escalar: si en vez de un único dron
                  llegamos a gestionar un escuadrón de varios, esta arquitectura sigue siendo
                  mucho más sencilla de administrar — un solo broker central en AWS, en vez de
                  un broker adicional por cada dron. Y tenemos más control sobre los datos de
                  cada uno: podemos consultar directamente el SQLite local de cualquier dron
                  para comprobar exactamente qué ha enviado y qué no, en vez de depender del
                  estado interno de un bridge al que no tendríamos ese mismo acceso directo.
                </p>
              </div>
            </div>
          </div>

          <SubpageNav
            hub={{ label: "Volver a Arquitectura", href: "/arquitectura" }}
            prev={{ label: "Vídeo", href: "/arquitectura/video" }}
            next={{ label: "Software & Cloud", href: "/arquitectura/software" }}
          />
        </div>
      </section>
    </>
  );
}
