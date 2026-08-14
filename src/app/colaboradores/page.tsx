import type { Metadata } from "next";
import { ArrowUpRight, GraduationCap, Mail, PlaneTakeoff, ShieldCheck, UserCircle2 } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { LANDING_URL } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Colaboradores",
  description:
    "Agradecimientos a quienes han hecho posible Guardian Eye — con mención especial al Club Alas de Galapagar.",
};

const COLLABORATORS = [
  {
    name: "Darco",
    role: "Presidente del Club Alas de Galapagar",
    note: "Apoyo institucional del club al proyecto.",
  },
  {
    name: "Dani",
    role: "Mentor",
    note: "Acompañamiento técnico durante el desarrollo.",
  },
  {
    name: "Paco (Francisco)",
    role: "Contacto del club",
    note: "Coordinación de los vuelos de prueba en las instalaciones.",
  },
  {
    name: "José Manuel",
    role: "Acompañante de vuelo",
    note: "Presente en el primer vuelo real de referencia, 12 de julio de 2026.",
  },
];

export default function ColaboradoresPage() {
  return (
    <>
      <header className="border-b border-line bg-surface pt-32 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="font-telemetry text-[11px] uppercase text-accent">Sec. 06 · Colaboradores</p>
          <h1 className="mt-3 max-w-2xl text-balance text-[36px] font-extrabold leading-[1.1] tracking-tight text-ink sm:text-[46px]">
            Nadie construye esto en solitario
          </h1>
          <p className="mt-4 max-w-xl text-[15.5px] leading-relaxed text-ink-muted">
            Un agradecimiento honesto a las personas y el club que han hecho posible pasar
            de la teoría al vuelo real.
          </p>
        </div>
      </header>

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-3xl border border-accent/30 bg-gradient-to-br from-accent-soft to-paper">
            <div className="grid gap-8 p-8 sm:p-10 lg:grid-cols-[auto_1fr] lg:items-center">
              <span className="flex h-20 w-20 items-center justify-center rounded-2xl border border-accent/30 bg-paper text-accent">
                <PlaneTakeoff className="h-9 w-9" strokeWidth={1.5} />
              </span>
              <div>
                <p className="font-telemetry text-[11px] uppercase text-accent">
                  Colaborador destacado
                </p>
                <h2 className="mt-2 text-[24px] font-extrabold leading-tight text-ink sm:text-[28px]">
                  Club Alas de Galapagar
                </h2>
                <p className="mt-3 max-w-2xl text-[14.5px] leading-relaxed text-ink-muted">
                  El proyecto está registrado y asociado a este club de aeromodelismo, lo
                  que incluye el seguro obligatorio para volar. Sus instalaciones han
                  acogido los vuelos reales de prueba y la recogida del dataset —
                  incluidas las imágenes con personas usadas para el pipeline de
                  detección grabadas allí mismo.
                </p>
                <div className="mt-4 flex items-center gap-2 text-[12.5px] text-ink-faint">
                  <ShieldCheck className="h-4 w-4" strokeWidth={1.75} />
                  Logo del club: <span className="font-medium">[placeholder — pendiente de conseguir]</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-20">
            <SectionHeading
              eyebrow="Personas"
              title="Mentores y apoyos del club"
              description="Nombres ya publicados por la propia autora en el diario público del proyecto."
            />
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {COLLABORATORS.map((person) => (
                <div key={person.name} className="rounded-2xl border border-line bg-paper p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-surface text-ink-muted">
                    <UserCircle2 className="h-6 w-6" strokeWidth={1.5} />
                  </span>
                  <p className="mt-4 text-[14.5px] font-bold text-ink">{person.name}</p>
                  <p className="mt-0.5 text-[12.5px] font-medium text-accent">{person.role}</p>
                  <p className="mt-2 text-[12.5px] leading-relaxed text-ink-muted">{person.note}</p>
                </div>
              ))}
              <div className="flex flex-col justify-between rounded-2xl border border-dashed border-line bg-surface p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-paper text-ink-faint">
                  <GraduationCap className="h-6 w-6" strokeWidth={1.5} />
                </span>
                <div className="mt-4">
                  <p className="text-[14.5px] font-bold text-ink">Tutor/a académico/a</p>
                  <p className="mt-2 text-[12.5px] leading-relaxed text-ink-faint">
                    [placeholder — nombre pendiente de añadir]
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-20 grid gap-6 rounded-3xl border border-line bg-ink p-8 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center">
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
