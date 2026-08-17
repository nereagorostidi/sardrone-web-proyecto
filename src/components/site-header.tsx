"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronDown, Home, Radar } from "lucide-react";
import { cn } from "@/lib/utils";
import { LANDING_URL, NAV_ITEMS } from "@/lib/site-config";
import { MobileNav } from "@/components/mobile-nav";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-line bg-paper/85 backdrop-blur-lg"
          : "border-b border-transparent bg-gradient-to-b from-ink/35 via-ink/5 to-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-2.5">
          <span
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-full border transition-colors",
              scrolled
                ? "border-line bg-surface text-accent"
                : "border-white/30 bg-white/10 text-white backdrop-blur-sm"
            )}
          >
            <Radar className="h-4.5 w-4.5" strokeWidth={2} />
          </span>
          <span className="flex flex-col leading-none">
            <span
              className={cn(
                "flex items-center gap-1.5 text-[15px] font-extrabold tracking-tight",
                scrolled ? "text-ink" : "text-white"
              )}
            >
              <Home className="h-3.5 w-3.5" strokeWidth={2.5} />
              Guardian&nbsp;Eye
            </span>
            <span
              className={cn(
                "font-telemetry text-[9.5px] uppercase",
                scrolled ? "text-ink-muted" : "text-white/70"
              )}
            >
              TFG · Telecomunicaciones
            </span>
          </span>
        </Link>

        <NavigationMenu.Root
          delayDuration={80}
          className="relative hidden lg:flex"
        >
          <NavigationMenu.List className="flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const active = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <NavigationMenu.Item key={item.href}>
                  {item.children ? (
                    <>
                      <NavigationMenu.Trigger
                        className={cn(
                          "group/trigger flex items-center gap-1 rounded-full px-3.5 py-2 text-[13.5px] font-medium outline-none transition-colors",
                          scrolled
                            ? "text-ink-muted hover:text-ink data-[state=open]:text-ink"
                            : "text-white/85 hover:text-white data-[state=open]:text-white",
                          active && (scrolled ? "text-ink" : "text-white")
                        )}
                      >
                        {item.label}
                        <ChevronDown
                          className="h-3.5 w-3.5 transition-transform duration-200 group-data-[state=open]/trigger:rotate-180"
                          strokeWidth={2}
                        />
                      </NavigationMenu.Trigger>
                      <NavigationMenu.Content className="absolute left-0 top-full w-[340px] pt-3 data-[motion=from-start]:animate-in data-[motion=from-start]:fade-in data-[motion=from-start]:slide-in-from-left-2">
                        <div className="overflow-hidden rounded-2xl border border-line bg-paper shadow-[var(--shadow-lift)]">
                          <div className="border-b border-line bg-surface px-4 py-2.5 font-telemetry text-[10px] uppercase text-ink-faint">
                            Sec. {item.eyebrow} · {item.label}
                          </div>
                          <ul className="p-2">
                            {item.children.map((child) => (
                              <li key={child.href}>
                                <NavigationMenu.Link asChild>
                                  <Link
                                    href={child.href}
                                    className="block rounded-xl px-3 py-2.5 transition-colors hover:bg-surface"
                                  >
                                    <span className="block text-[13.5px] font-semibold text-ink">
                                      {child.label}
                                    </span>
                                    <span className="mt-0.5 block text-[12.5px] leading-snug text-ink-muted">
                                      {child.description}
                                    </span>
                                  </Link>
                                </NavigationMenu.Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </NavigationMenu.Content>
                    </>
                  ) : (
                    <NavigationMenu.Link asChild>
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center rounded-full px-3.5 py-2 text-[13.5px] font-medium transition-colors",
                          scrolled
                            ? "text-ink-muted hover:text-ink"
                            : "text-white/85 hover:text-white",
                          active && (scrolled ? "text-ink" : "text-white")
                        )}
                      >
                        {item.label}
                      </Link>
                    </NavigationMenu.Link>
                  )}
                </NavigationMenu.Item>
              );
            })}
          </NavigationMenu.List>

          <div className="absolute left-0 top-full flex justify-center perspective-[2000px]">
            <NavigationMenu.Viewport className="relative mt-0 origin-top-center" />
          </div>
        </NavigationMenu.Root>

        <div className="flex items-center gap-2">
          <a
            href={LANDING_URL}
            target="_blank"
            rel="noreferrer"
            className={cn(
              "btn-gradient hidden items-center gap-1.5 rounded-full px-4 py-2 text-[13px] font-semibold text-white shadow-sm transition-transform hover:-translate-y-0.5 sm:inline-flex"
            )}
          >
            Apoyar el proyecto
            <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.5} />
          </a>
          <MobileNav scrolled={scrolled} />
        </div>
      </div>
    </header>
  );
}
