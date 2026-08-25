# Dependencies — what to lift, what to build

> Governing principle (ADR-019): **lift the plumbing, hand-build the thesis.**
>
> Anything that *is* the site's identity — the Focus system, the Spine's authored
> pacing, the Figure's behaviour, the DOM mirror — is bespoke, because it is the
> reason the site exists. Everything else should be an import.
>
> Verification status is marked per entry. `[verified 2026-08-19]` means the
> library's docs were read during planning. `[from knowledge]` means it was not
> re-checked and the exact API must be confirmed at install time. Pin all versions
> in Phase 0.

---

## The big three wins

These replace systems that `02-EXPERIENCE-SPEC.md` and `05-ARCHITECTURE.md`
originally specified as hand-written. Each is a multi-day saving.

### 1. `lenis` — the entire input layer  `[verified 2026-08-19]`

MIT, darkroom.engineering, a few KB, zero runtime dependencies.

Replaces: cross-browser `deltaY` normalization, touch drag with flick momentum,
the damped velocity integrator, and the reduced-motion input path.

Why it is the right choice specifically here:

- It **wraps native scroll rather than replacing it**, so `position: sticky`,
  anchor links, and browser accessibility behaviour keep working. This directly
  satisfies the "never hijack scroll semantics" rule in
  `02-EXPERIENCE-SPEC.md` §2 — which a hand-rolled virtual scroller would have
  quietly violated.
- `respectReducedMotion` **defaults to `true`**, forcing lerp to 1 and making
  programmatic scrolls instant. Part of `04-ACCESSIBILITY.md` for free.
- Exposes `velocity`, `progress`, `direction`, `isScrolling` — `progress` maps
  more or less directly onto `t`.
- A `virtual-scroll` event gives `{deltaX, deltaY, event}` and can be intercepted
  before smoothing, which is exactly the hook for per-Station `scrollGain`.
- `lerp`, `duration`, `easing`, `wheelMultiplier`, `touchMultiplier` cover the
  pacing knobs.
- Integrates with an existing rAF loop via `lenis.raf(time)` — required, since
  R3F owns the loop.

Caveats to design around: CSS scroll-snap is unsupported (use the separate
`lenis/snap` plugin, or keep the custom hysteresis snapping from
`02-EXPERIENCE-SPEC.md` §3 — probably the latter, since the hysteresis behaviour
is specific). `syncTouch` defaults to `false`. Safari is capped at 60fps and 30fps
in low-power mode. Possible instability on iOS < 16.

### 2. `MeshSurfaceSampler` — the core of the baking tool  `[verified 2026-08-19]`

Ships with three.js at `three/addons/math/MeshSurfaceSampler.js`. This is the
sampling core of `tools/bake/` (ADR-012), already written.

- Samples points **uniformly by surface area** — precomputes a cumulative-area
  table, picks faces weighted by area, then a random barycentric point.
- Outputs `position`, `normal`, `color`, `uv` per sample.
- **`setWeightAttribute()` implements the density grammar directly.** Weight is
  read from the first component of the named attribute, so painting vertex colours
  in Blender controls where points concentrate. Red areas get many samples, black
  areas almost none. This is how the Market becomes dense and the Void sparse —
  painted, not coded.
- A custom 1-component `density` attribute works identically if vertex colour is
  needed for actual colour.

Caveats: `build()` must be called before sampling and re-called if geometry
changes. Samples in **local space** — apply `matrixWorld` manually. Morph targets,
skinning, and per-instance transforms are ignored. Older three revisions required
non-indexed geometry; confirm against the installed version.

drei also wraps this as `<Sampler>` / `useSurfaceSampler` for runtime use, but the
bake step should use the raw class in Node so output is deterministic and
committed.

### 3. `@react-three/drei` — a large fraction of the plumbing  `[verified 2026-08-19]`

MIT, pmndrs. Note it depends on `three-stdlib` rather than `three/examples/jsm`.

| Helper | Replaces |
|---|---|
| `PerformanceMonitor` | The adaptive tier system in `06-PERFORMANCE.md`. Watches framerate, emits up/down quality signals. Add hysteresis on top. |
| `useDetectGPU` / `DetectGPU` | Device tier detection for the initial point budget. |
| `AdaptiveDpr` | Pixel-ratio reduction under load. |
| `AdaptiveEvents` | Disables pointer events during movement — free frame time while travelling. |
| `Detailed` | LOD by camera distance, adaptable to LOD by `t`-distance. |
| `useProgress` / `Loader` | Real load progress for the `/world` transition. `06-PERFORMANCE.md` forbids fake progress bars; this is the real thing. |
| `Preload` | Compiles and uploads everything before display — satisfies the "no shader recompilation after load" rule. |
| `shaderMaterial` | Boilerplate for uniforms + GLSL → JSX-ready material class. |
| `Points` / `PointMaterial` | Batched point rendering with size attenuation. Useful as a baseline; the final Focus material is custom. |
| `Text` | SDF text (troika) for in-world labels — stall labels, tier years. |
| `Html` | DOM projected onto 3D positions. The mechanism for Mirror panels (ADR-014). |
| `KeyboardControls` | Key mapping scaffolding. |
| `Bvh` / `meshBounds` | Cheap raycasting for hit targets. |

Not to be used: `ScrollControls` — it implements its own scroll container and
would conflict with Lenis and with the authored `scrollGain` pacing. `Sparkles`,
`Splat`, and the prebuilt distort/wobble materials are the wrong aesthetic.

---

## Full dependency list

### Core

| Package | Purpose | Status |
|---|---|---|
| `astro` | framework, static output, content collections | `[from knowledge]` |
| `@astrojs/react` | React island integration | `[from knowledge]` |
| `@astrojs/mdx` | MDX in content collections | `[from knowledge]` |
| `@astrojs/sitemap` | sitemap for Document Mode SEO | `[from knowledge]` |
| `typescript` | strict mode | — |
| `zod` | Content Graph schemas (bundled with Astro content) | — |

### 3D

| Package | Purpose | Status |
|---|---|---|
| `three` | renderer, math, `MeshSurfaceSampler`, `GPUComputationRenderer` | `[verified]` |
| `@react-three/fiber` | React reconciler for three | `[from knowledge]` |
| `@react-three/drei` | see table above | `[verified]` |
| `three-custom-shader-material` | inject GLSL into built-in materials; exposes `csm_PointSize`, `csm_Position`, `csm_FragColor`. MIT. Shares three's shader program cache, so init cost is negligible. | `[verified]` |
| `@react-three/postprocessing` | the single Ember bloom — `SelectiveBloom` only | `[from knowledge]` |
| `maath` | pmndrs math helpers; random point distribution in volumes, useful for dispersion offsets | `[from knowledge]` |

`GPUComputationRenderer` lives in three's addons and is the GPGPU ping-pong
framework from `05-ARCHITECTURE.md`. Lift it; do not write a ping-pong texture
manager by hand.

### Interaction and motion

| Package | Purpose | Status |
|---|---|---|
| `lenis` | the input layer — see above | `[verified]` |
| `zustand` | World Mode state | `[from knowledge]` |
| `gsap` | **only if needed.** Lenis + custom springs should cover it. If timeline sequencing becomes painful, revisit with an ADR. | `[from knowledge]` |

### Audio — descoped (ADR-025)

| Package | Purpose | Status |
|---|---|---|
| `tone` | **Optional Phase 11 only, post-launch.** Procedural layers; no assets, no stems, no composed score. Do not install before Phase 11. | `[from knowledge]` |

`howler` is no longer needed — there are no audio files to play. **Nothing in the
site may depend on audio.**

### Accessibility and architecture enforcement (ADR-026)

| Package | Purpose | Status |
|---|---|---|
| `@react-three/a11y` | Per-object roles (`content`/`button`/`togglebutton`/`link`), tab traversal, `aria-pressed`, alt text, and `<A11yAnnouncer/>` for the polite live region. **Does not replace `a11y/DomMirror`** — its focus is *emulated* at the React layer, not real DOM elements. License unstated on the repo page; confirm before adopting. | `[verified]` |
| `eslint-plugin-boundaries` | MIT. Declarative deny-by-default layer rules — the proper implementation of the `src/engine/` import restriction. | `[verified]` |
| `stylelint` + `color-no-hex` | Enforces the tokens rule in CSS directly, replacing the originally-specified grep. | `[from knowledge]` |
| `culori` | Programmatic contrast checking for the token audit. | `[from knowledge]` |
| `pure-rand` or `seedrandom` | Seeded RNG — still needed app-side; Playwright's Clock covers time but not randomness. | `[from knowledge]` |
| `satori` or `astro-og-canvas` | Generated OG images. | `[from knowledge]` |
| `gltf-transform` | CLI optimisation of Blender exports before baking. | `[from knowledge]` |
| `rollup-plugin-visualizer` | Bundle-budget enforcement against `06-PERFORMANCE.md`. | `[from knowledge]` |

**Playwright's Clock API replaces half the determinism harness** `[verified]`. It
overrides `requestAnimationFrame`, `performance`, `Date`, and all timers; `pauseAt`
plus `runFor` gives true frame-stepping. **The engine therefore does not need an
injectable clock** — it can use `requestAnimationFrame` normally while tests control
time externally. Less code, cleaner engine. Caveat: `install` must precede any other
clock call. No extra package; it ships with `@playwright/test`.

**Visual regression** needs no library — Playwright's built-in `toHaveScreenshot()`
covers it.

**PEAT** (Trace Center, free) is a manual Phase 10 cross-check for photosensitivity,
not a CI tool: Windows-only, needs `.AVI` conversion, unreliable capture, aging. The
bespoke FFT check stays in CI; PEAT provides an independent second opinion on the
most dangerous part of the design.

**`/resume.pdf` is generated**, not authored — Playwright's `page.pdf()` against a
print stylesheet over Document Mode content, extending the single source of truth to
the résumé (ADR-026).

### Type

| Package | Purpose |
|---|---|
| `@fontsource/atkinson-hyperlegible` | body face, self-hosted (ADR-011) |
| `@fontsource/instrument-serif` | display face |
| `@fontsource-variable/jetbrains-mono` | labels |

Confirm each package exists at install; otherwise self-host from Google Fonts or
the Braille Institute directly.

### Tooling and test

| Package | Purpose |
|---|---|
| `vitest` | unit and invariant tests |
| `@playwright/test` | e2e, a11y, keyboard, visual, perf |
| `@axe-core/playwright` | accessibility assertions |
| `@lhci/cli` | Lighthouse CI for Document Mode budgets |
| `leva` | **dev-only** live parameter GUI. Very high value for authoring the Spine curve, the Focus curve, and dispersion radii by feel instead of by recompile. Must be tree-shaken out of production. |
| `eslint`, `@typescript-eslint/*` | lint, plus the custom hex-literal and engine-import rules |
| `prettier` | formatting |

---

## Reference codebases and demos to study

Study these; adapt techniques rather than copying wholesale, and check licenses
before lifting code.

| Source | What to take |
|---|---|
| **Three.js Journey — particle morphing lesson** (Bruno Simon) | The canonical haze→snap point-morph technique. Closest existing thing to the Focus mechanic. Paid course; the technique is widely reproduced. |
| **Codrops tutorials + demos** | Large body of MIT-licensed point-cloud, particle-morph, and GPGPU flow-field demos with full source. Search their archive for "particles", "point cloud", "displacement". |
| **pmndrs/examples** | Canonical R3F patterns for performance scaling and shader materials. |
| **Yuri Artiukh (akella)** | Cursor-distortion and displacement-field shaders — directly relevant to the ambient cursor field (ADR-017). |
| **PavelDoGreat/WebGL-Fluid-Simulation** (MIT) | Reference for the LCD-press feel. Likely too heavy to ship; useful for understanding the advection look before implementing something cheaper. |
| **`troika-three-text`** | Under drei's `<Text>`. Read directly if in-world type needs more control. |

Deliberately **not** using a portfolio template. Document Mode is a handful of
semantic pages with a 5 KB JS budget; any template would add more constraint than
it removes, and the aesthetic is already fully specified in
`03-ART-DIRECTION.md`.

---

## Build bespoke — do not look for a library

These are the site, and no library will fit them.

| System | Why bespoke |
|---|---|
| The Focus composition (`engine/focus/`) | The site's central metaphor. Four-input composite with the 0.90 cap (Foreshadow F6). Nothing generic can encode this. |
| The Spine's authored pacing | Per-Station `scrollGain`, hysteresis snapping, the arc-length reparameterization. This *is* the direction of the piece. |
| The Figure's behaviour | Dejected → noticing → extended, proximity-driven and reversible, permanently unresolved. |
| `a11y/DomMirror` | Nothing exists for maintaining a semantic DOM mirror of a 3D scene. This is the most novel part of the project. |
| The baking CLI around `MeshSurfaceSampler` | Sampling is lifted; the legibility-floor determination, texture packing, and metadata emission are ours. |
| The flicker-analysis test | Frame luminance sampling plus FFT against a 3Hz cap. Bespoke, and worth it. |

---

## Policy

1. **Adding a dependency requires an ADR** (`11-AGENT-PROTOCOL.md`). Name what it
   replaces and how many days it saves.
2. **Prefer a library for anything not in the bespoke table.** Hand-writing
   plumbing on this project is a mistake, not craftsmanship.
3. **Reject anything that owns the render loop, the scroll container, or the state
   model** — those must stay ours. This is why `ScrollControls` is rejected while
   Lenis is not: Lenis feeds input, `ScrollControls` takes over.
4. **Pin exact versions.** Point-cloud rendering touches three's internals, and
   minor releases move them.
5. **Audit bundle impact against `06-PERFORMANCE.md`** on every addition. The
   200 KB island budget is real.
6. **`src/engine/` may not import React, Astro, or Zustand** — unchanged by any of
   this (`05-ARCHITECTURE.md`).
