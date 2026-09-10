# Design System — Worked Example (Neutral Theme)

> A complete, filled-in instance of the `design.md` boilerplate — no placeholders. The theme is deliberately neutral (near-default shadcn, zinc-based, near-zero chroma) so it works as a starting point for any product. **Usage:** copy this file into a project, then re-skin section by section. Values flow one way: decision → this file → `globals.css` → code.
> > >
> Built for **Tailwind CSS 4 + shadcn/ui**. Every token is a CSS variable in shadcn naming, consumed by the `@theme inline` block in §12.

---

## 1. Design Principles

In priority order:

1. **Content first.** Reach for spacing and type weight before chrome (borders, shadows, background blocks). Chrome is the last resort for hierarchy.
2. **One accent.** Exactly one hue carries action meaning — here: near-black in light, near-white in dark (`--primary`). Success/warning/error are semantic, never decorative.
3. **Every surface ships with its foreground.** A color token is only valid if its on-color is defined and contrast-checked *on that surface* (≥ 4.5:1 body, ≥ 3:1 UI).
4. **Dark mode is designed, not inverted.** Dark surfaces *lighten* as they elevate: `--background` (0.141) → `--card` (0.18) → `--popover` (0.21). Borders are alpha-white; shadows run at 0.4–0.6 alpha.
5. **Flat by default.** Elevation is earned by overlays (popovers, dialogs, toasts), not spent on decoration. Cards and inputs never carry shadows.
6. **Type does the hierarchy.** Weight and size first; muted color second; uppercase + tracking only for `text-xs` labels.
7. **One state grammar everywhere.** Hover = surface shift (150ms). Pressed = `scale(0.98)` (100ms). Focus = `ring-2 --ring` offset 2. Disabled = 50% opacity + `pointer-events: none`. No component invents its own.
8. **Motion explains change, never decorates it.** 150–250ms default; reduced motion disables transforms, keeps opacity.

---

## 2. Colors

### 2.1 Base tokens

| Token | Variable | Light | Dark | Use |
| --- | --- | --- | --- | --- |
| Background | `--background` | `oklch(1 0 0)` | `oklch(0.141 0.005 285.823)` | App canvas, page floor |
| Foreground | `--foreground` | `oklch(0.141 0.005 285.823)` | `oklch(0.985 0 0)` | Primary text on `--background` |
| Card | `--card` | `oklch(1 0 0)` | `oklch(0.18 0.006 285.885)` | Cards, panels. Dark: one step lighter than background |
| Card foreground | `--card-foreground` | `oklch(0.141 0.005 285.823)` | `oklch(0.985 0 0)` | Text on `--card` |
| Popover | `--popover` | `oklch(1 0 0)` | `oklch(0.21 0.006 285.885)` | Dropdowns, dialogs, tooltips. Dark: lighter than card |
| Popover foreground | `--popover-foreground` | `oklch(0.141 0.005 285.823)` | `oklch(0.985 0 0)` | Text on `--popover` |
| Primary | `--primary` | `oklch(0.21 0.006 285.885)` | `oklch(0.922 0 0)` | The accent: primary buttons, links, active states, tooltip fill |
| Primary foreground | `--primary-foreground` | `oklch(0.985 0 0)` | `oklch(0.21 0.006 285.885)` | Text/icons **on** `--primary` |
| Secondary | `--secondary` | `oklch(0.967 0.001 286.375)` | `oklch(0.274 0.006 286.033)` | Quiet fills: secondary buttons, badges, table headers |
| Secondary foreground | `--secondary-foreground` | `oklch(0.21 0.006 285.885)` | `oklch(0.985 0 0)` | Text on `--secondary` |
| Muted | `--muted` | `oklch(0.967 0.001 286.375)` | `oklch(0.274 0.006 286.033)` | Hover wells, skeletons, disabled surfaces, footer fill |
| Muted foreground | `--muted-foreground` | `oklch(0.552 0.016 285.938)` | `oklch(0.705 0.015 286.067)` | Secondary text, placeholders, captions, icons at rest |
| Accent | `--accent` | `oklch(0.967 0.001 286.375)` | `oklch(0.274 0.006 286.033)` | Hover/selected wells (= `--secondary`) |
| Accent foreground | `--accent-foreground` | `oklch(0.21 0.006 285.885)` | `oklch(0.985 0 0)` | Text on `--accent` |
| Destructive | `--destructive` | `oklch(0.577 0.245 27.325)` | `oklch(0.395 0.133 27.452)` | Errors, destructive actions. Dark: lighter, readable red |
| Destructive foreground | `--destructive-foreground` | `oklch(0.985 0 0)` | `oklch(0.985 0 0)` | Text on `--destructive` |
| Border | `--border` | `oklch(0.901 0.006 286.286)` | `oklch(1 0 0 / 10%)` | Hairlines on cards, inputs, dividers |
| Input | `--input` | `oklch(0.901 0.006 286.286)` | `oklch(1 0 0 / 15%)` | Field borders |
| Ring | `--ring` | `oklch(0.552 0.016 285.938)` | `oklch(0.84 0.007 286.25)` | Focus outline |
| Chart 1 | `--chart-1` | `oklch(0.646 0.222 41.116)` | `oklch(0.488 0.243 264.376)` | Data viz only |
| Chart 2 | `--chart-2` | `oklch(0.6 0.118 184.704)` | `oklch(0.696 0.17 162.48)` | Data viz only |
| Chart 3 | `--chart-3` | `oklch(0.398 0.07 227.392)` | `oklch(0.769 0.188 70.08)` | Data viz only |
| Chart 4 | `--chart-4` | `oklch(0.828 0.189 84.429)` | `oklch(0.627 0.265 303.9)` | Data viz only |
| Chart 5 | `--chart-5` | `oklch(0.769 0.188 70.08)` | `oklch(0.645 0.246 16.439)` | Data viz only |
| Sidebar | `--sidebar` | `oklch(0.985 0 0)` | `oklch(0.141 0.005 285.823)` | App-shell sidebar fill |
| Sidebar foreground | `--sidebar-foreground` | `oklch(0.141 0.005 285.823)` | `oklch(0.985 0 0)` | Sidebar text |
| Sidebar primary | `--sidebar-primary` | `oklch(0.21 0.006 285.885)` | `oklch(0.922 0 0)` | Active-item indicator |
| Sidebar primary fg | `--sidebar-primary-foreground` | `oklch(0.985 0 0)` | `oklch(0.21 0.006 285.885)` | Text on `--sidebar-primary` |
| Sidebar accent | `--sidebar-accent` | `oklch(0.967 0.001 286.375)` | `oklch(0.274 0.006 286.033)` | Sidebar hover/active wells |
| Sidebar accent fg | `--sidebar-accent-foreground` | `oklch(0.21 0.006 285.885)` | `oklch(0.985 0 0)` | Text on `--sidebar-accent` |
| Sidebar border | `--sidebar-border` | `oklch(0.901 0.006 286.286)` | `oklch(1 0 0 / 10%)` | Sidebar right edge |
| Sidebar ring | `--sidebar-ring` | `oklch(0.552 0.016 285.938)` | `oklch(0.84 0.007 286.25)` | Sidebar focus |

**Rules**

- Contrast checked per surface in both themes: body ≥ 4.5:1, large/UI ≥ 3:1.
- Dark borders, inputs, rings are **alpha-white**, never fixed grays.
- Neutral ramp chroma ≤ 0.016; chroma lives only in `--destructive` and `--chart-*`.
- Light and dark variants of a token share hue; only lightness/chroma move.

### 2.2 Semantic usage

| Semantic | Color (light / dark) | Usage |
| --- | --- | --- |
| Success | `oklch(0.6 0.118 184.704)` / `oklch(0.696 0.17 162.48)` (chart-2 family) | Confirmations, positive status |
| Warning | `oklch(0.769 0.188 70.08)` / `oklch(0.828 0.189 84.429)` (chart-5 family) | Caution states |
| Info | = `--primary` | Neutral informational emphasis |

Soft tints are computed, not stored: fill `color-mix(in oklab, <semantic> 10%, var(--background))`, icon in full-strength semantic.

---

## 3. Typography

### 3.1 Font stacks

| Role | Variable | Stack |
| --- | --- | --- |
| Sans / UI | `--font-sans` | `Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif` |
| Mono | `--font-mono` | `"JetBrains Mono", ui-monospace, "SF Mono", Menlo, monospace` |

Two families only. Mono is for code, IDs, and numbers in data-dense tables. No display face — sans carries everything.

### 3.2 Scale

| Token | Size / line | Weight | Tracking | Use |
| --- | --- | --- | --- | --- |
| `text-xs` | 0.75rem / 1rem | 500 | 0 | Badges, tags, timestamps, table headers |
| `text-sm` | 0.875rem / 1.25rem | 400 | 0 | Metadata, captions, table cells, buttons, nav |
| `text-base` | 1rem / 1.5rem | 400 | 0 | Default body, form fields |
| `text-lg` | 1.125rem / 1.75rem | 400 | 0 | Emphasized body, card intros |
| `text-xl` | 1.25rem / 1.75rem | 600 | -0.01em | Card titles, modal titles |
| `text-2xl` | 1.5rem / 2rem | 600 | -0.015em | Page titles |
| `text-3xl` | 1.875rem / 2.25rem | 600 | -0.025em | Hero numbers, empty-state headlines |

**Rules**

- Body line-height 1.5; dense UI text (tables, nav) 1.25–1.375.
- Tight tracking only at `text-xl`+; never on lowercase body.
- `font-variant-numeric: tabular-nums` on any column of numbers.
- All-caps only for `text-xs` eyebrows with `+0.05em` tracking.
- Weights: 400 body · 500 labels/buttons · 600 headings. No other rungs.

---

## 4. Spacing & Layout

- **Base unit:** 4px (Tailwind `--spacing`). Scale: 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96.
- **Density heights:** compact 32px · default 40px · touch 44px. Buttons, inputs, and menu items share the rung of their surface.
- **Containers:** app content `max-w-7xl` (1280px) · text-heavy forms `max-w-2xl` (640px) · dashboards full-bleed with 24px gutters (32px at `xl`).
- **Card padding:** 24px default · 16px compact/dense tables.
- **Section rhythm:** 64px between page sections · 96px for settings-style pages.
- **Sticky-bar clearance:** page wrapper `padding-bottom` = bar height + 16px.

---

## 5. Elevation & Depth

| Level | Treatment | Use |
| --- | --- | --- |
| 0 — Flat | border `--border`, no shadow | Cards, inputs, tables, nav — the default |
| 1 — Raised | + `--shadow-1` | Interactive cards, sticky bars |
| 2 — Overlay | + `--shadow-2` | Popovers, dropdowns, toasts |
| 3 — Modal | + `--shadow-3` + backdrop | Dialogs, sheets |

| Level | Light | Dark |
| --- | --- | --- |
| 1 | `0 1px 2px 0 rgb(0 0 0 / 0.05)` | `0 1px 2px 0 rgb(0 0 0 / 0.4)` |
| 2 | `0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)` | `0 4px 6px -1px rgb(0 0 0 / 0.5), 0 2px 4px -2px rgb(0 0 0 / 0.5)` |
| 3 | `0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)` | `0 10px 15px -3px rgb(0 0 0 / 0.6), 0 4px 6px -4px rgb(0 0 0 / 0.6)` |

- Modals/sheets in dark additionally carry `inset 0 1px 0 0 rgb(255 255 255 / 8%)` to catch light.
- Backdrop: `bg-black/50` + `backdrop-blur-sm`, `z-40` (content `z-50`).
- Raise the level, never the blur — no stacked or "extra important" shadows.

---

## 6. Shapes

| Token | Value | Use |
| --- | --- | --- |
| `--radius-xs` | 0.125rem | Badges, tooltips, checkboxes |
| `--radius-sm` | 0.375rem | Buttons, inputs, menu items, tabs |
| `--radius-md` | 0.5rem | Small cards, popovers |
| `--radius-lg` | 0.625rem | Cards, dialogs, toasts |
| `--radius-xl` | 0.75rem | Large panels, sheet content |
| full | 9999px | Pills, avatars, switches, icon circles |

One radius family, scaled by surface size. Circles only for avatars, switches, and pill badges.

---

## 7. Motion

- **Durations:** 150ms hover/press · 200ms default transitions · 250ms panels/sheets · 300ms dialogs.
- **Easings:** default `cubic-bezier(0.4, 0, 0.2, 1)` · enter `cubic-bezier(0.16, 1, 0.3, 1)` · exit `cubic-bezier(0.4, 0, 1, 1)`.
- **Patterns:** hover 150ms surface shift · press `scale(0.98)` 100ms · dialogs fade + `scale(0.97 → 1)` · sheets/toasts slide 16px · skeletons pulse 2s.
- **Reduced motion:** transforms and slides off; opacity fades stay.

---

## 8. Components

Global state grammar assumed everywhere: **hover** = surface shift 150ms · **pressed** = `scale(0.98)` 100ms · **focus-visible** = `ring-2 ring(--ring) ring-offset-2 ring-offset(--background)` · **disabled** = 50% opacity + `pointer-events: none`.

### Navigation

**`top-nav`**

- Height 56px, sticky `top-0 z-50`, fill `--background`, bottom border `--border`
- Left: product mark + primary nav links (`text-sm --muted-foreground`, `--foreground` on active); active item: weight 500 + 2px `--primary` bottom bar

**`sidebar`**

- Width 256px, fill `--sidebar`, text `--sidebar-foreground`, right border `--sidebar-border`
- Item: height 36px, radius `--radius-sm`, hover fill `--sidebar-accent`; active = `--sidebar-accent` fill + `--sidebar-accent-foreground` text + 2px `--sidebar-primary` left indicator
- Below `lg`: collapses to off-canvas `sheet`

### Actions

**`button-primary`**

- Fill `--primary`, text `--primary-foreground`, height 40 (32 compact / 44 touch), padding `0 16px`, radius `--radius-sm`, `text-sm` weight 500
- Hover: `color-mix(in oklab, var(--primary) 88%, black)` (dark: 88% white)

**`button-secondary`** — fill `--secondary`, text `--secondary-foreground`; hover `color-mix(… 88%, black/white)`. Same geometry.

**`button-outline`** — transparent fill, `1px --border`, text `--foreground`; hover fill `--accent` + text `--accent-foreground`.

**`button-ghost`** — transparent, text `--foreground` (or `--muted-foreground`); hover fill `--accent`.

**`button-destructive`** — fill `--destructive`, text `--destructive-foreground`; irreversible actions only.

**`button-icon`** — 36px square (40 on touch), radius `--radius-sm`, ghost or outline variant; always `aria-label` + tooltip.

### Inputs & Forms

**`text-input`**

- Fill `--background` on canvas / transparent on `--card`, border `1px --input`, height 40, padding `0 12px`, radius `--radius-sm`, `text-base` (dense tables: `text-sm`), placeholder `--muted-foreground`
- Hover: border darkens one step (light) / alpha +5% (dark)

**`text-input-focus`** — border `--ring` + `ring-2 --ring` offset 2; border never removed on focus

**`select`** — input chrome + `chevron-down` caret in `--muted-foreground`; menu = `dropdown-menu`

**`textarea`** — input chrome, min-h 80px, vertical padding 8px, `resize-y`

**`checkbox` / `radio`** — 16px box, radius `--radius-xs`; checked = fill `--primary`, mark `--primary-foreground`; focus ring on the box

**`switch`** — 44×24 pill (`rounded-full`); off = `--input`, on = `--primary`; knob `--background` + `--shadow-1`; `aria-checked`

**`field`** — label `text-sm` weight 500 `--foreground`; description `text-sm --muted-foreground`; error = `text-sm --destructive` + input border `--destructive`. Every input has a visible label or `aria-label`.

### Cards & Containers

**`card`**

- Fill `--card`, border `1px --border`, radius `--radius-lg`, padding 24 (16 compact), text `--card-foreground`
- Flat (Level 0) by default; clickable: hover border `--ring` + `--shadow-1`

**`card-elevated`** — same + `--shadow-1`; floating panels, KPI strips

### Data Display

**`table`**

- Header: height 40, `text-xs` weight 500 uppercase `--muted-foreground`, fill `--muted` (or transparent)
- Rows: height 44, separator `1px --border`, hover `--muted`; numeric columns `tabular-nums` right-aligned
- Lives inside a `card`; `overflow-x-auto` on narrow screens, text never shrinks

**`badge`** — height 20–24, padding `0 8px`, radius `--radius-xs`, `text-xs` weight 500; variants: outline (`--border` + `--foreground`), secondary (`--secondary`), destructive

**`avatar`** — `rounded-full`, sizes 24/32/40, `--muted` fallback with initials `--muted-foreground`; groups overlap -8px, separated by `ring-2 --background`

**`tabs`** — list: `--muted` pill container, radius `--radius-sm`, padding 4; trigger: height 32, radius `--radius-xs`, `text-sm`; active = `--background` fill + `--shadow-1` + `--foreground`; inactive `--muted-foreground`; panel padding-top 16

**`separator`** — `1px --border`; prefer spacing when the divider carries no meaning

### Feedback

**`toast`** — fill `--popover`, border `--border`, radius `--radius-lg`, `--shadow-2`, `z-50`; bottom-right, stack gap 8, auto-dismiss 5s; destructive variant: `border-l-2 --destructive`

**`alert`** — radius `--radius-lg`, padding 16; fill `color-mix(in oklab, <semantic> 10%, var(--background))`, icon in semantic color, title `text-sm` 600, description `text-sm --foreground`

**`empty-state`** — centered: icon 40–48px `--muted-foreground` (or illustration slot), title `text-sm` 600, description `text-sm --muted-foreground` max-w 32ch, optional `button-outline` action; sits in a flat `card` or bare canvas

**`skeleton`** — `--muted` fill, radius `--radius-sm`, pulse 2s; matches the shape it replaces

**`spinner`** — `--muted-foreground`, 16–24px; always paired with `aria-live` text

### Overlays

**`dialog`** — fill `--popover`, radius `--radius-lg`, padding 24, `--shadow-3`; max-w 28rem (form dialogs 32rem); backdrop per §5; close = ghost icon button, top-right 16; enter fade + scale, exit fast

**`sheet`** (drawer) — side panel, width 24rem, full height, fill `--popover`, no radius on the anchored edge; slide-in 250ms enter easing; mobile nav, filters, detail views

**`dropdown-menu` / `popover`** — `--shadow-2`, radius `--radius-md`, padding 4, min-w 8rem; item height 32, radius `--radius-xs`, hover `--accent`/`--accent-foreground`, `text-sm`; separators `1px --border`

**`tooltip`** — fill `--primary`, text `--primary-foreground`, `text-xs`, radius `--radius-xs`, padding `4px 8px`, `--shadow-1`; delay 400ms; never the sole carrier of critical info

### App chrome

**`footer`** (in-app)

- Static — flows after content, never fixed (fixed footers fight mobile keyboards)
- Fill `--muted` (or transparent + top border `--border`); padding-y 24; text `text-sm --muted-foreground`
- Zones: meta / link columns (max 3 groups) / legal row
- With a sticky bottom action bar: page wrapper `padding-bottom` = bar height + 16

**`page`** — max-w per §4, horizontal padding 16 (24 at `md`), top padding 24 (32 at `md`), section gap 24 (32 at `lg`)

---

## 9. Accessibility

- Contrast per §2; `--muted-foreground` never carries essential text below `text-sm`.
- Focus always visible: `focus-visible` ring on every interactive element; removing outlines is forbidden without replacement.
- Touch targets ≥ 44×44 on touch layouts; icon buttons minimum 36px with tooltip/label.
- Color never the sole carrier of meaning: errors get icon + text, status dots get labels, active tabs get fill + weight.
- shadcn/Radix primitives own `aria` roles for tabs, dialogs, menus — don't rebuild with plain divs.
- Keyboard: dialogs trap focus, `Esc` closes overlays, menus support arrow keys.

---

## 10. Responsive

| Breakpoint | Width | Key changes |
| --- | --- | --- |
| `sm` | 640px | Dialogs full-width; grids 1→2 col |
| `md` | 768px | Card grids 2–3 col; forms reach `max-w-2xl`; touch rung (44px) active below this |
| `lg` | 1024px | Sidebar visible; app shell locked; tables get comfortable gutters |
| `xl` | 1280px | Content max-w reached; dashboard gutters 32px |
| `2xl` | 1536px | Wider gutters only; no layout change |

- Sidebar → off-canvas `sheet` below `lg`; top-nav condenses to menu trigger below `md`.
- Tables scroll horizontally; cells never shrink below readable width.

---

## 11. Do's and Don'ts

**Do**

- Define a token here before using it in code; keep every literal in `globals.css`.
- Check both themes whenever you touch a token.
- Use spacing and weight for hierarchy before borders and shadows.
- Keep components on the 32/40/44 height rungs — mixed heights read as bugs.
- Reuse the global state grammar (§1.7) verbatim in new components.

**Don't**

- Don't introduce a second accent hue, or use semantic colors decoratively.
- Don't shadow flat content (cards, inputs, nav) — elevation is for overlays.
- Don't use fixed grays for borders/rings in dark mode; use alpha-white.
- Don't set body text below `text-sm`, or uppercase anything above `text-xs`.
- Don't invent per-component radii, transitions, or hover effects.
- Don't describe colors by "looks like" — every value is a token or a `color-mix` of tokens.
- Don't add a new token or component if the existing vocabulary can express it — new tokens are a last resort, not a first move.

---
