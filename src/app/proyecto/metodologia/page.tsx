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

const OBJETIVOS = [
  { n: 1, objetivo: "Análisis normativo y regulatorio SAR", estado: "Cumplido" },
  { n: 2, objetivo: "Selección y montaje de la plataforma hardware", estado: "Cumplido" },
  { n: 3, objetivo: "Diseño del sistema de comunicaciones y telecontrol", estado: "Cumplido — RC y telemetría en vuelo real; 4G/Tailscale/AWS en banco" },
  { n: 4, objetivo: "Arquitectura IoT en la nube (AWS EC2)", estado: "Cumplido y validado en banco" },
  { n: 5, objetivo: "Construcción y curación de dataset propio", estado: "Cumplido — 717 imágenes" },
  { n: 6, objetivo: "Entrenamiento y optimización de YOLO en el borde", estado: "Cumplido a nivel de prototipo (prueba de concepto)" },
  { n: 7, objetivo: "Validación integral del sistema completo", estado: "Cumplida — fases SITL, banco Semi-HITL y vuelo real" },
] as const;

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
            paralelo y se validan en <span className="font-medium text-ink">cuatro fases
            progresivas</span>, de menor a mayor riesgo: simulación, banco de hardware en
            tierra, campaña de vuelo de la plataforma y, por último, vuelo del sistema
            completo integrado. Cada etapa reduce el coste de un fallo — un error de
            lógica detectado en simulación se arregla editando código; el mismo error, si
            aparece ya en vuelo, se mide en riesgo físico, no en horas de trabajo. Por eso
            ninguna etapa se salta, por mucho que ralentice el desarrollo.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-line bg-paper p-6">
              <p className="text-[13px] font-bold text-ink">1. Simulación SITL</p>
              <p className="mt-1.5 text-[13px] leading-relaxed text-ink-muted">
                Software In The Loop: el firmware de vuelo (ArduPilot) corre contra un
                dron simulado, enlazado con Mission Planner y con el origen fijado en el
                campo del club. Sirve para depurar la máquina de estados de la misión y
                los scripts de <code className="font-telemetry text-[11px]">pymavlink</code>{" "}
                sin arriesgar hardware.
              </p>
            </div>
            <div className="rounded-2xl border border-line bg-paper p-6">
              <p className="text-[13px] font-bold text-ink">2. Banco Semi-HITL</p>
              <p className="mt-1.5 text-[13px] leading-relaxed text-ink-muted">
                La Raspberry Pi 5 se conecta a la Pixhawk 6X real por UART (puerto
                TELEM3), <span className="font-medium text-ink">sin hélices</span> y con el
                dron sujeto. Se verifican el armado, el cambio de modos y la lectura de
                telemetría directamente sobre la electrónica del vehículo.
              </p>
            </div>
            <div className="rounded-2xl border border-line bg-paper p-6">
              <p className="text-[13px] font-bold text-ink">3. Campaña de vuelo</p>
              <p className="mt-1.5 text-[13px] leading-relaxed text-ink-muted">
                Pruebas físicas en el espacio autorizado del Club Alas de Galapagar
                (LECMUAV090, subcategoría A3). Primera parte: se revisan la sustentación,
                la estabilidad y el peso de la plataforma, con un{" "}
                <span className="font-medium text-ink">MTOW real de 1.817 g</span> medido
                en báscula.
              </p>
            </div>
            <div className="rounded-2xl border border-line bg-paper p-6">
              <p className="text-[13px] font-bold text-ink">4. Sistema integrado</p>
              <p className="mt-1.5 text-[13px] leading-relaxed text-ink-muted">
                Segunda parte de la campaña: un vuelo con el sistema completo a bordo —
                nodo edge infiriendo y grabando, enlace 4G y store-and-forward activos —
                para comprobar en condiciones reales lo validado antes por separado.
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

          <div className="mt-20">
            <SectionHeading
              eyebrow="Resultados de la validación"
              title="Qué quedó comprobado, y con qué alcance"
              description="El objetivo de un prototipo no es demostrar que el sistema ya está listo para operar, sino que la arquitectura propuesta es técnicamente viable. Con ese criterio, la validación cubre todo lo definido en los objetivos del trabajo."
            />

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-line bg-surface p-6">
                <p className="text-[13.5px] font-bold text-ink">Cadena de mando</p>
                <p className="mt-2 text-[13px] leading-relaxed text-ink-muted">
                  Validada de extremo a extremo en banco: panel PWA → API Flask en EC2 →
                  MQTT por el túnel de Tailscale → receptor en la Raspberry Pi → MAVLink a
                  la Pixhawk. Se confirmó la respuesta física de la controladora —
                  encendido de los variadores, cambios de modo y avisos acústicos y
                  luminosos de seguridad.
                </p>
              </div>
              <div className="rounded-2xl border border-line bg-surface p-6">
                <p className="text-[13.5px] font-bold text-ink">Comunicaciones</p>
                <p className="mt-2 text-[13px] leading-relaxed text-ink-muted">
                  RC a 2,4 GHz y telemetría a 433 MHz verificados en vuelo real; el enlace
                  4G/Tailscale/AWS, en banco. El WiFi convencional de la Raspberry Pi, sin
                  antenas específicas, solo alcanzó unos 20 m — por eso el 4G/LTE quedó
                  fijado como canal permanente hacia la nube.
                </p>
              </div>
              <div className="rounded-2xl border border-line bg-surface p-6">
                <p className="text-[13.5px] font-bold text-ink">Plataforma IoT</p>
                <p className="mt-2 text-[13px] leading-relaxed text-ink-muted">
                  Ingesta simultánea de los cuatro dominios en InfluxDB, cuadros de
                  Grafana, y el mecanismo de store-and-forward probado con un corte de 4G
                  forzado en banco y confirmado después ante una pérdida de enlace real en
                  vuelo, sin perder ningún dato.
                </p>
              </div>
              <div className="rounded-2xl border border-line bg-surface p-6">
                <p className="text-[13.5px] font-bold text-ink">Detección en vuelo</p>
                <p className="mt-2 text-[13px] leading-relaxed text-ink-muted">
                  La Raspberry Pi procesó el vídeo de la cámara a bordo e infirió en
                  tiempo real sobre el acelerador Hailo-8: detectó a las dos personas que
                  entraron en el campo de visión y generó las alertas. Hubo un falso
                  positivo al inicio —esperable en una prueba de concepto, donde se
                  prioriza el recall— y la imagen osciló por la vibración, lo que confirma
                  la conveniencia de un gimbal de dos ejes.
                </p>
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-signal/30 bg-signal-soft p-6">
              <p className="font-telemetry text-[10.5px] uppercase text-signal-ink">
                Con una salvedad
              </p>
              <p className="mt-2 text-[13.5px] leading-relaxed text-ink">
                El vuelo del sistema integrado se hizo alimentando la Raspberry Pi y el
                acelerador con una batería externa portátil, no desde la batería principal
                del dron: el regulador UBEC necesario para esa integración llegó sin margen
                para soldarlo antes del cierre del trabajo. La solución provisional sumó
                unos 400 g y redujo la autonomía, pero permitió validar el sistema completo
                dentro de plazo. La integración definitiva queda como deuda técnica.
              </p>
            </div>

            <div className="mt-8 overflow-x-auto">
              <table className="w-full min-w-[520px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-line">
                    <th className="py-3 pr-4 font-telemetry text-[10.5px] uppercase text-ink-faint">
                      Objetivo del TFG
                    </th>
                    <th className="py-3 font-telemetry text-[10.5px] uppercase text-ink-faint">
                      Estado
                    </th>
                  </tr>
                </thead>
                <tbody className="text-[13px] text-ink-muted">
                  {OBJETIVOS.map((o) => (
                    <tr key={o.n} className="border-b border-line/60">
                      <td className="py-3 pr-4">{o.objetivo}</td>
                      <td className="py-3 font-medium text-ink">{o.estado}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-[12px] leading-relaxed text-ink-faint">
              Resumen de la matriz de cumplimiento de objetivos de la memoria (Tabla 9.1).
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
