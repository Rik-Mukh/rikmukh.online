# PRD-000 — The website

**Status:** ✅ **APPROVED by Rik, 2026-08-26** · **Owner:** Rik · **Written:** 2026-08-25 ·
**Covers:** the finished site, all phases, excluding optional Phase 11

> Approved means the requirements and their acceptance criteria are now the contract.
> Changing a requirement, or moving an INSTRUMENTED threshold, needs an ADR. Adding a
> requirement is an append with a new ID. **Never renumber, never silently reword.**

---

## 0. How to read this

This document describes **the website as a visitor will experience it when it is
finished.** It works backwards from that, and it is the one place to look for *what must
be true* and *how we will know*.

**What it is not.** It is not the reasoning (`09-DECISIONS.md`), not the narrative
(`01-NARRATIVE.md`), not the architecture (`05-ARCHITECTURE.md`), and not the build order
(`08-ROADMAP.md`). It cites those; it does not restate them.

**The one rule that keeps this document from rotting:**

> **It states requirements. It never restates a tunable value.**

Caps, invariants, and budgets appear here, because those must not change. Curve values,
`t` ranges, colour hexes, timings, and point counts do **not** appear here — they live in
exactly one place (`tokens.css`, the Content Graph, or a named module) and this document
points at that place. If a number's wording would have to change when the implementation
changes, it does not belong here.

**Requirement IDs.** `FR-<AREA>-<nnn>` for behaviour, `NFR-<AREA>-<nnn>` for budgets and
qualities, `SC-<nn>` for success criteria. **Sequential, never reused, never renumbered.**
A removed requirement is marked `[REMOVED]` and its ID is burned. Tests are named after
the ID they protect, so a red test names the requirement it broke.

**Acceptance tags** (ADR-048), on every criterion:

| Tag | Meaning | Gates |
|---|---|---|
| **MACHINE** | CI asserts it. Binary. | The diff |
| **INSTRUMENTED** | Measurable; a human chose the threshold. Changing it needs an ADR. | The diff |
| **JUDGED** | Needs Rik's eye. Cannot be automated. | Phase completion (`[R]`) |

**Ambiguity marker.** `[NEEDS CLARIFICATION: question]` marks anything genuinely
undecided. **There are none open at the time of writing.** A future session adds one
rather than guessing.

---

## 1. The site, walked

Plain prose, no project vocabulary. If you handed this section to a stranger they would
know what the site is.

### 1.1 Arriving — the first thirty seconds

You land on a black page. Rik's name, large, in a serif. One line saying who he is. Next
to it, a small drift of pale points that are slowly finding their places — and when you
move your cursor near them, they brighten and shift, as though they noticed. Under that,
one bright warm-orange invitation: **enter the world.** Beside it, quietly, a summary of
how to move around and which comfort settings exist, and two smaller offers — read on, or
take the résumé.

That is the whole first screen. No menu, no scrolling inside it, no marketing.

Scroll and the page continues as a well-set document: who Rik is, where he works and
studies, every role, every project, his education, how to reach him. Single column,
generous space, the numbers from his work intact — *150s → 12s*, *5 mm*, *sub-200ms* —
never softened into adjectives. It loads faster than almost anything else you opened
today. If you never click the orange invitation, you have still had the complete answer.

### 1.2 Entering the world — about ten minutes

You click, and points assemble into form while the world loads.

**You are nowhere.** Black, no floor, no walls, no scale — you cannot tell whether this
is a room or open space. Perhaps forty points drift. Far off, a smudge that is barely
lighter than the dark. You scroll, and the world *answers* immediately — points surge and
brighten toward you — but you barely move. Scroll here means time, not distance.

**Something is ahead.** The haze thickens and separates into regions of depth without ever
becoming a thing. You start to feel walls before you can see any.

**Then it snaps.** Over about a second the points click into place, and you are standing
in a tall, narrow, cold arcade — pointed arches receding, perforated stone screens on both
sides filtering light from far ahead. It is the only time in the whole site that anything
snaps, and it feels like glasses going on. It is also slightly unwelcoming, on purpose. A
few short first-person lines arrive along its length. This is where you learn who is
talking.

**Your name is in the way.** A mass of points ahead reads as nothing at all, until you
reach one exact spot and it resolves into three enormous letters — **RIK** — and you pass
between the I and the K. Look back and it reads again, reversed.

**Then the walls open.** They were stalls the whole time. Scale explodes outward and
upward and the temperature of the light changes, and you are in a warm, crowded, funny
covered market with people moving through it. Every stall is real: the big ones on the main
street are the jobs, and each thing on the counter is an achievement you can poke to read
— often just the number itself. Behind them, smaller stalls of things he built that were
never portfolio pieces. At the edges, a bookseller with exactly two books and strong
opinions, a clockwork crow that keeps crashing into the next stall, someone cheerfully
failing to climb a brick wall, a stall selling regex cheap, a stall selling nothing and
knowing it. One stall is discounting three failed attempts at this very website, honestly
labelled, and the fourth attempt is the thing you are standing in. Side streets lead to
more depth if you want it.

**Then it thins and cools.** The market falls away and you climb out of a stepwell —
criss-crossing symmetric flights — one tier per year of his degree. The top tier is
visibly unfinished, because he has not graduated yet. The warmth drains out of the light
as you go up, and the world holds something back.

**Figures are waiting.** On the plateau, a ring of almost-human carved attendants in
niches, each holding a mirror. Each mirror, at rest, shows a faint reflection of *you* —
before it shows you anything else. Approach one and it resolves into a project you can
turn over and read properly. Past them, high up and small, something is sitting with its
head down.

**It notices you.** As you approach, the head lifts and an arm extends — unhurried, as
though it has been waiting a long time and is not in a rush. The pose is Michelangelo's
Adam, half-emerged from living rock, with nobody opposite. Back away and it settles again;
you caused it. Part of it never resolves, no matter how close you get.

**The last gap is yours.** Its hand reaches toward your pointer and stops short. Nothing
prompts you. Nothing pulses. There is no timer. If you never close the gap it simply stays
extended, and you can leave. If you do close it, warm light floods outward from the point
of contact over a slow second, everything in the world becomes fully resolved for one long
beat, and one sentence tells you what you have been the whole time. His contact details
arrive here, framed as the reach continuing outward.

**Then you see all of it.** The camera pulls back and the entire journey is one object,
lit — void, arcade, name, market, stepwell, plateau, figure. The name reads again from up
here, from a completely new angle, because you are somewhere new. Then it fades back to
the black you started in. Same first frame. But now the points are legible, and it is
obvious they always were. A few quiet ways onward fade in: read the document, take the
résumé, email him, or walk it again.

### 1.3 Coming back

Nothing is unlocked and nothing new is added. Things are simply **easier to see** — the
world starts less hazy, the name resolves from further away, the figure's head is already
slightly raised when you arrive, some mirrors are already showing you, and one stall you
read as background scenery last time turns out to be a real stall. The payoff is *"I can
read this now,"* which is the entire point of the site.

### 1.4 With a keyboard only

Everything above happens, with no pointer at any moment. Tab moves through what can be
touched; arrows move you along; Page Up and Page Down jump between stops; Home and End go
to either end; Escape always backs out of a detour and returns you exactly where you left.
The final gesture is a real button you press with Enter. Every focused thing has a visible
outline. The full key map is on the first screen and in a help panel on `?` — and it is
generated from the actual keys, so it cannot drift.

### 1.5 With a screen reader

The document at `/` is a plain semantic document and reads as one. The world is *also* a
document: every stop is a real section with a real heading, in story order, and the canvas
itself is hidden because it carries nothing the text does not. Each stop describes **what
it looks like**, not just its name — *"the corridor: narrow and tall, the points now
resolved into close walls, light far ahead."* Arriving somewhere is announced politely,
never interrupting. Nothing depends on sound, because there is no sound.

### 1.6 On a phone

The document is excellent on a phone by construction. The world is the **whole journey** —
every act, every stop, the ending included. Fewer points, fewer stalls, fewer people in
the market, no glow, and no cursor field because there is no cursor; the world stays alive
through drift and the crowd instead, and a tap makes a brief bloom. One dismissible hint
mentions that a laptop shows more. It never nags and never implies the phone version is
broken, because on this decision it isn't a lesser version of the story.

---

## 2. Pillars

Four. Each one earns its place by naming good ideas it kills — the rejections are the
requirements device; the pillar is the handle.

**P1 — The visitor is the missing half.** Nothing here is complete on its own.
→ **Rejects:** a progress-completion indicator, any celebratory confirmation of the final
gesture, any stop that looks finished before the end, a figure that resolves fully, an
achievement or unlock system, a second visit that adds content rather than clarity.

**P2 — The document is the front door; the world is chosen.** Most visitors get everything
they need without ever entering the world.
→ **Rejects:** an auto-redirect for anyone including returning visitors, content that
exists only inside the world, a splash screen, a "best viewed on desktop" gate, any
requirement that the world load before the content is readable.

**P3 — Legibility beats atmosphere, always.** Every word can be read comfortably by
everyone.
→ **Rejects:** text over unbacked moving particles, decorative type, a themed display
face, colour as the sole carrier of any meaning, an accessibility mode that hides
something, atmosphere purchased with contrast.

**P4 — Nothing here demands anything.** No timers, no auto-advance, no nagging, no prompts
to act.
→ **Rejects:** a pulsing hint on the final gesture, a countdown, a scroll-to-continue
lock, an exit-intent prompt, autoplaying anything, a cookie banner, a newsletter modal, a
"was this helpful" widget.

---

## 3. Who it is for

| Audience | Arrives wanting | Must leave with | Bounces if |
|---|---|---|---|
| **Recruiter, ~30s** | Is this person worth a screen? | Name, current role, degree, three projects, contact — without scrolling far | The first screen is art with no facts |
| **Hiring manager, ~2min** | Can he do the work? | The numbers, the stack, the outcomes, the résumé | Achievements are softened into adjectives |
| **Engineer peer** | Is this actually well built? | Fast, accessible, no framework bloat, real craft under the surface | It's slow, or the accessibility is theatre |
| **Curious visitor, ~10min** | Show me something | The whole journey and the ending | It's a tech demo with no story, or it stutters |
| **Screen-reader user** | Can I get all of this? | Every piece of content, plus a sense of what it *looks* like | Parity is claimed but partial |
| **Keyboard-only user** | Can I do all of this without a mouse? | The complete journey, including the final gesture | Anything is pointer-only |
| **Phone visitor** | Does this work on my phone? | A first-class document and the complete journey | It's a desktop site with an apology |
| **Rik** | Something he is proud of and can maintain | A codebase a stranger can navigate and he can change one piece of at a time | Anything visual takes a rewrite to change |

### The tie-break, when audiences conflict (ADR-044)

- **In the document, substance wins.** A visual idea that slows a skimmer down loses.
- **In the world, craft wins.** Content density that costs pacing loses; the content is
  already complete in the document, so nothing is lost.
- **Neither ever beats legibility or accessibility.** Those are not in the trade.

### Success criteria

| ID | Criterion | Tag |
|---|---|---|
| **SC-01** | A visitor with 30 seconds gets name, current role, education, projects and contact from `/` without leaving the first two screens | JUDGED |
| **SC-02** | A visitor who completes the journey feels something at the ending, with the site silent | JUDGED |
| **SC-03** | A keyboard-only visitor and a screen-reader visitor each complete the whole journey unaided | MACHINE + JUDGED |
| **SC-04** | The site holds its frame-rate targets on both reference devices | INSTRUMENTED |
| **SC-05** | A returning visitor notices something they missed and understands it was always there | JUDGED |
| **SC-06** | Some measurable share of `/` visitors enter the world (ADR-046 — the number is a smoke alarm, not a target) | INSTRUMENTED |

`SC-02` and `SC-05` are the two that matter most and neither can be automated. They are
the reason the phase gates exist.

---

## 4. Functional requirements

### 4.1 Foundations — both surfaces

| ID | Requirement | Acceptance | Tag |
|---|---|---|---|
| **FR-CORE-001** | All content lives in one Content Graph; both renderings and the résumé PDF are derived from it. Neither rendering is a source. | Build fails if a stop exists without a content entry, or an entry without placement data | MACHINE |
| **FR-CORE-002** | Where a stop exists in the world, it exists in the document. **Crowd figures are the sole exemption** (ADR-039) — ambient population, no entry required. | Derivation check, with the exemption named in the test | MACHINE |
| **FR-CORE-003** | Content schemas are validated at build time; malformed content fails the build rather than warning. | Zod validation in CI, with a deliberately-broken fixture proving it fails | MACHINE |
| **FR-CORE-004** | A production build fails if any content entry is still marked placeholder. Preview builds allow them. | Build check against a placeholder fixture | MACHINE |
| **FR-CORE-005** | No user-facing string is written inline. All copy is imported by key from a catalogue, making the site translation-ready by construction. | Lint rule flags hardcoded user-facing literals | MACHINE |
| **FR-CORE-006** | Colours exist in exactly one file. | `stylelint color-no-hex` plus a lint rule over `src/**` | MACHINE |
| **FR-CORE-007** | The engine imports no framework — no React, Astro, or state library. | `eslint-plugin-boundaries`, deny by default | MACHINE |
| **FR-CORE-008** | Seven preferences exist, persist locally, apply to both renderings, and are reachable in under two interactions from anywhere. | Per-preference e2e test; no combination produces a broken state | MACHINE |
| **FR-CORE-009** | Each preference is detected from the corresponding OS setting where one exists, and is never overridden once set manually. | Emulated-preference e2e tests | MACHINE |
| **FR-CORE-010** | Every visual choice — the font, each effect, the mirror presentation, each content item — changes by editing one named module. | Review; a swap test proves one file changes the look | JUDGED |

### 4.2 The document, at `/`

| ID | Requirement | Acceptance | Tag |
|---|---|---|---|
| **FR-DOC-001** | `/` serves the document and is **never** auto-redirected, for any visitor, ever. | Route test, including with returning-visitor state set | MACHINE |
| **FR-DOC-002** | The first screen carries: name, one line of identity, a live point-cloud element, a prominent invitation into the world above the fold, a controls-and-modes summary, and quieter offers to read on or take the résumé. | Structural e2e test per element | MACHINE |
| **FR-DOC-003** | The first screen has no navigation menu, no internal scrolling, no marketing copy, and no feature list. | Review against the element list | JUDGED |
| **FR-DOC-004** | The point-cloud element is interactive — it responds to the pointer — and derives its point positions from rendered text rather than a shipped coordinate table (ADR-042). | Interaction test; bundle contains no coordinate payload | MACHINE |
| **FR-DOC-005** | The invitation is hidden or carries a plain explanation when WebGL2 is unavailable; de-emphasised but never removed under reduced-motion; carries a size warning on a constrained connection or a failing device. Never a dead end, never a scold. | Three emulated-condition e2e tests | MACHINE |
| **FR-DOC-006** | The document carries the complete content: bio, every role, every project, education, and contact. Nothing exists only in the world. | Content-coverage test against the graph | MACHINE |
| **FR-DOC-007** | Quantified achievements survive into prose unsoftened. No number becomes an adjective. | Review of every entry against source material | JUDGED |
| **FR-DOC-008** | A role with no end date renders in present tense, derived rather than hardcoded. | Unit test on the date logic | MACHINE |
| **FR-DOC-009** | `/doc/<slug>` serves each individual role, project, and education entry. | Route test per entry | MACHINE |
| **FR-DOC-010** | `/resume.pdf` is generated from the Content Graph at build time and cannot contradict the document. | Generated PDF's content is diffed against the graph | MACHINE |
| **FR-DOC-011** | `/resume.pdf` excludes the phone number present in the source material (ADR-028). | Text extraction asserts absence | MACHINE |
| **FR-DOC-012** | Contact is a plain selectable email address plus GitHub and LinkedIn. **No form** (ADR-041). The address is never obfuscated or assembled by script. | Presence and plain-text assertions | MACHINE |
| **FR-DOC-013** | `/accessibility` states a **target** rather than a conformance claim, and carries a live known-gaps list (ADR-049). | Page exists; review for honesty | MACHINE + JUDGED |
| **FR-DOC-014** | The first screen and the invitation are genuinely enticing. **The load-bearing judgement of the project** — the world is unseen if this is weak. | Rik's review of the rendered page | JUDGED |

### 4.3 The world, at `/world`

| ID | Requirement | Acceptance | Tag |
|---|---|---|---|
| **FR-WORLD-001** | Entry runs a thematic transition showing **real** load progress, which also warms every shader so nothing recompiles later. | Progress reflects actual load; no compile after first frame | MACHINE |
| **FR-WORLD-002** | There is exactly one authored path, arc-length parameterised so equal input produces equal apparent travel. | Unit test on the parameterisation | MACHINE |
| **FR-WORLD-003** | Position along the path is monotonic under monotonic input, never NaN, and bounded in velocity. | Fuzz test | MACHINE |
| **FR-WORLD-004** | Scroll semantics are never hijacked: down is always forward, no horizontal scroll, no inverted axis, no trap. | Input e2e tests | MACHINE |
| **FR-WORLD-005** | The world responds visibly to the **first** input within 100ms even where travel is deliberately slow (ADR-022). | Measured visual delta within 100ms | MACHINE |
| **FR-WORLD-006** | Pacing is per-stop data from the Content Graph, never hardcoded. | Source audit; changing data changes pacing | MACHINE |
| **FR-WORLD-007** | Snapping to a stop engages only below a velocity threshold and has hysteresis, so a slow visitor is never pulled backwards. | Unit test on the snap controller | MACHINE |
| **FR-WORLD-008** | Free look offsets yaw and pitch within clamps and **introduces zero roll, ever.** | Assert roll is identically zero across a full traversal | MACHINE |
| **FR-WORLD-009** | Field of view stays within its clamp and is never animated during travel. | Camera unit test | MACHINE |
| **FR-WORLD-010** | Resolution of any subject composes global progress, proximity, view-centredness, and pointer proximity, and is computable headlessly. | Unit tests covering all four inputs | MACHINE |
| **FR-WORLD-011** | **Global resolution never exceeds its cap before the final gesture.** The world is deliberately, measurably incomplete. This is the keystone of the whole design and is not a bug. | Unit test across the full range | MACHINE |
| **FR-WORLD-012** | The figure never reaches full resolution, at any time, under any preference. | Unit test | MACHINE |
| **FR-WORLD-013** | There are exactly **five** interaction verbs. A sixth is a design failure absent an ADR. | Audit of registered interaction kinds | MACHINE |
| **FR-WORLD-014** | The interaction colour marks everything touchable and **nothing** else. Ambient response carries it never. | Token audit across every stop | MACHINE |
| **FR-WORLD-015** | The ambient response layer — pointer displacement with brief leading-edge colour fringing, and depth parallax — is present everywhere and is **not** a verb and **not** an affordance. Its fringing is a deliberate exception to the anti-patterns list; do not delete it. | Presence test; audit that it carries no interaction colour | MACHINE |
| **FR-WORLD-016** | Exactly **one** hard snap exists in the entire site. Everything else is spring-damped. | Audit for hard-eased transitions | MACHINE |
| **FR-WORLD-017** | The name sculpture is legible only from one narrow position, and legible again reversed when looking back. | Scripted screenshots across many positions reduced to a legibility measure | INSTRUMENTED |
| **FR-WORLD-018** | Market stalls are generated from content. No stall is hardcoded. | Source audit; adding content adds a stall | MACHINE |
| **FR-WORLD-019** | Every joke attaches to something real. | Audit of each humorous element to its content entry | JUDGED |
| **FR-WORLD-020** | Each achievement is one pokeable object, keyboard-operable, marked as touchable. | Per-object keyboard test | MACHINE |
| **FR-WORLD-021** | The market is populated by an ambient crowd — many figures, unhurried, no interaction, period-plausible, cheaply instanced. | Presence test; draw-call count within budget | MACHINE |
| **FR-WORLD-022** | Education tiers are generated from content, and the final tier is visibly unfinished. | Generation test; the unfinished tier is asserted, not incidental | MACHINE |
| **FR-WORLD-023** | Every project has exactly one mirror and every mirror exactly one project — no orphans in either direction. | Bidirectional check | MACHINE |
| **FR-WORLD-024** | Every mirror shows the visitor **before** it shows a project. | Visual test at rest | MACHINE |
| **FR-WORLD-025** | Detours branch and rejoin at exactly the position they were entered from, and Escape always returns. | Unit test on position restoration | MACHINE |
| **FR-WORLD-026** | Project prose inside the world is real selectable text, contrast-compliant over the world, never an image. | DOM and contrast assertions | MACHINE |
| **FR-WORLD-027** | The figure's posture change is driven by proximity and is **reversible** by backing away. | Bidirectional proximity test | MACHINE |
| **FR-WORLD-028** | The final gesture is a real button with an accessible name, operable by pointer, touch, and Enter. | Three input-path tests | MACHINE |
| **FR-WORLD-029** | **Nothing near the final gesture prompts, pulses, or times out.** It waits indefinitely. Softening this destroys the thesis. | Code audit for timers and attention-seeking animation | MACHINE |
| **FR-WORLD-030** | The flood at contact is a ramp, never a flash, and is slower still under the photosensitivity preference. | Timing assertion plus the luminance check | INSTRUMENTED |
| **FR-WORLD-031** | The ending reveals the whole path as one object within the point budget, with the name legible from the new angle. | Frame budget at the pull-back; legibility measure | INSTRUMENTED |
| **FR-WORLD-032** | After the ending, ways onward fade in — document, résumé, email, walk again — with no modal, no timer, and no auto-redirect. | Structural test; absence of timers | MACHINE |
| **FR-WORLD-033** | "Walk again" resets position without clearing returning-visitor state. | State test | MACHINE |
| **FR-WORLD-034** | Returning-visitor state changes **legibility only** — no new content, nothing unlocked, nothing explained (ADR-047). | Diff first and second visit; assert content identical | MACHINE |
| **FR-WORLD-035** | Clearing local storage restores the first-visit experience exactly. | State test | MACHINE |
| **FR-WORLD-036** | A stop's identity is stable and used in both URLs and the accessible mirror. | Schema constraint | MACHINE |
| **FR-WORLD-037** | Nothing anywhere depends on audio. Removing the audio module leaves every other test passing. | Full suite run with the module absent | MACHINE |
| **FR-WORLD-038** | No conventional mesh geometry exists in the world. Everything is one particle system with different position data. | Scene audit | MACHINE |
| **FR-WORLD-039** | Nothing modern appears in the world as itself. Every reference is translated into the world's idiom. | Audit of every authored prop | JUDGED |
| **FR-WORLD-040** | No authored form is identifiable as a specific real building. The world reads as invented. | Review | JUDGED |

### 4.4 Content

| ID | Requirement | Acceptance | Tag |
|---|---|---|---|
| **FR-CONTENT-001** | No biography is ever invented. Missing content is an obvious placeholder, never plausible-looking prose. | Placeholder fixtures are unmistakable; production build refuses them | MACHINE |
| **FR-CONTENT-002** | Narrative copy stays within its budget and every line passes the no-slop test — a sentence Rik would say aloud, meaning something specific. | Line count; Rik's approval of every line | MACHINE + JUDGED |
| **FR-CONTENT-003** | Every stop carries a non-empty sentence describing its **visual state**, not merely its name. This is the primary channel for non-visual visitors and gets the same care as narrative copy. | Schema requires it; Rik reviews the writing | MACHINE + JUDGED |
| **FR-CONTENT-004** | The one reframe sentence is approved by Rik. It is the most important sentence on the site. | Rik's approval | JUDGED |

---

## 5. Non-functional requirements

Every threshold below is a **gate, not a dashboard.** When one is breached there are
exactly three sanctioned responses: optimise the offending thing, remove it, or decline
the feature. **Never raise the number without an ADR, and never for the document.**

| ID | Requirement | Measured by | Tag |
|---|---|---|---|
| **NFR-PERF-001** | Document client JavaScript stays within its budget. **Never negotiable.** | Gzipped size check on build output | INSTRUMENTED |
| **NFR-PERF-002** | Document performance and accessibility scores meet their floors | Lighthouse CI | INSTRUMENTED |
| **NFR-PERF-003** | Document is interactive within budget on a throttled connection | Lighthouse CI | INSTRUMENTED |
| **NFR-PERF-004** | World holds its frame-rate target on the reference desktop and the reference phone | Scripted deterministic traversal with tracing | INSTRUMENTED |
| **NFR-PERF-005** | Zero allocation in the render loop | Heap sampling over a long traversal | MACHINE |
| **NFR-PERF-006** | No long task after the first frame | Tracing | MACHINE |
| **NFR-PERF-007** | World bundle and total initial transfer stay within budget | Build manifest sum | INSTRUMENTED |
| **NFR-PERF-008** | Device tier adapts with hysteresis and never oscillates or changes mid-transition | Synthetic load sweep | MACHINE |
| **NFR-PERF-009** | No subject renders below its legibility floor. If the floor cannot be met, render **fewer subjects** — never a mush. | Per-subject floor from bake metadata | INSTRUMENTED |
| **NFR-PERF-010** | On constrained devices, subject **count** reduces before point density | Tier comparison test | MACHINE |
| **NFR-PERF-011** | No shader recompiles after load; no work at all while the tab is hidden | Compile counter; idle trace | MACHINE |
| **NFR-A11Y-001** | The site **targets** WCAG 2.2 AA and publishes its gaps (ADR-049) | Dated review, published | JUDGED |
| **NFR-A11Y-002** | Zero automated accessibility violations on every route and every stop | axe on both renderings | MACHINE |
| **NFR-A11Y-003** | Every stop, detour, mirror, and the final gesture is keyboard-reachable and operable, in story order, with zero traps | Keyboard-only traversal, pointer never used | MACHINE |
| **NFR-A11Y-004** | Focus is visibly indicated on every focusable element; `outline: none` appears nowhere | Focus screenshots; source audit | MACHINE |
| **NFR-A11Y-005** | Heading hierarchy is unbroken and landmarks are correct in both renderings | Structural test | MACHINE |
| **NFR-A11Y-006** | Every token pair in use meets its contrast floor | Programmatic contrast over the token file | MACHINE |
| **NFR-A11Y-007** | Hue carries no information anywhere; every distinction is also position, size, opacity, or motion | Review | JUDGED |
| **NFR-A11Y-008** | Legible at 200% zoom with no horizontal scroll, and at 400% with reflow | Viewport tests | MACHINE |
| **NFR-A11Y-009** | No interaction requires dragging, precise pointing, timing, or multi-touch; every target meets its minimum size | Interaction audit | MACHINE |
| **NFR-A11Y-010** | Nothing is timed anywhere. No auto-advance, no countdown, no expiry, no disappearing content. | Source audit for timers | MACHINE |
| **NFR-A11Y-011** | Every registered key binding appears in the help panel, generated from the bindings themselves | Generated-vs-registered comparison | MACHINE |
| **NFR-A11Y-012** | Under reduced motion the camera performs **zero** translation, parallax is off, and resolution transitions are opacity-only | Unit test on the camera controller | MACHINE |
| **NFR-SAFE-001** | **No luminance change above 3 per second, anywhere, under any input, under any preference.** `axe` cannot check this; the bespoke luminance analysis is the only automated guard. | Frame-luminance sampling with frequency analysis, at several traversal speeds | MACHINE |
| **NFR-SAFE-002** | Layered perforated screens are a dedicated flicker case at several parallax speeds — the interference risk is structural to the visual language | Same harness, dedicated case | MACHINE |
| **NFR-SAFE-003** | An independent photosensitivity cross-check has been run, or its absence is published as a known gap | Manual pass, recorded | JUDGED |
| **NFR-SAFE-004** | No involuntary camera movement. The visitor always causes motion. | Camera audit | MACHINE |
| **NFR-SAFE-005** | No parallax on text or interface, ever | Source audit | MACHINE |
| **NFR-PRIV-001** | No client-side analytics, no third-party script, no cookie, no fingerprint, no identifier. The **only** measurement is a server-side count of two routes (ADR-046). | Network audit on every route; storage audit | MACHINE |
| **NFR-PRIV-002** | What is and is not counted is stated publicly | Published page | MACHINE |
| **NFR-PRIV-003** | No content is fetched from a third party at runtime | Network audit | MACHINE |
| **NFR-CODE-001** | A developer who has never seen the project understands a file from its name, location, and signatures alone — no comments, no docs | Review, per file | JUDGED |
| **NFR-CODE-002** | TypeScript strict; no `any` without a justifying comment; no junk-drawer directories; no barrel files; named exports only | Typecheck and lint in CI | MACHINE |
| **NFR-CODE-003** | Tests are named for the behaviour they protect and cite the requirement ID | Review; ID coverage script | MACHINE |
| **NFR-CODE-004** | Every requirement ID in this document is cited by at least one test, or explicitly listed as JUDGED | Generated coverage report fails on an uncovered non-JUDGED ID | MACHINE |

---

## 6. Out of scope

### Hard non-goals — reject scope that pulls here

Not a game. Not free-roam. Not an anime fan site — the influence is structural and no
anime imagery appears, ever. Not a WebGL tech demo; no effect earns its place by being
impressive. Not a blog or CMS. Not atmosphere at the cost of legibility.

### Deliberately deferred — parked, with nothing depending on them

Procedural audio (post-launch, optional, assume it never happens). Device-orientation
free look on phones. Any shipped translation — the site is translation-*ready*, which is a
different commitment. A shareable deep link to a specific stop. Frame-level visual
regression gating (revisit after the engine exists, ADR-048).

### Things that will be suggested, and why each is refused

| Suggestion | Refused because |
|---|---|
| A dark/light mode toggle | There is one palette and it is the work. A light mode would be a second design. |
| A blog or "now" page | Stated non-goal. Content is versioned files with no admin surface. |
| Testimonials | Nobody believes them on a personal site. |
| A skills bar chart or proficiency percentages | Invented precision about unmeasurable things. The market's stalls do this honestly instead. |
| Analytics beyond the one route count | ADR-046's forbidden list is the boundary, not a starting point. |
| A contact form | ADR-041. No runtime API calls, and a form at the ending would be tone-deaf. |
| Auto-entering the world for returning visitors | Breaks crawlers and breaks the promise the default makes. |
| A prompt or hint on the final gesture | Destroys the thesis. A demanded gesture is not a gesture. |
| Loading the world faster by cutting the transition | The transition *is* the shader warm-up. Cutting it moves the cost somewhere worse. |
| Raising a performance budget to ship a feature | Optimise, remove, or decline. Never raise, never for the document. |
| Making the figure resolve fully at the end | It is permanently unfinished. That is the point. |
| A completion or progress percentage | Rejected by pillar P1. |

---

## 7. Rabbit holes

The few things that will quietly eat a week if nobody names them first.

1. **The document's JavaScript budget versus an interactive hero.** The tightest
   constraint in the project meets its most load-bearing element. Measure before building
   anything on top of it; the fallback is already decided (ADR-042) so nobody is tempted
   by the budget.
2. **Interference patterns from layered perforated screens.** The signature form of the
   visual language is the textbook setup for moiré, and moiré can become luminance
   oscillation — which is a safety issue, not an aesthetic one. Risk and beauty are the
   same feature here. Tune it; do not avoid it, and do not discover it late.
3. **Position-as-React-state.** Position updates every frame. Putting it in framework
   state will destroy the frame rate and it is the single most likely performance mistake
   in the codebase.
4. **Determinism.** Visual and flicker tests are worthless without it, and it is very
   painful to retrofit. Seed randomness from the start; time is controlled externally, so
   do **not** build an injectable clock.
5. **The market's cost on a phone.** The largest, densest stop against the weakest device.
   Reduce stall and crowd count, never point density.
6. **Writing the visual-state descriptions well.** These are the only channel through
   which the site's atmosphere reaches someone who cannot see it. They are easy to fill in
   badly and satisfy the schema while serving nobody.

---

## 8. Assumptions

Defaults chosen where nothing stated otherwise. Each is contestable.

1. The site launches without audio and is complete without it. Procedural sound, if it
   ever happens, is additive.
2. Five projects and four anchor stalls is the right shape. The Content Graph scales, so
   this is a content decision rather than an architectural one.
3. Reference devices are a 2021 integrated-graphics laptop and a 2022 mid-range Android.
   Both budgets are stated against those.
4. English only at launch.
5. The host can report per-route request counts server-side. If it cannot, ADR-046's
   measurement does not happen — **a client script is not the fallback.**
6. Rik authors or approves every line of copy. Claude drafts from source material; nothing
   biographical ships unreviewed.

---

## 9. Acceptance

### How the three tags gate work

- **MACHINE and INSTRUMENTED gate the diff.** A red one is a failed task. An INSTRUMENTED
  threshold may only move via an ADR — which is what stops a budget being "fixed" by
  raising it.
- **JUDGED gates phase completion, not the diff.** Work proceeds and the judgement queues
  in `STATUS.md` under `PENDING JUDGEMENT`. A phase is not complete while any of its
  JUDGED criteria is unsigned.
- **A task brief never contains a JUDGED criterion.** A context-poor implementer cannot
  satisfy "does this feel right" and will guess or stall. The brief asks for the
  *artifact*; Rik supplies the judgement against it.
- **A failed JUDGED criterion resolves to exactly one of three outcomes:** retune (a new
  value, recorded in an ADR), rescope (cut it), or accept as-is. Never an open discussion,
  never a silent pass.

### The JUDGED set, in full

These are the only things that require Rik, and each is written so it can be answered in
about one word given the right artifact.

| ID | The question | The artifact that answers it |
|---|---|---|
| **FR-DOC-014** | Is the first screen enticing enough that a stranger clicks through? | The rendered page, desktop and phone |
| **FR-DOC-003** | Does the first screen read as deliberate rather than as a landing page? | The same |
| **FR-DOC-007** | Does the prose keep the numbers sharp? | Each entry beside its source line |
| **SC-02 / FR-CONTENT-004** | Does the ending land, with the site silent? | The final sequence, and the one sentence in isolation |
| **FR-CONTENT-002** | Would you say each of these lines aloud? | Every narrative line, listed |
| **FR-CONTENT-003** | Do the visual-state descriptions convey the atmosphere? | Each description beside its screenshot |
| **FR-WORLD-019** | Is the market warm and funny rather than cluttered? | Screenshots at several positions |
| **FR-WORLD-039 / 040** | Does the world read as invented, and is anything modern intruding? | Prop inventory and screenshots |
| **NFR-A11Y-001 / 007** | Is the accessibility statement honest, and does hue carry meaning anywhere? | The page; a desaturated screenshot set |
| **NFR-CODE-001 / FR-CORE-010** | Can a stranger navigate this, and can one file change the look? | The tree, and a swap diff |
| **SC-05** | Does a second visit read as *"it was always there"*? | Two recordings, side by side |
| **NFR-SAFE-003** | Independent photosensitivity check run, or published as a gap? | The cross-check result |
| — | Does the resolve feel like glasses going on rather than a crossfade? | Variant clips at several settings |
| — | Does the corridor feel claustrophobic? | Three widths |
| — | Is the attention-sharpening too strong? Is the opening held too long? | Variant clips |
| — | Does the ambient cursor field read as alive or as noise? | Variant clips |

Anything containing *feels*, *reads as*, or *lands* is JUDGED by definition, and a build
session must never mark one done.

### The launch gate

The site is ready when every MACHINE and INSTRUMENTED criterion passes in CI, every
JUDGED criterion above is signed, and all five conditions in `00-VISION.md` §Definition of
done are confirmed. Manual screen-reader passes on both platforms, a keyboard-only
journey, a real mid-range Android, and a motion-sickness check by a susceptible person are
part of that set and cannot be satisfied from a build session.

---

## 10. Dependencies

**Relies on:** ADR-001 (one path), 003 (one content graph), 006 (the figure), 007
(palette), 010 (phase order), 017 (ambient layer), 018 (controls upfront), 021 + 027
(stall classes), 022 (immediate feedback), 024 (document is default), 025 (no audio), 033
+ 036 (visual language and restraint), 037 (codebase quality), 038 + 043 (mobile), 039
(crowd), 040 (native scroll), 041 (no form), 042 (hero technique), 044 (tie-break), 045
(the ending), 046 (measurement), 047 (returning visitors), 048 (acceptance tags), 049
(accessibility target).

**Feeds:** `docs/tasks/` — atomic briefs, each citing the requirement IDs it satisfies,
each carrying only MACHINE and INSTRUMENTED criteria.

**Open questions:** none. `[NEEDS CLARIFICATION]` markers: none.
