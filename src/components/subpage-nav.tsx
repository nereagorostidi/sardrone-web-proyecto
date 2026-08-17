import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

type NavTarget = { label: string; href: string };

export function SubpageNav({
  prev,
  next,
  hub,
}: {
  prev?: NavTarget;
  next?: NavTarget;
  hub: NavTarget;
}) {
  return (
    <nav
      aria-label="Navegación entre secciones"
      className="mt-16 flex flex-col gap-3 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between"
    >
      {prev ? (
        <Link
          href={prev.href}
          className="group inline-flex items-center gap-2 text-[13.5px] font-semibold text-ink-muted transition-colors hover:text-ink"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" strokeWidth={2.25} />
          {prev.label}
        </Link>
      ) : (
        <Link
          href="/"
          className="group inline-flex items-center gap-2 text-[13.5px] font-semibold text-ink-muted transition-colors hover:text-ink"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" strokeWidth={2.25} />
          Home
        </Link>
      )}
      <Link
        href={hub.href}
        className="inline-flex items-center justify-center rounded-full border border-line px-4 py-2 text-[12.5px] font-semibold text-ink-muted transition-colors hover:border-accent/40 hover:text-accent"
      >
        {hub.label}
      </Link>
      {next ? (
        <Link
          href={next.href}
          className="group inline-flex items-center gap-2 text-[13.5px] font-semibold text-ink-muted transition-colors hover:text-ink"
        >
          {next.label}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2.25} />
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
