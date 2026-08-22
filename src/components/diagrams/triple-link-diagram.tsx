"use client";

import { motion } from "framer-motion";
import { Cloud, Gamepad2, Plane, SatelliteDish } from "lucide-react";

type LinkNode = {
  id: string;
  x: number;
  y: number;
  label: string;
  freq: string;
  colorVar: string;
  icon: typeof Gamepad2;
};

const DRONE = { x: 500, y: 70 };

const NODES: LinkNode[] = [
  {
    id: "rf",
    x: 100,
    y: 410,
    label: "Mando RC",
    freq: "2.4 GHz",
    colorVar: "var(--color-signal)",
    icon: Gamepad2,
  },
  {
    id: "tlm",
    x: 500,
    y: 410,
    label: "Estación de tierra",
    freq: "433 MHz",
    colorVar: "var(--color-accent)",
    icon: SatelliteDish,
  },
  {
    id: "cloud",
    x: 900,
    y: 410,
    label: "Cloud · AWS",
    freq: "WiFi / 4G-LTE",
    colorVar: "var(--color-mesh-violet)",
    icon: Cloud,
  },
];

function pct(v: number, total: number) {
  return `${(v / total) * 100}%`;
}

function curvePath(x2: number, y2: number) {
  const x1 = DRONE.x;
  const y1 = DRONE.y;
  const midY = y1 + (y2 - y1) * 0.55;
  return `M ${x1} ${y1} C ${x1} ${midY}, ${x2} ${midY}, ${x2} ${y2}`;
}

export function TripleLinkDiagram() {
  return (
    <div className="w-full">
      <div className="relative aspect-[1000/480] w-full">
        <svg
          viewBox="0 0 1000 480"
          className="absolute inset-0 h-full w-full overflow-visible"
          fill="none"
        >
          {NODES.map((node, i) => (
            <motion.path
              key={node.id}
              d={curvePath(node.x, node.y)}
              stroke={node.colorVar}
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeDasharray="1400"
              initial={{ strokeDashoffset: 1400, opacity: 0.35 }}
              whileInView={{ strokeDashoffset: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 1.1, delay: i * 0.18, ease: "easeInOut" }}
            />
          ))}
          {NODES.map((node, i) => (
            <motion.circle
              key={`dot-${node.id}`}
              cx={node.x}
              cy={node.y}
              r={5}
              fill={node.colorVar}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.4, delay: 0.9 + i * 0.18 }}
            />
          ))}
        </svg>

        <motion.div
          className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
          style={{ left: pct(DRONE.x, 1000), top: pct(DRONE.y, 480) }}
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5 }}
        >
          <span className="relative flex h-16 w-16 items-center justify-center rounded-full border border-line bg-paper shadow-[var(--shadow-lift)]">
            <span className="absolute inset-0 rounded-full bg-accent/20 animate-pulse-ring" />
            <Plane className="h-7 w-7 rotate-45 text-ink" strokeWidth={1.75} />
          </span>
          <span className="mt-2 font-telemetry text-[10px] uppercase text-ink-faint">
            Dron · Pixhawk + RPi
          </span>
        </motion.div>

        {NODES.map((node, i) => {
          const Icon = node.icon;
          return (
            <motion.div
              key={`node-${node.id}`}
              className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
              style={{ left: pct(node.x, 1000), top: pct(node.y, 480) }}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.5, delay: 0.6 + i * 0.18 }}
            >
              <span
                className="flex h-14 w-14 items-center justify-center rounded-full border bg-paper shadow-[var(--shadow-soft)]"
                style={{ borderColor: node.colorVar, color: node.colorVar }}
              >
                <Icon className="h-6 w-6" strokeWidth={1.75} />
              </span>
              <span className="mt-2 text-center text-[12px] font-semibold text-ink">
                {node.label}
              </span>
              <span className="font-telemetry text-[11.5px] uppercase text-ink-muted">
                {node.freq}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
