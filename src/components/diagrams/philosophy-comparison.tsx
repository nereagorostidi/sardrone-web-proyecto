"use client";

import { motion } from "framer-motion";
import { Lock, LockOpen, X, Check } from "lucide-react";

const CLOSED = [
  "Hardware propietario",
  "Firmware cifrado",
  "Datos limitados",
  "API restringida",
];

const OPEN = [
  "Hardware modular",
  "Software personalizado",
  "Protección térmica de la electrónica a medida (gestión de temperatura de la placa)",
  "Acceso total a los datos",
  "Integración ilimitada",
];

export function PhilosophyComparison() {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5 }}
        className="rounded-3xl border border-line bg-surface p-7"
      >
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ink-faint/15 text-ink-muted">
            <Lock className="h-5 w-5" strokeWidth={1.75} />
          </span>
          <div>
            <p className="font-telemetry text-[10px] uppercase text-ink-faint">Opción descartada</p>
            <h3 className="text-[17px] font-bold text-ink">Caja negra / cerrado</h3>
          </div>
        </div>
        <ul className="mt-6 space-y-3">
          {CLOSED.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-[14px] text-ink-muted">
              <X className="mt-0.5 h-4 w-4 shrink-0 text-ink-faint" strokeWidth={2} />
              {item}
            </li>
          ))}
        </ul>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5, delay: 0.12 }}
        className="rounded-3xl border border-accent/30 bg-gradient-to-br from-accent-soft to-paper p-7 shadow-[var(--shadow-soft)]"
      >
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent/15 text-accent">
            <LockOpen className="h-5 w-5" strokeWidth={1.75} />
          </span>
          <div>
            <p className="font-telemetry text-[10px] uppercase text-accent">Guardian Eye</p>
            <h3 className="text-[17px] font-bold text-ink">Arquitectura abierta / programable</h3>
          </div>
        </div>
        <ul className="mt-6 space-y-3">
          {OPEN.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-[14px] font-medium text-ink">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" strokeWidth={2.25} />
              {item}
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}
