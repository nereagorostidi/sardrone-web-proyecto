import type { Metadata } from "next";
import Link from "next/link";
import {
  Camera,
  CheckCircle2,
  Code2,
  Cpu,
  Eye,
  History,
  MapPinOff,
  ScanSearch,
  Sparkles,
  Tag,
  Timer,
  Zap,
} from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { FlowDiagram } from "@/components/diagrams/flow-diagram";
import { PageHero } from "@/components/page-hero";
import { IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: "Inteligencia Artificial",
  description:
    "Cómo funciona la detección con YOLO a bordo de Guardian Eye, el estado real del pipeline de entrenamiento y sus limitaciones honestas.",
};

const PIPELINE_STEPS = [
  { id: "recogida", label: "Recogida", detail: "Vídeo aéreo real en el club", icon: <Camera strokeWidth={1.75} /> },
  { id: "etiquetado", label: "Etiquetado", detail: "Vía Roboflow", icon: <Tag strokeWidth={1.75} /> },
  { id: "entrenamiento", label: "Entrenamiento", detail: "YOLOv8 / Ultralytics", icon: <Sparkles strokeWidth={1.75} /> },
  { id: "validacion", label: "Validación", detail: "Sobre vídeo grabado", icon: <CheckCircle2 strokeWidth={1.75} /> },
  { id: "despliegue", label: "Despliegue", detail: "Inferencia en el borde (Hailo-8L)", icon: <Cpu strokeWidth={1.75} /> },
];

export default function IaPage() {
  return (
    <>
      <PageHero
        eyebrow="Sec. 03 · Inteligencia Artificial"
        title="Detección en tiempo real con YOLO"
        description="You Only Look Once: un modelo que mira cada fotograma una sola vez y decide, al instante, qué hay en él — sin depender de subir cada imagen a la nube para saberlo."
        image={{
          src: IMAGES.yoloDetectionFrame.src,
          alt: IMAGES.yoloDetectionFrame.alt,
          objectPosition: "70% 40%",
        }}
      />

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="max-w-3xl text-[15.5px] leading-relaxed text-ink-muted">
            Para la parte de inteligencia artificial del dron se ha usado{" "}
            <span className="font-medium text-ink">YOLOv8</span>, programando y
            entrenando el sistema directamente en la{" "}
            <span className="font-medium text-ink">Raspberry Pi 5</span> que acompaña
            al dron a bordo.
          </p>

          <div className="mt-10 grid gap-12 lg:grid-cols-2">
            <SectionHeading
              eyebrow="¿Qué es YOLO?"
              title="Una sola pasada, una decisión inmediata"
              description="YOLO analiza la imagen completa de una vez, en lugar de examinarla región por región, lo que lo hace lo bastante rápido para procesar vídeo en directo. Es la razón por la que se puede ejecutar a bordo del propio dron, en la Raspberry Pi 5 con el acelerador Hailo-8L, sin depender de una conexión estable a Internet para saber si hay una persona en el encuadre."
            />
            <div className="rounded-3xl border border-line bg-surface p-7">
              <div className="flex items-center gap-2">
                <Zap className="h-4.5 w-4.5 text-accent" strokeWidth={1.75} />
                <p className="font-telemetry text-[10.5px] uppercase text-ink-faint">
                  Por qué en el borde, no en la nube
                </p>
              </div>
              <p className="mt-3 text-[14px] leading-relaxed text-ink-muted">
                Subir vídeo en directo por un enlace 4G en zonas de montaña es lento y poco
                fiable. Procesando la detección directamente en la Raspberry Pi, el dron
                puede avisar de una posible detección aunque el enlace a la nube esté
                degradado o caído — coherente con la filosofía &ldquo;edge-first&rdquo; del
                resto del sistema. A esto se le llama <span className="font-medium text-ink">edge computing</span>:
                procesar los datos cerca de donde se generan, en lugar de enviarlos primero
                a un servidor remoto.
              </p>
            </div>
          </div>

          <div className="mt-16 grid gap-4 sm:grid-cols-2">
            <div className="flex gap-4 rounded-2xl border border-line bg-paper p-6">
              <History className="h-5 w-5 shrink-0 text-ink-faint" strokeWidth={1.75} />
              <div>
                <p className="text-[13.5px] font-bold text-ink">De dónde viene YOLO</p>
                <p className="mt-1.5 text-[13px] leading-relaxed text-ink-muted">
                  YOLO (&ldquo;You Only Look Once&rdquo;) es una familia de modelos de
                  detección de objetos en tiempo real, hoy mantenida por Ultralytics.
                  Guardian Eye usa <span className="font-medium text-ink">YOLOv8</span>, una
                  de sus versiones más recientes, elegida por su equilibrio entre precisión
                  y velocidad de inferencia en hardware modesto como una Raspberry Pi.
                </p>
              </div>
            </div>
            <div className="flex gap-4 rounded-2xl border border-line bg-paper p-6">
              <ScanSearch className="h-5 w-5 shrink-0 text-ink-faint" strokeWidth={1.75} />
              <div>
                <p className="text-[13.5px] font-bold text-ink">Qué es una &ldquo;caja delimitadora&rdquo;</p>
                <p className="mt-1.5 text-[13px] leading-relaxed text-ink-muted">
                  Cada detección se representa como una <span className="font-medium text-ink">bounding box</span>:
                  un rectángulo definido por su centro, ancho y alto en píxeles, junto con
                  un valor de confianza entre 0 y 1 que indica cuánto &ldquo;cree&rdquo; el
                  modelo que ese rectángulo contiene realmente una persona.
                </p>
                <p className="mt-2.5 text-[13px] leading-relaxed text-ink-muted">
                  YOLO y{" "}
                  <span className="font-medium text-ink">OpenCV</span> cumplen papeles
                  distintos y complementarios: YOLO se encarga de la inferencia y el
                  análisis del fotograma —decidir qué hay y dónde—, mientras que OpenCV
                  se usa para manipular la imagen en sí: leer el flujo de vídeo, recortar
                  o redimensionar cada fotograma y dibujar la propia bounding box sobre él.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-20">
            <SectionHeading
              eyebrow="Estado real del proyecto"
              title="Un pipeline validado, un modelo en construcción"
              align="center"
              className="mx-auto"
            />
            <div className="mt-10">
              <FlowDiagram steps={PIPELINE_STEPS} />
            </div>

            <div className="mt-10 grid gap-4 lg:grid-cols-2">
              <div className="rounded-2xl border border-accent/30 bg-accent-soft p-6">
                <p className="text-[13.5px] font-bold text-ink">Prueba de concepto ya validada</p>
                <p className="mt-2 text-[13.5px] leading-relaxed text-ink-muted">
                  El primer pipeline YOLOv8 completo se construyó y validó con Roboflow
                  sobre un dataset pequeño de detección de fruta (~300 imágenes
                  aumentadas), entrenado en 2 h 40 min en CPU, con inferencia comprobada
                  sobre vídeo real de vuelo. Código en{" "}
                  <a
                    href="https://github.com/nereagorostidi/yolo-pipeline-test"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 font-semibold text-accent underline underline-offset-2"
                  >
                    <Code2 className="h-3.5 w-3.5" /> yolo-pipeline-test
                  </a>
                  .
                </p>
              </div>
              <div className="rounded-2xl border border-signal/30 bg-signal-soft p-6">
                <p className="text-[13.5px] font-bold text-ink">Dataset de personas en constante evolución y progreso</p>
                <p className="mt-2 text-[13.5px] leading-relaxed text-ink-muted">
                  Se dispone de una base inicial de decenas de imágenes de personas
                  extraídas de vuelos reales en el Club Alas de Galapagar, combinada en Roboflow con
                  datasets SAR ya disponibles públicamente, seleccionando los más
                  adecuados para el tipo de escenario del proyecto. El conjunto está en
                  ampliación constante y se aumenta (data augmentation) para mejorar su
                  calidad y variedad antes de cada nuevo entrenamiento.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-20 grid gap-8 rounded-3xl border border-line bg-ink p-8 sm:p-10 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div>
              <p className="font-telemetry text-[10.5px] uppercase text-white/60">
                Formato del mensaje de detección
              </p>
              <h3 className="mt-2 text-[20px] font-extrabold leading-tight text-white">
                Lo que YOLO reporta — y lo que no
              </h3>
              <div className="mt-4 flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
                <MapPinOff className="mt-0.5 h-4.5 w-4.5 shrink-0 text-white/70" strokeWidth={1.75} />
                <p className="text-[13px] leading-relaxed text-white/75">
                  YOLO no entrega coordenadas geográficas de la persona, sino su posición en
                  píxeles dentro de la imagen. El sistema registra la posición del dron en
                  el instante de la detección, no la localización exacta de la víctima —eso
                  requeriría georreferenciación, una línea de trabajo futura. Tampoco hay
                  seguimiento individual entre fotogramas: solo un margen anti-spam (por
                  defecto, 5 s) para no repetir la misma alerta.
                </p>
              </div>
            </div>
            <pre className="overflow-x-auto rounded-2xl border border-white/10 bg-black/40 p-5 font-telemetry text-[12px] leading-relaxed text-white/85">
{`{
  "confianza": 0.0-1.0,
  "caja": { "centro_x": px, "centro_y": px,
            "ancho": px, "alto": px },
  "resolucion_frame": "WxH",
  "posicion_dron": { "lat": ..., "lon": ... },
  "foto_guardada": "deteccion_XXXX.jpg",
  "timestamp": "AAAA-MM-DDTHH:MM:SSZ"
}`}
            </pre>
          </div>

          <div className="mt-14 flex flex-col items-start justify-between gap-6 rounded-2xl border border-line bg-surface p-7 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <Eye className="h-5 w-5 text-accent" strokeWidth={1.75} />
              <p className="text-[14.5px] font-medium text-ink">
                Ver las detecciones en acción sobre vídeo real de vuelo.
              </p>
            </div>
            <Link
              href="/multimedia"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-ink px-5 py-3 text-[13.5px] font-semibold text-white transition-transform hover:-translate-y-0.5"
            >
              Ir a Multimedia
            </Link>
          </div>
          <p className="mt-3 flex items-center gap-1.5 text-[11.5px] text-ink-faint">
            <Timer className="h-3.5 w-3.5" /> Última actualización de estado: journal público
            del proyecto, agosto de 2026.
          </p>
        </div>
      </section>
    </>
  );
}
