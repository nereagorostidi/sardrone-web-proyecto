import Link from "next/link";
import { Mail, Radar } from "lucide-react";
import { siGithub } from "simple-icons";
import { BrandIcon } from "@/components/brand-icon";

const SOCIAL_LINKS = [
  {
    label: "GitHub",
    ariaLabel: "GitHub de Nerea Gorostidi",
    href: "https://github.com/nereagorostidi",
    icon: <BrandIcon path={siGithub.path} className="h-4 w-4" />,
  },
  {
    label: "LinkedIn",
    ariaLabel: "LinkedIn de Nerea Gorostidi",
    href: "https://www.linkedin.com/in/nereagorostidigarcia/",
    icon: (
      // eslint-disable-next-line @next/next/no-img-element
      <img src="/icons/linkedin.svg" alt="" className="h-4 w-4" />
    ),
  },
  {
    label: "Email",
    ariaLabel: "Enviar un email a Nerea Gorostidi",
    href: "mailto:nerea.gorostidi.garcia@gmail.com",
    icon: <Mail className="h-4 w-4" strokeWidth={1.75} />,
  },
];

const FOOTER_LINKS: { heading: string; links: { label: string; href: string }[] }[] = [
  {
    heading: "Proyecto",
    links: [
      { label: "Introducción", href: "/proyecto/introduccion" },
      { label: "Objetivos", href: "/proyecto/objetivos" },
      { label: "Metodología", href: "/proyecto/metodologia" },
      { label: "Filosofía", href: "/proyecto/filosofia" },
      { label: "Normativa y legislación", href: "/proyecto/normativa" },
    ],
  },
  {
    heading: "Arquitectura",
    links: [
      { label: "Comunicaciones", href: "/arquitectura/comunicaciones" },
      { label: "Hardware", href: "/arquitectura/hardware" },
      { label: "Software & Cloud", href: "/arquitectura/software" },
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
            <p className="mt-4 font-telemetry text-[10px] uppercase text-ink-faint">
              Nerea Gorostidi García
            </p>
            <div className="mt-3 flex flex-col gap-2">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target={social.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={social.href.startsWith("mailto:") ? undefined : "noreferrer"}
                  aria-label={social.ariaLabel}
                  className="group flex items-center gap-2.5 rounded-full border border-line bg-paper py-2 pl-3 pr-4 text-[13px] font-semibold text-ink transition-colors hover:border-accent/40 hover:text-accent"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center">
                    {social.icon}
                  </span>
                  {social.label}
                </a>
              ))}
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
