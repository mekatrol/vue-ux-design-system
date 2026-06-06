# Codex Rules

Use these rules for future changes in this Vue project.

## General

- Prefer consistency with the existing project over generic conventions.
- Add structure only when it clarifies ownership or reduces coupling.
- Keep components focused: view-level orchestration belongs in views, reusable UI behavior belongs in components.
- Use PascalCase filenames for Vue components, such as `UserProfileCard.vue`.
- This project is currently small and uses `src/components` directly. Do not introduce feature, store, router, service, composable, or utility folders until the code has a real ownership or reuse need.
- Keep Vue single-file component blocks in this order: `template`, `script`, then `style`.
- Use TypeScript for script blocks.

## Linting And Formatting

- Keep changes compatible with the project ESLint and Oxlint configuration.
- Use single quotes and semicolons in TypeScript.
- Prefer arrow function expressions assigned to `const`; do not use function declarations.
- Add explicit return types to named function expressions unless the lint config explicitly allows inference for that expression.
- Keep lines at or below the configured maximum length.
- Do not add `console` calls except `console.warn` or `console.error`, and only when they are intentional.
- Run `npm run format`, `npm run lint`, `npm run type-check`, and relevant tests after code changes.

## Constants

- Do not use magic strings for domain values, route names, route paths, store ids, status checks, storage keys, persisted values, emitted event names, or other control-flow values.
- Use named string constants or typed constant objects instead of repeated string literals.
- Derive union types from typed constant objects where practical.
- Keep shared string constants in a shared constants file when they are used across files.
- Use file-local constants only for values specific to one file.
- Keep constants immutable and free of runtime side effects.
- Do not turn constants files into miscellaneous dumping grounds.
- Visible UI copy can remain inline when it is only used once and is not part of control flow, persistence, or a public contract.

## Types

- Use types to document domain contracts and boundaries.
- Prefer clear suffixes such as `User`, `UserResponse`, `UserFormValues`, and `UserListItem`.
- Keep generated API types separate from hand-written domain types when code generation is used.
- Keep types local to one component or service until they are reused.

## Composables

- Use composables for reusable stateful logic.
- Name composable files and functions with the `use` prefix, such as `usePagination.ts` and `usePagination()`.
- Keep composables focused on one concern.
- Avoid making composables implicit service locators. Dependencies should be visible through imports or parameters.
- Route-aware workflow composables may coordinate services, stores, and router navigation. Keep services free of router dependencies.
- Do not extract component-local state into a composable until it is reused or the component becomes hard to scan.

## Utilities

- Use utilities for shared pure helpers.
- Use local utility functions when helpers only make sense inside one component or module.
- Keep utilities deterministic where possible.
- Do not put API calls, store mutations, or UI side effects in utility files.
- Put URL composition and URL normalization helpers in utilities instead of embedding ad hoc string manipulation in services.
- Runtime configuration readers are acceptable in utilities when the utility owns that concern.
- Do not add a shared `utils` folder for one-off helpers.

## Imports

- Use the configured `@/` alias for application imports from `src` when importing across directories.
- Use relative `./` imports for nearby local files, especially sibling files in the same folder.
- Prefer named, destructured imports over namespace imports when the module exports named members.
- Keep imports specific to the API being used.
- If shared or feature folders are introduced later, shared folders should not import from feature folders.
- If feature folders are introduced later, one feature should not reach into another feature's internals. Promote genuinely shared behavior to a shared folder or expose it through an intentional feature API.
- Avoid circular dependencies between stores, services, and composables.
