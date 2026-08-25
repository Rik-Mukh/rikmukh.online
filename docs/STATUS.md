# Status

> **Living document. Rewrite this every session** — it is the only working memory that
> survives between sessions. Keep it to *current state* + a short changelog; the reasoning
> for any decision lives in `09-DECISIONS.md`, not here.

**Last updated:** 2026-08-25 · **Phase:** Phase 0 begun — Astro project scaffolded · **ADRs:** 040

---

## Next concrete actions

1. **Write `docs/prd/`** — one PRD per phase (problem, scope, out-of-scope, numbered
   requirements, data contracts, acceptance criteria, test plan). Start `prd/P0-foundations.md`.
2. **Write `docs/tasks/`** — atomic tasks from the PRDs, each one agent-session / one
   reviewable diff, each carrying its class + model and inlining the rules it needs.
3. **Begin Phase 0** — `git init` history per ADR-034, Astro + TS strict, `tokens.css`,
   Content Graph schemas + Zod, placeholder content, Document Mode incl. the hero,
   `prefs.ts` (7 prefs), generated `/resume.pdf`, CI, deploy to Vercel.

Phase 0 can be built almost entirely before Rik's content lands. Do not wait.

## Waiting on Rik — remind every turn (his instruction)

1. **Execute the repo plan** (ADR-034) — approved; needs his go-ahead **and the new repo
   name** (likes `rikmukh.online`; not keeping "portfolio"). Nothing touched yet.
2. **Re-theme the 18 storyboard frames** into the ADR-033 idiom — on hold until visual
   language + story are locked.
3. **Write PRDs + tasks** (action 1–2 above) — he asked to hold.
4. **His reference board** — real architecture photos (author references, not depiction
   targets; ADR-036).

## Also open / needs Rik

- **ADR-011 typography** — provisional until he sees it rendered; keep it replaceable.
- **Second Sight scope** — feature confirmed; "legibility only" scope not explicitly
  ratified (fine to leave to Phase 9).
- **Content still to author (R→C):** first-person prose for every résumé bullet; final
  Corridor lines (`content-drafts/ABOUT.md`); final copy for the failure-stall wares and
  background stalls.

## What exists

```
idea.md                      brain dump — tone reference, keep
resume-source.pdf            résumé, source only (ADR-026). GITIGNORE before public.
AGENTS.md                    orientation, read order, 20 invariants
docs/00-VISION.md            thesis, tone, non-goals, influences, Voice + no-slop rule
docs/01-NARRATIVE.md         8 acts, t table (authoritative), Foreshadow Ledger F1–F9, crowd
docs/02-EXPERIENCE-SPEC.md   Spine, input, Focus, 5 verbs + ambient layer, 7 prefs
docs/03-ART-DIRECTION.md     palette, type, visual language (ADR-033), particles, motion, light
docs/04-ACCESSIBILITY.md     spec + acceptance criteria + verification
docs/05-ARCHITECTURE.md      stack, codebase-standards pointer, Content Graph, routing, testing
docs/06-PERFORMANCE.md       budgets, point tiers, mobile first-class, CI measurement
docs/07-CONTENT-INVENTORY.md what Rik owes / has supplied
docs/08-ROADMAP.md           11 phases, no calendar; P8 removed, P11 optional
docs/09-DECISIONS.md         ADR-001…040 + status vocabulary + unconfirmed inventions
docs/10-GLOSSARY.md          vocabulary — read first
docs/11-AGENT-PROTOCOL.md    how work happens: roles, briefs, routing, review gate
docs/12-DEPENDENCIES.md      what to lift vs. build
docs/13-CODE-STANDARDS.md    naming, imports, TS, React/R3F, strings, tests, lint
docs/content-drafts/ABOUT.md Corridor + bio copy; Option B″ current
docs/storyboard/SHOT-LIST.md ⚠️ KNOWN-STALE (pre-ADR-033); re-theming on hold
docs/STATUS.md               this file
```

**The Astro project now exists** (2026-08-25): `package.json` (`rikmukh-website`),
`astro.config.mjs` (react + mdx + sitemap integrations), `tsconfig.json` (strict +
`noUncheckedIndexedAccess` + `noImplicitOverride`), `src/`, `public/`, `node_modules/`,
Astro's `.gitignore` (extended). Node pinned to 22 via `mise.toml` + `.nvmrc`.
`README.md` is still Astro's default boilerplate — **flagged for replacement.**

Still to create before dispatch: `docs/prd/`, `docs/tasks/`, and the real Document Mode
content/pages (Phase 0 proper). The repo history (ADR-034 step 4) is being executed this
session; Vercel preset flip (step 5) is Rik's.

## Model routing

`gpt-5.6-sol` = capable (classes A, B) · `gpt-5.6-terra` = faster (C, D) · effort `high` by
default. Shaders, `engine/focus/`, `engine/spine/`, `a11y/DomMirror` are class A on `sol`
regardless of size.

## Ideas parked

- Device-orientation free look on mobile · shareable deep link to a Station · narrator
  voice (only ever with the optional audio phase, never before).

## Notes for the next session

- Read `10-GLOSSARY.md` before coding; schemas use its vocabulary.
- **Check ADR status before defending a decision** — `09-DECISIONS.md` opens with the
  vocabulary; ADR-011 is the main thing still provisional.
- **Hard requirements that must land in every task brief:** no inline strings (inv. 17),
  self-documenting + replaceable code (inv. 18, `13-CODE-STANDARDS.md`), no-slop copy
  (inv. 19). The R3F rules in `13` §6 are correctness, not style.
- Strikethrough in specs = rejected-but-kept; don't implement, don't delete.
- Crowd figures (ADR-039) are the one authored world element **exempt from the derivation
  invariant** — don't "fix" their absence from the Content Graph.
- Phase 1's determinism harness is half-size — Playwright Clock covers time; only seeded
  randomness is needed app-side (ADR-026).
- Highest-value early outcome: **Phase 0 live.** Under ADR-024 it is the site itself, not a
  fallback.

## Changelog (compact — full reasoning in the ADR log)

- **S7 (08-23):** ADR-037 codebase quality, 038 mobile first-class, 039 crowd figures, 040
  native-scroll pref. Ratified 010/011(prov)/014/022/025/027/028/029 + unconfirmed-inventions
  list (Second Sight & rock-cut Figure kept; 46-week schedule removed). Added
  `13-CODE-STANDARDS.md` from external+internal research. Rik confirmed ADR-030. Lossless
  doc compression pass (superseded ADRs tombstoned, dedup, history trimmed).
- **S6 (08-19):** Full audit — corrected ADR attributions (many "Decided by Rik" were
  Claude's calls), added status vocabulary + unconfirmed-inventions list, merged
  orchestration into `11`, renumbered dependencies to `12`.
- **S5 (08-19):** ADR-033 visual language (medieval Islamic/Indian, geometry-not-palette),
  034 repo plan locked, 035 Mirrors→5 (CV repo dropped), 036 visual restraint.
- **S4 (08-19):** Résumé analysed (027–031): 5 Mirrors, failure stall = this site's 3
  predecessors, personality stalls, GitHub audit.
- **S3 (08-19):** ADR-024 Document Mode default, 025 audio descoped, 026 tooling round 2.
- **S2 (08-19):** ADR-015–023 — hero, act rebalance, ambient cursor field, controls upfront,
  dependency policy, orchestration, Market stall classes, scroll feedback.
- **S1 (08-14):** Foundational ADR-001–008; full doc set drafted.
