import type { Metadata } from "next";
import Image from "next/image";
import {
  AlertTriangle,
  Cable,
  Cpu,
  Gauge,
  Lightbulb,
  Network,
  ShieldCheck,
  Terminal,
  Workflow,
} from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { RadialDiagram } from "@/components/diagrams/radial-diagram";
import { PhilosophyComparison } from "@/components/diagrams/philosophy-comparison";
import { IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: "Proyecto",
  description:
    "El problema SAR, los objetivos académicos y la filosofía de arquitectura abierta detrás de Guardian Eye.",
};

const COMPETENCY_NODES = [
  {
    id: "electronica",
    label: "Electrónica",
    description: "Pixhawk 6C + Raspberry Pi 5, buses I2C/UART, alimentación (UBEC, LiPo)",
    icon: <Cpu strokeWidth={1.75} />,
    colorVar: "var(--color-accent)",
  },
  {
    id: "telematica",
    label: "Telemática",
    description: "MQTT (Mosquitto), topics jerárquicos, VPNs, HTTPS/nginx",
    icon: <Network strokeWidth={1.75} />,
    colorVar: "var(--color-mesh-cyan)",
  },
  {
    id: "programacion",
    label: "Programación",
    description: "Python, Linux/Debian, AWS (EC2, Flask), YOLOv8/Ultralytics",
    icon: <Terminal strokeWidth={1.75} />,
    colorVar: "var(--color-mesh-violet)",
  },
  {
    id: "sistemas",
    label: "Sistemas",
    description: "Validación por etapas SITL → HITL → vuelo real, gestión de proyecto",
    icon: <Workflow strokeWidth={1.75} />,
    colorVar: "var(--color-signal)",
  },
];

export default function ProyectoPage() {
  return (
    <>
      <header className="border-b border-line bg-surface pt-32 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="font-telemetry text-[11px] uppercase text-accent">Sec. 01 · Proyecto</p>
          <h1 className="mt-3 max-w-2xl text-balance text-[36px] font-extrabold leading-[1.1] tracking-tight text-ink sm:text-[46px]">
            El planteamiento, los objetivos y la filosofía
          </h1>
          <p className="mt-4 max-w-xl text-[15.5px] leading-relaxed text-ink-muted">
            Por qué existe Guardian Eye, qué competencias de la carrera consolida y por qué
            se ha diseñado como una arquitectura abierta en lugar de comprar una solución
            cerrada.
          </p>
        </div>
      </header>

      <section id="introduccion" className="scroll-mt-24 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <SectionHeading
                eyebrow="Introducción"
                title="El desafío: encontrar lo invisible contrarreloj"
                description="Las misiones de Búsqueda y Rescate (SAR) son una carrera contra el tiempo. Los excursionistas perdidos, el humo incipiente o los terrenos difíciles requieren ojos en el cielo — pero las herramientas actuales presentan una brecha crítica."
              />

              <div className="mt-10 space-y-5">
                <div className="flex gap-4 rounded-2xl border border-line bg-paper p-5">
                  <AlertTriangle className="h-5 w-5 shrink-0 text-signal" strokeWidth={1.75} />
                  <div>
                    <p className="text-[13.5px] font-bold text-ink">El problema</p>
                    <p className="mt-1 text-[14px] leading-relaxed text-ink-muted">
                      Los drones comerciales profesionales son &ldquo;cajas negras&rdquo;
                      cerradas y extremadamente costosas, imposibles de modificar por el
                      usuario.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 rounded-2xl border border-line bg-paper p-5">
                  <Gauge className="h-5 w-5 shrink-0 text-ink-faint" strokeWidth={1.75} />
                  <div>
                    <p className="text-[13.5px] font-bold text-ink">La brecha</p>
                    <p className="mt-1 text-[14px] leading-relaxed text-ink-muted">
                      Falta de herramientas asequibles, hackeables y autónomas para grupos
                      locales de emergencia y voluntarios.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 rounded-2xl border border-accent/30 bg-accent-soft p-5">
                  <Lightbulb className="h-5 w-5 shrink-0 text-accent" strokeWidth={1.75} />
                  <div>
                    <p className="text-[13.5px] font-bold text-ink">La solución Guardian Eye</p>
                    <p className="mt-1 text-[14px] leading-relaxed text-ink-muted">
                      Un sistema diseñado desde cero para apoyar la búsqueda en condiciones
                      de baja visibilidad, apoyándose en visión por computador allí donde el
                      ojo humano tiene menos oportunidades de encontrar a tiempo a la persona
                      buscada.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-line">
              <Image
                src={IMAGES.foggyForest.src}
                alt={IMAGES.foggyForest.alt}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/70 to-transparent p-6">
                <p className="font-telemetry text-[10px] uppercase text-white/70">
                  Escenario representativo
                </p>
                <p className="mt-1 text-[13px] text-white/90">
                  Terreno de baja visibilidad, el tipo de entorno donde una misión SAR
                  pierde minutos críticos.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16 rounded-3xl border border-line bg-surface p-8">
            <div className="flex items-start gap-3">
              <ShieldCheck className="h-5 w-5 shrink-0 text-accent" strokeWidth={1.75} />
              <div>
                <p className="text-[15px] font-bold text-ink">Marco regulatorio cumplido</p>
                <p className="mt-2 max-w-3xl text-[14px] leading-relaxed text-ink-muted">
                  El proyecto opera bajo el certificado de piloto AESA A1/A3 y un número de
                  operador registrado, en cumplimiento del RD 517/2024 (España) y el
                  Reglamento (UE) 2019/947 —el marco EASA por categorías: abierta, específica
                  y certificada—. Cada vuelo verifica la zona con la aplicación oficial{" "}
                  <span className="font-medium text-ink">Drone Space</span> de AESA.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="objetivos" className="scroll-mt-24 border-t border-line bg-surface py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Objetivos"
            title="Diseñar una herramienta SAR profesional desde cero"
            description="El objetivo general es diseñar y construir, desde cero, un UAV autónomo de Búsqueda y Rescate como Trabajo de Fin de Grado de Ingeniería de Tecnologías de Telecomunicación — consolidando cuatro grandes bloques de la carrera en un único sistema funcional."
          />

          <div className="mt-14">
            <RadialDiagram
              centerLabel="TFG Teleco"
              centerSublabel="4 competencias"
              nodes={COMPETENCY_NODES}
            />
          </div>

          <div className="mt-16 grid gap-4 lg:grid-cols-2">
            <div className="rounded-2xl border border-line bg-paper p-6">
              <p className="font-telemetry text-[10.5px] uppercase text-ink-faint">
                Metodología transversal
              </p>
              <p className="mt-3 text-[14px] leading-relaxed text-ink-muted">
                Electrónica (gestión de potencia y sensores), comunicaciones (4G, RF y
                telemetría) y software (Python, MAVLink y stack cloud) se desarrollan en
                paralelo y se validan por etapas: primero en simulación
                (SITL — ArduPilot Software In The Loop), después con hardware real sin
                hélices (HITL) y, por último, en vuelo real.
              </p>
            </div>
            <div className="rounded-2xl border border-signal/30 bg-signal-soft p-6">
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
                cada tipo de dato es, en sí mismo, una decisión de ingeniería.
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-line bg-paper p-6">
            <p className="font-telemetry text-[10.5px] uppercase text-ink-faint">
              Validación temprana en campo
            </p>
            <p className="mt-3 text-[14px] leading-relaxed text-ink-muted">
              El 12 de julio de 2026 se realizó un primer vuelo real de referencia en el{" "}
              <span className="font-medium text-ink">Club Alas de Galapagar</span>, con el
              apoyo de José Manuel, para registrar un track GPS real y compararlo contra la
              simulación — la filosofía del proyecto es validar contra el vuelo real antes de
              confiar en el simulador.
            </p>
          </div>
        </div>
      </section>

      <section id="filosofia" className="scroll-mt-24 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Filosofía"
            title="Arquitectura abierta frente a solución comercial cerrada"
            description="No se compra una solución cerrada; se diseña la arquitectura para tener control total sobre los datos y la lógica de vuelo."
          />
          <div className="mt-12">
            <PhilosophyComparison />
          </div>

          <div className="mt-8 rounded-2xl border border-line bg-surface p-6">
            <p className="text-[13.5px] leading-relaxed text-ink-muted">
              Como referencia concreta: frente a un dron de consumo reciente como el{" "}
              <span className="font-medium text-ink">DJI Neo 2</span> —controladora de vuelo
              propietaria no documentada, protocolo de control cifrado, app cerrada y
              procesamiento a bordo no programable—, Guardian Eye se apoya en{" "}
              <span className="font-medium text-ink">Pixhawk + ArduPilot</span> (firmware
              abierto), <span className="font-medium text-ink">MAVLink</span> (protocolo
              estándar abierto), una estación de tierra intercambiable (Mission Planner o
              QGroundControl), una Raspberry Pi 5 completamente programable y una pila cloud
              propia y auditable.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
