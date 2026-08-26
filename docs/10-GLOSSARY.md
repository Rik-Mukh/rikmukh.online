# Glossary

> **Read this first.** Every other document uses these words with exactly these
> meanings. If you are a new session picking up this project, read this file
> before you read anything else. Precise shared vocabulary is the single thing
> that makes a project like this survive a handoff.
>
> If you invent a new concept, add it here in the same commit.

---

## Story & world

**The Witness**
The visitor. Never called "the user" in narrative docs. The word is deliberate:
the entire thesis is that the world is incomplete without someone to see it.
Use "user" only in technical/accessibility contexts where it is the standard term.

**The Void**
The opening state. Undifferentiated black with a handful of drifting points. No
sense of scale, direction, orientation, or enclosure. Also the closing state —
the site returns here.

**The Approach**
Act 1. Travel toward the distant smudge of light. Nothing is legible yet.

**The Corridor**
Act 2. The first legible space. Narrow, tall, cold, silent. Deliberately
claustrophobic. Carries the *about* content.

**The Name**
Act 3. The `RIK` letter sculpture. Anamorphic — only reads as letters from one
exact position on the Spine. Functions as the site's title card.

**The Market**
Act 4. The reveal that the Corridor's walls were market stalls all along.
Bustling, warm, loud, funny. Carries *work history / experience*. This is where
the fun lives.

**The Climb**
Act 5. Ascending tiers of stepped architecture. Carries *education and courses*.
Progress made literal.

**The Wardens**
The almost-human figures ringing the Figure's platform, each holding a Mirror.
Not quite human — proportions slightly wrong, faces unresolved. They do not move
except to turn their Mirror toward you.

**The Mirrors**
Project portals, held by Wardens. At rest each Mirror shows a faint point-cloud
reflection of the Witness. On approach it resolves into a diorama of one project.

**The Figure**
The unfinished, unidentified human in the Creation-of-Adam pose. Never named.
Never Rik. Never fully resolved, even at maximum Focus. Dejected at a distance;
notices you and extends a hand as you approach. No God opposite.

**The Reach**
The climactic interaction. The Witness must close the final gap to the Figure's
hand. It is never automatic and never demanded — the Figure waits indefinitely.

**The Return**
Act 8. Camera pulls back to reveal the whole journey as one object, then fades to
the Void — now legible.

**Second Sight**
The state of a returning Witness. Persisted locally. Things are subtly *more
legible* from the start; nothing new is stated. This is the rewatch payoff.

---

## Mechanics

**Focus**
The core mechanic and the site's central metaphor. A scalar in `[0, 1]`
controlling how completely a point cloud has resolved from haze into form.
`0` = maximum dispersion, jitter, and dimness. `1` = every point in its exact
authored position, full opacity, no jitter.

There is one **global Focus** (a function of position along the Spine) and a
**local Focus** per subject, modulated by distance, view-angle proximity, and
cursor proximity.

**Resolve** *(verb)*
What a subject does when its Focus rises toward 1. "The Corridor resolves at
`t = 0.32`."

**Disperse** *(verb)*
The inverse. Points scatter and dim. Used both as a transition and as the
Lando-style cursor interaction on the Figure.

**The Spine**
The single authored camera path through the world — a parametric curve. There is
exactly one. The Witness's position on it is the scalar `t ∈ [0, 1]`.

**`t`**
Normalized position along the Spine. The primary state variable of the entire
experience. Almost everything is a function of `t`.

**Station**
An authored stop on the Spine. Owns a `t` range, a `scrollGain`, a camera framing, a
content reference, its interactions, its Alcoves, and its accessibility label plus a
required `a11y.description` of its visual state. (No audio layer — ADR-025 removed
that field from the Station contract.) Stations are the unit of navigation, of
content, and of accessible traversal.

**Alcove**
An optional detour off the Spine. Entered by choice, always returns to the exact
`t` it was entered from. Used for depth: a specific role, a specific project.
Never contains anything required to understand the story.

**Free look**
Pointer-driven camera yaw/pitch within a clamped cone. Does not change `t`.
Never includes roll.

**The Ember rule**
`EMBER` is the interaction colour. If something is Ember, it can be touched. If
it can be touched, it is Ember. Nothing decorative is ever Ember. See
`03-ART-DIRECTION.md`.

**Point budget**
The number of particles allotted to the current device tier. Adaptive, with
hysteresis, and never permitted to fall below the legibility floor.

---

## Product & architecture

**World Mode**
The 3D experience. One hydrated island.

**Document Mode**
The plain, semantic, near-zero-JavaScript rendering of the same content. **The
default, served at `/`** (ADR-024) — not a fallback, and never described as one. The
canonical content surface for search engines, recruiters, and screen readers. Its hero
header carries the only invitation into World Mode that exists, and there is no
automatic redirection to World Mode ever.

**Content Graph**
The single source of truth. Structured content collections from which *both*
renderers are derived. See `05-ARCHITECTURE.md`.

**The derivation invariant**
No Station may exist in World Mode without a corresponding entry in the Content
Graph. Violations fail the build. This is what keeps the two renderers honest
without relying on discipline.

**Foreshadow Ledger**
The tracked table of every structural clue planted for the final reframe, with
where it is planted and where it pays off. Lives in `01-NARRATIVE.md`. Every clue
must be *structural* (a consequence of how the world works) rather than *planted*
(a deliberately placed hint) — that is what makes the second visit work.

**Fun budget**
The explicit allocation of jokes, absurdity, and easter eggs — concentrated in
the Market, absent from the Corridor and the Figure. Tracked so that "make it
fun" stays a design requirement rather than an afterthought.
