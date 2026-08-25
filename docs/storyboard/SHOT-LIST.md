# Shot list — the written storyboard

> # ⚠️ KNOWN-STALE — DO NOT BUILD FROM THIS
>
> Every frame below is described in the **pre-ADR-033 abstract vocabulary**, before the
> project had a visual language. Specifically wrong as of 2026-08-19:
>
> - Frame 14 still says "Mayan pyramid crossed with colosseum." It is now **a stepwell,
>   ascended** (ADR-033).
> - No frame mentions the vaulted bazaar arcade, jali screens, the souk, temple niches,
>   or the **unfinished rock-cut** Figure.
> - Frame `t` values follow ADR-016 and are current; the *forms* are not.
>
> **Re-theming is on hold at Rik's instruction** until the visual language and story are
> locked. Do not author blockouts from this file, and do not re-theme it yet either.
> Frames 05, 06, 09, 11, 13, and 18 remain the six worth drawing once it is refreshed.

> Purpose: give Rik something to draw *against* instead of a blank page, and give
> the orchestrator a frame-level reference for what each Station must look like.
>
> Eighteen frames. `t` values follow the rebalanced allocation in ADR-016.
>
> **Workflow:** Rik produces one image per frame (drawn, or a sourced reference
> photo/film still, or both) and drops it in `docs/storyboard/frames/` as
> `NN-slug.{png,jpg}`. Notes go in `docs/storyboard/NOTES.md`. Once a frame has an
> image, it becomes canonical for that Station and overrides prose descriptions
> anywhere in `docs/`.

## How to do this (see also §Tools)

The purpose of a storyboard here is **pacing and composition**, not beauty.
Stick-figure quality is fine and often better — a rough frame invites change, a
polished one gets defended.

For each frame, decide only three things:
1. **Where the camera is** relative to the subject — low, high, level, close, far.
2. **What fills the frame** — and what is deliberately empty.
3. **Where the eye goes first.**

---

## Act 0 — The Void

### Frame 01 — First frame after the gate
- `t` 0.000 · Focus 0.02
- Almost entirely `VOID`. Perhaps forty `HAZE` points, unevenly scattered, no
  cluster reading as an object. Grain-of-dust scale.
- No horizon. No floor. Nothing establishing up or scale.
- Camera level, static.
- **Eye goes to:** nothing in particular. That is the point — mild unease.
- **Decision needed:** are the points evenly spread, or is there already a faint
  density gradient toward the distant light?

### Frame 02 — The smudge
- `t` 0.03 · Focus 0.05
- Same emptiness, but far off-centre there is a **suggestion** of light — not a
  shape, not a glow with edges. A region marginally less black.
- Camera has drifted forward almost imperceptibly.
- **Eye goes to:** the smudge. First moment of direction existing.
- **Decision needed:** dead centre, or off to one side so the camera has to turn?
  Off-centre is more interesting and costs a look-target curve.

---

## Act 1 — The Approach

### Frame 03 — Differentiation
- `t` 0.08 · Focus 0.20
- The haze now has structure without form. Regions of density. Points with visible
  parallax against each other, so depth is legible for the first time.
- The smudge has become a volume — light with extent, still no edges.
- **Eye goes to:** the depth. The realisation that this is a space.
- **Decision needed:** is there a sense of a *floor* yet? Recommend not yet.

### Frame 04 — Enclosure sensed
- `t` 0.12 · Focus 0.33
- Density above and to both sides; sparseness directly ahead. The Witness should
  feel walls before seeing them.
- Still nothing identifiable.
- **Eye goes to:** the gap ahead. The only way through.

---

## Act 2 — The Corridor

### Frame 05 — Mid-snap
- `t` 0.13 · Focus 0.33 → 0.75 in progress
- **The most important frame in the first half.** Caught partway through the only
  hard snap in the site. Some points already home, some still streaking toward
  position. Motion-blurred trails of intent.
- **Eye goes to:** everywhere at once. Physical relief.
- **Decision needed:** does everything snap simultaneously, or does it resolve
  front-to-back like focus racking? Front-to-back is more beautiful and more
  expensive.

### Frame 06 — The Corridor revealed
- `t` 0.16 · Focus 0.75
- Narrow. Walls close enough to feel — maybe three metres apart. Tall enough that
  the ceiling is not visible. Cold. Absolutely nothing decorative.
- Light from far ahead only. The Witness's own position is unlit.
- **Eye goes to:** straight down the corridor. Forced perspective.
- **Feeling:** mildly claustrophobic, slightly unwelcome. A held breath.
- **Decision needed [R]:** how narrow? This is the frame to draw at three widths.

### Frame 07 — First words
- `t` 0.20 · Focus 0.75
- Same corridor. The first line of text, `DUST` on `VOID`, set in Instrument Serif,
  on a solid backing plate so it is unambiguously readable.
- **Eye goes to:** the text.
- **Decision needed:** is the text floating in space, or on a wall surface? Floating
  is cleaner and easier to make legible; on-surface is more diegetic.

---

## Act 3 — The Name

### Frame 08 — Debris
- `t` 0.245 · Focus 0.75
- A large mass of points ahead, clearly deliberate but reading as nothing. Abstract
  hanging debris filling much of the corridor.
- **Eye goes to:** the mass, with mild confusion.

### Frame 09 — RIK resolves
- `t` 0.26 (the anamorphic sweet spot) · Focus 0.75
- The debris is `RIK` — three enormous letterforms filling the frame, the gap
  between **I** and **K** directly ahead as the way through.
- **Eye goes to:** the letters, then the gap.
- **The title card.** This is the site's key art.
- **Decision needed:** how enormous? Recommend the letters exceed the frame so the
  Witness cannot see all three at once without looking around.

### Frame 10 — Looking back
- `t` 0.275, camera turned 180° · Focus 0.75
- `RIK` from behind, mirror-reversed but legible. The corridor beyond it recedes
  into the haze the Witness came from.
- **Eye goes to:** the reversed letters. First moment of "that was for me."

---

## Act 4 — The Market

### Frame 11 — The reveal
- `t` 0.28 · Focus 0.75 → 0.90
- **The second most important frame in the site.** The corridor walls resolving
  into stalls. Mid-transformation: still readable as walls, already readable as
  structures with awnings, counters, wares.
- Scale exploding outward and upward. Warm light appearing at counter height.
- **Eye goes to:** outward, in every direction. This is the frame that should make
  someone say *oh*.
- **Decision needed [R]:** does the ceiling disappear entirely (open sky) or lift
  to a great height? Open sky is a bigger gasp; a high vault keeps the enclosure
  motif and is cheaper.

### Frame 12 — The market street
- `t` 0.36 · Focus 0.90
- Full market. Dense, layered, irregular. Anchor stalls along the main street,
  smaller stalls behind, background stalls beyond those. Vendors as point figures.
  Warm light at counter height, cool above.
- Side streets visible as Alcove openings.
- **Eye goes to:** the nearest stall, then down the street.
- **Feeling:** alive, warm, slightly overwhelming, funny.
- **Decision needed [R]:** people or no people (`09-DECISIONS.md` open question).

### Frame 13 — One stall, close
- `t` 0.42 · Focus 0.90
- A single anchor stall filling most of the frame. Awning with a point-cloud glyph
  for the organisation. Mono label on the counter for the role title. Three or four
  wares on the counter, one carrying `EMBER`. Vendor behind, tools hanging.
- **Eye goes to:** the Ember ware.
- **This frame defines how work history is rendered.** Worth drawing carefully.

---

## Act 5 — The Climb

### Frame 14 — The steps
- `t` 0.66 · Focus 0.87
- Market thinning behind and below. Ahead, wide stepped architecture ascending out
  of frame — Mayan pyramid crossed with colosseum. Each tier a band with a mono
  year label.
- Light cooling and falling off with height. Density thinning and becoming regular.
- **Eye goes to:** upward, along the steps.
- **Feeling:** effort, cooling, the warmth draining away.

---

## Act 6 — The Wardens

### Frame 15 — The plateau
- `t` 0.74 · Focus 0.87
- Arriving on the upper plateau. A ring of Wardens, each holding a Mirror. Almost
  human — proportions slightly wrong, faces unresolved. Sparse, precise placement.
  Very still.
- **Beyond and above them, the Figure is already visible** — small, distant, head
  down.
- **Eye goes to:** the Wardens, then past them to the Figure.
- **Decision needed:** how many Wardens? One per project. Composition depends on
  the count (`09-DECISIONS.md` open question).

### Frame 16 — A Mirror
- `t` 0.78 · Focus 0.87
- One Mirror filling much of the frame. At rest it shows a faint point-cloud
  reflection **of the Witness's own cursor position** (Foreshadow F4). Beginning to
  resolve into a project diorama as it is approached.
- **Eye goes to:** the reflection. The uncanny half-second of recognition.

---

## Act 7 — The Figure

### Frame 17 — Dejected, at distance
- `t` 0.86 · Focus 0.87
- The Figure atop its platform, seen from below and far away — small in frame, with
  a great deal of empty space around and above it. Head down, shoulders forward,
  one hand slack across a knee.
- Lit from below and behind: largely silhouette. A visible fraction of its points
  drifting loose, unresolved.
- **Eye goes to:** the Figure, because everything else is empty.
- **Feeling:** it does not know anyone is coming.

### Frame 18 — The Reach
- `t` 0.94 · Focus 0.90, about to become 1.00
- Close. The Figure's extended hand large in frame, `EMBER`, the brightest thing in
  the scene. The gap between its fingertips and the Witness's cursor still open.
  The Figure's head is up. The pose is lazy, resting, not straining.
- Everything else in frame is dark and empty.
- **Eye goes to:** the gap.
- **Feeling:** the whole site, arriving at once.
- **This is the frame the site exists to produce.** Draw it more than once.

---

## Tools

Ranked by how useful each is for this project specifically.

1. **Paper or iPad, by hand.** Fastest, and roughness is a feature. Photograph and
   drop into `frames/`. Index cards are even better for Act-level reordering, which
   is the main thing a storyboard is for.
2. **A reference board of real images** — film stills, game screenshots,
   photographs of markets and cathedrals and empty spaces. For *lighting and
   density* this communicates far more than a drawing can, and it is much faster.
   Milanote, FigJam, or a folder of images all work. **Do this one even if nothing
   else gets done.**
3. **Excalidraw** — free, fast, and `.excalidraw` files are JSON, so they version
   in git cleanly. Best option if drawing on a computer.
4. **Blender blockouts as a 3D storyboard.** Heavier, but the blockouts are
   *required anyway* under ADR-012, so time spent here is not spent twice. Set up
   a camera, place grey boxes, render eighteen stills. This is the highest-value
   option if the Blender learning curve is acceptable — it produces genuine
   compositions with real perspective and doubles as the asset source.
5. **AI image generation** — useful for mood and lighting exploration, risky for
   composition. It will produce beautiful frames that are not implementable and
   then those frames become the expectation. If used, label the folder
   `frames/mood/` and keep it separate from canonical frames.

Recommended combination: **reference board (2) for every act, plus hand frames (1)
for the six starred decisions**, which are frames 05, 06, 09, 11, 13, and 18.
