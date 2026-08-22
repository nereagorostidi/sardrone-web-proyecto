import type { Metadata } from "next";
import Link from "next/link";
import {
  Gamepad2,
  KeyRound,
  Lock,
  Rocket,
  SatelliteDish,
  ShieldAlert,
  Wifi,
} from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { TripleLinkDiagram } from "@/components/diagrams/triple-link-diagram";
import { PageHero } from "@/components/page-hero";
import { SubpageNav } from "@/components/subpage-nav";
import { IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: "Comunicaciones",
  description:
    "Enlace múltiple de comunicaciones redundante de Guardian Eye y la red privada Tailscale que protege cada canal.",
};

const LINK_CARDS = [
  {
    id: "rf",
    icon: Gamepad2,
    label: "Mando RC",
    freq: "2.4 GHz",
    colorVar: "var(--color-signal)",
    purpose:
      "Seguridad y normativa: control manual prioritario. Pilota el dron en tiempo real sin pasar por ningún ordenador ni por la estación de tierra.",
    detail: "FlySky FS-i6X (mando) / FS-iA10B (receptor)",
  },
  {
    id: "tlm",
    icon: SatelliteDish,
    label: "Telemetría",
    freq: "433 MHz",
    colorVar: "var(--color-accent)",
    purpose:
      "No es solo monitorización: es un enlace bidireccional con la estación de tierra. Además de recibir posición, batería y estado, permite enviar órdenes de vuelo —iniciar una misión, RTL— a través de Mission Planner o QGroundControl.",
    detail: "Banda ISM · módulo TELEM a bordo + receptor USB en tierra",
  },
  {
    id: "datos",
    icon: Wifi,
    label: "WiFi / 4G-LTE",
    freq: "Corto y largo alcance",
    colorVar: "var(--color-mesh-violet)",
    purpose:
      "Dos enlaces de datos según la distancia: WiFi para el corto alcance entre el dron y la estación de tierra, y 4G/LTE para el largo alcance. Es también la vía que usa el panel de control (PWA) para enviar órdenes al dron desde cualquier sitio, no solo desde el campo de vuelo.",
    detail: "WiFi: enlace local dron ↔ estación · 4G/LTE: módem USB + AWS EC2",
  },
];

export default function ComunicacionesPage() {
  return (
    <>
      <PageHero
        eyebrow="Arquitectura · Comunicaciones"
        breadcrumbs={[
          { label: "Inicio", href: "/" },
          { label: "Arquitectura técnica", href: "/arquitectura" },
          { label: "Comunicaciones" },
        ]}
        title="Enlace múltiple de comunicaciones redundante"
        description="Combinar varios tipos de comunicación distintos significa que hay múltiples formas de llegar al dron: el mando RC como última garantía manual, la telemetría para monitorización local, el 4G/LTE para control remoto sin límite de alcance, y el WiFi como respaldo adicional de corto alcance cuando el dron y la estación están cerca."
        tone="signal"
        image={{ src: IMAGES.antennaTower.src, alt: IMAGES.antennaTower.alt }}
      />

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            <SectionHeading
              eyebrow="Por qué redundancia"
              title="Ningún canal único es de fiar en el campo"
              description="Es un principio básico de ingeniería de comunicaciones: un sistema crítico no debería depender de un solo punto de fallo. Una radio RC puede sufrir interferencias, una red 4G puede no tener cobertura en una zona de montaña, y un enlace de telemetría puede degradarse por distancia. Guardian Eye combina RC, telemetría, 4G/LTE y WiFi precisamente para que el fallo de uno no deje al dron incomunicado."
            />
            <div className="rounded-2xl border border-line bg-surface p-6">
              <div className="flex items-center gap-2">
                <ShieldAlert className="h-4.5 w-4.5 text-signal" strokeWidth={1.75} />
                <p className="font-telemetry text-[10.5px] uppercase text-signal-ink">
                  Jerarquía de seguridad
                </p>
              </div>
              <p className="mt-3 text-[13.5px] leading-relaxed text-ink-muted">
                No todos los enlaces tienen el mismo peso: el mando RC es siempre la última
                línea de control manual y no depende de ningún ordenador de a bordo ni de
                cobertura de red — es la vía que garantiza que, pase lo que pase con el
                software, el piloto sigue teniendo el mando.
              </p>
            </div>
          </div>

          <div className="mt-16">
            <TripleLinkDiagram />
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {LINK_CARDS.map((link) => {
              const Icon = link.icon;
              return (
                <div
                  key={link.id}
                  className="rounded-2xl border bg-paper p-6"
                  style={{ borderColor: `color-mix(in oklab, ${link.colorVar} 30%, var(--color-line))` }}
                >
                  <span
                    className="flex h-11 w-11 items-center justify-center rounded-xl"
                    style={{ backgroundColor: `color-mix(in oklab, ${link.colorVar} 14%, white)`, color: link.colorVar }}
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <p className="mt-4 text-[15px] font-bold text-ink">{link.label}</p>
                  <p className="font-telemetry text-[11px] uppercase text-ink-muted">
                    {link.freq}
                  </p>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-ink-muted">{link.purpose}</p>
                  <p className="mt-3 border-t border-line pt-3 font-telemetry text-[10.5px] uppercase text-ink-faint">
                    {link.detail}
                  </p>
                </div>
              );
            })}
          </div>

          <p className="mt-8 max-w-3xl text-[14.5px] leading-relaxed text-ink-muted">
            En conjunto, esto nos da varias vías reales para manejar el dron, no solo una: el
            mando RC para el control manual directo; la telemetría, con{" "}
            <span className="font-medium text-ink">Mission Planner</span> o QGroundControl
            —el software de estación de tierra (GCS) que habla MAVLink con el autopiloto— para
            ver en tiempo real posición, altitud y batería, y también enviar órdenes (subir
            una misión, forzar un RTL) sin tocar el mando; y —gracias al panel de control
            (PWA) que construimos sobre WiFi/4G-LTE— la posibilidad de operar el dron desde
            cualquier sitio con conexión, no solo desde el campo de vuelo. Detalle completo
            del panel en{" "}
            <Link href="/arquitectura/software" className="font-semibold text-accent underline underline-offset-2">
              Software & Cloud
            </Link>
            .
          </p>

          <div className="mt-16 grid gap-8 rounded-3xl border border-line bg-ink p-8 sm:p-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <div>
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-white">
                <Lock className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <h3 className="mt-4 text-[22px] font-extrabold leading-tight text-white">
                Comunicaciones seguras usando Tailscale
              </h3>
              <p className="mt-3 text-[14px] leading-relaxed text-white/70">
                Tailscale es una red privada virtual (VPN) que crea una malla segura entre
                todos los dispositivos del proyecto — el dron y su Raspberry Pi, el ordenador
                de tierra y el servidor en la nube — como si todos estuvieran conectados a la
                misma red local, estén donde estén. Está construida sobre WireGuard, un
                protocolo VPN moderno centrado en simplicidad y cifrado fuerte por defecto.
              </p>
            </div>
            <div className="grid gap-4">
              <div className="flex gap-3 rounded-2xl border border-white/10 bg-white/5 p-5">
                <Wifi className="h-5 w-5 shrink-0 text-white" strokeWidth={1.75} />
                <p className="text-[13.5px] leading-relaxed text-white/85">
                  Permite conectarse al dron y a su ordenador de a bordo aunque no tengan una
                  dirección IP fija o pública — por ejemplo, cuando están conectados a través
                  de una tarjeta 4G, cuya IP puede cambiar en cada conexión.
                </p>
              </div>
              <div className="flex gap-3 rounded-2xl border border-white/10 bg-white/5 p-5">
                <KeyRound className="h-5 w-5 shrink-0 text-white" strokeWidth={1.75} />
                <p className="text-[13.5px] leading-relaxed text-white/85">
                  Cifra todo el tráfico entre el dron, el ordenador de tierra y la nube, de
                  modo que nadie pueda interceptar ni manipular las comunicaciones ni los
                  comandos de vuelo — un requisito de seguridad no negociable cuando se
                  controla un vehículo real a distancia.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16">
            <SectionHeading
              eyebrow="Notas técnicas · Limitaciones que asumimos"
              title="¿Necesito obligatoriamente un AP para mi WiFi?"
              description="Con la actual configuración, asumimos conscientemente una limitación, ya que dependemos de un AP. Sin embargo, esto no es necesariamente un problema: aunque la configuración actual no permite que el WiFi funcione por sí solo —necesita que algo más, un MiFi o nuestro propio ordenador, haga de punto de acceso (AP o Access Point) al que se conecta la Raspberry Pi—, disponemos también de un acceso móvil, por lo que si no tenemos posibilidad de acceder a un AP, podemos usar esta conexión."
            />
            <p className="mt-6 max-w-3xl text-[14.5px] leading-relaxed text-ink-muted">
              La Raspberry Pi se conecta al WiFi como un dispositivo más, no lo genera ella
              misma: necesita un MiFi (un router portátil con su propia tarjeta SIM) o un
              ordenador configurado como AP, a los que también se conectan los dispositivos
              en tierra que quieran ver el vídeo o los datos en tiempo real desde cerca. Para
              eso, la Raspberry Pi debe tener configurado de antemano el SSID de esa red WiFi
              al que conectarse. Esa dependencia del AP se nota especialmente en el alcance:
              sin equipos WiFi profesionales ni APs de alta potencia, el alcance efectivo de
              este enlace es reducido, de apenas unas decenas de metros entre el dron y el
              punto de acceso —muy por debajo del alcance que sí tienen la telemetría o el
              4G—. Por eso, precisamente, tener el respaldo de la conexión móvil marca la
              diferencia: nos permite seguir operando con normalidad incluso cuando no hay
              ningún AP disponible cerca, sin que el proyecto dependa de una única vía de
              acceso.
            </p>
          </div>

          <div className="mt-16">
            <SectionHeading
              eyebrow="Conectividad avanzada"
              title="La opción profesional: WiFi personalizado"
              description="El WiFi estándar tiene un límite de alcance real, y no es una limitación exclusiva nuestra: es la razón por la que los grandes fabricantes de drones no usan WiFi de fábrica."
            />
            <p className="mt-6 max-w-3xl text-[14.5px] leading-relaxed text-ink-muted">
              En este momento, dejamos fuera del ámbito de este proyecto, por ser algo muy
              ambicioso para esta etapa, la opción que la mayoría de los fabricantes usan: un
              WiFi «mejorado» y personalizado que, además, no requiere conectarse a ningún AP
              (Access Point).
            </p>
            <p className="mt-4 max-w-3xl text-[14.5px] leading-relaxed text-ink-muted">
              DJI, por ejemplo, resuelve esto al revés de lo que hacemos nosotros: es el propio
              dron quien genera la red (no se conecta a él una externa), con un protocolo de
              radio propio —una variante de WiFi modificada, u OcuSync/O3 según el modelo—
              pensado para mucho más alcance del que daría un WiFi normal. La consecuencia
              práctica es que el móvil no puede conectarse directamente a esa red: quien sí
              entiende ese protocolo es el mando físico, que hace de pasarela —se conecta él al
              dron por ese enlace propietario, y retransmite datos e incluso vídeo al móvil por
              un cable USB-C o Lightning—. Es la misma razón por la que la app de DJI no
              funciona si no se conecta el teléfono al mando: es la única forma de que el móvil
              pueda comunicarse con el dron.
            </p>
            <div className="mt-6 flex items-start gap-3 rounded-2xl border border-line bg-surface p-6">
              <Rocket className="mt-0.5 h-5 w-5 shrink-0 text-accent" strokeWidth={1.75} />
              <p className="text-[13.5px] leading-relaxed text-ink-muted">
                Replicar ese enfoque sobre nuestra propia Raspberry Pi es técnicamente
                posible —existe <span className="font-medium text-ink">WFB-ng</span> (Wifibroadcast-ng),
                un proyecto de código abierto que usa las tarjetas WiFi en modo monitor para
                emitir vídeo como una emisión de radio sin conexión, con mucho más alcance y
                menor latencia que un WiFi convencional—, pero no lo hemos necesitado en esta
                fase del proyecto. Queda como una posible evolución futura hacia una
                arquitectura híbrida, combinando esta opción de largo alcance con el respaldo
                4G que ya tenemos hoy.
              </p>
            </div>
          </div>

          <SubpageNav
            hub={{ label: "Volver a Arquitectura", href: "/arquitectura" }}
            prev={{ label: "Hardware", href: "/arquitectura/hardware" }}
            next={{ label: "Vídeo", href: "/arquitectura/video" }}
          />
        </div>
      </section>
    </>
  );
}
