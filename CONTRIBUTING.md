# Contributing to TimescapeNU

TimescapeNU is a single deployable Angular SPA (`apps/shell`) assembled from
independently-owned libraries under `libs/`, built by parallel teams. This
document covers the conventions every team is expected to follow.

## Branching

Trunk-based development against `main`. `main` is protected — no direct
pushes, no long-lived `develop` branch. Branch names:

```
feature/<module>-<short-desc>
fix/<module>-<short-desc>
chore/<module>-<short-desc>
```

`<module>` is the lib you're primarily changing (`ess-mss`, `hr-essentials`,
`shared-ui`, `core-auth`, `shell`, ...). Examples:

```
feature/ess-mss-payslip-download
fix/shared-patterns-data-table-sort-reset
chore/core-interceptors-retry-backoff-tuning
```

## Commits — Conventional Commits, scoped by module

Every commit message must follow [Conventional Commits](https://www.conventionalcommits.org/),
enforced by commitlint via a Husky `commit-msg` hook:

```
<type>(<scope>): <short summary>

[optional body]
```

- `type` is one of `feat`, `fix`, `refactor`, `perf`, `test`, `docs`, `build`,
  `ci`, `chore`.
- `scope` is required and must be kebab-case — use the lib you changed
  (`ess-mss`, `application-services`, `shared-patterns`, `core-auth`,
  `layout-sidebar`, `shell`, ...).

Examples:

```
feat(ess-mss): add payslip PDF download action
fix(shared-patterns): reset sort state when columns change
refactor(core-interceptors): extract correlation id header constant
```

## Module boundaries

Nx enforces the dependency rules below via `@nx/enforce-module-boundaries`
(see `.eslintrc.json`) — a PR that violates one fails lint in CI, not just
locally:

- `scope:shell` (the app) may depend on `scope:core`, `scope:shared`,
  `scope:layout`, `scope:copilot`, and any `scope:feature-*`.
- `scope:core` may depend only on `scope:core` and `scope:shared`.
- `scope:shared` may depend only on `scope:shared` and `scope:core`.
- `scope:layout` and `scope:copilot` may depend on their own scope plus
  `scope:core` and `scope:shared`.
- **A `scope:feature-*` lib may depend on `scope:core`, `scope:shared`, and
  `scope:layout` — and _never_ on another `scope:feature-*` lib.** This is
  the rule that keeps the 8 business modules independently shippable by
  separate teams. If two features need to share behavior, promote it to
  `shared/patterns` (or `shared/ui`, `shared/models`) instead of importing
  across features.

When you generate a new lib, tag it correctly in `project.json` — the
boundary rule is driven entirely by these tags, not by folder location.

## Code conventions

- Angular 17, **standalone components only** — no `NgModule`s anywhere.
- `ChangeDetectionStrategy.OnPush` on every component.
- **Reactive forms only** — never template-driven forms / `ngModel`.
- No `any`. Variant-style `@Input()`s use real unions/enums, never bare
  `string`.
- No hardcoded colors, spacing, or timing — everything goes through the
  design tokens in `libs/shared/tokens` (`var(--tsn-*)` in SCSS, the typed
  TS exports where you need a value in logic).
- A component's data model lives in its own `<name>.interface.ts` file,
  never inline in the component file.
- Feature libs never inject `HttpClient` directly — always go through
  `ApiClientService` (`@timescapenu/core-api-client`), so JWT attachment,
  correlation IDs, retry/backoff, error normalization and audit logging stay
  applied uniformly.
- Every `shared/ui` and `shared/patterns` component ships with a Storybook
  story (`<name>.component.stories.ts`).

## Before you push

```
npm run affected:lint
npm run affected:test
npm run affected:build
```

Husky runs `lint-staged` (ESLint + Prettier on staged files) on every commit
and commitlint on every commit message — fix what it flags rather than
bypassing the hook.
