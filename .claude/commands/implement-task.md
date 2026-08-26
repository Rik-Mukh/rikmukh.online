---
description: Fallback — implement one standalone task brief when not running a full phase
---

**This is the fallback command.** The normal path is `/run-phase <n>`, which decomposes a
phase and dispatches implementers in one session (ADR-050). Use this one only when a single
task needs running on its own:

- a repair of one failing thing
- resuming after a session died mid-phase, with briefs already written
- a one-off Rik asked for directly

The task, and any extra guidance, is in: $ARGUMENTS

$ARGUMENTS contains a task ID or brief path (e.g. `P0-T03`, `docs/tasks/P0-T03-tokens.md`)
and MAY also contain constraints or decisions Rik has already made. Parse the task; treat the
rest as authoritative. A pre-answered decision must NOT be re-asked.

**If Rik's guidance conflicts with the brief, with `AGENTS.md`'s invariants, or with
`docs/prd/PRD-000-the-website.md`, STOP and surface the conflict. Do not silently pick one.**

Follow `docs/13-CODE-STANDARDS.md` and `docs/11-AGENT-PROTOCOL.md`. Do not restate them;
apply them.

---

## Step 1 — Understand

1. Read the brief in full: goal, file boundaries, inlined invariants, requirement IDs,
   acceptance criteria, forbidden files.
2. **Read the current contents of every file you will touch.** Do not trust anything the
   brief quotes about existing code — the brief may predate the file.
3. Read the neighbouring code you will match. This codebase should read as though one person
   wrote it; find the existing pattern before inventing one.
4. Run the build and the relevant tests **now**, so you know which failures you inherited.
5. Raise the brief as unexecutable, immediately, if it carries a JUDGED criterion, needs a
   forbidden file, needs content that does not exist, or needs an uninstalled dependency.

## Step 2 — Plan (STOP for approval)

Enter Plan Mode. Present:

- the approach, mapped criterion by criterion to the brief's acceptance criteria
- the exact files you will add or change, and confirmation that none is forbidden
- **the tests you will write first**, named for the behaviour they protect and citing the
  requirement ID — `focus never exceeds 0.90 before the reach`, not `test focus 3`
- which inlined invariants constrain the design, and how each is satisfied
- any conflict between the brief and the real code

Ask any crucial decision via AskUserQuestion first: at most 3 questions, each with 2–4
mutually exclusive options and your recommendation first.

**Never invent an aesthetic value.** If a constant is not inlined in the brief, it is not
yours to choose — stop and ask. This is how a stray colour ends up outside `tokens.css`.

**Write no code until Rik approves the plan.**

## Step 3 — Implement

1. Write the failing tests first. **Run them and confirm they fail for the right reason** — a
   test that passes before the code exists is testing nothing.
2. Write the minimum code that passes them.
3. Refactor to the code standards while keeping the tests green.

Hard rules:

- Touch nothing outside the brief's file list.
- Never disable, skip, weaken, or delete a test to make something pass. A red test is
  information. Fix the cause, or stop and report.
- Never add a dependency — that needs an ADR, which is not yours to write.
- Never edit anything under `docs/`.
- No inline user-facing strings; every one comes from the catalogue by key.
- No colour literal outside `tokens.css`.
- Nothing in `src/engine/` imports React, Astro, or Zustand.

## Step 4 — Verify

Run **every** acceptance-criterion command from the brief, in order, and **paste the real
output.** Do not summarise it and do not assert success.

Then confirm the wider project still holds: full typecheck, lint, test suite. Compare the
test count before and after — it must not have dropped.

If a criterion fails and you cannot fix the cause, **halt and report.** Do not continue past
it and do not work around it.

If the task produces something for Rik to judge, write the artifact to `artifacts/<phase>/`,
named for the question it answers, and give the path. Produce variants where one image cannot
settle the question, so his answer can be one word.

## Step 5 — Self-review against the gate

Check your own diff against `docs/11-AGENT-PROTOCOL.md` §The review gate and report each:

1. Every acceptance command ran and passed — output shown above.
2. No forbidden file touched.
3. No test weakened, skipped, or deleted; count did not drop.
4. No dependency added — confirmed from `package.json`.
5. Inlined invariants intact; nothing deliberate was "fixed".
6. Names self-documenting; a stranger could navigate what you added.
7. Comments explain *why*, never *what*.

## Step 6 — Hand off

1. Summarise the diff and state how each acceptance criterion is met.
2. List anything **Blocked on Rik**, as specific answerable questions with artifact paths.
3. Note anything you saw but deliberately did not do, so it is not lost.
4. Update `docs/STATUS.md` if this changed the phase's state.
5. **Do not commit and do not push.** That is Rik's call.

Report honestly: what passed, what failed with its output, what you skipped. Never write
"this looks good" or "the effect works well" — you cannot know that. Write what you measured
and what needs review.

---

Reminder: `/effort high` for anything touching shaders, `engine/focus/`, `engine/spine/`, or
`a11y/DomMirror` — class A regardless of how small it looks.
