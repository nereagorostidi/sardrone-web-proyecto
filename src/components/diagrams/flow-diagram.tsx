"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

export type FlowStep = {
  id: string;
  label: string;
  detail: string;
  icon: ReactNode;
  /** Small pill pinned to the top-right corner of the card (e.g. "↻ reintenta si falla") */
  badge?: string;
};

export type FlowGroup = {
  label: string;
  icon: ReactNode;
  /** ids of the steps that belong to this group — must be contiguous within `steps` */
  stepIds: string[];
};

type Block =
  | { type: "single"; step: FlowStep }
  | { type: "group"; group: FlowGroup; steps: FlowStep[] };

function blockLength(block: Block): number {
  return block.type === "single" ? 1 : block.steps.length;
}

function withStartIndex(blocks: Block[]): { block: Block; startIndex: number }[] {
  const result: { block: Block; startIndex: number }[] = [];
  let cursor = 0;
  for (const block of blocks) {
    result.push({ block, startIndex: cursor });
    cursor += blockLength(block);
  }
  return result;
}

function buildBlocks(steps: FlowStep[], groups?: FlowGroup[]): Block[] {
  if (!groups || groups.length === 0) {
    return steps.map((step) => ({ type: "single", step }));
  }
  const stepIdToGroup = new Map<string, FlowGroup>();
  for (const group of groups) {
    for (const id of group.stepIds) stepIdToGroup.set(id, group);
  }
  const blocks: Block[] = [];
  for (const step of steps) {
    const group = stepIdToGroup.get(step.id);
    const last = blocks[blocks.length - 1];
    if (group && last?.type === "group" && last.group === group) {
      last.steps.push(step);
    } else if (group) {
      blocks.push({ type: "group", group, steps: [step] });
    } else {
      blocks.push({ type: "single", step });
    }
  }
  return blocks;
}

function StepCard({ step, delay, compact }: { step: FlowStep; delay: number; compact?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.45, delay }}
      className={`relative flex flex-1 flex-col items-center rounded-2xl border border-line text-center ${
        compact ? "bg-surface p-4" : "bg-paper p-5"
      }`}
    >
      {step.badge && (
        <span className="font-telemetry absolute -top-2.5 right-2.5 rounded-full border border-signal/30 bg-signal-soft px-2 py-0.5 text-[9px] font-bold uppercase text-signal-ink">
          {step.badge}
        </span>
      )}
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent [&_svg]:h-5 [&_svg]:w-5">
        {step.icon}
      </span>
      <span className="mt-3 text-[13.5px] font-bold text-ink">{step.label}</span>
      <span className="mt-1 text-[12px] leading-snug text-ink-muted">{step.detail}</span>
    </motion.div>
  );
}

function Connector({ delay, note }: { delay: number; note?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.3, delay }}
      className="flex shrink-0 flex-col items-center justify-center gap-1 px-1 py-2 text-ink-faint"
    >
      <ArrowRight className="h-4 w-4 rotate-90 lg:rotate-0" strokeWidth={2} />
      {note && (
        <span className="font-telemetry whitespace-nowrap text-[9.5px] uppercase leading-none text-ink-faint">
          {note}
        </span>
      )}
    </motion.div>
  );
}

export function FlowDiagram({
  steps,
  groups,
  connectorNotes,
}: {
  steps: FlowStep[];
  /** Optional labeled bounding boxes around contiguous runs of steps (e.g. "AWS Cloud" vs. "Raspberry Pi") */
  groups?: FlowGroup[];
  /** Optional note shown under the arrow right after a given step id (e.g. { mqtt: "Internet / 4G" }) */
  connectorNotes?: Record<string, string>;
}) {
  const blocks = withStartIndex(buildBlocks(steps, groups));

  return (
    <div className="flex flex-col items-stretch gap-2 lg:flex-row lg:items-stretch lg:gap-0">
      {blocks.map(({ block, startIndex }, bi) => {
        const isLastBlock = bi === blocks.length - 1;

        if (block.type === "single") {
          const delay = startIndex * 0.12;
          const lastStepId = block.step.id;
          return (
            <div key={block.step.id} className="flex flex-1 items-center gap-2 lg:gap-0">
              <StepCard step={block.step} delay={delay} />
              {!isLastBlock && <Connector delay={delay + 0.2} note={connectorNotes?.[lastStepId]} />}
            </div>
          );
        }

        const groupStartIndex = startIndex;
        const lastStepId = block.steps[block.steps.length - 1].id;
        const afterGroupDelay = (groupStartIndex + block.steps.length) * 0.12;

        return (
          <div key={block.group.label} className="flex flex-1 items-stretch gap-2 lg:gap-0">
            <div className="flex flex-1 flex-col rounded-3xl border border-dashed border-line bg-surface/60 p-3">
              <p className="mb-3 flex items-center justify-center gap-1.5 text-[10.5px] font-bold uppercase tracking-wide text-ink-muted [&_svg]:h-3.5 [&_svg]:w-3.5">
                {block.group.icon}
                {block.group.label}
              </p>
              <div className="flex flex-1 flex-col items-stretch gap-2 sm:flex-row sm:items-center">
                {block.steps.map((step, i) => (
                  <div key={step.id} className="flex flex-1 items-center gap-2 sm:gap-0">
                    <StepCard step={step} delay={(groupStartIndex + i) * 0.12} compact />
                    {i < block.steps.length - 1 && (
                      <Connector delay={(groupStartIndex + i) * 0.12 + 0.2} />
                    )}
                  </div>
                ))}
              </div>
            </div>
            {!isLastBlock && (
              <Connector delay={afterGroupDelay} note={connectorNotes?.[lastStepId]} />
            )}
          </div>
        );
      })}
    </div>
  );
}
