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

### 🚧 En progreso / Pendiente

- Favicon/OG image todavía son los genéricos de `create-next-app`; falta un favicon propio
  y una imagen Open Graph específica del proyecto.
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
  - Telemetría: se mantiene "915 MHz" tal como fija el prompt maestro, aunque
    `teleoperacion.docx` y el journal hablan indistintamente de 433/915 MHz según región.
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
