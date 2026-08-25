# Architecture

> Prerequisites: `10-GLOSSARY.md`, `09-DECISIONS.md` (ADR-003, ADR-008, ADR-012).

## Stack

| Layer | Choice |
|---|---|
| Framework | Astro (static output) |
| Language | TypeScript, `strict` |
| 3D | Three.js, wrapped by React Three Fiber in one client island |
| Shaders | Hand-written GLSL. No node-based material abstraction. |
| Content | Astro content collections + Zod schemas |
| State | Zustand (World Mode only) |
| Styling | Plain CSS with custom properties from one token file |
| Animation | Custom spring integrator. GSAP only if a concrete need appears. |
| Testing | Vitest (logic), Playwright (a11y, keyboard, visual, perf) |
| Asset baking | Node CLI in `tools/bake/` |
| Hosting | **Vercel**, static (ADR-034 — already configured and bound to `rikmukh.online`) |

Rationale and migration path: ADR-008.

## The central idea

```
                    ┌─────────────────────┐
                    │   Content Graph     │   src/content/**  (canonical)
                    │  MDX + JSON + Zod   │
                    └──────────┬──────────┘
                               │  build-time derivation
                 ┌─────────────┴─────────────┐
                 ▼                           ▼
        ┌────────────────┐          ┌──────────────────┐
        │ Document Mode  │          │   World Mode     │
        │  ~0 KB JS      │          │  one R3F island  │
        │  /doc/**       │          │  /               │
        └────────────────┘          └──────────────────┘
```

**The derivation invariant:** the World Mode Station manifest is *generated* from
the Content Graph at build time. A Station without a content entry fails the
build; a content entry without world placement data fails the build. Neither
renderer can drift from the other, because neither is the source.

## Directory layout

```
website/
├─ AGENTS.md                  ← orientation for every new session. Read first.
├─ docs/                      ← the specification. See AGENTS.md for read order.
│  └─ STATUS.md               ← living state. Rewritten every session.
├─ tools/
│  └─ bake/                   ← mesh → point-cloud position/colour textures
├─ assets/
│  ├─ source/                 ← .blend blockouts, not shipped
│  └─ baked/                  ← generated float textures, committed via LFS
├─ src/
│  ├─ content/                ← THE CONTENT GRAPH. Single source of truth.
│  │  ├─ config.ts            ← Zod schemas. The contract.
│  │  ├─ about/
│  │  ├─ roles/               ← work history → Market stalls
│  │  ├─ projects/            ← → Mirrors
│  │  ├─ education/           ← → Climb tiers
│  │  ├─ stations/            ← spine placement, camera, pacing, a11y descriptions
│  │  └─ meta/                ← contact, SEO, accessibility statement
│  ├─ engine/                 ← FRAMEWORK-AGNOSTIC. Plain Three.js + GLSL.
│  │  ├─ spine/               ← curve, arc-length param, camera controller
│  │  ├─ focus/               ← the Focus system (§Focus)
│  │  ├─ particles/           ← GPGPU sim, point material, shaders
│  │  ├─ input/               ← all inputs → single dt scalar
│  │  │                         (no audio/ — descoped, ADR-025. If optional
│  │  │                          Phase 11 happens, it lands here.)
│  │  └─ spring.ts            ← the one animation primitive
│  ├─ world/                  ← R3F wrapper. Thin. Bridges engine ↔ React.
│  │  ├─ Island.tsx           ← the single hydrated entry point
│  │  ├─ stations/            ← per-Station scene composition
│  │  └─ ui/                  ← HUD, station index, settings, help panel,
│  │                             the /world transition (ADR-024)
│  ├─ a11y/
│  │  ├─ DomMirror.astro      ← the semantic mirror of World Mode
│  │  ├─ prefs.ts             ← the seven preferences, persistence, detection
│  │  └─ announce.ts          ← polite live region
│  ├─ doc/                    ← Document Mode components. Zero client JS.
│  ├─ styles/
│  │  └─ tokens.css           ← palette + type. ONLY place colours are defined.
│  └─ pages/
│     ├─ index.astro          ← World Mode
│     ├─ doc/[...slug].astro  ← Document Mode
│     └─ accessibility.astro
└─ tests/
   ├─ unit/
   └─ e2e/                    ← a11y, keyboard, flicker, perf, visual
```

## Codebase standards (ADR-037)

**The full, operational rules live in `13-CODE-STANDARDS.md`** — naming, imports,
TypeScript flags, React/R3F discipline, strings/i18n, comments, tests, and the lint
enforcement for each. That document is written to be inlined into task briefs. This
section states the principles; `13` states the rules.

**The codebase is a graded deliverable, not a side effect.** Rik's bar: a senior dev
wrote it, a child can navigate it, and it is *self-documenting* — a developer understands
the structure from directory names, file names, and signatures alone, without reading a
comment or a doc. These are enforced in review, and in CI where a rule exists.

1. **Self-documenting names.** Directories and files describe their contents. No
   `utils/`, `helpers/`, `misc/`, `common/`, `stuff/`. If you cannot name a module
   precisely, it is doing too much.
2. **No inline user-facing strings — ever.** Every label, message, and piece of copy
   lives in a string catalogue (`src/content/` for site copy, a dedicated `strings`
   module for UI chrome) and is imported by key. This makes all copy editable in one
   place and makes the site **translation-ready by construction** — an explicit future
   path, not a commitment to ship translations now. A lint rule flags hardcoded
   user-facing strings.
3. **Replaceability is a requirement.** The font, the Mirror presentation, each visual
   effect, and each content item must be swappable by touching one well-named module.
   Rik confirms look only by seeing it (ADR-011), so the code assumes every visual choice
   changes at least once.
4. **Encapsulation.** Minimal public surface per module; internals private. `src/engine/`
   forbids framework imports (see below); the discipline generalises everywhere.
5. **One concern per module.** Small single-purpose files over large multi-purpose ones.
6. **Established web conventions** over project-local invention, so any web developer
   reads the layout on sight.
7. **Comments explain *why*, never *what*.** A comment that restates the code is a sign
   the code needs a better name.

Rationale specific to this project: implementers are context-poor and disposable
(`11-AGENT-PROTOCOL.md`). Each new agent must understand a file from the file alone, so
self-documentation is the precondition for the whole build model — not a polish item.

## Key boundaries

**`src/engine/` must not import React, Astro, or Zustand.** It is plain
TypeScript, Three.js, and GLSL. This is the hard-won expensive code, and keeping
it framework-agnostic is what makes ADR-008's migration path cheap. Enforce with
an ESLint `no-restricted-imports` rule.

**`src/world/` is thin.** It instantiates engine objects, drives them from the
render loop, and bridges React state. It contains no simulation logic.

**`src/styles/tokens.css` is the only place a colour literal may appear.** Enforce
in CI with a grep-based lint over `src/**` for hex literals. This is what makes
the Ember rule and the contrast guarantees auditable.

## The Content Graph

Schemas live in `src/content/config.ts` and are the project's real contract. A
sketch — the authoritative version is the code:

```ts
const station = z.object({
  id: z.string(),
  act: z.number().int().min(0).max(8),
  focalT: z.number().min(0).max(1),
  tRange: z.tuple([z.number(), z.number()]),
  scrollGain: z.number().default(1),          // pacing, 02-EXPERIENCE-SPEC §2
  contentRef: z.string(),                     // REQUIRED — derivation invariant
  camera: z.object({
    lookTarget: z.tuple([z.number(), z.number(), z.number()]),
    freeLookClamp: z.tuple([z.number(), z.number()]).default([25, 15]),
  }),
  focus: z.object({
    globalFocus: z.number().min(0).max(1),
    dispersionRadius: z.number(),
    density: z.enum(['void','sparse','medium','dense','overwhelming']),
  }),
  // audio: REMOVED by ADR-025 — audio is descoped; nothing may depend on it.
  a11y: z.object({
    label: z.string(),
    headingLevel: z.number().int().min(1).max(4),
    description: z.string(),                  // for the DOM mirror
  }),
  alcoves: z.array(z.string()).default([]),
})
```

Every content collection carries **both** prose (for Document Mode) and world
placement data (for World Mode). One file, two consumers.

Build-time validation must assert:

- `globalFocus ≤ 0.90` for every Station with `focalT < reachT` (Foreshadow F6)
- `tRange` values are contiguous and non-overlapping across all Stations
- every `contentRef` resolves
- every `alcoves` entry resolves
- every Station has a non-empty `a11y.description` (ADR-025)
- every referenced baked asset exists

A failure here is a build failure, not a warning.

## The particle system

One GPGPU system for the entire world (ADR-012). This is the decision that makes
the project solo-feasible: architecture, vendors, wares, Wardens, and the Figure
are all the same draw-call family with different position textures.

```
assets/source/*.blend
        │  Blender blockout — low detail is fine, the aesthetic hides it
        ▼
tools/bake/  (Node CLI)
        │  surface sampling → N points, Poisson-ish distribution
        │  emits: position texture (RGBA32F), colour texture, metadata JSON
        ▼
assets/baked/<subject>.{pos,col}.exr + .json
        ▼
engine/particles/
        │  positions in a data texture, simulated in a fragment shader
        │  one InstancedBufferGeometry / Points per subject family
        ▼
GPU
```

Shader responsibilities:

- **Simulation pass:** per-point current position, interpolating between
  authored position and a seeded random offset scaled by `(1 - focus) *
  dispersionRadius`, plus low-frequency jitter, plus cursor displacement (verb 3).
- **Render pass:** point size from depth and Focus; opacity from Focus; colour
  from Focus and interactivity.

The Focus scalar is uploaded per subject per frame. Everything else lives in
textures. Per-frame CPU work stays near zero, which is the whole point.

## Focus

`src/engine/focus/` owns the composite computation in `02-EXPERIENCE-SPEC.md` §5.
It is pure and unit-testable: given `t`, camera orientation, cursor position, and
a subject descriptor, return a scalar. **No rendering code in this module** — it
must be testable headlessly, because Foreshadow F6 has to be enforced by a test.

## Routing

| URL | Serves |
|---|---|
Revised by **ADR-024** — Document Mode is the default.

| URL | Serves |
|---|---|
| `/` | **Document Mode** — canonical, instant, ~5 KB JS, crawlable. Carries the hero header and the "Enter the world" invitation. |
| `/world` | World Mode, entered deliberately via a thematic transition that covers shader compilation and asset load |
| `/doc/<slug>` | Individual content: a role, a project, education |
| `/accessibility` | Accessibility statement |
| `/resume.pdf` | **Generated** from the Content Graph at build time (ADR-026) |

`/` is the SEO and social-preview surface and needs no `<noscript>` fallback — it is
already the fallback. **There is no automatic redirection to `/world`, ever**,
including for returning visitors: it would break crawlers and break the promise the
default makes.

## State

Zustand store, World Mode only:

```
t, velocity, activeStationId, globalFocus,
cursor: {x, y, active},
prefs: { reducedMotion, highContrast, photosensitiveSafe,
         dyslexiaSpacing, instantTravel, nativeScroll, audio },
secondSight: boolean,
perfTier: 'high' | 'medium' | 'low' | 'minimal'
```

`t` updates every frame. It must **not** be a React state value driving
re-renders — it lives in a mutable ref read by the render loop, mirrored into the
store only on Station change. Getting this wrong will destroy frame rate, and it
is the most likely performance mistake in the codebase.

## Testing

| Kind | Tool | Covers |
|---|---|---|
| Unit | Vitest | spine math, arc-length param, Focus composition, input→dt, springs, Zod schemas |
| Invariant | Vitest | Foreshadow F6, `tRange` contiguity, derivation invariant |
| A11y e2e | Playwright + axe | `04-ACCESSIBILITY.md` §Verification |
| Keyboard e2e | Playwright | full journey, pointer never used |
| Visual | Playwright | deterministic screenshot at every Station `focalT` |
| Flicker | Playwright | frame luminance sampling + FFT, 3Hz cap |
| Perf | Playwright + CDP | `06-PERFORMANCE.md` budgets |

**Determinism requirement.** For visual and flicker tests to work, the world must
be reproducible: seed all randomness, and make the animation clock injectable so
tests can step frames rather than wall-clock wait. Build this in from Phase 1 — it
is very painful to retrofit, and without it a looped build session has no eyes at
all.

## CI

On every commit: typecheck → lint (including the hex-literal and engine-import
rules) → unit + invariant tests → build (Zod validation runs here) → Playwright
a11y, keyboard, flicker, perf → visual snapshots uploaded as artifacts.

Visual diffs do **not** fail the build. They are posted for Rik to review, because
only Rik can say whether a change is a regression or an improvement.
