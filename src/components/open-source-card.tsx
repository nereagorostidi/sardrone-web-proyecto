import { ArrowUpRight } from "lucide-react";
import { siGithub } from "simple-icons";
import { BrandIcon } from "@/components/brand-icon";

const OPEN_SOURCE_REPOS = [
  {
    href: "https://github.com/nereagorostidi/drone-edge-companion",
    title: "Edge Companion / IA",
    description: "Raspberry Pi 5 + Hailo-8L · YOLO a bordo",
  },
  {
    href: "https://github.com/nereagorostidi/drone-cloud-server",
    title: "Cloud Server",
    description: "Control y misión · Flask, MQTT, InfluxDB",
  },
];

export function OpenSourceCard() {
  return (
    <div className="overflow-hidden rounded-3xl border border-line bg-ink">
      <div className="grid gap-8 p-8 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12">
        <div>
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white">
            <BrandIcon path={siGithub.path} color="#ffffff" className="h-6 w-6" />
          </span>
          <h3 className="mt-4 text-[22px] font-extrabold leading-tight text-white sm:text-[26px]">
            Código abierto, de verdad
          </h3>
          <p className="mt-3 max-w-xl text-[14.5px] leading-relaxed text-white/70">
            Todo el software que hace volar y pensar a Guardian Eye es
            público y auditable, repartido en dos repositorios
            independientes disponibles en mi GitHub, junto a la documentacion del proyecto.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
          {OPEN_SOURCE_REPOS.map((repo) => (
            <a
              key={repo.href}
              href={repo.href}
              target="_blank"
              rel="noreferrer"
              className="group flex min-w-[240px] items-center justify-between gap-4 rounded-2xl border border-white/15 bg-white/5 px-5 py-4 transition-colors hover:bg-white/10"
            >
              <div>
                <p className="text-[13.5px] font-bold text-white">{repo.title}</p>
                <p className="mt-0.5 text-[12px] text-white/60">{repo.description}</p>
              </div>
              <ArrowUpRight
                className="h-4 w-4 shrink-0 text-white/70 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                strokeWidth={2.5}
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
