import type { Metadata } from "next";
import {
  BadgeCheck,
  Building2,
  CheckCircle2,
  FileCheck,
  Landmark,
  MapPinned,
  Signal,
  Tags,
  Umbrella,
} from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { PageHero } from "@/components/page-hero";
import { SubpageNav } from "@/components/subpage-nav";
import { IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: "Normativa y legislación",
  description:
    "La normativa UAS aplicada a Guardian Eye: EASA, AESA, categoría abierta A1/A3, registro de operador, Remote ID, marcado del dron y seguro obligatorio.",
};

const LINK_CLASS = "font-medium text-accent underline underline-offset-2";

const AUTHORITIES = [
  {
    icon: Landmark,
    title: "EASA",
    subtitle: "Agencia europea (supranacional)",
    text: (
      <>
        La{" "}
        <a href="https://www.easa.europa.eu/en/light/topics/drones" target="_blank" rel="noreferrer" className={LINK_CLASS}>
          European Union Aviation Safety Agency
        </a>{" "}
        fija las reglas comunes para todos los países de la UE: el Reglamento (UE)
        2019/947 regula cómo se opera un dron, y el 2019/945 regula cómo se fabrica y
        marca.
      </>
    ),
  },
  {
    icon: Building2,
    title: "AESA",
    subtitle: "Autoridad española (nacional)",
    text: (
      <>
        La{" "}
        <a href="https://www.seguridadaerea.gob.es/es/ambitos/drones" target="_blank" rel="noreferrer" className={LINK_CLASS}>
          Agencia Estatal de Seguridad Aérea
        </a>{" "}
        aplica y vigila esas reglas en España a través del Real Decreto 517/2024, que
        sustituyó al antiguo RD 1036/2017 y terminó de adaptar la normativa española al
        marco europeo.
      </>
    ),
  },
  {
    icon: MapPinned,
    title: "ENAIRE",
    subtitle: "Gestor de la navegación aérea",
    text: (
      <>
        No regula, informa: su plataforma{" "}
        <a href="https://drones.enaire.es/" target="_blank" rel="noreferrer" className={LINK_CLASS}>
          ENAIRE Drones
        </a>{" "}
        muestra sobre un mapa las zonas con restricciones o prohibiciones de vuelo. Es
        obligatorio consultarla antes de cada vuelo, ya sea desde la web o desde la{" "}
        <a href="https://play.google.com/store/apps/details?id=es.enaire.androiddrones" target="_blank" rel="noreferrer" className={LINK_CLASS}>
          app para Android
        </a>{" "}
        o{" "}
        <a href="https://apps.apple.com/es/app/enaire-drones/id1506594624" target="_blank" rel="noreferrer" className={LINK_CLASS}>
          iOS
        </a>
        .
      </>
    ),
  },
];

const CATEGORIES = [
  {
    title: "Abierta",
    active: true,
    text: "Bajo riesgo, sin necesidad de autorización operacional previa. Es la categoría en la que opera Guardian Eye. Se divide en las subcategorías A1, A2 y A3.",
  },
  {
    title: "Específica",
    active: false,
    text: "Riesgo medio: exige una autorización de AESA caso por caso, con un análisis de riesgo específico para la operación concreta que se quiere realizar.",
  },
  {
    title: "Certificada",
    active: false,
    text: "Riesgo equivalente al de la aviación tripulada: aeronavegabilidad certificada, piloto con licencia y organización aprobada, como un avión convencional.",
  },
];

const CHECKLIST = [
  {
    icon: BadgeCheck,
    title: "Certificado de piloto A1/A3",
    text: (
      <>
        Curso teórico y examen online, gratuitos, en la{" "}
        <a
          href="https://sede.seguridadaerea.gob.es/sede-aesa/catalogo-de-procedimientos/curso-de-formacion-y-examen-de-piloto-distancia-en-categoria-abierta"
          target="_blank"
          rel="noreferrer"
          className={LINK_CLASS}
        >
          sede electrónica de AESA
        </a>
        . Es obligatorio para volar drones de clase C1/C3/C4 o drones &ldquo;legado&rdquo;
        (sin marcado de clase, como el de este proyecto) de más de 250 g.
      </>
    ),
  },
  {
    icon: FileCheck,
    title: "Registro como operador UAS",
    text: "Alta como operador en AESA (persona física o jurídica), que asigna un número de operador único con el formato ESP…, previo al primer vuelo.",
  },
  {
    icon: Tags,
    title: "Marcado físico del dron",
    text: "El número de operador debe ir pegado de forma visible sobre la estructura del dron — nunca sobre una pieza extraíble como la batería —, normalmente en una placa o pegatina resistente.",
  },
  {
    icon: Umbrella,
    title: "Seguro de responsabilidad civil",
    text: "Obligatorio para cualquier dron de 250 g o más, con una cobertura mínima de 300.000 €, independientemente de la subcategoría en la que se vuele.",
  },
  {
    icon: Signal,
    title: "Identificación remota (Remote ID)",
    text: "Desde el 1 de enero de 2026 es obligatoria para todos los drones de más de 250 g, tengan o no marcado de clase. Un dron “legado” como el de Guardian Eye necesita un módulo externo conforme al estándar EN 4709-002.",
  },
  {
    icon: MapPinned,
    title: "Consulta del espacio aéreo",
    text: (
      <>
        Antes de cada vuelo, comprobar en{" "}
        <a href="https://drones.enaire.es/" target="_blank" rel="noreferrer" className={LINK_CLASS}>
          ENAIRE Drones
        </a>{" "}
        (web o{" "}
        <a href="https://play.google.com/store/apps/details?id=es.enaire.androiddrones" target="_blank" rel="noreferrer" className={LINK_CLASS}>
          app
        </a>
        ) si la zona tiene alguna restricción o prohibición por motivos aeronáuticos — no
        es un trámite puntual, sino previo a cada operación.
      </>
    ),
  },
];

const COMPLIANCE = [
  "La autora del proyecto cuenta con el certificado de piloto A1/A3, obtenido antes de los primeros vuelos de prueba.",
  "La autora cuenta también con el alta como operadora UAS en AESA — el registro de operador corresponde siempre a una persona (física o jurídica), nunca al propio dron —, con su número de operador ya asignado para poder volarlo y hacer las pruebas oportunas.",
  "Ese número de operador va identificado sobre el chasis del dron y, como práctica añadida para una trazabilidad completa del equipo, también en el propio mando de control.",
  (
    <>
      Dron asegurado con responsabilidad civil a través de la licencia federativa de la{" "}
      <a
        href="https://www.aereamadrid.es/afiliacion-y-licencias/"
        target="_blank"
        rel="noreferrer"
        className={LINK_CLASS}
      >
        Federación Aérea de Madrid
      </a>{" "}
      (aeromodelismo), en la que la autora se ha federado expresamente para las pruebas
      del proyecto.
    </>
  ),
  "Módulo de identificación remota (Remote ID) incorporado, conforme al estándar EN 4709-002 exigido a los drones sin marcado de clase.",
  "Consulta de ENAIRE Drones antes de cada vuelo de prueba, para descartar restricciones sobre la zona.",
];

export default function NormativaPage() {
  return (
    <>
      <PageHero
        eyebrow="Proyecto · Normativa y legislación"
        breadcrumbs={[
          { label: "Inicio", href: "/" },
          { label: "Proyecto", href: "/proyecto" },
          { label: "Normativa y legislación" },
        ]}
        title="Volar dentro de la ley: la normativa UAS aplicada"
        description="Un dron de más de 250 gramos no es un juguete a ojos de la ley: exige certificarse, registrarse, identificar el equipo y consultar el espacio aéreo antes de cada vuelo. Dentro de este TFG se ha puesto especial cuidado en analizar toda la normativa existente y cumplirla — tanto la de telecomunicaciones (las frecuencias de radio empleadas) como la específica de vuelo y las características exigidas al propio dron. Así es como Guardian Eye cumple, paso a paso, con la normativa europea y española."
        tone="signal"
        underConstruction
        image={{
          src: IMAGES.droneInspectorField.src,
          alt: IMAGES.droneInspectorField.alt,
          objectPosition: "68% 55%",
        }}
      />

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="El marco regulatorio"
            title="Quién regula qué: EASA, AESA y ENAIRE"
            description="Tres siglas distintas, tres papeles distintos. Ninguna sustituye a las otras dos — se complementan."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {AUTHORITIES.map((a) => {
              const Icon = a.icon;
              return (
                <div key={a.title} className="rounded-2xl border border-line bg-paper p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-signal-soft text-signal-ink">
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <p className="mt-4 text-[15px] font-bold text-ink">{a.title}</p>
                  <p className="font-telemetry text-[10.5px] uppercase text-ink-faint">
                    {a.subtitle}
                  </p>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-ink-muted">{a.text}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-20">
            <SectionHeading
              eyebrow="Las tres categorías"
              title="Dónde encaja un dron como este"
              description="La normativa europea clasifica cualquier operación con UAS en tres categorías según su riesgo. Guardian Eye vuela en la categoría abierta."
            />
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {CATEGORIES.map((c) => (
                <div
                  key={c.title}
                  className={
                    c.active
                      ? "rounded-2xl border border-accent/30 bg-accent-soft p-6"
                      : "rounded-2xl border border-line bg-surface p-6"
                  }
                >
                  <p className="text-[15px] font-bold text-ink">
                    Categoría {c.title}
                    {c.active && (
                      <span className="ml-2 font-telemetry text-[10px] uppercase text-accent">
                        · esta
                      </span>
                    )}
                  </p>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-ink-muted">{c.text}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-line bg-paper p-6">
              <p className="text-[13.5px] font-bold text-ink">
                Dentro de la abierta: A1, A2 y A3
              </p>
              <p className="mt-2 text-[13.5px] leading-relaxed text-ink-muted">
                La categoría abierta se divide a su vez en tres subcategorías según la
                distancia a las personas: <span className="font-medium text-ink">A1</span>{" "}
                permite volar cerca de personas, siempre sin sobrevolar aglomeraciones;{" "}
                <span className="font-medium text-ink">A2</span> permite acercarse aún más,
                pero exige un certificado adicional; y{" "}
                <span className="font-medium text-ink">A3</span> exige volar lejos de
                personas y de núcleos urbanos. Un dron &ldquo;legado&rdquo; de más de 250 g
                como el de este proyecto —sin marcado de clase C0-C4— opera bajo el
                certificado combinado A1/A3, la formación que cubre ambas subcategorías.
              </p>
            </div>
          </div>

          <div className="mt-20">
            <SectionHeading
              eyebrow="Paso a paso"
              title="Lo que exige la ley antes de despegar"
              description="Seis obligaciones concretas, no una declaración de intenciones. Cada una tiene su propio trámite y su propia justificación de seguridad."
            />
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {CHECKLIST.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="rounded-2xl border border-line bg-paper p-6">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent">
                      <Icon className="h-5 w-5" strokeWidth={1.75} />
                    </span>
                    <p className="mt-4 text-[14px] font-bold text-ink">{item.title}</p>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-ink-muted">
                      {item.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-20 rounded-3xl border border-line bg-ink p-8 sm:p-10">
            <h3 className="text-[20px] font-extrabold leading-tight text-white">
              Cómo cumple Guardian Eye
            </h3>
            <p className="mt-2 max-w-2xl text-[13.5px] leading-relaxed text-white/70">
              No es una declaración de buenas intenciones: cada punto de la lista anterior
              tiene su equivalente ya resuelto en el proyecto.
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {COMPLIANCE.map((line, i) => (
                <li key={i} className="flex items-start gap-2.5 rounded-xl border border-white/10 bg-white/5 p-4">
                  <CheckCircle2 className="mt-0.5 h-4.5 w-4.5 shrink-0 text-accent" strokeWidth={1.75} />
                  <span className="text-[13.5px] leading-relaxed text-white/85">{line}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-6 text-[11.5px] leading-relaxed text-ink-faint">
            Esta página resume la normativa aplicada al proyecto con fines divulgativos y no
            sustituye a la consulta directa de la sede electrónica de AESA ni a asesoramiento
            legal — la normativa UAS cambia con cierta frecuencia y conviene verificar
            siempre la versión vigente antes de operar.
          </p>

          <SubpageNav
            hub={{ label: "Volver a Proyecto", href: "/proyecto" }}
            prev={{ label: "Filosofía", href: "/proyecto/filosofia" }}
          />
        </div>
      </section>
    </>
  );
}
