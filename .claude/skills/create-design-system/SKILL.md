---
# ─── REQUIRED ────────────────────────────────────────────────────────────────
#
# name: kebab-case-skill-name
#   • Becomes the /slash-command (e.g. "fix-issue" → /fix-issue)
#   • Max 64 chars · lowercase letters, numbers, hyphens only
#   • Prefer gerund form: "processing-pdfs", "reviewing-prs", "writing-docs"
#   • Avoid vague names: "helper", "utils", "tools"
#
name: create-design-system

# description: Two-part formula (critical for auto-discovery)
#   Part 1 — Capability statement: what the skill does (verb phrase)
#   Part 2 — Trigger conditions:  "Use when..." with specific keywords
#
#   Good:  "Generate conventional commit messages by analyzing git diffs.
#           Use when the user asks for commit messages, staged changes, or /commit."
#   Bad:   "Helps with commits"
#
#   Rules:
#   • Max 250 chars shown in listing; front-load the key use case
#   • Write in THIRD PERSON ("Generates..." not "I can..." or "You can...")
#   • Include 5+ specific trigger keywords matching how users actually phrase requests
#   • No XML tags in this field
#
description: >-
  Generates a complete UI design system and mockups for a frontend project — including color palette, typography scale, spacing, icon library, atomic components, and screen mockups — output as a browsable HTML file.
  Use when user runs /create-design-system, or mentions "design system", "mockup", "color palette", "UI spec", "style guide", "design tokens", "component library", or asks to plan/generate a frontend UI.

# ─── INVOCATION CONTROL ──────────────────────────────────────────────────────
#
# disable-model-invocation: true
#   Claude cannot auto-trigger this skill; only /slash-command invocation.
#   Use for side-effect workflows: deploy, commit, send-message, etc.
#   Default: false (both you and Claude can invoke)
#
# user-invocable: false
#   Hides skill from the / menu; only Claude can trigger it automatically.
#   Use for background knowledge/conventions users shouldn't invoke directly.
#   Default: true
#
# Uncomment the one that applies:
# disable-model-invocation: true
# user-invocable: false

# ─── EXECUTION CONTEXT ───────────────────────────────────────────────────────
#
# context: fork
#   Runs skill in an isolated subagent (no access to conversation history).
#   Required for skills that should not bleed into the main context.
#   Pair with `agent` to pick the subagent type.
#
# agent: Explore | Plan | general-purpose | <custom-agent-name>
#   Which subagent to use when context: fork is set.
#   Default: general-purpose
#
# Uncomment for isolated execution:
# context: fork
# agent: general-purpose

# ─── TOOL ACCESS ─────────────────────────────────────────────────────────────
#
# allowed-tools: pre-approve specific tools so Claude doesn't prompt each use.
# Does NOT restrict other tools — it only pre-approves listed ones.
# Space-separated string or YAML list.
#
# Examples:
#   allowed-tools: Bash(git add *) Bash(git commit *) Bash(git status *)
#   allowed-tools:
#     - Read
#     - Grep
#     - Bash(npm run *)
#
# Uncomment and customize:
allowed-tools:
  - Read
  - Write
  - Glob
  - Grep
  - WebSearch
  - Bash(mkdir *)

# ─── OPTIONAL ────────────────────────────────────────────────────────────────
#
# argument-hint: shown in autocomplete to signal expected args
#   Example: "[issue-number]" or "[filename] [target-format]"
argument-hint: "[project-description or requirements]"
#
# model: override model for this skill
#   Options: claude-opus-4-6 | claude-sonnet-4-6 | claude-haiku-4-5-20251001
# model: claude-sonnet-4-6
#
# effort: low | medium | high | max
#   Overrides session effort level while skill is active.
effort: high
#
# paths: limit auto-activation to files matching these glob patterns
#   Comma-separated string or YAML list.
#   Example: "src/**/*.ts, *.test.ts"
# paths: "**/*.py"
---

# Create Design System

> This skill will generate html files that contains information and detail regarding the design system the user requested.

## Overview

This skill will help the user generate a design system and mockups for their frontend.
It will create `.html` file(s) that displays the foundational design like (colors, typography, spacing and iconography), components like (buttons, inputs, cards, etc), and mockup screens for the frontend.
This skill helps user plan out their frontend before implementing in code.

## When to use

- When user or agent explicitly invokes the /create-design-system command.
- When user mentions to "create" a "design system" or "mockup".
- When user ask to generate a frontend project, this skill should run first before generating actual frontend code.

<!--
## When NOT to use

- [Out-of-scope scenario 1 — point to the right alternative]
- [Out-of-scope scenario 2]
-->

---

## Workflow

<!-- Choose: high-freedom (natural language steps), medium-freedom (pseudocode),
     or low-freedom (exact commands). Match specificity to the task's fragility. -->

Copy this checklist and track your progress:

```
Progress:
- [ ] Step 1: Gather clarifying answers (colors, fonts, iconography, light/dark, mobile)
- [ ] Step 2: Define foundations (color tokens, typography scale, spacing, iconography)
- [ ] Step 3: Build atomic components with variants and states
- [ ] Step 4: Create mockup screens
- [ ] Step 5: Generate index.html and run consistency check
```

### Step 1 — Ask clarifying questions.

First, check if the user passed arguments when invoking the skill (e.g. `/create-design-system e-commerce app with dark mode`). Extract any answers already present in those arguments and skip asking for information already provided.

Ask the user for anything still unknown:

- What type of project is this? (e.g. SaaS dashboard, e-commerce, blog, mobile app, landing page)
- Do they have a preference for colors, fonts, and icons?
- Do they want light mode, dark mode, or both?
- Do they want mobile responsive support?
- Do they have a preferred design trend or visual style? (e.g. Minimalism, Flat Design, Material Design, Glassmorphism, Neumorphism, Claymorphism, Brutalism, Neubrutalism, Skeuomorphism)
  - If the user is unsure or has no preference, **suggest a style** based on their project type using the guidance below:

  | Project Type | Recommended Style | Reason |
  |---|---|---|
  | SaaS / Dashboard | Minimalism or Material Design | Clean data hierarchy, reduces cognitive load |
  | E-commerce | Flat Design or Neubrutalism | High contrast draws attention to products and CTAs |
  | Portfolio / Creative | Glassmorphism or Claymorphism | Visually distinctive, memorable personality |
  | Blog / Editorial | Minimalism | Typography-first, content stays in focus |
  | Mobile App | Material Design or Flat Design | Platform-native familiarity, touch-friendly |
  | Landing Page / Marketing | Neubrutalism or Glassmorphism | Bold, trend-forward, high visual impact |
  | Developer Tool / Docs | Minimalism or Flat Design | Utilitarian, distraction-free |
  | Finance / Enterprise | Minimalism or Material Design | Trustworthy, professional, accessibility-focused |

  Present the suggestion conversationally (e.g. *"For a SaaS dashboard, I'd suggest Minimalism — it keeps data readable and reduces visual noise. Want to go with that, or pick a different style?"*) and wait for confirmation before proceeding.

It is important to remember the user's answers — especially the chosen visual style — since they will affect every subsequent step, including color palette mood, typography choices, component aesthetics, and spacing density.

### Step 2 — Create the foundational style

There are 4 foundations - Color, Typography, Spacing, and Iconography.

Determine what to use for the following:
- **Colors**: Background, Text, Primary, Secondary, Tertiary and others. For each color, display:
  - A visual color swatch (filled box)
  - A semantic label following the Primary / Secondary / Accent naming style (e.g. Primary, Secondary, Background, Text Muted, Border)
  - The hex value (e.g. `#3B82F6`) or RGBA value (e.g. `rgba(59, 130, 246, 1)`)
  - A short label describing its role (e.g. "Primary — interactive elements, CTA buttons")

  Also include developer-only utility colors that are not visible in mockups but are needed for implementation:
  - `--color-focus-ring` — keyboard focus outline
  - `--color-disabled` / `--color-disabled-text` — disabled state backgrounds and labels
  - `--color-overlay` — modal/drawer backdrop
  - `--color-border` — default border/divider
  - `--color-scrollbar` — custom scrollbar thumb (if applicable)
  - `--color-selection` — text selection highlight

  Mark these developer-only colors with a `[dev]` badge so they are visually distinct in the output.

  **Dual-mode display**: If the user requested both light and dark mode, replace the plain `ds-swatches` block in `index.html` with the `ds-theme-columns` structure (see the commented-out template in `template-index.html`). Show the full palette for each mode side by side — light column on the left on a white background, dark column on the right on a near-black background. Do not use a toggle in `index.html`; both palettes must be visible at the same time.

- **Typography**: Use distinct font categories to establish a clear hierarchy:
  - **Display / Heading font**: A serif or expressive sans-serif (e.g. *Playfair Display*, *Fraunces*) — use for H1–H2 hero headings, landing page titles.
  - **Body font**: A neutral, highly-legible sans-serif (e.g. *Inter*, *DM Sans*) — use for body text, paragraphs, labels, UI copy.
  - **Monospace font**: A code-friendly typeface (e.g. *JetBrains Mono*, *Fira Code*) — use for code snippets, terminal output, numeric data.

  For each typeface, show all scale steps (`h1`–`h6`, `body-lg`, `body`, `body-sm`, `caption`, `overline`, `code`) with: font-family, font-size, font-weight, line-height, letter-spacing, and a "Best used for" note (e.g. "use `h1` for page titles only, never inside cards").
- **Spacing**: Follow the standard spacing - `xs: 4px`, `sm: 8px`, `md: 16px`, `lg: 24px`, `xl: 32px`, `2xl: 48`
- **Iconography**: If the user does not specify an icon library, use WebSearch to find the best free icon library for the project type (e.g. Lucide, Heroicons, Phosphor Icons, Tabler Icons). Confirm it has no commercial restrictions before selecting it.

### Step 3 — Create the components

Create **atomic components** — single-purpose UI elements that do not contain other components inside them.

**Rule**: A component is atomic if it cannot be meaningfully split into two independently reusable parts. If it is composed of multiple components, it is an **organism** and does not belong here.

| Atomic Component (include) | Organism (exclude) |
|---|---|
| Button | Navigation Bar |
| Input / Textarea | Search Bar (Input + Button) |
| Checkbox / Radio | Form (Label + Input + Button) |
| Toggle / Switch | Card (Image + Text + Button) |
| Badge / Tag | Modal (Overlay + Header + Body + Footer) |
| Avatar | Data Table (multiple cells, sorting, pagination) |
| Tooltip | Page Header |
| Spinner / Loader | — |
| Divider | — |
| Icon Button | — |

For each component, show:
- All meaningful **variants** (e.g. Button: Primary, Secondary, Ghost, Danger; size: sm, md, lg)
- All meaningful **states** (default, hover, focus, active, disabled, loading)

**Consistency rule**: Components must use the exact color hex values, font sizes, and spacing values defined in Step 2. Do not introduce any new values not already established in the foundations.

Again, it is important to understand what components are **NEEDED** by the frontend — do not include components the project will not use.

### Step 4 - Create the mockup screens

Determine what screens the frontend requires.
Create mockups for each screen.

**IMPORTANT**: Do not create the mockup as a whole html page. The mockup should only display as screen boxes / containers in the html.
- Desktop frame: use a 1280×800px container.
- If the user requires mobile responsive support, also display a 390×844px mobile frame (iPhone 14 reference) alongside the desktop frame.

**One screen per state — never overlap features**: If two UI elements would visually block or obscure each other when shown simultaneously (e.g. a modal open over a dashboard, a drawer expanded over a list, a tooltip covering a form), split them into separate screen files. Each screen should show one coherent UI state at a time. This ensures every screen is fully readable and nothing is hidden underneath another element.

Examples of when to split:
- `dashboard.html` — the base dashboard with no overlays
- `dashboard-modal.html` — the same dashboard with a confirmation modal open
- `sidebar-open.html` vs `sidebar-closed.html` if the sidebar dramatically changes the layout
- `form-error.html` — the form in its validation-error state

**Dark mode**: If the user requested both light and dark mode, do **not** create separate screen files per mode. Instead:
- Include the theme toggle button and script from `template-screen.html` in every screen file (they are commented-out by default — uncomment them).
- Uncomment and fill in the `[data-theme="dark"]` token block in `style.css` with the dark palette values.
- The toggle sets `data-theme="dark"` on `.ds-frame-content` elements, so the CSS variable overrides apply inside the frames only. The shell UI and browser chrome are never affected.

### Step 5 — Create the output files

Consolidate all design gathered from steps 1 to 4 into the following file structure under `docs/ui-mockup/` (create if not exist):

```
docs/ui-mockup/
  index.html          ← foundations + components hub
  style.css           ← shared design tokens (colors, typography, spacing as CSS custom properties)
  screens/
    [screen-name].html  ← one file per mockup screen
```

**Base templates** — this skill ships three starter files. Read them before writing any output:
- `.claude/skills/create-design-system/template-style.css` → copy to `docs/ui-mockup/style.css`, then replace every placeholder token with real values from Step 2.
- `.claude/skills/create-design-system/template-index.html` → copy to `docs/ui-mockup/index.html`, then fill in all `{{PLACEHOLDER}}` values and expand the commented-out sections.
- `.claude/skills/create-design-system/template-screen.html` → copy once per mockup screen to `docs/ui-mockup/screens/[screen-name].html`, replacing `{{PLACEHOLDER}}` values and adding mockup content inside the frame divs.

Additional rules:
- Every HTML file imports `style.css`; never hard-code token values inline.
- `index.html` sidebar navigation uses plain `<a href>` links — no JavaScript for navigation.
- The only permitted JavaScript is the theme toggle script in screen files, and only when dark mode was requested.
- Include `<link>` tags in every file's `<head>` to load chosen typefaces from Google Fonts or a CDN. Do not rely on system font fallbacks.

The output should be understandable and user-friendly. This will serve as a guide/reference for the frontend code implementation.

---

## Output format

<!-- Provide a template when output shape is strict; describe loosely when flexible -->

```
// index.html layout
############################################################
#         #                                                #
#         #                                                #
#         #                                                #
#         #                                                #
# sidebar #          foundations / components              #
#         #                content here                    #
#         #                                                #
#         #                                                #
#         #                                                #
#         #                                                #
#         #                                                #
#         #                                                #
#         #                                                #
############################################################

// screens/[screen-name].html layout
############################################################
# ← Back to Design System                                  #
############################################################
#                                                          #
#   [desktop mockup frame 1280×800]                        #
#                                                          #
#   [mobile mockup frame 390×844]  (if mobile required)   #
#                                                          #
############################################################
```

The **Sidebar** in `index.html` should contain the following links:
- Foundation (anchor link within `index.html`)
- Components (anchor link within `index.html`)
- Screens (links to each `screens/[screen-name].html`)

---

## Consistency Check

Before finishing, verify:

- [ ] Every color used in a mockup matches the foundational style
- [ ] Typography sizes in mockups match the type scale in the design system
- [ ] Mockup screens mimic the spacing in the design system but on a miniature level
- [ ] Component visual patterns in mockups match their descriptions in the components section

Tell the user where to find the files, list what was generated (index.html, style.css, each screen file), and suggest they open `docs/ui-mockup/index.html` in a browser to start browsing.
