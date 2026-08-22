import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight, GraduationCap, HeartHandshake, Mail } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { PageHero } from "@/components/page-hero";
import { VideoLink } from "@/components/video-link";
import { PhotoLightboxGrid } from "@/components/photo-lightbox-grid";
import { IMAGES } from "@/lib/images";
import { LANDING_URL } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Colaboradores",
  description:
    "Agradecimientos a quienes han hecho posible Guardian Eye — con mención especial al Club Alas de Galapagar.",
};

export default function ColaboradoresPage() {
  return (
    <>
      <PageHero
        eyebrow="Sec. 07 · Colaboradores"
        title="Nadie construye esto en solitario"
        description="Un agradecimiento honesto a las personas y el club que han hecho posible pasar de la teoría al vuelo real."
        image={{ src: IMAGES.communitySupport.src, alt: IMAGES.communitySupport.alt }}
      />

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Por qué esta página existe"
            title="Un TFG que se apoye en la comunidad, llegará mucho más lejos"
            description="Diseñar, montar y validar en vuelo un sistema como este exige acceso a un club con seguro de vuelo, mentoría técnica y un lugar real donde probar hardware — pero también algo menos evidente: datos."
          />

          <p className="mt-6 max-w-3xl text-[15px] leading-relaxed text-ink-muted">
            Más allá del trabajo académico, un proyecto como este necesita recopilar
            una cantidad considerable de datos reales —vuelos, vídeo, condiciones de
            campo— algo muy difícil de lograr en solitario. El apoyo de aficionados a
            los drones, clubes de aeronáutica y particulares dispuestos a ayudar a
            recopilarlos, o a contribuir facilitando zonas de vuelo, material de
            apoyo o repuestos, marca una diferencia real — igual que las empresas
            dispuestas a ayudar a sufragar el material necesario. Esta página existe
            para reconocer y agradecer, con nombres y fechas, a quienes han
            contribuido con esas aportaciones —material, ayuda o tiempo— a las
            necesidades del proyecto.
          </p>
          <div className="mt-12 overflow-hidden rounded-3xl border border-accent/30 bg-gradient-to-br from-accent-soft to-paper">
            <div className="grid gap-8 p-8 sm:p-10 lg:grid-cols-[auto_1fr] lg:items-center">
              <span className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-accent/30 bg-paper">
                <Image
                  src="/images/club-alas-de-galapagar-logo.jpg"
                  alt="Logo del Club Alas de Galapagar, club de aeromodelismo y radiocontrol"
                  width={80}
                  height={80}
                  className="h-full w-full object-cover"
                />
              </span>
              <div>
                <p className="font-telemetry text-[11px] uppercase text-accent">
                  Colaborador destacado
                </p>
                <h2 className="mt-2 text-[24px] font-extrabold leading-tight text-ink sm:text-[28px]">
                  Club Alas de Galapagar
                </h2>
                <p className="mt-3 max-w-2xl text-[14.5px] leading-relaxed text-ink-muted">
                  El proyecto ha sido en gran parte posible por las facilidades
                  conseguidas como socia de este club de aeromodelismo. Sus{" "}
                  <VideoLink
                    youtubeId="2HKlq-o7WxM"
                    title="Club Alas de Galapagar"
                    className="font-medium text-accent underline underline-offset-2"
                  >
                    instalaciones
                  </VideoLink>{" "}
                  han acogido los vuelos reales de prueba y la recogida del dataset —
                  incluidas las imágenes con personas usadas para el pipeline de
                  detección grabadas allí mismo. El club da además acceso a una amplia
                  zona de vuelo homologada donde volar sin los problemas habituales de
                  solicitar permisos o toparse con zonas restringidas.
                </p>
                <p className="mt-3 max-w-2xl text-[14.5px] leading-relaxed text-ink-muted">
                  Mi agradecimiento especial al club por prestarme material diverso,
                  asesorarme en el vuelo de drones, y acogerme como un miembro más.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 overflow-hidden rounded-3xl border border-line bg-surface">
            <div className="grid gap-8 p-8 sm:p-10 lg:grid-cols-[auto_1fr] lg:items-center">
              <a
                href="https://europesip.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-20 w-44 shrink-0 items-center justify-center rounded-2xl border border-line bg-paper px-6 transition-colors hover:border-accent/40"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/europesip-logo-dark.svg"
                  alt="Logo de EuropeSIP"
                  className="h-8 w-auto"
                />
              </a>
              <div>
                <p className="font-telemetry text-[11px] uppercase text-ink-faint">
                  Patrocinador
                </p>
                <h2 className="mt-2 text-[24px] font-extrabold leading-tight text-ink sm:text-[28px]">
                  <a
                    href="https://europesip.com"
                    target="_blank"
                    rel="noreferrer"
                    className="transition-colors hover:text-accent"
                  >
                    EuropeSIP
                  </a>
                </h2>
                <p className="mt-3 max-w-2xl text-[14.5px] leading-relaxed text-ink-muted">
                  EuropeSIP es una empresa madrileña especializada en la{" "}
                  <a
                    href="https://europesip.com/es/europesip/soluciones/inteligencia-artificial/"
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium text-accent underline underline-offset-2"
                  >
                    IA Soberana
                  </a>
                  , con el despliegue de modelos de inteligencia artificial en
                  infraestructuras propias y bajo control local estricto. Esta
                  filosofía se alinea plenamente con Guardian Eye, cuya capacidad de
                  detección por visión artificial se ejecuta directamente a bordo
                  (Edge Computing), sin dependencias de la nube.
                </p>
                <p className="mt-3 max-w-2xl text-[14.5px] leading-relaxed text-ink-muted">
                  EuropeSIP identificó y formalizó su colaboración a través de nuestra{" "}
                  <a
                    href={LANDING_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium text-accent underline underline-offset-2"
                  >
                    página de crowdfunding
                  </a>
                  , sufragando el hardware crítico de desarrollo: un kit de desarrollo
                  Holybro, una Raspberry Pi y diversos componentes adicionales.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-20">
            <SectionHeading
              eyebrow="Personas"
              title="Mentores y Personas destacadas"
              description="Me gustaría mencionar especialmente a varias personas que me han ido ayudando a lo largo de este proyecto, compartiendo su experiencia y conocimiento, y ayudándome tanto en mis primeros vuelos como a conocer las particularidades de este interesante mundo."
            />

            <div className="mt-10 rounded-2xl border border-line bg-paper p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-surface text-accent">
                  <GraduationCap className="h-6 w-6" strokeWidth={1.5} />
                </span>
                <div>
                  <p className="text-[14.5px] font-bold text-ink">Daniel Díaz Sánchez</p>
                  <p className="mt-0.5 text-[12.5px] font-medium text-accent">
                    Tutor académico · Profesor de Aplicaciones Telemáticas, Universidad Carlos III de Madrid
                  </p>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-ink-muted">
                    Gracias por su disponibilidad, apoyo y sugerencias durante la redacción del TFG.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-line bg-paper p-6 sm:p-8">
              <p className="text-[14.5px] leading-relaxed text-ink-muted">
                <strong className="font-bold text-ink">Darco, Dani, Paco y José Manuel:</strong>{" "}
                un especial agradecimiento a ellos: a José Manuel y a Paco (Francisco), por
                enseñarme el Club Alas de Galapagar y acogerme en él; a Darco, su presidente,
                por enseñarme a soldar adecuadamente las piezas, a manejar el material, y por
                asesorarme en los vuelos; a Dani, por sus consejos; y especialmente a José
                Manuel, por guiarme en mi primer vuelo y por prestarme desinteresadamente su
                dron —construido personalmente por él hace unos años, con una controladora
                Naza y un práctico gimbal— por si pudiera usarlo de referencia.
              </p>
            </div>

            <div className="mt-6 overflow-hidden rounded-3xl border border-line bg-surface p-6 sm:p-8">
              <p className="font-telemetry text-[11px] uppercase text-accent">Mención especial</p>
              <h3 className="mt-2 text-[20px] font-extrabold leading-tight text-ink sm:text-[22px]">
                El dron de José Manuel
              </h3>
              <p className="mt-3 max-w-3xl text-[14.5px] leading-relaxed text-ink-muted">
                Para que no tuviera que afrontar un desembolso económico importante al empezar
                el proyecto, José Manuel me ofreció desinteresadamente su propio dron para que
                pudiera usarlo de referencia — de hecho, la idea inicial era desmontarlo y
                reaprovechar sus piezas para construir uno nuevo, algo que finalmente no hizo
                falta gracias a que conseguimos, a través de otro colaborador, el kit de
                desarrollo Holybro X500 V2. Finalmente, nos decidimos a montar el sistema sobre
                ese kit —entre otros motivos, porque el TFG buscaba construir el sistema
                completo desde cero, y porque su controladora de vuelo se ajustaba mejor a lo
                que necesitaba el proyecto—, pero quiero dejar constancia de lo útil que fue
                contar con su material como referencia en los primeros pasos: he aprendido
                mucho de ese montaje, qué tenía que tener en cuenta, qué piezas utilizar, cómo
                disponerlas, y cómo iban las cosas unidas. Se puede decir que este dron ha sido
                mi modelo para construir el posterior, y he pasado varios días estudiándolo y
                analizándolo.
              </p>
              <p className="mt-3 max-w-3xl text-[14.5px] leading-relaxed text-ink-muted">
                Creo que es importante darle a este dron el reconocimiento que se merece: lo
                construyó él mismo hace ya varios años y, aunque monta electrónica más antigua
                —como la controladora Naza—, está hecho con componentes de primera calidad,
                muchos de ellos (como sus potentes motores) serían la envidia de cualquier dron
                actual. El gimbal y el sistema de vídeo también son dignos de tener en cuenta
                (de hecho, José Manuel lo usaba para grabar bodas hace unos años), y todo ello
                fue construido en una época en la que, sin duda, el acceso a la información era
                mucho más limitado y complicado que ahora.
              </p>
              <div className="mt-6">
                <PhotoLightboxGrid
                  photos={[
                    {
                      image: IMAGES.joseManuelDroneFrontal,
                      caption:
                        "El dron de José Manuel, con su gimbal de cámara suspendido bajo el chasis.",
                    },
                    {
                      image: IMAGES.joseManuelDroneNaza,
                      caption:
                        "Detalle de su controladora de vuelo DJI Naza y el receptor de radio, con varios años de uso.",
                    },
                    {
                      image: IMAGES.joseManuelDroneGimbal,
                      caption: "Vista superior del dron, con la carcasa protectora del gimbal cerrada.",
                    },
                  ]}
                />
              </div>
            </div>
          </div>

          <div className="mt-16 flex items-start gap-4 rounded-2xl border border-line bg-surface p-6">
            <HeartHandshake className="mt-0.5 h-5 w-5 shrink-0 text-accent" strokeWidth={1.75} />
            <p className="text-[13.5px] leading-relaxed text-ink-muted">
              ¿Formas parte de un club de aeromodelismo, un grupo de emergencias o simplemente
              tienes experiencia en alguno de los campos del proyecto y quieres aportar? La
              colaboración se gestiona desde la landing corta de micromecenazgo — desde
              donaciones de material hasta el envío de vídeos aéreos para el dataset de
              entrenamiento.
            </p>
          </div>

          <div className="mt-6 grid gap-6 rounded-3xl border border-line bg-ink p-8 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="font-telemetry text-[10.5px] uppercase text-white/60">Autora</p>
              <p className="mt-2 text-[20px] font-extrabold text-white">Nerea Gorostidi García</p>
              <p className="mt-1 text-[13.5px] text-white/70">
                Ingeniería de Tecnologías de Telecomunicación · UC3M · TFG convocatoria 2026
              </p>
              <a
                href="mailto:nerea.gorostidi.garcia@gmail.com"
                className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-medium text-white/85 underline underline-offset-4"
              >
                <Mail className="h-3.5 w-3.5" /> nerea.gorostidi.garcia@gmail.com
              </a>
            </div>
            <a
              href={LANDING_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-3 text-[13.5px] font-semibold text-white transition-colors hover:bg-white/10"
            >
              Muro de transparencia de patrocinadores
              <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
            </a>
          </div>
          <p className="mt-3 text-[11.5px] text-ink-faint">
            El muro de patrocinadores aún no existe como sección propia en la landing corta
            — este enlace apunta allí a la espera de que se publique.
          </p>
        </div>
      </section>
    </>
  );
}
