"use client";

import { useState } from "react";
import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import type { SiteImage } from "@/lib/images";

type Photo = {
  image: SiteImage;
  caption: string;
};

export function PhotoLightboxGrid({ photos }: { photos: Photo[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const active = activeIndex !== null ? photos[activeIndex] : null;

  return (
    <>
      <div className="grid gap-3 sm:grid-cols-3">
        {photos.map((photo, i) => (
          <button
            key={photo.image.src}
            type="button"
            onClick={() => setActiveIndex(i)}
            className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-line"
          >
            <Image
              src={photo.image.src}
              alt={photo.image.alt}
              fill
              sizes="(min-width: 640px) 32vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-ink/0 transition-colors group-hover:bg-ink/20" />
            <span className="absolute right-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-full bg-white/85 text-ink opacity-0 shadow-sm transition-opacity group-hover:opacity-100">
              <ZoomIn className="h-4 w-4" strokeWidth={2} />
            </span>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <Dialog.Root open onOpenChange={(o) => !o && setActiveIndex(null)}>
            <Dialog.Portal forceMount>
              <Dialog.Overlay asChild forceMount>
                <motion.div
                  className="fixed inset-0 z-[80] bg-ink/80 backdrop-blur-sm"
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
                  <Dialog.Title className="sr-only">{active.caption}</Dialog.Title>
                  <div className="relative aspect-[4/3] w-full bg-ink">
                    <Image
                      src={active.image.src}
                      alt={active.image.alt}
                      fill
                      sizes="90vw"
                      className="object-contain"
                    />
                  </div>
                  <div className="p-5">
                    <p className="text-[13.5px] leading-relaxed text-ink-muted">{active.caption}</p>
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
