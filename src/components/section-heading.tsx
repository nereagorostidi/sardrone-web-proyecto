import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "ink",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "ink" | "white";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "font-telemetry mb-3 text-[11px] uppercase",
            tone === "white" ? "text-white/70" : "text-accent"
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "text-balance text-[28px] font-extrabold leading-[1.12] tracking-tight sm:text-[34px]",
          tone === "white" ? "text-white" : "text-ink"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 text-[15.5px] leading-relaxed",
            tone === "white" ? "text-white/80" : "text-ink-muted"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
