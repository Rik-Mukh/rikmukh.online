# Content inventory

> **This is the project's critical path.** Rik authors content; Claude builds
> everything else (see `11-AGENT-PROTOCOL.md`). No amount of engineering
> substitutes for the content, and several phases cannot complete without it.
>
> Build sessions: never invent biographical content. Use the placeholder protocol
> in §Placeholders and record the gap in `STATUS.md`.

## Owner key

- **R** — Rik authors it. Claude cannot.
- **C** — Claude authors it.
- **R→C** — Rik supplies raw material; Claude shapes it into final copy for Rik's
  approval.

## What Rik has supplied — as of 2026-08-19

Source: `resume-source.pdf` at the repo root. **Source material, not a deliverable**
— `/resume.pdf` is generated from the Content Graph (ADR-026).

> **Privacy note.** The source PDF contains a phone number. The site excludes it
> (ADR-028). `resume-source.pdf` is **gitignored** as of 2026-08-25 (ADR-034) and was
> verified absent from the published tree. Keep it that way; the same applies to
> `scratch.txt`.

### Available

| Item | Content | Sufficient? |
|---|---|---|
| Identity | Rik Mukherji · Edmonton, AB, Canada · **pronouns he/him** (supplied 2026-08-19) | ✅ |
| Contact | email, `github.com/Rik-Mukh`, `linkedin.com/in/rik-mukherji` | ✅ phone excluded |
| Education | University of Alberta, B.Sc. Computing Science (Software Practice), Aug 2022 – Apr 2027 | ✅ |
| Coursework | 7 named courses: Algorithms I, OS Concepts, Software Engineering, Computer Organisation & Architecture, Machine Learning I, Reinforcement Learning, File & Database Management | ✅ for 5 tiers |
| Roles | **1** — AWS, SDE Intern, AWS Outposts, Vancouver, Jun–Sep 2026 (**in progress**), 3 quantified bullets | ⚠️ thin — see below |
| Projects | **3** — KneadTech, Continuum, LuckyYou. 3 quantified bullets each | ✅ |
| Hackathons | NATHacks / NeurAlbertaTech, Nov 2023 – Nov 2025. 3 prototypes, Honorable Mention (4th) for Continuum. NeuroDrive and Focus Flow are additional buildable subjects | ✅ |
| Skills | 10 languages, 6 frameworks, 9 tools/platforms | ✅ 25 background stalls |

### Station-by-station verdict

| Station | Status |
|---|---|
| **Mirrors** (Act 6) | ✅ **Five subjects** — Continuum, KneadTech, LuckyYou, NeuroDrive, Focus Flow (ADR-028). Right in the 4–8 sweet spot. Continuum leads. |
| **The Climb** (Act 5) | ✅ **Five year-tiers, top tier unfinished** (ADR-028). 2022-23 … 2026-27. |
| **The Market** (Act 4) | ⚠️ → ✅ **Only one paid role.** Rescued by ADR-021's stall classes plus ADR-027, which lets Mirror subjects also appear as stalls. Anchors become AWS, KneadTech, Continuum, and NATHacks-as-an-engagement. Background tier draws on 25 skills plus personality stalls. |
| **The Reach** (Act 7) | ✅ Contact complete. |
| **The Corridor** (Act 2) | ❌ **Blocked.** The résumé contains no bio, no "about," nothing in first person. The 4–6 Corridor lines are original writing and cannot be derived. |
| **Document Mode** | ⚠️ Content complete, **prose not written.** Résumé bullets are résumé-voice ("Shipped a Java CLI for…"). Every item needs 2–4 sentences in Rik's first person. Claude drafts, Rik approves. |

### Supplied 2026-08-19, beyond the résumé

- ~~**Pronouns**~~ — **he/him.**
- ~~**About material**~~ — Rik's stated traits: likes working on things he doesn't
  know; extremely quick learner; wants foundational rather than surface understanding;
  likes asking why; loves unknown environments because "navigating that darkness" is
  the most fun, rewarding, and instructive part; works well in chaotic, fast-paced
  conditions, as the hackathon record shows. **Four candidate Corridor treatments are
  drafted in `content-drafts/ABOUT.md` and await approval.**
- ~~**A genuine failure**~~ — **this website.** Three abandoned predecessors. See
  ADR-030; it is now Foreshadow F9.
- ~~**Personality content**~~ — all of `idea.md` plus books (1984, Crime and
  Punishment), FPV drones, bouldering, and games (CS2, Valorant, Apex, Expedition 33,
  Gris). See ADR-031 for the candidate stall set.
- **GitHub audit** (ADR-029) surfaced three computer-vision repos absent from the
  résumé — `3D-Scene-Reconstruction`, `Stereo-Vision`, `AR-Cube-Demo` — which become
  the **flagship Mirror**.

### Still missing

1. **Final copy** for the failure stall's three wares and the background stalls.
   Claude drafts, Rik approves.
2. **Which About option** (`content-drafts/ABOUT.md`), and whether to work in the
   comfortable-being-a-beginner trait.
3. **What `NeuralLlama` and `NNN` are.** No descriptions on GitHub. They may fill
   Mirror slot 6, or may be nothing.
4. **Whether `Knead-a-Job` is KneadTech's origin** — the hackathon repo predates the
   résumé's Sep–Dec 2025 window by days.
5. **Prose rewriting** of every résumé bullet into first-person site voice. The single
   largest remaining writing task, and it is R→C.

### The strongest signal in the material

**Every bullet carries a number.** 150s→12s · 5 mm · 60 FPS · 30% · 50% ·
10min→2min · 100+ · sub-200ms · 10–15 iterations. Unusually disciplined, and per
ADR-028 it must survive into both renderers: Document Mode must not soften numbers
into adjectives, and **the pokeable wares on a Market stall should be the numbers
themselves.**

---

## Required content

| # | Item | Owner | Needed by | Notes |
|---|---|---|---|---|
| 1 | Name, pronouns, location, current status (studying / working / where) | R | Phase 0 | Pronouns matter — they appear in Document Mode prose. |
| 2 | One-line bio | R→C | Phase 0 | For SEO, social preview, Document Mode header. |
| 3 | One-paragraph bio | R→C | Phase 0 | Document Mode intro. |
| 4 | Full about text | R→C | Phase 0 | Document Mode. Source material for the Corridor lines. |
| 5 | Work history: each role — org, title, dates, 2–4 sentences, stack, one concrete outcome | R | Phase 0 | Becomes Market stalls in Phase 6. **One entry per stall.** |
| 6 | Projects: each — name, one-line hook, 2–4 paragraphs, stack, role, outcome, links, whether it succeeded | R | Phase 0 | Becomes Mirrors in Phase 5. Target 4–8. |
| 7 | Education: institution, degree, dates, notable courses grouped by year/theme | R | Phase 0 | Becomes Climb tiers in Phase 7. |
| 8 | ~~Resume PDF~~ | C | Phase 0 | **Changed by ADR-026.** `/resume.pdf` is now *generated* from the Content Graph via Playwright's `page.pdf()` against a print stylesheet, so it can never contradict the site. Rik's existing résumé is **source material for items 1–7**, not an artifact to maintain. |
| 9 | Contact: email, and whichever of GitHub / LinkedIn / elsewhere | R | Phase 0 | Appears at the Reach and in Document Mode. |
| 10 | Corridor narrative lines (4–6) | R→C | Phase 3 | First-person, short, plainly true, slightly uncomfortable. Derived from #4. |
| 11 | **The reframe line** (1) | R→C | Phase 4 | The single most important sentence on the site. Expect ~30 drafts. |
| 12 | Market stall labels and vendor lines | R→C | Phase 6 | Short, many, funny. Each attached to a real item from #5. |
| 13 | The failed-project stall — which project, and honest framing | R | Phase 6 | `01-NARRATIVE.md` Act 4. Requires Rik's judgement about what he's willing to say. |
| 14 | Project prose for Mirror panels | R→C | Phase 5 | Derived from #6, cut shorter. |
| 15 | Accessibility statement content | C | Phase 0 | Claude drafts from `04-ACCESSIBILITY.md`; Rik reviews for honesty. |
| 16 | SEO/meta: title, description, OG image | C | Phase 0 | OG image derived from a Station screenshot. |
| 17 | Blender blockout geometry for every subject | C | per phase | ADR-012. Claude authors low-detail blockouts; the aesthetic hides low fidelity. |
| ~~18~~ | ~~Audio stems~~ | — | never | **Removed by ADR-025.** Audio is descoped to optional post-launch procedural sound. No audio assets, no licensing, no commissioning. Nothing in the site may depend on audio. |
| 19 | Photo or likeness | — | never | Not needed. The Figure is never Rik (ADR-006). |

## Content that deliberately does not exist

Recording these so a future session does not add them as "missing."

- A blog. Not in scope (`00-VISION.md` non-goals).
- Testimonials or recommendations.
- A skills bar chart or percentage-proficiency graphic.
- A visitor counter, analytics dashboard, or "currently listening to" widget.
- Anything auto-fetched from a third-party API at runtime.

## Placeholders

When a build session needs content that does not exist yet:

1. Write a placeholder file in the correct collection with the correct schema, so
   the derivation invariant holds and the build stays green.
2. Set `placeholder: true` in the frontmatter. The schema requires this field.
3. Make the text **obviously** placeholder — `[PLACEHOLDER: role at company,
   dates, 3 sentences]`. Never plausible-looking invented biography. A convincing
   fake is far worse than an obvious gap, because it can ship.
4. CI fails the *production* build if any `placeholder: true` entry exists.
   Preview builds allow them.
5. Record it in `STATUS.md` under "Blocked on Rik."

## Structure per collection

Authoritative schemas live in `src/content/config.ts`. Shape:

```yaml
# src/content/roles/some-role.md
---
title: Software Engineer Intern
org: Example Corp
start: 2025-06
end: 2025-09
stack: [typescript, aws, python]
outcome: One concrete, verifiable sentence.
placeholder: false
world:
  stall: { t: 0.41, side: left, scale: 1.2, density: dense }
  vendorLine: "Everything here works. Mostly."
---

Two to four sentences of prose for Document Mode.
```

Note that every entry carries **both** prose and world placement. One file, two
renderers (ADR-003).

## Open questions

Do not guess these — ask Rik.

- ~~#18 Audio.~~ **Closed by ADR-025** — descoped entirely.
- Does Rik want the Market to include **people** (crowd figures) or only stalls
  and objects? Large cost difference; the warmth may be achievable without them.
  (Also open in `09-DECISIONS.md`.)
- How many projects? Four excellent Mirrors beat eight thin ones, and the Warden
  ring's composition depends on the count.
- Is Rik willing to name a genuine failure (#13)? It is the single most humanizing
  thing on the site, and it is entirely his call.
