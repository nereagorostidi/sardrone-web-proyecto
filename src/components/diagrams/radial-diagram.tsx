"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export type RadialNode = {
  id: string;
  label: string;
  description?: string;
  icon: ReactNode;
  colorVar: string;
};

type RadialDiagramProps = {
  centerLabel: string;
  centerSublabel?: string;
  centerIcon?: ReactNode;
  nodes: RadialNode[];
  startAngleDeg?: number;
};

const SIZE = 640;
const CX = SIZE / 2;
const CY = SIZE / 2;
const RADIUS = 226;
const NODE_R = 40;

function toXY(angleDeg: number, r: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: CX + r * Math.cos(rad), y: CY + r * Math.sin(rad) };
}

export function RadialDiagram({
  centerLabel,
  centerSublabel,
  centerIcon: CenterIcon,
  nodes,
  startAngleDeg = -90,
}: RadialDiagramProps) {
  const step = 360 / nodes.length;

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[560px]">
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="absolute inset-0 h-full w-full overflow-visible">
        <circle
          cx={CX}
          cy={CY}
          r={RADIUS}
          fill="none"
          stroke="var(--color-line)"
          strokeWidth={1.5}
          strokeDasharray="2 8"
        />
        {nodes.map((node, i) => {
          const angle = startAngleDeg + step * i;
          const { x, y } = toXY(angle, RADIUS);
          return (
            <g key={node.id}>
              <motion.line
                x1={CX}
                y1={CY}
                x2={x}
                y2={y}
                stroke={node.colorVar}
                strokeWidth={2}
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0.3 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.8, delay: i * 0.12, ease: "easeInOut" }}
              />
              <motion.circle
                cx={x}
                cy={y}
                r={4}
                fill={node.colorVar}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.3, delay: 0.75 + i * 0.12 }}
              />
            </g>
          );
        })}
      </svg>

      <motion.div
        className="absolute top-1/2 left-1/2 flex h-[150px] w-[150px] -translate-x-1/2 -translate-y-1/2 items-center justify-center"
        initial={{ opacity: 0, scale: 0.85 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.5 }}
      >
        <span className="animate-pulse-ring absolute h-full w-full rounded-full bg-accent-soft" />
        <span
          className="absolute h-full w-full rounded-full bg-accent-soft"
          style={{ animation: "pulse-ring 2.4s cubic-bezier(0.4, 0, 0.6, 1) infinite 1.2s" }}
        />
        <div className="relative flex h-[132px] w-[132px] flex-col items-center justify-center rounded-full border border-line bg-paper text-center shadow-[var(--shadow-lift)]">
          {CenterIcon && <span className="text-accent [&_svg]:h-7 [&_svg]:w-7">{CenterIcon}</span>}
          <span className="mt-1.5 px-2 text-[13.5px] font-bold leading-tight text-ink">
            {centerLabel}
          </span>
          {centerSublabel && (
            <span className="font-telemetry text-[9px] uppercase text-ink-faint">
              {centerSublabel}
            </span>
          )}
        </div>
      </motion.div>

      {nodes.map((node, i) => {
        const angle = startAngleDeg + step * i;
        const { x, y } = toXY(angle, RADIUS);
        const leftPct = (x / SIZE) * 100;
        const topPct = (y / SIZE) * 100;
        const cos = Math.cos((angle * Math.PI) / 180);
        const isLeft = cos < -0.3;
        const isRight = cos > 0.3;

        return (
          <motion.div
            key={node.id}
            className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
            style={{ left: `${leftPct}%`, top: `${topPct}%`, width: "clamp(84px, 23%, 150px)" }}
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.45, delay: 0.35 + i * 0.12 }}
          >
            <span
              className="flex h-12 w-12 items-center justify-center rounded-2xl border shadow-[var(--shadow-soft)] sm:h-[68px] sm:w-[68px]"
              style={{
                borderColor: node.colorVar,
                color: node.colorVar,
                backgroundColor: `color-mix(in oklab, ${node.colorVar} 10%, var(--color-paper))`,
              }}
            >
              <span className="[&_svg]:h-6 [&_svg]:w-6">{node.icon}</span>
            </span>
            <span
              className={`mt-2 text-[12.5px] font-semibold text-ink ${
                isLeft ? "text-right" : isRight ? "text-left" : "text-center"
              }`}
            >
              {node.label}
            </span>
            {node.description && (
              <span
                className={`mt-0.5 text-[11px] leading-snug text-ink-muted ${
                  isLeft ? "text-right" : isRight ? "text-left" : "text-center"
                }`}
              >
                {node.description}
              </span>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
