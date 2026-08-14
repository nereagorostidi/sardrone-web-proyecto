@AGENTS.md

# Guardian Eye — Web de detalle técnico del TFG

Proyecto Next.js que documenta en profundidad el dron SAR "Guardian Eye" (TFG de Nerea
Gorostidi García, Ingeniería de Tecnologías de Telecomunicación, UC3M, convocatoria 2026).
Complementa a la landing corta de micromecenazgo en https://drone-sar.vercel.app.

La especificación completa del encargo vive en `docs/prompt-web-uas-vercel.md`. Este
`CLAUDE.md` es la fuente de verdad de qué está hecho y qué falta — léelo antes de tocar
nada y actualízalo al terminar cualquier tarea.

## 📌 Estado del Proyecto

### ✅ Tareas completadas

- Scaffold Next.js 16 (App Router, TypeScript, Tailwind v4, ESLint) en la raíz del repo.
- Dependencias instaladas: `framer-motion`, `lucide-react`, `@vercel/analytics`,
  `@radix-ui/react-navigation-menu`, `@radix-ui/react-dialog`, `clsx`, `tailwind-merge`,
  `class-variance-authority`.
- Documentos fuente movidos a `docs/` (PDFs, docx, el propio prompt maestro).
- Extracción de contenido real desde las 4 fuentes + landing corta + journal.html,
  documentada en un análisis de investigación (ver "Fuentes de contenido" abajo) — incluye
  tabla de conflictos entre fuentes (pitch-deck vs. documentación técnica real) y lista de
  placeholders explícitos. Todo el copy de las páginas se ha escrito a partir de esa
  extracción, sin inventar cifras.
- Sistema de diseño "Aerospace Editorial / Gradient Dynamic" en `src/app/globals.css`:
  paleta clara (paper/surface/surface-alt/ink), acento azul (`--color-accent`) como marca
  principal y naranja (`--color-signal`) reservado a RF/seguridad/alerta, gradiente mesh
  violeta→cian→coral, tipografía Geist Sans (titulares) + Geist Mono (`.font-telemetry`,
  para specs/datos técnicos). Sin fondos negros por defecto (solo puntualmente, p. ej. el
  bloque de Tailscale).
- Header (`src/components/site-header.tsx`) con `NavigationMenu` de Radix, desplegables
  multinivel animados con Framer Motion, y `MobileNav` (`src/components/mobile-nav.tsx`)
  como drawer a pantalla completa con acordeones (Radix Dialog).
- Footer (`src/components/site-footer.tsx`) con enlaces a todas las secciones y CTA
  "Apoyar el proyecto" hacia la landing corta.
- Diagramas SVG/componentes propios animados con Framer Motion (`src/components/diagrams/`):
  - `triple-link-diagram.tsx` — triple enlace redundante (RF/telemetría/4G) con líneas que
    se dibujan al hacer scroll.
  - `radial-diagram.tsx` — componente genérico reutilizado para: los 4 focos de la home,
    la rueda de 4 competencias académicas (`/proyecto#objetivos`) y los 3 pilares de
    retorno social (`/impacto`).
  - `philosophy-comparison.tsx` — comparativa caja negra/cerrado vs. arquitectura abierta.
  - `flow-diagram.tsx` — flujo horizontal genérico (usado en el pipeline de datos de
    `/arquitectura#software` y en el pipeline de IA de `/ia`).
- Banco de imágenes Unsplash verificadas y con `alt` técnico en `src/lib/images.ts`
  (`next.config.ts` permite `images.unsplash.com` como remote pattern).
- Todas las páginas y rutas implementadas con contenido real (no placeholder de lorem
  ipsum), respetando la regla de no inventar cifras:
  - `/` — hero con foto de dron (Unsplash, marcada como pendiente de sustituir por foto
    real del prototipo), diagrama circular de los 4 focos, quick links, CTA a landing corta.
  - `/proyecto` — Introducción (problema/brecha/solución + marco regulatorio AESA A1/A3),
    Objetivos (rueda de competencias + validación de campo del 12/07/2026), Filosofía
    (comparativa abierta/cerrada + comparación real con DJI Neo 2).
  - `/arquitectura` — Comunicaciones (triple enlace + Tailscale), Hardware (Pixhawk 6C +
    Raspberry Pi 5/Edge Companion + Hailo-8L + pipeline de componentes), Software & Cloud
    (4 servicios Python, MQTT/Mosquitto, Flask/EC2, InfluxDB, N8N, nginx/Cloudflare +
    diagrama de flujo de datos).
  - `/ia` — qué es YOLO, pipeline de dataset/entrenamiento, estado real honesto (prueba de
    concepto sobre dataset de fruta vs. dataset de personas en construcción), formato del
    mensaje de detección, limitaciones (sin geolocalización, sin tracking).
  - `/multimedia` — galería con lightbox (Radix Dialog) y reproducción bajo demanda; vídeo
    destacado del Club Alas de Galapagar marcado como pendiente de URL; enlaces a los 3
    repos de GitHub reales; CTA a la landing corta para el envío de vídeos comunitarios.
  - `/impacto` — diagrama de retorno social (conocimiento abierto/uso físico/guía), ODS 3,
    11 y 17 (los ejemplos ya autorizados explícitamente por el prompt maestro).
  - `/colaboradores` — tarjeta destacada del Club Alas de Galapagar, grid con los
    colaboradores reales ya publicados en el journal (Darco, Dani, Paco, José Manuel),
    placeholder de tutor/a académico/a y de logo del club, firma de la autora con email de
    contacto, enlace al futuro muro de transparencia.
- `@vercel/analytics` integrado en `src/app/layout.tsx` (`<Analytics />`).
- `vercel.json` con cabeceras de caché (estáticos `_next/static` inmutables, imágenes con
  `stale-while-revalidate`) y cabeceras de seguridad básicas.
- `npm run build` verificado en verde con las 7 rutas generadas como contenido estático.
- Repaso visual en navegador (Chrome vía MCP) de home y `/arquitectura`: hero, diagrama
  circular y diagrama de triple enlace confirmados renderizando y animando correctamente;
  imagen de hero ajustada (`object-position`) para que el dron sea visible en el recorte
  panorámico.
- `git init` + primer commit en la raíz del proyecto.
- Proyecto enlazado y desplegado en Vercel: `nereagorostidi/guardian-eye-web`, en producción
  en **https://guardian-eye-web.vercel.app** (alias estable; el deploy concreto queda en
  `.vercel/project.json`, no versionado). Todas las rutas verificadas con 200 en producción.

### 🚧 En progreso / Pendiente

- **Siguiente paso inmediato:** QA visual en móvil y sustitución de los placeholders listados
  abajo a medida que existan datos/medios reales; volver a desplegar con `vercel deploy --prod`
  tras cada cambio relevante.
- QA visual del menú móvil (drawer) y de las páginas restantes (`/ia`, `/multimedia`,
  `/impacto`, `/colaboradores`) en viewport móvil — solo se ha revisado home y
  `/arquitectura` en desktop por límite de tiempo de la sesión.
- Favicon/OG image todavía son los genéricos de `create-next-app`; falta un favicon propio
  y una imagen Open Graph específica del proyecto.
- Sustituir en cuanto existan (todos marcados explícitamente en el copy como placeholder,
  no inventados):
  1. Foto real del dron a pantalla completa para el hero de `/` (ahora mismo es una foto
     de stock de Unsplash).
  2. URL del vídeo destacado de detección de personas en el Club Alas de Galapagar
     (`/multimedia`).
  3. Vídeos de vuelo reales / timelapse de montaje de hardware para la galería.
  4. Precisión/mAP del modelo YOLO, nº de vuelos de prueba con detección real de personas
     y tamaño final del dataset de personas (`/ia`) — el pipeline actual solo está
     validado sobre un dataset de prueba de fruta.
  5. Nombre del tutor/a académico/a del TFG (`/colaboradores`).
  6. Logo del Club Alas de Galapagar (`/colaboradores`).
  7. Especificaciones finales cerradas de chasis/motores/batería (`/arquitectura#hardware`)
     — el hardware definitivo está en fase de adquisición según el journal del proyecto.
  8. Enlace real al "muro de transparencia" de patrocinadores (`/colaboradores`) — esa
     sección aún no existe en la landing corta.
  9. Detalle de protección térmica de los componentes electrónicos (no confundir con la
     visión térmica, que está descartada del proyecto).
- No se ha creado `robots.txt` / `sitemap.xml` — opcional, no pedido explícitamente por el
  encargo, pero mejoraría el SEO si se retoma el proyecto.

### 🛠️ Decisiones técnicas & Stack

- **Next.js 16** (App Router, RSC, TypeScript), Tailwind CSS v4 (config vía `@theme` en
  `globals.css`, sin `tailwind.config.js`), rutas anidadas reales (no solo anclas).
- **Tokens de color** (nombres usados como utilidades Tailwind, p. ej. `bg-accent`,
  `text-signal`): `paper`, `surface`, `surface-alt`, `ink`, `ink-muted`, `line`, `accent` /
  `accent-ink` / `accent-soft` (azul, marca principal), `signal` / `signal-ink` /
  `signal-soft` (naranja, reservado a RF/seguridad/alerta), `mesh-violet`, `mesh-cyan`,
  `mesh-coral` (gradiente mesh secundario). Definidos en `src/app/globals.css`.
- **Iconos:** `lucide-react` — ojo con los iconos de marca (`Github` no existe en la
  versión instalada; se usa `Code2`/`GitBranch` como sustituto genérico).
- Los componentes de diagrama (`src/components/diagrams/`) son `"use client"` porque usan
  Framer Motion (`whileInView`); cuando se les pasan iconos desde un Server Component
  (páginas), hay que pasar el icono ya renderizado como `ReactNode`
  (`icon: <Cpu strokeWidth={1.75} />`), nunca la referencia al componente — pasar la
  función cruda de un Server a un Client Component rompe el build (`Functions cannot be
  passed directly to Client Components`).
- **Regla de contenido (no negociable):** ningún dato técnico (frecuencias, protocolos,
  nombres de hardware, cifras de precisión, nombres de personas) se inventa. Todo sale de
  `docs/` + la landing/journal + el propio prompt maestro. Donde no hay dato, se marca
  `[placeholder]` visible en el copy en vez de rellenar con un número plausible.
- **Exclusiones obligatorias:** no debe aparecer LiDAR (TF-Mini/TF-Luna) ni visión térmica
  (FLIR Lepton) en ninguna página — ambas tecnologías se mencionan en los PDFs tipo
  pitch-deck pero están descartadas del proyecto real.
- **Conflictos de fuentes ya resueltos** (pitch-deck vs. documentación técnica real / vs.
  instrucción explícita del prompt maestro — se ha priorizado en este orden: journal.html
  y los `.docx` > instrucción explícita del prompt maestro > PDFs pitch-deck):
  - Companion computer: Raspberry Pi 5 (no Pi 4, que era una versión desactualizada del
    pitch-deck) + acelerador Hailo-8L.
  - VPN de seguridad: Tailscale, tal como exige el prompt maestro (el pitch-deck mencionaba
    ZeroTier, dato descartado).
  - N8N y "Cloud AI (LLMs)/AWS Bedrock": se nombran en el stack porque el prompt maestro lo
    exige explícitamente, pero redactados como pieza declarada/línea futura, no como
    funcionalidad ya validada — no hay evidencia de flujos N8N ni de LLMs operativos en las
    fuentes técnicas reales.
  - Telemetría: se mantiene "915 MHz" tal como fija el prompt maestro, aunque
    `teleoperacion.docx` y el journal hablan indistintamente de 433/915 MHz según región.
- **Imágenes:** Unsplash vía hotlink directo a `images.unsplash.com` con parámetros de
  tamaño (`src/lib/images.ts`). El servicio antiguo `source.unsplash.com` está caído
  (devuelve 503) — no usarlo. Cada URL de esta lista se verificó con `curl` antes de
  usarse; si se añaden imágenes nuevas, verificar igual antes de commitear.
- **Fuentes de contenido:** el análisis completo de extracción (con tabla de conflictos,
  glosario técnico confirmado y contenido por sección 6.1–6.11) se generó en un
  scratchpad temporal de la sesión y no se ha conservado como archivo del repo — si hace
  falta volver a consultarlo con detalle, re-derivarlo de `docs/` siguiendo el mismo
  criterio de prioridad de fuentes descrito arriba.
- **Vercel:** `@vercel/analytics` ya integrado. `vercel.json` define cabeceras de caché
  para `_next/static` (inmutable) e imágenes (`stale-while-revalidate`), más cabeceras de
  seguridad básicas (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`).
