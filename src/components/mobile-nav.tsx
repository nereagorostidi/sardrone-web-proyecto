"use client";

import Link from "next/link";
import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { LANDING_URL, NAV_ITEMS } from "@/lib/site-config";

export function MobileNav({ scrolled }: { scrolled: boolean }) {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          aria-label="Abrir menú"
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-full border transition-colors lg:hidden",
            scrolled
              ? "border-line text-ink"
              : "border-white/30 text-white bg-white/10 backdrop-blur-sm"
          )}
        >
          <Menu className="h-5 w-5" strokeWidth={2} />
        </button>
      </Dialog.Trigger>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <motion.div
                className="fixed inset-0 z-[60] bg-ink/40 backdrop-blur-sm lg:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            </Dialog.Overlay>
            <Dialog.Content asChild forceMount>
              <motion.div
                className="fixed inset-y-0 right-0 z-[70] flex h-full w-full max-w-sm flex-col bg-paper shadow-2xl lg:hidden"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", stiffness: 320, damping: 32 }}
              >
                <Dialog.Title className="sr-only">Menú de navegación</Dialog.Title>
                <div className="flex items-center justify-between border-b border-line px-5 py-4">
                  <span className="font-telemetry text-[11px] uppercase text-ink-faint">
                    Navegación
                  </span>
                  <Dialog.Close asChild>
                    <button
                      aria-label="Cerrar menú"
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink"
                    >
                      <X className="h-4.5 w-4.5" strokeWidth={2} />
                    </button>
                  </Dialog.Close>
                </div>

                <nav className="flex-1 overflow-y-auto px-3 py-3">
                  <Link
                    href="/"
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-3 py-3 text-[15px] font-semibold text-ink hover:bg-surface"
                  >
                    Inicio
                  </Link>
                  {NAV_ITEMS.map((item) => (
                    <div key={item.href} className="border-t border-line/70 first:border-t-0">
                      {item.children ? (
                        <div>
                          <button
                            onClick={() =>
                              setExpanded(expanded === item.href ? null : item.href)
                            }
                            className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-[15px] font-semibold text-ink hover:bg-surface"
                            aria-expanded={expanded === item.href}
                          >
                            {item.label}
                            <ChevronDown
                              className={cn(
                                "h-4 w-4 transition-transform duration-200",
                                expanded === item.href && "rotate-180"
                              )}
                            />
                          </button>
                          <AnimatePresence initial={false}>
                            {expanded === item.href && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.22, ease: "easeInOut" }}
                                className="overflow-hidden"
                              >
                                <div className="pb-2 pl-3">
                                  {!item.children.some((child) => child.href === item.href) && (
                                    <Link
                                      href={item.href}
                                      onClick={() => setOpen(false)}
                                      className="mb-1 block rounded-lg px-3 py-2 text-[13px] font-medium text-accent"
                                    >
                                      Ver página completa →
                                    </Link>
                                  )}
                                  {item.children.map((child) => (
                                    <Link
                                      key={child.href}
                                      href={child.href}
                                      onClick={() => setOpen(false)}
                                      className="block rounded-lg px-3 py-2.5 text-[13.5px] text-ink-muted hover:bg-surface hover:text-ink"
                                    >
                                      {child.label}
                                    </Link>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <Link
                          href={item.href}
                          onClick={() => setOpen(false)}
                          className="block rounded-xl px-3 py-3 text-[15px] font-semibold text-ink hover:bg-surface"
                        >
                          {item.label}
                        </Link>
                      )}
                    </div>
                  ))}
                </nav>

                <div className="border-t border-line p-4">
                  <a
                    href={LANDING_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-gradient flex w-full items-center justify-center gap-1.5 rounded-full px-4 py-3 text-[14px] font-semibold text-white"
                  >
                    Apoyar el proyecto
                    <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
                  </a>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
