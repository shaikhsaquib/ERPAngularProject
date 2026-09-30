# TimescapeNU

An Nx Angular 17 monorepo for TimescapeNU — one deployable SPA (`apps/shell`)
composing 8 lazy-loaded ERP business modules, built by parallel teams against
a shared platform (`libs/core`, `libs/shared`, `libs/layout`, `libs/copilot`).

See [`CONTRIBUTING.md`](./CONTRIBUTING.md) for branching, commit, and module
boundary conventions.

## Prerequisites

- Node 20+, npm 10+
- `npm ci` at the repo root (single `node_modules` for the whole workspace)

## Running things

```bash
npm start                 # nx serve shell — the full app at http://localhost:4200
npm run build              # production build of apps/shell (budgets enforced)
npm test                   # unit tests, every project
npm run lint                # lint, every project
npm run e2e                 # Playwright, all 8 per-module projects
npm run storybook            # shared-ui component gallery at :4400
npm run storybook:patterns    # shared-patterns component gallery at :4401
```

Scope any of these to what you're actually touching:

```bash
nx test core-auth
nx lint feature-ess-mss
nx affected --target=test   # only projects touched since the base branch
```

## Running a single module in isolation vs. the full shell

TimescapeNU is deliberately **one deployable SPA**, not a set of independently
runnable micro-frontends — that's what keeps a single design system, a single
auth session and a single bundle-budget gate meaningful across all 8 modules.
That has a direct consequence for "local dev in isolation":

- **`libs/shared/ui` and `libs/shared/patterns`** (the design-system layer)
  genuinely run standalone: `nx run shared-ui:storybook` / `nx run
shared-patterns:storybook` boot a Storybook instance with nothing else in
  the workspace running. This is where you iterate on a button, the
  data-table, the dynamic-form-engine, etc., without touching the shell at
  all. Every story there also gets an automated axe-core accessibility scan
  in CI (`@storybook/test-runner` + `axe-playwright`).
- **`libs/core/*` and every `libs/features/*` module** are libraries, not
  apps — there's no separate dev server to point at just one of them. Iterate
  with `nx test <project> --watch` and `nx lint <project>` for fast
  feedback on logic, and reach for `nx serve shell` (then navigate to that
  module's route, e.g. `/ess-mss`) when you need to see it rendered end to
  end. `nx affected` is your friend here — changing one feature lib doesn't
  re-run or re-build the other seven.
- **CI mirrors this**: `nx affected --target={lint,test,build}` only touches
  what your branch actually changed; the Storybook/axe job and the
  per-module Playwright projects are the two places every module gets a real
  "does this render" check without booting the entire shell for every PR.

## Architecture at a glance

```
apps/
  shell/            the one deployable SPA — bootstrap, routing, shell chrome only
  shell-e2e/         Playwright, one project per business module (see playwright.config.ts)
libs/
  core/              auth, guards, interceptors, api-client, permissions, state (NgRx SignalStore)
  shared/            ui (atoms), patterns (data-table, dynamic-form-engine, modal, ...),
                     tokens (design tokens), models (cross-cutting interfaces), i18n (currency/date/number pipes)
  layout/            module-bar, mega-menu, sidebar, breadcrumbs, command-palette
  copilot/           AI Copilot chat panel + suggestion chips
  features/          home, application-services, compliance, hr-essentials,
                     ess-mss, corporate-lounge, company-specific, my-sap
  testing/           shared mock factories & fixtures used by every module's specs
```

Module boundaries are enforced by `@nx/enforce-module-boundaries` (see
`.eslintrc.json` and `CONTRIBUTING.md`) — a `feature-*` lib can depend on
`core`, `shared`, and `layout`, but never on another `feature-*` lib.

## Decisions made where the original spec was ambiguous

See the PR/commit description (or ask in `#timescapenu-platform`) for the
full list — in short: CI runs on GitHub Actions; `home`, `corporate-lounge`,
`company-specific` and `my-sap` (no sub-domains named in the spec) each got
one representative entity; each other module got a fully-wired demo on its
first-listed sub-domain with sibling sub-domains scaffolded as routed
placeholder pages; centralized i18n formatting pipes live in a new
`libs/shared/i18n` (not explicitly named in the original folder layout).
