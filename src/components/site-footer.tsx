import Link from "next/link";
import { ArrowUpRight, Radar } from "lucide-react";
import { LANDING_URL } from "@/lib/site-config";

const FOOTER_LINKS: { heading: string; links: { label: string; href: string }[] }[] = [
  {
    heading: "Proyecto",
    links: [
      { label: "Introducción", href: "/proyecto#introduccion" },
      { label: "Objetivos", href: "/proyecto#objetivos" },
      { label: "Filosofía", href: "/proyecto#filosofia" },
    ],
  },
  {
    heading: "Arquitectura",
    links: [
      { label: "Comunicaciones", href: "/arquitectura#comunicaciones" },
      { label: "Hardware", href: "/arquitectura#hardware" },
      { label: "Software & Cloud", href: "/arquitectura#software" },
    ],
  },
  {
    heading: "Explorar",
    links: [
      { label: "Inteligencia Artificial", href: "/ia" },
      { label: "Multimedia", href: "/multimedia" },
      { label: "Impacto y futuro", href: "/impacto" },
      { label: "Colaboradores", href: "/colaboradores" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-paper text-accent">
                <Radar className="h-4.5 w-4.5" strokeWidth={2} />
              </span>
              <span className="text-[15px] font-extrabold tracking-tight text-ink">
                Guardian Eye
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-[13.5px] leading-relaxed text-ink-muted">
              Documentación técnica de un sistema autónomo de dron SAR, desarrollado como
              Trabajo de Fin de Grado en Ingeniería de Telecomunicaciones.
            </p>
            <div className="mt-6 rounded-2xl border border-line bg-paper p-4">
              <p className="font-telemetry text-[10px] uppercase text-ink-faint">
                Micromecenazgo
              </p>
              <p className="mt-1.5 text-[13px] leading-relaxed text-ink-muted">
                ¿Quieres colaborar con material, patrocinio o vídeos de entrenamiento?
              </p>
              <a
                href={LANDING_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-[12.5px] font-semibold text-white transition-transform hover:-translate-y-0.5"
              >
                Apoyar el proyecto
                <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.5} />
              </a>
            </div>
          </div>

          {FOOTER_LINKS.map((col) => (
            <div key={col.heading}>
              <p className="font-telemetry text-[10.5px] uppercase text-ink-faint">
                {col.heading}
              </p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[13.5px] text-ink-muted transition-colors hover:text-ink"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 text-[12px] text-ink-faint sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Guardian Eye · TFG Ingeniería de Telecomunicaciones.</p>
          <p className="font-telemetry uppercase">
            RF&nbsp;2.4GHz · TLM&nbsp;915MHz · 4G/LTE
          </p>
        </div>
      </div>
    </footer>
  );
}
