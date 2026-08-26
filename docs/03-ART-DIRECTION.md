# Art direction

> Prerequisites: `00-VISION.md`, `01-NARRATIVE.md`. Struck text = rejected-but-kept
> (`AGENTS.md` conventions); not the spec.

## Palette (ADR-007)

```
VOID    #05060A    ambient, the expanse, page background
HAZE    #2A2F3A    mid-depth falloff, unresolved points, structure — NEVER text
DUST    #E8E4DA    resolved points, body text, primary surfaces
EMBER   #FF6B35    interaction, life, the hand
```

Two derived tones only, and no more without an ADR:

```
DUST-DIM  #8A877F   secondary text, labels        (7.3:1 on VOID)
EMBER-DIM #B34A22   pressed / visited states
```

Measured contrast on `VOID`: `DUST` ≈ **15.7:1**, `EMBER` ≈ **7.0:1**. Both pass
WCAG 2.2 AA for body text and AAA for large text. Verify in CI — see
`04-ACCESSIBILITY.md`. Use `culori` for the programmatic check (ADR-026).

### The Ember rule

**`EMBER` is the interaction colour and nothing else.**

- If a thing carries Ember, the Witness can act on it.
- If the Witness can act on a thing, it carries Ember.
- Ember occupies **under 5% of any frame**, except during the Reach flood.
- Nothing decorative is ever Ember. No Ember accent lines, no Ember headings, no
  Ember for emphasis.
- **The ambient response layer is not Ember** (§The ambient response layer). The
  world reacting to the cursor is not an affordance.

This is what lets the world be learnable with zero instructions, and it is why the
Reach flood is overwhelming — the Witness has been trained for eight minutes that
this colour means *something can be touched*, and then everything is.

### Hue carries no meaning

Any distinction communicated by colour is also communicated by position, size,
opacity, or motion. This is not only a colour-blindness accommodation; it is why
the palette can be this restricted in the first place.

## Typography (ADR-011)

| Role | Face | Rationale |
|---|---|---|
| Body | **Atkinson Hyperlegible** | Designed by the Braille Institute for maximum character disambiguation. Genuinely handsome. Using the accessibility community's typeface as the *default* rather than as a toggle is the clearest possible statement of this project's values. |
| Display | **Instrument Serif** | A humanist, slightly editorial serif — warmth and a hand against the cold void. Used for the few narrative lines and Station titles. |
| Labels / data | a monospace (JetBrains Mono or similar) | Stall labels, tier years, project metadata. Reads as annotation rather than voice. |

Rules:

- Body ≥ 17px, line-height ≥ 1.6, measure 60–75 characters.
- Never set text over moving particles without a solid or heavily-blurred backing
  plate. Legibility beats atmosphere every single time (`00-VISION.md` non-goals).
- Display type is the only place tight tracking is allowed.
- Self-host all fonts. Subset them. No third-party font CDN.
- The dyslexia toggle adjusts letter-spacing, word-spacing, line-height, and
  weight rather than swapping the face — Atkinson is already a strong baseline,
  and face-swapping reflows everything.

## Visual language (ADR-033)

**Medieval Islamic and Indian architecture, sourced from geometry rather than colour.**

Before this, every space in the site was described abstractly — "a corridor,"
"stalls," "stepped architecture." Abstraction is safe and gives a blockout nothing to
hold onto. This section is the vocabulary.

### The governing insight

A point cloud renders **structure, not surface.** It cannot express dyed textile,
glazed tile colour, or painted ornament — those are pigment, and pigment is what this
medium discards.

Islamic and Indian architecture are **pattern-and-geometry traditions**, not pigment
traditions: jali (perforated stone screens), muqarnas (stalactite vaulting),
arabesque, stepped merlons, pointed and scalloped arches, corbelled brackets. All of
it is *solid and void* — which is all a point cloud is.

**A jali screen rendered as points is the ideal case, not a compromise:** a pattern of
stone and holes, expressed in a medium made of nothing but presence and absence.

Therefore **the palette does not change.** ADR-007 stands. Warmth in the Market comes
from light temperature and density, which is already permitted. Ochre and lapis were
considered and rejected once (ADR-007) and stay rejected.

### Restraint: references are for the author, not the audience (ADR-036)

**Take silhouette and proportion. Drop the identifiable decorative motifs.**

Blockouts are built *from* real buildings so arcade rhythm, arch profile, and stepped
geometry are right. But **no form is ever named, no ornament is rendered at a level
that demands recognition, and no landmark is identifiable.** Nobody should be able to
say "that's Chand Baori." The world reads as *somewhere old, warm, and eastward* — not
as Isfahan in 1590.

Why this is correct rather than merely safer:

1. **Most of the site is out of focus.** `globalFocus(t)` never exceeds 0.90 before the
   Reach, and much of the journey sits between 0.4 and 0.9. At those values **a
   muqarnas vault and a plain vault are the same object.** Fine ornament is invisible
   for most of the runtime.
2. **It preserves the ambiguity the project was built on.** `idea.md` wants a place
   where "you dont even know if its a room or a space" — an invented world, not a
   reconstructed one. A recognisable real location collapses that.
3. **It is what the medium already does.** Rik's own description of the effect:
   *"the faintest sense of detail but not too much."*

**But vague must not become generic.** The forms still come from real buildings; the
vagueness is in *recognition*, not in rigour. A shape invented from nothing reads as
fantasy-generic, which is the pastiche failure this whole section exists to avoid.

### The diegetic translation rule

**Nothing modern appears in the world as itself. Everything is translated.**

| Not this | This |
|---|---|
| An FPV drone | A clockwork bird — a mechanical crow |
| A bouldering wall | Someone climbing an old brick wall (medieval brick, not modern red) |
| "Best FPS" | "The best war game" |
| A laptop, phone, monitor, GitHub mark | None of these exist here |

Check any new prop against this rule before authoring it. It is what stops the Fun
budget from breaking immersion.

### Per-act forms

Named buildings below are **author references, not depiction targets** (ADR-036). Build
from their proportion and rhythm; do not make them recognisable.

| Act | Form |
|---|---|
| **The Void** | No architecture. That is the point. |
| **The Approach** | Density and light only. |
| **The Corridor** | A vaulted covered-bazaar arcade, before it is legible as one. Pointed arches receding; **jali screens** both sides filtering light from far ahead. The jali does double duty — correct historical form, *and* the reason the walls can later resolve into stalls, since a screen is already half-open. |
| **The Name** | Monumental **carved inscription** — Latin letterforms cut in stone. **Not calligraphy.** Devanagari or Arabic script would read as ornament rather than as his name; legibility wins. |
| **The Market** | A **souk**: vaulted arcade opening outward, textile awnings, spice mounds, hanging lanterns, brass, corbelled upper storeys. |
| **The Climb** | A **stepwell, ascended** — Chand Baori / Rani ki Vav geometry. Criss-crossing symmetric flights of one tiled module: spectacular as points, cheap to bake. A stepwell descends into dark; climbing *out* makes the Focus arc architectural. Supersedes the Mayan-pyramid-and-colosseum hybrid. |
| **The Wardens** | Figures in **temple niches**, jali behind them. Carved attendants — proportions slightly wrong, faces unresolved. |
| **The Figure** | An **unfinished rock-cut sculpture** — see below. |

### The Figure: keep the gesture, change the material

The Creation of Adam is Italian Renaissance and Christian; imported unaltered it would
be the one jarring object in the site. `idea.md` also calls the pose "very important,"
so it cannot simply be replaced.

The Figure becomes a figure **half-emerged from living rock**, in the idiom of the
genuinely unfinished rock-cut monuments at **Ellora** and **Mahabalipuram** — real
works abandoned mid-carving, where the sculpture is visibly still inside the stone.
**The outstretched hand and the absent counterpart are unchanged.** Only the reference
shifts: fresco → rock.

Three ideas converge here, which is why it is stronger than the original:

1. Rock-cut sculpture is **subtractive** — the figure was always in the stone.
2. **That is the Focus mechanic in stone.** The world already exists in its authored
   positions; the Witness's approach removes the haze concealing it.
3. **Michelangelo said the same thing** about marble. The Adam reference is not
   abandoned — it is grounded in the one philosophy he shared with the rock-cut
   tradition.

ADR-006 already forbade the Figure from resolving fully. An unfinished rock-cut
carving expresses that as a real historical object rather than a shader constraint.

### Sourced, not depicted

Every authored form traces to a **named building** in the author's reference — and
none of them is recognisable in the result (ADR-036). Those two rules work together:
the reference supplies proportion and rhythm, the restraint keeps the place invented.

A generic "Arabian Nights" aesthetic — genie lamps, magic carpets, onion domes as
shorthand — is a Western fantasy trope and would directly undercut this project's
stated value that the site feel authentic and made with care (`00-VISION.md`). That is
what the reference set prevents.

Reference set to build from: **Isfahan Grand Bazaar**, **Aleppo covered souk**,
**Fatehpur Sikri**, **Chandni Chowk**, **Chand Baori**, **Rani ki Vav**, **Ellora**,
**Mahabalipuram**.

The direction draws on Rik's own heritage, so this is homage rather than
appropriation — but sourcing is still what separates homage from pastiche.

### Moiré (ADR-036)

A point cloud is already a sampling of geometry. Sampling a *perforated* pattern with
points is a double sampling — the textbook setup for moiré. Stack two or three screens
in depth, slide them with the ambient parallax layer, and interference shimmer is close
to guaranteed.

It is genuinely beautiful and genuinely a hazard — shimmer, aliasing, and possible
luminance oscillation against the 3Hz cap. Required mitigations:

- Cap how many perforated layers may stack in depth.
- Resolve distant screens *toward solid* rather than resolving their holes.
- Constrain screen spatial frequency relative to point spacing at the current tier.
- **Layered-screen traversals are a new flicker-test case** at several parallax speeds
  (`04-ACCESSIBILITY.md` §Verification).

Layered screens are also the *best available subject* for the ambient parallax layer.
Risk and opportunity are the same feature: tune it, do not avoid it.

## The particle language

Everything in this world is made of the same substance. Architecture, vendors,
wares, Wardens, the Figure — one system, different position textures (ADR-012).
There is no conventional mesh geometry anywhere in the world.

| Property | Rule |
|---|---|
| Shape | Round soft-edged sprite. Never square, never textured. |
| Size | Attenuates with depth; grows as Focus drops (unresolved = larger, softer). |
| Opacity | Driven by Focus, floor ~0.12. |
| Jitter | Amplitude `= (1 - Focus)`. Continuous, low-frequency, per-point-seeded. |
| Colour | `HAZE` → `DUST` by Focus; `→ EMBER` by interactivity only. |
| Bloom | On `EMBER` only, cheaply. Never on `DUST` — bloom on the dust destroys the crispness the snap depends on. |

### Density grammar

Density carries emotional meaning and is authored per Station. Implemented by
painting vertex colours in Blender and sampling with `MeshSurfaceSampler`'s
`setWeightAttribute()` (ADR-019) — **density is an art task, not a code task.**

| Space | Density | Feeling |
|---|---|---|
| The Void | very sparse, ~40 visible points | absence, no scale |
| The Corridor | medium, tight, regular | enclosure, order |
| The Market | very dense, irregular, layered | life, overwhelm, warmth |
| The Climb | thinning, increasingly regular | cooling, effort |
| Wardens | sparse, precisely placed | reverence, stillness |
| The Figure | dense but **deliberately incomplete** | unfinished, waiting |

## The ambient response layer (ADR-017)

The world is continuously attentive to the Witness. Two effects, present
**everywhere, at all times**:

### The cursor displacement field

The reference is precise: **a finger dragged hard across a switched-off LCD screen.**
Liquid crystal displaced into a bloom that spreads outward from the pressure, with
colour fringing at the leading edge, settling back over a moment.

- Radial displacement of nearby points in screen space.
- Brief **chromatic separation** at the leading edge only.
- Decay of roughly **300ms**, eased, fully reversible.
- Applies to *all* points, not only interactive ones.

### Depth parallax

Pointer movement offsets point layers differentially by depth — continuous, subtle,
everywhere. "Artistically sprinkled" is the intent: strongest where there is real
depth to reveal (the Market's layered stalls, the Corridor's length), near-absent in
the Void where there is nothing to parallax against.

### Rules

- **Neither effect is Ember, and neither is an interaction verb.** This is the world
  being alive, not an affordance (`02-EXPERIENCE-SPEC.md` §6a).
- Both must degrade: `reduced-motion` turns parallax off and makes the field
  brightness-only; `photosensitive-safe` removes the chromatic separation.
- Touch has no hover — the field triggers on tap and decays. **Mobile loses the
  ambient layer**, so it needs a separate answer for feeling alive.
- Cost real frame budget. Measure against `06-PERFORMANCE.md`.

### Why this earns its place

It is not decoration. Foreshadows F1 and F2 already establish that the world
responds to the Witness's attention; making that response continuous and physical
means the site is restating its thesis on every pointer movement. Reference shaders:
Yuri Artiukh's displacement work (`12-DEPENDENCIES.md`).

## Motion

- **Everything is spring-damped.** No linear easing anywhere in the project.
- **Exactly one hard snap exists:** the Corridor resolve at `t ≈ 0.13`
  (`01-NARRATIVE.md`, Act 2 — `t` revised by ADR-016). Its uniqueness is what makes
  it feel like glasses going on. Do not add a second snap.
- Nothing auto-advances. Nothing has a timer. Nothing pulses to demand attention.
- The Figure's movements are *lazy* — slow, unhurried, slightly under-damped, as
  though it has been waiting a long time and is not in a rush. As an unfinished
  rock-cut carving (ADR-033), its noticing-and-extending should read as **the rock
  releasing it** rather than a body flexing: points detaching from the surrounding
  stone and resolving into the arm. More plausible than a fresco figure moving at all,
  and it restates the subtractive idea as motion (ADR-036).
- Idle drift everywhere: even a stationary Witness sees a living, slowly moving
  world. But drift must be slow enough not to read as instability.
- The ambient response layer means the world also moves with the *pointer*, not only
  with time. Between idle drift and the cursor field, the world should never look
  frozen.

## Light

There is no conventional lighting model — points carry their own colour. But there
is an authored sense of light:

- The Void: one distant source, direction ambiguous.
- The Corridor: light from far ahead only. The Witness's own space is unlit.
- The Market: many small warm sources at stall height. Warmth here comes from
  *density and light temperature*, not from hue shifts, because the palette
  forbids new hues.
- The Climb: light falls off with ascent. Higher is colder. Warmth drains gradually
  rather than switching off (ADR-016) — the first half of the Climb retains it.
- The Figure: lit from below and behind, so it is largely silhouette. The hand is
  the brightest thing in the scene, and it is Ember.

## Audio — DESCOPED (ADR-025)

**There is no audio in this site.** No score, stems, licensing, or consent step. Optional
procedural sound is post-launch **Phase 11**, and **nothing may depend on it.**

The art-direction consequence: **the site must be complete and excellent silent.** The
Reach carries the climax visually; Market warmth comes from density, light temperature,
and the crowd (ADR-039), not from a score. A rejected hybrid audio plan and a retracted
"audio-as-accessibility" idea are recorded in ADR-023 and ADR-025 — do not re-propose
either.

## Document Mode — the default and the hero (ADR-024)

Document Mode is served at `/`. It is not a peer, a stripped version, or a fallback
— **it is the site's front door and the version most visitors will ever see.** It
should look deliberate enough that someone who never clicks through still comes away
impressed.

### The hero header

The most important composition in the project after the Reach, because it is the
**only** path into World Mode. Six months of work is unseen if this is weak.

- Rik's name, set in Instrument Serif, large.
- One line of identity, plain and true.
- A **living point-cloud element** — animated, demonstrating Focus in miniature:
  haze resolving toward form, responding to the cursor. A promise of the aesthetic,
  in a few hundred milliseconds of looking.
- A prominent, unmissable **"Enter the world"** invitation, above the fold, carrying
  `EMBER` because it is the one thing on the page that leads somewhere else.
- A compact controls-and-modes summary (ADR-018).
- Secondary, quieter: read on, or take the résumé.

Constraints that keep it from becoming a generic landing page: no navigation menu,
no scrolling within the hero, no marketing copy, no feature list. One screen.

**Settled by ADR-042:** vanilla canvas 2D, no framework, no dependency, sharing the
**5 KB** Document Mode JS budget with `prefs.ts`. Point positions are sampled from text
rendered to an offscreen canvas in the display face and read back with `getImageData`,
so no coordinate table ships and the data cost is zero — a miniature of Act 3, where a
scatter of points is only legible as a name from the right vantage. If the measured
gzipped total exceeds 5 KB the hero degrades to a pre-rendered loop and loses the cursor
response; **the budget does not move** (invariant 10).

### The document body

- Same palette, same typefaces, same voice.
- Single column, generous whitespace, `VOID` background, `DUST` text.
- Ember reserved for links, focus rings, and the world invitation — the Ember rule
  holds here too.
- Reads as a well-set document. Someone landing here first should not feel they
  missed anything.

## Anti-patterns

Explicitly forbidden. Reject these even if they look good in isolation:

- Anime imagery, anime typography, speed lines, sakura petals — anything of the
  kind. Influence is structural only (`00-VISION.md`).
- Lens flares, ~~chromatic aberration,~~ film grain, vignette-as-style.
  > **Exception granted by ADR-017:** chromatic separation is permitted **as the
  > cursor displacement field's leading-edge fringing, and nowhere else.** It
  > references a specific physical phenomenon rather than acting as a stylistic
  > filter. **Do not delete that effect citing this list.** Any *other* use of
  > chromatic aberration remains forbidden.
- Glitch effects, scanlines, datamosh, "digital" affectations.
- Cyan-on-black point clouds. That is the default look of every WebGL demo.
- Text over unbacked moving particles.
- Ember for anything non-interactive — including the ambient response layer.
- A second hard snap.
- Conventional mesh geometry in the world (`06-PERFORMANCE.md`).
- Any effect that cannot be justified by a line in `00-VISION.md` or
  `01-NARRATIVE.md`.
