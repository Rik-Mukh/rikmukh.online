# Narrative

> Prerequisites: `10-GLOSSARY.md`, `00-VISION.md`.

## Structure

Eight acts along one Spine. `t` is the normalized position along the Spine and is
the primary state variable of the application.

The `t` allocations below are the **authored budget**, not measurements. They may
be tuned, but the *proportions* are deliberate: the Void is very short, the
Market is the largest single span, and the Reach is given room to be slow.

**Amended by ADR-016** (2026-08-19) to give warmth more of the journey. The `t`
values below are current. Note that **`t`-span is not time** — perceived duration is
roughly `tSpan / scrollGain`, so `scrollGain` is the real pacing instrument.

| Act | Name | `t` range | `scrollGain` | Global Focus | Content | Register |
|---|---|---|---|---|---|---|
| 0 | The Void | 0.00 – 0.05 | 0.35 | 0.02 → 0.08 | none | silent, cold |
| 1 | The Approach | 0.05 – 0.13 | 1.0 | 0.08 → 0.40 | none | cold, curious |
| 2 | The Corridor | 0.13 – 0.24 | 1.0 | 0.40 → 0.75 | about / now | held breath |
| 3 | The Name | 0.24 – 0.28 | 1.0 | 0.75 | title card | reveal |
| 4 | The Market | 0.28 – 0.62 | 0.7 | 0.90 | experience | warm, loud, funny |
| 5 | The Climb | 0.62 – 0.72 | 0.9 | 0.90 → 0.87 | education | cooling, warmth draining |
| 6 | Wardens & Mirrors | 0.72 – 0.85 | 0.8 | 0.87 | projects | quiet, reverent |
| 7 | The Figure / The Reach | 0.85 – 0.96 | 0.5 | 0.87 → 1.00 | thesis, contact | silent, cold |
| 8 | The Return | 0.96 – 1.00 | 1.0 | 1.00 → 0.10 | none | resolved |

Warm span is 34% of the journey; 28% elapses before the first warmth. Warmth
**drains gradually** rather than switching off — the Climb keeps residual warmth
through its first half, and the Wardens are reverent rather than cold. Only the
Figure is genuinely cold again.

All of these values live in the Content Graph as data and are expected to be
re-tuned once the world is walkable. Tuning them touches one file, not code.

---

## Act 0 — The Void · `t 0.00–0.06`

Pure `VOID`. Perhaps forty points drifting, barely above the black. No horizon, no
scale reference, no orientation cue. The Witness cannot tell whether this is a
room or open space — that ambiguity is the entire point and must survive
implementation.

Onscreen: nothing except one small persistent affordance — a way back to the document
at `/`. No scroll hint for the first ~1.2s. (No audio toggle: audio is descoped,
ADR-025. The Witness arrives from `/`, so there is no gate to return to, ADR-024.)

Scroll response is deliberately *weak* here. The first ~600px of scroll produces
almost no travel. This teaches that scroll means time rather than distance, and it
makes the eventual acceleration feel earned.

Far off, a smudge of light. Not a shape. A suggestion that direction exists.

> **Foreshadow F1.** Points within a radius of the cursor are ~8% brighter. Never
> remarked on, never explained. It is simply true from the first frame that the
> world responds to the Witness's attention.

---

## Act 1 — The Approach · `t 0.06–0.18`

Focus climbs 0.08 → 0.40. The haze *differentiates* without becoming legible:
regions of density appear, some points move with apparent parallax, but no form
resolves. This is the "opening your eyes after a long sleep" state from the brain
dump, and it should be held longer than feels comfortable.

Audio, if enabled, is heavily low-passed — muffled, as if heard through a wall.
The filter cutoff opens in lockstep with global Focus for the entire site. A
Witness who cannot see perceives the same resolving-into-clarity beat through
sound alone. This is the site's most important accessibility mechanic and it is
also its best sound-design idea; the two are the same thing.

The Witness begins to sense enclosure before seeing any wall — density above and
to the sides, sparseness ahead.

> **Foreshadow F2.** Whatever is near the centre of view sharpens measurably more
> than the periphery. Focus is attention, stated mechanically.

---

## Act 2 — The Corridor · `t 0.18–0.30`

**The snap.** At `t ≈ 0.13`, over roughly 900ms, the points *click* into their
authored positions. This is the only hard snap in the entire site — everything
else is spring-damped. Its uniqueness is what makes it feel like glasses going on.

The revealed space is narrow, tall, cold, silent. Walls close enough to feel.
Ceiling too high to see the top of. Nothing decorative. The Witness should feel
mildly claustrophobic and slightly unwelcome.

The first words of the site arrive here — the *about* content, delivered as a few
short first-person lines revealed across the Corridor's length, not as a bio
block. Something plainly true and slightly uncomfortable. This is where the
Witness learns who is speaking.

Held breath. It pays off in Act 4.

---

## Act 3 — The Name · `t 0.30–0.36`

`RIK` as an anamorphic point sculpture. From every position except one it is
abstract debris hanging in the corridor. At `t = 0.26` exactly, it resolves into
three enormous letterforms and the Witness passes between the **I** and the **K**.
Looking back — free look supports this, and the Return revisits it — it reads
again, mirror-reversed.

This is the title card, and its placement is deliberate: roughly a third of the
way in, after a cold open. That is anime OP structure.

> **Foreshadow F3.** Legibility depends entirely on where the Witness is standing.
> The thesis stated as a visual pun. Of all the clues this is the one most likely
> to be consciously noticed on a second visit.

---

## Act 4 — The Market · `t 0.36–0.60`

**The reveal.** Focus jumps to 0.90 and the Corridor's walls resolve into what
they always were: stalls. The camera's containment drops away, scale explodes
outward and upward, and sound blooms — crowd, warmth, life, the low-pass filter
fully open. Cold to warm in one beat.

This is the largest Station and the most content-dense. A market is where you
exchange your labour, which is why the work history lives here and not in a list.

**Stalls come in three classes (ADR-021)** so that the Market's scale is not
hostage to résumé length:

- **Anchor** — real roles and jobs. Large, on the main street, unmissable.
- **Secondary** — things made that are not portfolio-grade: experiments, tools,
  scripts, one-offs, coursework worth showing. Behind and between the anchors.
- **Background** — skills, languages, tools, and things Rik is simply into. A stall
  selling regex cheap. A stall of anime recommendations. A coffee stall. These
  populate depth and edges, and they are where the Fun budget lives.

Inside an anchor stall the mapping is physical: the awning carries a point-cloud
glyph for the organisation; a mono label on the counter gives role and dates; **each
accomplishment is one ware on the counter**, pokeable, revealing a line; the
vendor's hanging tools are the stack; the vendor's line on approach is the outcome;
the side-street Alcove holds the full prose. Older roles are visibly more weathered.

Projects are **not** stalls — they are Mirrors in Act 6, and must not be duplicated
here.

**The Market is populated (ADR-039).** A point-cloud crowd moves through the souk —
browsing, gathered at stalls, passing the Witness. Bustling and rowdy, yet somehow calm:
many figures, unhurried motion, the warm *murmur* of a real market. **That murmur is
carried entirely by the visuals**, because audio is descoped (ADR-025) — density, drift,
and the ambient parallax layer do the work sound would otherwise do. The crowd is ambient
population: no `EMBER`, no interaction, period-plausible figures only (ADR-033), instanced
cheaply from a few baked silhouettes. A market with no people is a diorama; the crowd is
what makes the warmth land.

This is where the entire Fun budget is spent (ADR-005):

- Vendors with opinions, rendered as Warden-adjacent point figures.
- Wares that react when poked — the cursor-as-reveal-field mechanic applied
  playfully.
- One stall selling nothing at all, and knowing it.
- One stall discounting a project that genuinely failed, labelled honestly.
- A stray point-cloud animal that follows the Witness for a while and then loses
  interest.

**Rule:** every joke is attached to something real. The fun is content, not
padding.

**Alcoves:** side streets leading to depth on individual roles. Each returns to
the exact `t` it was entered from.

---

## Act 5 — The Climb · `t 0.60–0.70`

The Market thins. Ahead, stepped architecture — **a stepwell, ascended** (ADR-033):
criss-crossing symmetric flights, wide at the base, climbing out of the dark. Each
tier is a year. Education as literal ascent, and the top tier is visibly unfinished
because Rik graduates in 2027 (ADR-028).

~~a Mayan-pyramid and colosseum hybrid~~ **[Superseded by ADR-033's visual language.]**

Crowd audio thins with the crowd. Warmth drains out of the light. The tonal floor
drops here and does not come back up until Act 8. Global Focus dips very slightly
— 0.90 → 0.85 — and does not fully recover until the Reach. The world is holding
something back.

---

## Act 6 — The Wardens and the Mirrors · `t 0.70–0.84`

A ring of Wardens on the upper plateau, each holding a Mirror. Almost human:
proportions slightly wrong, faces unresolved. They do not move except to turn
their Mirror toward the Witness.

Each Mirror at rest shows a faint point-cloud reflection of the Witness's own
cursor position. On approach it resolves into a rotatable diorama of one project.
Entering a Mirror is an Alcove; the readable prose composites into the world as a
Document-Mode panel rendered in the world's own material language, so the text is
real and selectable without the immersion breaking (ADR-014).

Above and beyond the ring, the Figure is already visible — distant, small, head
down.

> **Foreshadow F4.** Every Mirror shows the Witness before it shows a project. The
> Witness has been in every reflective surface in this world the entire time.

---

## Act 7 — The Figure and The Reach · `t 0.84–0.95`

**At distance.** The Figure is dejected. Head down, shoulders forward, one hand
slack across a knee. It is visibly *unfinished* — a persistent fraction of its
points never resolve, drifting loose around the silhouette, and this remains true
even at global Focus 1.0 (ADR-006). Never named. Never a likeness of anyone.

**On approach.** It notices. The head lifts. The arm extends — lazily, unhurried,
resting rather than straining. The Creation of Adam pose, with nothing opposite.
The transition is driven by proximity along `t`, so the Witness causes it and can
reverse it by backing away.

**The Reach.** For the final gap, the Figure's hand tracks toward the Witness's
pointer but stops short. The gap only closes if the Witness closes it. Pointer,
touch, or `Enter` on a real focusable button.

It waits indefinitely. There is no prompt, no timer, no pulsing "click me." If the
Witness never reaches, the Figure simply remains extended, and the Witness can
leave. **This must not be softened.** A demanded gesture is not a gesture, and the
whole thesis collapses if the site insists.

**On contact.** `EMBER` floods outward from the point of contact. Every particle
in the world reaches Focus 1.0 and holds for one long beat. The score's final
layer enters. Then everything settles.

> **Safety constraint, non-negotiable.** The Ember flood is a **ramp of ≥800ms**,
> never a flash. This is the single most photosensitivity-dangerous moment in the
> design. See `04-ACCESSIBILITY.md`.

Then the reframe: one line of text. The contact information arrives here, framed
as the reach continuing outward rather than as a form.

---

## Act 8 — The Return · `t 0.95–1.00`

The camera pulls back and up, and the whole Spine becomes visible at once, lit:
Void, Corridor, Name, Market, Climb, plateau, Figure. It was one object the entire
time. The `RIK` sculpture is legible from up here too, from a completely different
angle — because the Witness is somewhere new.

Then Focus falls away and it fades to the Void. The same first frame. But now the
points are legible, and it is obvious they always were.

`Second Sight` is written to local storage here.

---

## Second Sight

The returning-Witness state. **Legibility only — no new content, nothing
unlocked, nothing explained.** Things are simply easier to see, as though the
Witness had learned to look.

- Global Focus starts at 0.12 instead of 0.02.
- The `RIK` sculpture resolves from noticeably further away.
- The Figure's head is already slightly raised on arrival.
- Some Wardens' Mirrors already show the Witness before approach.
- One additional Market stall is legible that previously read as background.

This is the mechanical implementation of the thing Rik described loving: a story
that, revisited, shows its twist scattered everywhere in plain sight.

---

## Foreshadow Ledger

Every clue for the reframe. **All must be structural** — a consequence of how the
world works — rather than planted hints. That distinction is what makes the second
visit land instead of feeling manipulated.

| ID | Plant | Where | Payoff |
|---|---|---|---|
| F1 | Points brighten near the cursor | Act 0, first frame | The world has always responded to the Witness's attention |
| F2 | Centre of view sharpens more than periphery | Act 1 onward | Focus *is* attention; the Witness resolves the world |
| F3 | `RIK` only legible from one position | Act 3 | Meaning depends on where the Witness stands |
| F4 | Mirrors reflect the Witness before showing projects | Act 6 | The Witness has been in this world all along |
| F5 | The Figure notices only on approach and reverses on retreat | Act 7 | It was waiting for a specific person: whoever came |
| F6 | Global Focus never reaches 1.0 before the Reach | Acts 0–7 | The world was incomplete until the Witness completed it |
| F7 | The Figure is permanently unfinished | Act 7 | Creation is not finishable alone |
| F8 | Void points were legible in frame one, at low opacity | Act 0 / Act 8 | Nothing was hidden; the Witness could not yet read it |
| F9 | The Market sells this site's three failed predecessors, discounted | Act 4 | Creation is not finishable alone — pays off F7. The site admits it is the fourth attempt *while being* the fourth attempt (ADR-030) |

**F6 is the keystone.** It is the reason the global Focus curve in the table above
tops out at 0.90 and dips during the Climb. A future session must not "fix" this
as a bug. The world is literally, measurably incomplete until the Reach.

---

## Copy budget

"Copy" means **the written words that appear on screen** — an advertising and
design term, nothing to do with duplication. There is **no narrator and no spoken
voice anywhere in the site.** All text is silent, on screen, and in Rik's first
person. Audio carries score and diegetic sound only (`03-ART-DIRECTION.md`).

The budget below covers **narrative copy only** — the authored, literary lines that
carry the story. It is deliberately severe, because the site's job is to say things
through space, Focus, and sound.

| Location | Narrative copy |
|---|---|
| The Void, The Approach | none |
| Corridor | 4–6 lines (the *about*, delivered across its length) |
| The Name | none |
| Market | none — the Market's words are labels, not narration |
| Climb | none — tier labels only |
| Wardens & Mirrors | none |
| The Reach | **1 line — the reframe.** The most important sentence on the site. Expect thirty drafts. |
| Return | 0–1 lines |

**Roughly fifteen lines total.** Everything else is space, Focus, and sound.

### Not counted in that budget

These are functional or content text, and they are much larger. Confusing them
with the narrative budget was a real ambiguity in the first draft of this document.

- **Stall labels and vendor lines** — short, many, funny. One per ware and per
  vendor. Scales with the Market (ADR-021).
- **Project prose** in Mirror panels — a few paragraphs each.
- **Tier labels** on the Climb — years and course names.
- **All of Document Mode** — the full bio, every role, every project, education.
  This is the largest body of writing in the project by a wide margin.
- **UI text** — the `/` hero, the help panel, settings labels, the accessibility
  statement.
