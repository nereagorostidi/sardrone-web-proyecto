import type { Metadata } from "next";
import { Cable, Layers } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { PageHero } from "@/components/page-hero";
import { SubpageNav } from "@/components/subpage-nav";
import { IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: "Metodología",
  description:
    "Cómo se desarrollan en paralelo electrónica, comunicaciones y software, y por qué cada pieza se valida por etapas antes de confiar en ella.",
};

export default function MetodologiaPage() {
  return (
    <>
      <PageHero
        eyebrow="Proyecto · Metodología"
        breadcrumbs={[
          { label: "Inicio", href: "/" },
          { label: "Proyecto", href: "/proyecto" },
          { label: "Metodología" },
        ]}
        title="Desarrollo en paralelo, validación por etapas"
        description="Electrónica, comunicaciones y software no se construyen uno detrás de otro: avanzan a la vez, y cada pieza se valida contra hardware y vuelo real antes de confiar en ella — nunca fiándolo todo a la simulación."
        underConstruction
        image={{ src: IMAGES.circuitBoard.src, alt: IMAGES.circuitBoard.alt }}
      />

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Metodología transversal"
            title="Tres frentes en paralelo, no en serie"
            description="Un desarrollo secuencial —primero toda la electrónica, luego todas las comunicaciones, luego todo el software— retrasaría la detección de problemas de integración hasta el final del proyecto. Por eso los tres frentes avanzan a la vez."
          />

          <p className="mt-8 max-w-3xl text-[15.5px] leading-relaxed text-ink-muted">
            Electrónica (gestión de potencia y sensores), comunicaciones (4G, RF y
            telemetría) y software (Python, MAVLink y stack cloud) se desarrollan en
            paralelo y se validan por etapas: primero en simulación, después con
            hardware real sin hélices y, por último, en vuelo real. Cada etapa reduce
            el coste de un fallo — un error de lógica detectado en simulación se
            arregla editando código; el mismo error, si aparece ya en vuelo, se mide
            en riesgo físico, no en horas de trabajo. Por eso ninguna etapa se salta,
            por mucho que ralentice el desarrollo.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-line bg-paper p-6">
              <p className="text-[13px] font-bold text-ink">1. SITL</p>
              <p className="mt-1.5 text-[13px] leading-relaxed text-ink-muted">
                Software In The Loop: el firmware de vuelo (ArduPilot) corre contra un
                dron simulado. Sirve para depurar la lógica de misión sin arriesgar
                hardware ni exponerse a fallos en el aire.
              </p>
            </div>
            <div className="rounded-2xl border border-line bg-paper p-6">
              <p className="text-[13px] font-bold text-ink">2. HITL</p>
              <p className="mt-1.5 text-[13px] leading-relaxed text-ink-muted">
                Hardware In The Loop: la Pixhawk real, con sus sensores, ya está
                conectada, pero sin hélices — se comprueba que el hardware físico
                responde igual que el simulador antes de arriesgar un vuelo.
              </p>
            </div>
            <div className="rounded-2xl border border-line bg-paper p-6">
              <p className="text-[13px] font-bold text-ink">3. Vuelo real</p>
              <p className="mt-1.5 text-[13px] leading-relaxed text-ink-muted">
                Última etapa: el dron vuela de verdad y su comportamiento se compara
                contra lo esperado en las dos etapas anteriores, en vez de confiar
                ciegamente en la simulación.
              </p>
            </div>
          </div>

          <div className="mt-10 rounded-2xl border border-signal/30 bg-signal-soft p-6">
            <div className="flex items-center gap-2">
              <Cable className="h-4.5 w-4.5 text-signal" strokeWidth={1.75} />
              <p className="font-telemetry text-[10.5px] uppercase text-signal-ink">
                Nota de alerta
              </p>
            </div>
            <p className="mt-3 text-[14px] leading-relaxed text-ink">
              Latencia y ancho de banda no son intercambiables: un enlace de vídeo
              analógico o digital introduce retardo que un enlace MQTT, ligero y
              tolerante a redes inestables, no tiene. Elegir el protocolo correcto para
              cada tipo de dato es, en sí mismo, una decisión de ingeniería, no un
              detalle de implementación — y es parte de la misma metodología: validar
              cada decisión contra el comportamiento real de la red, no solo contra el
              caso ideal.
            </p>
          </div>

          <div className="mt-6 rounded-2xl border border-line bg-paper p-6">
            <div className="flex items-center gap-2">
              <Layers className="h-4.5 w-4.5 text-accent" strokeWidth={1.75} />
              <p className="font-telemetry text-[10.5px] uppercase text-ink-faint">
                Validación temprana en campo
              </p>
            </div>
            <p className="mt-3 text-[14px] leading-relaxed text-ink-muted">
              El 12 de julio de 2026 se realizó un primer vuelo real de referencia en el{" "}
              <span className="font-medium text-ink">Club Alas de Galapagar</span>, con el
              apoyo de José Manuel, para registrar un track GPS real y compararlo contra la
              simulación — la filosofía del proyecto es validar contra el vuelo real antes de
              confiar en el simulador, no al revés.
            </p>
          </div>

          <SubpageNav
            hub={{ label: "Volver a Proyecto", href: "/proyecto" }}
            prev={{ label: "Objetivos", href: "/proyecto/objetivos" }}
            next={{ label: "Filosofía", href: "/proyecto/filosofia" }}
          />
        </div>
      </section>
    </>
  );
}
