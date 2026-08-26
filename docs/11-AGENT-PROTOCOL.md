# Agent protocol — how work happens

> How this project gets built across many sessions with no shared memory.
>
> **Merged 2026-08-19** from the former `11-AGENT-PROTOCOL.md` and
> `12-ORCHESTRATION.md`. They were split arbitrarily, and the split buried the
> single most important operational fact in the project — §The context-poverty rule —
> inside a document marked optional-until-you-dispatch. One file now.
>
> These documents are not reference material. **They are the program**, and this file
> is how to execute it. Read it early and take it literally.

---

## Roles (ADR-020)

### Rik — author and judge

- Supplies all content (`07-CONTENT-INVENTORY.md`).
- Signs off every **[R]** exit criterion in `08-ROADMAP.md`.
- Ratifies unratified ADRs and answers Open questions (`09-DECISIONS.md`).
- Has final say on anything aesthetic. Nobody else gets a vote.

### Orchestrator — Claude Opus/Fable 5

Holds the whole specification in context. Never writes production code itself except
to unblock a stuck implementer.

Responsibilities: read state, pick the next task, write a self-contained brief, route
it, dispatch, **review the returned diff against the acceptance criteria**, accept or
return or escalate, update `STATUS.md`, decide the next action.

**Never delegates:** decisions and ADRs, changes to any `docs/` specification, phase
gating, or anything requiring Rik's judgement.

### Implementer — Codex CLI agent

Writes code for exactly one task. Disposable — spawned per task, discarded on
completion. **Has no memory of the project and has not read the specification.**

---

## The context-poverty rule

**This is the most important operational fact in the project.**

An implementer knows only what its brief tells it. Therefore **every task brief must
be self-contained** — it inlines the constraints that apply rather than referencing
document sections. A brief that says "follow `03-ART-DIRECTION.md`" has failed: the
agent will either not read it, or read 400 lines of irrelevant context.

Concretely, a brief inlines the specific invariants, the exact colour tokens and
numeric values, the file boundaries, and the acceptance criteria verbatim. It is
longer than a normal ticket, on purpose.

**Corollary: task decomposition quality is the main determinant of output quality.**
Time spent making tasks small, sharp, and self-contained is repaid several times over.

---

## Session lifecycle

Every session, without exception:

**1. Orient.** Read `AGENTS.md`, then `docs/STATUS.md` — current phase, last thing
completed, next concrete action, everything blocked. Then the docs `STATUS.md` names.

**2. Confirm, don't assume.** Run the build and tests before writing code.
`STATUS.md` reflects what the previous session *believed*; the repo reflects what is
true. If they disagree, the repo wins and `STATUS.md` gets corrected.

**3. Work.** One phase at a time, in roadmap order. Take the next concrete action. Do
not skip ahead to a more interesting phase.

**4. Verify.** Run the phase's exit criteria from `08-ROADMAP.md`. Machine-checkable
criteria must actually pass, not be assumed to pass.

**5. Update `STATUS.md`.** Rewrite it every session, even for a small change. It is
the only working memory that survives. A session that does good work and leaves
`STATUS.md` stale has damaged the project.

**6. Report honestly.** What passed, what failed with its output, what was skipped,
what is blocked. Never round up.

### Typical shape — one session is one phase (ADR-050)

```
1. AGENTS.md → STATUS.md → PRD-000 (list this phase's requirement IDs) → the phase in 08
2. Build + tests. Reconcile reality against STATUS.md. The repo wins.
3. Decompose the phase into tasks. Get Rik's approval on the decomposition.
4. Write a self-contained brief per task into docs/tasks/
5. Dispatch implementers wave by wave — disjoint file sets within a wave
6. Review every returned diff against the review gate. Accept, return, or escalate.
7. Run the phase's exit criteria
8. Generate artifacts for anything Rik must judge
9. Rewrite STATUS.md
10. Report: Done / Failing / Blocked on Rik / Next
```

Run this with `/run-phase <n>`. `/implement-task <id>` is the fallback for a standalone
task — a repair, or resuming after a session died mid-phase.

**Why the phase is the session boundary.** A per-task boundary forces the *orchestrator*
to re-read the specification for every task and then discard it, which reintroduces
context-poverty at the level where it is most expensive. Holding the phase in context for
its whole duration is the orchestrator's entire advantage.

Prefer finishing a few tasks completely over starting many. A half-finished task is
worse than an unstarted one, because the next session must reconstruct intent from a
partial diff.

### Task granularity (ADR-050)

Three criteria, and **review burden is not one of them** — diff-size targets were
considered and dropped, because Rik does not review this project by line count.

1. **Disjoint file sets.** Two agents may never touch the same file. Hard constraint; it
   is what makes parallel dispatch safe. Otherwise, separate waves or separate worktrees.
2. **Failure isolation.** A failed task should implicate one coherent unit.
3. **One agent holding the thread.** A task an implementer cannot finish without losing
   coherence is too big, whatever its size.

---

## Task brief format

```markdown
# TASK <phase>-T<nn>: <imperative title>

## Goal
One or two sentences. What must be true when this is done.

## Context you need
Only what is required. Inline the actual values — colour hexes, numeric constants,
type signatures. Do not point at documents.

## Files you may create or modify
Explicit list. Anything not listed is out of bounds.

## Files you must NOT touch
Explicit list — always includes docs/, usually tokens.css and content schemas.

## Invariants that apply to this task
Inlined, with the reason. Example:
  - globalFocus(t) must never exceed 0.90 for t < 0.85. This is deliberate
    narrative design, not a bug. Do not "fix" it.

## Acceptance criteria
Numbered, individually verifiable, each with the command that proves it, and each
tagged **MACHINE** or **INSTRUMENTED** (ADR-048). **Never JUDGED** — if this task
produces something only Rik can assess, the criterion is "the artifact exists at
`artifacts/<phase>/<name>.png`", not "it looks right."

## How to verify
Exact commands, in order.

## Stop and report instead of guessing if
  - the task requires content that does not exist
  - the task requires an aesthetic judgement
  - a criterion cannot be met without touching a forbidden file
  - you would need to add a dependency

## Do not
  - commit or push
  - disable, skip, or weaken any failing test
  - modify anything under docs/
  - add a dependency
```

---

## Routing — model and effort

**Effort defaults to `high` for every task.** Drop below it only for the most
mechanical work, and record why in the task file.

| Class | Characteristics | Model | Effort |
|---|---|---|---|
| **A — Architectural** | Novel algorithms, shader work, the Focus system, the Spine, the DOM mirror, anything with subtle invariants | `gpt-5.6-sol` | `high` |
| **B — Substantive** | New components, test suites, the baking CLI, Station composition | `gpt-5.6-sol` | `high` |
| **C — Mechanical** | Scaffolding, config, boilerplate, content files from a given schema, straightforward refactors | `gpt-5.6-terra` | `high`, or `medium` for the most rote |
| **D — Repair** | Fixing a specific failing test with a known cause | `gpt-5.6-terra` | `high` |

`gpt-5.6-sol` is the more capable model; `gpt-5.6-terra` sits one tier below.

Anything touching the shaders, `engine/focus/`, `engine/spine/`, or `a11y/DomMirror`
is **class A regardless of how small it looks.** Those four are where subtle breakage
stays invisible until much later.

Escalation: **any class-C task that fails twice is reclassified as class B** and
redispatched on `sol`. Never a third attempt on the same tier.

---

## Agent lifecycle

- **One agent per task by default.** Fresh context, no drift, easy to reason about.
- **A single long-lived agent per subsystem** is permitted when several tasks share
  deep context that is expensive to re-establish — the shader work is the likely case.
- **Kill a drifted agent** rather than correcting it repeatedly. Two failed
  corrections means the task was scoped wrong; re-scope and respawn.
- **Never run two agents on overlapping files.** For parallelism, ensure disjoint file
  lists or give each its own git worktree.

---

## The review gate

Non-negotiable. **The orchestrator verifies; it does not trust.**

1. Read the entire diff. Not a summary of it.
2. Run every acceptance-criterion command and see it pass.
3. Check the `AGENTS.md` invariants are intact — particularly §Do not "fix" the
   specification below.
4. Check no forbidden file was touched.
5. Check no test was weakened, skipped, or deleted. Diff the test count.
6. Check no dependency was added silently — inspect `package.json`.
7. Check the brief itself carried **no JUDGED criterion** (ADR-048). An implementer
   cannot satisfy "does this feel right" and will guess or stall. A brief asks for the
   *artifact*; Rik supplies the judgement separately. If one slipped in, that is an
   orchestrator error, not the agent's.

An agent reporting success is **evidence, not proof.** Over a long build this gate is
the main defence against accumulating quiet damage.

---

## The blocked protocol

Claude cannot see, cannot hear, and does not have Rik's biography. Three kinds of work
are impossible in a build session:

| Kind | Examples |
|---|---|
| **Aesthetic judgement** | Does the Corridor feel claustrophobic? Is `viewGain` too strong? Does the Reach land? |
| **Rik's content** | Any role, project, date, course, bio line, or contact detail. |
| **Real-device / AT testing** | VoiceOver, NVDA, a physical mid-range Android, motion-sickness susceptibility. |

When one of these blocks a thread:

1. **Stop that thread.** Do not guess and do not proceed on an assumption.
2. Do everything else in the phase that does not depend on it.
3. Record it in `STATUS.md` under **Blocked on Rik**, as a specific answerable
   question — not "need feedback on the Corridor" but "does the Corridor feel
   claustrophobic, or should the walls come in ~15%? Screenshots at
   `artifacts/phase3/corridor-*.png`."
4. For content, use the placeholder protocol in `07-CONTENT-INVENTORY.md`. Obvious
   placeholders only.
5. Report it at the end of the session, plainly and near the top.

**The worst failure mode available in a long loop is fabricated progress.** A
convincing invented job history that ships is far more damaging than an obviously
empty slot. A phase marked complete on assumed criteria poisons every phase after it.
When uncertain, block.

### Escalation table

| Situation | Action |
|---|---|
| Class-C task fails twice | Reclassify to B, `sol`, redispatch |
| Class-A/B task fails twice | Orchestrator re-scopes into smaller tasks |
| Agent needs a decision | Orchestrator decides and writes an ADR; never let the agent decide |
| Agent needs content | Placeholder protocol; log to `STATUS.md` |
| Agent needs an aesthetic judgement | Produce artifacts, log a specific question, move to another task |
| Agent wants a dependency | Evaluate against `12-DEPENDENCIES.md` §Policy; ADR or refuse |
| An acceptance criterion is wrong | Fix the task file and the source spec, with an ADR if it changes a decision |

---

## Seeing without eyes

The determinism harness from Phase 1 exists for this reason.

- Deterministic Playwright screenshots at every Station's `focalT`, written to
  `artifacts/<phase>/`, **named for the question they answer**.
- For anything Rik must judge, produce a small set of variants
  (`corridor-walls-narrow.png`, `-current.png`, `-wide.png`) so his answer is one word
  rather than an essay.
- Prefer a measurement over a screenshot wherever one exists: the anamorphic `RIK`
  check is 40 scripted screenshots reduced to a legibility metric, not a vibe.
- Flicker and performance are measured, never eyeballed.

Never write "this looks good" or "the effect works well." Claude does not know that.
Write what was measured, and what needs review.

---

## Scope discipline

Scope creep is the main way this project fails.

- **Build only what the current phase lists.** An idea for a later phase goes into
  `STATUS.md` under Ideas, not into the code.
- **A sixth interaction verb is a design failure** until an ADR says otherwise
  (`02-EXPERIENCE-SPEC.md` §6).
- **A second hard snap is forbidden** (`03-ART-DIRECTION.md`).
- **No new colours** outside `tokens.css` without an ADR.
- **No conventional mesh geometry** in the world (`06-PERFORMANCE.md`).
- **Nothing modern appears in the world as itself** — the diegetic translation rule
  (ADR-033).
- Check any new effect against `00-VISION.md`. If it cannot be justified by a line
  there or in `01-NARRATIVE.md`, it does not go in.

---

## Do not "fix" the specification to match the code

Several things here look like bugs and are not. A session that tidies them up will
silently destroy the ending.

- **`globalFocus(t)` never exceeds 0.90 before the Reach.** Foreshadow F6. The world
  is *meant* to be measurably incomplete.
- **The Figure never reaches Focus 1.0.** ADR-006.
- **The Figure has no prompt, no pulse, and no timer.** It waits forever. A
  "discoverability improvement" here destroys the thesis.
- **Global Focus dips during the Climb.** Deliberate.
- **The Void's scroll response is weak.** Deliberate pacing. But note ADR-022 — weak
  *travel* with *immediate* visual feedback, which are different things.
- **Document Mode's JS budget is 5 KB.** Not negotiable, ever.
- **The chromatic fringing on the cursor-press is deliberate** and is an explicit
  exception to `03-ART-DIRECTION.md` §Anti-patterns (ADR-017).
- **Nothing depends on audio, and that is by design** (ADR-025). Do not add an audio
  dependency to make something work.

If one of these seems wrong, it is a conversation with Rik and an ADR — not an edit.

**Strikethrough in `docs/` means "rejected, kept for the record."** Struck passages
carry a bracketed reason. Do not implement them; do not delete them either.

---

## Never do these

- Mark an exit criterion met without running it.
- Disable, skip, or loosen a failing test to make a phase pass. Fix the cause or block.
  A red test is information; deleting it destroys information.
- Raise a performance budget without an ADR. Never raise Document Mode's.
- Invent biographical content, dates, employers, or project outcomes.
- Add analytics, third-party scripts, or runtime API calls. **One bounded exception
  exists** — ADR-046 permits counting `/` and `/world` requests from the host's own
  server-side logs, with **no client script, no cookie, no third party, and no
  identifier.** Read that ADR before touching this; its forbidden list is the boundary,
  not a starting point.
- Commit or push unless Rik asked. Branch rather than committing to the default branch.
- Silently reverse a decision in `09-DECISIONS.md`.
- Treat an **`UNRATIFIED`** or **`Claude's call`** ADR as immovable. Check the status
  vocabulary at the top of `09-DECISIONS.md` before defending a decision to Rik.
- Report a phase as done when any **[R]** criterion is unsigned.

---

## When to write an ADR

Append to `09-DECISIONS.md` whenever a decision could plausibly be reversed later by
someone who does not know why it was made:

- Any deviation from these documents.
- Any new library dependency.
- Any budget change.
- Any resolution of an unratified ADR or an Open question.
- Any structural choice with more than one reasonable answer.

Append only. Supersede, never edit. **Attribute honestly** — use the status vocabulary
at the top of that file, and do not write "Decided by Rik" for a call Claude made in
response to Rik raising a problem.

---

## Commit conventions

- Conventional commits, scoped by area: `feat(engine/focus):`, `fix(a11y/mirror):`,
  `docs(roadmap):`, `chore(ci):`.
- One logical change per commit.
- Reference the phase: `feat(engine/spine): arc-length parameterization (P2)`.
- Never mix a doc update with a code change unless the doc *is* the change's
  specification.

---

## Handoff message at session end

1. **Done** — what was completed, with the evidence that proves it.
2. **Failing** — anything red, with actual output.
3. **Blocked on Rik** — specific answerable questions, with artifact paths.
4. **Next** — the single next concrete action, matching `STATUS.md`.

Keep it short. `STATUS.md` holds the detail; the message is a pointer.
