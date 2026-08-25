# Performance budget

> Prerequisite: `05-ARCHITECTURE.md`.
> These are budgets, not aspirations. A build session treats an exceeded budget as
> a failing test.

## Why this is achievable at all

Worth stating plainly, because it is counter-intuitive and it shapes every
decision downstream: **the point-cloud aesthetic is cheaper than the alternative,
not more expensive.**

A detailed 3D Roman market means meshes, materials, textures, UVs, normal maps,
lighting, and months of asset work. A point cloud of the same market is position
data in a float texture, one shader, and one draw-call family. There are no
materials, no lighting model, no UVs, and low-detail source geometry is *hidden by
the aesthetic rather than exposed by it*.

Rik's visual instinct and the engineering constraint point the same direction.
Protect that alignment — any proposal that adds conventional mesh geometry to the
world should be rejected on both art-direction and performance grounds.

## Targets

| Metric | Desktop (2021 laptop, integrated GPU) | Mid-range phone (2022 Android) |
|---|---|---|
| Sustained frame rate | 60fps | 30fps |
| Frame time budget | ≤ 16.6ms | ≤ 33.3ms |
| Long tasks after first frame | 0 > 50ms | 0 > 50ms |
| Dropped frames during travel | < 1% | < 3% |

## Load budgets

| Metric | Budget |
|---|---|
| Document Mode — Time to Interactive | < 1.0s on Fast 3G |
| Document Mode — client JS | ≤ 5 KB gzipped (prefs only) |
| Document Mode — Lighthouse Performance | ≥ 98 |
| `/` hero — first paint | < 800ms |
| `/` hero point-cloud — JS cost | must fit inside the 5 KB Document Mode budget, or be pre-rendered (ADR-024) |
| World Mode — first meaningful frame | < 3.0s on cable |
| World Mode — island JS | ≤ 200 KB gzipped |
| Initial transfer, total, World Mode | ≤ 6 MB |
| Per-Station streamed assets | ≤ 1.5 MB |
| Audio, per stem | ≤ 400 KB, Opus |

Document Mode's budget is deliberately brutal. It is the version most hiring
decisions are made from, and it should be one of the fastest sites its readers
load that day.

## Point budget

Detected per device, adaptive with hysteresis.

| Tier | Points | Trigger |
|---|---|---|
| `high` | 500,000 | discrete GPU or high benchmark score, desktop |
| `medium` | 180,000 | integrated GPU desktop, high-end mobile |
| `low` | 60,000 | mid mobile, low benchmark score |
| `minimal` | 40,000 | weak devices; below this, route to Document Mode |

Rules:

- **Legibility floor.** Never reduce points below the count at which a subject
  stops reading as itself. Determined empirically per subject during baking and
  stored in its metadata. If the floor cannot be met, do not render a mush —
  render fewer subjects.
- **Perforated forms carry a higher floor** (ADR-036). The visual language's signature
  form is a perforated stone screen, which is fine high-frequency detail and therefore
  the worst case here. On `low` and `minimal` tiers reduce **screen area, never point
  density** — the same rule the Market uses for stall count. And **never let ornament
  carry meaning**, because on weak devices it does not render at all.
- **Modularity is a real win** (ADR-036). Repeated geometric modules — one screen panel,
  one arcade bay, one stepwell flight — bake once and instance many times: one
  draw-call family, one small texture. In aggregate the architectural visual language is
  **cheaper** than the bespoke abstract forms it replaced.
- **Adapt with hysteresis.** Measure a rolling median frame time; step tiers only
  after 2s sustained breach, and require a 20% margin before stepping back up.
  Never oscillate, and never change tier mid-transition.
- Tier changes are visually gradual — fade points out, never pop.
- The tier decision is exposed in the settings panel and manually overridable.

## Techniques

**Required:**

- GPGPU simulation. Positions in float textures. Near-zero per-frame CPU work.
- One `Points` draw call per subject family, not per object.
- Spine-window culling: only subjects within a `t` window are simulated at all.
  This is the single largest win available and it is only possible because of
  ADR-001 — with free-roam it would not exist.
- LOD by `t`-distance: distant subjects use a fraction of their baked points,
  sampled from the same texture.
- Progressive streaming of baked textures along the Spine, prefetching forward.
- KTX2/Basis where colour data is compressible; float positions kept exact.
- `t` in a mutable ref, never React state (`05-ARCHITECTURE.md` §State).

**Forbidden:**

- Post-processing beyond one cheap Ember bloom. No FXAA/TAA/SSAO/DOF.
- Any per-frame allocation in the render loop. Zero garbage.
- `requestAnimationFrame` work when the tab is hidden — pause fully.
- Reading GPU state back to the CPU per frame.
- Conventional mesh geometry in the world.
- Shader recompilation after load. Warm every permutation during the `/world`
  transition (drei `Preload`).

## Mobile — a first-class target (ADR-038)

Mobile is where a project like this normally dies, and an ignored mobile experience is
one of the loudest "AI-slop" tells. **The phone experience is designed, not degraded.**
The reduced feature set is authored on purpose; what remains must feel deliberate.

- Point budget `low` or `minimal`.
- Shorter free-look clamps; device orientation off by default.
- No bloom.
- **No ambient cursor field** — touch has no hover (ADR-017). The world stays alive via
  idle drift and the crowd (ADR-039); tap produces a brief displacement and decays.
- Aggressive spine-window culling — a narrower window than desktop.
- The Market is the primary risk. If it cannot hold 30fps at `low`, reduce **stall and
  crowd count** on mobile rather than point density per subject — a sparse legible market
  beats a dense mush.
- **A one-time, dismissible hint** suggests a desktop or laptop for the full World Mode
  experience (ADR-038). It never blocks, never nags, never implies the phone version is
  broken. Document Mode (the default at `/`) is already mobile-excellent, so a phone
  visitor who never enters the world loses nothing.
- Test on a real mid-range Android device, not just a throttled desktop. Flag as
  `BLOCKED: needs review` if no device is available.

## Measurement in CI

| Check | Method | Fails build |
|---|---|---|
| Frame time at every Station | Playwright + CDP tracing, scripted traversal | yes |
| Bundle sizes vs. budget | size check on build output | yes |
| Document Mode Lighthouse | Lighthouse CI | yes |
| Zero long tasks after first frame | CDP tracing | yes |
| No per-frame allocation | heap sampling over 600 frames | yes |
| Total initial transfer | build manifest sum | yes |

Traversals must be deterministic — seeded randomness and an injectable clock
(`05-ARCHITECTURE.md` §Testing). Non-deterministic perf tests are worse than none
in a looped build, because they teach a session to ignore red.

## When a budget is exceeded

In this order. Do not skip ahead.

1. Profile. Identify whether it is CPU, GPU fill, or bandwidth-bound.
2. Reduce point count for the offending subject toward its legibility floor.
3. Tighten the spine-window cull.
4. Reduce subject *count* in the Station.
5. Reduce visual fidelity of a specific effect.
6. Raise the budget — **only with an ADR explaining why, and never for Document
   Mode.**

Never resolve a budget breach by disabling the measurement.
