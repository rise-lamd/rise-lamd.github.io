# RISE-LAMD — Design system: "The Signal Field"

Public site for a UNESP research group working on recognition, inference, and
search over language and multimedia data (NLP, computer vision, IR, ML).
Audience: prospective students, collaborators, peers. Register: brand/portfolio
— the page's impression is part of the work.

## Concept

The lab's subject is **signals becoming knowledge**, so the interface is a
**dark, luminous instrument canvas** where data flows as light into a single
node. The logo is the brief: seven data modalities converge as rays into a
glowing node that roots into a sapling.

- **Dark-first** (`:root`), with a real **light theme** (`[data-theme="light"]`)
  and a header toggle. No-flash setter runs inline in `<head>`; the choice is
  persisted only on an explicit click, so return visits otherwise follow the
  OS `prefers-color-scheme`.
- The **signal field** (hero + footer) is a fixed dark band in *both* themes —
  animated rays, traveling signal pulses, a radial glow, and a grain layer.
- The **modality icon language** is the connective tissue: the home "Seven
  signals, one representation" diagram, plus a `signal-rule` node divider under
  every inner-page title and a cyan node marker on every section heading.

## Color (OKLCH, two themes, all AA-verified)

Cyan carries the signal, green is growth, navy is the field. Numbers are WCAG
contrast vs. the relevant background.

| Role | Dark | Light |
|------|------|-------|
| bg | `0.185 0.028 260` | `0.992 0.004 250` |
| ink (text) | `0.955` → 16.4:1 | `0.25` → 15.6:1 |
| muted | `0.74` → 8.1:1 | `0.47` → 6.7:1 |
| link (text accent) | `0.82 0.11 220` → 11.8:1 | `0.52 0.11 238` → 5.3:1 |
| accent (cyan fill/marker) | `0.74 0.135 228` | `0.62 0.13 233` |
| grow (green) | `0.76 0.15 150` | `0.50 0.12 150` |

Field band (constant): bg `0.155 0.03 262`, ink `0.98`, cyan `0.80 0.12 218`.
Bright cyan is never body text on light — `--link` is the AA-safe variant.

## Type — 3 families, contrast axes

- **Clash Display** (Fontshare) — headings. Confident, contemporary, distinctive.
- **Hanken Grotesk** — body/UI. High legibility.
- **JetBrains Mono** — labels only (dates, venues, pub tags, code links).

Fluid `clamp()` scale (~1.27 ratio), display max ~5.2rem. `text-wrap: balance`
on headings, `pretty` on prose.

## Motion

Signature hero load (rays fade in, headline/tagline/CTA stagger, signal pulses
travel along rays via `offset-path`), per-list reveal stagger on inner pages
(load-based, not scroll-gated), node "pop" on the modality diagram. Full
`prefers-reduced-motion` reset.

## Accessibility

Skip-link, 44px+ nav/control targets, `:focus-visible` rings, both themes AA,
SVGs labeled or `aria-hidden`, custom bilingual 404.

## Logo system (vector)

The brand mark is the brief made literal: seven modality glyphs (text, dialogue,
image, audio, video, tables, signals) radiate as dotted rays into one glowing
**knowledge node**, which roots into a **sprout** on a floating crystalline
island. The icon glyphs are the *same* paths as `modalities.html`, so the logo
and the home diagram speak one language.

- `static/img/favicon.svg` — simplified node + sprout + ground; legible at 16px.
  SVG favicon with `logo-mark.png` as PNG fallback + Apple-touch icon.
- `static/img/logo-mark.svg` — full emblem, baked navy→cyan→teal gradient.
- `static/img/logo.svg` — full lockup (emblem + "RISE-LAMD" wordmark + tagline).
- **Header mark is inline SVG** (in `header.html`), not an `<img>` — its strokes
  use `--ink`/`--accent`/`--grow`, so it recolors with the theme and stays
  legible on the dark canvas (the old navy PNG nearly vanished there). The node
  brightens to `--link` on brand hover.

Legacy rasters `logo.png` (now unused) and `logo-mark.png` (kept only as the
favicon/Apple-touch fallback) remain in the tree; the SVGs are authoritative.

## Files

- `static/css/style.css` — tokens (both themes) + all components.
- `static/js/theme.js` + inline head setter — theme toggle.
- `layouts/partials/head.html` — fonts, no-flash theme, meta.
- `layouts/partials/header.html` — logo, nav, lang switch, theme toggle.
- `layouts/partials/modalities.html` — the signal diagram (kept by request).
- `layouts/index.html` — signal-field hero + modalities.
- `layouts/404.html` — "Lost signal".
- Inner templates carry `.signal-rule` under each title.

## Publication rows

Publications use compact, separated rows rather than large cards. A visual
showcase keeps the diagram in a constrained left column and the paper details
on the right; entries without artwork fall back to a narrow venue badge. All
resource links are optional and render only when their URL is present.
