import type { Metadata } from "next";
import { GitBranch, GraduationCap, HeartHandshake, HeartPulse, Building2, Handshake } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { RadialDiagram } from "@/components/diagrams/radial-diagram";

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
];

export default function ImpactoPage() {
  return (
    <>
      <header className="border-b border-line bg-surface pt-32 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="font-telemetry text-[11px] uppercase text-accent">Sec. 05 · Impacto y futuro</p>
          <h1 className="mt-3 max-w-2xl text-balance text-[36px] font-extrabold leading-[1.1] tracking-tight text-ink sm:text-[46px]">
            El proyecto no termina con la defensa del TFG
          </h1>
          <p className="mt-4 max-w-xl text-[15.5px] leading-relaxed text-ink-muted">
            Retorno social y una hoja de ruta pensada para seguir siendo útil después de la
            evaluación académica.
          </p>
        </div>
      </header>

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Retorno social"
            title="Tres formas de que el trabajo siga sirviendo"
            align="center"
            className="mx-auto"
          />
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
              title="A qué ODS contribuye Guardian Eye"
              description="Una selección razonada de los ODS a los que el proyecto puede aportar, no una cifra de impacto medida."
            />
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
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
        </div>
      </section>
    </>
  );
}
