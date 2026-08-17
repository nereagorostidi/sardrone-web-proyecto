import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type Breadcrumb = { label: string; href?: string };

export type HeroBackgroundImage = {
  src: string;
  alt: string;
  objectPosition?: string;
};

export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumbs,
  tone = "accent",
  underConstruction = false,
  image,
}: {
  eyebrow: string;
  title: string;
  description: string;
  breadcrumbs?: Breadcrumb[];
  tone?: "accent" | "signal";
  underConstruction?: boolean;
  image?: HeroBackgroundImage;
}) {
  return (
    <header className="relative overflow-hidden border-b border-line bg-surface pt-32 pb-16">
      {image ? (
        <>
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: image.objectPosition ?? "85% 35%" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/85 to-surface/15" />
        </>
      ) : (
        <div className="mesh-bg-hero absolute inset-0" />
      )}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav
            aria-label="Ruta de navegación"
            className="mb-5 flex flex-wrap items-center gap-1.5 text-[12.5px] font-medium text-ink-muted"
          >
            {breadcrumbs.map((crumb, i) => (
              <span key={crumb.label} className="flex items-center gap-1.5">
                {i > 0 && <ChevronRight className="h-3.5 w-3.5 text-ink-faint" strokeWidth={2} />}
                {crumb.href ? (
                  <Link href={crumb.href} className="transition-colors hover:text-ink">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-ink">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
        <p
          className={cn(
            "font-telemetry inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] uppercase",
            tone === "signal"
              ? "border-signal/30 bg-signal-soft text-signal-ink"
              : "border-accent/30 bg-accent-soft text-accent-ink"
          )}
        >
          {eyebrow}
        </p>
        <h1 className="mt-4 max-w-2xl text-balance text-[36px] font-extrabold leading-[1.1] tracking-tight text-ink sm:text-[46px]">
          {title}
        </h1>
        <p className="mt-4 max-w-xl text-[15.5px] leading-relaxed text-ink-muted">
          {description}
        </p>
        {underConstruction && (
          <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-signal/30 bg-signal-soft px-3.5 py-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
            </span>
            <span className="font-telemetry text-[10.5px] uppercase text-signal-ink">
              Página en construcción · contenido y diseño en revisión
            </span>
          </div>
        )}
      </div>
    </header>
  );
}
