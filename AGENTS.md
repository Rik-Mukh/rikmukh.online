# Rik's portfolio site — orientation

**If you are a new session, read this file, then `docs/STATUS.md`, before doing
anything else.**

## What this is

A personal portfolio site for Rik, built as two renderings of one body of content:

- **Document Mode** — a fast, semantic, near-zero-JavaScript document. **The default,
  served at `/`** (ADR-024). Canonical for search engines, screen readers, and the
  many visitors who want information rather than an experience. Its hero header
  carries the only invitation into World Mode that exists.
- **World Mode** at `/world` — an authored 3D journey through a point-cloud world
  that resolves from haze into form as the visitor moves through it, ending at a
  half-finished figure in the Creation of Adam pose, reaching out with no one
  opposite.

Both are generated from a single Content Graph, as is `/resume.pdf`. World Mode is
never auto-redirected to; it is always chosen.

**Thesis: the visitor is the missing half.** Everything mechanical in the site is
a restatement of that. If a change does not serve it, it does not belong.

## Working arrangement

Rik authors content and makes every aesthetic judgement. **Claude Opus/Fable 5
orchestrates; Codex CLI agents write the code** (ADR-020, `docs/11-AGENT-PROTOCOL.md`).
Work happens across many sessions with no shared memory, so `docs/` is the program,
not reference material — `docs/11-AGENT-PROTOCOL.md` is how to execute it. Read that
one early and take it literally.

Critical consequence: **implementers have not read the specification and never
will.** Every task brief must inline the invariants and values it needs rather than
citing documents. See `docs/11-AGENT-PROTOCOL.md` §The context-poverty rule.

## Read order

| When | Read |
|---|---|
| Always, first | `docs/STATUS.md` — current phase, next action, what's blocked |
| Always, second | `docs/11-AGENT-PROTOCOL.md` — roles, the context-poverty rule, session lifecycle, task briefs, routing, the review gate, the blocked protocol, what never to do |
| Before using any project term | `docs/10-GLOSSARY.md` — precise vocabulary; every other doc depends on it |
| Before any design judgement | `docs/00-VISION.md` — thesis, tone, non-goals, influences |
| Before questioning any choice | `docs/09-DECISIONS.md` — every fork and its reasoning. **Do not relitigate.** |
| Building a Station | `docs/01-NARRATIVE.md`, `docs/02-EXPERIENCE-SPEC.md` |
| Anything visual | `docs/03-ART-DIRECTION.md` — especially §Visual language (ADR-033): medieval Islamic and Indian architecture, sourced from **geometry, not palette**. Nothing modern appears in the world as itself. |
| Anything at all | `docs/04-ACCESSIBILITY.md` — a spec, not a checklist |
| Writing code | `docs/05-ARCHITECTURE.md`, `docs/06-PERFORMANCE.md` |
| Before adding any dependency | `docs/12-DEPENDENCIES.md` — what to lift vs. build |
| Before writing any code | `docs/13-CODE-STANDARDS.md` — naming, imports, TS, React/R3F, strings, tests; inline the relevant rules into the task brief |
| Needing content | `docs/07-CONTENT-INVENTORY.md` |
| **What the finished site must be** | `docs/prd/PRD-000-the-website.md` — the one PRD. Requirement IDs, acceptance criteria, the JUDGED set, out-of-scope. **Cite its IDs in every task brief and test.** |
| Planning work | `docs/08-ROADMAP.md` for phase order, then `docs/tasks/` *(does not exist yet)* |
| Building any Station's look | `docs/03-ART-DIRECTION.md` §Visual language and §Per-act forms. Anything Rik must judge is produced as an artifact and reviewed by him (ADR-048) — never guessed at. |

Documents are numbered in dependency order. `00`–`08` are the specification, `09` is
the decision log, `10`–`13` are meta.

**Before defending any decision, check its status.** `09-DECISIONS.md` opens with a
status vocabulary: some ADRs were decided by Rik and are immovable, others are Claude's
recommendations that Rik has never confirmed. That file also carries an
**§Unconfirmed inventions** list — design decisions Rik never raised at all. Do not
treat an unratified decision as settled.

## Invariants

Violating any of these is a bug of the highest severity. Several look like bugs
and are not — see `docs/11-AGENT-PROTOCOL.md` §Do not "fix" the specification.

1. **`globalFocus(t)` ≤ 0.90 for all `t` before the Reach.** The world is
   deliberately incomplete until the visitor completes it. Foreshadow F6.
2. **The Figure never reaches Focus 1.0.** ADR-006.
3. **The Figure never prompts, pulses, or times out.** It waits forever.
4. **Every Station has a Content Graph entry, or the build fails.** ADR-003.
5. **`EMBER` means interactive, and only that.** Nothing decorative is Ember.
6. **Colours exist only in `src/styles/tokens.css`.** Enforced by lint.
7. **`src/engine/` imports no framework.** Plain TypeScript, Three.js, GLSL.
8. **Exactly five interaction verbs.** A sixth is a design failure.
9. **Exactly one hard snap** — the Corridor resolve. Everything else is
   spring-damped.
10. **Document Mode ships ≤ 5 KB of JavaScript.** Never negotiable.
11. **No luminance change above 3Hz, anywhere.** The Reach's flood is a ≥800ms
    ramp, never a flash.
12. **Zero camera roll, ever.**
13. **No invented biography.** Obvious placeholders only.
14. **The ambient cursor field and parallax are ambient, not a verb** (ADR-017).
    They are everywhere, they carry no `EMBER`, and they never signal that
    something is actionable. The chromatic fringing on the cursor-press is a
    deliberate exception to the anti-patterns list — do not delete it.
15. **Nothing may depend on audio** (ADR-025). Audio is descoped to an optional
    post-launch phase. The site must be complete and excellent silent, and the
    Reach must land on visuals alone. No accessibility criterion may cite audio.
16. **`/` is Document Mode and is never auto-redirected** (ADR-024). World Mode is
    always a deliberate choice, including for returning visitors.
17. **No inline user-facing strings** (ADR-037). All copy lives in a catalogue and is
    imported by key — editable in one place, translation-ready. Enforced by lint.
18. **The codebase is self-documenting and every part is replaceable** (ADR-037). Names
    carry meaning; structure explains itself; the font, effects, and content each swap
    by touching one module. A senior dev wrote it; a child can navigate it.
19. **No "AI-slop" copy** (`00-VISION.md` §Voice). No strained idioms nobody says, no
    empty aphorisms. Every line must be something Rik would say and must mean something
    specific. When in doubt, say less.
20. **Mobile is a first-class target** (ADR-038). Usable and good on a phone; the reduced
    feature set is authored, not accidental.

## Conventions

- **Strikethrough in `docs/` means "rejected, kept for the record."** Struck passages
  carry a bracketed reason and are **not** the specification — do not implement them.
  Do not delete them either; they exist so a future session does not re-propose a
  direction already considered and rejected.
- TypeScript `strict`. No `any` without a comment explaining why.
- Conventional commits, scoped by area, phase-tagged:
  `feat(engine/spine): arc-length parameterization (P2)`.
- Never commit or push unless Rik asks. Branch rather than committing to the
  default branch.
- Append-only decision log. Supersede, never edit.
- Rewrite `docs/STATUS.md` every session.
- Screenshots for Rik go to `artifacts/<phase>/`, named for the question they
  answer.

## Commands

Populated in Phase 0. Expected shape:

```
npm run dev          # Astro dev server
npm run build        # static build; Zod content validation runs here
npm run test         # Vitest — unit + invariants
npm run test:e2e     # Playwright — a11y, keyboard, flicker, perf, visual
npm run lint         # ESLint + the hex-literal and engine-import rules
npm run bake         # tools/bake — Blender blockouts → point textures
npm run shots        # deterministic Station screenshots → artifacts/
```

## Current state

**Phase 0 begun.** The Astro project is scaffolded (react + mdx + sitemap, TS strict,
Node pinned to 22 via `mise.toml`/`.nvmrc`). **`docs/prd/PRD-000-the-website.md` now exists
and is the specification of the finished site.** Real Document Mode content and
`docs/tasks/` are not built yet.

**Every acceptance criterion carries a tag** (ADR-048): **MACHINE** (CI asserts it,
gates the diff), **INSTRUMENTED** (a human chose the threshold; moving it needs an ADR;
gates the diff), or **JUDGED** (needs Rik; gates phase completion). **A task brief may
never contain a JUDGED criterion** — ask for the artifact and let Rik judge it.

Git history is on the `Rik-Mukh/rikmukh.online` remote, with the old Next.js v2 preserved
on branch `legacy/v2-nextjs` (ADR-034).

This file is `AGENTS.md`; `CLAUDE.md` is a symlink to it, so Claude Code, Codex, and any
other agent read the same orientation.

`resume-source.pdf` (Rik's résumé, contains a phone number the site excludes, ADR-028)
and `scratch.txt` (Rik's private notes) are **gitignored — never commit them.**

See `docs/STATUS.md` for the next concrete action and everything blocked on Rik.
