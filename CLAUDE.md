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
    (4 servicios Python, MQTT/Mosquitto, Flask/EC2, InfluxDB, nginx/Cloudflare + diagrama
    de flujo de datos — N8N se quitó del stack, ver nota más abajo).
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
- `npm run build` verificado en verde con las 13 rutas generadas como contenido estático
  (tras la reestructuración de `/proyecto` y `/arquitectura` en hub + subpáginas, ver más
  abajo).
- **Rediseño de color + reestructuración de navegación** (agosto 2026, a petición
  explícita de la autora — "no me convencen los colores, quiero páginas independientes"):
  - Paleta más viva: `--color-accent` (#315dff), `--color-signal` (#ff6a1f) y los tres
    `--color-mesh-*` (violeta/cian/coral) más saturados en `globals.css`. Se añadieron los
    tokens que faltaban y que las páginas ya referenciaban sin que existieran
    (`--color-ink-faint`, `--shadow-soft`, `--shadow-lift`) — antes de este cambio esas
    clases (`text-ink-faint`, `shadow-[var(--shadow-soft)]`, etc.) no pintaban nada.
    Utilidades nuevas: `.mesh-bg-hero` (gradiente mesh para las cabeceras de página),
    `.text-gradient`, `.btn-gradient` / `.btn-gradient-signal` (CTAs con degradado
    azul→violeta, usadas en el header, el footer, el menú móvil y la home).
  - `src/components/page-hero.tsx`: cabecera de página compartida (eyebrow en pastilla de
    color, título, descripción, breadcrumbs opcionales, `tone="accent"|"signal"`) — sustituye
    el `<header>` duplicado que tenía cada página.
  - `src/components/subpage-nav.tsx`: navegación anterior/siguiente + enlace al hub, usada
    en las 6 subpáginas de Proyecto/Arquitectura.
  - **`/proyecto` y `/arquitectura` dejaron de ser una sola página con secciones ancladas
    (`#introduccion`, `#comunicaciones`, etc.) y pasaron a ser un hub con 3 tarjetas que
    enlazan a subrutas reales e independientes**: `/proyecto/introduccion`,
    `/proyecto/objetivos`, `/proyecto/filosofia`, `/arquitectura/comunicaciones`,
    `/arquitectura/hardware`, `/arquitectura/software`. El menú (desktop y móvil) y el
    footer ya apuntan a esas rutas reales, no a anclas — cada entrada del submenú es ahora
    una página propia, no aparecen ya las demás secciones a continuación en la misma
    página. `src/lib/site-config.ts` es la fuente de verdad de esas rutas.
  - Contenido ampliado (más párrafos explicativos, sin inventar cifras) en las 6 subpáginas
    nuevas y también en `/ia`, `/multimedia`, `/impacto` y `/colaboradores` — glosarios
    rápidos (RTOS, MAVLink, UART/I2C/GPIO, MQTT, bounding box…), contexto regulatorio
    ampliado, razonamiento de por qué redundancia/edge computing/separación de dominios.
  - Vídeo de detección de personas de `/multimedia` **ya no aparece como pendiente**:
    enlazado a `https://www.youtube.com/watch?v=jjvX-JZZbLM` (embed `youtube-nocookie.com`
    vía un nuevo campo `youtubeId` en `MediaItem`/`MediaGallery`; miniatura real sacada de
    `img.youtube.com/vi/{id}/hqdefault.jpg` — **importante:** `maxresdefault.jpg` da 404 en
    este vídeo, hay que usar `hqdefault.jpg`. Dominio `img.youtube.com` añadido a
    `next.config.ts`).
  - Home (`/`): banner "esta web está en construcción, vuelve a menudo" con degradado
    vívido (`.btn-gradient`) justo debajo del hero, a petición explícita de la autora.
- **Foto de fondo del hero de `/` sustituida por una imagen generada con IA** (agosto
  2026, a petición explícita de la autora): la foto de stock de Unsplash (dron genérico
  frente a cordillera nevada) se sustituyó por `public/images/hero-drone-sar.jpg`, generada
  con Replicate (`black-forest-labs/flux-1.1-pro`, 1216×832, sin coste de crédito
  disponible para regenerar en mayor resolución con `flux-1.1-pro-ultra` — ver nota de
  entorno más abajo): un dron cuadricóptero con gimbal de cámara sobrevolando un bosque de
  montaña en luz diurna, con un equipo de rescate en chaquetas de alta visibilidad naranja
  buscando en el sendero. Escena diurna a propósito, sin efectos de visión nocturna ni
  térmica — coherente con que el proyecto real no lleva cámara térmica y la detección de
  personas se hace con YOLO sobre vídeo visual, tal como confirmó la autora. Sin texto ni
  logos en la imagen (evita cualquier riesgo de erratas). `IMAGES.heroDrone` en
  `src/lib/images.ts` ahora apunta a `/images/hero-drone-sar.jpg` (ruta local servida desde
  `public/`, no un hotlink de Unsplash) — sigue marcada explícitamente en el `alt` como
  imagen de referencia generada por IA, pendiente de sustituir por fotografía real del
  prototipo en campo.
  - **Nota de entorno:** la cuenta de Replicate se quedó sin crédito suficiente al
    intentar regenerar la imagen en mayor resolución con `flux-1.1-pro-ultra` (HTTP 402
    "Insufficient credit"). Si se quiere una versión de mayor resolución para pantallas
    grandes, hace falta recargar crédito en
    https://replicate.com/account/billing#billing antes de reintentarlo.
- Repaso visual en navegador (Chrome vía MCP) de home y `/arquitectura`: hero, diagrama
  circular y diagrama de triple enlace confirmados renderizando y animando correctamente;
  imagen de hero ajustada (`object-position`) para que el dron sea visible en el recorte
  panorámico.
- **Sección "Más que un TFG" de la home** (agosto 2026, a petición explícita de la
  autora): la sección `mesh-bg` que antes se llamaba "Más que una nota" ahora explica que
  el proyecto es el TFG de Nerea Gorostidi García (Ingeniería de Tecnologías de
  Telecomunicación, UC3M, convocatoria 2026), cita el título completo del TFG entre
  comillas en un bloque `<blockquote>` destacado ("Diseño e Implementación de un Sistema
  UAV Autónomo con Comunicaciones 4G, Fusión de Sensores (Térmico/Visual) y Arquitectura
  IoT para Misiones de Búsqueda y Rescate" — texto proporcionado literalmente por la
  autora), y explica por qué se eligió el proyecto (integra electrónica, comunicaciones,
  seguridad, resiliencia, normativa, IoT, cloud, programación e IA en un solo sistema) y
  qué aporta (profundizar en cada ámbito y materializar el conocimiento de los 4 años de
  carrera). **Nota importante:** el título cita "Fusión de Sensores (Térmico/Visual)"
  porque es el título oficial registrado del TFG tal como lo dio la autora — esto **no**
  contradice la exclusión obligatoria de visión térmica del resto de la web (ver más
  abajo), que sigue aplicando a las descripciones técnicas del sistema real (`/ia`,
  `/arquitectura/hardware`); es una cita textual del título académico, no una afirmación
  de capacidad técnica actual.
  - `RadialDiagram` (`src/components/diagrams/radial-diagram.tsx`) mejorado: círculo
    central más grande con el icono `Drone` de `lucide-react` y doble anillo de pulso
    (reutiliza la utilidad `animate-pulse-ring` ya definida en `globals.css`), y un punto
    de "soldadura" (`motion.circle`) en el extremo de cada línea conectora. Cambio
    retrocompatible — la firma de props no cambió.
  - `FOCUS_NODES` de la home pasó de 4 a 5 nodos agrupados (en vez de 9 etiquetas sueltas):
    Electrónica & hardware (Raspberry Pi, Pixhawk, Linux embebido), Comunicaciones
    (seguridad, resiliencia, normativa AESA), Inteligencia artificial (YOLO, LLM), IoT &
    cloud (MQTT, AWS), Programación (desarrollo web, scripting Python) — así se cubren las
    9 disciplinas que pidió la autora sin saturar el diagrama.
  - Verificado en navegador (Chrome vía MCP) en desktop: texto, blockquote y diagrama
    renderizando correctamente. **Nota de entorno:** `resize_window` del MCP de Chrome
    sigue sin cambiar el layout renderizado en esta máquina (mismo problema ya documentado
    más abajo), así que el QA en viewport móvil de esta sección concreta sigue pendiente
    de verificación manual, igual que el resto de la web.
- `git init` + primer commit en la raíz del proyecto.
- Proyecto enlazado y desplegado en Vercel: `nereagorostidi/guardian-eye-web`, en producción
  en **https://guardian-eye-web.vercel.app** (alias estable; el deploy concreto queda en
  `.vercel/project.json`, no versionado). Todas las rutas verificadas con 200 en producción.
- **Home (`/`) — segunda ronda de ajustes de contenido y visuales** (agosto 2026, a
  petición explícita de la autora):
  - El párrafo largo del hero (superpuesto a la foto del dron) se acortó a un gancho de
    2 frases y pasó de `text-ink-muted` a `text-ink` para asegurar contraste — el resto
    del contenido se movió a una sección nueva `/` → "Cómo funciona" (`bg-paper`, dos
    columnas, fondo sólido) que aparece justo debajo del hero, ya fuera de la imagen.
  - Quitadas de la home la sección "Documentación técnica completa" (grid de
    `QUICK_LINKS`) y el banner "Esta web está en construcción" — a petición explícita de
    la autora, sin sustituto.
  - Añadido a la sección "Cómo funciona": una tarjeta "Código abierto, de verdad" sobre
    fondo `bg-ink` con el logo real de GitHub y enlaces directos a los dos repos ya
    publicados (`drone-edge-companion`, `drone-cloud-server`); debajo, una fila condensada
    (una sola línea, envuelve en `flex-wrap` si hace falta) de **11 badges de tecnología
    con logos de marca reales** (no iconos genéricos): Python, OpenCV, YOLO, Roboflow,
    MAVLink, Raspberry Pi, Linux, MQTT/IoT, AWS, InfluxDB, Grafana.
  - **Logos de marca:** se añadió la dependencia `simple-icons` (paquete SVG con licencia
    CC0, tree-shakeable) — se consumen vía `src/components/brand-icon.tsx`
    (`<BrandIcon path={...} color={...} />`, wrapper genérico sobre el `path`+`hex` que
    expone cada icono de `simple-icons`). Tres marcas no están en `simple-icons` (Amazon
    retiró sus marcas del paquete por política de trademark; MAVLink y LinkedIn no tienen
    entrada propia — LinkedIn se retiró del paquete en algún momento, no es un fallo de
    esta versión), así que sus logos se descargaron como archivos estáticos a
    `public/icons/`: `aws.svg` (wordmark oficial "smile"), `mavlink.png` (avatar oficial
    de `github.com/mavlink`) y `linkedin.svg` (icono cuadrado azul oficial) — los tres vía
    CDN de `devicon` (`jsdelivr.net/npm/devicon@2.17.0/icons/...`). Si se necesitan más
    iconos de marca en el futuro, seguir el mismo criterio: `simple-icons` primero, y si
    no está ahí, un asset oficial del propio proyecto/empresa guardado en `public/icons/`.
  - Quitado del hero el bloque de estadísticas (`<dl>` con Enlace RC / Telemetría /
    Enlace remoto) — esa información ahora vive entre paréntesis dentro del segundo
    párrafo de "Cómo funciona", que describe el enlace de comunicaciones como
    **"enlace múltiple"** (ya no "triple": se añadió WiFi como cuarto enlace, de respaldo
    a corto alcance, junto a RC 2.4 GHz/telemetría 915 MHz/4G-LTE) y arranca con
    "El sistema tiene como objetivo la resiliencia y la seguridad...". Los dos párrafos de
    esa sección se reescribieron además para quedar equilibrados en longitud (misión vs.
    comunicaciones) al colocarlos en dos columnas.
  - Quitada la sub-sección "Del dron a la nube" (el `FlowDiagram` Edge Companion → MQTT →
    Cloud Server) — las tecnologías que representaba se integraron como badges en la fila
    de logos de arriba en su lugar.
  - Quitado del footer (`src/components/site-footer.tsx`) el párrafo descriptivo bajo el
    logo y la tarjeta "Micromecenazgo" (¿Quieres colaborar con material, patrocinio o
    vídeos de entrenamiento?) — a petición explícita de la autora. En su lugar, el footer
    tiene ahora una fila de contacto claramente visible con el nombre de la autora y tres
    enlaces (icono + etiqueta): GitHub (`github.com/nereagorostidi`), LinkedIn
    (`linkedin.com/in/nereagorostidigarcia`) y Email (`nerea.gorostidi.garcia@gmail.com`).
  - El CTA final de la home ("Ir a la landing corta") pasó a "Visita la Web del
    Crowdfunding", con el icono `HandCoins` de `lucide-react`.
  - Añadido el logo de **Tailscale** (`simple-icons`, sí disponible ahí) a la fila de
    badges de tecnología — es la única marca de VPN/seguridad añadida (de las sugeridas:
    Tailscale / VPN mesh genérico / WireGuard / ZTNA genérico) porque es la que
    realmente usa el proyecto según el prompt maestro (ver "Conflictos de fuentes" más
    abajo); WireGuard es solo la base de Tailscale, no una pieza independiente del stack.
  - En el segundo párrafo de "Cómo funciona" se resaltaron en `text-accent` (`<strong>`)
    los términos técnicos clave: "RC a 2.4 GHz", "telemetría", "YOLO", "Tailscale" y
    "Zero Trust Network" — a petición explícita de la autora, que también reescribió el
    contenido de ambos párrafos de esta sección (se corrigieron solo tildes/erratas de
    ese texto, no la redacción).
  - En "Más que un TFG", al final de la columna de texto (tras el párrafo "Ese enfoque
    integral..."), se añadió una tarjeta-enlace "Sigue el progreso del proyecto" (icono
    `NotebookPen`) que enlaza al diario público del proyecto en
    `https://drone-sar.vercel.app/journal.html` — a petición explícita de la autora, que
    quería invitar a los lectores a seguir el avance del TFG.
  - Verificado en navegador (Chrome vía MCP) en desktop tras `npm run build` en verde.
- **Marcha atrás parcial: la home vuelve a su versión completa** (agosto 2026, a
  petición explícita de la autora tras probar la versión recortada — "prefiero la home
  como estaba antes, aunque se repita material"). `src/app/page.tsx` se restauró al
  commit previo a la reestructuración (parrafada técnica completa de comunicaciones +
  IA + Zero Trust/Tailscale, y el `RadialDiagram` de "Más que un TFG"), en vez de los
  enlaces de salida cortos. La sección nueva "Cómo lo resolvemos técnicamente" que se
  había añadido a `/proyecto/introduccion` **sí se mantiene** — la autora pidió
  explícitamente desarrollar el contenido de introducción/objetivos/filosofía aunque
  suene duplicado con la home, en vez de mantener la home ligera.
  - Para evitar duplicar el *código* (aunque el *contenido visual* sí se repita a
    propósito), se extrajeron dos componentes compartidos ya usados en más de una
    página: `src/components/tech-badges.tsx` (`TECH_BADGES` + `<TechBadgeRow />`, los
    12 logos de marca) y `src/components/open-source-card.tsx` (`<OpenSourceCard />`,
    la tarjeta "Código abierto, de verdad" con los 2 repos de GitHub). Si se edita la
    lista de tecnologías o los repos, hacerlo en estos dos archivos — los cambios se
    reflejan automáticamente en todas las páginas que los usan.
  - `<TechBadgeRow />` se añadió también a `/proyecto/objetivos`, al final, como "El
    stack real: las cuatro competencias, en herramientas concretas".
  - `<OpenSourceCard />` se añadió también a `/proyecto/filosofia`, justo después de la
    grid de `REASONS` ("Documentable de verdad", "Reutilizable después del TFG") —
    sirve de prueba concreta de esas dos afirmaciones.
  - Git: el checkpoint (`9e4a7bf`) y la reestructuración revertida (`4aa0a7b`) se
    quedan en el historial tal cual — no se ha hecho `reset`/`force-push`, solo commits
    nuevos encima, así que el historial completo de la sesión sigue siendo recuperable.
  - Verificado en navegador (Chrome vía MCP) en desktop tras `npm run build` en verde:
    home con el contenido completo restaurado, y las tres tarjetas/filas nuevas
    renderizando en `/proyecto/introduccion`, `/proyecto/objetivos` y
    `/proyecto/filosofia`.
- **`/proyecto/objetivos` — nueva sección "La motivación real"** (agosto 2026, dictada
  casi palabra por palabra por la autora): sección nueva justo después del `PageHero`,
  antes de la rueda de 4 competencias existente, que explica que el objetivo del TFG va
  más allá del expediente académico — combina una pasión personal (aeronáutica) con la
  intención consciente de tocar la mayor parte de las disciplinas de la carrera.
  - Imagen grande (`IMAGES.droneSnowMountain`, ya existente en el catálogo, reutilizada
    de `/multimedia`) + dos imágenes de apoyo en fila (`IMAGES.circuitMacro`,
    `IMAGES.antennaTower`, también ya existentes) — no se han añadido imágenes nuevas al
    catálogo, todas verificadas previamente.
  - Grid de 9 tarjetas (`DISCIPLINES`, icono + texto) más allá de las 4 competencias de
    la rueda: Electrónica, Comunicaciones (incluye seguridad/cifrado/redes privadas),
    IoT & cloud, Programación (incluye IA/LLMs), Sistemas (Linux), Normativa (licencias
    AESA), Gestión de proyectos, Sostenibilidad (ODS) y Programación Web — esta última
    señala explícitamente que la propia web es fruto de la optativa de Programación Web
    cursada en la carrera.
  - Caja de alerta (estilo `signal`, icono `Thermometer`) que explica el porqué de los
    sensores ambientales del dron (gases, humo de incendio incipiente, frío/calor
    extremo) como ejemplo concreto de por qué IoT/Mosquitto son centrales en el sistema,
    no un añadido — conecta la lista de disciplinas con la misión real de SAR.
  - Cita de cierre a modo de blockquote oscuro: contrasta el título formal del TFG con
    la motivación real detrás.
  - Verificado en navegador (Chrome vía MCP) en desktop tras `npm run build` en verde.
- **Logo real del Club Alas de Galapagar añadido** (agosto 2026): descargado del avatar
  del canal de YouTube del club (`@alasdegalapagar8673`, URL de `yt3.googleusercontent.com`
  proporcionada directamente por la autora) a `public/images/club-alas-de-galapagar-logo.jpg`
  — sustituye el placeholder "[pendiente de conseguir]" en la tarjeta de colaborador
  destacado de `/colaboradores`. Placeholder correspondiente ya quitado de la lista de
  pendientes más abajo.
- **Vídeo del club añadido a `/multimedia`**: "Club aeromodelismo Alas de Galapagar"
  (YouTube `2HKlq-o7WxM`, mismo canal que el logo — confirmado por metadata oEmbed), en
  la galería junto al resto de vídeos, con miniatura vía `img.youtube.com/vi/.../hqdefault.jpg`
  y reproducción en el lightbox existente (`youtubeId`).
- **`/colaboradores` ampliado** (agosto 2026, a petición explícita de la autora): la
  tarjeta del Club Alas de Galapagar abre ahora explicando que el proyecto ha sido en
  gran parte posible por las facilidades conseguidas como socia del club (antes decía
  solo que estaba "registrado y asociado ... lo que incluye el seguro obligatorio"), la
  palabra "instalaciones" enlaza al vídeo de presentación del club en YouTube
  (`2HKlq-o7WxM`), menciona el acceso a una amplia zona de vuelo homologada (sin
  trámites de permisos ni riesgo de zonas restringidas), y hay un párrafo de
  agradecimiento explícito por el material prestado, el asesoramiento en vuelo de
  drones y la acogida como miembro del club.
  - **Nuevo patrocinador: EuropeSIP.** Tarjeta clara (`bg-surface`, texto `text-ink` /
    `text-ink-muted`) justo debajo de la del club, con su logo oficial dentro de una caja
    `bg-paper` — descargado de `europesip.com` a `public/images/europesip-logo.svg`
    (trazos blancos, pensado para fondo oscuro). La versión mostrada en la página es
    `public/images/europesip-logo-dark.svg`, una copia con los mismos trazos recoloreados
    a `--color-ink` (`#0a0e1a`) para que se lea sobre fondo claro — la autora pidió
    explícitamente quitar el fondo negro que se usó en un primer intento por
    "demasiado oscuro". Si se necesita la versión oscura original (p. ej. para un fondo
    `bg-ink`), sigue disponible en `europesip-logo.svg`. Tanto el logo como el nombre
    "EuropeSIP" enlazan a `europesip.com`, y "IA Soberana" dentro del texto enlaza
    específicamente a su página de soluciones de IA
    (`europesip.com/es/europesip/soluciones/inteligencia-artificial/` — confirmado que
    esa página usa literalmente el término "Soberana" antes de citarlo), y "página de
    crowdfunding" (segundo párrafo) enlaza a `LANDING_URL`. Texto final: dos párrafos
    dictados literalmente por la autora (tercera versión — las dos reescrituras
    anteriores de este mismo texto no la convencieron): EuropeSIP es una empresa
    madrileña especializada en IA Soberana (despliegue de modelos en infraestructuras
    propias, bajo control local estricto), filosofía que se alinea con que la detección
    de Guardian Eye corra a bordo por Edge Computing sin depender de la nube; identificó
    y formalizó la colaboración a través de la página de crowdfunding, sufragando un kit
    de desarrollo Holybro, una Raspberry Pi y componentes adicionales. Igual que el
    resto de logos SVG
    externos del proyecto (`aws.svg`, `linkedin.svg`), ambas versiones se renderizan con
    `<img>` plano, no `next/image` — Next bloquea la optimización de SVG locales salvo
    que se active `dangerouslyAllowSVG` en `next.config.ts`, cosa que este proyecto no ha
    necesitado hasta ahora.
- **Icono de Home en el logo del header** (`src/components/site-header.tsx`): a
  petición de la autora ("no queda claro que el logo es un link al Home"), se añadió el
  icono `Home` de `lucide-react` justo delante del texto "Guardian Eye" en el link del
  logo — el icono `Radar` en el círculo de la izquierda sigue siendo el logo/marca, no
  se ha tocado.
- **Breadcrumb "Inicio" en todas las subpáginas con `breadcrumbs`**: `{ label: "Inicio",
  href: "/" }` como primer elemento de `breadcrumbs` en el `PageHero` — ya está en las 7
  páginas que usan esta prop: `/proyecto/introduccion`, `/proyecto/objetivos`,
  `/proyecto/filosofia`, `/proyecto/metodologia`, `/arquitectura/comunicaciones`,
  `/arquitectura/hardware`, `/arquitectura/software`. (`/colaboradores`, `/ia`,
  `/multimedia`, `/impacto` y los hubs de `/proyecto` y `/arquitectura` no usan
  `breadcrumbs` en su `PageHero`, así que no aplica ahí.) Si se crea una subpágina nueva
  con breadcrumbs, añadir este mismo primer elemento por consistencia.
- **`SubpageNav` — enlace "Home" cuando no hay `prev`** (`src/components/subpage-nav.tsx`):
  antes, el hueco a la izquierda del botón central ("Volver a Proyecto"/"Volver a
  Arquitectura") quedaba vacío (`<span />`) en las páginas que son la primera de su
  secuencia y no reciben prop `prev` (`/proyecto/introduccion`,
  `/arquitectura/comunicaciones`). Ahora ese hueco muestra un enlace "← Home" a `/`, con
  el mismo estilo que el enlace `next` del lado derecho. Las páginas que sí tienen `prev`
  (objetivos, filosofía, metodología, hardware, software) no se ven afectadas — siguen
  mostrando su enlace `prev` normal.
- **`TripleLinkDiagram` corregido a 3 nodos de verdad** (`src/components/diagrams/triple-link-diagram.tsx`,
  usado solo en `/arquitectura/comunicaciones`): tenía 4 nodos (`rf`, `tlm`, `wifi`,
  `4g`) aunque la página lo llama "enlace múltiple/triple" y la grid de tarjetas de
  debajo (`LINK_CARDS`) ya unifica WiFi y 4G/LTE en una sola tarjeta — inconsistencia
  detectada por la autora. Se fusionaron los nodos `wifi` y `4g` en uno solo: `label:
  "Cloud · AWS"`, `freq: "WiFi / 4G-LTE"` (ejerce de subtítulo), icono `Cloud`, color
  `--color-mesh-violet` (el que tenía antes el nodo `4g`). Los 3 nodos resultantes se
  reposicionaron simétricamente en el SVG (`x: 100, 500, 900` sobre un viewBox de 1000
  de ancho, con el nodo central alineado bajo el dron en `x: 500`) — antes había 4 nodos
  espaciados uniformemente en `x: 100, 367, 633, 900`. El import de `Wifi` de
  `lucide-react` se quitó del archivo por quedar sin uso.
- **Nueva línea futura en `/impacto`: "Integración con Telegram"** — añadida al array
  `FUTURE_LINES` de `src/app/impacto/page.tsx` (icono `Bot` de `lucide-react`), a
  petición explícita de la autora: dar órdenes al dron por Telegram en lenguaje
  coloquial, interpretadas por un LLM que las traduce en acciones concretas — con los
  dos ejemplos que dio literalmente ("busca en la zona de la dehesa a una persona con un
  jersey rojo" / "busca en la zona del incendio personas en peligro").
- **`/ia` — párrafo introductorio + distinción YOLO/OpenCV** (agosto 2026; la autora
  primero pidió esto para `/arquitectura/comunicaciones` por error, se aclaró que era
  para `/ia`): al principio de la sección de contenido, antes de "¿Qué es YOLO?", nuevo
  párrafo que sitúa el enfoque general — YOLOv8, programado y entrenado directamente en
  la Raspberry Pi 5 a bordo. La tarjeta "Qué es una 'caja delimitadora'" (columna derecha
  del segundo grid) se amplió con un segundo párrafo que distingue los dos roles: YOLO
  hace inferencia/análisis del fotograma (qué hay y dónde), OpenCV manipula la imagen en
  sí (leer el flujo de vídeo, recortar/redimensionar fotogramas, dibujar la bounding box)
  — ubicación sugerida explícitamente por la autora.
- **Nueva línea futura en `/impacto`: "Tracking de personas entre fotogramas"** —
  añadida a `FUTURE_LINES` (icono `Footprints`), justo después de "Geolocalización
  precisa de la víctima" por afinidad temática. Parte de la limitación ya descrita en
  `/ia` ("Tampoco hay seguimiento individual entre fotogramas: solo un margen anti-spam")
  y explica la mejora: incorporar tracking (ByteTrack/DeepSORT como ejemplos) asignaría
  un ID persistente a cada persona detectada, con tres ventajas concretas — distinguir
  varias personas en la misma zona, seguir su trayectoria/dirección, y confirmar
  detecciones con más fiabilidad que una detección aislada de un único fotograma.
- **`/ia` — placeholder de métricas quitado; dataset de personas explicado en detalle**
  (agosto 2026, a petición explícita de la autora): se quitó de la página el bloque
  `[placeholder — no inventar]` sobre precisión/mAP, nº de vuelos y tamaño del dataset
  (sigue pendiente como tal, ver lista de pendientes más abajo, solo que ya no se muestra
  en el sitio). La tarjeta, renombrada de "Dataset de personas en construcción" a
  "Dataset de personas en constante evolución y progreso" (mismo pedido posterior de la
  autora), se amplió: además de las imágenes propias del Club Alas de Galapagar (cifra
  exacta deliberadamente generalizada a "decenas" en vez de la cifra concreta — pedido
  explícito de la autora, "suena mejor"), ahora explica que se combinan en Roboflow con
  datasets SAR ya disponibles públicamente (seleccionando los más adecuados para el
  escenario del proyecto), que el conjunto está en ampliación constante, y que se aumenta
  (data augmentation) para mejorar su calidad y variedad antes de cada entrenamiento.
- **Auditoría de mobile-readiness a nivel de código** (agosto 2026, a petición de la
  autora — "¿está la web preparada para móviles?"). Confirmado otra vez que
  `resize_window` del MCP de Chrome no cambia el `innerWidth` real de la página
  (comprobado explícitamente con `window.innerWidth` tras el resize: seguía en 1536px) —
  sigue sin ser posible verificar visualmente un viewport móvil real en esta máquina, así
  que esta auditoría fue de código, no visual. Se revisó: meta viewport (presente,
  autoinyectado por Next — `width=device-width, initial-scale=1`, confirmado con
  `curl`), todas las grids `grid-cols-N` con N≥3 (todas usan prefijos `sm:`/`lg:`, caen a
  1 columna en mobile), anchos fijos en px (`w-[Npx]`), bloques `<pre>`/`<code>` con
  contenido ancho, y `position: sticky` (no se usa en el proyecto). Se encontró y
  corrigió un problema real:
  - **`RadialDiagram`** (`src/components/diagrams/radial-diagram.tsx`, usado en
    `/impacto` y antes en `/proyecto/objetivos`): las etiquetas de los nodos tenían un
    ancho fijo `width: 150` (px) posicionado por porcentaje dentro de un contenedor que
    se encoge en mobile (`max-w-[560px]` pero `w-full` por debajo de eso) — en una
    pantalla de ~375px de ancho, los nodos de los extremos (a ~15%/85% del contenedor)
    se salían del contenedor y potencialmente de la propia página, sin ningún
    `overflow-x: hidden` de seguridad que lo evitara. Se cambió a
    `width: "clamp(84px, 23%, 150px)"` (escala con el contenedor, con suelo y techo) y el
    círculo de icono de cada nodo pasó de `h-[68px] w-[68px]` fijo a `h-12 w-12
    sm:h-[68px] sm:w-[68px]` (más pequeño por debajo de 640px). Verificado en desktop que
    el tamaño a partir de `sm:` no cambió.
  - Añadido `overflow-x: hidden` a `body` en `globals.css` como red de seguridad
    adicional (no había ninguna antes) — no afecta a nada porque el proyecto no usa
    `position: sticky` en ningún sitio.
  - No se encontraron más problemas de este tipo: el resto de diagramas
    (`TripleLinkDiagram`, `FlowDiagram`, `PhilosophyComparison`) ya usaban tamaños
    relativos/flex sin anchos fijos en px. `MobileNav` (drawer a pantalla completa) se
    revisó también y está bien estructurado (`w-full max-w-sm`, `overflow-y-auto`,
    targets táctiles ≥40px).
  - **Sigue pendiente:** verificación visual real en un dispositivo o en las DevTools del
    propio navegador de la autora (`Ctrl+Shift+M` en Chrome) — esta sesión no tiene forma
    de emular un viewport móvil real, así que esta auditoría reduce el riesgo pero no
    sustituye una comprobación visual.
- **Nueva subpágina `/proyecto/normativa` ("Normativa y legislación")** (agosto 2026, a
  petición explícita de la autora): explica de forma didáctica la normativa UAS aplicada
  al proyecto. Contenido investigado y verificado con búsquedas web puntuales durante la
  sesión (no inventado) — fuentes: sede electrónica de AESA
  (`sede.seguridadaerea.gob.es`) para el curso/examen A1/A3, y varias guías 2026 sobre
  normativa de drones en España para el resto de datos (registro de operador, Remote ID,
  seguro). Cubre:
  - **Quién regula qué**: EASA (Reglamento UE 2019/947 y 2019/945), AESA (RD 517/2024,
    sustituye al RD 1036/2017) y ENAIRE (gestor de la navegación aérea, no regula —
    informa a través de la app/web **ENAIRE Drones**, de consulta obligatoria antes de
    cada vuelo).
  - **Las tres categorías EASA** (Abierta/Específica/Certificada) y las tres
    subcategorías de la Abierta (A1/A2/A3) — un dron "legado" (sin marcado de clase
    C0-C4) de más de 250 g como el del proyecto necesita el certificado combinado A1/A3.
  - **Checklist de 6 obligaciones**: certificado de piloto A1/A3, registro de operador
    UAS (número con formato `ESP…`), marcado físico del dron con ese número, seguro de
    RC obligatorio para cualquier dron ≥250 g (mínimo 300.000 €), identificación remota
    electrónica (**Remote ID**, obligatoria desde el 1 de enero de 2026 para todo dron
    >250 g tenga o no marcado de clase — un dron legado necesita un módulo externo
    conforme al estándar **EN 4709-002**), y consulta de ENAIRE Drones antes de cada
    vuelo.
  - Caja "Cómo cumple Guardian Eye" (fondo oscuro, checklist con `CheckCircle2`):
    certificado obtenido, operador registrado, número de operador pegado en el chasis
    del dron **y también en el mando de control** (práctica añadida de trazabilidad, no
    una exigencia legal explícita — se presenta como tal), dron asegurado a través del
    Club Alas de Galapagar (coherente con lo ya dicho en `/colaboradores`), módulo
    Remote ID incorporado, y consulta de ENAIRE Drones antes de cada vuelo.
  - Disclaimer al final: contenido divulgativo, no sustituye la sede electrónica de AESA
    ni asesoramiento legal.
  - **Corrección de dato:** la caja "Marco regulatorio cumplido" de
    `/proyecto/introduccion` nombraba una app inexistente/no verificable, **"Drone
    Space"**, como la app oficial de consulta de espacio aéreo — se corrigió a **ENAIRE
    Drones** (el nombre real, confirmado por búsqueda web) y se añadió un enlace desde
    esa misma caja a la nueva página para el detalle completo.
  - Integrada en toda la navegación: `site-config.ts` (submenú "Proyecto" del header),
    footer, tarjeta en el hub `/proyecto` (el grid de tarjetas pasó de `lg:grid-cols-4` a
    `lg:grid-cols-3` para repartir mejor las 5 tarjetas resultantes, 3+2 en vez de 4+1),
    y `SubpageNav` de Filosofía (`next`) y de la propia página nueva (`prev: Filosofía`,
    última de la secuencia, sin `next`).
  - Imagen de cabecera nueva: `IMAGES.dronePilotSky` (Unsplash
    `photo-1482169704817-5b66aafa1a01`, piloto con el mando mirando al dron en vuelo bajo
    cielo despejado) — verificada con `curl` antes de añadirla al catálogo, siguiendo la
    convención del proyecto.
  - **Ronda de ajustes posterior** (misma sesión, a petición explícita de la autora):
    añadidos enlaces reales a las webs de EASA
    (`easa.europa.eu/en/light/topics/drones`), AESA
    (`seguridadaerea.gob.es/es/ambitos/drones`, más el enlace directo al curso A1/A3 en
    la sede electrónica) y ENAIRE Drones (web `drones.enaire.es` + apps de Android/iOS,
    verificadas con `curl` antes de usarlas) en las tarjetas de "El marco regulatorio" y
    en los ítems del checklist que las mencionan. Corregida además la caja "Cómo cumple
    Guardian Eye": antes daba a entender que el alta de operador la tenía "el dron" —
    ahora dice explícitamente que es **la autora del proyecto** quien está certificada
    A1/A3 y dada de alta como operadora UAS (el registro de operador corresponde siempre
    a una persona, nunca a la aeronave), aclarando que lo hizo para poder volar el dron y
    hacer las pruebas del proyecto. (Redacción "Es Nerea quien..." sonaba forzada según
    la autora — se cambió a "La autora del proyecto cuenta con..." en ambos puntos.)
  - **Corrección de la fuente del seguro**: el punto sobre el seguro de responsabilidad
    civil decía que lo gestionaba "el Club Alas de Galapagar" — dato incorrecto según la
    autora. El seguro se obtiene en realidad a través de la **licencia federativa de la
    Federación Aérea de Madrid** (`aereamadrid.es`, sección aeromodelismo), en la que la
    autora se federó expresamente para las pruebas del proyecto; el club no es quien
    contrata el seguro. Enlace a `aereamadrid.es/afiliacion-y-licencias/` verificado con
    `curl` antes de añadirlo. `COMPLIANCE` (el array que alimenta esta caja) pasó a
    admitir `ReactNode` además de `string` para poder incluir este enlace — la key del
    `.map()` cambió de `line` (ya no vale como key al no ser siempre string) a `i`
    (índice).
  - **Ajuste posterior**: la frase aclaratoria "— no es un seguro contratado por el Club
    Alas de Galapagar, sino por la federación a través de la licencia" se quitó a
    petición de la autora — no hacía falta mencionarlo, el nombre de la Federación Aérea
    de Madrid ya deja claro quién lo gestiona.
  - **Hero ampliado**: la descripción del `PageHero` de la página incorporó una frase
    explicando que dentro del TFG se ha puesto especial cuidado en analizar y cumplir
    toda la normativa existente — tanto la de telecomunicaciones (frecuencias de radio
    empleadas) como la específica de vuelo y las características exigidas al propio
    dron — a petición explícita de la autora.
- **Vídeo de YouTube embebido en modal en vez de enlace externo**
  (`src/components/video-link.tsx`, nuevo componente cliente reutilizable): el enlace
  "instalaciones" de la tarjeta del Club Alas de Galapagar en `/colaboradores` abría
  antes el vídeo directamente en YouTube (`target="_blank"`); ahora abre un diálogo
  modal con el vídeo embebido vía `youtube-nocookie.com` (mismo patrón que ya usa
  `MediaGallery` en `/multimedia`, pero extraído a un componente aparte para poder
  envolver un simple trozo de texto en vez de una tarjeta de galería completa) — el
  usuario puede seguir optando por "Ver en YouTube" desde dentro del propio modal si
  quiere.
- **Imagen de fondo de `/proyecto/normativa` sustituida por una que relaciona
  visualmente drones y normativa** (a petición explícita de la autora: "puede haber un
  gráfico que relacione más drones con normativa, como que aparezca un policía con un
  dron, o algo parecido"): se buscó primero en Unsplash (`WebSearch`/`WebFetch`, términos
  tipo "police officer drone" / "drone inspection officer") sin encontrar ninguna foto de
  stock libre adecuada, así que se generó una imagen con IA vía Replicate
  (`black-forest-labs/flux-1.1-pro`, 1344×768, formato 16:9) siguiendo el mismo precedente
  que la imagen de hero de la home: un inspector de seguridad aérea con chaleco reflectante
  y casco, sosteniendo una lista de comprobación, junto a un dron cuadricóptero en vuelo en
  un campo abierto — se evitó deliberadamente representar a un policía real (insignias,
  uniforme oficial) para no sugerir una autoridad concreta inexistente, optando por una
  figura genérica de inspección/cumplimiento normativo, en línea con la libertad ("o algo
  parecido") que dio la autora. Guardada en
  `public/images/hero-normativa-inspector.jpg` y catalogada como `IMAGES.droneInspectorField`
  en `src/lib/images.ts` (con el `alt` marcándola explícitamente como ilustración generada
  por IA a modo representativo). `src/app/proyecto/normativa/page.tsx` la usa en el
  `PageHero` con un `objectPosition` propio (`"68% 55%"`) en vez del valor por defecto del
  componente, para que tanto el inspector como el dron queden visibles en el recorte
  panorámico del hero.
- **Nueva sección de nivel superior "Construcción del dron"** (agosto 2026, a petición
  explícita de la autora, a partir de material real que aportó: 89 fotos propias del
  montaje del kit Holybro X500 V2 en `Downloads/guias/FotosHolly/FotosDron-Holybro/`,
  3 guías oficiales de montaje del fabricante, el recibo de compra y un PDF de
  referencia genérico sobre las partes de un dron). Nueva entrada de navegación entre
  "Arquitectura técnica" y "Inteligencia Artificial" (`site-config.ts`, eyebrow "03";
  IA/Multimedia/Impacto/Colaboradores se renumeraron a 04-07), con hub + 3 subpáginas
  siguiendo el patrón hub+subpáginas ya usado por Proyecto y Arquitectura:
  - `/construccion` — hub con 3 tarjetas.
  - `/construccion/piezas` — "Piezas de un dron": anatomía genérica de cualquier
    multirrotor (chasis, motores, ESCs, PDB, batería, FC, GPS, receptor RC, radio de
    telemetría), ilustrada con fotos reales de los propios componentes de Guardian Eye
    en vez de stock de Unsplash — más honesto y evita tener que verificar imágenes
    nuevas. **Nota importante:** el PDF de referencia que aportó la autora
    (`InfoTFGs/partes.pdf`) resultó ser la página 29 de un TFM de una persona distinta
    — Lucía Gorostidi García (ETSII-UPM), proyecto de dron para inspección de plantas
    fotovoltaicas, con chasis F450 y componentes que no coinciden con Guardian Eye
    (Sony IMX477, RadioMaster RP1...). Se descartó como fuente de datos concretos por
    ese motivo — el contenido de la página se escribió desde cero, en genérico, sin
    copiar sus cifras ni specs.
  - `/construccion/armazon` — "Cerebro 1: armazón y Pixhawk": por qué se compró el kit
    Holybro X500 V2 en vez de piezas sueltas (evitar comprobar compatibilidad pieza a
    pieza y reducir soldadura), y guía paso a paso (13 pasos) del montaje real del
    armazón y la Pixhawk, con fotos propias seleccionadas de las 89 originales.
  - `/construccion/edge-computing` — "Cerebro 2: Edge Computing": Raspberry Pi 5,
    Hailo-8L, módem 4G y sensor BME680 — estructurada y enlazada ya, pero marcada
    `underConstruction` porque **todavía no hay fotos reales de este montaje** (la
    autora las tomará más adelante, incluyendo el pincho del módem 4G, y esta página
    se ampliará entonces con el mismo formato paso a paso que `/construccion/armazon`).
  - Las tres subpáginas y el hub siguen el mismo patrón que el resto del sitio:
    `PageHero` con breadcrumbs, `SubpageNav` con prev/next, tarjetas con imagen +
    leyenda en degradado (mismo patrón que ya usaba `/proyecto/objetivos`).
  - Footer (`site-footer.tsx`) ampliado con una cuarta columna de enlaces
    ("Construcción") y el grid pasó de 4 a 5 columnas en desktop
    (`lg:grid-cols-[1.2fr_1fr_1fr_1fr_1fr]`).
  - **Procesado de las fotos:** seleccionadas 15 de las 89 originales (13 para el paso
    a paso de `/construccion/armazon`, 2 adicionales —GPS y radio de telemetría— para
    `/construccion/piezas`). Redimensionadas a un máximo de 1600px de lado con
    Python/Pillow (`ImageOps.exif_transpose` para corregir la rotación del móvil,
    recompresión JPEG calidad 82), pasando de 1.6-3.5 MB a 150-330 KB cada una — y
    **guardadas sin metadata EXIF** (el `save()` de Pillow no reescribe el EXIF
    original a menos que se le pase explícitamente, así que las fotos publicadas no
    llevan la ubicación GPS del teléfono que las tomó, importante al ser una web
    pública). Guardadas en `public/images/` con prefijo `montaje-NN-` (paso a paso,
    numeradas) y `pieza-` (piezas sueltas), catalogadas en `src/lib/images.ts`.
  - **Corrección de datos importante descubierta durante esta tarea:** las fotos reales
    de la Pixhawk (texto "pixhawk 6X" impreso en la placa) y el recibo de compra
    (`Receipt-X500v2.pdf`: "Holybro Kit de Desarrollo PX4 - X500 v2 (**6X** & M10 &
    **433Mhz**)") contradecían lo que estaba publicado en el resto de la web —
    "Pixhawk 6C" y telemetría a "915 MHz" — este último dato fijado a propósito en
    su momento siguiendo el prompt maestro del encargo en vez de la documentación
    técnica real (ver "Conflictos de fuentes" más abajo). La foto del propio módulo de
    radio ("TELEMETRY RADIO 433 MHz 100mW" impreso en la carcasa) confirmó
    definitivamente 433 MHz. Se corrigió `Pixhawk 6C→6X` y `915 MHz→433 MHz` en las 8
    menciones de todo el sitio (`arquitectura/hardware`, `arquitectura/comunicaciones`,
    `arquitectura/page.tsx`, `multimedia/page.tsx`, `triple-link-diagram.tsx`,
    `site-footer.tsx`, home) — el recibo y la propia placa son la fuente más fiable que
    existe (compra real + foto real), por encima de cualquier documento anterior.
  - Verificado con `npm run build` (22 rutas, todas estáticas) y `npm run lint` (sin
    errores nuevos) en verde, y repaso de contenido en navegador (Chrome vía MCP,
    `get_page_text` + comprobación de red de las 4 páginas nuevas y de
    `/arquitectura/hardware`) — la captura de pantalla (`computer screenshot`) no
    funcionó en esta sesión concreta porque el panel del navegador no estaba visible
    en la interfaz (mismo tipo de limitación de entorno ya documentado antes con
    `resize_window`), así que el QA visual pixel a pixel de esta sección concreta
    sigue pendiente de una revisión manual de la autora.
- **Revisión de la carpeta `Downloads/guias/Documentos de Apoyo/`** (agosto 2026, a petición
  de la autora — "¿merece la pena incluir algo de esto en la web?"): 11 documentos revisados
  (9 `.docx` vía `python-docx`, 2 PDF, 1 PNG). Igual que con `partes.pdf` en la tarea anterior,
  **`TFG_Iker-ConApendiceIA.docx` es el TFG de otra persona** (Iker Gorostidi García, Ingeniería
  Industrial, gestión de riesgos en renovables — sin relación con Guardian Eye) y
  **`Guia_Pipeline_Dataset_Roboflow_Hailo.docx` es el pipeline del otro proyecto** (detección de
  "defectos" en paneles fotovoltaicos, no de personas) — ambos descartados como fuente. La
  imagen `Drones__La_Revolución_Silenciosa.png` (infografía de mercado generada con IA, cifras
  no verificadas) tampoco se ha usado. De los 6 documentos restantes, genuinamente del proyecto
  o de referencia técnica genérica útil, salieron dos piezas de trabajo:
  - **Nueva subpágina `/arquitectura/datos`** ("Datos e IoT"), 4ª hija de Arquitectura técnica
    (`site-config.ts`; el hub `/arquitectura` pasó de 3 a 4 tarjetas, grid de `lg:grid-cols-3` a
    `sm:grid-cols-2 lg:grid-cols-4`). Basada en `arquitectura_datos.docx` (documento propio de la
    autora, agosto 2026) pero **sin duplicar** `/arquitectura/software`: esa página explica el
    *qué* (4 procesos, MQTT, InfluxDB) y la nueva explica el *por qué* — los tres principios de
    diseño (edge-first, store-and-forward, productor-consumidor), el fichero de estado compartido
    entre `vuelo.py` y `deteccion.py` (único punto de comunicación entre procesos, con escritura
    atómica), el flujo completo de una detección reutilizando `FlowDiagram`, y dos cajas de cierre
    que enlazan con contenido ya publicado (limitación de geolocalización de `/ia`, filosofía de
    validación por etapas de `/proyecto/metodologia`) en vez de repetirlo. **Nota de terminología:**
    el documento fuente usa el prefijo de topic `sar/...`; la autora confirmó explícitamente que el
    correcto es `dronsar/...` (el que ya usa `/arquitectura/software`), así que la página nueva usa
    ese prefijo, no el del documento. `SubpageNav` de Software & Cloud ganó un `next` hacia esta
    página; es la última de la cadena (sin `next` propio).
  - **`/multimedia` reestructurada en hub + subpágina** (a petición explícita de la autora, que
    quería una sección de "documentación y recursos" en Multimedia sin que la galería creciera
    hasta hacerse larga de leer): `Multimedia` ganó `children` en `site-config.ts` (antes era un
    enlace directo) — "Galería" (`/multimedia`, sin cambios de contenido salvo quitar la sección
    "Explora el código") y **"Documentación y recursos"** (`/multimedia/documentacion`, nueva).
    La autora pidió explícitamente **no quitar** los repos de la Home (siguen en `OpenSourceCard`,
    repetidos a propósito "para que tenga más visibilidad") — la única sección que se *movió* (no
    se duplicó) fue "Explora el código" de la galería a la nueva subpágina. La subpágina nueva
    añade, además de los 3 repos: guías oficiales de montaje de Holybro (enlazadas, no alojadas —
    verificadas con `curl`: `docs.holybro.com/.../getting-started-build-guide` y la ficha del kit
    en `holybro.com`), enlaces a EASA/AESA/ENAIRE Drones (reutilizando las URLs ya verificadas de
    `/proyecto/normativa`, con un enlace cruzado a esa página para el detalle completo), el diario
    del proyecto (`LANDING_JOURNAL_URL`), y una sección nueva de **6 PDFs descargables**.
  - **Los 6 PDFs** (`public/docs/*.pdf`, ~90-125 KB cada uno) se generaron a partir de los propios
    `.docx` de la carpeta de apoyo — no son los `.docx` originales convertidos 1:1, sino
    regenerados con un script Python (`fpdf2` + `python-docx`, sin LibreOffice ni Word instalados
    en esta máquina) que respeta la estructura real del documento (Heading 1/2, listas, **tablas**
    — importante: la primera versión del script solo iteraba `document.paragraphs` y las tablas de
    Word quedaban vacías; se corrigió iterando `document.element.body` en orden real con
    `iter_block_items()` para intercalar párrafos y tablas tal como aparecen en el original),
    portada propia con el nombre del proyecto y de la autora, y tipografía Arial vía TTF de Windows
    (necesario para que acentos, rayas y comillas tipográficas del español se rendericen bien; las
    fuentes core de PDF no cubren esos caracteres). Verificado visualmente vía `Read` en al menos
    un documento completo (`pipeline-deteccion-personas.pdf`, 9 páginas) tras la corrección de
    tablas. Documentos incluidos: `arquitectura-datos-iot.pdf`, `mavlink-explicado.pdf`,
    `pipeline-deteccion-personas.pdf`, `transmision-video.pdf`, `normativa-sanciones-deteccion.pdf`,
    `teleoperacion-simulacion.pdf` — los 5 restantes de la carpeta de apoyo (los 2 descartados por
    ser de otro proyecto, más 3 no priorizados: `Normativa_drones_final` sí se usó,
    `Tutorial_Completo_Python_Hello_World_ClaudeCode_YOLO.docx` y los 2 PDF de la carpeta original
    no se han convertido) quedan fuera de esta primera tanda si se quieren añadir más adelante.
  - Además, se corrigió un bug de numeración arrastrado desde la sesión anterior: al insertar
    "Construcción del dron" como sección 03, el `eyebrow` de `site-config.ts` se renumeró
    correctamente pero **el `eyebrow` hardcodeado dentro del `PageHero` de cada página
    top-level** (`/ia`, `/multimedia`, `/impacto`, `/colaboradores`) no se tocó y se quedó
    desincronizado ("Sec. 03" en `/ia` cuando el menú ya decía "04", etc.) — corregido a
    04/05/06/07 respectivamente. **Importante para el futuro:** estos dos sitios (el `eyebrow` de
    `site-config.ts` y el `eyebrow="Sec. NN · ..."` de cada `PageHero`) no están acoplados en
    código, así que cualquier reordenación de `NAV_ITEMS` debe actualizar ambos a mano.
  - Verificado con `npm run build` (24 rutas, todas estáticas) y `npm run lint` (sin errores
    nuevos) en verde, y repaso en navegador (Chrome vía MCP: `get_page_text` de las páginas
    nuevas/modificadas, `read_page` con `hover` sobre los triggers de Arquitectura y Multimedia
    para confirmar que el desplegable de escritorio muestra las 4 y 2 entradas nuevas
    respectivamente, y `curl` contra el dev server para confirmar que los PDF se sirven con
    `content-type: application/pdf`). La captura de pantalla (`computer screenshot`) volvió a
    fallar por el mismo motivo de entorno ya documentado (panel del navegador no visible en esta
    sesión) — QA visual pixel a pixel pendiente de revisión manual, igual que en tareas anteriores.
- **`/colaboradores` — sección "Personas" reescrita a petición explícita de la autora** (agosto
  2026): la grid de 4 tarjetas (`COLLABORATORS`) con nombre/rol/nota suelta por persona quedaba
  fría — "no me gusta como se mencionan las personas". Sustituida por un único párrafo de
  agradecimiento colectivo a Darco, Dani, Paco y José Manuel (texto dictado por la autora,
  corregidas solo tildes/erratas, misma convención que el resto del sitio), y el título/
  descripción de la sección pasaron de "Mentores y apoyos del club" / "Nombres ya publicados..."
  a **"Mentores y Personas destacadas"** con una descripción personal sobre por qué se les
  menciona.
  - **Nueva tarjeta "Mención especial: El dron de José Manuel"**: José Manuel le prestó
    desinteresadamente su propio dron (con controladora DJI Naza) para que la autora no tuviera
    que afrontar un desembolso económico al empezar el proyecto. El texto publicado explica —
    con el enfoque que pidió explícitamente la autora — que finalmente se optó por el kit
    Holybro X500 V2 por encajar mejor con el proyecto (construir el sistema desde cero, mejor
    controladora), y dedica un reconocimiento aparte a la calidad del dron de José Manuel (lo
    construyó él mismo hace años; pese a llevar electrónica más antigua, es de primera calidad —
    lo usaba para grabar bodas). **Nota importante para el futuro:** la autora fue explícita en
    que el motivo real de no usar ese dron no es el que se publica (simplemente prefería no
    usarlo) — el texto público usa un motivo alternativo (adecuación del kit Holybro) a petición
    suya. Si se retoca este texto más adelante, mantener ese mismo enfoque en vez de "corregirlo"
    hacia el motivo real.
  - **Fotos del dron de José Manuel** (`Downloads/guias/FotosAlas/*.jpeg`, 4 fotos originales
    aportadas por la autora): se seleccionaron 3 de las 4 (se descartó la vista superior con las
    hélices visibles, `12.32.44`, por ser redundante con la del gimbal cerrado) y se
    redimensionaron con el mismo proceso ya usado para las fotos de montaje — Python/Pillow,
    máx. 1600 px de lado, `ImageOps.exif_transpose`, recompresión JPEG calidad 82, sin metadata
    EXIF — guardadas en `public/images/jose-manuel-dron-0{1,2,3}-*.jpg` y catalogadas en
    `src/lib/images.ts` (`joseManuelDroneFrontal/Naza/Gimbal`, `credit: "Fotografía cedida por
    José Manuel"`).
  - **Nuevo componente `src/components/photo-lightbox-grid.tsx`** (`PhotoLightboxGrid`):
    galería de fotos en grid de 3 columnas que abre una a pantalla completa en un `Dialog` de
    Radix al hacer clic (mismo patrón visual que `VideoLink`/`MediaGallery` — overlay +
    `motion.div` + botón de cierre — pero para imagen fija con `object-contain` en vez de vídeo).
    Reutilizable si se necesita otra galería de fotos suelta en el futuro; de momento solo se usa
    aquí.
  - Verificado con `npm run build` (24 rutas) y `npm run lint` en verde, y en navegador (Chrome
    vía MCP): contenido con `get_page_text`, y el lightbox probado de extremo a extremo — clic en
    la miniatura abre el diálogo con la imagen ampliada y su leyenda, botón "Cerrar" lo cierra.
    Captura de pantalla (`computer screenshot`) no disponible en esta sesión, mismo motivo de
    entorno ya documentado antes.
- **`/colaboradores` — tutor/a académico/a relleno + ajustes al homenaje de José Manuel**
  (agosto 2026, misma sesión que la reescritura de "Personas" de arriba): el placeholder
  "[nombre pendiente de añadir]" se sustituyó por el nombre real, **Daniel Díaz Sánchez**,
  profesor de Aplicaciones Telemáticas en la Universidad Carlos III de Madrid, con un
  agradecimiento por su disponibilidad, apoyo y sugerencias durante la redacción del TFG — su
  tarjeta se movió, a petición explícita de la autora, **por encima** del párrafo de Darco/
  Dani/Paco/José Manuel (antes iba debajo de la tarjeta de homenaje a José Manuel).
  - Párrafo de la tarjeta "El dron de José Manuel" ampliado con dos añadidos dictados por la
    autora: (1) la idea inicial era desmontar el dron de José Manuel y reaprovechar sus piezas
    para construir uno nuevo, algo que no hizo falta gracias a conseguir el kit Holybro X500
    V2 a través de EuropeSIP (con enlace a `europesip.com`, mismo estilo que el resto de
    enlaces de la página); y (2) una frase de cierre sobre el aprendizaje real que le dejó el
    montaje de José Manuel — "qué piezas utilizar, cómo disponerlas, y cómo iban las cosas
    unidas" — antes de la explicación (ya publicada) de por qué se acabó optando por el kit
    Holybro en vez de su dron.
  - Verificado con `npm run build` (24 rutas) y `npm run lint` en verde, y en navegador
    (Chrome vía MCP, `get_page_text`) — sin errores de consola.
  - **Ronda posterior de ajustes al texto del homenaje** (misma sesión): los dos párrafos de
    la tarjeta "El dron de José Manuel" se reescribieron de nuevo, dictados otra vez por la
    autora (mismos criterios de edición — solo se corrigen tildes/erratas/concordancia, no la
    redacción). Cambios de contenido relevantes: (1) la mención a EuropeSIP en esta tarjeta se
    generalizó a "a través de otro colaborador" (sin enlace) — EuropeSIP sigue nombrado y
    enlazado en su propia tarjeta de patrocinador más arriba en la misma página, esto solo
    quita la redundancia aquí; (2) se añadió que el dron de José Manuel "ha sido mi modelo
    para construir el posterior" y que pasó varios días estudiándolo y analizándolo; (3) el
    segundo párrafo se amplió con el detalle de los motores (serían "la envidia de cualquier
    dron actual") y una reflexión de cierre sobre que el dron se construyó en una época con
    mucho menos acceso a la información que ahora. Verificado de nuevo con `npm run build` y
    `npm run lint` en verde, y en navegador sin errores de consola.
- **`/arquitectura/datos` reorientada por completo** (agosto 2026, a petición explícita de la
  autora — "no me gusta la orientación de la página"): antes arrancaba con "por qué cuatro
  procesos y no uno" (marco abstracto de ingeniería). Ahora arranca con la motivación real:
  uno de los objetivos del proyecto era sensorizar el dron, y siendo conscientes de que las
  comunicaciones en un dron —más aún en entorno rural, con 4G intermitente— pueden fallar, se
  reforzaron con brokers, MQTT y store-and-forward (nuevo glosario rápido de estos tres
  términos, mismo estilo ya usado en `/arquitectura/hardware`). Nueva sección "Más allá de un
  IoT tradicional": además del patrón IoT de manual (sensores → MQTT → InfluxDB → Grafana),
  el sistema también envía información de vídeo, la localización de personas detectadas (con
  el matiz de posición-del-dron-más-píxeles ya establecido, no geolocalización precisa), y —a
  diferencia de un IoT que solo sube datos— también recibe comandos de alto nivel hacia el
  propio dron (iniciar misión, aterrizar, grabar). La sección de procesos
  (`sensor.py`/`sistema.py`/`vuelo.py`/`deteccion.py`) se mantiene pero ya no menciona el
  mecanismo de coordinación interna entre `vuelo.py` y `deteccion.py` — a petición explícita
  de la autora, que pidió no revelar el fichero de estado compartido; ahora solo se dice que
  esa coordinación "ocurre dentro de la propia Raspberry Pi... sin pasar por la red ni por el
  broker", sin más detalle. El paso "Lee posición" del `FlowDiagram` se renombró de "Fichero
  de estado de vuelo.py" a "Consulta interna a vuelo.py" por el mismo motivo. De paso se
  corrigió una inconsistencia de nombres ya existente (`ambiental.py` en esta página vs.
  `sensor.py` en `/arquitectura/software`) unificando a `sensor.py`. Los tres principios de
  diseño (edge-first/store-and-forward/productor-consumidor) y las dos cajas finales (solo
  píxeles, validable sin hardware) se conservan, reordenados al final de la página como
  refuerzo técnico en vez de ser la apertura. Verificado con `npm run build` (24 rutas) y
  `npm run lint` en verde, y en navegador sin errores de consola ni menciones a "fichero".
- **Reordenación de "Arquitectura técnica" + reescritura de Software & Cloud** (agosto 2026,
  a petición explícita de la autora): el orden de las 4 subpáginas pasó de Comunicaciones →
  Hardware → Software & Cloud → Datos e IoT a **Hardware → Comunicaciones → Datos e IoT →
  Software & Cloud** — cambiado en los 4 sitios que mantienen este orden por separado (no
  están acoplados en código, hay que tocar los 4 a mano si se reordena otra vez):
  `site-config.ts` (`children` del submenú, controla también el footer y el desplegable del
  header), `SECTIONS` del hub `/arquitectura` (las etiquetas 01-04 se generan por índice del
  array), y el `prev`/`next` del `SubpageNav` de las 4 subpáginas (cadena nueva: Hardware sin
  prev → Comunicaciones → Datos e IoT → Software & Cloud sin next).
  - **`/arquitectura/datos`**: añadida una frase explícita al principio conectando con
    Comunicaciones (enlazada) — aunque el enlace múltiple redundante ya es una base de
    comunicaciones robusta, se quiso reforzar esa capa aplicando además los conceptos clave
    de las comunicaciones IoT (broker/MQTT/store-and-forward).
  - **`/arquitectura/software` reescrita para eliminar la redundancia con Datos e IoT**
    (a petición explícita de la autora, "creo que hay redundancias... céntrate más en
    aquellos aspectos que no son redundantes"): se quitó el grid de los 4 procesos
    (`sensor.py`/`sistema.py`/`vuelo.py`/`deteccion.py`, ahora solo un enlace de una línea a
    Datos e IoT) y el `FlowDiagram` del sensor al panel (redundante con el patrón "sensores →
    MQTT → InfluxDB → Grafana" ya cubierto allí) y la explicación larga de publicación/
    suscripción (ahora remitida al glosario de Datos e IoT). En su lugar, la página se centra
    por completo en lo que no estaba documentado: **el panel de control**, una página web
    instalable como PWA (`manifest.json` + Service Worker, cacheo del *app shell*, offline
    del propio panel) desde la que se opera el dron — no solo operaciones principales
    (armar/desarmar, despegar, iniciar misión, aterrizar/RTL, grabar vídeo), sino también
    interacción con sensores y con la propia Raspberry Pi (intervalo del sensor ambiental,
    throttling de vídeo, apagado remoto). Se documentó también la cadena completa de un
    comando, con un `FlowDiagram` nuevo: Panel (PWA) → API REST (Flask, `POST
    /api/command`) → MQTT (arquitectura publicador/suscriptor, topic
    `dronsar/{dron_id}/comandos`) → `receptor.py` en la Raspberry Pi (suscrito al topic) →
    MAVLink → Pixhawk (arma/despega/aterriza).
    - **Todo verificado directamente contra el código real en GitHub** (no inventado): se
      inspeccionó con la API de GitHub y `raw.githubusercontent.com` el repo
      `drone-cloud-server` (`api-rest/api.py`, `api-rest/comandos.py`, `www/control/`
      — el panel PWA real, con sus grupos de botones "Motores", "Despegue", "Navegación",
      "Regreso", "Cámara" y "Sistema (Raspberry Pi)" — y su propio `README.md`, que ya
      documenta esta misma cadena) y `drone-edge-companion` (`receptor.py`, el suscriptor
      MQTT que traduce el JSON del comando a llamadas `pymavlink` contra el autopiloto).
      **Nota importante para el futuro:** `receptor.py` en el repo real, a día de hoy, solo
      tiene implementadas de verdad las acciones `arm`/`disarm` en su diccionario de
      acciones — el resto de comandos (`takeoff`, `land`, `rtl`, `hold`, `start_mission`)
      están validados como válidos en la API (`COMANDOS_VALIDOS`) y en los botones del panel,
      pero su traducción a MAVLink en el receptor todavía no está escrita. La página describe
      la arquitectura tal como está diseñada (que es real y así corre en producción para
      arm/disarm), sin afirmar que todas las acciones estén ya implementadas de extremo a
      extremo — si se quiere ser aún más explícito sobre este matiz en el futuro, añadir una
      nota de estado similar a la de `/ia` sobre el dataset en construcción.
    - Se enlazó directamente a los ficheros reales del código (`www/control`, `api-rest`,
      `receptor.py`) en vez de solo nombrarlos, verificado con `curl` que las 3 URLs devuelven
      200.
    - De paso se detectó (sin usarlo como fuente, ya que revela el mecanismo que la autora
      pidió no publicar) que `drone-edge-companion` tiene un fichero real
      `posicion_actual.json` — confirma que la decisión de no nombrar ningún fichero en
      Datos e IoT fue acertada, ya que ese es exactamente el mecanismo a ocultar.
  - Verificado con `npm run build` (24 rutas) y `npm run lint` en verde, y en navegador
    (Chrome vía MCP: hub, Hardware, Datos e IoT y Software & Cloud) — orden correcto en las
    4 ubicaciones, cadena de `SubpageNav` correcta de extremo a extremo, sin errores de
    consola.
- **Mockup del panel de control dentro de un marco de móvil en `/arquitectura/software`**
  (agosto 2026, a petición explícita de la autora — quería una imagen del panel PWA "que se
  vea que es accesible desde un móvil"). Dos hallazgos importantes antes de construirlo:
  - **La captura de pantalla real no es posible en esta sesión**: `computer screenshot` del
    MCP de Chrome sigue fallando ("the Browser pane is not displayed"), la misma limitación
    de entorno ya documentada varias veces en este archivo.
  - **El panel real (`control.gorostiditfg.com`, repo `drone-cloud-server`) no tiene
    autenticación** (`api.py`: "AVISO: sin autenticacion. Solo para simulacion / red de
    confianza") — así que un `<iframe>` en vivo del panel real en la web pública habría sido
    un riesgo de seguridad real (cualquier visitante podría pulsar "Armar" o "Apagar
    Raspberry Pi"). Se descartó esa opción.
  - Se preguntó a la autora entre dos caminos (`AskUserQuestion`) y eligió **recreación fiel
    en código** en vez de esperar a una captura suya real. Se construyó
    `src/components/panel-phone-mockup.tsx` (`PanelPhoneMockup`): un marco de móvil dibujado
    en CSS (bisel, notch, home indicator) con el panel recreado dentro usando **los valores
    reales** extraídos de `www/control/estilos.css` del repo (colores `#0D0C0A`/`#18160F`/
    `#E5892A` ámbar/`#D2483C` rojo, tipografías Big Shoulders + JetBrains Mono, la franja
    "cinta de baliza" y las esquinas de mira de cada grupo) — no es una captura ni un enlace
    en vivo, los botones no están conectados a ninguna API, y así lo dice un pie de nota
    explícito bajo el mockup. Integrado en la sección "El panel de control" de
    `/arquitectura/software` en una grid de dos columnas (texto + tarjetas a la izquierda,
    el móvil a la derecha).
  - **Nota técnica:** `next/font/google` en esta versión de Next no tiene "Big Shoulders
    Condensed" como familia separada (Google la consolidó en la fuente variable "Big
    Shoulders" con eje de anchura) — se usa `Big_Shoulders` con `weight: ["800"]` en su
    lugar; visualmente muy similar, con un warning inofensivo en build/dev ("Failed to find
    font override values") que no afecta al render.
  - **Colores/tamaños fuera de `DESIGN.md`**: como es una recreación deliberada de la
    identidad visual de un producto externo (el propio CSS real dice explícitamente que su
    paleta "equipo de rescate" ámbar/rojo/negro cálido es distinta a un dashboard azul-noche
    típico), se auto-aprobaron 11 `ignore-value` de `impeccable` con `--file` acotado solo a
    este componente (no globales) — no son drift del sistema de diseño del sitio, son la
    paleta de otro producto mostrada a propósito.
  - Verificado con `npm run build` y `npm run lint` en verde, y en navegador (`get_page_text`
    + `read_page`) confirmando que todo el contenido del mockup renderiza sin errores de
    consola (aparte de los WebSocket de HMR, un problema de la infraestructura de vista
    previa de esta sesión, no del componente).
  - **Ronda posterior de ajustes** (misma sesión, a petición explícita de la autora): quitado
    el pie de nota "Recreación fiel del panel real — mismo CSS..." bajo el mockup (ya no
    hace falta explicitarlo). Añadida una **segunda pantalla del mismo componente**
    (`PanelPhoneMockup` ganó una prop `variant: "vuelo" | "camara"`) para dejar claro que los
    vídeos del dron se pueden ver dentro de la propia app — la primera captura se cortaba
    antes de llegar al grupo "Cámara" del panel real. La segunda pantalla simula estar
    desplazada más abajo en la misma página (degradado de desvanecido arriba y abajo) y
    muestra el grupo "Regreso", el grupo "Cámara" (con una previsualización de vídeo
    simulada — gradiente que sugiere una vista aérea, badge "En directo" con punto rojo, HUD
    de altitud— más los botones de grabar/parar) y el arranque del grupo "Sistema (Raspberry
    Pi)". Las dos pantallas se muestran apiladas en `/arquitectura/software` con una
    etiqueta debajo de cada una ("Control de vuelo" / "Vídeo en directo"). La tarjeta
    "Cámara" de `PANEL_GROUPS` en la página también se reforzó para dejar explícito que el
    vídeo "se ve dentro del propio panel, sin salir de la app ni abrir otra herramienta".
  - Se corrigió de paso un `::before` sin `content` que no hacía nada (el punto rojo del
    badge "En directo" ahora es un `span` real, `.live-dot`).
  - 5 `ignore-value` adicionales de `impeccable` (mismo criterio y `--file` acotado que los
    11 anteriores) para los colores del degradado de la previsualización de vídeo simulada.
  - **Reubicación final** (misma sesión, a petición explícita de la autora — "no me gusta la
    ubicación"): las dos pantallas del móvil se sacaron de la columna junto al texto de "El
    panel de control" (esa sección volvió a ser de una sola columna, ancho completo) y se
    movieron a continuación del `FlowDiagram` de comandos y su párrafo de enlaces a GitHub —
    justo antes de la grid de infraestructura (AWS/MQTT/InfluxDB/nginx). Las dos pantallas se
    muestran ahora en la misma fila (`flex flex-row flex-wrap justify-center gap-10`, no
    apiladas verticalmente), con su etiqueta debajo de cada una.
  - **Contexto añadido al principio del `PageHero`** (misma sesión, dictado por la autora,
    solo se corrigieron tildes/erratas): nueva frase de apertura explicando que toda la
    arquitectura de hardware, comunicaciones y datos está gobernada por un desarrollo
    abierto, sobre el que se ha construido el software que recoge los datos de los sensores,
    controla el dron y gestiona el vídeo y la IA, pensado como una arquitectura escalable
    para ir sumando funcionalidades — antes de las dos frases ya existentes que sitúan esta
    página frente a Datos e IoT.
  - **Escalabilidad de AWS explicada en la tarjeta "AWS EC2 + Flask"**: se añadió que toda la
    gestión del sistema vive en la nube de Amazon, lo que da una base escalable y gestionable
    desde cualquier sitio sin depender de estar físicamente junto al dron.
  - **Ajuste posterior a esa misma frase de apertura** (misma sesión, la autora pidió
    reformular añadiendo un matiz): se amplió con la idea de que la arquitectura escalable se
    apoya en la flexibilidad de la nube para desplegar cada servicio que necesita el sistema
    — el broker de mensajería, el streaming de vídeo, el puente IoT o los servidores web del
    panel de control. Redactado desde cero a partir del dictado de la autora (traía la
    errata "flexividad"), no una simple corrección de tildes.
  - Verificado con `npm run build` y `npm run lint` en verde, y en navegador (`get_page_text`)
    confirmando el texto nuevo en ambos sitios.
- **`FlowDiagram` ganó soporte opcional de agrupación** (`src/components/diagrams/flow-diagram.tsx`,
  agosto 2026, a petición explícita de la autora): quería que el diagrama de comandos de
  `/arquitectura/software` dejara claro qué pasos corren en AWS Cloud y cuáles en la
  Raspberry Pi del propio dron. Añadidas dos props opcionales, ambas retrocompatibles (sin
  ellas el componente se comporta exactamente igual que antes — verificado que
  `/arquitectura/datos` y `/ia`, que no las usan, siguen renderizando sin cambios):
  - `groups?: FlowGroup[]` — dibuja una caja punteada con etiqueta alrededor de una tanda
    contigua de pasos (`stepIds`). En `COMMAND_STEPS` de Software & Cloud se usa para
    envolver `panel`/`api`/`mqtt` en "AWS Cloud" (icono `Cloud`) y `receptor`/`mavlink` en
    "Raspberry Pi · a bordo del dron" (icono `Cpu`).
  - `connectorNotes?: Record<string, string>` — texto pequeño bajo la flecha que sigue a un
    paso concreto; se usa para etiquetar la flecha que cruza de un grupo a otro como
    "Internet / 4G", dejando visualmente claro que ahí el mensaje sale de la nube y llega al
    dron por la red.
  - **Bug real detectado y corregido durante la implementación**: la primera versión mutaba
    una variable `stepIndex` declarada fuera del `.map()` que renderiza JSX — el linter de
    React Compiler (`react-hooks/immutability`) lo bloqueó ("Cannot reassign variable after
    render completes"). Se resolvió precalculando los índices con una función pura
    (`withStartIndex`) antes de renderizar, sin mutar nada dentro del render.
  - **Nota de entorno importante**: durante la verificación, la pestaña de Chrome ya abierta
    en esta sesión mostraba errores de consola obsoletos (`Module not found` de
    `panel-phone-mockup.tsx`, y luego un `ReferenceError: stepIndex is not defined`) que
    parecían del código actual pero eran en realidad JS cacheado de versiones anteriores —
    el WebSocket de HMR lleva fallando toda la sesión en ese tab, así que nunca recibió las
    actualizaciones. Confirmado abriendo una pestaña nueva (`tabs_create`): cero errores de
    consola en `/arquitectura/software` y `/ia`. **Para el futuro: si un error de consola en
    este entorno no cuadra con el código que se acaba de escribir, abrir una pestaña nueva
    antes de asumir que es un bug real** — no basta con recargar la misma pestaña.
  - Verificado con `npm run build` (24 rutas) y `npm run lint` en verde, y en navegador
    (pestaña nueva, `get_page_text`) confirmando la agrupación "AWS CLOUD" / "RASPBERRY PI ·
    A BORDO DEL DRON" y la nota "INTERNET / 4G" en la flecha que las separa.
- **El mismo tratamiento se aplicó al diagrama "El camino completo de una detección" de
  `/arquitectura/datos`** (agosto 2026, a petición explícita de la autora: quería que
  quedara más claro qué hace cada parte y, sobre todo, que se viera el store-and-forward en
  el propio diagrama, no solo en el texto de debajo). Dos cambios:
  - **`FlowStep` ganó un campo opcional `badge`** (`flow-diagram.tsx`): una pastilla pequeña
    anclada a la esquina superior derecha de la tarjeta. Se usa aquí en el nuevo paso
    intermedio **"Guarda en buffer local"** (SQLite, entre "Lee posición" y "Publica MQTT",
    que antes no existía como paso propio en el diagrama) con el badge "↻ reintenta si
    falla" — así el store-and-forward ya no es solo una frase en el párrafo de debajo, es un
    paso visible y explícito del propio flujo.
  - Igual que en Software & Cloud, se agrupó con `groups`: **"Raspberry Pi · a bordo del
    dron"** (YOLO detecta, Lee posición, Guarda en buffer local) y **"AWS Cloud"** (Publica
    MQTT, ACK del broker, InfluxDB), con la nota **"Internet / 4G"** en la flecha que cruza
    de un grupo a otro. El paso "ACK del broker" se reformuló a "Marca el buffer local como
    enviado" para cerrar visualmente el ciclo store-and-forward (guardar → intentar enviar →
    marcar como enviado). El párrafo de debajo del diagrama se reescribió para señalar
    explícitamente el paso nuevo en vez de hablar solo en abstracto del "buffer local".
  - Verificado con `npm run build` (24 rutas) y `npm run lint` en verde (hubo que escapar
    unas comillas rectas en JSX con `«»`, error real de ESLint `react/no-unescaped-entities`)
    y en navegador (pestaña nueva) sin errores de consola reales — solo los WebSocket de HMR
    ya conocidos de esta sesión, sin relación con el código.
  - **Corrección importante detectada por la autora en esa misma ronda**: el paso "ACK del
    broker" tenía el detalle "Marca el buffer local como enviado" y estaba agrupado dentro de
    "AWS Cloud" — pero esa acción (el `UPDATE ... SET enviado=1` sobre el SQLite local) la
    ejecuta la propia Raspberry Pi, no AWS. Verificado contra el código real de
    `deteccion.py` (función `reenviar()`, `drone-edge-companion`): el cliente MQTT de la Pi
    publica, espera la confirmación del broker con `info.wait_for_publish()` (QoS 1) y, solo
    si se confirma, actualiza su propia base de datos local — el broker en AWS únicamente
    confirma la recepción, no toca el buffer de la Pi. Corregido: el detalle de "ACK del
    broker" pasó a "Confirma la recepción (QoS 1)" (solo lo que ocurre en AWS), y el párrafo
    de debajo del diagrama se amplió para dejar explícito que quien marca el registro como
    enviado en su buffer es la Raspberry Pi, no el servidor. **Lección para el futuro**: al
    agrupar un paso de un diagrama por dónde ocurre físicamente, verificar contra el código
    real qué acción exacta describe ese paso — un nombre de paso puede mezclar sin querer un
    evento del lado servidor (la confirmación) con una consecuencia del lado del cliente (la
    actualización de su propio estado local), y agruparlo entero en el sitio equivocado.
- **Dos ampliaciones más a `/arquitectura/datos`** (misma sesión, a petición explícita de la
  autora): quería que quedaran más claros los 4 procesos por separado (no solo el de
  detección/YOLO) y, al final del documento, una arquitectura alternativa de MQTT bridge.
  - **Diagrama radial nuevo con los 4 procesos** en la sección "Los procesos que lo hacen
    posible", antes de las tarjetas de detalle: reutiliza `RadialDiagram` (el mismo
    componente de la home/impacto, 4 nodos alrededor de un centro) con `sensor.py`,
    `sistema.py`, `vuelo.py` y `deteccion.py` alrededor de un centro "Broker MQTT · Mosquitto
    · AWS". Es deliberadamente el diagrama "general y sencillo" que pidió la autora, antes
    del diagrama detallado y centrado en YOLO que ya existía más abajo — ambos textos de
    `SectionHeading` se retocaron para dejar explícito ese orden general→detalle ("antes de
    entrar en el detalle del pipeline de detección..." / "de los cuatro procesos de arriba,
    este es el más completo...").
  - **Nueva sección final "Una alternativa que no elegimos: MQTT bridge"**, antes del
    `SubpageNav`: explica la arquitectura de dos brokers (uno local en la Raspberry Pi, uno
    en AWS, unidos por un bridge nativo de Mosquitto) como alternativa al store-and-forward
    con un único broker que sí se usa en el proyecto real. Incluye un `FlowDiagram` propio
    (`BRIDGE_STEPS`/`BRIDGE_GROUPS`, mismo patrón de agrupación Raspberry Pi/AWS Cloud y nota
    de conector "Bridge MQTT" ya usado en el resto de la página), un cuadro de dos columnas
    con ventajas e inconvenientes del bridge (estilo `Check`/`X`, inspirado en
    `philosophy-comparison.tsx` pero implementado inline en esta página, sin tocar ese
    componente compartido), y un cuadro final justificando por qué se eligió
    store-and-forward en su lugar: simplicidad, un solo broker que mantener, y que la ventaja
    principal del bridge no compensa la complejidad añadida para un TFG con un único dron en
    pruebas.
  - Verificado con `npm run build` (24 rutas) y `npm run lint` en verde, y en navegador
    (pestaña nueva) sin errores de consola reales.
  - **Simplificación posterior del cierre** (misma sesión, a petición explícita de la
    autora): el cuadro de dos columnas de ventajas/inconvenientes del bridge y el cuadro de
    justificación se sustituyeron por un único párrafo, dictado por la autora (solo se
    corrigieron tildes/erratas: "configuracion"→"configuración", "bd"→"base de datos",
    "sqlite"→"SQLite"): reconoce que el bridge tiene a su favor el control de fallos de
    comunicación incorporado de forma nativa (sin tener que programar un store-and-forward
    propio), pero justifica la elección del broker único por simplicidad — evitar que la
    arquitectura se complique con múltiples brokers si la flota de drones creciera, facilitar
    la instalación, y poder desarrollar su propia base de datos local (SQLite) para comprobar
    los envíos. Se quitaron del todo `BRIDGE_PROS`/`BRIDGE_CONS` y los iconos `Check`/`X` que
    ya no se usaban en el archivo. Verificado con `npm run build` y `npm run lint` en verde;
    en navegador se vio primero un `ReferenceError: BRIDGE_PROS is not defined` que resultó
    ser, otra vez, el mismo problema de caché de HMR de una pestaña reutilizada — confirmado
    limpio abriendo una pestaña nueva.
  - **Replanteamiento completo de esta sección** (misma sesión, a petición explícita de la
    autora — "en vez de 'una alternativa que no elegimos'..."): cambió el enfoque narrativo
    de "descartamos el bridge" a "el bridge es la respuesta lógica a priori — y aun así
    construimos la nuestra". Eyebrow/título pasaron a "MQTT, bridges y nuestro
    store-and-forward" / "MQTT bridge: la solución lógica — y por qué construimos la
    nuestra"; la descripción ahora empieza elogiando el paradigma publicador/suscriptor de
    MQTT antes de presentar el bridge como la forma estándar de resolver persistencia +
    reintento. El diagrama del bridge (`BRIDGE_STEPS`/`BRIDGE_GROUPS`) se mantiene sin
    cambios — sigue siendo válido para ilustrar esa alternativa —, pero el texto que lo
    precede pasó a modo condicional ("publicarían", "mantendría") para dejar claro que
    describe la alternativa, no lo que hay implementado. El cuadro final, ahora en dos
    párrafos: (1) explica que Guardian Eye construyó su propia versión de esa persistencia y
    esos reintentos en Python (SQLite + reenvío al confirmar), remitiendo al diagrama de "El
    camino completo de una detección" de más arriba para el mecanismo exacto, en vez de
    repetirlo; (2) las ventajas de esa decisión, con foco en escalar a un escuadrón de varios
    drones (un solo broker central en vez de uno por dron) y en el control directo sobre los
    datos de cada uno (acceso directo al SQLite de cualquier dron, en vez de depender del
    estado interno de un bridge). **Importante para el futuro**: el código real
    (`deteccion.py` et al.) no configura ningún bridge de Mosquitto — cada proceso se conecta
    directamente al único broker de AWS con `paho-mqtt` y su propio buffer SQLite. La frase
    de la autora sobre "los mqtt bridges que hemos personalizado" se interpretó como
    metáfora (su propia versión, a medida, de lo que un bridge daría de fábrica) y no como
    una afirmación literal de que exista un bridge Mosquitto real en el proyecto — si en el
    futuro se quiere ser aún más explícito sobre este matiz, se puede añadir una frase
    aclaratoria.
  - Verificado con `npm run build` (24 rutas) y `npm run lint` en verde, y en navegador
    (pestaña nueva) sin errores de consola.
- **Mención del quinto proceso (`receptor.py`) en `/arquitectura/datos` + explicación de
  qué es una PWA en `/arquitectura/software`** (agosto 2026, a petición explícita de la
  autora, pegando el código real de `receptor.py` como referencia): en la sección "Los
  procesos que lo hacen posible", justo después del párrafo sobre la independencia de los
  cuatro procesos emisores, se añadió una nota (icono `Inbox`) explicando que hay un quinto
  proceso en la Raspberry Pi que funciona al revés, como **receptor**: `receptor.py` se
  suscribe al topic de comandos de su dron y traduce lo que llega en acciones reales —
  armar/desarmar, iniciar misión, volver a casa, o apagar la propia Raspberry Pi en remoto —
  con un enlace cruzado a Software & Cloud para el origen de esos comandos (el panel de
  control, una PWA). Deliberadamente no se añadió como quinto nodo del diagrama radial de
  los 4 procesos, porque ese diagrama muestra flujo emisor→broker y `receptor.py` es
  receptor (el sentido contrario) — meterlo ahí habría confundido la lectura del diagrama;
  se dejó como nota de texto aparte.
  - En `/arquitectura/software`, justo debajo del `SectionHeading` de "El panel de control"
    y antes de la explicación de qué hace, se añadió una caja "¿Qué es una PWA?" con la
    definición sencilla (se instala con icono propio, pantalla completa sin barra de
    navegador, funciona igual en móvil que en escritorio) y por qué es cómoda (una sola
    página web hace de web y de app, sin mantener dos versiones distintas).
  - Verificado con `npm run build` (24 rutas) y `npm run lint` en verde, y en navegador
    (pestaña nueva) sin errores de consola en ninguna de las dos páginas.
  - **Corrección importante detectada por la autora en esa misma nota**: decía "los cuatro
    anteriores son emisores" y atribuía el apagado remoto de la Raspberry Pi a `receptor.py`
    — ambas cosas eran incorrectas. Verificado contra el código real de
    `drone-edge-companion`: `sensor.py` y `sistema.py` también tienen su propio
    `CONFIG_TOPIC` (`dronsar/{dron_id}/sensor/config` y `.../sistema/config`) al que se
    suscriben — `sensor.py` para `set_sensor_interval`, y `sistema.py` para `shutdown`
    (ejecuta literalmente `subprocess.run(["sudo", "shutdown", "-h", "now"])`, confirmado
    leyendo la función). `deteccion.py` ya se sabía que tenía su propio
    `.../deteccion/config` para `set_video_throttle`/`start_recording`/`stop_recording`. Solo
    `vuelo.py` no tiene topic de configuración — es el único puramente emisor de los cuatro.
    `receptor.py` queda entonces acotado a lo que de verdad hace: comandos de **navegación
    del dron** (armar, desarmar, misión, RTL) hacia MAVLink, sin relación con el apagado de
    la Pi ni con la configuración de los otros cuatro procesos. La nota se partió en dos
    párrafos separados para reflejar esta distinción con precisión: uno sobre los tres
    procesos que también reciben configuración, y otro aparte sobre `receptor.py` y los
    comandos de navegación. **Lección para el futuro**: no asumir que "publica datos" implica
    "solo emite" — varios de estos procesos combinan ambos roles, y hay que verificarlo
    proceso a proceso contra el código real antes de generalizar.
  - Verificado de nuevo con `npm run build` y `npm run lint` en verde, y en navegador
    (pestaña nueva) sin errores de consola.
- **Nueva subpágina `/arquitectura/video` ("Vídeo")** (agosto 2026, a petición explícita de
  la autora, a partir del documento de apoyo real `Problematica_transmision_video.docx` de
  `Downloads/guias/Documentos de Apoyo/Documentos de Apoyo/`). Quinta hija de Arquitectura
  técnica, insertada entre Comunicaciones y Datos e IoT (orden actualizado en los 5 sitios
  que lo mantienen por separado: `site-config.ts`, `SECTIONS` del hub `/arquitectura` — grid
  de tarjetas pasó de `lg:grid-cols-4` a `lg:grid-cols-3`, 3+2 en vez de 4+1, mismo patrón ya
  usado antes en `/proyecto` —, footer, y el `SubpageNav` de Comunicaciones/Datos e IoT).
  Cadena final: Hardware → Comunicaciones → **Vídeo** → Datos e IoT → Software & Cloud.
  - Contenido, con el mismo formato que el resto de subpáginas (`PageHero` + `SectionHeading`
    + tarjetas + cajas + `FlowDiagram`): las dos familias de transmisión (vídeo digital sobre
    TCP/IP vs. VTX analógico, con glosario de "VTX"), por qué el retardo es tan distinto
    (diagrama de las etapas del camino digital vs. los ~1-5 ms del analógico), la analogía
    del fútbol/TDT-vs-streaming que pidió la autora, por qué el FPV racing sigue usando VTX
    analógico, y la decisión propia del proyecto: cámara digital sobre la Raspberry Pi
    (edge computing + Hailo-8L) en vez de VTX, porque el vídeo que sale del dron es una copia
    de supervisión, no la señal de la que depende el control de vuelo (eso va por telemetría
    aparte) — se barajó una cámara analógica con VTX pero se descartó por complejidad
    innecesaria, dejando la puerta abierta a añadirlo en el futuro.
  - **Arquitectura de streaming, verificada contra el código real** (no el documento, que es
    más genérico) de `drone-edge-companion`: `deteccion.py` graba localmente a la resolución
    original de la cámara (`cv2.VideoWriter` con `(w, h)` del propio fotograma) y, en
    paralelo, `streaming.py` (`EmisorRTSP`) empuja una copia reducida —**640×360, 12 fps,
    ~400 kbps** (`ancho=640, alto=360, fps=12`, bitrate `400k`/`maxrate 500k` en el comando
    ffmpeg)— hacia un servidor **MediaMTX** por RTSP; el `STREAM_PATH` por defecto
    (`dron_live`) coincide con el `stream.gorostiditfg.com/dron_live/` ya usado en el panel
    de control, confirmando que es el mismo pipeline real. Si el streaming falla, el propio
    código lo marca inactivo y la detección/grabación local sigue sin verse afectada — está
    en el propio docstring de `streaming.py` ("un EXTRA que nunca debe tumbar la
    detección"). Se explica también por qué un servidor de streaming en la nube en vez de
    conectarse directo a la Raspberry (IP dinámica tras NAT 4G, y el riesgo de saturar la Pi
    generando una copia por espectador si varios se conectaran a la vez).
  - **Corrección importante frente al documento de apoyo**: el documento describe un
    "thumbnail" embebido en la alerta MQTT de cada foto — pero el código real
    (`procesar_detecciones` en `deteccion.py`) solo mete en el JSON el **nombre del fichero**
    (campo `"foto"`), no una imagen en miniatura codificada. La página describe lo que el
    código hace de verdad (referencia al fichero, no una miniatura embebida), no lo que
    proponía el documento — con enlace cruzado a Datos e IoT para el resto del mecanismo
    (buffer local, MQTT, InfluxDB) sin repetirlo.
  - Cross-referencias en ambas direcciones: a Comunicaciones (enlace de telemetría
    independiente, Tailscale), a Software & Cloud (el visor de vídeo vive en el grupo
    "Cámara" del panel PWA, con los mismos botones de grabar/parar), y a Datos e IoT (el
    resto del mecanismo store-and-forward de la alerta).
  - Imagen de cabecera nueva: `IMAGES.droneCameraCloseup` (Unsplash
    `photo-1524143986875-3b098d78b363`, primer plano de un dron con cámara/gimbal en
    vuelo), verificada con `curl` antes de añadirla al catálogo.
  - Se quitó de `/arquitectura/software` la frase "Los cuatro procesos que publican
    telemetría... y en el resto de la pila que lo hace posible" de la descripción del
    `PageHero`, a petición explícita de la autora (quedaba redundante).
  - Verificado con `npm run build` (25 rutas) y `npm run lint` en verde (hubo que escapar
    unas comillas rectas con `«»` en la página nueva), y en navegador (pestaña nueva): hub,
    Comunicaciones, Software & Cloud y la página nueva, todos sin errores de consola.
- **Ronda de mejoras en tres frentes** (agosto 2026, misma sesión, a petición explícita de la
  autora): `/ia` con más contexto y foco en "pipeline de IA", mejor imagen de fondo en
  `/arquitectura/video`, y una decisión razonada sobre si separar "Software & Cloud" en dos
  páginas.
  - **`/ia` ampliada**: nuevo párrafo de apertura que sitúa YOLO dentro de la IA en general
    (pensado para quien llega directo a la página por un enlace, sin contexto previo — "no es
    un chatbot... es un modelo entrenado para analizar imágenes"). Nueva caja «¿Qué es un
    pipeline de IA?» justo antes del `FlowDiagram` de etapas, explicando el término de forma
    genérica (no específica del proyecto) antes de mostrar el diagrama que lo ilustra. Nueva
    tarjeta "Cómo se ajusta en la práctica" con parámetros reales de `deteccion.py`
    verificados contra el código (umbral de confianza 0,5, muestreo de 1 de cada 6 fotogramas,
    exportación a ONNX/NCNN como runtimes más ligeros) — añade profundidad de ingeniería real,
    no inventada. **Corrección de precisión encontrada de paso**: el JSON de ejemplo del
    "formato del mensaje de detección" no coincidía exactamente con el código real de
    `procesar_detecciones()` en `deteccion.py` (nombres de campo inventados/aproximados:
    `centro_x/centro_y` en vez de `cx/cy`, `resolucion_frame` en vez de `resolucion.ancho/alto`,
    `posicion_dron` en vez de `dron` con `alt_rel`, `foto_guardada` en vez de `foto`) — se
    corrigió para que sea el payload real, con una nota aclaratoria y enlaces cruzados a Datos
    e IoT (resto del recorrido de la alerta) y a la nueva página Vídeo (grabación/transmisión).
  - **Imagen de `/arquitectura/video` sustituida**: la anterior (`droneCameraCloseup`, un
    dron genérico con gimbal) se cambió por `droneControllerLiveFeed` (Unsplash
    `photo-1559840251-2a04897f8559`) — un mando de dron con el móvil acoplado mostrando el
    vídeo en directo de la cámara en pantalla, mucho más específico del tema "transmisión de
    vídeo" que un dron volando cualquiera. Verificada con `curl` antes de sustituir; la
    entrada antigua en `images.ts` se renombró en vez de dejar las dos, para no acumular
    catálogo sin usar.
  - **Decisión razonada sobre separar "Software & Cloud"**: la autora pidió opinión sincera
    sobre partirla en "Desarrollo Software" y "Cloud" (esta última primero). Antes de opinar
    se verificó el repo real (`README.md` y `deploy/deploy.sh` de `drone-cloud-server`): no
    hay ninguna mención a Grafana, nginx o Cloudflare en el propio repo — son piezas
    heredadas del prompt maestro original, no de un script de despliegue real committeado
    (pueden estar configuradas a mano fuera del repo, pero no hay más detalle verificable que
    ampliar). Conclusión: **no se separó en dos páginas**. Motivos: (1) Tailscale ya tiene su
    propia sección completa en Comunicaciones — una página "Cloud" tendría que o repetirla o
    quedarse coja en ese punto; (2) el contenido de infraestructura genuinamente nuevo
    (EC2/Mosquitto/InfluxDB/nginx-Cloudflare) ya estaba prácticamente todo en la grid de
    tarjetas existente — trasladarlo a una URL aparte no añadía profundidad real, solo
    fragmentaba; (3) no hay material verificable de un dashboard Grafana real que llenara una
    página entera sin inventar detalle. En su lugar, se reforzó la MISMA página con una
    `SectionHeading` propia ("La infraestructura cloud · Qué corre en AWS, pieza por pieza")
    delante de la grid de tarjetas (antes aparecía sin ningún encabezado editorial), y se
    añadieron dos tarjetas nuevas: **Grafana** (icono de marca real vía `simple-icons`/
    `BrandIcon`, mismo icono ya usado como tech badge en la home — descrita con honestidad
    como "paneles de monitorización sobre InfluxDB", sin inventar un dashboard concreto) y
    **Acceso seguro · Tailscale** (mención breve con enlace cruzado a Comunicaciones, en vez
    de duplicar la explicación completa).
  - Verificado con `npm run build` (25 rutas) y `npm run lint` en verde, y en navegador
    (pestaña nueva) las tres páginas (`/ia`, `/arquitectura/video`, `/arquitectura/software`)
    sin errores de consola.
  - **Ajuste posterior al párrafo de apertura de `/ia`** (misma sesión, texto dictado por la
    autora, solo se corrigieron erratas — "que es la IA/Yolo" → "qué es", "todo ellos" → "todo
    ello"): ahora arranca con "Todos conocemos qué es la IA, pero a lo mejor no te suena qué
    es YOLO. Te lo ponemos en contexto..." antes de la misma explicación ya escrita. La
    segunda frase (YOLOv8 en la Raspberry Pi 5) ganó el cierre "...todo ello a través de un
    estricto pipeline (flujo de trabajo)", enlazando ya desde el principio con el término que
    la sección de más abajo define en detalle. Verificado con `npm run build` y `npm run
    lint` en verde, y en navegador sin errores de consola.
- **Frase puente añadida entre software e infraestructura en `/arquitectura/software`**
  (misma sesión, a petición explícita de la autora, tras dos rondas de iteración): quería
  dejar explícito que software y cloud están relacionados sin que eso suene a que la
  arquitectura depende de desplegarse siempre igual — le preocupaba la escalabilidad futura
  (mover InfluxDB a otra máquina, repartir servicios entre varios EC2). Se descartó una
  primera redacción ("se programó el panel sabiendo ya dónde se iba a desplegar") por
  implicar justo ese acoplamiento no deseado. La redacción final va en el sentido contrario y
  está verificada contra el código real: cada proceso (`sensor.py`, `deteccion.py`,
  `receptor.py`, la API) resuelve el broker y el resto de servicios por variables de entorno
  (`MQTT_BROKER`, `EC2_HOST`, etc.), nunca por un valor fijo en el código — así que aunque hoy
  todo corra en el mismo EC2 por sencillez, repartirlo mañana es un cambio de configuración,
  no una reescritura. Insertada como párrafo justo debajo del `SectionHeading` "La
  infraestructura cloud", antes de la grid de tarjetas. Se evitó explícitamente el conector
  "Lo de arriba..." (la autora no quería esa forma de enlazar frases) nombrando directamente
  los sujetos ("El panel, la API, el broker y la base de datos no viven en abstracto...").
  Verificado con `npm run build` (25 rutas) y `npm run lint` en verde, y en navegador (pestaña
  nueva) sin errores de consola.
  - **Título de la página cambiado** (misma sesión, la autora encontró raro "...y el resto de
    la pila cloud"): pasó a **"Un panel de control (PWA) y la infraestructura cloud detrás de
    él"** — de dos alternativas propuestas, eligió esta por reutilizar el mismo término
    ("infraestructura cloud") que ya aparece como eyebrow más abajo en la propia página,
    dando consistencia de vocabulario. Solo se tocó el `title` del `PageHero`; no se ha
    tocado el resto de menciones sueltas de "pila cloud" en `metadata.description` de esta
    página, en la tarjeta del hub `/arquitectura`, ni en otras páginas — no se pidió y son
    contextos distintos (blurbs cortos, no el titular). Verificado con `npm run build` y
    `npm run lint` en verde, y en navegador sin errores de consola.
  - **Segundo párrafo añadido a continuación, esta vez sobre no depender de la nube en sí**
    (misma sesión, a petición explícita de la autora — no quería dar la impresión de que el
    proyecto depende de AWS en concreto): explica que no es estrictamente necesario montar
    todo esto en AWS ni en ningún proveedor cloud — Flask, Mosquitto, InfluxDB y nginx son
    software estándar que funcionaría igual en un servidor propio físico, sin ninguna pieza
    que dependa de un servicio exclusivo de AWS — y que se optó por la nube por la
    flexibilidad y escalabilidad que ofrece (añadir/redimensionar recursos bajo demanda, sin
    mantenimiento físico), no por dependencia técnica. Coherente con el resto de la página:
    ninguna de las piezas descritas (broker autoalojado, base de datos genérica, proxy
    inverso) usa un servicio gestionado exclusivo de AWS (tipo RDS o Lambda), así que la
    afirmación es fiel a lo ya documentado, no una ampliación sin respaldo. Verificado con
    `npm run build` (25 rutas) y `npm run lint` en verde, y en navegador sin errores de
    consola.
- **`/arquitectura/comunicaciones` ampliada con control multi-vía y conectividad avanzada**
  (agosto 2026, a petición explícita de la autora, apoyándose en el mismo documento de apoyo
  `Problematica_transmision_video.docx` para la parte de DJI/WFB-ng). Cambios:
  - **Tarjeta de Telemetría** reescrita: ya no dice solo "monitorización", sino que dice
    explícitamente que es un enlace bidireccional — permite también enviar órdenes de vuelo
    (misión, RTL) vía Mission Planner/QGroundControl, no solo recibir estado.
  - **Tarjeta de WiFi/4G-LTE** ampliada para mencionar que ese mismo enlace es el que usa el
    panel de control (PWA) para mandar órdenes al dron desde cualquier sitio.
  - **Nuevo glosario rápido**: "Mission Planner" (qué es un GCS, qué permite ver y hacer).
  - **Nuevo párrafo "vías múltiples"** que resume las tres formas reales de manejar el dron
    (RC directo, telemetría+Mission Planner, PWA sobre WiFi/4G) con enlace a Software & Cloud.
  - **Nueva sección "Una limitación que asumimos"**: explica que el WiFi actual no funciona
    solo — necesita un MiFi o el propio ordenador de la autora haciendo de punto de acceso
    (AP) al que se conecta la Raspberry Pi (no al revés) — y que esa limitación de alcance se
    asume a propósito porque hay respaldo 4G, dejando una conectividad más avanzada como
    opción futura.
  - **Nueva sección "Conectividad avanzada"**: explica el enfoque de DJI (el dron genera su
    propia red con protocolo de radio propietario —WiFi modificado u OcuSync/O3— para más
    alcance; el móvil no puede conectarse directo, así que el mando físico hace de pasarela y
    retransmite al móvil por cable), por qué los fabricantes hacen esto (límite real de
    alcance del WiFi estándar), y **WFB-ng** (Wifibroadcast-ng) como la vía de código abierto
    para replicarlo sobre la propia Raspberry Pi en una futura arquitectura híbrida — con
    enlace cruzado a Vídeo. Todo esto proviene directamente del documento de apoyo (Apéndices
    A y B), no inventado.
  - Verificado con `npm run build` (25 rutas) y `npm run lint` en verde, y en navegador
    (pestaña nueva) sin errores de consola.
  - **Ajuste posterior** (misma sesión, a petición explícita de la autora): quitada la frase
    "Dejamos abierta, para más adelante, una opción de conectividad más avanzada" del final
    de "Una limitación que asumimos" (quedaba redundante con la sección siguiente). El título
    de "Conectividad avanzada" pasó de "La puerta que dejamos abierta: WiFi propietario, como
    hacen los fabricantes" a **"La opción profesional: WiFi personalizado"**, con un párrafo
    nuevo al principio explicando que esa opción —el WiFi "mejorado" y personalizado que usa
    la mayoría de fabricantes, que además no requiere conectarse a ningún **PAS (Punto de
    Acceso)**— se deja fuera del ámbito de este TFG por ser demasiado ambiciosa para esta
    etapa, antes de entrar en el ejemplo de DJI. **Nota de terminología**: la autora usa "PAS"
    como abreviatura de "Punto de Acceso" (no "AP", el término inglés más habitual) — se
    unificó también la mención anterior en "Una limitación que asumimos" (que decía "(AP)")
    a "(PAS)" por coherencia dentro de la misma página. Verificado con `npm run build`
    (25 rutas) y `npm run lint` en verde, y en navegador sin errores de consola.
  - **Segundo ajuste**: la autora no quería la explicación de Mission Planner en un glosario
    aparte — se quitó esa caja por completo (con su icono `BookOpen`, ya sin uso en el
    archivo) y la explicación se integró directamente en el párrafo de "vías múltiples" para
    manejar el dron, en el sitio donde ya se mencionaba Mission Planner en contexto. También
    se amplió "Una limitación que asumimos" para explicar que la Raspberry Pi necesita tener
    configurado de antemano el SSID de la red WiFi a la que conectarse — si no lo tiene, o el
    punto de acceso no está disponible, solo es alcanzable por la conexión móvil (4G).
    Verificado con `npm run build` (25 rutas) y `npm run lint` en verde, y en navegador sin
    errores de consola.
  - **Tercer ajuste, al párrafo de DJI** (misma sesión, texto dictado por la autora, solo se
    corrigieron erratas de dictado — "a el" → "a él", "una Wifi normal" → "un WiFi normal",
    "incluiso" → "e incluso", "no funciona si no conectar el teléfono" → "no funciona si no
    se conecta el teléfono"): se quitó del final del párrafo el inciso "(ver también la
    transmisión de vídeo en Vídeo)" con su enlace cruzado a `/arquitectura/video` — la autora
    no lo incluyó en el texto nuevo que dictó, así que se ha eliminado en vez de conservarlo;
    el resto de enlaces cruzados a Vídeo que ya tenía la página (en la sección WFB-ng) no se
    han tocado. Verificado con `npm run build` (25 rutas) y `npm run lint` en verde, y en
    navegador (pestaña nueva) sin errores de consola.
- **`/arquitectura/hardware` — nueva sección "MAVLink: por qué elegimos Pixhawk y no algo más
  barato"** (agosto 2026, a petición explícita de la autora, que quería desarrollar más el
  protocolo MAVLink, explicado en el propio flujo de la página en vez de en el glosario).
  Insertada entre la comparativa "Dos cerebros" (con la caja de Tailscale) y la tabla de
  "Pipeline de hardware modular". Contenido, en prosa continua, no en tarjetas de glosario:
  - Por qué no una controladora más barata: menciona alternativas reales del mundo FPV racing
    con firmware Betaflight/iNav (ejemplo: SpeedyBee F405), pensadas para vuelo acrobático
    manual sin exponer datos/órdenes a un ordenador externo, y —reutilizando un dato ya
    publicado en `/colaboradores`— la propia controladora DJI Naza del dron que prestó José
    Manuel, como ejemplo real de sistema cerrado sin protocolo estandarizado. Enlace cruzado a
    Colaboradores.
  - Qué es ArduPilot: firmware de código abierto que corre en la Pixhawk 6X, uno de los dos
    grandes autopilotos abiertos (el otro PX4).
  - MAVLink en profundidad: qué resuelve (mensajería ligera para vehículos no tripulados),
    ejemplos concretos de mensajes reales del protocolo (`HEARTBEAT`, `COMMAND_LONG`), y que es
    el mismo protocolo que hablan Mission Planner/QGroundControl por telemetría. Enlace cruzado
    a Comunicaciones.
  - UART y puertos TELEM explicados en contexto (no en glosario): qué es un UART, y que los
    puertos TELEM de la Pixhawk son exactamente los que permiten conectar, además del enlace de
    telemetría de 433 MHz a la estación de tierra, un segundo dispositivo — la Raspberry Pi —
    que le habla MAVLink por cable en vez de por radio.
  - Caja "Lo que gana el proyecto por tener un ordenador de a bordo hablando MAVLink": conecta
    esto con el "segundo cerebro" — la Raspberry Pi puede leer telemetría y enviar órdenes de
    vuelo (armar/desarmar, misión, RTL) igual que un GCS, y ese es el canal real que usa
    `receptor.py`. Enlaces cruzados a Datos e IoT y Software & Cloud.
  - Librería Python: menciona `pymavlink` explícitamente como la librería de referencia del
    propio proyecto ArduPilot, y que es la que usa `receptor.py` en producción (ya verificado
    contra el código real en una sesión anterior, ver nota de Software & Cloud más arriba).
  - **Glosario recortado**: se quitaron las entradas "MAVLink" y "UART / I2C / GPIO" del
    glosario rápido de la página (ahora explicadas en prosa) y se sustituyeron por una única
    entrada "I2C / GPIO" (sin UART, que ya tiene su propio desarrollo arriba); el grid del
    glosario pasó de `sm:grid-cols-3` a `sm:grid-cols-2` al quedar con solo 2 tarjetas (RTOS +
    I2C/GPIO).
  - Verificado con `npm run build` (25 rutas) y `npm run lint` en verde, y en navegador
    (pestaña nueva) sin errores de consola.
- **`/arquitectura/comunicaciones` — "Una limitación que asumimos" reformulada como
  pregunta** (agosto 2026, a petición explícita de la autora, texto dictado — solo se
  corrigió la errata "necesiaremente"): el título/descripción de esta sección pasaron de la
  afirmación "El WiFi depende de un punto de acceso externo" a la pregunta **"¿Necesito
  obligatoriamente un AP para mi WiFi?"**, respondida de entrada con "No necesariamente" y
  adelantando ya en la propia descripción la idea de que la conexión móvil (4G) minimiza esa
  dependencia — antes ese matiz solo aparecía al final del párrafo siguiente. El párrafo de
  continuación se reescribió para dar contexto y no repetir esa misma idea dos veces: se
  quitó la frase final redundante ("Somos conscientes de esa limitación... contamos también
  con el respaldo del 4G/LTE...", ya cubierta por la nueva descripción) y se cerró en su
  lugar señalando que tener dos vías independientes en vez de depender de una sola es un
  compromiso asumido conscientemente para esta etapa del proyecto — mismo contenido técnico
  (MiFi/ordenador como AP, SSID preconfigurado, respaldo 4G), sin duplicar la conclusión.
  **Cambio de terminología**: el texto dictado por la autora usa explícitamente "AP o Access
  Point" en vez de "PAS (Punto de Acceso)", la abreviatura que se había unificado en toda la
  página en una sesión anterior — se aplicó "AP" también a la única otra mención de "PAS" que
  quedaba en la página (sección "Conectividad avanzada": "no requiere conectarse a ningún AP
  (Access Point)"), para no dejar terminología mixta dentro de la misma página. Si en el
  futuro se prefiere volver a "PAS", hay que tocar esos dos sitios de nuevo.
  Verificado con `npm run build` (25 rutas) y `npm run lint` en verde, y en navegador
  (pestaña nueva) sin errores de consola.
  - **Ajuste posterior**: se añadió al cierre de esa misma sección el dato concreto de
    alcance real del WiFi sin infraestructura profesional — "sin equipos WiFi profesionales
    ni APs de alta potencia, el alcance efectivo de este enlace es reducido, de apenas unas
    decenas de metros entre el dron y el punto de acceso — muy por debajo del alcance que sí
    tienen la telemetría o el 4G" — a petición explícita de la autora, para dejar claro que
    la limitación de alcance no es solo teórica sino una cifra concreta de unas pocas
    decenas de metros. Verificado con `npm run build` (25 rutas) y `npm run lint` en verde,
    y en navegador (pestaña nueva) sin errores de consola.
- **`/arquitectura/comunicaciones` — reordenación y renombrado de dos bloques finales**
  (agosto 2026, a petición explícita de la autora): el cuadro oscuro "Seguridad de las
  comunicaciones con Tailscale" (antes el último bloque de la página, justo antes del
  `SubpageNav`) se subió de posición — ahora aparece **antes** de la sección de limitaciones
  de WiFi, justo después del párrafo "En conjunto, esto nos da varias vías reales...". Orden
  final de la página: enlace múltiple → jerarquía de seguridad → tarjetas RC/Telemetría/
  WiFi-4G → vías múltiples → **Tailscale** → notas técnicas/limitaciones → conectividad
  avanzada (DJI/WFB-ng) → `SubpageNav`. Solo se movió el bloque (mismo JSX, mismo componente
  `Lock`/`Wifi`/`KeyRound`), no se tocó su contenido salvo el título.
  - Título del cuadro cambiado de "Seguridad de las comunicaciones con Tailscale" a
    **"Comunicaciones seguras usando Tailscale"**.
  - El eyebrow de la sección de limitaciones de WiFi (antes "Una limitación que asumimos")
    pasó a **"Notas técnicas · Limitaciones que asumimos"** — se usó el separador "·" ya
    habitual en los eyebrows del resto del sitio en vez del punto que escribió la autora en
    su mensaje, por coherencia visual con el resto de la página.
  - Verificado con `npm run build` (25 rutas) y `npm run lint` en verde, y en navegador
    (pestaña nueva) sin errores de consola.
- **`/arquitectura/comunicaciones` — reformulación del párrafo de apertura de "Notas
  técnicas · Limitaciones que asumimos"** (agosto 2026, texto dictado por la autora, solo se
  corrigieron erratas de dictado: "asumimos consciente" → "asumimos conscientemente", "movil"
  → "móvil"): la descripción ya no abre con "No necesariamente" respondiendo a la pregunta del
  título, sino que primero **reconoce explícitamente la limitación** ("Con la actual
  configuración, asumimos conscientemente una limitación, ya que dependemos de un AP") y
  luego la matiza ("Sin embargo, esto no es necesariamente un problema...") antes de explicar
  el mecanismo (MiFi/ordenador como AP) y el respaldo de la conexión móvil — mismo contenido
  técnico, pero invirtiendo el orden retórico: limitación primero, matiz después, en vez de
  negación seguida de justificación.
  - El párrafo de continuación se reescribió para no repetir la misma idea dos veces ahora que
    la descripción ya menciona el respaldo móvil desde el principio: se quitó la mención
    duplicada ("si no lo tiene, o ese AP no está disponible, seguimos teniendo acceso a través
    de la conexión móvil...") y en su lugar el párrafo desarrolla primero el mecanismo técnico
    (SSID preconfigurado), después conecta explícitamente la cifra de alcance ("apenas unas
    decenas de metros") como la razón concreta detrás de esa dependencia del AP ("Esa
    dependencia del AP se nota especialmente en el alcance..."), y cierra retomando el
    respaldo móvil ya introducido arriba ("Por eso, precisamente, tener el respaldo de la
    conexión móvil marca la diferencia...") en vez de repetir la fórmula "compromiso asumido
    conscientemente" que ya se había usado en la descripción.
  - Verificado con `npm run build` (25 rutas) y `npm run lint` en verde, y en navegador
    (pestaña nueva) sin errores de consola.

### 🚧 En progreso / Pendiente

- Favicon/OG image todavía son los genéricos de `create-next-app`; falta un favicon propio
  y una imagen Open Graph específica del proyecto.
- **Documentos de apoyo sin convertir a PDF todavía**: de la carpeta
  `Downloads/guias/Documentos de Apoyo/`, quedan sin publicar en
  `/multimedia/documentacion` — `Tutorial_Completo_Python_Hello_World_ClaudeCode_YOLO.docx` (el
  taller que dio origen a la prueba de concepto de fruta ya mencionada en `/ia`, más anécdota que
  documentación técnica) y los 2 PDF originales (`Spain_Drone_Control_2026.pdf`,
  `dron_comunicaciones_tc_telemetria.pdf`, no revisados a fondo por falta de `pdftoppm` en esta
  sesión). Si se quieren añadir, seguir el mismo patrón que los otros 6: revisar contenido primero,
  y para los `.docx` reutilizar el script de generación (`fpdf2` + `python-docx` +
  `iter_block_items()`, ver entrada de "Documentación y recursos" más arriba) en vez de escribir
  uno nuevo desde cero.
- **Fotos del montaje de la Raspberry Pi/Edge Companion para `/construccion/edge-computing`**
  (chasis + Raspberry Pi 5 + Hailo-8L + módem 4G con su pincho USB) — la página ya está
  publicada y enlazada, marcada `underConstruction`, pero sin el paso a paso con fotos
  reales que sí tiene `/construccion/armazon`. En cuanto la autora tome esas fotos, seguir
  el mismo proceso que con las del armazón: seleccionar las más ilustrativas de
  `Downloads/guias/FotosHolly/...` (o la carpeta equivalente), redimensionar con
  Python/Pillow a máx. 1600px + `exif_transpose` + sin metadata EXIF, guardar en
  `public/images/` con prefijo `edge-` y catalogar en `src/lib/images.ts`.
- Sustituir en cuanto existan (todos marcados explícitamente en el copy como placeholder,
  no inventados):
  1. Foto real del dron a pantalla completa para el hero de `/` (ahora mismo es una foto
     de stock de Unsplash).
  2. Vídeos de vuelo reales / timelapse de montaje de hardware para el resto de la galería
     (el vídeo destacado de detección de personas ya está publicado y enlazado — ver
     arriba).
  3. Precisión/mAP del modelo YOLO final, nº de vuelos de prueba con detección real de
     personas y tamaño definitivo del dataset de personas — el pipeline de prueba de
     concepto (dataset de fruta) ya está validado, y el dataset de personas combina datos
     propios del Club Alas de Galapagar con datasets SAR públicos vía Roboflow, en
     ampliación constante (ver `/ia`), pero el modelo final de producción y sus métricas
     siguen pendientes de un entrenamiento a mayor escala. **Nota:** el bloque
     `[placeholder — no inventar]` que mostraba este pendiente directamente en `/ia` se
     quitó de la página a petición explícita de la autora — sigue siendo un pendiente
     real, solo que ya no se muestra en el sitio hasta que haya datos que publicar.
  4. Nombre del tutor/a académico/a del TFG (`/colaboradores`).
  6. Especificaciones finales cerradas de chasis/motores/batería
     (`/arquitectura/hardware`) — el hardware definitivo está en fase de adquisición según
     el journal del proyecto.
  7. Enlace real al "muro de transparencia" de patrocinadores (`/colaboradores`) — esa
     sección aún no existe en la landing corta.
  8. Detalle de protección térmica de los componentes electrónicos (no confundir con la
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
- **Iconos:** `lucide-react` para iconografía genérica — ojo con los iconos de marca
  (`Github` no existe en la versión instalada). Para **logos de marca reales** (Python,
  GitHub, MQTT, YOLO…) se usa la dependencia `simple-icons` vía el wrapper
  `src/components/brand-icon.tsx`; para marcas que no están en `simple-icons` (AWS,
  MAVLink — ver detalle en "Tareas completadas" más arriba) hay assets estáticos en
  `public/icons/`.
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
  - "Cloud AI (LLMs)/AWS Bedrock" se nombra en el stack porque el prompt maestro lo exige
    explícitamente, redactado como línea futura, no como funcionalidad ya validada — no
    hay evidencia de LLMs operativos en las fuentes técnicas reales.
  - **N8N quitado del proyecto** (agosto 2026, a petición explícita de la autora — "no se
    va a utilizar"): se ha eliminado toda referencia a N8N, que hasta ahora aparecía como
    "pieza declarada dentro del stack cloud" a pesar de que el prompt maestro lo exigía
    explícitamente — la instrucción directa de la autora prevalece sobre esa exigencia
    original. Quitado de `src/app/arquitectura/software/page.tsx` (tarjeta completa del
    grid de servicios cloud) y de `src/lib/site-config.ts` (descripción del submenú
    "Software & Cloud", que pasó de "Python, MAVLink, AWS y N8N." a "Python, MAVLink y
    AWS."). Verificado con `grep -ri N8N src/` que no queda ninguna referencia.
  - **Telemetría — corregido (agosto 2026):** este documento fijaba antes "915 MHz"
    siguiendo el prompt maestro, aunque `teleoperacion.docx` y el journal hablaban
    indistintamente de 433/915 MHz según región. El recibo de compra real del kit
    Holybro X500 V2 y la propia foto del módulo de radio ("TELEMETRY RADIO 433 MHz
    100mW" impreso en la carcasa) confirman **433 MHz** sin ambigüedad — evidencia más
    fiable que cualquier fuente anterior. Corregido en toda la web (ver entrada de
    "Construcción del dron" más arriba), incluida esta frecuencia y "Pixhawk 6C→6X".
- **Imágenes:** Unsplash vía hotlink directo a `images.unsplash.com` con parámetros de
  tamaño (`src/lib/images.ts`). El servicio antiguo `source.unsplash.com` está caído
  (devuelve 503) — no usarlo. Cada URL de esta lista se verificó con `curl` antes de
  usarse; si se añaden imágenes nuevas, verificar igual antes de commitear. Miniaturas de
  YouTube vía `img.youtube.com` (dominio añadido a `next.config.ts`): usar siempre
  `hqdefault.jpg`, no `maxresdefault.jpg` — este último da 404 en vídeos que no se subieron
  en resolución suficiente (comprobado con el vídeo de `/multimedia`).
- **Fuentes de contenido:** el análisis completo de extracción (con tabla de conflictos,
  glosario técnico confirmado y contenido por sección 6.1–6.11) se generó en un
  scratchpad temporal de la sesión y no se ha conservado como archivo del repo — si hace
  falta volver a consultarlo con detalle, re-derivarlo de `docs/` siguiendo el mismo
  criterio de prioridad de fuentes descrito arriba.
- **Vercel:** `@vercel/analytics` ya integrado. `vercel.json` define cabeceras de caché
  para `_next/static` (inmutable) e imágenes (`stale-while-revalidate`), más cabeceras de
  seguridad básicas (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`).
