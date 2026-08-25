# Code standards

> The operational rules behind **ADR-037** (the codebase is a first-class,
> self-documenting, fully-replaceable deliverable). `05-ARCHITECTURE.md` owns the
> *structure* (the directory tree, the engine/world boundary, the Content Graph). This
> file owns the *conventions* — naming, imports, types, React/R3F discipline, strings,
> comments, tests.
>
> **This document is written to be inlined into task briefs.** Per the context-poverty
> rule (`11-AGENT-PROTOCOL.md`), an implementer will not read it unless a brief pastes
> the relevant rule in. Each rule is therefore short and quotable.
>
> Synthesised 2026-08-23 from external authorities and cross-checked against Amazon
> internal frontend guidelines — see §Sources. Where sources conflicted, the choice made
> for this project and the reason are stated inline.

---

## 0. The one test

Before any file is considered done, it must pass Rik's bar (ADR-037):

> **A developer who has never seen this project can open the file, read only its name,
> its location, and its signatures — no comments, no docs — and understand what it does
> and how to work on it.**

If that is not true, the names or the structure are wrong, not the reader.

---

## 1. Principles

1. **Self-documenting over documented.** A good name removes the need for a comment.
   Comments explain *why*, never *what* (§8).
2. **Colocation.** Things that change together live together. A component's test, styles,
   sub-components, and hooks sit beside it — not in a parallel `tests/` or `styles/` tree.
   Only genuinely shared code moves up. *(Kent C. Dodds; Robin Wieruch.)*
3. **Promote late.** A helper used by one feature stays in that feature. It moves to a
   shared location only when a second feature needs it. Premature extraction creates
   orphaned "out of sight, out of mind" utilities.
4. **Unidirectional dependencies.** Code flows `shared → feature → app/page`, never
   backward. Features never import from each other; they are composed at the page level.
   Enforced by `eslint-plugin-boundaries` (`12-DEPENDENCIES.md`).
5. **Everything is replaceable.** The font, any single effect, the Mirror presentation,
   any content item, and any string must each change by editing one well-named module.
   Rik confirms visuals only by seeing them (ADR-011), so assume every visual choice
   changes at least once.
6. **One concern per module.** Small single-purpose files over large multi-purpose ones.
7. **Follow the ecosystem, don't invent.** Use conventions any web developer already
   knows, so the layout is legible on sight.

---

## 2. Directory & file organisation

The canonical tree is in `05-ARCHITECTURE.md` §Directory layout. Rules that govern it:

- **Group by feature, not by file type,** inside `src/world/`. A Station owns its
  scene composition, its interactions, and its local hooks in one folder. Do **not**
  scatter a feature across global `components/`, `hooks/`, `utils/` bins.
- **Reserve top-level type-folders for genuinely shared code only** — `src/engine/`
  (framework-free), shared UI primitives, the string catalogue, the Content Graph.
- **No junk-drawer folders.** `utils/`, `helpers/`, `misc/`, `common/`, `lib/` as a
  dumping ground are banned. If code needs a home and no precise name fits, the code is
  doing too much. A narrowly-named module (`arcLength.ts`, `springDamp.ts`) is fine.
- **Colocate tests** (`*.spec.ts`) beside the unit they test. End-to-end and visual/
  flicker suites live at the repo root in `tests/e2e/` — they do not care how `src/` is
  arranged and must not break when it is refactored. *(Matches `05` §Testing.)*
- **Nesting ≤ 2 levels** inside a feature, barring a stated exception.
- **A folder may have a small public surface,** but **no barrel `index.ts` re-export
  files** — they defeat Vite/Rollup tree-shaking and bloat the bundle (a hard concern
  under the 200 KB island / 5 KB document budgets, `06-PERFORMANCE.md`). Import the exact
  file. *(bulletproof-react and Robin Wieruch both now discourage barrels.)*

---

## 3. Naming

**Casing — the resolved scheme for this project.** Sources conflict here (Google TS uses
`snake_case` files; bulletproof-react uses all-`kebab-case`, components included). This
project uses the dominant React/Astro convention, which is also what `05-ARCHITECTURE.md`
already shows (`DomMirror.astro`, `spring.ts`, `prefs.ts`):

| Thing | Case | Example |
|---|---|---|
| Component files (`.astro`, `.tsx`) | `PascalCase` | `StationMarket.tsx`, `DomMirror.astro` |
| Other module files (`.ts`) | `camelCase` | `arcLength.ts`, `focusCompose.ts` |
| Folders | lowercase, `kebab-case` if multi-word | `engine/`, `world/`, `content-drafts/` |
| Classes, types, interfaces, enums | `PascalCase` | `SpineCurve`, `StationConfig` |
| Variables, functions, methods, props | `camelCase` | `globalFocus`, `resolveStation` |
| Constants & enum members | `CONSTANT_CASE` | `REACH_T`, `MAX_YAW_DEG` |
| Test files | as the unit + `.spec` | `arcLength.spec.ts` |

**Content of names:**

- Descriptive and unambiguous. No `a`/`b`/`x`/`tmp`/`data`/`obj`, no single letters
  except a loop index scoped to ≤10 lines. *(Google TS; internal NEAT guide.)*
- Acronyms are whole words: `loadHttpUrl`, not `loadHTTPURL`.
- No Hungarian or type-decoration: no `IThing` interfaces, no `strName`.
- Don't append the container type unless it disambiguates: `projects`, not `projectList`,
  unless a `projectList` component and a `projects` array coexist. *(Internal CANVAS
  guide.)*
- Booleans read as assertions: `isResolved`, `hasReached`, `canReach`.
- Event handlers: `handleReach`, `handlePointerMove`. Hooks: `useFocus`, `useSpine`.

---

## 4. TypeScript

- **`strict: true`**, plus **`noUncheckedIndexedAccess`** (array/object access may be
  `undefined` — forces handling it) and **`noImplicitOverride`**. *(Matt Pocock cheat
  sheet.)* Base: `verbatimModuleSyntax`, `isolatedModules`, `moduleDetection: force`,
  `skipLibCheck`, `target: es2022`.
- **No `any`.** Use a precise type, else `unknown` narrowed by a guard. If `any` is
  truly unavoidable, a comment must justify it and the lint suppression is explicit
  (`AGENTS.md`: "no `any` without a comment"). Never `@ts-ignore` / `@ts-expect-error`
  without a documenting comment; never `@ts-nocheck`.
- **`interface` for object shapes; `type` for unions, primitives, tuples.**
- **Declare function return types** on exported functions. *(Internal NEAT guide.)*
- `const` by default, `let` only when reassigning, never `var`. `===` always (except
  `== null` to catch both null and undefined).
- Prefer optional fields (`?`) over `| undefined` unions. Handle null at its source.

---

## 5. Imports

- **Absolute imports via one alias**, `@/*` → `src/*`. No `../../../` chains.
  *(bulletproof-react; every internal guide.)*
- **Named exports only. No default exports** — they have no canonical name and cause
  import drift. *(Google TS.)* (Astro pages/layouts are the framework-required exception.)
- `import type { … }` when a symbol is used only as a type.
- **No barrel files** (§2).
- **Import order**, enforced by lint: node/external → `@/` internal → relative → styles.
  *(Internal ISNP guide has an explicit import-order standard; this mirrors it.)*
- The engine boundary is a hard rule: `src/engine/` imports no React, Astro, or Zustand
  (`05-ARCHITECTURE.md`, `AGENTS.md` inv. 7). Enforced by `eslint-plugin-boundaries`.

---

## 6. React & React Three Fiber

The R3F rules are not style — they are correctness and performance, and several restate
existing invariants (`05`, `06`). *(Source: R3F "Performance pitfalls".)*

**The render loop:**
- **Never call `setState` inside `useFrame`, `setInterval`, or high-frequency pointer
  events.** Mutate refs directly. This is the same rule as `05` §State ("`t` lives in a
  mutable ref, not React state").
- **Animate with frame deltas**, not fixed per-frame constants: `x += delta * speed`, so
  motion is refresh-rate independent.
- **Zero allocation in the loop.** Reuse a module-scope `Vector3`/`Color`; never `new`
  inside `useFrame` (`06` forbids per-frame allocation).
- Read fast-changing external state imperatively in the loop (`api.getState()`), never via
  a reactive selector.

**Objects & mounting:**
- **Share geometries and materials**; create them in `useMemo`, never inline in JSX.
- **Instance** repeated subjects (crowd, screen panels, stalls) — one draw-call family
  (`06`, ADR-039).
- **Toggle `visible` instead of mounting/unmounting** to avoid recompiling shaders and
  reallocating buffers.
- Load assets through the cached loader hook, never a raw loader per component.

**Components:**
- Function components only. Props typed with an `interface`, never `any`. *(Internal CANVAS
  guide: "Define prop interfaces … don't use `any` for props".)*
- `useCallback`/`useMemo` for values passed to memoised children or used in the loop;
  don't create new functions/objects every render for those paths.
- Clean up every subscription and listener in the `useEffect` return.
- Hooks only at the top level, only from React functions.

---

## 7. Strings & internationalisation (ADR-037)

- **No inline user-facing strings, anywhere.** Every label, message, and piece of copy is
  imported by key from a catalogue — site copy from the Content Graph (`src/content/`),
  UI-chrome copy from a dedicated `strings` module.
- Two payoffs: all copy is editable in one place, and the site is **translation-ready by
  construction** — an explicit future path, not a commitment to ship translations now.
- A lint rule flags hardcoded user-facing string literals in JSX/TSX.
- Copy content itself obeys the **no-slop rule** (`00-VISION.md` §Voice).

---

## 8. Comments & documentation

- **Comments explain *why*, not *what*.** A comment that restates the code means the code
  needs a better name. *(All sources agree.)*
- Exported functions, hooks, components, and non-trivial types carry a short JSDoc with
  `@param`/`@returns` where it adds information. *(Internal CANVAS: "JSDoc on every
  export".)* Do not JSDoc the obvious.
- A `TODO` always references an issue or a `STATUS.md` line — never a bare `TODO`.
  *(Internal NEAT guide.)*
- Each `src/` subsystem folder has a one-paragraph `README.md` only if its purpose is not
  obvious from names alone. Prefer better names to a README.
- The specification lives in `docs/`. Code comments never duplicate it; they link to the
  relevant ADR by number where a choice looks surprising (e.g. the F6 focus cap).

---

## 9. Testing

- **Colocate** unit and invariant tests (`*.spec.ts`) with their subject. E2E, a11y,
  flicker, perf, visual suites live in `tests/e2e/` at the root (`05` §Testing; Kent C.
  Dodds).
- Determinism is mandatory for the visual/flicker suites: seeded randomness app-side,
  time controlled by Playwright's Clock (ADR-026).
- A test is documentation of intent — name it for the behaviour it protects, not the
  function it calls: `focus never exceeds 0.90 before the reach`, not `test focus 3`.

---

## 10. Tooling & enforcement

Standards that are not enforced rot. Wherever a rule above can be a lint rule, it is one.

| Tool | Enforces |
|---|---|
| ESLint (+ `@typescript-eslint`) | type rules, no-`any`, import order, hooks rules, `jsx-a11y` |
| `eslint-plugin-boundaries` | the engine boundary and unidirectional feature flow (§1, §5) |
| a custom lint rule | no hardcoded user-facing strings (§7); no hex outside `tokens.css` |
| `stylelint` + `color-no-hex` | the palette-token rule (`03`, `12-DEPENDENCIES.md`) |
| Prettier | all formatting — never hand-formatted, never argued about |
| `check-file` (or equivalent) | the file/folder naming scheme (§3) |
| `tsc --noEmit` in CI | the strict flags (§4) |

- **Format on save** in the editor; **Prettier + ESLint run in CI** and block merge.
- **Husky + lint-staged** run format-check, lint, and typecheck pre-commit, so a broken
  commit cannot land. *(Recommended by bulletproof-react and every internal guide.)*
  Note: this hooks *local* commits only; Rik's rule that Claude never commits unless asked
  (`AGENTS.md`) is unchanged.

---

## Sources

**External authorities (read 2026-08-23):**
- Astro — official project-structure guide.
- bulletproof-react — `project-structure.md`, `project-standards.md` (feature-based +
  unidirectional architecture, import boundaries, tooling).
- Robin Wieruch — "React Folder Structure" (progression, colocation, naming).
- Kent C. Dodds — "Colocation".
- Google TypeScript Style Guide (identifier casing, `type` vs `interface`, named exports,
  `any`/`unknown`).
- Matt Pocock / Total TypeScript — tsconfig cheat sheet (strictness flags).
- React Three Fiber — "Performance pitfalls" (the §6 R3F rules).

**Internal cross-validation (Amazon wikis, read 2026-08-23).** Stack-specific details
(Brazil, Webpack, Redux, Tuxedo) are *not* adopted — they don't apply to an Astro/Vercel
personal site — but the *principles* converged strongly, which is why they are cited:
- SWA Door-to-Door — Frontend Guidelines.
- FPA Engineering — Frontend Development Best Practices (folder structure).
- DNES NEAT — Coding Best Practices (single responsibility, naming, TODO discipline,
  extract-duplicated-strings-to-constants).
- ISNP Health — Frontend Best Practices (import-order standard, an explicit **Mobile & iOS
  Considerations** section — independent support for ADR-038).
- CAPES INK — React Coding Guidelines (colocate tests, no `any`, JSDoc every export,
  `useCallback`/`useMemo` discipline; itself an index of ~12 other Amazon team guides).
- BXT CANVAS — React/TypeScript Best Practices (colocation, precise-and-concise naming,
  declarative over imperative).

The consistency between independent external and internal sources is the reason these are
stated as rules rather than suggestions.
