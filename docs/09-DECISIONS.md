# Decision log

> Every fork in this project, the options considered, what was chosen, and why.
>
> **This is the most important file for handoff.** A new session that reads this
> understands not just what the project is but what it deliberately isn't, and
> will not waste time relitigating settled questions or accidentally reversing a
> decision whose reasoning isn't visible in the code.
>
> Format: append only. Never edit a decided ADR — supersede it with a new one and
> mark the old one `Superseded by ADR-NNN`.
>
> ## Status vocabulary — read this before trusting any ADR
>
> An audit on 2026-08-19 found that several ADRs claimed **"Decided by Rik"** when Rik
> had raised a *problem* and Claude had chosen the *solution*. That distinction matters
> enormously for a handoff: a future session treats "Decided by Rik" as immovable, when
> in fact the decision is Claude's and cheap to reverse. Attributions below are now
> precise.
>
> | Status | Meaning |
> |---|---|
> | **`Decided by Rik`** | Rik chose between stated options, or stated the decision himself. **Do not reopen without asking.** |
> | **`Claude's call, delegated`** | Rik explicitly handed the decision over. Reversible with an ADR. |
> | **`Claude's call — Rik raised the problem`** | Rik identified the issue; Claude designed the fix and Rik has not confirmed the specifics. **Reversible cheaply. Say so if it comes up.** |
> | **`UNRATIFIED — Claude's recommendation`** | Claude proposed it; Rik has never engaged with it. Often cited elsewhere as if settled. |
> | **`SUPERSEDED by ADR-NNN`** | Retained so citations resolve. Not the spec. |
>
> See also **§Unconfirmed inventions** near the end — design decisions Rik never raised
> at all, listed so nobody mistakes them for settled.
>
> ## Index
>
> **Foundational, all `Decided by Rik` (2026-08-14):** 001 navigation · 002 story spine
> · 003 content graph · 004 scope · 005 tone · 006 the Figure · 007 palette ·
> 008 stack *(delegated)*
>
> **Older, now resolved:** 009 audio *(superseded)* · 010 phase order · 011 typography
> *(provisional — needs visual confirmation)* · 012 asset pipeline · 013 domain/hosting
> *(superseded)* · 014 Mirror text
>
> **Session 2 (2026-08-19):** 015 hero · 016 act rebalance · 017 ambient cursor field ·
> 018 controls upfront · 019 dependency policy · 020 orchestration · 021 Market stall
> classes · 022 scroll feedback · 023 audio hybrid *(superseded)*
>
> **Session 3:** 024 Document Mode default · 025 audio descoped · 026 tooling round 2
>
> **Session 4:** 027 stalls preview Mirrors · 028 résumé content · 029 Mirrors and the
> GitHub audit · 030 the failure stall · 031 personality content · 032 repo
> *(superseded)*
>
> **Session 5:** 033 visual language · 034 repo plan *(locked)* · 035 Mirrors corrected
> · 036 visual restraint
>
> **Session 6 (2026-08-23):** 037 codebase quality · 038 mobile first-class · 039 crowd
> figures · 040 native-scroll preference. This session also **ratified** 010, 011
> (provisional), 014, 022, 025, 027, 028, 029, and confirmed the Unconfirmed-inventions
> list. **Almost nothing in the log is unratified now** — the exceptions are ADR-011
> (awaiting visual confirmation) and anything still in Open questions.

---

## ADR-001 — Navigation model: on-rails Spine with free look

**Status:** Accepted · Decided by Rik, 2026-08-14

**Context.** The three inspiration sites use three incompatible movement models:
Shopify Editions is on-rails cinema, abeto messenger is free-roam exploration,
landonorris.com is cursor-local interaction. Rik valued all three, including the
exploration feeling explicitly.

**Options.** (a) On-rails Spine + free look + cursor interaction, with optional
Alcoves. (b) Free-roam. (c) Hybrid — rails between stations, roam within them.
(d) Near-passive cinematic.

**Decision.** (a).

**Why.**
- Scroll is the most universally available input there is — wheel, trackpad,
  touch, arrow keys, Page Up/Down, space, and a screen reader's next-section
  command all map onto it cleanly. Free-roam has no such universal mapping.
- The Focus mechanic *requires* authored pacing. A haze that resolves at the
  right moment is a story beat; one that resolves whenever the Witness happens to
  wander close is an effect.
- Knowing exactly what can be in frame at every `t` makes streaming, level of
  detail, and the point budget tractable. Free-roam requires authoring every
  sightline and costs roughly an order of magnitude more content.
- Free-roam fires story beats in arbitrary order, which is fatal to a reframe
  ending.
- The exploration *feeling* is preserved by free look plus opt-in Alcoves. What
  is given up is literal wandering.

**Consequences.** Alcoves must feel genuinely optional and genuinely rewarding,
or the loss of exploration is felt. One movement system, one input model, one
accessibility model. `t` becomes the primary state variable of the whole app.

---

## ADR-002 — Story spine: "You are the missing half"

**Status:** Accepted · Decided by Rik, 2026-08-14

**Context.** The brain dump contained a strong image (Creation of Adam with God
missing) and a strong mechanic (point clouds resolving on approach) but no stated
thesis connecting them.

**Options.** (a) "You are the missing half" — creation requires a witness.
(b) "Coming into focus" — autobiographical, blur-to-sharp as self-discovery.
(c) "The loop" — Dark/Tenet recursion. (d) "The unfinished god" — potential and
persistence, Berserk-flavoured.

**Decision.** (a), with (c)'s loop structure borrowed for the Return, and (d)'s
incompleteness borrowed for the Figure's rendering.

**Why.** The image and the mechanic are the same idea — an incomplete thing that
requires an observer — so (a) was already latent in the material rather than
imposed on it. It yields a reframe rather than a plot twist, which means the
foreshadowing can be *structural*: the mechanics restate the thesis continuously,
so a second visit reveals it was never hidden. (b) is a theme without a turn.
(c) alone risks reading as clever and cold. (d) makes "contact me" land oddly.

**Consequences.** Every mechanic must be checkable against the thesis. The Reach
must be genuinely optional and unhurried, or the point collapses. The Foreshadow
Ledger becomes a maintained artifact.

---

## ADR-003 — One Content Graph, two peer renderers

**Status:** Accepted · Decided by Rik, 2026-08-14

**Context.** Rik's brain dump proposed a wholly separate no-frills site acting as
a glorified resume, reachable early and easily.

**Options.** (a) One Content Graph; Document Mode and World Mode both derived
from it. (b) One site, two hand-authored modes. (c) Two separate sites.

**Decision.** (a).

**Why.**
- Accessibility parity becomes structural rather than effortful: nothing can
  exist in the world that is not in the document, because the world's Station
  manifest is *derived* from the document content.
- Content drift becomes impossible rather than merely discouraged. (b) and (c)
  both guarantee the two versions diverge within weeks.
- Document Mode becomes the SEO and sharing surface — crawlable semantic HTML at
  a stable URL.
- Adding a Station becomes a content edit, not a code change.
- It reframes Document Mode as a peer rather than an apology, which matters
  because it is the version most hiring decisions will actually be made from.

**Consequences.** Content schemas must carry both prose and world-placement data.
The derivation invariant must be enforced in CI. Slightly more upfront schema
design; far less ongoing maintenance.

---

## ADR-004 — Scope: full vision, phased into independently shippable milestones

**Status:** Accepted · Decided by Rik, 2026-08-14

**Context.** Claude flagged that the full vision is a 6–12 month solo project
with real risk of stalling at 70% complete with nothing live.

**Options.** ~4–6 weeks lean · ~3 months staged · 6+ months no compromises ·
open-ended.

**Decision.** 6+ months, no compromises. The Market, crowds, adaptive score, and
Second Sight are all in scope.

Claude's mitigation, adopted without reducing scope: every phase in
`08-ROADMAP.md` ends in something deployable, and the phase order front-loads
risk and meaning while deferring the most cuttable content. Phase 0 puts a
genuinely good Document Mode site live within about three weeks.

**Why.** Rik's call after the risk was stated. The staged structure means the
stall risk is capped — the worst realistic outcome is a live site with fewer
Stations, not nothing.

**Consequences.** Nothing may be built in a way that requires a later phase to
make sense. The Figure and the Reach are built *before* the Market (see
ADR-010).

---

## ADR-005 — Tone: warm world, solemn climax

**Status:** Accepted · Decided by Rik, 2026-08-14

**Context.** Rik asked for a site that feels fun and shows a personality that
"likes having fun," while the thesis and imagery are inherently solemn. Left
unmanaged, the site would have become an impressive, cold cathedral — which
contradicts the equally-stated requirement that it feel authentic and human.

**Options.** (a) Warm world, solemn climax. (b) Playful throughout. (c) Solemn
throughout, personality in the margins. (d) Tone shifts progressively as the arc.

**Decision.** (a).

**Why.** It is the Mob Psycho / Jojo Rabbit structure: the quiet climax hits
because the surrounding world was warm enough to care about. (b) turns the
reframe into a gag. (c) means a visitor who doesn't dig never meets Rik.
Critically, the Market is *also* the work-history Station, so the fun is attached
to real content and is not padding.

**Consequences.** A tracked Fun budget. A hard rule that the Figure never jokes.
The Market becomes the most content-expensive Station, and it is scheduled late.

---

## ADR-006 — The Figure is an unfinished, unidentified human

**Status:** Accepted · Decided by Rik, 2026-08-14

**Context.** Casting oneself as Adam and the visitor as God can read as arrogant,
and would have been the default outcome of the original brain dump.

**Options.** (a) Unidentified, never fully resolved. (b) Openly Rik's likeness.
(c) Unidentified until the Reach, then resolves into Rik. (d) A machine reaching
for a human.

**Decision.** (a). Faceless, never named, and never reaching Focus 1.0 even at
maximum global Focus.

**Why.** It removes the arrogance reading entirely, and it *strengthens* the
thesis: an unidentified figure is one the Witness can project into, which makes
"you are the missing half" work in both directions. (b) narrows the thesis to
"look at me." (c) is the same risk with extra steps. (d) makes the site about a
topic rather than about a person, and dates quickly.

**Consequences.** The Figure's residual dispersion is a permanent art-direction
constraint, not a transition state — it needs its own shader path. The Figure
carries no biographical content; that lives in the Corridor, Market, and Climb.

---

## ADR-007 — Palette: void black, bone white, one ember accent

**Status:** Accepted · Decided by Rik, 2026-08-14

**Options.** (a) Near-monochrome + single warm accent. (b) Aged fresco —
plaster, ochre, lapis. (c) Cold cyan scan. (d) Bioluminescent teal.

**Decision.** (a).

```
VOID    #05060A   ambient, the expanse
HAZE    #2A2F3A   mid-depth falloff, structure only, never text
DUST    #E8E4DA   particles at full Focus, body text
EMBER   #FF6B35   interaction, life, the hand
```

**Why.** Hue never carries meaning, so colour-blind safety is essentially free.
Contrast is trivially controllable: DUST on VOID is ~15.7:1 and EMBER on VOID is
~7.0:1, both comfortably past WCAG AA. Scarcity makes the accent precious — when
Ember appears it *means* something. (b) is warmer and more human but sacrifices
the cold-void contrast the opening depends on, and is harder to keep compliant.
(c) is the default look of a thousand WebGL demos and fights "authentic and
human." (d) needs expensive bloom and fights text legibility.

**Consequences.** The Ember rule (`03-ART-DIRECTION.md`) becomes enforceable.
Fresco warmth, where wanted in the Market, must come from light temperature and
density rather than from hue.

---

## ADR-008 — Stack: Astro + React Three Fiber + TypeScript

**Status:** Accepted · Claude's call, delegated by Rik, 2026-08-14

**Options.** (a) Astro + R3F. (b) Next.js + R3F. (c) Vanilla Three.js + any SSG.
(d) Delegate to Claude — chosen.

**Decision.** Astro, with React Three Fiber inside a single client island;
TypeScript throughout; Astro content collections with Zod schemas as the Content
Graph; static output; ~~Cloudflare Pages~~ **Vercel (hosting amended by ADR-034)**.

**Why.**
- Astro's islands architecture makes ADR-003 *structural*: Document Mode ships
  with essentially zero JavaScript, and World Mode is one explicitly hydrated
  island. The architecture is enforced by the framework rather than by
  discipline.
- Astro content collections with Zod schemas are almost exactly the Content Graph
  this project needs, including build-time validation — which is how the
  derivation invariant gets enforced for free.
- The site is fundamentally static. Next.js's server capabilities are unused
  weight here, and its default client bundle undermines the zero-JS document.
- R3F over vanilla Three: six months of hand-written plumbing is a bad trade for
  marginal render-loop control, and R3F does not prevent dropping to raw Three
  and raw GLSL where it matters — which is exactly where the particle system
  lives anyway.

**Consequences.** The particle system is deliberately written as
framework-agnostic Three.js plus GLSL, imported by a thin R3F wrapper. That keeps
the expensive, hard-won part portable.

**Migration path if this is wrong.** The Content Graph is plain MDX/JSON plus Zod
schemas and the engine is plain Three.js; moving to Next.js means rewriting only
the page shells and the island boundary — a few days, not a rebuild. Reassess if
the project ever genuinely needs server-side behaviour.

---

## ADR-015 — The hero (originally "the entry gate is the hero")

**Status: largely SUPERSEDED by ADR-024.** The *hero concept* survives and is now the
header of Document Mode at `/`; the *separate entry-gate screen* does not. Kept for the
reasoning, which ADR-024 builds on.

Rik raised the problem (a stranger saw a black void with no hook and no "whose site is
this"). The fix: a hero carrying Rik's name, one line of identity, a living point-cloud
demonstrating Focus, and a prominent way into the world — a promise of the aesthetic, not
a landing page (no menu, no scroll, no marketing). See **ADR-024** for the current form
(it is the `/` header, not a gate) and `03-ART-DIRECTION.md` §Document Mode for the spec.

---

## ADR-016 — Rebalanced act allocations

**Status:** Accepted · **Claude's call — Rik raised the problem**, 2026-08-19.
Rik identified the lopsided emotional ratio and asked whether it was tunable. Every
specific `t` and `scrollGain` value below is Claude's, and all are data rather than code.

**Context.** Rik observed that the Market spanned only `t` 0.36–0.60 — 24% of the
journey — while the remaining 76% was cold or unwelcoming, and that 36% of the
journey elapsed before any warmth arrived. He was right; the emotional ratio was
badly lopsided for a stranger.

**Decision.** Rebalance the act `t` ranges and `scrollGain` values so warmth arrives
sooner and lasts longer: **warm span 24% → 34%** of the journey, **time-to-first-warmth
36% → 28%**, and the over-long Approach shortened. Warmth then **drains gradually** rather
than switching off — the Climb keeps residual warmth through its first half and the
Wardens are reverent, not cold; only the Figure goes genuinely cold again.

**The current values live in `01-NARRATIVE.md`** (the act table) — this ADR records the
decision, not a second copy of the numbers. They are Content Graph data, re-tunable in one
file once the world is walkable.

**Why.** A stranger needs a reason to care before the site asks anything of them, and the
Market is the only part that does that work.

**Note on pacing:** `t`-span is not time — perceived duration ≈ `tSpan / scrollGain`, so
`scrollGain` is the real pacing instrument (the Market's 0.7 lingers; the Reach's 0.5
slows the ending). `04` and `06` budgets are unaffected.

---

## ADR-017 — The ambient cursor field and parallax

**Status:** Accepted · Decided by Rik, 2026-08-19

**Context.** Rik identified a missing influence: pervasive cursor interactivity —
parallax and distortion following the pointer, specifically evoking "the exact
thing you saw when you were a child running your nail hard across a switched-off
LCD screen." He also asked for parallax sprinkled artistically throughout.

**Decision.** Add a **global ambient response layer**, present everywhere in the
world at all times:

1. **Cursor displacement field.** A radial displacement applied to all nearby
   points in screen space, with a brief chromatic separation at the leading edge
   and a decay of roughly 300ms. This is the LCD-press look: displaced liquid
   crystal blooming outward with colour fringing, settling back.
2. **Depth parallax.** Pointer movement offsets point layers differentially by
   depth, continuously and subtly, everywhere.

**This is not a sixth interaction verb.** It is ambient — the world being alive and
attentive, not an affordance. It carries no `EMBER`, and it never indicates that
something can be acted upon. The Ember rule is unchanged, and this distinction must
be preserved or the world stops being learnable.

**Why.** Beyond being what Rik wants: it strengthens the thesis considerably.
Foreshadows F1 and F2 already establish that the world responds to the Witness's
attention. Making that response *continuous and physical everywhere* means the site
is restating "you are the missing half" every time the pointer moves — which is
exactly the kind of structural foreshadowing ADR-002 depends on.

**Explicit exception to an anti-pattern.** `03-ART-DIRECTION.md` forbids chromatic
aberration. The LCD-press fringing is permitted **as this effect only** — it is a
reference to a specific physical phenomenon, tightly scoped and short-lived, not a
stylistic filter. A future session must not delete it citing the anti-pattern list.

**Consequences.** Both effects must degrade under `reduced-motion` (parallax off,
displacement reduced to brightness-only) and `photosensitive-safe` (no chromatic
separation). Touch devices have no hover, so the field triggers on tap and decays —
meaning mobile loses the ambient layer and needs its own liveliness check. Costs
frame budget; measure it.

---

## ADR-018 — Controls and accessibility options are surfaced upfront

**Status:** Accepted · Decided by Rik, 2026-08-19

**Context.** Rik: "It would be annoying to struggle with something only to know
later that there was an easier way." Correct, and the original spec buried the
preferences in a settings panel.

**Decision.** Three layers:

1. **On the entry gate (ADR-015):** a compact, always-visible summary of movement
   controls and the available accessibility modes. Not hidden behind a link.
2. **A help panel** on `?` and on a persistent visible button, listing every
   control and every preference with its current state. Reachable from anywhere,
   at any time, without leaving the Spine.
3. **First-use hints**, shown once each, for the two non-obvious mechanics — free
   look and the hover field — then never again.

**Why.** Discovering an accessibility feature after struggling is worse than not
having it. This is the same principle as the Figure never demanding the Reach: the
site should never make someone feel they got it wrong.

**Consequences.** The controls list must be generated from the actual key map
rather than hand-maintained, or it will drift. A test asserts every binding in the
input layer appears in the help panel.

---

## ADR-019 — Dependency policy: lift the plumbing, build the thesis

**Status:** Accepted · Decided by Rik, 2026-08-19

**Context.** Rik asked to maximise use of existing open source rather than
building from scratch. Research found that three systems specified as hand-written
already exist as maintained libraries.

**Decision.** Adopt `12-DEPENDENCIES.md` as policy. Summary: anything that *is* the
site's identity is bespoke; everything else is an import. Adding a dependency
requires an ADR naming what it replaces.

Three specific reversals of earlier plans:

- **`lenis`** replaces the hand-written input layer. It wraps native scroll rather
  than replacing it, so accessibility behaviour survives, and
  `respectReducedMotion` defaults to true.
- **`MeshSurfaceSampler`** (ships with three) replaces the sampling core of the
  baking tool. `setWeightAttribute()` implements the density grammar via painted
  vertex colours.
- **`@react-three/drei`** replaces the adaptive performance tier system
  (`PerformanceMonitor`, `useDetectGPU`, `AdaptiveDpr`), loading progress
  (`useProgress`), and shader-material boilerplate.

**Rejected:** drei's `ScrollControls`, because it owns the scroll container and
would conflict with Lenis and with per-Station `scrollGain`. The rule it
illustrates: reject anything that owns the render loop, the scroll container, or
the state model.

**Why.** Hand-writing plumbing on a project this size is a mistake rather than
craftsmanship, and the saved time goes into the parts nobody else could build.

---

## ADR-020 — Orchestrator / implementer split

**Status:** Accepted · Decided by Rik, 2026-08-19

**Context.** Rik's intended build loop: Claude Opus/Fable 5 as orchestrator and
planner, spawning Codex CLI agents for the actual coding, with the orchestrator
selecting model and effort per task — effort high by default, model varying with
complexity.

**Decision.** Adopt `11-AGENT-PROTOCOL.md`. Claude orchestrates, plans, routes,
reviews, and never delegates decisions or spec changes. Codex agents implement one
task each and are disposable.

**Why this matters more than it looks.** Implementers are **context-poor** — they
have not read the specification and never will. Therefore every task brief must be
*self-contained*, inlining the specific invariants, values, and file boundaries it
needs rather than referencing documents. This makes task decomposition quality the
main determinant of output quality, and it is why `docs/prd/` and `docs/tasks/`
become required artifacts rather than nice-to-haves.

**Consequences.** A review gate is mandatory: the orchestrator reads every diff and
runs every acceptance command, because an agent reporting success is evidence
rather than proof. Anything touching the shaders, `engine/focus/`, `engine/spine/`,
or `a11y/DomMirror` is routed to the most capable tier regardless of apparent size.

**Model tiers** (answered by Rik, 2026-08-19):

- Capable tier — **`gpt-5.6-sol`** — classes A and B
- Faster tier — **`gpt-5.6-terra`** — classes C and D

Effort is `high` by default for every class.

---

## ADR-021 — The Market sells everything, not only jobs

**Status:** Accepted · **Claude's call — Rik raised the problem**, 2026-08-19.
Rik asked how the Market could show a thin work history; the three-class scheme is
Claude's.

**Context.** Rik asked how the Market renders work history, noting his experience
is "unfortunately not a lot." A market of two stalls is not a market, and mapping
stalls one-to-one onto jobs made the Act's scale hostage to résumé length.

**Decision.** Stalls come in three classes:

| Class | Contents | Placement |
|---|---|---|
| **Anchor** | Real roles and jobs | Large, on the main street, unmissable |
| **Secondary** | Things made that are not portfolio-grade — experiments, tools, scripts, one-offs, coursework worth showing | Behind and between the anchors |
| **Background** | Skills, languages, tools, and things Rik is simply into. A stall selling regex cheap. A stall of anime recommendations. A coffee stall. | Populating depth and edges |

Within an anchor stall, the mapping is physical: the awning carries a point-cloud
glyph for the organisation; a mono label on the counter gives the role and dates;
**each accomplishment is one ware on the counter**, pokeable, revealing a line; the
vendor's hanging tools are the stack; the vendor's line on approach is the outcome;
the side-street Alcove holds the full prose. Older roles are visibly more weathered.

**Why.** It decouples the Market's scale from résumé length, which is essential for
an early-career portfolio. It is also *better* for one — it foregrounds range and
curiosity over years served. And background stalls are where the Fun budget lives,
so they are effectively unlimited: a thin résumé no longer produces an empty market.

**Consequences.** The Content Graph needs a `stallClass` field and collections for
secondary and background items, not just `roles`. Projects remain Mirrors (Act 6)
and are **not** duplicated as stalls.

---

## ADR-022 — Immediate feedback is decoupled from travel

**Status:** ✅ **Accepted by Rik, 2026-08-23** ("they sound sort of odd but since it's
just text, it can easily be swapped out"). The mechanism stands; the exact copy is
placeholder. See also ADR-040 — users who dislike smooth scroll can disable it.

**Context.** Rik challenged the Void's 1.2s delay before any scroll hint, worried a
visitor would think the site was broken and leave.

**Assessment.** The 1.2s hint delay is not the risk — and with the entry gate now
acting as hero (ADR-015), the Witness has actively chosen to enter and is not
wondering whether the page loaded. But Rik's instinct was pointing at a real defect
one step over: the Void's `scrollGain` of 0.25–0.35 means **the first several
hundred pixels of scroll produce almost no visible travel.** That genuinely does
read as "broken," and it is a far bigger bounce risk than an absent hint.

**Decision.** Separate *responsiveness* from *travel*. The world must react
visibly and immediately to the very first scroll input even though `t` barely
moves: on first input, points surge, brighten, and drift toward the camera, and the
distant smudge pulses once. Feedback is instantaneous; progress remains slow.

The hint itself appears at 1.2s, unchanged, and is retained.

**Why.** It preserves the deliberate heaviness of the opening — which is doing real
work, teaching that scroll means time rather than distance — while removing the
ambiguity about whether the site is functioning. The failure mode was never "too
slow," it was "no acknowledgement."

**Consequences.** A test asserts that a measurable visual delta occurs within
100ms of the first scroll event at `t = 0`.

---

## ADR-023 — Audio: procedural base plus commissioned peaks

**Status: SUPERSEDED by ADR-025** (audio descoped entirely). This proposed a hybrid of
procedural ambient + commissioned stems + CC0 diegetic sound, driven by a Focus low-pass
filter. Rik later dropped audio for now. Retained so citations resolve.

---

## ADR-024 — Document Mode is the default; the hero merges into it

**Status:** Accepted · Decided by Rik, 2026-08-19 · **Supersedes ADR-015's
separate-screen structure** (the hero concept survives; the standalone gate does not)

**Context.** Rik proposed making Document Mode the default to minimise friction for
recruiters with minutes to spare and for crawlers.

**Decision.** Accepted, and taken one step further: **the entry gate ceases to exist
as a separate screen and becomes the header of Document Mode.**

| URL | Serves |
|---|---|
| `/` | **Document Mode** — canonical, instant, ~5 KB JS, crawlable |
| `/world` | World Mode |
| `/doc/<slug>` | Individual content |
| `/accessibility` | Accessibility statement |
| `/resume.pdf` | Generated PDF (ADR-026) |

`/`'s header carries what ADR-015 specified for the gate: Rik's name, one line of
identity, a living point-cloud element demonstrating the Focus mechanic in
miniature, and a prominent, unmissable **"Enter the world"** invitation above the
fold. Below it, the document continues as a normal page.

Clicking through to `/world` shows a thematic transition — points assembling into
form, with real progress — which covers shader compilation and asset loading and
doubles as the site's first demonstration of Focus.

**No automatic redirection to World Mode, ever**, including for returning visitors.
Auto-redirect would break crawlers and break the promise the default makes.
Returning visitors (Second Sight) get a marginally more prominent invitation and
nothing more.

**Why.**
- Zero friction for the majority of real visitors: recruiters, hiring managers,
  crawlers, and anyone on a phone.
- `/` becomes the SEO and social-preview surface with real content on it.
- The accessible rendering is now the *default* rather than something routed to,
  which is a stronger position than the original design held.
- It removes a whole screen, the mode-detection routing in `04-ACCESSIBILITY.md`,
  and (with ADR-025) the audio-consent step. The architecture gets simpler.
- It is honest about what the site is: the document is canonical, the world is a
  lens over it.

**The cost, stated plainly.** The world becomes vestigial if the invitation is
weak. Most visitors will now form their impression from a document, and only the
curious will click. **This makes the hero point-cloud and the CTA a hard design
requirement, not a flourish** — they carry the entire burden of getting anyone into
the world at all. Added as an **[R]** exit criterion on Phase 0.

Minor loss: the Void's cold open is slightly less disorienting when preceded by a
document. Arguably a gain — the Witness knows whose mind they are entering.

**Consequences.** The auto-routing rules in `04-ACCESSIBILITY.md` collapse to: the
"Enter the world" invitation is hidden or carries a warning when WebGL2 is
unavailable, and is de-emphasised under `prefers-reduced-motion`. Phase 0's
deliverable becomes the whole public face of the site rather than a fallback.

---

## ADR-025 — Audio is descoped to optional procedural sound after launch

**Status:** ✅ **RATIFIED by Rik, 2026-08-23** · Supersedes ADR-023 and ADR-009

> Rik: "we are going to avoid it completely for now and then add procedural sounds at
> the end of the project timeline." That is exactly this ADR. No longer unconfirmed.
> The site must be complete and excellent silent; procedural sound is optional Phase 11.

**Context.** Rik proposed dropping audio entirely, citing too many unknowns, and
asked for an honest assessment between dropping it, deferring it to last, or
keeping only small procedural sounds instead of a composed score.

**Decision.** Formally descope composed audio. **Delete Phase 8 as specified** — no
commissioning, no licensed stems, no score. Add an **optional post-launch Phase 11**
covering procedural sound only, built with `tone`: a handful of interaction sounds,
a Focus-tracking drone, and procedural Market texture. No audio assets, no money,
no external people, roughly 3–5 days once everything else works.

**Hard rule: nothing may depend on audio.** The site must be complete and excellent
silent. Plan as though Phase 11 will never happen; if it does, it is a bonus.

**Why — and this includes correcting an earlier claim of mine.**

`04-ACCESSIBILITY.md` asserted that the Focus-driven low-pass filter let a blind
Witness "perceive the central mechanic of the site," and called it the best idea in
the document. On examination that was **elegant design writing rather than sound
accessibility reasoning**, for three reasons:

1. Screen-reader users are listening to synthesized speech. Background ambient
   audio competes with and degrades speech intelligibility — which is why
   WCAG 1.4.2 exists at all. Many such users actively avoid sites with background
   audio.
2. Site audio must be off by default. So the mechanism required a blind visitor to
   deliberately enable background audio that interferes with their primary
   interface. Vanishingly unlikely.
3. Even then, a filter sweep only reads as "blur resolving" if you already know the
   visual metaphor it refers to.

**What actually serves non-visual Witnesses** is genuinely good per-Station
*descriptive* text in the DOM mirror — a sentence describing the visual state, not
just the Station's name. "The corridor: narrow and tall, the points now resolved
into close walls, light far ahead." That works *with* a screen reader instead of
against it, costs nothing, and is available from Phase 2.

The remaining arguments for descoping:

- **Audio is off by default, so it can only ever be additive.** Designing the
  emotional climax around something most visitors will not hear is bad design at
  any budget. Therefore **the Reach must land on visuals alone** — now an explicit
  Phase 4 exit criterion regardless of audio's fate.
- **The unknowns are real and larger than listed:** AudioContext gesture-unlock
  requirements, iOS hardware-silent-switch behaviour, mobile decode memory,
  licensing that gets worse if the site is ever used in a reel, commissioning money
  and multi-week lead times, the stems problem that drove ADR-023, file size
  against a 6 MB budget, and no music background from which to judge quality or
  iterate quickly.
- "Keep it but leave it last" was the weaker option: in a plan this long, *last*
  means *never*, while the documentation burden for a phantom phase stays alive.
  Descoping is the honest version of the same outcome.

**Consequences — several are simplifications.**

- The entry gate loses its audio-consent job entirely, which converges neatly with
  ADR-024's merge of the gate into the document header.
- The AudioContext gesture-unlock problem disappears.
- Content inventory item #18 disappears, as does the composer-commissioning entry
  in `STATUS.md`.
- Roughly four weeks are freed; they should go to the Market and to polish.
- The `audio` preference stays in `prefs.ts` from Phase 0 — it is nearly free, and
  it means Phase 11 slots in without refactoring — but it defaults off and controls
  nothing until Phase 11 exists.
- `03-ART-DIRECTION.md` §Audio and `04-ACCESSIBILITY.md` §Screen readers both need
  correction under `P0-T00`.

---

## ADR-026 — Tooling, round two

**Status:** Accepted · 2026-08-19 · Extends ADR-019

Findings from a second research pass, adopted into `12-DEPENDENCIES.md`.

**`@react-three/a11y` — partial adoption.** Provides tab traversal, roles
(`content` / `button` / `togglebutton` / `link`), `aria-pressed`, alt text, and an
`<A11yAnnouncer/>` that supplies the polite live region for free. Adopt it for
per-object focus and roles — the Mirrors, the wares, the Reach.

**It does not replace the DOM mirror.** Its own README describes focus as
*emulated* and handled at the React component level rather than as native DOM
elements. `04-ACCESSIBILITY.md` requires real `<section>` and `<button>` elements in
narrative reading order, so `a11y/DomMirror` stays bespoke. Recorded explicitly so a
future session does not assume this library solved it. License is not stated on the
repo page — confirm before adopting.

**Playwright Clock API — replaces half the determinism harness.** It overrides
`requestAnimationFrame`, `performance`, `Date`, and all timers, and `pauseAt` plus
`runFor` gives true frame-stepping. This means **the engine does not need an
injectable clock**: it can use `requestAnimationFrame` normally and tests control
time from outside. Less code and a cleaner engine. Caveat: `install` must be called
before any other clock call. Seeded randomness is still needed app-side
(`pure-rand` or `seedrandom`).

**`eslint-plugin-boundaries` (MIT) — adopted.** Declarative deny-by-default layer
rules, which is a proper implementation of the `src/engine/` import restriction
rather than a hand-maintained `no-restricted-imports` list.

**PEAT — adopted as a manual Phase 10 cross-check, not for CI.** Free
photosensitivity analysis from the Trace Center, testing WCAG general-flash and
red-flash thresholds. Constraints: Windows-only (Rik is on macOS, so this needs a
VM or another machine), requires `.AVI` conversion, its capture function is
unreliable, and it is aging. Not viable in CI, so the bespoke FFT check in
`04-ACCESSIBILITY.md` stays — but PEAT provides a valuable *independent second
opinion* on the most dangerous part of the design, which means the CI check does not
have to be perfect. Its licence bars commercial broadcast/film/gaming use; a
personal portfolio is unaffected.

**`stylelint` + `color-no-hex`** enforces the tokens rule in CSS directly, which is
better than the grep originally specified.

**Resume PDF generated from the Content Graph.** `/resume.pdf` is produced by
Playwright's `page.pdf()` against a print stylesheet over Document Mode content,
rather than being a file Rik maintains separately. **This extends the single source
of truth to the résumé, so it can never contradict the site** — and it removes
content item #8 as a manual deliverable. Rik's existing résumé becomes source
material for the Content Graph instead of an artifact to keep in sync.

**Also adopted:** `satori` or `astro-og-canvas` for generated OG images; `culori`
for programmatic contrast checking; `gltf-transform` for optimising Blender exports
before baking; `rollup-plugin-visualizer` for bundle-budget enforcement;
Playwright's built-in `toHaveScreenshot()` for visual regression, needing no extra
library. For the anamorphic `RIK`, `TextGeometry` sampled with `MeshSurfaceSampler`
covers text-to-points with no bespoke work.

**Rejected:** drei's `MotionPathControls` — it would own the camera, violating the
ownership rule in `12-DEPENDENCIES.md` §Policy.

---

## ADR-027 — Market stalls may preview Mirror subjects

**Status:** ✅ **Accepted by Rik, 2026-08-23** ("fine with this for now") · **Amends ADR-021**

**Context.** With the résumé available, the Market's anchor tier turned out to hold
exactly **one** entry: the AWS Outposts internship. ADR-021 forbade projects from
appearing as stalls (they are Mirrors in Act 6), which left the main street of a
34%-of-the-journey Act carrying a single anchor.

**Decision.** Reverse the no-duplication rule. **A subject may appear both as a
Market stall and as a Mirror**, because the two show different things:

- **The stall shows the *thing*.** A robot arm on a counter. A phone running a
  driver app. Physical, glanceable, pokeable.
- **The Mirror shows the *work*.** The IK solver, the 5 mm error bound, the
  offline-first sync design, the process.

**Why this is an improvement rather than a compromise.** Passing something in the
Market and then meeting it properly in a Mirror an act later is a **payoff
structure**, not repetition — the Market plants, the Mirrors pay off. That is the
same mechanism the Foreshadow Ledger runs on, applied to content instead of theme.
It also means the Market's density no longer depends on employment history, which
for an early-career portfolio is the difference between a market and a corner shop.

**Consequences.** Anchor stalls become: AWS Outposts, KneadTech, Continuum, and
NATHacks-as-a-three-year-engagement — four, not one. The Content Graph's
`stallClass` field stays; the constraint that a Mirror subject cannot have a stall
is deleted. Stall copy and Mirror copy must be written to different briefs, or the
repetition becomes real.

---

## ADR-028 — Content resolutions from the résumé

**Status:** ✅ **Accepted by Rik, 2026-08-23** ("fine with this for now") · Source:
`resume-source.pdf`.

Decisions made possible by having the actual content. Each was previously an Open
question or an unknown.

**Five Mirrors** (`09` Open question closed). Continuum, KneadTech, LuckyYou,
NeuroDrive, Focus Flow. Five sits inside the 4–8 target and gives the Warden ring a
workable composition. Continuum leads — it is the technically deepest and the only
one with an award.

**The neurotech thread is a recurring motif.** NATHacks spans Nov 2023 – Nov 2025
and produced all three EEG prototypes plus the award. That is a genuine
three-year throughline, and `00-VISION.md` explicitly wants "a recurring visual
motif that accrues meaning." Use it: the Muse 2 / EEG / signal-processing material
should share a visual language across its stall and its Mirrors so a Witness
recognises it recurring without being told.

**Climb tiers: by year, five of them, top tier visibly unfinished.** Aug 2022 –
Apr 2027, so the final tier is under construction at time of writing. This is a
gift from the real content: the education architecture is *literally incomplete*,
which rhymes with the Figure never resolving and with `globalFocus` never reaching
1.0 before the Reach (Foreshadow F6). Do not smooth it over — build the top tier
unfinished and let it stay that way.

Rejected alternative: grouping courses by theme (systems / theory / ML / data /
practice). Cleaner distribution across only seven named courses, but it discards the
ascent-as-chronology reading and the unfinished top tier, which are worth more than
even spacing.

**The AWS internship is in progress.** Jun 2026 – Sep 2026, and today is
2026-08-19. Document Mode must render it in present tense until it ends, so the
`roles` schema needs a nullable `end` and a derived `current` flag rather than
hardcoded past tense.

**Contact surface: email, GitHub, LinkedIn. The phone number is excluded.** A phone
number on a public page is a scraping and spam liability with no upside for a
software role. It stays in the PDF-source material and never reaches the site.

**Every résumé bullet already carries a number** — 150s→12s, 5 mm, 60 FPS, 30%,
50%, 10min→2min, 100+, sub-200ms, 10–15 iterations. This is Rik's strongest signal
and it must survive into both renderers.

Two consequences:
1. Document Mode's prose must not soften the numbers into adjectives.
2. **The wares on a stall can be the numbers themselves.** Poking a ware on the AWS
   stall reveals `~150s → ~12s`. The mechanic in `01-NARRATIVE.md` Act 4 — one ware
   per accomplishment, pokeable, revealing a line — maps onto the existing content
   with no invention required. This is the cheapest, best-aligned content mapping in
   the project.

---

## ADR-029 — The Mirrors: AWS excluded; set revised after the GitHub audit

**Status:** ✅ **Accepted by Rik, 2026-08-23** ("I'm fine with this") · **Superseded on
Mirror count by ADR-035** (five, not six; the CV project is dropped).

**Context.** Rik asked whether the AWS internship should become a Mirror, offering to
drop a project to make room. Separately, an audit of `github.com/Rik-Mukh` surfaced
work absent from the résumé.

### AWS stays out of the Mirrors

**Decision.** No. It remains the dominant anchor stall in the Market, with a
side-street Alcove for depth.

**Why.**
1. **NDA surface.** The résumé's phrasing has already been vetted for a résumé. A
   Mirror is a *deep dive with a diorama* — internal AWS architecture, at length,
   with visuals. That is a materially different disclosure risk for internal Outposts
   tooling, and the upside does not justify it.
2. **Category clarity.** `idea.md` states the Mirrors "lead to projects I have done."
   Employment lives in the Market; ADR-021 and ADR-027 made that mapping clean, and
   mixing the two muddies it for one entry.
3. **It is not under-served.** After ADR-027, AWS is the largest anchor stall on the
   main street with three pokeable numbered wares, plus an Alcove that reaches
   Mirror-level depth without being a Mirror.
4. **Scarcity was the premise, and it is false.** The audit shows Rik has *more*
   Mirror-worthy work than there are slots. The constraint is curation, not supply,
   so nothing needs dropping to make room for anything.

If Rik overrules this, note that six Mirrors is still inside the 4–8 target, so no
project need be dropped either way. The weakest candidate is LuckyYou.

### The GitHub audit

Ten public repos. Material not in the résumé:

| Repo | Note |
|---|---|
| `3D-Scene-Reconstruction` | Rebuilds a scene in 3D from a video shot circling an object — frame extraction, camera-motion estimation. MIT. Dec 2025. |
| `Stereo-Vision` | Depth map from two arbitrary images of a static scene. Python, MIT. Dec 2025. |
| `AR-Cube-Demo` | Places a virtual cube on a real checkerboard via single-image pose estimation. Python, MIT. Dec 2025. |
| `Neural-Drive` | The résumé's NeuroDrive. Nov 2023. |
| `Knead-a-Job` | "401 Hackathon Repo", Sep 2025 — possibly KneadTech's origin. **Ask Rik.** |
| `NeuralLlama` | Python, Nov 2024, no description. **Ask Rik.** |
| `NNN` | C#, Dec 2023, 2 forks, no description. **Ask Rik.** |
| `Rik-Mukh.github.io` | CSS, Sep 2024 — a previous portfolio attempt (ADR-030). |
| `portfolio` | Next.js scaffold — a previous portfolio attempt (ADR-030, ADR-032). |

### The computer-vision Mirror (the idea)

The three computer-vision repos are one Mirror — "seeing in three dimensions" — not
three, the way NATHacks is one engagement. The alignment is the point: Rik's CV work
recovers 3D structure from 2D images, and this site *is* a 3D point-cloud world, so that
Mirror can show a reconstruction rendered in the world's own material language — the site
demonstrating the work by being made of it.

> **Corrected by ADR-035:** the flagship repo `3D-Scene-Reconstruction` turned out to be
> empty and was dropped. The Mirror survives on the two real repos (`Stereo-Vision`,
> `AR-Cube-Demo`), less spectacular but still on-theme. The final **five-Mirror** set and
> the speculative reconstruction-baking idea (also dropped) both live in **ADR-035** — do
> not use the six-item list that was here.

---

## ADR-030 — The failure stall is this website

**Status:** Accepted · Decided by Rik, 2026-08-19

**Context.** ADR-021 called for one stall honestly discounting a genuine failure, and
`07-CONTENT-INVENTORY.md` flagged that nothing in a résumé is ever framed as one. Rik
supplied the answer: his own repeated failed attempts at this site.

**The three predecessors** (confirmed by Rik, 2026-08-19):

1. **v1** — `github.com/Rik-Mukh/Rik-Mukh.github.io`. A simple static site, "mostly
   stolen off a friend's."
2. **v2** — `github.com/Rik-Mukh/portfolio`. A YouTube-style site where each video
   would be a project or course. Never went anywhere; the repo is a
   `create-next-app` scaffold with 7 commits.
3. **v3** — **exists nowhere.** An attempt at the exact idea in `idea.md`. It "didn't
   come out right," the assets were never added, and it **"feels very distinctly AI
   generated,"** so Rik never pushed it.

**Decision.** A Market stall sells all three, discounted, honestly labelled. The
vendor is standing inside the fourth attempt and knows it.

Candidate wares — final copy `[NEEDS RIK]`:
- *"v1. Mostly someone else's. Free."*
- *"v2. A video site. No videos. Reduced."*
- *"v3. Looked like nobody made it. Not for sale."*

**v3's ware is the best line available**, and it comes straight from Rik's own reason
for abandoning it. It works on three levels: it is literally true; it is the sharpest
possible statement of what v4 is trying not to be; and it restates `00-VISION.md`'s
core value — *"authentic and human… not like it was put together with no thought or
vision"* — as a joke on a market stall. Everything else in the stall is discounted;
v3 is **not for sale**, because it was never real.

**Why this is the best possible answer.**
- **It is recursive.** The site admits it is the fourth attempt *while being the
  fourth attempt*. The joke is load-bearing rather than decorative.
- **It is thematically exact.** The thesis is that creation is unfinished without a
  witness. The Figure never resolves. The top Climb tier is literally under
  construction. Now the site itself has three unfinished ancestors. Four
  restatements of one idea, and only one of them was designed.
- **It is the register the Market needs** — funny, warm, and completely honest, with
  no self-deprecation that asks for sympathy.
- **It is real.** No invented humility.

**Consequences.**
- Adds **Foreshadow F9** to the Ledger: *the site tells you it has failed before,*
  paying off F7 (creation is not finishable alone).
- **Do not delete the old repos.** They are now content. ADR-032 preserves them on a
  legacy branch rather than destroying them — deleting the evidence of a failure you
  intend to display would be absurd.
- The stall may optionally link to the dead repos. Rik's call.

---

## ADR-031 — Personality content for background stalls

**Status:** Accepted · Decided by Rik, 2026-08-19

**Context.** ADR-021's background tier needed content, and the Fun budget needed
somewhere to live. Rik authorised reuse of all of `idea.md`, not only the anime
material, plus additional interests.

**Source material.** From `idea.md`: Mob Psycho 100, Attack on Titan, One Piece,
Monster, Berserk, The Boxer, Breaking Bad, Dark, Game of Thrones (*"NOT THE ENDING
OMG PLEASE"*), Interstellar, Tenet, Jojo Rabbit, Expedition 33. Added 2026-08-19:
books (1984, Crime and Punishment), FPV drones, bouldering, and games (CS2, Valorant,
Apex — *"best FPS game imo"* — Expedition 33, Gris). Plus a stated habit of picking up
new hobbies.

**Decision.** Background stalls are drawn from this material. Candidate set, final
selection `[NEEDS RIK]`:

**All of these obey the diegetic translation rule (ADR-033): nothing modern appears as
itself.** Rik's corrections of 2026-08-19 are folded in.

- A bookseller with exactly two books, and strong opinions about both.
- A **clockwork bird — a mechanical crow** — that periodically crashes into the
  neighbouring stall. *(Not an FPV drone. ADR-033.)*
- Someone cheerfully failing to climb an **old brick wall** — medieval brick, not
  modern red. *(Not a bouldering wall. ADR-033.)*
- A stall pushing story recommendations aggressively at passers-by.
- A stall that refuses to sell the ending of Game of Thrones. Everything else must go.
- A games stall where Apex is labelled **"the best war game"** and the vendor is ready
  to argue about it. *(Not "best FPS". ADR-033.)*
- Expedition 33 and Gris in a quiet corner, about beauty rather than play.
- A stall selling regex, cheap.
- The coffee stall.
- ~25 skill stalls from the résumé's languages, frameworks, and tools.

**The pattern to notice:** Rik's three corrections were all the same correction —
translate the modern object into the world's idiom rather than importing it. That is
why it was generalised into a governing rule in ADR-033 rather than applied
case-by-case here.

**The observation worth keeping.** Rik is a self-described beginner at bouldering,
"very bad" at FPV, and routinely picks up new hobbies — which is **the same trait** as
liking problems he doesn't understand. Being bad at something on purpose. The Market
should read as the inventory of a person comfortable being a beginner, not as a list
of competencies. That framing is what stops the background tier feeling like a skills
cloud.

**Constraint retained from ADR-005.** Every joke stays attached to something real, and
the Figure never jokes.

---

## ADR-032 — Repo, domain, and hosting

**Status: SUPERSEDED by ADR-034**, which carries the current, locked repo plan (one repo,
history preserved on `legacy/v2-nextjs`, Vercel, `rikmukh.online`). This earlier version
proposed a `legacy/v3-nextjs` branch name and kept the repo named `portfolio`; both were
revised in ADR-034. Retained so citations resolve.

---

## ADR-033 — Visual language: medieval Islamic and Indian architecture, sourced from geometry

**Status:** Accepted · **Direction decided by Rik; specifics are Claude's**,
2026-08-19 · **Amends `03-ART-DIRECTION.md` substantially. Does not amend ADR-007.**
Rik chose the medieval Arabian/Indian direction and delegated the specifics ("I'll leave
the specifics to you"). The geometry-not-palette argument, every per-act form, and the
rock-cut Figure are Claude's.

**Context.** Rik identified the real gap: the project had a palette, a particle
language, and a motion language, but **no cohesive visual or cultural vocabulary.**
Every space was described abstractly — "a corridor," "stalls," "stepped
architecture," "an unfinished figure." Abstraction is safe and gives a Blender
blockout nothing to hold onto. He proposed a medieval Arabian/Indian direction,
noting that real bazaars solve the Market and that the ascent could carry cultural
symbolism.

**Decision.** Adopt it. **And take the theme from geometry and ornament, not from
palette.**

### Why geometry rather than colour

This is the load-bearing part of the decision.

A point cloud renders **structure, not surface.** It cannot meaningfully render dyed
textile patterns, glazed tilework colour, or painted ornament — those are pigment,
and pigment is exactly what this medium throws away.

But Islamic and Indian architecture are, at their core, **pattern-and-geometry
traditions rather than pigment traditions.** Jali (perforated stone screens),
muqarnas (stalactite vaulting), arabesque, stepped merlons, pointed and scalloped
arches, corbelled brackets — all of it is *solid and void*, which is precisely what a
point cloud is made of.

**A jali screen rendered as points is not a compromise. It is the ideal case** — a
pattern of holes and stone, expressed in a medium that is nothing but presence and
absence. The medium and the tradition want the same thing.

So: **ADR-007's palette is unchanged.** Four tokens, hue carries no meaning,
colour-blind safety stays free, contrast stays trivially controllable, and the Ember
rule keeps its power through scarcity.

Rik previously considered and rejected exactly the palette this theme would suggest
— "aged fresco: plaster, ochre, lapis" — in favour of restraint (ADR-007). That
choice still holds. Warmth in the Market comes from **light temperature and density**,
which ADR-007 already permits, not from new hues. If the Market still reads cold
after Phase 6, revisit with a new ADR rather than pre-emptively widening the palette.

### The diegetic translation rule

Generalised from Rik's notes on the personality stalls: **nothing modern appears in
the world as itself. Everything is translated into the world's idiom.**

- An FPV drone becomes a **mechanical bird** — a clockwork crow.
- A bouldering wall becomes someone climbing an **old brick wall** (medieval brick,
  not modern red).
- Apex is "the best **war game**," not "the best FPS."
- A laptop, a phone, a monitor, a GitHub logo: none of these exist here.

This rule governs dozens of future decisions and should be checked before any prop is
authored. It is also what keeps the Fun budget from breaking immersion.

### Per-act translation

| Act | Form |
|---|---|
| **The Void** | Unchanged. No architecture — that is the point. |
| **The Approach** | Unchanged. Density and light only. |
| **The Corridor** | A **vaulted covered-bazaar arcade** before it is legible as one. Pointed arches receding, jali screens on both sides filtering light from far ahead. Narrow, tall, cold. The jali is doing double duty: it is the correct historical form *and* it is why the Corridor's walls can later resolve into stalls — a screen is already half-open. |
| **The Name** | Monumental **carved inscription**, Latin letterforms cut in stone. **Not calligraphy** — Devanagari or Arabic script would be beautiful and would read as ornament rather than as his name to most visitors. Legibility wins (`00-VISION.md` non-goals). |
| **The Market** | A real **souk / bazaar**: vaulted arcade opening outward, textile awnings, spice mounds, hanging lanterns, brass, corbelled upper storeys. References: Isfahan's Grand Bazaar, Aleppo's covered souk, Chandni Chowk, Fatehpur Sikri. |
| **The Climb** | A **stepwell, ascended.** Chand Baori and Rani ki Vav geometry — criss-crossing symmetric flights, repeated modular geometry, spectacular as a point cloud and cheap to bake because it is one module tiled. A stepwell descends into darkness in reality; climbing *out* of one makes the Focus arc architectural. Supersedes the Mayan-pyramid-and-colosseum hybrid. |
| **The Wardens** | Figures in **temple niches**, jali screens behind them. Mirror-bearers as carved attendant figures — proportions slightly wrong, faces unresolved. |
| **The Figure** | **An unfinished rock-cut sculpture.** See below. |

### The Figure — resolving the one real conflict

The Creation of Adam is Italian Renaissance and Christian. Imported unaltered into a
medieval Islamic and Indian world it would be the single jarring object in the site.
`idea.md` also states the Adam pose is "very important," so it cannot simply be
replaced.

**Decision: keep the gesture, change the material.** The Figure becomes a figure
**half-emerged from living rock**, in the idiom of the unfinished rock-cut monuments at
**Ellora** and **Mahabalipuram** — real historical works, abandoned mid-carving, where
the sculpture is visibly still inside the stone. The outstretched hand and the absent
counterpart survive exactly as specified. Only the reference shifts, from fresco to
rock.

**This is stronger than the original, and three ideas converge on it:**

1. **Rock-cut sculpture is subtractive.** The figure was always in the stone; carving
   only removes what is not it.
2. **That is the Focus mechanic, stated in stone.** The world is already there in its
   authored positions; the Witness's approach is what removes the haze concealing it.
3. **Michelangelo said the same thing** about marble — that the sculpture was already
   inside and he merely freed it. So the Adam reference is not abandoned; it is
   grounded in the one philosophy Michelangelo shared with the rock-cut tradition.

ADR-006 already required the Figure never to resolve fully. An unfinished rock-cut
carving is that requirement expressed as a real historical object rather than as a
shader constraint.

### Cultural care

The direction draws on Rik's own heritage, so this is homage rather than
appropriation. That does not remove the craft obligation:

**Use specific real references, never a generic "Arabian Nights" aesthetic.** The
latter is a Western fantasy trope — genie lamps, magic carpets, onion domes as
shorthand — and it would directly undercut `00-VISION.md`'s stated value that the site
feel authentic and made with care. Every authored form should trace to a named
building. The reference board (`storyboard/SHOT-LIST.md` §Tools) is now the
highest-value artifact Rik can produce, and it should be photographs of real
architecture.

### Typography

**Keep Atkinson Hyperlegible and Instrument Serif** (ADR-011). A "themed" display face
is the fastest available route to pastiche, and Atkinson is an accessibility
commitment that does not bend to art direction. Reconsiderable later with an ADR; not
now.

### Consequences

- `03-ART-DIRECTION.md` gains a §Visual language section.
- **All eighteen frames in `storyboard/SHOT-LIST.md` are described in the old
  abstract idiom and must be re-described.** New task, before any blockout work.
- ADR-012's Blender blockouts get much easier to author — modular geometric
  architecture tiles, rather than invented abstract forms.
- The density grammar benefits: jali screens and muqarnas are *natural* density
  gradients, paintable as vertex colour for `setWeightAttribute()` (ADR-019).

---

## ADR-034 — Repo: one repo, history preserved on a branch

**Status:** ✅ **DONE 2026-08-25.** All steps executed and verified. Repo renamed to
`Rik-Mukh/rikmukh.online`; Astro scaffolded + flattened; v2 preserved on remote branch
`legacy/v2-nextjs` (`fb3008`); v4 published to `main` (`020d4c7`); Vercel building Astro
and serving the default page at `rikmukh.online`. Verified: private files
(`resume-source.pdf`, `scratch.txt`) are **not** in the published tree. · **Supersedes
ADR-032's execution plan**

**Context.** Rik proposed two paths: keep `portfolio` as the v2 artifact and move the
Vercel plumbing to a new v4 repo; or move v2's code to a new repo and overwrite
`portfolio` with v4, keeping the plumbing in place. He asked which is better or
easier.

**Decision: neither — a third option that is strictly simpler than both.**

**v2 does not need its own repository, because git history already preserves it.**
Pushing the current `origin/main` to a `legacy/v2-nextjs` branch keeps every commit
browsable on GitHub at a stable URL, forever, with no second repo to own and no Vercel
reconfiguration at all.

Plan — **not executed; do not run the git steps without confirmation.** Split between
Rik (interactive tools + web UIs) and Claude (git). Scaffolding is folded in — the project
is initialised with the **Astro** CLI, not a React CLI (Create React App is retired;
ADR-008). Rik drives the interactive CLI himself, by request.

**Rik — scaffold, interactive (`~/code/website`):**
1. `npm create astro@latest .` — target the current folder; continue past the "not empty"
   warning (it adds files, deletes nothing); template **Empty**; TypeScript **Strict**;
   install deps **yes**; new git repo **no** (one already exists here).
2. `npx astro add react mdx sitemap` — accept the installs and config edits.

**Rik — web UI:**
3. Rename the GitHub repo `portfolio` → the new name. GitHub permanently redirects the old
   URL; Vercel tracks by repo ID, so the deploy binding and domain survive — verify after.

**Claude — git, after Rik approves:**
4. Point the local repo at the renamed remote; `git fetch`.
5. Save the remote's current `main` as **`legacy/v2-nextjs`** (v2 preserved and linkable
   forever; ADR-030 depends on it).
6. Write `.gitignore` — **`resume-source.pdf`** (phone number, ADR-028), `node_modules`,
   build output (`dist/`), `.tmp-*`, `scratch.txt`.
7. Commit `AGENTS.md`, `docs/`, `idea.md`, and the Astro scaffold as the new `main`.
8. Force-push `main` (v2 already safe on the legacy branch).

**Rik — web UI:**
9. In Vercel, set framework preset Next.js → Astro; run a build and confirm.

**Why this beats both of Rik's earlier options.** Option A requires repointing Vercel or
migrating the domain; Option B requires a second repo for an artifact git already stores.
This needs neither: **zero Vercel rebinding, zero new repos, v2 fully preserved.**

**New repo name:** `[NEEDS RIK]` — likes `rikmukh.online`. (This reverses ADR-032's
"stay `portfolio`"; a plain "portfolio" reads oddly on his GitHub.)

**A small gift for the failure stall:** v4 is built directly on v2's grave, in the same
repository. Honest, and quietly on-theme. `Rik-Mukh.github.io` (v1) is untouched.

---

## ADR-035 — Mirrors corrected; the CV-reconstruction project is dropped

**Status:** ✅ **RATIFIED by Rik, 2026-08-23** · **Corrects ADR-029.** Rik: build the
website only, and "forget about that project completely."

**Context.** ADR-029 named `3D-Scene-Reconstruction` the flagship Mirror on the
strength of its GitHub description. **The repository is empty.** Rik has now decided to
drop it entirely rather than build it in parallel. He also identified the two unlabelled
repos and corrected the `Knead-a-Job` guess.

### Corrections to ADR-029

- **`3D-Scene-Reconstruction` is dropped entirely.** Empty repo, and Rik does not want
  to build it. Every reference to it as a flagship or future subject is withdrawn. The
  speculative idea of baking real objects through his reconstruction pipeline
  (ADR-029) is also dropped — do not revisit it at Phase 5.
- **`NNN` is NeuroDrive.** `NeuralLlama` is Focus Flow. Both feed the neurotech
  Mirror, and **Mirror slot 6 is closed** — there is no mystery repo.
- **`Knead-a-Job` is not KneadTech's origin.** It was a separate quick hackathon
  project that the same team did to get to know each other. It is a *secondary* stall
  in the Market, not a Mirror, and the two must not be conflated in copy.

**Revised Mirror set — five.** Back to ADR-028's count by a different route:

1. **Seeing in three dimensions** — `Stereo-Vision` + `AR-Cube-Demo`. Both exist,
   both Python, both MIT. Depth from two images; pose estimation from one.
2. **Continuum** — VR teleoperation, DLS IK, Honorable Mention.
3. **KneadTech** — real product, real users, 7-person Scrum.
4. **The neurotech thread** — `NNN` (NeuroDrive) + `NeuralLlama` (Focus Flow).
5. **LuckyYou** — Android, Firebase, Maps.

The thematic resonance argued in ADR-029 survives in weaker form: depth-from-images
and camera-pose estimation are still *about* recovering 3D structure from flat images,
which is still the site's central move. It is simply less spectacular than full scene
reconstruction would have been.

### Do not build it in parallel

**Recommendation: website only.** Three reasons, in increasing order of weight.

1. The Mirror works without it. Two real repos already carry the theme.
2. Adding a second project to a solo build this size is the standard way both die. Rik
   chose the no-compromise scope (ADR-004); adding scope on top of it inverts the
   mitigation that made that choice survivable.
3. **The strongest reason is sequencing.** Phase 1 builds the point-cloud baking
   pipeline (ADR-012, ADR-019). If scene-reconstruction code is written *after* that,
   the two can share code and Rik will know exactly what output format is useful.
   Written now, blind, it risks solving the wrong problem and producing output the
   baker cannot consume.

**Decided 2026-08-23:** Rik dropped the project entirely — do not revisit it at Phase 5,
and do not build it in parallel. Nothing in the project depends on it. The five-Mirror
set above stands; the "Seeing in three dimensions" Mirror uses only the two real repos
(`Stereo-Vision`, `AR-Cube-Demo`).

---

## ADR-036 — Restraint in the visual language, and its downstream effects

**Status:** Accepted · **Direction decided by Rik; downstream analysis is Claude's**,
2026-08-19 · **Amends ADR-033.** Rik asked for restraint and asked what it changed. The
restraint rule is his; the moiré finding, the legibility-floor change, and the motion
note are Claude's.

**Context.** Rik asked that the Arabian/Indian influence not be heavy — use the
references, but keep the specifics vague. He also asked what ADR-033 changes about the
palette, the particle language, and the motion language.

### The restraint decision

**References are for the author, not the audience.**

Blockouts are built *from* real buildings so that proportion, arcade rhythm, arch
profile, and stepped geometry are right. But **no form is ever named, no ornament is
rendered at a level that demands recognition, and no landmark should be identifiable.**
Nobody should be able to say "that's Chand Baori." The world should read as *somewhere
old, warm, and eastward* — not as Isfahan in 1590.

**Take silhouette and proportion. Drop the identifiable decorative motifs.**

Three reasons this is the correct call, not merely a preference:

1. **Most of the site is out of focus.** `globalFocus(t)` never exceeds 0.90 before the
   Reach (Foreshadow F6), and much of the journey sits between 0.4 and 0.9. At those
   values **a muqarnas vault and a plain vault are the same object.** Fine ornament is
   literally invisible for most of the runtime, so authoring it is work spent on
   something the medium discards.
2. **It preserves the ambiguity the original idea was built on.** `idea.md` wants a
   place where "you dont even know if its a room or a space," an *isekai* market — an
   invented world, not a reconstructed one. A recognisable real location collapses
   that.
3. **It is what the medium already does.** Rik's own description of the effect he
   loves: "the faintest sense of detail but not too much." Heavy specificity fights
   the aesthetic that motivated the project.

It is also cheaper. Fewer authored details, simpler blockouts.

**Guard against the opposite failure too.** Vague must not become generic. The forms
still come from real buildings — the vagueness is in *recognition*, not in rigour. A
shape invented from nothing will read as fantasy-generic, which ADR-033 already
rejected as pastiche.

### Effect on the palette — none

ADR-007's four tokens are unchanged. Warmth via light temperature was already
permitted and covers lantern and brass light without a new hue.

One observation worth recording: **`DUST` (`#E8E4DA`) already reads as pale weathered
stone** — limestone, sandstone. It was chosen for abstract reasons and turns out to
suit carved architecture better than the abstraction it was chosen for. Nothing to
change; worth knowing so a future session does not "warm it up" for the theme.

### Effect on the particle language — the render table is unchanged; density gains a source

The table in `03-ART-DIRECTION.md` §The particle language stands as written: shape,
size, opacity, jitter, colour, and bloom are all Focus-driven and theme-independent.

Three real changes around it:

1. **Density now has a structural source, not only an emotional one.** Previously
   density was authored per Station as a feeling (sparse / medium / dense). Architecture
   now *supplies* density structure — a perforated screen is an inherent alternation of
   solid and void. Painting it as vertex colour for `setWeightAttribute()` (ADR-019)
   means **perforated geometry effectively paints its own density.**

2. **New risk: high-frequency ornament versus the point budget.** Perforated screens
   are fine detail, and the theme's signature form is therefore the *worst case* for
   the legibility floor in `06-PERFORMANCE.md`. At `low` and `minimal` tiers a screen
   degrades to mush.
   - Perforated forms carry a **higher legibility floor** than open forms.
   - On low tiers reduce **screen area**, never point density — the same rule the
     Market uses for stall count.
   - **Never let ornament carry meaning**, since on weak devices it does not render.
     This is the same conclusion the restraint decision reaches from the other
     direction.

3. **Net performance win from modularity.** Repeated geometric modules — one screen
   panel, one arcade bay, one stepwell flight — bake once and instance many times. One
   draw-call family, one small texture. In aggregate this theme is **cheaper** than the
   bespoke abstract forms it replaces.

### Effect on the motion language — unchanged, plus one improvement and one new risk

Spring-damping everywhere, the single hard snap, no auto-advance, and idle drift are
all unchanged.

**One improvement.** ADR-006 requires the Figure to move *lazily*. As an unfinished
rock-cut carving, its noticing-and-extending motion should read as **the rock releasing
it** rather than a body flexing — points detaching from the surrounding stone and
resolving into the arm. That is more plausible than a fresco figure moving at all, and
it restates the subtractive idea in ADR-033 as motion.

**One new risk: moiré.** A point cloud is already a sampling of geometry. Sampling a
*perforated* pattern with points is therefore a double sampling — the textbook setup
for moiré. Layer two or three screens at different depths, then slide them against each
other with the ambient parallax layer (ADR-017), and interference shimmer is close to
guaranteed.

This is genuinely beautiful and genuinely a hazard: shimmer, aliasing, and potentially
luminance oscillation, which touches the 3Hz cap in `04-ACCESSIBILITY.md`.

Mitigations, all required:
- Cap how many perforated layers may stack in depth.
- Blur or reduce distant screens toward solid rather than resolving their holes.
- Constrain screen spatial frequency relative to point spacing at the current tier.
- **Include layered-screen traversals in the flicker FFT test**, at several parallax
  speeds. This is a new test case, not covered by the existing scripted traversals.

Noted also as a synergy: layered perforated screens are the *best available subject*
for the ambient parallax layer. The risk and the opportunity are the same feature, so
it must be tuned rather than avoided.

---

## ADR-009 — Audio posture

**Status: SUPERSEDED by ADR-025.** Audio is descoped to optional post-launch
procedural sound. There is no gated entry screen (ADR-024) and no composed score.
Retained so citations resolve.

---

## ADR-010 — Phase order: the climax before the Market

**Status: ✅ Accepted by Rik, 2026-08-23** ("fine with this for now").

Build the Figure and the Reach in Phase 4, before the Market in Phase 6. The Reach is
the highest-risk, highest-value beat and should be attempted while motivation is high;
the Market is the most expensive and the most cuttable.

**Needed by:** Phase 4.

---

## ADR-011 — Typography

**Status: ✅ Provisionally accepted by Rik, 2026-08-23** — "I like the typography for
now," with one condition: **final sign-off requires seeing it rendered.** Therefore the
font must be replaceable by touching one module (ADR-037). Treat the specific faces as a
default that will be visually confirmed, not as locked.

Body: **Atkinson Hyperlegible** — designed by the Braille Institute for character
disambiguation, genuinely handsome, and using the accessibility community's typeface as
the *default* rather than as a toggle is a values statement consistent with this
project. Display: **Instrument Serif**. Labels: a monospace. The dyslexia toggle adjusts
spacing, weight, and line height rather than swapping the face.

ADR-033 adds a reason to keep both: a "themed" display face is the fastest route to
pastiche.

**Needed by:** Phase 0.

---

## ADR-012 — Asset pipeline

**Status: UNRATIFIED — Claude's recommendation.** Cited as settled by
`03-ART-DIRECTION.md`, `06-PERFORMANCE.md`, `12-DEPENDENCIES.md`, and
`08-ROADMAP.md`. Rik has not confirmed it, though ADR-019 (which he did request)
partially depends on it.

Blender blockout geometry → a surface-sampling CLI in `tools/bake/` → float position and
colour textures consumed by the GPGPU system. The point-cloud aesthetic is highly
forgiving of low-detail source geometry, which is what makes the project
solo-feasible. The baking tool is a first-class deliverable.

**Needed by:** Phase 1.

---

## ADR-013 — Domain and hosting

**Status: SUPERSEDED by ADR-034.** Domain is `rikmukh.online` (already owned), hosting
is Vercel (already configured), routing is `/` Document Mode and `/world` World Mode
with no `?view=doc`. Retained so citations resolve.

---

## ADR-014 — Mirror text presentation

**Status: ✅ Accepted by Rik, 2026-08-23** ("fine with this for now"), conditional on the
final look and on the presentation being easily replaceable (ADR-037). Depends on how it
ends up looking.

Project prose renders as a Document-Mode panel composited into the world in the world's
own material language, rather than as a separate gallery page. Preserves immersion —
which Rik flagged explicitly in `idea.md` — while keeping text real, selectable, and
accessible.

**Needed by:** Phase 5.

---

## ADR-037 — The codebase is a first-class deliverable

**Status:** Accepted · **Decided by Rik, 2026-08-23.** One of his most strongly stated
requirements.

**Context.** Rik: the codebase must be immaculate — not only the code, but the code
structure and the file structure. It must be self-documenting: *a developer, without
reading a single comment or doc, can look at the directory structure, file names,
variable names, function names, and signatures and piece together how the codebase
works and how to work on it.* "A senior dev wrote this; a child can navigate it." This
is also the through-line behind three separate answers he gave (typography, Mirror
presentation, ambient effects): **anything must be replaceable without much work.**

**Decision.** Codebase quality is a graded deliverable, not a side effect. Standing
rules, enforced in review and where possible in CI:

1. **Self-documenting structure.** Directory and file names describe contents.
   Names carry meaning. No `utils/`, `helpers/`, `misc/`, `stuff/`. A newcomer finds
   the right file by reading names, not by searching.
2. **No inline user-facing strings — ever.** Every piece of copy, label, and message
   lives in a string catalogue and is imported by key. Two reasons: all copy becomes
   editable in one place, and **the site is translation-ready from day one** without a
   rewrite. This extends the Content-Graph principle (ADR-003) to UI text.
   *(Marks a future i18n path; does not commit to shipping translations.)*
3. **Replaceability is a requirement, not a nice-to-have.** The font (ADR-011), the
   Mirror presentation (ADR-014), the ambient effects (ADR-017), and any single effect
   must each be swappable by touching one well-named module. Rik cannot give final
   sign-off on look until he sees it, so the code must assume everything visual will
   change at least once.
4. **Encapsulation.** Modules expose a minimal, intentional surface; internals stay
   private. `src/engine/` already forbids framework imports (ADR-008); this generalises
   the discipline everywhere.
5. **One concern per module.** Small, single-purpose files over large multi-purpose
   ones.
6. **Follow established web/app conventions** rather than inventing project-local ones,
   so the layout is familiar to any web developer on sight.
7. **Comments explain *why*, never *what*.** If a comment restates the code, the code
   needs a better name instead.

**Why it matters here specifically.** Implementers are context-poor and disposable
(`11-AGENT-PROTOCOL.md`); each new agent must understand a file from the file alone.
A self-documenting codebase is therefore not aesthetics — it is the precondition for
the whole orchestrator/implementer model to work across many sessions.

**Consequences.** `05-ARCHITECTURE.md` gains a §Codebase standards section. Every task
brief's acceptance criteria must include the relevant standard (no inline strings, named
modules, single concern). A lint rule flags hardcoded user-facing strings. This ADR sits
alongside the invariants in `AGENTS.md`.

---

## ADR-038 — Mobile is a first-class target

**Status:** Accepted · **Decided by Rik, 2026-08-23.**

**Context.** Rik: much of what makes a site read as "AI slop" is an ignored mobile
experience, and he will not accept that. The site must be usable — *and usable well* —
on a phone. Many World Mode features will be disabled there, which is fine; being good
within the reduced set is what matters.

**Decision.**

1. **The phone experience is designed, not degraded.** Document Mode (the default at
   `/`, ADR-024) is already mobile-excellent by construction. World Mode on mobile runs
   the `low`/`minimal` point tiers, loses the ambient cursor field (no hover, ADR-017),
   and disables whatever cannot hold 30fps — but what remains must feel deliberate.
2. **A one-time, dismissible hint** suggests a desktop or laptop for the full World
   Mode experience. It never blocks, never nags, and never implies the phone version is
   broken. It is a recommendation, not an apology.
3. **The reduced mobile feature set is explicitly authored**, not whatever happens to
   survive. `06-PERFORMANCE.md` §Mobile lists what is on and off.

**Why.** It is a stated quality bar and a correct one; the mobile view is what a large
share of visitors will actually see.

**Consequences.** `06-PERFORMANCE.md` §Mobile is promoted from mitigation to
specification. Every Station's mobile framing becomes an authored concern. A real
mid-range Android test stays a Phase 10 `[R]` gate.

---

## ADR-039 — The Market is populated: crowd figures are required

**Status:** Accepted · **Decided by Rik, 2026-08-23** · **Closes the crowd-figures Open
question.**

**Context.** The open question was whether the Market needed moving people or could be
stalls and objects only. Rik: people are necessary. The place must feel lived-in —
bustling and rowdy, yet somehow calm; the *murmur* of a real market must be present.
**Because audio is descoped (ADR-025), that murmur has to be carried entirely by
visuals.**

**Decision.** The Market contains a point-cloud crowd: figures moving through the souk,
browsing, gathered at stalls, passing the Witness. They are ambient population, not
interactive — they carry no `EMBER` and are never a verb (consistent with ADR-017's
ambient-layer logic).

Design targets:
- **Bustling but calm.** Many figures, unhurried motion, no frantic darting. The feeling
  is a warm crowd murmur, not a chase.
- **The murmur is visual.** Density, drift, and the ambient parallax layer (ADR-017)
  do the work sound would otherwise do. This is the clearest case in the project of a
  visual carrying an emotional load that audio was originally meant to carry.
- **Cheap by construction.** Crowd figures are instanced low-point subjects from a few
  baked silhouettes, varied by seed — not individually authored (`06-PERFORMANCE.md`).
- **Diegetic (ADR-033).** Period-plausible figures for the visual language; nothing
  modern.

**Why.** Rik's call, and it is the right one: a market with no people is a diorama, and
"lived-in" is what sells the warmth the whole tone strategy (ADR-005) depends on.

**Consequences.** Crowd figures move off the deferred list into Phase 6 scope. Their
motion must respect the flicker cap (`04-ACCESSIBILITY.md`) and reduce in count on mobile
tiers before individual fidelity drops (ADR-038). A new content note: crowd figures are
*ambient*, so no Content Graph entry is required for them (they are the one authored
element of the world exempt from the derivation invariant — recorded so a future session
does not "fix" their absence from the graph).

---

## ADR-040 — A native-scroll preference

**Status:** Accepted · **Decided by Rik, 2026-08-23** · Refines ADR-019 and ADR-022.

**Context.** Rik is fine with smooth/virtual scrolling (Lenis, ADR-019) but notes that
"avant-garde" sites which hijack scrolling feel wrong to some users, and he wants to give
them a way out.

**Decision.** A user preference — `native-scroll` — disables Lenis smoothing and virtual
scroll, restoring the browser's native scroll behaviour. When on:
- `t` maps directly to native scroll position; no smoothing, no inertia, no `scrollGain`
  easing beyond what the browser does.
- The immediate first-scroll feedback (ADR-022) still fires — it is about
  responsiveness, not smoothing.
- It composes with `instant-travel` and `reduced-motion` rather than duplicating them:
  `reduced-motion` already forces Lenis lerp to 1; `native-scroll` is the explicit,
  manually-chosen version for users who simply dislike smooth scroll without needing the
  full reduced-motion treatment.

**Why.** Cheap to offer, respects the user, and hedges against the single most common
complaint about sites of this kind. Consistent with the project's stance that the site
should never make someone feel they are fighting it.

**Consequences.** Adds a seventh entry to the preferences set (`04-ACCESSIBILITY.md`,
`02-EXPERIENCE-SPEC.md` §10) and to the `prefs` store. Surfaced in the help panel and
settings like the others (ADR-018).

---

## Unconfirmed inventions

> **Added 2026-08-19 at Rik's request:** design decisions Claude made that Rik never
> raised, and has not confirmed. Most are ordinary work inside delegated scope. They
> are listed because a future session reading the specs would reasonably assume they
> are settled, and they are not. **Each is cheap to reverse now and expensive later.**
>
> **Updated 2026-08-23:** Rik reviewed this list. Confirmations folded in below.

| # | Invention | Status after 2026-08-23 review |
|---|---|---|
| 1 | **Second Sight** — the returning-visitor state | ✅ **CONFIRMED by Rik.** "I love the Second Sight concept." No longer unconfirmed. |
| 2 | **The Figure as unfinished rock-cut sculpture** (ADR-033) | ✅ **CONFIRMED by Rik**, with a constraint: the rock must look like something possible in the period of the Indian/Middle-Eastern visual language. Folded into ADR-033. |
| 3 | **Exactly five interaction verbs** | ✅ Confirmed ("fine with this"). Stays an invariant. |
| 4 | **Exactly one hard snap** | ✅ Confirmed. Stays an invariant. |
| 5 | ~~**The 46-week schedule**~~ | ❌ **REMOVED.** Rik does not care about a calendar — he runs Claude across sessions, so wall-clock is meaningless. Week numbers stripped from `08-ROADMAP.md`; phase *order* retained. |
| 6 | **Performance budgets** — 60/30 fps, ≤6 MB, ≤5 KB Document JS, point tiers | ✅ Confirmed, and **strengthened** by ADR-038 (mobile is first-class). |
| 7 | **Copy budget ≈15 narrative lines** | ✅ Confirmed, and Rik may **reduce it further** depending on feel. Talk as little as possible. |
| 8 | **Alcoves** | ✅ Confirmed implicitly (follows from ADR-001, unchallenged). |
| 9 | **Foreshadows F1–F8** | ✅ Unchallenged; retained. |
| 10 | **No narrator voice; text only** | ✅ **CONFIRMED.** A narrator may be reconsidered *later*, only alongside the optional procedural audio phase — never before. |
| 11 | **WCAG 2.2 AA target** | ✅ Confirmed ("fine with this"). |
| 12 | **The Ember rule** | ✅ Unchallenged; retained. |
| 13 | **The Fun budget** | ✅ Unchallenged; retained. |

**Nothing on this list remains unconfirmed after the 2026-08-23 review.** The section is
kept as a record; new inventions get appended here as they arise.

**Delegated, therefore not listed as unconfirmed:** the stack (ADR-008, Rik said "you
pick"), the round-two tooling (ADR-026, Rik asked for the research), and the stepwell
and other per-act forms (ADR-033 — Rik said "I'll leave the specifics to you" about the
ascent's symbolism).

## Open questions

Genuinely undecided. Do not guess — ask Rik.

- **How much does Second Sight change?** The feature is confirmed (Unconfirmed
  invention #1). Its *scope* is still "legibility only, no new content" — reasonable to
  leave until Phase 9, but not explicitly ratified.

**Closed 2026-08-23:**
- ~~Does the Market need crowd figures?~~ **Yes, required** (ADR-039). They carry the
  market's "murmur" visually, since audio is gone.
- ~~Does Second Sight stay?~~ **Yes** — confirmed by Rik.
- ~~Repository name~~ — Rik likes `rikmukh.online`; repo plan awaits only his go-ahead.

**Closed earlier:**
- ~~Is there a narrator voice?~~ No — text only (a narrator may return only with the
  optional audio phase, never before).
- ~~Does the résumé exist as a PDF?~~ Yes, **generated** from the Content Graph (ADR-026).
- ~~How many projects?~~ Five Mirrors (ADR-035).
- ~~Is Rik willing to name a real failure?~~ Yes — this website's three predecessors
  (ADR-030).
