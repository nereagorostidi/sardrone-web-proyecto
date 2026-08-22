---
name: Guardian Eye
description: Documentación técnica del TFG de un dron autónomo de Búsqueda y Rescate — sistema editorial claro con acentos de telemetría aeroespacial.
colors:
  paper: "#ffffff"
  surface: "#f5f7fc"
  surface-alt: "#eaedf7"
  ink: "#0a0e1a"
  ink-muted: "#454d63"
  ink-faint: "#626b85"
  line: "#e1e4ef"
  accent: "#315dff"
  accent-ink: "#1d3fe0"
  accent-soft: "#e7edff"
  signal: "#ff6a1f"
  signal-ink: "#bf460c"
  signal-soft: "#fff0e3"
  mesh-violet: "#8b3ffb"
  mesh-cyan: "#00c2d1"
  mesh-coral: "#ff5c7a"
typography:
  display:
    fontFamily: "var(--font-geist-sans), 'Geist Sans', system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 5vw, 4rem)"
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "var(--font-geist-sans), 'Geist Sans', system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 3.5vw, 2.875rem)"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "-0.015em"
  title:
    fontFamily: "var(--font-geist-sans), 'Geist Sans', system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 2.5vw, 2.125rem)"
    fontWeight: 800
    lineHeight: 1.12
    letterSpacing: "-0.01em"
  body:
    fontFamily: "var(--font-geist-sans), 'Geist Sans', system-ui, sans-serif"
    fontSize: "0.97rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "var(--font-geist-mono), 'Geist Mono', ui-monospace, monospace"
    fontSize: "0.6875rem"
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: "0.08em"
  scale:
    micro: "9.5px"
    label-sm: "10px"
    detail: "12px"
    meta: "12.5px"
    caption: "13px"
    caption-lg: "13.5px"
    body-xs: "14px"
    body-sm: "14.5px"
    card-title: "15px"
    body-lg: "16.5px"
    subtitle-sm: "17px"
    subtitle: "18px"
    card-title-lg: "19px"
    heading-xs: "20px"
    heading-xs-lg: "21px"
    heading-sm: "22px"
    heading-sm-lg: "24px"
    heading-sm-responsive: "26px"
    display-responsive: "56px"
rounded:
  md: "12px"
  lg: "16px"
  xl: "24px"
  pill: "9999px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  2xl: "48px"
  section-y: "96px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    padding: "12px 20px"
  button-secondary:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "12px 20px"
  badge-eyebrow-accent:
    backgroundColor: "{colors.accent-soft}"
    textColor: "{colors.accent-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "4px 12px"
  badge-eyebrow-signal:
    backgroundColor: "{colors.signal-soft}"
    textColor: "{colors.signal-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "4px 12px"
  card:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "24px"
---

# Design System: Guardian Eye

## Overview

**Creative North Star: "Aerospace Editorial"**

Guardian Eye documents a real UAV Search-and-Rescue engineering project, so the system reads first as **editorial**: white paper backgrounds, generous whitespace, a restrained sans-serif hierarchy, and long-form technical prose set at comfortable reading width. Onto that editorial base it layers a controlled **aerospace/telemetry** character — a mono label face for eyebrows, spec sheets and micro-labels, a soft violet→cyan→coral mesh gradient used sparingly as an atmosphere layer (hero backgrounds, "more than a thesis" sections), and one hard-earned splash of vivid orange reserved exclusively for RF/security/alert semantics. The two registers never fight: prose and data stay quiet and legible; color and motion are spent only where they carry real technical meaning (a live link, a warning state, a diagram literally showing a signal path).

The site is deliberately **flat and light by default** — no dark "control panel" chrome as a baseline. Dark (`bg-ink`) surfaces appear only as intentional accent blocks: a code/repo showcase, a compliance checklist, a footer CTA — never as the resting background of a page. This was an explicit correction mid-project (an earlier direction leaned darker and was rejected as "not convincing"), so it is a hard constraint, not a stylistic default that happened to stick.

**Key Characteristics:**
- Editorial-first: white/near-white surfaces, calm ink-gray text, wide reading measure — the site is meant to be *read*, not just glanced at.
- Two-accent discipline: electric blue (`accent`) is the primary/technology/control color; vivid orange (`signal`) is reserved strictly for RF, security, and alert/under-construction states.
- A secondary violet→cyan→coral mesh gradient supplies atmosphere (hero glows, dark-block backdrops) without ever becoming a UI color.
- Mono "telemetry" labels (uppercase, wide tracking) mark every eyebrow, section tag, and spec value — the site's one recurring nod to instrument-panel readouts.
- Flat-by-default surfaces bordered in a single hairline gray; shadow is reserved for things that are genuinely floating above the page.
- Animated SVG diagrams (radial hubs, connection lines) are the system's signature motif, always drawing themselves in on scroll rather than appearing static.

## Colors

A light, editorial-neutral palette carries the reading experience; two vivid accents are spent with discipline, and a three-stop mesh gradient supplies atmosphere rather than interface color.

### Primary
- **Electric Blue** (`#315dff`, hover `#1d3fe0`, tint `#e7edff`): the system's one primary accent — technology, control, links, active states, the primary CTA gradient. Used on headings-within-prose (`<strong>` highlights of technical terms), primary buttons, active nav states, and the default `PageHero`/badge tone.

### Secondary
- **Aerospace Orange — "Signal"** (`#ff6a1f`, ink/text-safe variant `#bf460c`, tint `#fff0e3`): reserved *exclusively* for RF, security/alert, and "under construction" semantics — never used as a generic second brand color. `signal-ink` was darkened from an earlier `#e0500a` after an accessibility audit found it fell short of 4.5:1 even against its own `signal-soft` tint (~3.5:1); this value clears AA against both `signal-soft` and `paper`/`surface`. The raw `signal` value (`#ff6a1f`) still fails text contrast on light backgrounds — never use it directly as text color; use `signal-ink` for text and reserve raw `signal` for icon strokes, borders, and gradient fills. See the Signal Discipline rule below.

### Tertiary — Mesh Gradient
- **Mesh Violet** (`#8b3ffb`), **Mesh Cyan** (`#00c2d1`), **Mesh Coral** (`#ff5c7a`): a three-stop secondary gradient family used only for atmosphere — the `mesh-bg` / `mesh-bg-hero` radial-gradient backdrops behind hero and "more than a TFG" sections, the `.text-gradient` heading treatment, and as extra hue variety in diagram node colors (alongside accent and signal) so a 5-node radial diagram doesn't repeat colors. Never used as a solid UI surface or button fill on its own — always a gradient stop or a diagram accent.

### Neutral
- **Paper** (`#ffffff`): the base page background. The site's resting state — not "surface," paper.
- **Surface** (`#f5f7fc`): the next layer up — alternating section backgrounds, dropdown headers, footer background.
- **Surface Alt** (`#eaedf7`): a slightly deeper neutral for tertiary grouping (rare; used sparingly beneath `surface`).
- **Ink** (`#0a0e1a`): primary text color, and — inverted — the deliberate dark accent-block background (never the page background).
- **Ink Muted** (`#454d63`): body copy and secondary text; the workhorse paragraph color.
- **Ink Faint** (`#626b85`): tertiary text — timestamps, breadcrumb separators, footnote-level labels. Darkened from an earlier `#8991a8` after an accessibility audit found the lighter value failed WCAG AA (~3:1) on `paper`/`surface`; this value clears 4.5:1 on both while staying visibly lighter than `ink-muted`.
- **Line** (`#e1e4ef`): the single hairline border color used everywhere — cards, dividers, header border, input strokes.

### Named Rules
**The Signal Discipline Rule.** Orange (`signal`) means RF, security, or alert/in-progress — and nothing else. If a UI element isn't communicating "radio," "risk," or "not finished yet," it does not get orange. Blue is the default accent for everything else, including technology and IA content that has nothing to do with RF.

**The No Dark Default Rule.** Pages never open on a dark background. `bg-ink` surfaces are always a bounded block (a card, a footer CTA, a compliance panel) chosen deliberately for contrast — never the ambient page background. This was an explicit reversal of an earlier darker direction; treat it as permanent.

## Typography

**Display/Headline/Title Font:** Geist Sans (`var(--font-geist-sans)`, fallback `system-ui, sans-serif`)
**Body Font:** Geist Sans (same family — no separate body face; weight and size carry the hierarchy)
**Label/Mono Font:** Geist Mono (`var(--font-geist-mono)`, fallback `ui-monospace, monospace`) — the `.font-telemetry` utility

**Character:** One typeface for everything humane (headlines, prose, buttons) kept restrained and extrabold-weighted at the top of the scale; one monospace face reserved for anything that reads as *data* — eyebrows, section numbers, spec values, frequencies. The mono face is always uppercase with wide tracking (`0.08em`), never used for running text.

### Hierarchy
- **Display** (800, `clamp(2.5rem, 5vw, 4rem)`, leading 1.05): the home hero `<h1>` only — one per site.
- **Headline** (800, `clamp(2.25rem, 3.5vw, 2.875rem)`, leading 1.1): every `PageHero` title on subpages.
- **Title** (800, `clamp(1.75rem, 2.5vw, 2.125rem)`, leading 1.12): `SectionHeading` — the `<h2>` that opens each content section within a page.
- **Body** (400, `~15.5–16.5px`, leading-relaxed, `text-ink-muted`): paragraph copy; kept to a comfortable measure (roughly `max-w-xl`/`max-w-2xl` containers, not full-bleed).
- **Label** (500, `~9–11.5px`, tracking `0.08em`, uppercase, mono, `text-ink-faint` or tinted per context): eyebrows, breadcrumb separators, footer meta, telemetry readouts (e.g. "RF 2.4GHz · TLM 433MHz · 4G/LTE").

### Component-Level Scale

Beneath the five named roles above, the implementation carries a finer, consistently-reused micro-scale for secondary/component text (card descriptions, meta captions, dark-block sub-headings) that a first documentation pass missed — surfaced by a mechanical audit that found the same handful of literal pixel values repeated dozens of times each (e.g. `13.5px` alone appears 60+ times as the standard card-description size). These aren't drift; they're an intentional scale that just wasn't written down. Documented as `typography.scale` in the frontmatter: `micro` (9.5px) → `label-sm` (10px) → `detail` (12px) → `meta` (12.5px) → `caption` (13px) → `caption-lg` (13.5px, the workhorse secondary-body size) → `body-xs`/`body-sm` (14/14.5px) → `card-title` (15px) → `body-lg` (16.5px) → `subtitle-sm`/`subtitle` (17/18px) → `card-title-lg` (19px) → `heading-xs`/`heading-xs-lg` (20/21px) → `heading-sm`/`heading-sm-lg` (22/24px). `heading-sm-responsive` (26px) and `display-responsive` (56px) are the `sm:` breakpoint steps of the `heading-sm` and `display` roles respectively (e.g. `text-[22px] ... sm:text-[26px]`), not independent sizes.

### Named Rules
**The One Display Rule.** The largest type size on the site (`display`) appears exactly once, on the home hero. Every other page — however important — tops out at `headline`. This keeps the home page feeling like the front door, not just another page.

## Layout

Container: `max-w-7xl` with `px-4 sm:px-6 lg:px-8` — the same container on every page, no exceptions. Sections stack vertically with generous rhythm: `py-20`/`py-24` (80–96px) between major sections, bordered top/bottom with a single `border-line` hairline rather than shadow or background-color changes to separate sections. Content grids collapse to a single column below `sm` and expand to 2–4 columns at `sm:`/`lg:` breakpoints (`grid-cols-1` → `sm:grid-cols-2` → `lg:grid-cols-3/4`) — never more than 4 columns. Long-form prose is deliberately narrowed (`max-w-xl`/`max-w-2xl`) even inside a full-width section, so paragraphs never stretch edge-to-edge.

The site's structural pattern is **hub + subpages**: top-level sections (`Proyecto`, `Arquitectura`, `Construcción`, `Multimedia`) that have more than one facet render as a hub page with linking cards, each linking to a real independent route (not an anchor). Every subpage carries a `PageHero` at the top and a `SubpageNav` (prev/next/hub) at the bottom, so depth is always navigable both ways.

## Elevation & Depth

Flat by default. The system's primary depth cue is the `line` hairline border, not shadow — cards, panels, and dividers rest at zero elevation with a 1px border. Shadow (`--shadow-soft`, `--shadow-lift`) is reserved for elements that are genuinely floating above the page content: dropdown navigation panels, the mobile nav drawer, the radial diagram's center hub, and a handful of emphasis blocks (the TFG title blockquote). This is a hybrid model — tonal/border layering for resting UI, shadow strictly as a "this is above everything else" signal.

### Shadow Vocabulary
- **Soft** (`box-shadow: 0 10px 28px -12px rgba(20, 24, 45, 0.16)`): gentle lift for emphasis blocks that sit slightly above their section — the pull-quote around the TFG title, diagram node icon-chips.
- **Lift** (`box-shadow: 0 24px 55px -14px rgba(20, 24, 45, 0.26)`): reserved for true overlays and floating panels — the desktop nav dropdown, the radial diagram's center hub circle.

### Named Rules
**The Floating-Only Shadow Rule.** If it isn't overlaying other content or acting as a hub/anchor point in a diagram, it doesn't get a shadow — it gets a border. Shadow is a signal of elevation, not a decoration applied to every card.

## Shapes

Corners scale with a component's weight: small interactive chips and icon tiles use `12px` (`rounded-xl`), cards and content panels use `16px` (`rounded-2xl`), large feature/dark-accent blocks use `24px` (`rounded-3xl`), and every button, badge, and pill-shaped control is fully rounded (`rounded-full`, "pill"). Borders are a single consistent hairline (`1px solid var(--color-line)`) — no double borders, no varying border widths for emphasis (emphasis comes from background tint or shadow instead). Icon containers are consistently square-cornered chips (never circular) except the two truly circular elements on the site: the header/footer logo mark and the diagram center hub — both explicitly "radar dish" motifs.

## Components

### Buttons
- **Shape:** always fully rounded (pill, `9999px`), never a rectangular button anywhere on the site.
- **Primary (dark):** `bg-ink` / white text — the default "go deeper" action (e.g. "Ver arquitectura"). Padding `12px 20px` (`px-5 py-3`).
- **Gradient CTA:** `.btn-gradient` (blue → violet, `120deg`) or `.btn-gradient-signal` (orange → coral) — used for the site's one or two highest-priority actions per view (header/footer "Apoyar el proyecto", mobile drawer CTA). White text always.
- **Secondary/Outline:** `bg-paper` with `border-line`, `text-ink` — used alongside a primary button for a lower-priority parallel action.
- **Hover:** buttons lift (`-translate-y-0.5`), they do not change color on hover — motion carries the feedback, not a color shift.

### Badges / Eyebrows
- **Style:** pill, 1px border at 30% opacity of the tone color, soft-tint background (`accent-soft` or `signal-soft`), mono label text in the matching `-ink` shade, uppercase, `11px`.
- **Tone selection:** `accent` is the default eyebrow tone; `signal` is used only when the page/section is genuinely about RF, safety, or is marked under construction (see `PageHero`'s `tone` prop).

### Cards / Containers
- **Corner Style:** `16px` (`rounded-2xl`) for the standard content card; `24px` (`rounded-3xl`) for large feature blocks (dark CTA panels, `OpenSourceCard`).
- **Background:** `paper` on `surface`/`paper` sections; inverted to `ink` (white text) for the handful of deliberate dark-accent blocks.
- **Shadow Strategy:** none at rest — see Elevation & Depth. Border only.
- **Border:** `1px solid var(--color-line)` (or `border-white/10` on dark cards); an "active/highlighted" card variant swaps to a tinted border + soft background instead of adding shadow (see the active category card in `/proyecto/normativa`).
- **Internal Padding:** `24px` (`p-6`) for standard cards, `32–40px` (`p-8 sm:p-10`) for large feature blocks.
- **Icon chip pattern:** every card that leads with an icon wraps it in an `11×11` (`h-11 w-11`) square-rounded chip (`rounded-xl`) tinted to the section's tone (`accent-soft`/`signal-soft`), icon at `20px`, stroke width `1.75`.

### Tech Badge Chips
- **Style:** pill, `bg-paper`/`border-line`, brand logo (real SVG mark via `simple-icons`/local asset, never a generic icon) at `18px` in a small leading slot, bold label text `12.5px`. Used exclusively for naming real technologies in the stack (`TechBadgeRow`) — never for arbitrary tags.

### Navigation
- **Desktop:** pill nav items (`rounded-full`, `13.5px` medium weight), header background transitions from a transparent gradient-over-hero to a blurred paper bar (`bg-paper/85 backdrop-blur-lg`) on scroll. Multi-level items open a `Lift`-shadowed dropdown panel (`rounded-2xl`, `border-line`, mono-labeled header strip) via Radix `NavigationMenu`.
- **Mobile:** a full-height right-side drawer (Radix `Dialog`, spring transition) with accordion-style expandable sections; the gradient CTA button anchors the bottom of the drawer.
- **Subpage prev/next:** a three-part bottom bar (`SubpageNav`) — prev link (or "Home" fallback) on the left, a pill "back to hub" link centered, next link on the right — always present on hub-child pages so depth never dead-ends.

### Signature Component: Animated Radial/Flow Diagrams
The system's one truly custom visual language: SVG diagrams (`RadialDiagram`, `TripleLinkDiagram`, `FlowDiagram`) where connector lines draw themselves in on scroll (Framer Motion `pathLength` animation, staggered per node) and terminate in a small colored dot. Node icons sit in tinted, colored-bordered chips (color drawn from the accent/signal/mesh palette, tinted background via `color-mix`), and a central hub — when present — pulses with a soft double concentric ring (`pulse-ring` keyframe) inside a `Lift`-shadowed circular badge. This motif is reserved for genuinely structural/technical relationships (communication links, system architecture, focus areas) — never used as decoration.

## Do's and Don'ts

### Do:
- **Do** keep pages resting on `paper`/`surface`, reserving `bg-ink` for deliberate, bounded accent blocks only.
- **Do** use the mono "telemetry" label style (`font-telemetry`, uppercase, `0.08em` tracking) for every eyebrow, spec value, and section tag — it's the system's one consistent nod to instrument-panel data.
- **Do** border cards and panels with the single `line` hairline at rest; add shadow only when the element is truly floating above the page (dropdowns, drawers, diagram hubs).
- **Do** reserve the orange `signal` accent for RF, security, and alert/under-construction meaning specifically.
- **Do** animate diagrams to draw themselves in on scroll rather than rendering static — motion is part of how the system explains technical relationships.
- **Do** use real brand SVG marks (`simple-icons` or a vetted local asset) for any named technology, never a generic icon standing in for a brand.

### Don't:
- **Don't** use `signal` orange as a generic second brand color or for anything unrelated to RF/security/alert — that dilutes its one job.
- **Don't** use the raw `signal` (`#ff6a1f`) or `accent`/`mesh-*` hue values as inline text color on a light background — none of the raw hues clear 4.5:1 on `paper`/`surface`. Use `text-ink`/`text-ink-muted` for the label and reserve the hue for the icon, border, or dot next to it.
- **Don't** default a page or section to a dark background; dark blocks must be a deliberate, bounded exception.
- **Don't** add a rectangular button anywhere — every button and badge on the site is a pill.
- **Don't** add drop shadows to resting cards/panels "for depth" — depth comes from the `line` border; shadow is reserved for elements genuinely floating above content.
- **Don't** invent or display technical figures (frequencies, model names, precision numbers) that aren't sourced from the project's real documentation — an explicit `[placeholder]` beats a plausible-looking fabricated value, and that same honesty extends to the visual system: no fake data-dashboard chrome implying live telemetry that doesn't exist.
