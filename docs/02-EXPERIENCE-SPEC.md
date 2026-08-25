# Experience specification

> Prerequisites: `10-GLOSSARY.md`, `01-NARRATIVE.md`. The behavioural contract; numbers
> are implementable defaults unless flagged as guesses. Struck text = rejected-but-kept
> (`AGENTS.md` conventions); not the spec.

## 1. The Spine

A single Catmull-Rom curve through world space, authored as an ordered list of
control points in the Content Graph.

- Position: `spine.positionAt(t)`, `t ∈ [0, 1]`
- Orientation: a separate look-target curve, so the camera can look at something
  other than its direction of travel. Required for the Figure being visible from
  Act 6, and for looking back at `RIK`.
- Arc-length parameterized on load, so that equal scroll produces equal apparent
  distance regardless of control-point spacing. Without this, pacing drifts
  wherever the curve bends.
- **There is exactly one Spine.** Alcoves are separate short curves that branch
  and rejoin at a single `t`.

## 2. Input → `t`

**`lenis` owns this layer** (ADR-019). It wraps native scroll rather than replacing
it, so `position: sticky`, anchors, and browser accessibility behaviour keep
working — which means the "never hijack scroll semantics" rule below holds *by
construction* rather than by discipline. Its `virtual-scroll` event exposes
`{deltaX, deltaY, event}` before smoothing, and that is the hook for per-Station
`scrollGain`. `lenis.progress` maps onto `t`.

~~All inputs map to a single signed scalar `dt` accumulated into a velocity, then
integrated with damping. One code path, so every input feels identical.~~
**[Superseded by ADR-019 — Lenis provides the accumulation, damping, and
cross-browser normalization. Do not hand-roll this.]**

| Input | Mapping |
|---|---|
| Wheel / trackpad | Lenis, tuned via `wheelMultiplier` · ~~`deltaY` → `dt`, normalized across browsers~~ **[Lenis normalizes]** |
| Touch drag (vertical) | Lenis, tuned via `touchMultiplier` and `touchInertiaExponent` · ~~drag distance → `dt`, with flick momentum~~ **[Lenis provides momentum]** |
| `ArrowDown` / `ArrowUp` | ±1 impulse, held → continuous |
| `PageDown` / `PageUp` / `Space` | jump to next / previous Station |
| `Home` / `End` | `t = 0` / `t = 1` |
| Station nav UI | direct seek to Station `t` |
| Screen-reader next-section | direct seek to Station `t` |

Rules:

- **Never hijack scroll semantics.** A wheel-down always moves forward. No
  horizontal scroll. No inverted axes. No scroll-jacking that traps the Witness.
- Smoothing via Lenis `lerp` / `duration` / `easing`. ~~Velocity is spring-damped:
  `stiffness 120`, `damping 22` as a starting point.~~ **[Superseded — Lenis owns
  smoothing. Springs remain the primitive for everything else.]**
- **`respectReducedMotion` defaults to `true`** in Lenis, forcing lerp to 1 and
  making programmatic scrolls instant. Part of `04-ACCESSIBILITY.md` for free.
- Lenis must be driven from the R3F render loop via `lenis.raf(time)`. Do not use
  `autoRaf` — R3F owns the loop.
- **Non-linear response by act.** `scrollGain` per Station, from the Content Graph,
  never hardcoded. Current values (ADR-016): Void `0.35`, Approach `1.0`, Corridor
  `1.0`, Name `1.0`, Market `0.7`, Climb `0.9`, Wardens `0.8`, Reach `0.5`, Return
  `1.0`. ~~The Void applies a ~0.25 multiplier; the Market applies ~0.7; the
  Approach and Return run at 1.0.~~ **[Values revised by ADR-016.]**
- **`t`-span is not time.** Perceived duration is roughly `tSpan / scrollGain`, so
  `scrollGain` is the real pacing instrument.
- Soft clamping at both ends with a rubber-band feel. Never a hard wall.

### 2a. Responsiveness is decoupled from travel (ADR-022)

The Void's low `scrollGain` means the first several hundred pixels of scroll produce
almost no visible travel. Left alone that reads as *broken*, which is a far larger
bounce risk than a missing hint.

Therefore, on the **first** scroll input at `t ≈ 0`: points surge, brighten, and
drift toward the camera, and the distant smudge pulses once. **Feedback is
immediate; progress stays slow.** A test asserts a measurable visual delta within
100ms of the first scroll event.

The scroll hint itself still appears at 1.2s and is retained.

## 3. Station snapping

- Each Station declares a `focalT` and a snap radius.
- When velocity falls below a threshold within a snap radius, `t` eases to
  `focalT` over ~500ms.
- **Hysteresis is required** — a Witness slowly scrolling past must not be yanked
  backwards. Snap only engages when incoming velocity is below threshold, and
  disengages permanently for that Station once passed.
- Snapping is disabled entirely when `instant-travel` is on.
- Implementation note (ADR-019): the `lenis/snap` plugin exists but does not provide
  this hysteresis behaviour. **Keep the custom implementation**; read `lenis.velocity`
  and `lenis.isScrolling` to drive it.

## 4. Free look

- Pointer position offsets camera yaw and pitch from the Spine's authored
  orientation.
- Clamped: **±25° yaw, ±15° pitch.** Wider on the Return, so the Witness can look
  back at the whole Spine, and wider at Act 3 to look back at `RIK`.
- Spring-damped, returns toward centre when the pointer is idle >2s.
- **Zero roll, ever.** Camera roll is the single largest contributor to simulator
  sickness in browser 3D.
- FOV ≤ 60°. Never animate FOV during travel.
- Touch: free look via device orientation is **off by default**. It fights page
  scrolling and causes nausea. Offer it as a toggle only.
- Keyboard: `Shift` + arrows nudges free look, so it is not pointer-exclusive.

## 5. Focus — the core system

```
subjectFocus = clamp01(
    globalFocus(t)                       // authored curve, 01-NARRATIVE
  * proximityGain(distanceAlongSpine)    // nearer on the Spine ⇒ sharper
  * viewGain(angleFromViewCentre)        // F2: attention sharpens
  + cursorGain(screenDistanceToCursor)   // F1: the cursor reveals
)
```

Focus drives, in the particle shader:

| Channel | At Focus 0 | At Focus 1 |
|---|---|---|
| Position | authored position + random offset × `dispersionRadius` | exact authored position |
| Jitter | full amplitude, continuous | none |
| Opacity | ~0.12 | 1.0 |
| Point size | larger, softer | smaller, crisper |
| Colour | `HAZE` | `DUST` |

Constraints:

- `globalFocus(t)` **never exceeds 0.90 before the Reach.** This is Foreshadow F6
  and it is load-bearing, not a bug.
- The Figure's Focus is capped below 1.0 permanently (ADR-006).
- `viewGain` must be subtle — noticeable only in aggregate, never as a visible
  spotlight. Start at ±6% and tune. If a Witness consciously notices it early,
  it is too strong.

## 6. Interaction grammar

The site has exactly **five verbs**. Consistency is what makes an authored world
feel authored, and a sixth verb should be treated as a design failure until
proven otherwise.

1. **Approach reveals.** Moving along the Spine resolves what is ahead. Automatic.
2. **Look sharpens.** What is centred resolves slightly more. Automatic.
3. **Hover breathes.** Points near the cursor displace along the view normal and
   brighten, uncovering what is behind them. *This is the landonorris.com
   mechanic* and it is the site's signature tactile feel. Radius ~120px screen
   space, displacement eased, fully reversible.
4. **Ember means touchable.** If it can be interacted with, it carries `EMBER`.
   If it carries `EMBER`, it can be interacted with. No exceptions — this is what
   makes the world learnable without instructions.
5. **Reach commits.** Click, tap, or `Enter` on a focused target. Always
   reversible except the Reach itself.

### 6a. The ambient response layer (ADR-017)

Present **everywhere in the world, at all times**, independent of the five verbs:

1. **Cursor displacement field.** Radial displacement of nearby points in screen
   space, with brief chromatic separation at the leading edge and a decay of roughly
   300ms. This is the "finger dragged hard across a switched-off LCD" look —
   displaced liquid crystal blooming outward with colour fringing, settling back.
2. **Depth parallax.** Pointer movement offsets point layers differentially by
   depth, continuously and subtly, everywhere.

**This is not a sixth verb.** It is ambient — the world being alive and attentive,
not an affordance. **It carries no `EMBER` and never signals that something is
actionable.** The Ember rule is unchanged; preserving this distinction is what keeps
the world learnable.

It also strengthens the thesis: Foreshadows F1 and F2 establish that the world
responds to the Witness's attention, and making that response continuous and
physical means the site restates "you are the missing half" on every pointer move.

Degradation: under `reduced-motion`, parallax is off and displacement becomes
brightness-only. Under `photosensitive-safe`, no chromatic separation. **Touch
devices have no hover**, so the field triggers on tap and decays — mobile loses the
ambient layer and needs its own liveliness answer.

## 7. Station contract

Every Station, in both renderers, declares:

```ts
{
  id: string                    // stable, used in URLs and the DOM mirror
  act: number
  focalT: number
  tRange: [number, number]
  scrollGain: number            // pacing multiplier, §2
  content: ContentRef           // → Content Graph. REQUIRED. Build fails without it.
  camera: { lookTarget, freeLookClamp }
  interactions: Interaction[]
  a11y: {
    label: string
    headingLevel: number
    description: string         // REQUIRED. A sentence describing the VISUAL STATE,
                                // not just the name. This is the primary channel
                                // for non-visual Witnesses (ADR-025).
  }
  alcoves: Alcove[]
  // audio: { layers, gain }    ← REMOVED by ADR-025. Audio is descoped.
}
```

The `content` field is what enforces the derivation invariant (ADR-003).

`a11y.description` is not optional and not decorative. Example: *"The corridor:
narrow and tall, the points now resolved into close walls, light far ahead."*

## 8. Entry into World Mode

**Revised by ADR-024.** There is no separate entry gate. Document Mode at `/` is the
default, and its hero header carries what the gate used to: Rik's name, one line of
identity, a living point-cloud demonstrating Focus in miniature, and a prominent
**"Enter the world"** invitation above the fold.

Clicking it navigates to `/world` through a **thematic transition** — points
assembling into form — which covers WebGL context creation, shader compilation, and
first asset load, and doubles as the site's first demonstration of Focus.

Requirements:
- Real progress via drei's `useProgress`, never a fake bar.
- Warm every shader permutation before display (drei `Preload`), so nothing
  recompiles mid-journey.
- If WebGL2 is unavailable, the invitation is hidden or carries a warning and the
  Witness stays on `/`. Never a dead end, never a "browser not supported" page.
- **No automatic redirection to `/world`, ever**, including for returning visitors.
  It would break crawlers and break the promise the default makes.

~~One screen before the Void, which does three jobs at once: offers sound on or off
(ADR-009); covers WebGL context creation, shader compilation, and first asset load;
offers Document Mode prominently, before any commitment. `Enter` proceeds;
skippable, and the choice is remembered.~~
**[Superseded by ADR-024 (no separate screen — merged into the Document Mode hero)
and ADR-025 (no audio consent, because audio is descoped).]**

## 9. Controls and help (ADR-018)

Discovering an accessibility feature *after* struggling is worse than not having it.
Three layers:

1. **On the `/` hero:** a compact, visible summary of movement controls and the
   available accessibility modes. Not behind a link.
2. **A help panel** on `?` and on a persistent visible button, listing every control
   and every preference with its current state. Reachable from anywhere on the
   Spine without leaving it.
3. **First-use hints**, shown once each and then never again, for the two
   non-obvious mechanics: free look, and the hover field.

The controls list is **generated from the actual key map**, not hand-maintained. A
test asserts every binding registered in the input layer appears in the help panel.

Same principle as the Figure never demanding the Reach: the site should never make
someone feel they got it wrong.

## 10. Modes and their effect on the experience

Detailed in `04-ACCESSIBILITY.md`; behavioural summary:

| Mode | Effect on World Mode |
|---|---|
| `reduced-motion` | No camera translation at all. Station-to-station cross-fades. Focus transitions become opacity-only — no positional dispersion. Hover breathe disabled. Ambient parallax off; cursor field becomes brightness-only. |
| `instant-travel` | Station nav only, no continuous scrolling. Snapping off. |
| `native-scroll` | Lenis smoothing and virtual scroll off; `t` maps to native scroll position (ADR-040). First-scroll feedback (§2a) still fires — that is responsiveness, not smoothing. For users who dislike scroll-hijacking without wanting full `reduced-motion`. |
| `photosensitive-safe` | Ember flood becomes a slow ~2s ramp. Particle jitter amplitude halved. No chromatic separation on the cursor field. All luminance change capped well under 3Hz. |
| `high-contrast` | Focus floor raised to 0.5 so nothing is ever near-invisible. Text gains a solid backing. |
| `audio` | Off by default and controls nothing until optional Phase 11 exists. ~~`audio-off`: Silent. Focus-driven low-pass metaphor is unavailable, so the visual Focus curve is unchanged.~~ **[Superseded by ADR-025 — audio is descoped; nothing may depend on it.]** |

## 11. Verification — what a build session can and cannot check itself

This matters because sessions run in a loop without eyes. Do not conflate these.

**Self-verifiable, and therefore required in CI:**

- `t` is monotonic under monotonic input; no NaN; no unbounded velocity.
- Every Station is reachable by keyboard alone, in order.
- Every Station has a Content Graph entry (derivation invariant).
- Every Station has a non-empty `a11y.description`.
- `globalFocus(t) ≤ 0.90` for all `t < reachT`.
- A visual delta occurs within 100ms of the first scroll event at `t = 0` (ADR-022).
- Every input-layer key binding appears in the help panel (ADR-018).
- No luminance transition exceeds the 3Hz cap.
- Frame-time budgets per `06-PERFORMANCE.md`.
- axe-core reports zero violations in both renderers.
- Removing the audio module leaves every other test passing (ADR-025).
- Deterministic screenshots at every Station's `focalT`, committed as artifacts.
  Time is controlled by Playwright's Clock API, so the engine needs **no injectable
  clock** (ADR-026); only seeded randomness is required app-side.

**Requires Rik. Flag as `BLOCKED: needs review` and stop the thread — never
guess, and never report as done:**

- Whether the `/` hero and the "Enter the world" invitation are genuinely enticing.
  **The load-bearing judgement of the whole project** — they are the only path into
  World Mode (ADR-024).
- Whether the Corridor feels claustrophobic.
- Whether the Market feels warm and funny rather than cluttered.
- Whether the Reach lands emotionally **with the site silent**.
- Whether `viewGain` is too strong.
- Whether the Approach is held too long.
- Whether the ambient cursor field reads as alive or as noise.
- Any judgement containing the words "feels," "reads as," or "lands."

See `11-AGENT-PROTOCOL.md`.
