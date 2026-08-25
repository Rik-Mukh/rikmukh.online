# Vision

> Prerequisite: `10-GLOSSARY.md`.

## Thesis

**The Witness is the missing half.**

Nothing in this world is complete on its own. The point clouds are formless until
someone approaches them. The Figure reaches out with no one opposite. The `RIK`
sculpture is meaningless debris until viewed from one particular place.

Every mechanic in this site is a restatement of that one idea. That is not
decoration — it is the reason the site is built the way it is.

## Logline

*A dark expanse resolves into a world as you walk through it, and at the centre a
half-finished figure is reaching for someone who was never there. You are the
only one who came.*

## The turn

The site has a twist, but it is a **reframe**, not a plot event. There is no
information withheld and no surprise announcement. At the Reach, the Witness
understands that they have been the missing figure in the fresco the whole time —
and, retroactively, that they were the reason anything in the world was ever
legible.

This is what makes a second visit work. The foreshadowing is not a set of planted
hints; it is the *mechanics themselves*, which were stating the thesis
continuously in a language the Witness had not yet learned to read.

See the Foreshadow Ledger in `01-NARRATIVE.md`.

## What this site is

- A **personal portfolio** first. It exists to make people want to work with Rik.
- A short, authored, cinematic **journey** with real interactivity at each stop.
- A demonstration of craft — of taste, restraint, engineering, and care.
- Genuinely, unusually **accessible**, as an expression of values rather than as
  a compliance exercise.
- **Two renderings of one body of content**, so that the person with 30 seconds and
  the person with 10 minutes both get a good version. Document Mode is the **default**
  at `/` (ADR-024); World Mode at `/world` is always chosen.

## What this site is not

These are hard non-goals. Reject scope that pulls toward them.

- **Not a game.** No goals, no failure, no score, no timers, no dexterity
  requirement. Exploration, not challenge.
- **Not free-roam.** There is one Spine. See ADR-001.
- **Not an anime fan site.** Anime and manga influence the *structure* — cold
  opens, arc pacing, quiet climaxes, foreshadowing discipline. No anime imagery,
  ever. See "Influences" below.
- **Not a WebGL tech demo.** No effect earns its place by being impressive. Every
  effect must carry narrative or content weight.
- **Not a blog or CMS.** Content is versioned files. No admin interface.
- **Not sacrificing legibility for atmosphere.** Every word on the site can be
  read comfortably by everyone. Atmosphere lives in the space around the words.

## Tone

**Warm world, solemn climax.** (ADR-005)

The Void and the Corridor are quiet, cold, and serious. The Market is warm, loud,
crowded, and genuinely funny — vendors with opinions, absurd wares, things that
react when you poke them, a stall selling nothing, a project being sold off
cheap because it failed. The Climb cools back down. The Figure is silent.

This ordering is load-bearing. The climax lands *because* the world earned
affection first. A cathedral with no life in it produces admiration, not feeling.

Two rules that follow:

1. **The fun is never filler.** The Market is the work-history section. Every
   joke is attached to something real.
2. **The Figure never jokes.** Not once. The tonal floor drops when you begin the
   Climb and it does not come back up until the Return.

## Voice

First person. Short sentences. Concrete rather than abstract. Never markety, never
"passionate about leveraging." Roughly fifteen lines of narrative copy carry the
entire story — every one of them gets rewritten many times, and the count may drop
further (Rik wants the site to talk as little as it can).

Document Mode is allowed to be plainer and drier than World Mode, but it is the
same person talking.

### The no-slop rule (Rik, 2026-08-23)

Rik despises copy that reads as machine-written, and named the two shapes that give it
away. Both are banned:

1. **Strained idioms nobody actually says.** "I'll go all the way down," "I dig deep
   into the weeds." If a real person would not say it aloud, cut it.
2. **Punchy but empty aphorisms.** "The foundation is the shortcut" — a shortcut to
   *what*? A line that sounds profound but does not survive the question "what does this
   literally mean?" is slop. Cut it.

The test for every line: **would Rik say this sentence to a person, and does it mean
something specific?** If either answer is no, rewrite or delete. When in doubt, say less
— a hollow line is worse than a missing one. This applies to all copy: narrative, stall
labels, UI text, and Document Mode prose.

## Influences and precisely what we take

| Source | What we take | What we explicitly do not take |
|---|---|---|
| Shopify Editions Spring 2026 | Point-cloud legibility — the idea that a scatter of correctly-placed points reads as an object with the faintest suggestion of detail. Authored scroll pacing. | Its corporate polish and product-launch structure. |
| landonorris.com | Cursor-as-reveal-field: pointer proximity displaces and brightens points, uncovering what is behind. Spring-damped motion everywhere. | Its sports-brand register. |
| messenger.abeto.co | The *feeling* of exploring somewhere foreign, achieved through optional Alcoves and free look rather than free movement. | Free-roam character movement. See ADR-001. |
| Mob Psycho 100 | The emotional climax is small, quiet, and about one person. | — |
| Berserk | A recurring visual motif that accrues meaning; respect for persistence. | Its gore and grimness. |
| Attack on Titan / Dark / Tenet | Structure that rewards re-reading. The Return closes a loop. | Actual time-travel plotting. Complexity for its own sake. |
| Monster | The Figure is morally unresolved and unexplained. Ambiguity is allowed to stand. | — |
| One Piece | World-building implied at the edges — sightlines suggesting more world than is built. | Scale for scale's sake. |
| Interstellar | Vast scale immediately adjacent to one intimate gesture. | — |
| Jojo Rabbit | Warmth and jokes surrounding something serious. | — |
| Expedition 33 | Score as the primary emotional carrier; layered stems that accumulate. | — |

## The values this site is meant to demonstrate

Stated plainly so they can be checked against the work:

- **Care.** It is obvious a person made deliberate choices here.
- **Empathy.** The site works for people whose bodies and brains are not the
  designer's. This is why `04-ACCESSIBILITY.md` is a first-class specification
  and not a checklist.
- **Restraint.** Mostly empty. The accent colour appears in under 5% of any
  frame. What is *not* here is part of the design.
- **Rigour.** It is fast, it is tested, it degrades gracefully, and there is a
  written reason for every decision.

## Definition of done

The site is finished when all of the following are true:

1. A recruiter with 30 seconds gets a complete, useful answer in Document Mode,
   one visible click from anywhere.
2. A Witness with 10 minutes completes the journey and feels something at the
   Reach.
3. A keyboard-only Witness and a screen-reader Witness can reach every piece of
   content, and can perceive the Focus metaphor rather than merely being told
   about it.
4. It holds 60fps on a 2021 laptop and 30fps on a mid-range phone.
5. Someone revisits, notices something they missed, and understands why it was
   always there.
