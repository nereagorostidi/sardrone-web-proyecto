"use client";

import Image from "next/image";
import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { Clock, Play, X } from "lucide-react";
import type { SiteImage } from "@/lib/images";

export type MediaItem = {
  id: string;
  title: string;
  description: string;
  poster: SiteImage;
  tag: string;
  videoUrl?: string;
  youtubeId?: string;
  featured?: boolean;
};

export function MediaGallery({ items }: { items: MediaItem[] }) {
  const [active, setActive] = useState<MediaItem | null>(null);

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <motion.button
            key={item.id}
            onClick={() => setActive(item)}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4 }}
            className={`group relative overflow-hidden rounded-2xl border border-line text-left ${
              item.featured ? "sm:col-span-2 sm:row-span-2" : ""
            }`}
          >
            <div className={`relative w-full ${item.featured ? "aspect-[16/11]" : "aspect-[4/3]"}`}>
              <Image
                src={item.poster.src}
                alt={item.poster.alt}
                fill
                sizes={item.featured ? "(min-width: 1024px) 55vw, 100vw" : "(min-width: 1024px) 28vw, 100vw"}
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
              <span className="absolute right-3 top-3 rounded-full bg-white/15 px-2.5 py-1 font-telemetry text-[9.5px] uppercase text-white backdrop-blur">
                {item.tag}
              </span>
              <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ink shadow-[var(--shadow-lift)] transition-transform group-hover:scale-110">
                <Play className="ml-0.5 h-5 w-5" fill="currentColor" strokeWidth={0} />
              </span>
              <div className="absolute inset-x-0 bottom-0 p-4">
                <p className="text-[14px] font-bold text-white">{item.title}</p>
                <p className="mt-1 line-clamp-2 text-[12px] leading-snug text-white/75">
                  {item.description}
                </p>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <Dialog.Root open onOpenChange={(o) => !o && setActive(null)}>
            <Dialog.Portal forceMount>
              <Dialog.Overlay asChild forceMount>
                <motion.div
                  className="fixed inset-0 z-[80] bg-ink/70 backdrop-blur-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              </Dialog.Overlay>
              <Dialog.Content asChild forceMount>
                <motion.div
                  initial={{ opacity: 0, scale: 0.96, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: 12 }}
                  transition={{ duration: 0.25 }}
                  className="fixed left-1/2 top-1/2 z-[90] w-[92vw] max-w-2xl -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl border border-line bg-paper shadow-2xl"
                >
                  <Dialog.Title className="sr-only">{active.title}</Dialog.Title>
                  <div className="relative aspect-video w-full bg-ink">
                    {active.youtubeId ? (
                      <iframe
                        src={`https://www.youtube-nocookie.com/embed/${active.youtubeId}`}
                        title={active.title}
                        className="h-full w-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : active.videoUrl ? (
                      <video
                        src={active.videoUrl}
                        controls
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <>
                        <Image
                          src={active.poster.src}
                          alt={active.poster.alt}
                          fill
                          sizes="90vw"
                          className="object-cover opacity-40"
                        />
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
                          <Clock className="h-6 w-6 text-white/80" strokeWidth={1.75} />
                          <p className="max-w-sm text-[13.5px] leading-relaxed text-white/90">
                            Este contenido está pendiente de publicación. En cuanto esté
                            disponible el vídeo definitivo, sustituirá a este marcador.
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="p-6">
                    <p className="text-[15px] font-bold text-ink">{active.title}</p>
                    <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-muted">
                      {active.description}
                    </p>
                  </div>
                  <Dialog.Close asChild>
                    <button
                      aria-label="Cerrar"
                      className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-ink/60 text-white backdrop-blur"
                    >
                      <X className="h-4.5 w-4.5" strokeWidth={2} />
                    </button>
                  </Dialog.Close>
                </motion.div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        )}
      </AnimatePresence>
    </>
  );
}
