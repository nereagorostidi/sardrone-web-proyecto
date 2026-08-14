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
            <motion.line
              key={node.id}
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
          );
        })}
      </svg>

      <motion.div
        className="absolute top-1/2 left-1/2 flex w-[128px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-line bg-paper text-center shadow-[var(--shadow-lift)]"
        style={{ height: 128 }}
        initial={{ opacity: 0, scale: 0.85 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.5 }}
      >
        {CenterIcon && <span className="text-accent [&_svg]:h-5 [&_svg]:w-5">{CenterIcon}</span>}
        <span className="mt-1 px-2 text-[13px] font-bold leading-tight text-ink">
          {centerLabel}
        </span>
        {centerSublabel && (
          <span className="font-telemetry text-[9px] uppercase text-ink-faint">
            {centerSublabel}
          </span>
        )}
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
            style={{ left: `${leftPct}%`, top: `${topPct}%`, width: 150 }}
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.45, delay: 0.35 + i * 0.12 }}
          >
            <span
              className="flex h-[68px] w-[68px] items-center justify-center rounded-2xl border bg-paper shadow-[var(--shadow-soft)]"
              style={{ borderColor: node.colorVar, color: node.colorVar }}
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
