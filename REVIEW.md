# Review instructions

Configures `/code-review` for this repository. Set by **ADR-051**.

The code under review was written by a **Codex agent working from a self-contained task
brief** in `docs/tasks/`. It had no access to this project's specification and never will.
Your job is to catch what that produces.

---

## Review exactly these three things

**1. Correctness.** Does the code do what its brief said? Does it work for the inputs it will
actually see, including the empty case, the boundary, and the failure path?

**2. Requirement coverage.** Is every acceptance criterion in the brief genuinely met — not
merely claimed? Is any invariant the brief inlined now violated?

**3. Quiet damage.** The highest-value category, because it survives a green test run:

- a test weakened, skipped, deleted, or narrowed so it no longer catches what it protected
- a dependency added
- a file touched that the brief listed as forbidden
- a colour literal outside `src/styles/tokens.css`
- a user-facing string written inline rather than imported from the catalogue
- a framework import inside `src/engine/`
- **a deliberate design choice "fixed" as though it were a bug** — see below

## Do not review these

Out of scope. Reporting them is noise, and noise costs the orchestrator real time:

- style, formatting, naming preference — Prettier and ESLint own these
- architectural preference where the brief specified an approach
- test coverage of code the brief did not ask for
- anything you would phrase as "consider" or "you might also"

**Do not invent findings.** A reviewer asked to find problems will usually report some even
when the work is sound. If the diff is correct, say it is correct. Reporting nothing is a
valid and useful outcome. Prefer one confirmed finding over five speculative ones.

For each finding, state the concrete failure: the input or state, and the wrong output or
crash that results. If you cannot state that, it is not a finding.

---

## Things that look like bugs and are not

**This is the most important section.** This project deliberately contains measurable
incompleteness. A reviewer who "helpfully" flags these will send the orchestrator chasing
changes that would destroy the work.

- **Global focus never reaches its maximum before the final interaction.** The world is
  *meant* to be measurably incomplete until the visitor completes it. Not a bug. Not an
  off-by-one.
- **The central figure never fully resolves**, at any time, under any setting. Permanent.
- **The figure has no prompt, no pulse, and no timer.** It waits indefinitely. A
  "discoverability improvement" here destroys the entire premise of the site.
- **Global focus dips partway through the journey** rather than rising monotonically.
  Deliberate pacing.
- **The opening's scroll response is deliberately weak** — but it must still produce visible
  feedback within 100ms. Weak *travel* with *immediate* feedback are different things, and
  only the second is a bug if missing.
- **Chromatic fringing on the cursor press is deliberate**, and is an explicit exception to
  this project's own anti-patterns list. Do not flag it as chromatic aberration.
- **Nothing depends on audio, by design.** Do not suggest adding it.
- **Exactly one hard-eased transition exists** in the entire codebase. Every other motion is
  spring-damped. Do not propose a second, and do not flag the first as inconsistent.
- **A point-cloud crowd has no content-graph entry.** It is the one authored element exempt
  from the derivation rule. Do not flag it as missing data.

If one of these looks wrong, it is a conversation and a decision record — never a code change.

## Hard constraints worth checking against

- Document Mode ships **≤ 5 KB of gzipped client JavaScript**. Never negotiable. A change that
  grows it is a finding regardless of what it adds.
- **No luminance change above 3 per second**, anywhere, under any input.
- **Zero camera roll**, ever.
- Colours exist only in `src/styles/tokens.css`.
- `src/engine/` imports no React, Astro, or Zustand.
- No analytics, third-party scripts, or runtime API calls. One narrow logged-request exception
  exists and needs no client code.

## Severity

- **Important** — wrong behaviour, a violated invariant, or quiet damage. Anything in the three
  categories above.
- **Nit** — a genuine but minor correctness improvement. Cap these at three per review.

A performance budget or accessibility threshold that has been *raised* rather than met is
always **Important**, never a nit.
