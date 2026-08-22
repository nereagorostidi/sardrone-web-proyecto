"use client";

import { Big_Shoulders, JetBrains_Mono } from "next/font/google";
import { motion } from "framer-motion";

const display = Big_Shoulders({ subsets: ["latin"], weight: ["800"] });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["500", "600"] });

type Variant = "vuelo" | "camara";

/**
 * Recreación fiel del panel de control real (control.gorostiditfg.com,
 * repo drone-cloud-server/www/control) — mismos colores, tipografía y
 * distribución que el CSS real del panel, mostrada dentro de un marco de
 * móvil dibujado en CSS. No es una captura de pantalla ni un iframe en
 * vivo: los botones no están conectados a ninguna API.
 */
export function PanelPhoneMockup({ variant = "vuelo" }: { variant?: Variant }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      className="mx-auto w-full max-w-[300px]"
    >
      <div className="relative rounded-[2.75rem] border-[10px] border-ink bg-ink shadow-[var(--shadow-lift)]">
        <div className="pointer-events-none absolute left-1/2 top-2.5 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-ink" />
        <div className="relative h-[600px] overflow-hidden rounded-[2rem]">
          <div className={`${mono.className} screen`}>
            {variant === "vuelo" ? (
              <>
                <p className="eyebrow">TFG · Drone-SAR</p>
                <h1 className="h1">
                  Control <span className="sar">·</span> dron
                </h1>
                <p className="sub">Panel de teleoperación (simulación)</p>
                <div className="hazard" />

                <div className="grupo">
                  <span className="corner-tl" />
                  <span className="corner-br" />
                  <p className="grupo-h2">
                    <span className="dot" /> Dron
                  </p>
                  <div className="select-fake">dron-01</div>
                </div>

                <div className="grupo">
                  <span className="corner-tl" />
                  <span className="corner-br" />
                  <p className="grupo-h2">
                    <span className="dot" /> Motores
                  </p>
                  <div className="fila">
                    <span className="btn b-ok">Armar</span>
                    <span className="btn b-danger">Desarmar</span>
                  </div>
                </div>

                <div className="grupo">
                  <span className="corner-tl" />
                  <span className="corner-br" />
                  <p className="grupo-h2">
                    <span className="dot" /> Despegue
                  </p>
                  <div className="fila">
                    <div className="input-fake">20</div>
                    <span className="btn b-ok" style={{ flex: 1 }}>
                      Despegar (m)
                    </span>
                  </div>
                </div>

                <div className="grupo">
                  <span className="corner-tl" />
                  <span className="corner-br" />
                  <p className="grupo-h2">
                    <span className="dot" /> Navegación
                  </p>
                  <div className="fila">
                    <span className="btn b-neutral">Iniciar misión</span>
                    <span className="btn b-neutral">Mantener</span>
                  </div>
                </div>

                <div className="fade fade-bottom" />
              </>
            ) : (
              <>
                <div className="fade fade-top" />

                <div className="grupo" style={{ marginTop: 34 }}>
                  <span className="corner-tl" />
                  <span className="corner-br" />
                  <p className="grupo-h2">
                    <span className="dot" /> Regreso
                  </p>
                  <div className="fila">
                    <span className="btn b-neutral">Aterrizar</span>
                    <span className="btn b-neutral">Volver a casa (RTL)</span>
                  </div>
                </div>

                <div className="grupo">
                  <span className="corner-tl" />
                  <span className="corner-br" />
                  <p className="grupo-h2">
                    <span className="dot" /> Cámara
                  </p>
                  <div className="video-fake">
                    <span className="video-live">
                      <span className="live-dot" /> En directo
                    </span>
                    <span className="video-hud">ALT 42 M</span>
                  </div>
                  <div className="fila" style={{ marginTop: 10 }}>
                    <span className="btn b-ok">Empezar grabación</span>
                    <span className="btn b-danger">Parar grabación</span>
                  </div>
                </div>

                <div className="grupo">
                  <span className="corner-tl" />
                  <span className="corner-br" />
                  <p className="grupo-h2">
                    <span className="dot" /> Sistema (Raspberry Pi)
                  </p>
                  <div className="fila">
                    <span className="btn b-danger">Apagar Raspberry Pi</span>
                  </div>
                </div>

                <div className="fade fade-bottom" />
              </>
            )}
          </div>
        </div>
        <div className="pointer-events-none absolute bottom-2 left-1/2 h-1 w-24 -translate-x-1/2 rounded-full bg-white/25" />
      </div>
      <style jsx>{`
        .screen {
          position: relative;
          height: 100%;
          background: #0d0c0a;
          color: #f2efe6;
          padding: 30px 16px 0;
          -webkit-font-smoothing: antialiased;
        }
        .eyebrow {
          font-size: 10px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #e5892a;
          font-weight: 600;
        }
        .h1 {
          font-family: ${display.style.fontFamily};
          font-weight: 800;
          font-size: 2rem;
          line-height: 0.95;
          text-transform: uppercase;
          margin: 8px 0 4px;
        }
        .h1 .sar {
          color: #e5892a;
        }
        .sub {
          color: #96897a;
          font-size: 0.7rem;
          letter-spacing: 0.02em;
        }
        .hazard {
          height: 5px;
          margin: 16px 0 2px;
          border-radius: 2px;
          background: repeating-linear-gradient(-45deg, #e5892a 0 8px, #18160f 8px 16px);
          opacity: 0.55;
        }
        .grupo {
          position: relative;
          margin-top: 14px;
          background: #18160f;
          border: 1px solid #332e1e;
          border-radius: 5px;
          padding: 12px 12px 14px;
        }
        .corner-tl,
        .corner-br {
          position: absolute;
          width: 11px;
          height: 11px;
          pointer-events: none;
        }
        .corner-tl {
          top: -5px;
          left: -5px;
          border-top: 2px solid #e5892a;
          border-left: 2px solid #e5892a;
        }
        .corner-br {
          bottom: -5px;
          right: -5px;
          border-bottom: 2px solid #e5892a;
          border-right: 2px solid #e5892a;
        }
        .grupo-h2 {
          font-size: 9.5px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #96897a;
          margin-bottom: 10px;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .dot {
          width: 5px;
          height: 5px;
          background: #e5892a;
          flex: none;
        }
        .fila {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        .btn {
          font-family: ${display.style.fontFamily};
          font-weight: 700;
          font-size: 0.8rem;
          letter-spacing: 0.02em;
          text-transform: uppercase;
          text-align: center;
          border-radius: 5px;
          padding: 10px 10px;
          flex: 1;
          min-width: 96px;
        }
        .b-ok {
          background: #e5892a;
          color: #0d0c0a;
        }
        .b-danger {
          background: #d2483c;
          color: #0d0c0a;
        }
        .b-neutral {
          background: transparent;
          color: #f2efe6;
          border: 1px solid #332e1e;
        }
        .select-fake,
        .input-fake {
          font-weight: 600;
          font-size: 0.85rem;
          letter-spacing: 0.04em;
          background: #0a0908;
          border: 1px solid #332e1e;
          border-radius: 5px;
          padding: 11px 14px;
          text-align: center;
        }
        .input-fake {
          width: 64px;
          flex: none;
        }
        .video-fake {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          border-radius: 5px;
          overflow: hidden;
          border: 1px solid #332e1e;
          background: radial-gradient(120% 100% at 30% 20%, #3a4a2e 0%, #202b1c 45%, #0a0d08 100%);
        }
        .video-live {
          position: absolute;
          left: 8px;
          top: 8px;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 9px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          font-weight: 600;
          color: #f2efe6;
          background: rgba(13, 12, 10, 0.55);
          border-radius: 3px;
          padding: 3px 6px;
        }
        .live-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #d2483c;
          flex: none;
        }
        .video-hud {
          position: absolute;
          right: 8px;
          bottom: 8px;
          font-size: 9px;
          letter-spacing: 0.04em;
          color: #f2efe6;
          background: rgba(13, 12, 10, 0.55);
          border-radius: 3px;
          padding: 3px 6px;
        }
        .fade {
          position: absolute;
          left: 0;
          right: 0;
          height: 70px;
          pointer-events: none;
        }
        .fade-bottom {
          bottom: 0;
          background: linear-gradient(to bottom, transparent, #0d0c0a);
        }
        .fade-top {
          top: 0;
          height: 34px;
          background: linear-gradient(to top, transparent, #0d0c0a);
        }
      `}</style>
    </motion.div>
  );
}
