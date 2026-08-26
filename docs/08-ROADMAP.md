# Roadmap

> Prerequisites: `09-DECISIONS.md` (ADR-004, ADR-010), `11-AGENT-PROTOCOL.md`.

## Principles

1. **Every phase ends in something deployed.** Scope is the full vision (ADR-004);
   the phasing exists so that stalling at any point still leaves a live, coherent
   site rather than nothing.
2. **Nothing may be built in a way that requires a later phase to make sense.**
3. **Risk and meaning first, cuttable content last.** The Figure and the Reach are
   built in Phase 4, before the Market in Phase 6 (ADR-010). The Reach is the
   highest-value, highest-uncertainty beat and deserves attention while energy is
   high. The Market is the most expensive and the most cuttable.
4. **Exit criteria are machine-checkable wherever possible.** A session must be
   able to *prove* a phase is complete, not decide it feels complete. Criteria
   requiring Rik's eyes are marked **[R]** and gate the phase.

**There is no calendar (ADR-037 review, 2026-08-23).** Rik builds this by running Claude
across many sessions, so wall-clock weeks are meaningless and have been removed. What
matters is **phase order and the dependency chain**, not dates. A phase is "done" when
its exit criteria pass, not when a week elapses.

---

## Phase 0 — Foundations and Document Mode

**The single most valuable phase, and after ADR-024 it is the whole public face of
the site.** Document Mode is now the default at `/`, so this phase ends with the
thing most visitors will ever see. Everything after it is upside.

Deliverables:
- **The hero header on `/`** (ADR-024): Rik's name, one line of identity, a living
  point-cloud element demonstrating Focus in miniature, and a prominent, unmissable
  "Enter the world" invitation above the fold. This is the *only* thing that gets
  anyone into World Mode, so it is a hard requirement rather than a flourish.
- Generated `/resume.pdf` from the Content Graph via Playwright's `page.pdf()`
  against a print stylesheet (ADR-026) — so the résumé can never contradict the
  site.
- Repo, Astro + TypeScript strict, ESLint with the engine-import and hex-literal
  rules, Vitest, Playwright, CI.
- `src/styles/tokens.css` — full palette and type scale. Self-hosted subset fonts.
- Content Graph schemas in `src/content/config.ts`, all collections, Zod
  validation wired into the build.
- Document Mode complete: index, roles, projects, education, contact,
  `/accessibility`, `/resume.pdf`.
- Preferences system (`src/a11y/prefs.ts`), all seven, persisted.
- Deployed to **Vercel** at **`rikmukh.online`** — both already exist (ADR-034). The
  repo is renamed and its history rewritten per ADR-034's plan.

Exit criteria:
- [ ] Document Mode Lighthouse Performance ≥ 98, Accessibility 100
- [ ] Document Mode client JS ≤ 5 KB gzipped
- [ ] axe-core: 0 violations on every Document Mode page
- [ ] Keyboard traversal reaches all content; focus visible everywhere
- [ ] Contrast check passes for every token pair in use
- [ ] Zod validation runs in CI and fails on malformed content
- [ ] Production build fails if any `placeholder: true` entry exists
- [ ] Live at the real domain
- [ ] `/resume.pdf` generates from the Content Graph and matches Document Mode
- [ ] **[R]** Rik has supplied content items 1–7 and 9 (`07-CONTENT-INVENTORY.md`)
- [ ] **[R]** Rik approves Document Mode's look and copy
- [ ] **[R]** Rik confirms the hero and the "Enter the world" invitation are
      genuinely enticing. **The load-bearing criterion of this phase** — if the
      invitation is weak, six months of World Mode goes unseen (ADR-024).

Blocked on Rik: content 1–9. **This blocks the whole project** — build the
schemas, pages, and placeholders regardless, and ship the moment content lands.

---

## Phase 1 — The Focus engine and the baking pipeline

The technical heart. Everything visual depends on it.

Deliverables:
- `tools/bake/` — Blender export → surface sampling → position/colour float
  textures + metadata, including an empirically-determined legibility floor per
  subject (ADR-012).
- `src/engine/particles/` — GPGPU simulation, point material, GLSL.
- `src/engine/focus/` — pure, headlessly testable Focus composition.
- `src/engine/spring.ts` — the one animation primitive.
- Determinism harness: seeded randomness app-side (`pure-rand` or `seedrandom`).
  **Time needs no engine-side work** — Playwright's Clock API controls it from the
  test side (ADR-026), so the engine uses `requestAnimationFrame` normally.
  **Build the seeding now; retrofitting is painful and without it later sessions
  are blind.**
- Device tier detection and adaptive point budget with hysteresis.

Ship: a standalone page with one baked subject that resolves from haze to form as
a slider drives Focus, plus the cursor-breathe interaction.

Exit criteria:
- [ ] 500k points at 60fps on the reference desktop; 60k at 30fps on mid mobile
- [ ] Zero per-frame allocation over 600 frames
- [ ] Focus unit tests cover all four inputs and the 0.90 cap
- [ ] Deterministic screenshots reproduce byte-identically across runs
- [ ] Tier stepping does not oscillate under a synthetic load sweep
- [ ] Baking CLI is documented and runs from a clean checkout
- [ ] **[R]** Rik confirms the resolve *feels* like the brain dump's description —
      glasses going on, not a crossfade. This is the aesthetic keystone of the
      project; if it is wrong, stop and fix it before Phase 2.

---

## Phase 2 — The Spine, Stations, and the accessible skeleton

Deliverables:
- `src/engine/spine/` — Catmull-Rom curve, arc-length parameterization, camera
  controller with separate look-target curve.
- `src/engine/input/` — all inputs → one damped `dt`; per-Station `scrollGain`.
- Free look with clamps; zero roll.
- Station framework driven by the Content Graph; snapping with hysteresis.
- `src/a11y/DomMirror.astro` — the semantic mirror; live-region announcements.
- Station index UI, settings panel, `?` help panel (ADR-018), the `/world`
  transition (ADR-024).
- `reduced-motion` and `instant-travel` paths, complete.
- Acts 0 and 1: the Void and the Approach.

Ship: `/` opens on the Void, the Approach works, all seven preferences work, the
whole thing is keyboard- and screen-reader-navigable.

Exit criteria:
- [ ] `t` monotonic under monotonic input; no NaN; bounded velocity — fuzz tested
- [ ] Every Station keyboard-reachable in narrative order
- [ ] axe-core: 0 violations in World Mode at every Station
- [ ] Reduced-motion path performs zero camera translation (unit test on the
      controller)
- [ ] Derivation invariant enforced: a Station without content fails the build
- [ ] Flicker analysis passes at three traversal speeds
- [ ] Frame budgets hold at every Station
- [ ] Every Station's DOM mirror entry carries a **descriptive** sentence about its
      visual state, not just its name (ADR-025 — this replaces the audio metaphor as
      the translation for non-visual Witnesses)
- [ ] The `/world` transition renders real progress and is operable without WebGL
      (falls back to staying on `/`)
- [ ] **[R]** VoiceOver traversal of Void + Approach
- [ ] **[R]** Rik confirms the Void feels disorienting and the Approach is not
      held too long

---

## Phase 3 — The Corridor and The Name

Deliverables:
- Corridor geometry, blockout → baked; the single hard snap at `t ≈ 0.13`.
- Corridor narrative copy revealed across its length.
- The anamorphic `RIK` sculpture, legible only at `t = 0.26`, legible again
  mirror-reversed when looking back.
- Wider free-look clamp at Act 3.

Ship: Void → Approach → Corridor → Name. The site now has a beginning.

Exit criteria:
- [ ] `RIK` is unreadable outside `t = 0.26 ± 0.015` — verified by scripted
      screenshots at 40 positions
- [ ] The snap is the only hard-eased transition in the codebase (lint or audit)
- [ ] Text over particles always has a backing plate (visual audit test)
- [ ] All Phase 2 criteria still pass
- [ ] **[R]** Rik confirms the Corridor feels claustrophobic
- [ ] **[R]** Rik approves the Corridor copy (content #10)

---

## Phase 4 — The Figure and The Reach

The climax, built early and deliberately (ADR-010). The riskiest phase.

Deliberately built as a direct continuation of the Corridor, with the Market's
`t` range temporarily collapsed — so the site is a complete short story at the end
of this phase even though most content is missing.

Deliverables:
- The Figure: blockout, baked, with a permanent unresolved point fraction
  (ADR-006).
- Dejected → noticing → extended transition, proximity-driven and reversible.
- Hand tracking toward the pointer, stopping short.
- The Reach as a real `<button>`; pointer, touch, and `Enter` all work.
- Ember flood as a ≥800ms ramp, ≥2000ms under `photosensitive-safe`.
- The reframe line; contact information.

Ship: a complete, short, emotionally whole journey. **If the project stalls after
this phase, what is live is still a real thing.**

Exit criteria:
- [ ] The Figure never reaches Focus 1.0 — unit test
- [ ] `globalFocus(t) ≤ 0.90` for all `t < reachT` — unit test (Foreshadow F6)
- [ ] Ember flood ramp ≥ 800ms / ≥ 2000ms; flicker analysis passes
- [ ] The Reach is operable by keyboard alone and announced correctly
- [ ] No timer, prompt, or pulse anywhere near the Reach — code audit
- [ ] Backing away reverses the Figure's pose
- [ ] **[R]** Rik confirms the Reach lands emotionally **with the site silent**.
      Audio is descoped (ADR-025), so the climax must carry on visuals alone.
      **The gate for the whole project.** If it does not land, the thesis needs
      rework before more content is built on top of it.
- [ ] **[R]** Rik approves the reframe line (content #11)

---

## Phase 5 — The Wardens and the Mirrors

Deliverables:
- Warden figures: almost-human, unresolved faces, ring composition sized to the
  project count.
- Mirror surfaces reflecting the Witness's cursor at rest (Foreshadow F4).
- Project dioramas, rotatable.
- Alcove system: branch curves, `Escape` to return, exact `t` restoration.
- Document-Mode panels composited in the world's material language (ADR-014).

Ship: the portfolio is functionally complete — someone can now see the work.

Exit criteria:
- [ ] Every project in the Content Graph has a Mirror; no orphans either direction
- [ ] Every Mirror reachable and openable by keyboard; `Escape` always returns
- [ ] Alcove entry and exit restore `t` exactly — unit test
- [ ] Panel text is real selectable DOM, contrast-compliant over the world
- [ ] Mirrors show the Witness before any project loads — visual test
- [ ] Frame budgets hold with all Mirrors in frame
- [ ] **[R]** Rik approves project prose (content #14) and confirms immersion is
      not broken by the panels

---

## Phase 6 — The Market

The largest, warmest, most expensive phase. Where the Fun budget is spent.

Deliverables:
- The reveal at `t = 0.28`: Corridor walls resolve into stalls and scale explodes.
  Warmth arrives through density and light temperature only — there is no audio
  (ADR-025).
- One stall per role, driven by the Content Graph.
- Vendor figures with lines.
- Fun budget in full: pokeable wares, the stall selling nothing, the discounted
  failure, the point-cloud animal that loses interest.
- Side-street Alcoves for role depth.
- Density and light-temperature warmth without new hues.

Exit criteria:
- [ ] One stall per role, generated from content — no hardcoded stalls
- [ ] Every joke attached to a real content item — audit
- [ ] Market holds 60fps desktop / 30fps mobile at its tier point budgets
- [ ] On mobile, stall *count* reduces before point density does
- [ ] Every pokeable ware is keyboard-operable and Ember-marked
- [ ] The Ember rule holds: nothing decorative is Ember — token audit
- [ ] **[R]** Rik confirms the Market feels warm and funny rather than cluttered
- [ ] **[R]** Rik approves stall/vendor copy (content #12, #13)
- [ ] **[R]** Crowd-figures question resolved (`09-DECISIONS.md` open questions)

---

## Phase 7 — The Climb

Deliverables: stepped architecture, one tier per year/course cluster, thinning
density, cooling light, the global Focus dip to 0.85.

Exit criteria:
- [ ] Tiers generated from education content
- [ ] Focus dip present and asserted by test — it is Foreshadow F6, not a bug
- [ ] Density thins and light cools measurably across the Climb — the warmth drain
      is carried visually, since audio is descoped (ADR-025)
- [ ] **[R]** Rik confirms the tonal cool-down works

---

## ~~Phase 8 — Audio and score~~ · REMOVED

**Descoped by ADR-025.** No composed score, no commissioning, no licensed stems, no
entry-gate audio consent. Roughly four weeks are freed; spend them on the Market
(Phase 6) and on polish.

Phase numbering is left with a gap rather than renumbered, so that references
elsewhere in the documentation stay valid.

Procedural sound survives as **optional Phase 11**, after launch. **Nothing in the
site may depend on audio** — the site must be complete and excellent silent.

---

## Phase 9 — The Return and Second Sight

Deliverables: pull-back revealing the whole Spine lit; `RIK` legible from the new
angle; fade to a legible Void; the **ways onward** — document, résumé, email, walk it
again (ADR-045); `Second Sight` persistence and its five legibility changes (ADR-047).

Exit criteria:
- [ ] The ways onward fade in after the Return settles, with no modal, no timer, and
      no auto-redirect; `EMBER` appears only on the actionable items
- [ ] "Walk it again" resets `t` to 0 without clearing `Second Sight`
- [ ] Second Sight changes legibility only — no new content, nothing unlocked
- [ ] Clearing local storage restores the first-visit experience exactly
- [ ] The whole Spine is visible in one frame within the point budget
- [ ] **[R]** Rik confirms the loop closes — the final frame reads as the first
      frame, understood

---

## Phase 10 — Audit, hardening, launch

Deliverables: full manual accessibility pass; cross-browser and real-device
testing; final performance pass; `/accessibility` finalized and honest about gaps;
OG images; error and offline states; the definition-of-done checks in
`00-VISION.md`.

Exit criteria:
- [ ] Every automated check in `04-ACCESSIBILITY.md` and `06-PERFORMANCE.md`
      passes
- [ ] **[R]** VoiceOver (macOS + iOS) and NVDA full traversals signed off
- [ ] **[R]** Keyboard-only full journey signed off
- [ ] **[R]** Motion-sickness check by a susceptible person
- [ ] **[R]** Real mid-range Android device tested
- [ ] **[R]** All five `00-VISION.md` definition-of-done conditions confirmed

---

## Phase 11 — Procedural sound · OPTIONAL, post-launch

**Assume this never happens.** ADR-025 requires the site to be complete and
excellent without it. If it does happen, it is a bonus, and it must not become a
reason to delay launch.

No audio assets, no licensing, no money, no external people. Roughly 3–5 days.

Deliverables: `tone`-based procedural layers only — a drone whose filter tracks
global Focus, procedural Market texture, and a small number of interaction sounds
(the hover field, a ware poke, one sustained tone at the Reach).

Exit criteria:
- [ ] Audio off means genuinely silent — no leaked nodes, no CPU cost
- [ ] No information is carried by sound alone
- [ ] Zero audio assets shipped; nothing added to the transfer budget beyond `tone`
- [ ] Removing the audio module entirely leaves every other test passing
- [ ] **[R]** Rik confirms it adds rather than distracts. If it distracts, delete it.

---

## Deliberately deferred

Not cut — parked, with no dependency on them anywhere.

- Crowd figures in the Market (pending an open question).
- Device-orientation free look on mobile.
- Any localization.
- A shareable "where I got to" deep link.
