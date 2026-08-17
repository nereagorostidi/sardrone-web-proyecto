import type { Metadata } from "next";
import {
  Bot,
  Briefcase,
  Footprints,
  GitBranch,
  GraduationCap,
  HeartHandshake,
  HeartPulse,
  Building2,
  Handshake,
  Infinity as InfinityIcon,
  MapPin,
  Megaphone,
  Package,
  Siren,
  Thermometer,
} from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { RadialDiagram } from "@/components/diagrams/radial-diagram";
import { PageHero } from "@/components/page-hero";
import { IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: "Impacto y futuro",
  description:
    "El retorno social de Guardian Eye: código abierto, donación del hardware y una guía para futuros estudiantes de ingeniería.",
};

const IMPACT_NODES = [
  {
    id: "conocimiento",
    label: "Conocimiento abierto",
    description: "Todo el código, esquemas y manual de configuración en GitHub",
    icon: <GitBranch strokeWidth={1.75} />,
    colorVar: "var(--color-accent)",
  },
  {
    id: "fisico",
    label: "Uso físico",
    description: "Donación del dron para docencia o voluntariado local",
    icon: <HeartHandshake strokeWidth={1.75} />,
    colorVar: "var(--color-signal)",
  },
  {
    id: "guia",
    label: "Guía para estudiantes",
    description: "Un blueprint para futuros ingenieros de drones conectados",
    icon: <GraduationCap strokeWidth={1.75} />,
    colorVar: "var(--color-mesh-violet)",
  },
];

const ODS = [
  {
    n: "03",
    title: "Salud y bienestar",
    icon: HeartPulse,
    text: "Tecnología aplicada a reducir el tiempo de respuesta en emergencias de búsqueda y rescate.",
  },
  {
    n: "11",
    title: "Ciudades y comunidades sostenibles",
    icon: Building2,
    text: "Herramientas de seguridad y respuesta accesibles para comunidades y grupos de emergencia locales.",
  },
  {
    n: "17",
    title: "Alianzas para lograr los objetivos",
    icon: Handshake,
    text: "Colaboración con clubes, mentores y una comunidad abierta que aporta datos y apoyo material.",
  },
  {
    n: "08",
    title: "Trabajo decente y crecimiento económico",
    icon: Briefcase,
    text: "Publicar en abierto no solo el código, sino también los diseños y las piezas del dron, reduce la barrera de entrada para que estudiantes, makers y pequeñas empresas innoven sobre esta base en vez de partir de cero — una forma concreta de impulsar empleo cualificado en un sector tecnológico emergente.",
  },
];

const FUTURE_LINES = [
  {
    title: "Cámara termográfica",
    icon: Thermometer,
    text: "Línea futura, no implementada en el sistema actual (ver limitaciones en Inteligencia Artificial): una cámara termográfica facilitaría la detección de personas en condiciones de baja o nula visibilidad — de noche, entre vegetación densa o con humo — donde la detección visual con YOLO por sí sola no basta.",
  },
  {
    title: "Altavoz y comunicación con la víctima",
    icon: Megaphone,
    text: "Un altavoz a bordo permitiría al dron interactuar con la persona localizada: avisarla de que ha sido detectada, darle indicaciones sencillas o tranquilizarla mientras el equipo de rescate llega al lugar.",
  },
  {
    title: "Transporte de material de ayuda",
    icon: Package,
    text: "Un mecanismo de liberación por servo permitiría transportar y soltar material de primera necesidad —una manta térmica, un botiquín básico— directamente sobre la ubicación de la persona, antes de que el equipo de rescate llegue físicamente.",
  },
  {
    title: "Geolocalización precisa de la víctima",
    icon: MapPin,
    text: "Hoy el sistema registra dónde estaba el dron en el momento de la detección, no la posición exacta de la persona (ver Inteligencia Artificial). Georreferenciar la detección dentro del fotograma reduciría el área de búsqueda del equipo real sobre el terreno.",
  },
  {
    title: "Tracking de personas entre fotogramas",
    icon: Footprints,
    text: "Hoy YOLO detecta persona a persona en cada fotograma por separado, sin saber si dos detecciones seguidas son la misma persona — solo hay un margen de tiempo fijo para no repetir la misma alerta (ver Inteligencia Artificial). Incorporar tracking (por ejemplo, con ByteTrack o DeepSORT) asignaría un identificador persistente a cada persona a lo largo de los fotogramas, con varias ventajas: distinguir a varias personas presentes en la misma zona en vez de tratarlas como una sola alerta genérica, seguir su trayectoria y dirección de movimiento, y confirmar cada detección con más fiabilidad — una persona que aparece de forma consistente en fotogramas sucesivos es una alerta mucho más fiable que una detección aislada de un único fotograma.",
  },
  {
    title: "Coordinación con emergencias reales",
    icon: Siren,
    text: "Conectar el flujo de alertas con canales oficiales (112, Protección Civil, equipos de montaña) para que una detección real pueda derivar en una respuesta coordinada, y no se quede solo en un registro interno del sistema.",
  },
  {
    title: "Integración con Telegram",
    icon: Bot,
    text: "Dar órdenes al dron por Telegram, en lenguaje coloquial, interpretadas por un modelo de lenguaje (LLM) que las traduce en las acciones concretas a ejecutar — por ejemplo, «busca en la zona de la dehesa a una persona con un jersey rojo» o «busca en la zona del incendio personas en peligro».",
  },
];

export default function ImpactoPage() {
  return (
    <>
      <PageHero
        eyebrow="Sec. 05 · Impacto y futuro"
        title="El proyecto no termina con la defensa del TFG"
        description="Retorno social y una hoja de ruta pensada para seguir siendo útil después de la evaluación académica."
        image={{ src: IMAGES.sustainableGrowth.src, alt: IMAGES.sustainableGrowth.alt }}
      />

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Por qué esto importa"
            title="Un TFG que no se cierra en un cajón"
            description="Buena parte del trabajo académico termina archivado tras la defensa. Guardian Eye se ha diseñado desde el principio para que eso no ocurra: la documentación abierta, el hardware físico y el propio conocimiento adquirido están pensados para tener una vida útil después de la calificación."
          />

          <div className="mt-16">
            <SectionHeading
              eyebrow="Retorno social"
              title="Tres formas de que el trabajo siga sirviendo"
              align="center"
              className="mx-auto"
            />
          </div>
          <div className="mt-14">
            <RadialDiagram
              centerLabel="Guardian Eye"
              centerSublabel="Después del TFG"
              nodes={IMPACT_NODES}
              startAngleDeg={-90}
            />
          </div>

          <div className="mt-16 grid gap-4 lg:grid-cols-3">
            <div className="rounded-2xl border border-line bg-paper p-6">
              <p className="text-[13.5px] font-bold text-ink">Conocimiento abierto</p>
              <p className="mt-2 text-[13.5px] leading-relaxed text-ink-muted">
                Publicación en GitHub de todo el código en Python, los esquemas y el manual
                de configuración. Ya hay tres repositorios públicos que respaldan esta
                sección con hechos, no solo intención: <code className="font-telemetry text-[11.5px]">yolo-pipeline-test</code>,{" "}
                <code className="font-telemetry text-[11.5px]">drone-edge-companion</code> y{" "}
                <code className="font-telemetry text-[11.5px]">drone-cloud-server</code>.
              </p>
            </div>
            <div className="rounded-2xl border border-line bg-paper p-6">
              <p className="text-[13.5px] font-bold text-ink">Uso físico</p>
              <p className="mt-2 text-[13.5px] leading-relaxed text-ink-muted">
                Donación del dron para docencia universitaria o entrenamiento de
                voluntarios locales, una vez concluida su vida útil como proyecto
                académico.
              </p>
            </div>
            <div className="rounded-2xl border border-line bg-paper p-6">
              <p className="text-[13.5px] font-bold text-ink">Guía para estudiantes</p>
              <p className="mt-2 text-[13.5px] leading-relaxed text-ink-muted">
                Un &ldquo;blueprint&rdquo; para que futuros ingenieros aprendan a construir
                drones conectados desde cero, sin dar por conocido el software de
                simulación de drones.
              </p>
            </div>
          </div>

          <div className="mt-20">
            <SectionHeading
              eyebrow="Objetivos de Desarrollo Sostenible"
              title="Cómo contribuye este proyecto con los Objetivos de Desarrollo Sostenible (ODS)"
              description="Los ODS son 17 metas globales fijadas por la ONU en 2015 como hoja de ruta hasta 2030 para erradicar la pobreza, proteger el planeta y garantizar que todas las personas disfruten de paz y prosperidad. Importan aquí porque obligan a pensar más allá de la nota académica: no solo si el sistema funciona, sino a quién beneficia y cómo."
            />
            <p className="mt-6 max-w-3xl text-[14.5px] leading-relaxed text-ink-muted">
              Lo que sigue es una selección razonada de los ODS a los que el proyecto puede
              aportar, no una cifra de impacto medida.
            </p>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {ODS.map((ods) => {
                const Icon = ods.icon;
                return (
                  <div key={ods.n} className="rounded-2xl border border-line bg-surface p-6">
                    <div className="flex items-center gap-3">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent">
                        <Icon className="h-5 w-5" strokeWidth={1.75} />
                      </span>
                      <span className="font-telemetry text-[20px] font-bold text-ink-faint">
                        {ods.n}
                      </span>
                    </div>
                    <p className="mt-4 text-[14px] font-bold text-ink">{ods.title}</p>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-ink-muted">
                      {ods.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-20 flex items-start gap-4 rounded-3xl border border-line bg-ink p-8 sm:p-10">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white">
              <InfinityIcon className="h-5 w-5" strokeWidth={1.75} />
            </span>
            <div>
              <h3 className="text-[19px] font-extrabold leading-tight text-white">
                Qué significa &ldquo;futuro&rdquo; en este proyecto
              </h3>
              <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-white/70">
                No hay un roadmap con fechas cerradas — sería inventar un compromiso que
                todavía no existe. Lo que sí hay es una dirección clara: escalar el dataset
                de detección de personas, cerrar las especificaciones finales de hardware y
                mantener los tres repositorios como base para quien quiera continuar el
                trabajo, dentro o fuera de la universidad.
              </p>
            </div>
          </div>

          <div className="mt-20">
            <SectionHeading
              eyebrow="Más allá del TFG"
              title="Líneas de investigación futura"
              description="Ideas concretas para ampliar lo que el sistema puede hacer hoy — no compromisos con fecha, sino la dirección natural en la que seguir trabajando después de la defensa."
            />
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {FUTURE_LINES.map((line) => {
                const Icon = line.icon;
                return (
                  <div key={line.title} className="rounded-2xl border border-line bg-paper p-6">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent">
                      <Icon className="h-5 w-5" strokeWidth={1.75} />
                    </span>
                    <p className="mt-4 text-[14px] font-bold text-ink">{line.title}</p>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-ink-muted">
                      {line.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
