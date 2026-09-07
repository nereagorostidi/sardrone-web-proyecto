/**
 * Ilustración decorativa de un documento PDF (la memoria del TFG).
 * SVG estático, sin interacción — usa los tokens de color del sistema de
 * diseño para adaptarse a claro/oscuro. Se usa en la home, junto al enlace
 * de descarga del TFG.
 */
export function PdfDocumentGraphic({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 420 340"
      role="img"
      aria-label="Ilustración de la memoria del TFG en PDF"
      className={className}
    >
      {/* halo mesh suave */}
      <defs>
        <linearGradient id="pdf-accent" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--color-accent)" />
          <stop offset="1" stopColor="var(--color-mesh-violet)" />
        </linearGradient>
      </defs>
      <ellipse cx="210" cy="180" rx="180" ry="150" fill="var(--color-accent-soft)" opacity="0.5" />

      {/* hoja trasera */}
      <g transform="rotate(-7 210 180)">
        <rect x="96" y="58" width="212" height="250" rx="12" fill="var(--color-surface-alt)" stroke="var(--color-line)" />
      </g>

      {/* hoja principal */}
      <g transform="rotate(4 210 175)">
        <rect x="118" y="46" width="206" height="258" rx="12" fill="var(--color-paper)" stroke="var(--color-line)" />
        {/* esquina doblada */}
        <path d="M296 46 L324 74 L296 74 Z" fill="var(--color-surface-alt)" stroke="var(--color-line)" />

        {/* banda de cabecera */}
        <rect x="138" y="70" width="120" height="14" rx="4" fill="url(#pdf-accent)" />
        <rect x="138" y="96" width="166" height="7" rx="3.5" fill="var(--color-line)" />

        {/* líneas de texto */}
        {[120, 134, 148, 162, 176, 190].map((y, i) => (
          <rect
            key={y}
            x="138"
            y={y}
            width={i === 5 ? 96 : i === 2 ? 150 : 166}
            height="6"
            rx="3"
            fill="var(--color-line)"
          />
        ))}

        {/* mini-gráfico embebido */}
        <rect x="138" y="212" width="76" height="52" rx="6" fill="var(--color-surface)" stroke="var(--color-line)" />
        <path d="M146 252 L160 238 L172 246 L206 220" fill="none" stroke="var(--color-accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="224" y="212" width="80" height="8" rx="4" fill="var(--color-line)" />
        <rect x="224" y="228" width="80" height="6" rx="3" fill="var(--color-line)" />
        <rect x="224" y="242" width="64" height="6" rx="3" fill="var(--color-line)" />
        <rect x="224" y="256" width="72" height="6" rx="3" fill="var(--color-line)" />

        {/* etiqueta PDF */}
        <rect x="138" y="278" width="58" height="22" rx="6" fill="var(--color-accent)" />
        <text
          x="167"
          y="293"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill="#fff"
          className="font-telemetry"
        >
          PDF
        </text>
      </g>

      {/* insignia de descarga */}
      <g transform="translate(300 236)">
        <circle r="34" fill="var(--color-ink)" />
        <path d="M0 -14 L0 10 M-10 0 L0 12 L10 0" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="-13" y="16" width="26" height="4" rx="2" fill="#fff" />
      </g>
    </svg>
  );
}
