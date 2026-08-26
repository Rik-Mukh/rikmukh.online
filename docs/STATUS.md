# Status

> **Living document. Rewrite this every session** — it is the only working memory that
> survives between sessions. Keep it to *current state* + a short changelog; the reasoning
> for any decision lives in `09-DECISIONS.md`, not here.

**Last updated:** 2026-08-25 · **Phase:** Phase 0 — PRD written, build not started ·
**ADRs:** 049

---

## What changed this session (S8)

**`docs/prd/PRD-000-the-website.md` exists** — 520 lines, one PRD describing the finished
site working backwards from the visitor. Rik approved its shape, length, and the rule that
keeps it alive: **it states requirements and never restates a tunable value.** 97 requirement
IDs (`FR-*`, `NFR-*`, `SC-*`), sequential, never reused, each with an acceptance criterion
and a tag.

**Nine ADRs (041–049)**, all closing gaps found while writing the PRD. **There are no Open
questions left in `09-DECISIONS.md`** for the first time in the project.

**A spec-consistency pass.** `01-NARRATIVE.md` carried *two contradictory sets of `t`
values* — the act table (post-ADR-016, correct) and the per-act headings (pre-ADR-016,
stale). Every other doc agreed with the table. Headings corrected, and the table is now
declared the single authority with the disagreement recorded. Also fixed: `/world` routing
in `05`'s tree and diagram, the retracted audio-as-accessibility paragraph, audio leftovers
in `01`/`06`/`08`/`10`, the injectable clock that ADR-026 removed, and the preference count.

## S8 addendum (2026-08-26)

**`PRD-000` is APPROVED.** Its requirements are now the contract: changing one, or moving
an INSTRUMENTED threshold, needs an ADR. Adding one is an append with a new ID. Never
renumber.

**One session = one phase (ADR-050).** The orchestrator holds the specification for the
whole phase, decomposes it, dispatches implementers, reviews every diff, and closes the
phase. A per-task session boundary was tried and rejected: it made the *orchestrator*
re-read the specification for every task and discard it, which is context-poverty in the
one place it is most expensive.

**Two project slash commands** in `.claude/commands/`:

- **`/run-phase <n>`** — **the primary path.** Orient → reconcile → decompose (stops for
  Rik's approval) → write briefs → dispatch wave by wave → review each diff → run exit
  criteria → artifacts → rewrite this file. Writes no production code itself.
- **`/implement-task <id>`** — fallback for a standalone task: a repair, or resuming after
  a session died mid-phase with briefs already on disk.

**Dispatch (ADR-051): Codex implements, Claude reviews.** Codex CLI runs each brief per
ADR-020's routing. Every returned diff gets two passes — an independent Claude reviewer
scoped to correctness, requirement coverage, and quiet damage only, then the orchestrator's
own review gate. The reviewer never edits code and never reviews style.

### The Codex invocation — recorded 2026-08-26

Codex is an **external subprocess** launched through Bash, not a native Claude subagent.

```bash
codex exec \
  -C /Users/rikmukh/code/website \
  -m gpt-5.6-sol \
  -c 'model_reasoning_effort="high"' \
  -s workspace-write \
  --ephemeral \
  -o /tmp/P0-T01-final.txt \
  - < docs/tasks/P0-T01-example.md
```

- `-m gpt-5.6-sol` for classes A and B · `-m gpt-5.6-terra` for C and D (ADR-020).
- The brief goes in on **stdin**; the final report comes out via `-o`.
- **Logs and reports go to `/tmp`, never into the repository.**
- For a wave, start one background Bash job per task — **only** where allowed file lists are
  disjoint.
- Allowlist the `codex exec` Bash prefix via `/permissions`. **Do not enable sandbox bypass.**

Start the orchestrator with `claude --model opus --effort high`, then `/run-phase <n>`.

**Shared-workspace caution.** Every parallel Codex process edits this one working tree, so
disjoint *source* file lists are necessary but not sufficient — `.astro/`, `dist/`,
`node_modules/`, `package-lock.json` and the git index are all shared. Never let two tasks
in a wave install a dependency, run the build, or write generated output. If a wave needs
that, give each task its own git worktree and point `-C` at it.

**Task strategy:** briefs are written **per phase, at the start of that phase** — not all
up front. Estimated 75–90 tasks across the ten phases. **Granularity is governed by
disjoint file sets, failure isolation, and one agent holding the thread — never by diff
size.** Line-count targets were dropped (ADR-050).

## Next concrete actions

1. **Write `docs/tasks/`** — atomic briefs from the PRD, one agent-session / one reviewable
   diff each, each citing the `FR-`/`NFR-` IDs it satisfies, each carrying its class + model
   and inlining the rules it needs. **Rik and Claude do this collaboratively** (his
   instruction) — do not batch-generate them.
2. **Build Phase 0** — `tokens.css`, Content Graph schemas + Zod, placeholder content,
   Document Mode incl. the hero, `prefs.ts` (7 prefs), generated `/resume.pdf`, CI.

Phase 0 can be built almost entirely before Rik's content lands. Do not wait.

## Waiting on Rik

1. **Decomposition needs his approval per phase** — `/run-phase` stops for it by design.
3. **His reference board** — real architecture photos (author references, not depiction
   targets; ADR-036). Rik's to assemble; not an agent input.
4. **Content still to author (R→C):** first-person prose for every résumé bullet; final
   Corridor lines (`content-drafts/ABOUT.md`); final copy for the failure-stall wares and
   background stalls; **the reframe line**.

## PENDING JUDGEMENT

New in ADR-048. JUDGED criteria do not block a diff; they block phase completion. The full
set with the artifact that answers each is `PRD-000` §9. **Nothing is queued yet** — no
code has been written.

## Also open

- **ADR-011 typography** — provisional until Rik sees it rendered; keep it replaceable.
- **Golden reference frames** — deliberately deferred to after Phase 1 (ADR-048). Do not
  adopt frame-gating unilaterally; it needs an ADR.

## What exists

```
idea.md                      brain dump — tone reference, keep
AGENTS.md                    orientation, read order, 20 invariants
docs/00-VISION.md            thesis, tone, non-goals, influences, Voice + no-slop rule
docs/01-NARRATIVE.md         8 acts, t table (THE authority), Foreshadow Ledger F1–F9
docs/02-EXPERIENCE-SPEC.md   Spine, input, Focus, 5 verbs + ambient layer, 7 prefs
docs/03-ART-DIRECTION.md     palette, type, visual language (ADR-033), particles, motion
docs/04-ACCESSIBILITY.md     spec + criteria + the numeric flash thresholds
docs/05-ARCHITECTURE.md      stack, Content Graph, routing, testing
docs/06-PERFORMANCE.md       budgets, point tiers, mobile first-class
docs/07-CONTENT-INVENTORY.md what Rik owes / has supplied
docs/08-ROADMAP.md           11 phases, no calendar; P8 removed, P11 optional
docs/09-DECISIONS.md         ADR-001…049 · status vocabulary · NO open questions
docs/10-GLOSSARY.md          vocabulary — read first
docs/11-AGENT-PROTOCOL.md    roles, briefs, routing, the review gate
docs/12-DEPENDENCIES.md      what to lift vs. build
docs/13-CODE-STANDARDS.md    naming, imports, TS, React/R3F, strings, tests, lint
docs/prd/PRD-000-…md         ← NEW. The finished site, 97 requirement IDs
docs/content-drafts/ABOUT.md Corridor + bio copy; Option B″ current
docs/STATUS.md               this file
```

**Code:** the Astro scaffold only — `package.json`, `astro.config.mjs` (react + mdx +
sitemap), `tsconfig.json` (strict + `noUncheckedIndexedAccess` + `noImplicitOverride`),
`src/pages/index.astro` (Astro's default page), `public/`. Node pinned to 22.
`docs/tasks/` does not exist yet. **No project code has been written.**

**Deploy:** `Rik-Mukh/rikmukh.online` · `main` = v4 · `legacy/v2-nextjs` = old Next.js v2.
Vercel builds Astro and serves the default starter page at `rikmukh.online`. Verified: no
private files in the published tree.

## Model routing

`gpt-5.6-sol` = capable (classes A, B) · `gpt-5.6-terra` = faster (C, D) · effort `high` by
default. Shaders, `engine/focus/`, `engine/spine/`, `a11y/DomMirror` are class A on `sol`
regardless of size.

## Notes for the next session

- Read `10-GLOSSARY.md` before coding; schemas use its vocabulary.
- **`01-NARRATIVE.md`'s act table is the only authority for `t`.** The per-act headings
  mirror it; if they ever disagree the table wins and the heading is a bug.
- **Every acceptance criterion is now tagged MACHINE / INSTRUMENTED / JUDGED** (ADR-048).
  **A task brief may never carry a JUDGED criterion** — ask for the artifact instead. This
  is step 7 of the review gate.
- **`axe-core` cannot check the 3Hz cap.** There are no ACT rules for WCAG 2.3 at all, so
  the bespoke luminance analysis is the *only* automated guard on the most dangerous
  surface in the design. Do not delete it as redundant (ADR-049).
- **Contact has no form** (ADR-041) and `04`'s §Forms section is struck.
- Hard requirements for every task brief: no inline strings (inv. 17), self-documenting +
  replaceable code (inv. 18), no-slop copy (inv. 19). The R3F rules in `13` §6 are
  correctness, not style.
- Strikethrough in specs = rejected-but-kept; don't implement, don't delete.
- Crowd figures (ADR-039) are the one world element **exempt from the derivation
  invariant** — don't "fix" their absence from the Content Graph.
- Highest-value early outcome: **Phase 0 live.** Under ADR-024 it is the site itself.

## Ideas parked

- Device-orientation free look on mobile · shareable deep link to a Station · narrator
  voice (only ever with the optional audio phase, never before) · golden reference frames
  gating CI (after Phase 1).

## Changelog (compact — full reasoning in the ADR log)

- **S8 (08-25):** `PRD-000` written (520 lines, 97 requirement IDs, working backwards from
  the visitor). ADR-041 no contact form · 042 hero point-cloud technique · 043 mobile gets
  the whole journey · 044 substance first, craft as the frame · 045 the ending offers ways
  onward · 046 one privacy-respecting measurement · 047 Second Sight ratified · 048
  acceptance-criteria taxonomy · 049 accessibility target not a claim. **All Open questions
  closed.** Spec-consistency pass fixed the contradictory `t` sets and six other drifts.
  External research on PRD practice, agent-executable specs, and experiential-product
  requirements informed the structure.
- **S7 (08-23):** ADR-037 codebase quality, 038 mobile first-class, 039 crowd figures, 040
  native-scroll pref. Ratified 010/011(prov)/014/022/025/027/028/029 + unconfirmed-inventions
  list. Added `13-CODE-STANDARDS.md`. Lossless doc compression pass.
- **S6 (08-19):** Full audit — corrected ADR attributions, added status vocabulary +
  unconfirmed-inventions list, merged orchestration into `11`, renumbered deps to `12`.
- **S5 (08-19):** ADR-033 visual language, 034 repo plan locked, 035 Mirrors→5, 036 visual
  restraint.
- **S4 (08-19):** Résumé analysed (027–031): 5 Mirrors, failure stall = this site's 3
  predecessors, personality stalls, GitHub audit.
- **S3 (08-19):** ADR-024 Document Mode default, 025 audio descoped, 026 tooling round 2.
- **S2 (08-19):** ADR-015–023 — hero, act rebalance, ambient cursor field, controls upfront,
  dependency policy, orchestration, Market stall classes, scroll feedback.
- **S1 (08-14):** Foundational ADR-001–008; full doc set drafted.
