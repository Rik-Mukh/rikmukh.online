# rikmukh.online

Rik Mukherji's personal site — live at **[rikmukh.online](https://rikmukh.online)**.

It is one body of content rendered two ways:

- **Document Mode** — a fast, semantic, near-zero-JavaScript page. The default, and the
  version search engines, screen readers, and anyone in a hurry see.
- **World Mode** — an authored 3D point-cloud journey, entered by choice.

Both are generated from a single content graph, so they can never drift apart.

> **Status: in active development.** The full design — vision, narrative, art direction,
> accessibility, architecture — lives in [`docs/`](./docs). Start with
> [`AGENTS.md`](./AGENTS.md) for orientation and [`docs/STATUS.md`](./docs/STATUS.md) for
> current state.

## Stack

Astro · TypeScript (strict) · React Three Fiber + Three.js (World Mode) · deployed on
Vercel.

## Local development

Requires **Node 22+** (pinned via [`mise`](https://mise.jdx.dev) / `.nvmrc`).

```sh
npm install      # install dependencies
npm run dev      # start the dev server at localhost:4321
npm run build    # build the static site to dist/
npm run preview  # preview the production build locally
```

## Repository notes

- `docs/` is the specification and the source of truth for every decision
  (`docs/09-DECISIONS.md` is the decision log).
- The previous Next.js version of this site is preserved on the `legacy/v2-nextjs`
  branch.
