# Accessibility specification

> Prerequisites: `10-GLOSSARY.md`, `02-EXPERIENCE-SPEC.md`.
>
> A specification with acceptance criteria, not a checklist. Accessibility is a core
> value here, so a failure in this document is a bug of the same severity as a crash.
> Struck text = rejected-but-kept (`AGENTS.md` conventions); not the spec.

## Stance

Three honest statements that shape everything below.

**You cannot make a mesmerizing particle journey accessible by adding alt text.**
An animated 3D scene has no formal WCAG success criteria for most of what it does.
Pretending otherwise produces theatre.

**But you can achieve genuine parity structurally.** Because the Content Graph is
the single source of truth and Document Mode is derived from it (ADR-003), *there
is nothing in the world that is not also in a semantic document.* Parity is
guaranteed by architecture rather than by effort. That is the whole reason ADR-003
matters.

**And since ADR-024, the accessible rendering is the default.** Document Mode is
served at `/`. It is not something a visitor is routed to after detection — it is
what everyone gets first, and World Mode is always a deliberate choice. This is a
materially stronger position than the original design held, and it makes most of the
old detection logic unnecessary.

Target: **WCAG 2.2 Level AA**, plus the additional commitments below, which go
beyond it.

## Modes

Two renderers, and six orthogonal preferences that apply to both.

| Preference | Default | Detected from |
|---|---|---|
| `reduced-motion` | off | `prefers-reduced-motion: reduce` |
| `high-contrast` | off | `prefers-contrast: more`, `forced-colors` |
| `photosensitive-safe` | off | manual only |
| `dyslexia-spacing` | off | manual only |
| `instant-travel` | off | manual only |
| `native-scroll` | off | manual only — disables Lenis smoothing/virtual scroll (ADR-040) |
| `audio` | off | manual only — and it controls nothing until optional Phase 11 exists (ADR-025). ~~entry gate choice~~ **[no entry gate exists — ADR-024]** |

All persist to `localStorage`. All are reachable from a single always-available
settings control, in both renderers, in under two interactions — and they are
**summarised upfront** on the `/` hero and in the `?` help panel (ADR-018), so nobody
discovers a mode after struggling without it.

### The invitation into World Mode

Revised by ADR-024. Document Mode is already the default, so there is nothing to
route. What remains is how the **"Enter the world"** invitation behaves:

- **WebGL2 unavailable or context creation fails** → the invitation is hidden, or
  shown with a plain explanation. The Witness stays on `/` and loses nothing.
- **`prefers-reduced-motion: reduce`** → the invitation is de-emphasised but still
  offered, because World Mode has a genuine reduced-motion path. Never removed on
  the Witness's behalf.
- **`navigator.connection.saveData`, or the device fails the low tier check** in
  `06-PERFORMANCE.md` → the invitation carries a size/performance warning.
- **No automatic redirection to `/world`, ever**, including for returning visitors.

Never a dead end, never a scold, never a "your browser is not supported" page.

~~Document Mode is served automatically, with a visible offer to enter World Mode
anyway, when any of: `prefers-reduced-motion: reduce` is set; WebGL2 is unavailable;
`saveData` is true; the device fails the low tier check; `?view=doc` is present or
the Witness previously chose Document Mode.~~
**[Superseded by ADR-024 — Document Mode is the default at `/`, so there is no
routing decision to make and no `?view=doc` parameter.]**

## Keyboard

- **Every** Station, Alcove, Mirror, and the Reach is reachable and operable by
  keyboard alone.
- Full key map in `02-EXPERIENCE-SPEC.md` §2. `Escape` always exits an Alcove and
  returns to the Spine.
- **The full key map is discoverable upfront** — on the `/` hero and in the `?` help
  panel, generated from the actual bindings rather than hand-maintained (ADR-018).
- Visible focus indicator on every focusable element: 2px `EMBER` outline with
  2px offset, and never `outline: none`.
- Logical tab order matching document order. Zero keyboard traps.
- Skip link to main content as the first focusable element.
- No key binding conflicts with assistive technology or browser shortcuts.
- No interaction requires dragging, precise pointing, timing, or multi-touch.
  WCAG 2.5.7 and 2.5.8 compliance: every drag has a click/key equivalent, every
  target is ≥ 24×24 CSS px.
- The ambient cursor field (ADR-017) is **ambient only** — nothing depends on it, so
  its absence for keyboard-only Witnesses costs no functionality.

## Screen readers

World Mode maintains a **live DOM mirror**. This is not a summary of the world —
it is the same content, in reading order.

- Each Station is a real `<section>` with `aria-labelledby` pointing at a real
  heading, in narrative order in the DOM.
- The canvas is `aria-hidden="true"`. It carries no information not present in the
  mirror.
- Camera arrival at a Station announces the Station name via a polite live region.
  Never assertive — that interrupts.
- The Reach is a real `<button>` with an accessible name, not a canvas hit test.
- Mirrors are real links to Alcove content.
- Headings form a correct, unbroken hierarchy. Landmarks: `banner`, `main`,
  `navigation`, `contentinfo`.
- Decorative particle counts, `t` values, and Focus scalars are never announced.

**Tooling boundary (ADR-026).** `@react-three/a11y` supplies per-object roles
(`content` / `button` / `togglebutton` / `link`), tab traversal, `aria-pressed`, alt
text, and `<A11yAnnouncer/>` for the polite live region — adopt it for the Mirrors,
the wares, and the Reach. **It does not replace the DOM mirror.** Its own
documentation describes focus as *emulated* at the React component level, and the
requirements above demand real DOM elements in narrative order. `a11y/DomMirror`
stays bespoke. Recorded explicitly so no future session assumes this is solved.

### The Focus metaphor for non-visual Witnesses

An earlier plan to convey the resolving-into-clarity arc through a Focus-driven audio
filter was retracted (ADR-025): background audio degrades screen-reader speech, and audio
is descoped anyway.

**What serves non-visual Witnesses instead:** every Station's DOM mirror entry carries a
*descriptive* sentence about its visual state, not merely its name — e.g. *"The corridor:
narrow and tall, the points now resolved into close walls, light far ahead."* This works
*with* a screen reader, costs nothing, and ships from Phase 2. `a11y.description` is a
required field on every Station (`02-EXPERIENCE-SPEC.md` §7); CI fails if any is empty.

**Writing these descriptions well is the highest-value accessibility work in the
project** — they are the only channel through which the site's atmosphere reaches someone
who cannot see it, so they get the same care as the narrative copy.

Audio is descoped to optional post-launch procedural sound (ADR-025). **No
accessibility criterion may depend on it.**

## Photosensitivity

The most dangerous surface in this project. Particle fields make accidental
luminance flicker very easy to create.

**Hard constraints, non-negotiable:**

- No luminance change exceeding **3 flashes per second** anywhere, at any time,
  under any input.
- No full-screen luminance change greater than 10% within 100ms.
- **The Reach's Ember flood is a ramp of ≥800ms**, and ≥2000ms under
  `photosensitive-safe`. It is never a flash. (`01-NARRATIVE.md`, Act 7.)
- Particle jitter is low-frequency by construction; amplitude halves under
  `photosensitive-safe`.
- **The cursor displacement field's chromatic separation is removed** under
  `photosensitive-safe` (ADR-017).
- No strobing, no rapid alternation, no high-contrast oscillating patterns.
- **Moiré from layered perforated screens** (ADR-036). The visual language's signature
  form is a perforated stone screen, and a point cloud sampling a perforated pattern is
  a double sampling — the textbook moiré setup. Slide two or three in depth with the
  ambient parallax layer and interference shimmer becomes likely, which can produce
  luminance oscillation as well as visual discomfort. Cap layer stacking, resolve
  distant screens toward solid, constrain screen frequency against point spacing at the
  current tier, and **halve parallax amplitude on layered screens under
  `photosensitive-safe`.**

**This must be verified programmatically, not by eye.** See §Verification — a
bespoke FFT check in CI, plus PEAT as an independent manual cross-check.

## Vestibular safety and motion sickness

- **Zero camera roll, ever.** The largest single contributor to browser
  simulator sickness.
- FOV clamped ≤ 60°, never animated during travel.
- Free look clamped per `02-EXPERIENCE-SPEC.md` §4.
- No involuntary camera movement — the Witness always causes motion.
- **No parallax on text.** The ambient depth parallax (ADR-017) applies to the
  world's points only, never to type or UI. Under `reduced-motion` it is off
  entirely.
- `instant-travel` mode removes continuous camera movement entirely.
- Under `reduced-motion`, the camera does not translate at all; Stations
  cross-fade and Focus becomes opacity-only.

## Cognitive accessibility

- **Nothing is timed.** No auto-advance, no countdowns, no disappearing content,
  no session expiry. Everything is re-readable indefinitely. The Figure waits
  forever (`01-NARRATIVE.md`, Act 7) — which is a narrative requirement *and* a
  cognitive accessibility one.
- Only five interaction verbs across the entire site
  (`02-EXPERIENCE-SPEC.md` §6), taught by consistency rather than instruction. The
  ambient response layer adds no verb and demands nothing.
- **Controls and modes are stated upfront** (ADR-018), plus once-only first-use hints
  for free look and the hover field. Nobody should struggle and only later discover
  an easier way.
- Progress along the Spine is always visible and always seekable.
- Plain-language content exists for everything, in Document Mode — which is now the
  default, so the plain version is what a visitor meets first.
- No idioms or metaphors carry required information — the story is metaphorical,
  the *content* is literal.
- A visible, always-available "where am I / where can I go" Station index.

## Colour and contrast

- Body text ≥ 4.5:1; large text and UI ≥ 3:1. Actuals in
  `03-ART-DIRECTION.md`.
- Hue carries no information anywhere.
- Under `high-contrast`, the Focus floor rises to 0.5 so no content is ever
  near-invisible, and text gains solid backing plates.
- Respects `forced-colors` mode: World Mode is not attempted there; Document Mode
  uses system colours.
- Legible at 200% zoom and at 400% with reflow, per WCAG 1.4.10.

## Forms and contact

- Real `<label>` elements, never placeholder-as-label.
- Errors identified in text, adjacent to the field, and announced.
- No CAPTCHA. If spam protection is needed, use a honeypot or rate limiting.
- Email address is always available as plain selectable text as well.

## Accessibility statement

A real, public, linked page — `/accessibility` — stating: what has been done, the
target standard, the known gaps, which mode to use for which need, and how to
report a problem. **Honest about limitations.** This is rare, it is genuinely
useful, and it is the most on-brand page on the site.

It should say plainly that the site's default is the document, that World Mode is an
optional experience, and that no content exists only inside World Mode.

## Verification

### Automated, in CI, blocking

| Check | Tool | Threshold |
|---|---|---|
| axe-core, Document Mode, every page | `@axe-core/playwright` | 0 violations |
| axe-core, World Mode, every Station | `@axe-core/playwright` | 0 violations |
| Keyboard traversal reaches every Station and Mirror | Playwright | 100% |
| Focus visible on every focusable element | Playwright + `toHaveScreenshot()` | 100% |
| Contrast of every token pair in use | `culori` script over `tokens.css` | AA min |
| No hex literal outside `tokens.css` | `stylelint` `color-no-hex` + lint rule | 0 |
| Luminance flicker analysis | frame sampling over scripted traversals, FFT for >3Hz components | 0 violations |
| Moiré: layered-screen traversal at several parallax speeds | same FFT harness, dedicated case (ADR-036) | 0 violations |
| Global Focus ≤ 0.90 before the Reach | unit test | pass |
| Every Station has a non-empty `a11y.description` | build-time Zod validation | pass |
| Derivation invariant: every Station has content | build-time Zod validation | pass |
| Reduced-motion path performs no camera translation | unit test on the camera controller | pass |
| Reduced-motion path disables ambient parallax | unit test | pass |
| Every key binding appears in the help panel | Playwright | pass |
| Removing the audio module breaks nothing | test-suite run with module absent | pass |
| Heading hierarchy unbroken | Playwright | pass |
| 200% zoom, no horizontal scroll | Playwright viewport test | pass |
| `/` remains under the 5 KB JS budget | build output size check | pass |

The flicker analysis is unusual and worth building properly: script a traversal at
several speeds, sample frame luminance, FFT it, and fail on any component above
3Hz with meaningful amplitude. Time is controlled by Playwright's Clock API
(ADR-026), which makes traversals deterministic without an engine-side clock.

### Manual, requires Rik or a real person

Flag as `BLOCKED: needs review`; never mark these done from a build session.

- VoiceOver (macOS + iOS) full traversal.
- NVDA (Windows) full traversal.
- Keyboard-only journey, start to Reach, no pointer.
- Colour-blindness simulation across all three types.
- Motion-sickness check by an actual susceptible person.
- Cognitive-load review: is the world learnable without instructions?
- **PEAT cross-check** (ADR-026). Free photosensitivity analysis from the Trace
  Center, testing WCAG general-flash and red-flash thresholds. Constraints:
  **Windows-only** (Rik is on macOS — needs a VM or another machine), requires `.AVI`
  conversion, its capture function is unreliable so record elsewhere and import, and
  hardware acceleration must be disabled when recording. Not viable in CI, which is
  why the bespoke FFT check stays. Its value is being an **independent second
  opinion** on the most dangerous part of the design.

## Definition of done

1. The full journey is completable with a keyboard alone.
2. The full journey is completable with a screen reader alone, and every Station's
   visual state is conveyed by its `a11y.description`.
   ~~and the Focus arc is perceptible through audio.~~
   **[Retracted — see §Screen readers. Audio is descoped and no criterion may
   depend on it.]**
3. Every automated check above passes in CI.
4. Both manual screen-reader passes are signed off by Rik.
5. The PEAT cross-check has been run, or its absence is recorded in the
   accessibility statement as a known gap.
6. `/accessibility` is published, accurate, and honest about its gaps.
7. No preference combination produces a broken or unusable state.
