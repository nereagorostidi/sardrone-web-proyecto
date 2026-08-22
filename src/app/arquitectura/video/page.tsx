import type { Metadata } from "next";
import Link from "next/link";
import {
  BookOpen,
  Camera,
  Cloud,
  Cpu,
  Eye,
  Gauge,
  HardDrive,
  Radio,
  Server,
  Signal,
  Smartphone,
  Timer,
  Users,
} from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { FlowDiagram, type FlowGroup } from "@/components/diagrams/flow-diagram";
import { PageHero } from "@/components/page-hero";
import { SubpageNav } from "@/components/subpage-nav";
import { IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: "Vídeo",
  description:
    "Analógico o digital, qué es un VTX, por qué elegimos vídeo digital, y cómo lo transmitimos desde la cámara hasta cualquier pantalla que quiera verlo.",
};

const GLOSSARY = [
  {
    term: "VTX",
    def: "Video Transmitter: el módulo de radio que monta un dron para enviar vídeo analógico en directo a un receptor en tierra (unas gafas o una pantalla FPV). No pasa por WiFi, 4G ni ningún protocolo de red — es una señal de radiofrecuencia pura, tan simple como sintonizar un canal.",
  },
];

const TRANSMISSION_TYPES = [
  {
    icon: Signal,
    title: "Vídeo digital (TCP/IP)",
    text: "La imagen se captura digitalmente, se comprime en un formato de vídeo (H.264 y similares) y se envía como paquetes de datos por WiFi, 4G/5G o cualquier red IP — el mismo tráfico que una videollamada o un vídeo de Internet.",
  },
  {
    icon: Radio,
    title: "VTX analógico",
    text: "La señal de la cámara se envía tal cual, como una onda analógica de radiofrecuencia, directamente desde un transmisor de a bordo a un receptor en tierra — sin digitalización, compresión ni red de datos de por medio.",
  },
];

const LATENCY_STEPS = [
  { id: "capturar", label: "Capturar", detail: "Cada fotograma", icon: <Camera strokeWidth={1.75} /> },
  { id: "comprimir", label: "Comprimir", detail: "H.264 y empaquetar", icon: <Gauge strokeWidth={1.75} /> },
  { id: "red", label: "Enviar por red", detail: "WiFi / 4G, con su propia latencia", icon: <Signal strokeWidth={1.75} /> },
  { id: "recibir", label: "Recibir y descomprimir", detail: "+ buffer anti-cortes", icon: <Timer strokeWidth={1.75} /> },
];

const STREAM_STEPS = [
  { id: "camara", label: "Cámara", detail: "Fotograma anotado por YOLO", icon: <Camera strokeWidth={1.75} /> },
  { id: "pi", label: "Raspberry Pi", detail: "Graba local + codifica (ffmpeg)", icon: <Cpu strokeWidth={1.75} /> },
  { id: "mediamtx", label: "MediaMTX", detail: "640×360 · 12 fps · ~400 kbps", icon: <Server strokeWidth={1.75} /> },
  { id: "visores", label: "Visores", detail: "Cuantos se conecten", icon: <Users strokeWidth={1.75} /> },
];

const STREAM_GROUPS: FlowGroup[] = [
  { label: "Raspberry Pi · a bordo del dron", icon: <Cpu strokeWidth={1.75} />, stepIds: ["camara", "pi"] },
  { label: "AWS Cloud", icon: <Cloud strokeWidth={1.75} />, stepIds: ["mediamtx", "visores"] },
];

export default function VideoPage() {
  return (
    <>
      <PageHero
        eyebrow="Arquitectura · Vídeo"
        breadcrumbs={[
          { label: "Inicio", href: "/" },
          { label: "Arquitectura técnica", href: "/arquitectura" },
          { label: "Vídeo" },
        ]}
        title="Analógico o digital: cómo sacamos el vídeo del dron"
        description="Sacar la imagen de un dron hacia el exterior se puede hacer de dos formas radicalmente distintas, con implicaciones directas en el retardo con el que llega esa imagen. Aquí explicamos por qué elegimos vídeo digital, y cómo lo llevamos desde la cámara hasta cualquier pantalla que quiera verlo."
        tone="accent"
        image={{ src: IMAGES.droneControllerLiveFeed.src, alt: IMAGES.droneControllerLiveFeed.alt }}
      />

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Dos formas de transmitir vídeo"
            title="Vídeo digital o VTX analógico"
            description="A la hora de sacar la imagen de un dron hacia el exterior existen, en esencia, dos familias de transmisión completamente distintas — y la elección entre una y otra no es una cuestión de preferencia técnica menor: tiene un impacto directo en el retardo (latencia) entre lo que ve la cámara y lo que ve quien lo supervisa."
          />

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {TRANSMISSION_TYPES.map((item) => {
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
          </div>

          <div className="mt-16">
            <SectionHeading
              eyebrow="Por qué el retardo es tan distinto"
              title="Sin apenas etapas, frente a una cadena de procesamiento"
              description="La transmisión analógica no necesita ningún procesamiento intermedio: la señal eléctrica que sale de la cámara viaja, se modula en radiofrecuencia y se demodula al otro lado prácticamente a la velocidad de la luz. La digital, en cambio, atraviesa varias etapas — y cada una añade algo de retardo."
            />
            <div className="mt-10">
              <FlowDiagram steps={LATENCY_STEPS} />
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-line bg-surface p-6">
                <p className="text-[14px] font-bold text-ink">VTX analógico</p>
                <p className="mt-2 text-[13px] leading-relaxed text-ink-muted">
                  Del orden de <span className="font-semibold text-ink">1 a 5 milisegundos</span> de
                  extremo a extremo — casi ninguna etapa que atravesar.
                </p>
              </div>
              <div className="rounded-2xl border border-line bg-surface p-6">
                <p className="text-[14px] font-bold text-ink">Vídeo digital</p>
                <p className="mt-2 text-[13px] leading-relaxed text-ink-muted">
                  Fácilmente <span className="font-semibold text-ink">varios cientos de
                  milisegundos, o incluso segundos</span> si la red va cargada.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16 flex items-start gap-3 rounded-2xl border border-accent/30 bg-accent-soft p-6">
            <Eye className="mt-0.5 h-5 w-5 shrink-0 text-accent" strokeWidth={1.75} />
            <div>
              <p className="text-[14px] font-bold text-ink">La analogía del fútbol: TDT frente a streaming</p>
              <p className="mt-2 text-[13.5px] leading-relaxed text-ink">
                Es el mismo fenómeno que mucha gente ha vivido viendo un partido: la señal de
                TDT tradicional —una emisión de radiofrecuencia, conceptualmente parecida a la
                vía analógica— suele llegar antes que la misma señal servida por una
                plataforma de streaming por Internet, que necesita codificar, empaquetar y
                enviar el vídeo por una red de datos. Durante los últimos Mundiales de fútbol
                no ha sido raro que un vecino grite el gol varios segundos antes que otro que
                lo ve por una plataforma distinta — diferencias de 3 a incluso 10 segundos,
                según cuántas etapas de procesamiento atraviese la señal en cada caso. Es
                exactamente el mismo principio que se aplica al vídeo de un dron.
              </p>
            </div>
          </div>

          <div className="mt-16">
            <SectionHeading
              eyebrow="Por qué el FPV racing usa VTX analógico"
              title="Cuando cada milisegundo importa"
              description="En el vuelo FPV de carreras, el piloto controla el dron exclusivamente a través de lo que ve en las gafas, a velocidades donde una reacción tardía de solo unos cientos de milisegundos puede significar chocar contra un obstáculo. Por eso ese mundo sigue apostando por VTX analógico: no porque la imagen sea de mejor calidad (de hecho es peor, con más ruido y menos resolución), sino porque el retardo es prácticamente nulo. Para pilotar en tiempo real a alta velocidad, esa diferencia de latencia importa mucho más que la calidad de imagen."
            />
          </div>

          <div className="mt-16">
            <SectionHeading
              eyebrow="Nuestro caso"
              title="Edge computing e IA, no pilotaje FPV"
              description="Nuestro planteamiento es estructuralmente distinto al de un dron de carreras, y por eso la solución técnica también lo es."
            />
            <p className="mt-6 max-w-3xl text-[14.5px] leading-relaxed text-ink-muted">
              La cámara no va conectada directamente a un transmisor VTX para que un piloto la
              vea en gafas en tiempo real: va conectada a la Raspberry Pi, que procesa la
              imagen a bordo (edge computing) con el acelerador Hailo-8L para detectar personas
              — en el propio dron, sin depender de ningún enlace externo para tomar esa
              decisión. Esto cambia por completo el problema: el vídeo que enviamos a tierra no
              es la señal de la que depende el control del dron en tiempo real —eso va por el
              enlace de telemetría independiente, ver{" "}
              <Link href="/arquitectura/comunicaciones" className="font-semibold text-accent underline underline-offset-2">
                Comunicaciones
              </Link>
              —, sino una copia para supervisión humana, que sí puede permitirse el retardo de
              una vía digital.
            </p>
            <div className="mt-6 flex items-start gap-3 rounded-2xl border border-line bg-paper p-6">
              <Camera className="mt-0.5 h-5 w-5 shrink-0 text-accent" strokeWidth={1.75} />
              <p className="text-[13.5px] leading-relaxed text-ink-muted">
                Barajamos montar además una cámara analógica con su propio VTX, pero finalmente
                hemos optado por una única cámara digital conectada a la Raspberry Pi: nuestro
                objetivo es la detección automática a bordo, no el pilotaje manual en tiempo
                real, así que no hemos necesitado esa complejidad adicional. La puerta queda
                abierta a instalar un VTX en el futuro si algún día hiciera falta vídeo de
                latencia mínima además del procesado por IA — por ejemplo, con una segunda
                cámara analógica independiente.
              </p>
            </div>
          </div>

          <div className="mt-16">
            <SectionHeading
              eyebrow="Cómo transmitimos en la práctica"
              title="Grabación local a máxima calidad, streaming reducido"
              description="La Raspberry Pi hace dos cosas con cada fotograma detectado: lo graba en el propio dron a su resolución original, sin ninguna reducción de calidad, y en paralelo empuja una copia a un servidor de streaming en la nube."
            />
            <p className="mt-6 max-w-3xl text-[14.5px] leading-relaxed text-ink-muted">
              Esa copia en directo viaja reducida a{" "}
              <span className="font-semibold text-ink">640×360, a 12 fotogramas por segundo y
              unos 400 kbps</span> — pensada para caber cómodamente en un enlace 4G limitado, no
              para verse con calidad de estudio. El servidor es{" "}
              <span className="font-semibold text-ink">MediaMTX</span>, sobre la misma
              infraestructura de AWS que el resto del stack. Si el streaming se cae, la
              detección y la grabación local siguen exactamente igual: está diseñado como un
              extra, nunca como una dependencia.
            </p>
            <div className="mt-10">
              <FlowDiagram steps={STREAM_STEPS} groups={STREAM_GROUPS} connectorNotes={{ pi: "Internet / 4G" }} />
            </div>
          </div>

          <div className="mt-16">
            <SectionHeading
              eyebrow="Por qué un servidor de streaming, no el dron directamente"
              title="Una sola copia, cuantos espectadores hagan falta"
              description="Conectarse directamente a la Raspberry del dron exigiría conocer su dirección IP en cada momento — nada trivial cuando el dron sale a Internet por una tarjeta 4G sin IP fija, detrás del NAT del operador."
            />
            <p className="mt-6 max-w-3xl text-[14.5px] leading-relaxed text-ink-muted">
              Y aunque se resolviera con una red privada como Tailscale (ver{" "}
              <Link href="/arquitectura/comunicaciones" className="font-semibold text-accent underline underline-offset-2">
                Comunicaciones
              </Link>
              ), si varias personas se conectaran a la vez directamente a la Raspberry, sería
              ella —con su CPU y su enlace 4G limitados— quien tendría que generar una copia
              del streaming por cada espectador, arriesgando saturar tanto el vídeo como la
              propia detección de IA a bordo. Un servidor de streaming en la nube resuelve
              ambos problemas: la Raspberry solo empuja una única copia hacia MediaMTX, y es el
              servidor —con recursos de sobra— quien reparte el vídeo a cuantos espectadores se
              conecten, sin que eso afecte en absoluto al dron.
            </p>
          </div>

          <div className="mt-16 flex items-start gap-3 rounded-2xl border border-line bg-surface p-6">
            <Smartphone className="mt-0.5 h-5 w-5 shrink-0 text-accent" strokeWidth={1.75} />
            <p className="text-[13.5px] leading-relaxed text-ink">
              <span className="font-semibold text-ink">El visor vive en la propia PWA:</span>{" "}
              ese vídeo en directo no hace falta verlo en una herramienta aparte. El panel de
              control —la PWA que se explica en{" "}
              <Link href="/arquitectura/software" className="font-semibold text-accent underline underline-offset-2">
                Software & Cloud
              </Link>
              — tiene el visor integrado en su grupo «Cámara», junto con los botones para
              empezar y detener la grabación: la misma acción que arranca o para la detección
              en la Raspberry Pi.
            </p>
          </div>

          <div className="mt-6 flex items-start gap-3 rounded-2xl border border-line bg-surface p-6">
            <HardDrive className="mt-0.5 h-5 w-5 shrink-0 text-accent" strokeWidth={1.75} />
            <p className="text-[13.5px] leading-relaxed text-ink">
              <span className="font-semibold text-ink">Cada captura deja rastro:</span> el
              vídeo en directo, a menor calidad, es una comodidad para la supervisión humana —
              nunca una dependencia crítica, porque la detección y el registro completo ya han
              ocurrido a bordo antes de que un solo fotograma salga del dron. Cada vez que YOLO
              detecta a una persona, la foto de ese fotograma se guarda siempre en el propio
              dron a máxima calidad, y junto con la alerta se envía por MQTT el nombre de ese
              fichero —no la imagen en sí, solo la referencia—, un dato ligero que cabe
              cómodamente en un enlace pobre. Esa alerta, con la posición del dron y la caja de
              la detección, sigue el mismo camino ya descrito en{" "}
              <Link href="/arquitectura/datos" className="font-semibold text-accent underline underline-offset-2">
                Datos e IoT
              </Link>
              : se guarda primero en un buffer local (store-and-forward) y acaba en InfluxDB,
              donde puede consultarse a posteriori.
            </p>
          </div>

          <SubpageNav
            hub={{ label: "Volver a Arquitectura", href: "/arquitectura" }}
            prev={{ label: "Comunicaciones", href: "/arquitectura/comunicaciones" }}
            next={{ label: "Datos e IoT", href: "/arquitectura/datos" }}
          />
        </div>
      </section>
    </>
  );
}
