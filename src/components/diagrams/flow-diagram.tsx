"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

export type FlowStep = {
  id: string;
  label: string;
  detail: string;
  icon: ReactNode;
};

export function FlowDiagram({ steps }: { steps: FlowStep[] }) {
  return (
    <div className="flex flex-col items-stretch gap-2 lg:flex-row lg:items-center lg:gap-0">
      {steps.map((step, i) => (
        <div key={step.id} className="flex flex-1 items-center gap-2 lg:gap-0">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.45, delay: i * 0.12 }}
            className="flex flex-1 flex-col items-center rounded-2xl border border-line bg-paper p-5 text-center"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent [&_svg]:h-5 [&_svg]:w-5">
              {step.icon}
            </span>
            <span className="mt-3 text-[13.5px] font-bold text-ink">{step.label}</span>
            <span className="mt-1 text-[12px] leading-snug text-ink-muted">{step.detail}</span>
          </motion.div>
          {i < steps.length - 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.3, delay: i * 0.12 + 0.2 }}
              className="flex shrink-0 items-center justify-center px-1 py-2 text-ink-faint lg:rotate-0"
            >
              <ArrowRight className="h-4 w-4 rotate-90 lg:rotate-0" strokeWidth={2} />
            </motion.div>
          )}
        </div>
      ))}
    </div>
  );
}
