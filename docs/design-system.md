# ProjectOtaku Design System

**Style:** Lively Minimalism — clean layout with vivid purple primary, warm accent, and anime personality baked in.

**Reference files:** `docs/ui-mockup/index.html` · `docs/ui-mockup/style.css` · `docs/ui-mockup/screens/`

---

## Foundations

### Colors

CSS custom properties defined in `:root` inside `style.css`.

#### Semantic Palette

| Token | Hex | Role |
|---|---|---|
| `--color-bg` | `#F9F8FF` | App background, canvas |
| `--color-surface` | `#FFFFFF` | Cards, modals, nav |
| `--color-surface-raised` | `#F3F1FF` | Hover fills, subtle panels |
| `--color-text` | `#1C1730` | Primary text |
| `--color-text-muted` | `#6E6A85` | Labels, captions, placeholders |
| `--color-primary` | `#7C3AED` | CTAs, interactive elements, brand |
| `--color-primary-hover` | `#6D28D9` | Hover state of primary |
| `--color-secondary` | `#EDE9FE` | Subtle fills, secondary buttons |
| `--color-accent` | `#F97316` | Highlights, star ratings, energy |
| `--color-success` | `#059669` | Positive feedback, watched state |
| `--color-warning` | `#D97706` | Caution states |
| `--color-error` | `#DC2626` | Errors, destructive actions |

#### Kanban Status Colors

| Token | Hex | Role |
|---|---|---|
| `--color-watch-bg` | `#DBEAFE` | "Watch" column badge background |
| `--color-watch-text` | `#1D4ED8` | "Watch" column label/accent |
| `--color-watching-bg` | `#FEF3C7` | "Watching" badge background |
| `--color-watching-text` | `#92400E` | "Watching" label/accent |
| `--color-watched-bg` | `#D1FAE5` | "Watched" badge background |
| `--color-watched-text` | `#065F46` | "Watched" label/accent |

#### Developer Utilities `[dev]`

These are not used visually in mockups but are required for implementation.

| Token | Value | Role |
|---|---|---|
| `--color-focus-ring` | `rgba(124,58,237,0.35)` | Keyboard focus outline |
| `--color-disabled` | `#F3F4F6` | Disabled element background |
| `--color-disabled-text` | `#9CA3AF` | Disabled label color |
| `--color-overlay` | `rgba(28,23,48,0.50)` | Modal/drawer backdrop |
| `--color-border` | `#E2DEFF` | Default border / divider |
| `--color-scrollbar` | `#C4B5FD` | Scrollbar thumb |
| `--color-selection` | `#EDE9FE` | Text selection highlight |

---

### Typography

Three font families, each with a specific role. Load from Google Fonts:

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Sora:wght@400;600;700&display=swap" rel="stylesheet">
```

#### Sora — Display `--font-display`

Used for headings, the logo, and hero text. Slightly rounded, modern, with a subtle Japanese design sensibility. **Never use below h4 size.**

| Step | Token | Size | Weight | Line-height | Tracking | Use for |
|---|---|---|---|---|---|---|
| h1 | `--text-h1` | 3rem | 700 | 1.1 | −0.02em | Hero headline only |
| h2 | `--text-h2` | 2.25rem | 700 | 1.15 | −0.015em | Section titles, landing page |
| h3 | `--text-h3` | 1.875rem | 600 | 1.2 | −0.01em | Page sub-sections |
| h4 | `--text-h4` | 1.5rem | 600 | 1.25 | −0.005em | Column headers, card titles (hero) |
| h5 | `--text-h5` | 1.25rem | 600 | 1.3 | 0 | Anime titles on cards |
| h6 | `--text-h6` | 1.125rem | 600 | 1.4 | 0 | Auth headings, dialog titles |

#### Inter — Body `--font-body`

The UI workhorse. Used for all body text, labels, inputs, buttons, captions, and anything inside cards.

| Step | Token | Size | Weight | Line-height | Tracking | Use for |
|---|---|---|---|---|---|---|
| body-lg | `--text-body-lg` | 1.125rem | 400 | 1.6 | 0 | Hero subtext, landing page intro |
| body | `--text-body` | 1rem | 400 | 1.6 | 0 | Default body text, form labels |
| body-sm | `--text-body-sm` | 0.875rem | 400 | 1.5 | 0 | Card meta, secondary info |
| caption | `--text-caption` | 0.75rem | 400 | 1.4 | 0.01em | Timestamps, footnotes, tooltips |
| overline | `--text-overline` | 0.75rem | 600 | 1 | 0.08em | Column labels, section overlines (uppercase) |

#### JetBrains Mono — Mono `--font-mono`

Reserved for numeric data (ratings, counts, IDs) and any code or technical output.

| Step | Token | Size | Weight | Use for |
|---|---|---|---|---|
| code | `--text-code` | 0.875rem | 400 | MAL IDs, API values, code snippets |
| numeric | *(no token — apply inline)* | 0.875rem | 500 | Star ratings, episode counts |

---

### Spacing

| Name | Token | Value |
|---|---|---|
| xs | `--spacing-xs` | 4px |
| sm | `--spacing-sm` | 8px |
| md | `--spacing-md` | 16px |
| lg | `--spacing-lg` | 24px |
| xl | `--spacing-xl` | 32px |
| 2xl | `--spacing-2xl` | 48px |

#### Border Radius

| Name | Token | Value |
|---|---|---|
| sm | `--radius-sm` | 4px |
| md | `--radius-md` | 8px |
| lg | `--radius-lg` | 12px |
| full | `--radius-full` | 9999px (pill) |

#### Shadows

| Name | Token | Value |
|---|---|---|
| sm | `--shadow-sm` | `0 1px 3px rgba(28,23,48,.08), 0 1px 2px rgba(28,23,48,.04)` |
| md | `--shadow-md` | `0 4px 12px rgba(28,23,48,.10), 0 2px 4px rgba(28,23,48,.06)` |
| lg | `--shadow-lg` | `0 16px 40px rgba(28,23,48,.12), 0 4px 12px rgba(28,23,48,.08)` |

---

### Iconography

**Library:** [Lucide](https://lucide.dev) (`lucide-react`)

```bash
npm install lucide-react
```

```tsx
import { Search } from 'lucide-react'
```

- **stroke-width:** 2
- **Default size:** 16×16 (UI) / 20×20 (emphasis)
- **Color:** `currentColor`

#### Icons Used in This App

| Icon name | Use |
|---|---|
| `search` | Search bar, search button |
| `plus` | Add anime to watchlist |
| `x` | Dismiss / remove |
| `grip-vertical` | Drag handle (reorder) |
| `eye` | Watch column indicator |
| `play` | Watching column indicator |
| `check-circle-2` | Watched column indicator |
| `star` | Rating |
| `external-link` | Open on MAL |
| `log-out` | Sign out |
| `user` | User avatar fallback / profile |
| `loader-2` | Loading spinner (animated) |
| `chevron-down` | Dropdown trigger |
| `menu` | Mobile nav toggle |

---

## Components

All component classes are defined in `docs/ui-mockup/style.css` under `PROJECT ATOMIC COMPONENTS`. They use design tokens — never hard-code hex values.

### Button `.btn`

Base element: `<button>` or `<a>`. Height 36px (default), padding `0 16px`, `font-weight: 600`, `border-radius: --radius-md`.

#### Variants

| Class | Appearance |
|---|---|
| `.btn--primary` | Purple fill (`--color-primary`), white text |
| `.btn--secondary` | Light purple fill (`--color-secondary`), primary text |
| `.btn--ghost` | Transparent bg, dark text, border |
| `.btn--danger` | Red-tinted bg, error text |

#### Sizes

| Class | Height | Padding | Font size |
|---|---|---|---|
| `.btn--sm` | 28px | `0 8px` | `--text-caption` |
| *(default)* | 36px | `0 16px` | `--text-body-sm` |
| `.btn--lg` | 44px | `0 32px` | `--text-body` |

#### States

| State | How |
|---|---|
| Default | base class |
| Hover | `:hover` — darkens bg or adds fill |
| Focus | `:focus-visible` — `box-shadow: 0 0 0 3px --color-focus-ring` |
| Active | `:active` — `opacity: 0.88` |
| Disabled | `disabled` attr or `aria-disabled="true"` — uses `--color-disabled` / `--color-disabled-text` |
| Loading | `.btn--loading` — hides text, shows spinning `::after` pseudo-element |

---

### Input `.input`

Base element: `<input>`. Height 36px, `border: 1.5px solid --color-border`, `border-radius: --radius-md`.

#### States

| State | Class / modifier |
|---|---|
| Default | `.input` |
| Focus | `:focus` — border becomes `--color-primary`, `box-shadow` focus ring |
| Error | `.input--error` — border becomes `--color-error` |
| Disabled | `disabled` attr — bg `--color-disabled`, text `--color-disabled-text` |

#### Search variant

Wrap with `.input-wrap` and add `.input-wrap__icon` for a leading icon (16×16):

```html
<div class="input-wrap">
  <span class="input-wrap__icon"><SearchIcon /></span>
  <input class="input" type="search" placeholder="Search anime…" />
</div>
```

---

### Badge `.badge`

Inline pill. `border-radius: --radius-full`, `font-size: --text-caption`, `font-weight: 600`.

| Class | Colors |
|---|---|
| `.badge--watch` | `--color-watch-bg` / `--color-watch-text` |
| `.badge--watching` | `--color-watching-bg` / `--color-watching-text` |
| `.badge--watched` | `--color-watched-bg` / `--color-watched-text` |
| `.badge--genre` | `--color-secondary` bg / `--color-primary` text, weight 500 |
| `.badge--neutral` | `#F3F4F6` bg / `#4B5563` text — for episode counts, misc labels |

---

### Avatar `.avatar`

Circular initials element. `border-radius: --radius-full`, `background: --color-primary`, white text, `font-weight: 700`.

| Class | Size | Font |
|---|---|---|
| `.avatar--sm` | 24×24px | 10px |
| `.avatar--md` | 36×36px | 13px |
| `.avatar--lg` | 48×48px | 18px |

---

### Spinner `.spinner`

Animated loading ring. Uses `@keyframes spin`. Border is `--color-border`, top border is `--color-primary`.

| Class | Size | Border width |
|---|---|---|
| `.spinner--sm` | 16×16px | 2px |
| `.spinner--md` | 24×24px | 3px |
| `.spinner--lg` | 36×36px | 3px |

---

### Tooltip `.tip-wrap` / `.tip`

CSS-only hover tooltip. Appears above the trigger element.

```html
<div class="tip-wrap">
  <button class="btn btn--ghost">MAL</button>
  <span class="tip">Open on MyAnimeList</span>
</div>
```

- Background: `--color-text` (dark), white text, `--radius-sm`
- Font: `--text-caption`
- Arrow: `::after` triangle pointing down
- Shown on `.tip-wrap:hover`

---

## Screens

Mockup files live in `docs/ui-mockup/screens/`. Open in a browser — each renders a 1280×800 desktop frame inside a Safari chrome shell.

| File | Description |
|---|---|
| `landing.html` | Marketing landing page with hero, features, CTA |
| `auth.html` | Login and Register forms side-by-side |
| `board.html` | Kanban board populated with anime cards |
| `board-search.html` | Board with anime search panel open |
| `board-empty.html` | Board empty state (no titles added yet) |
