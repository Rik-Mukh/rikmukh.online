---
description: Run a whole roadmap phase — decompose it, dispatch implementers, review every diff, close the phase
---

You are the orchestrator for one phase of this project. The phase, and any extra guidance,
is in: $ARGUMENTS

$ARGUMENTS contains a phase number (e.g. `0`, `4`, `P6`) and MAY also contain constraints,
scope narrowing, or decisions Rik has already made. Parse the number; treat the rest as
authoritative. Constraints override defaults. A pre-answered decision must NOT be re-asked.
**If any of it conflicts with `AGENTS.md`, `docs/prd/PRD-000-the-website.md`, or a
`Decided by Rik` ADR, STOP and surface the conflict before doing anything else.**

You hold the specification in context for the entire phase (ADR-050). That is your job and
your advantage. **You do not write production code yourself** — you decompose, dispatch,
and verify. The one exception is unblocking a stuck implementer.

Follow `docs/11-AGENT-PROTOCOL.md`. Do not restate its rules; apply them.

---

## Step 1 — Orient

Read, in this order, and do not skip:

1. `AGENTS.md` — the 20 invariants.
2. `docs/STATUS.md` — what the last session believed.
3. `docs/prd/PRD-000-the-website.md` — the approved contract. **List every `FR-`/`NFR-`
   requirement ID this phase must satisfy.** That list is the phase's real scope.
4. `docs/08-ROADMAP.md`, this phase only — deliverables and exit criteria.
5. `docs/10-GLOSSARY.md`, unless already fluent.
6. The specification documents this phase actually touches, and no others.
7. `docs/13-CODE-STANDARDS.md` — you will inline parts of it into briefs.

Check the ADR status of anything you rely on. `09-DECISIONS.md` opens with a status
vocabulary. Do not treat an `UNRATIFIED` or `Claude's call` ADR as immovable; do not
relitigate a `Decided by Rik` one.

## Step 2 — Branch, then reconcile reality

**Phase work happens on `phase/<n>-<slug>`** (ADR-052) — e.g. `phase/0-foundations`. Create it
now and report the name, so a session that dies leaves an obvious place to resume. If the
branch already exists you are resuming: check it out and reuse it. **Never merge it — that is
Rik's call, like every commit.**

Codex runs with `workspace-write` and edits the tree directly, several processes at a time. The
branch is the clean discard point for a wave that goes wrong.

Then reconcile:

`STATUS.md` records beliefs; the repository records facts. When they disagree, the repository
wins and `STATUS.md` gets corrected.

Run the build and the test suites now, before anything else, so you know which failures you
inherited. Report real output. State which of the phase's prerequisites are genuinely done
and which only look done.

## Step 3 — Decompose, or resume (STOP for approval)

**First, check whether this phase was already decomposed.** If `docs/tasks/P<phase>-*` files
exist, you are **resuming**, not starting. Do not re-decompose and do not rewrite briefs that
are already approved.

Instead, establish the true state of each existing task by looking at the repository, not at
`STATUS.md`: which are done and verified, which have a diff that never passed review, which
were never dispatched. Present that as a short table, say what you intend to do next, and get
Rik's confirmation before dispatching. Then go to Step 5.

Re-decompose only if the phase's requirements changed — and if they did, that is an ADR, not
a silent rewrite.

**Otherwise, decompose from scratch.** Enter Plan Mode and present:

- **Requirement coverage.** Every ID from Step 1, mapped to exactly one task. An ID with no
  task is a gap; a task with no ID is scope creep. **Report both.**
- **The task list**, in dependency order. Per task: imperative title, file list, class
  (A/B/C/D), model, and its dependencies.
- **The parallel plan.** Group tasks into waves. **Tasks in the same wave must have
  strictly disjoint file lists** — this is a hard constraint, not a preference. Anything
  sharing a file goes in a later wave or gets its own worktree.
- **Granularity check** (ADR-050 — line counts are explicitly not a criterion). For each
  task confirm: its file set is disjoint from its wave-mates; a failure implicates only it;
  one agent can hold it without losing coherence.
- **Blocked on Rik** — content that does not exist, and aesthetic judgements. Each as a
  specific answerable question, never "needs feedback".
- **Out of scope for this phase**, from the PRD's out-of-scope section and from later
  phases. Scope creep is the main way this project fails.
- **Risks**, checked against the PRD's rabbit holes.

Then ask any decision you genuinely cannot make:

- **At most 5 questions**, chosen by impact × uncertainty.
- **Each with 2–4 mutually exclusive options, your recommendation first**, so "yes" works.
- Ask nothing the repository could answer.

**Write no brief until Rik approves the decomposition.**

## Step 4 — Write the briefs

One file per task at `docs/tasks/P<phase>-T<nn>-<slug>.md`, in the format in
`docs/11-AGENT-PROTOCOL.md` §Task brief format. These are the durable record — a session
that dies mid-phase resumes from them.

**The implementer has not read the specification and never will.** Therefore:

- **Inline every value the task needs** — colour tokens, numeric constants, type signatures,
  exact file paths. A brief that says "follow `03-ART-DIRECTION.md`" has failed.
- **Inline the applicable invariants, each with its reason**, so nobody "fixes" a deliberate
  design choice. Several things here look like bugs and are not.
- **Name the requirement IDs it satisfies**, so tests can cite them.
- **Every acceptance criterion is MACHINE or INSTRUMENTED, each with the exact command that
  proves it. NEVER JUDGED.** If the output needs Rik's eye, the criterion is "the artifact
  exists at `artifacts/<phase>/<name>.png`" — never "it looks right." An implementer handed
  an aesthetic criterion will guess or stall.
- **List forbidden files** — always `docs/`, usually `tokens.css` and the content schemas.
- **Give a bounded escape hatch:** stop and report rather than guess if content is missing, a
  judgement is needed, a criterion requires a forbidden file, or a dependency would be added.
- **Forbid inventing any aesthetic value.** If a constant is not in the brief, the agent asks.

## Step 5 — Dispatch, wave by wave

**Codex implements; you never write the production code yourself** (ADR-051).

Codex is an external subprocess launched through Bash. One background job per task:

```bash
codex exec -C <repo-or-worktree-path> -m <gpt-5.6-sol|gpt-5.6-terra> \
  -c 'model_reasoning_effort="high"' -s workspace-write --ephemeral \
  -o /tmp/<TASK-ID>-final.txt - < docs/tasks/<TASK-ID>-<slug>.md
```

- `gpt-5.6-sol` for classes A and B · `gpt-5.6-terra` for C and D (ADR-020). Shaders,
  `engine/focus/`, `engine/spine/`, `a11y/DomMirror` are class A whatever their size.
- The brief goes in on stdin. The report comes out via `-o`. **Logs and reports live in
  `/tmp`, never in the repository.**
- Never enable sandbox bypass. `workspace-write` is the intended level.

For each wave:

1. Start one job per task, concurrently.
2. **Never run two agents on overlapping files.** Disjoint *source* lists are necessary but
   **not sufficient** — every process shares this working tree, so `.astro/`, `dist/`,
   `node_modules/`, `package-lock.json` and the git index collide too. **No two tasks in a
   wave may install a dependency, run the build, or write generated output.** If a wave needs
   that, give each task its own git worktree and point `-C` at it.
3. Wait for **every** job in the wave to exit. Then read each report, and inspect the real
   diff **restricted to that task's file list** — a diff outside it is a boundary violation
   regardless of what the report says.
4. Review before starting the next wave.

## Step 6 — Review every returned diff, twice

**You verify; you do not trust.** An agent reporting success is evidence, not proof — and the
agent that wrote the code is the worst available judge of it.

**Pass 1 — `/code-review`** (ADR-051). It runs in its own context window, which protects yours,
and it reads `REVIEW.md` at the repository root for its scope, the project's invariants, and
the list of things that look like bugs and are not. **Do not restate that scope in the
invocation** — `REVIEW.md` carries it.

Its findings are advisory to you. It never edits code, and it cannot isolate per-task diffs in
a shared working tree — so it supplements the gate below rather than replacing it.

**Pass 2 — your own gate, which `/code-review` cannot do for you.** Per diff:

1. Read the entire diff, not a summary of it.
2. Run every acceptance-criterion command yourself and see it pass. Paste real output.
3. Confirm the inlined invariants are intact — especially that nothing deliberate was
   "fixed".
4. Confirm no forbidden file was touched.
5. Confirm no test was weakened, skipped, or deleted. Diff the test count; it must not drop.
6. Confirm no dependency was added — inspect `package.json`.
7. Confirm no JUDGED criterion smuggled itself into the brief. If one did, that is your
   error, not the agent's.

**Accept, return, or escalate:**

- A class-C task failing twice becomes class B on `sol`. Never a third attempt on the same
  tier.
- A class-A/B task failing twice gets re-scoped into smaller tasks.
- Kill a drifted agent rather than correcting it repeatedly. Two failed corrections means the
  task was scoped wrong.
- An agent needing a decision: **you** decide and write an ADR. Never let the agent decide.
- An agent needing content: placeholder protocol, and log it.

## Step 7 — Close the phase

1. **Run the phase's exit criteria** from `08-ROADMAP.md`. Machine-checkable ones must
   actually pass, not be assumed to pass.
2. **Produce Rik's artifacts** into `artifacts/<phase>/`, named for the question each
   answers. Give variants where one image cannot settle it (`corridor-narrow.png`,
   `-current.png`, `-wide.png`) so his answer can be one word.
3. **Rewrite `docs/STATUS.md`.** Correct anything Step 2 disproved. Keep the
   `PENDING JUDGEMENT` list current — JUDGED criteria gate phase completion, so a phase with
   an unsigned one is **not** complete. Say so plainly.
4. **Report:** Done (with evidence) · Failing (with real output) · Blocked on Rik (specific
   questions, with artifact paths) · Next (the single next action).
5. **State plainly whether the phase is complete or not**, and if not, exactly what remains.
   A phase with an unsigned JUDGED criterion is **not complete** — say so rather than
   implying it.
6. Do not commit unless Rik asks.

Never mark an exit criterion met without running it. Never report a phase done with an
unsigned `[R]`/JUDGED criterion. Never round up.

If you are running out of context before the phase is done, **stop cleanly**: finish
reviewing whatever is already dispatched, write the true state into `STATUS.md`, and report
that the phase needs another session. A phase half-closed with a stale `STATUS.md` is the
worst outcome available, because the next session starts from a lie.

Reminder: `/effort high` before invoking this. Decomposition quality is the main determinant
of output quality, and a command cannot set its own effort.
