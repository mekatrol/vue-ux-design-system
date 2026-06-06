# vue-ux-design-system

Vue 3 design system playground for testing application shell layouts, shared
tokens, and responsive component patterns.

## Components And Layout

The shell is composed with `ViewLayout` in `src/components/ViewLayout.vue`.
It exposes slots for the major application regions:

- `header`: full-width top row
- `primary-sidebar`: sticky left navigation column on desktop
- default slot: main page content
- `secondary-sidebar`: sticky right navigation column on desktop
- `footer`: full-width sticky bottom footer

`src/App.vue` shows the intended usage:

```vue
<ViewLayout>
  <template #header>
    <AppHeader />
  </template>

  <template #primary-sidebar>
    <PrimarySidebar />
  </template>

  <p>App Content</p>

  <template #secondary-sidebar>
    <SecondarySidebar />
  </template>

  <template #footer>
    <AppFooter />
  </template>
</ViewLayout>
```

### Header

`AppHeader` renders the header content. Layout styling belongs in
`assets/css/header.css`, not in the Vue component.

The header is a full-width flex row at the top of the page. Use it for product
title, global navigation, search, account controls, or other app-wide actions.

### Sidebars

`PrimarySidebar` is for the main navigation and appears as a sticky vertical
column on the left side of desktop layouts.

`SecondarySidebar` is for contextual navigation, filters, page tools, or related
content and appears as a sticky vertical column on the right side of desktop
layouts.

Sidebar layout styling belongs in `assets/css/sidebar.css`. On smaller screens,
the sidebars become full-width horizontal rows so the main content is not
compressed.

### Footer

`AppFooter` renders the footer content. Layout styling belongs in
`assets/css/footer.css`.

The footer is full width and sticky to the bottom of the viewport. Use it for
supporting page content, secondary actions, or persistent low-priority controls.

## CSS Structure

Global CSS is imported from `src/main.ts`.

- `assets/css/reset.css`: modern reset
- `assets/css/themes.css`: color, typography, and theme tokens
- `assets/css/site.css`: global layout primitives and app shell sizing
- `assets/css/header.css`: header region styles
- `assets/css/sidebar.css`: primary and secondary sidebar styles
- `assets/css/footer.css`: footer styles

CSS decisions should prefer Kevin Powell's guidance where it applies, especially
for resets, layout, responsive behavior, and modern CSS defaults. Use
[Kevin Powell](https://www.kevinpowell.co/) and
[The Cascade](https://thecascade.dev/) as the overall CSS learning references.

The project reset is in `assets/css/reset.css` and is based on Kevin Powell's
modern reset guidance.

### Class Naming Methodology

Use a hybrid naming approach that blends structural [BEM][bem-naming] with
utility-first ideas from [CUBE CSS][cube-block]. The goal is readable CSS where
each class name communicates its job: component structure, layout,
single-purpose utility, state, or JavaScript behavior.

This project uses the two-dash BEM modifier style documented by the BEM
community:

```css
.card {}
.card__title {}
.card__title--featured {}
```

Use BEM for reusable, isolated components:

- Blocks are standalone components, such as `.card`, `.app-header`, or
  `.primary-sidebar`.
- Elements are parts of a block and use `__`, such as `.card__title` or
  `.app-header__nav`.
- Modifiers are variations of a block or element and use `--`, such as
  `.card--compact` or `.card__title--featured`.
- Keep element names flat. Do not create chained element hierarchies such as
  `.card__body__title`; use `.card__body` and `.card__title` instead.
- Avoid tag and ID selectors for component styling. BEM's quick-start guidance
  explicitly recommends class-based blocks and warns against tag or ID selectors
  in BEM CSS.

Use prefixed utilities for single-purpose styling that should not become part of
a component API:

```css
.u-flex {}
.u-mb-lg {}
.u-text-muted {}
```

Utilities should stay small, predictable, and generic. Use them for spacing,
alignment, display helpers, and small text treatments when creating another BEM
modifier would add noise. CUBE CSS treats utility and composition layers as
first-class parts of the system, with block styles kept lighter because common
work is handled by global, composition, and utility layers.

Use layout classes for macro-layout rules:

```css
.l-container {}
.l-grid {}
.l-sidebar-layout {}
```

Layout classes own page and region structure: containers, grids, stacks,
sidebars, gutters, and shell-level alignment. Do not use them for component skin
or one-off visual tweaks. A component should be able to move between layouts
without dragging page structure into its own class names.

Use state and JavaScript hook classes only for behavior:

```css
.is-active {}
.is-open {}
.js-nav-toggle {}
```

State classes such as `.is-active` or `.is-open` describe temporary UI state.
JavaScript hook classes such as `.js-nav-toggle` exist so scripts can find
elements without depending on styling classes. Do not put visual rules directly
on `.js-*` selectors; pair them with BEM or state classes when styling is needed.

Prefer modern CSS features over highly specific naming schemes. Use
[CSS custom properties][mdn-custom-properties] for tokens and reusable values,
and use modern layout features such as [flexbox][mdn-flexbox] and
[grid][mdn-grid] before adding extra wrapper classes or deeply nested selectors.

Consistency matters more than strict adherence to any single methodology. If a
class represents component structure, use BEM. If it represents reusable layout,
use `l-`. If it represents a small single-purpose helper, use `u-`. If it exists
for behavior, use `js-`. Keep those roles separate so CSS remains easy to scan,
move, and delete.

[bem-naming]: https://bem.info/en/methodology/naming-convention/
[cube-block]: https://cube.fyi/block.html
[mdn-custom-properties]: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascading_variables/Using_custom_properties
[mdn-flexbox]: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout
[mdn-grid]: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout

## Project Setup

```sh
npm install
```

## Development

### Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

### Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so the
project uses `vue-tsc` for type checking. In editors, use Volar so the
TypeScript language service understands `.vue` files.

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Playwright](https://playwright.dev)

```sh
# Install browsers for the first run
npx playwright install

# When testing on CI, must build the project first
npm run build

# Runs the end-to-end tests
npm run test:e2e
# Runs the tests only on Chromium
npm run test:e2e -- --project=chromium
# Runs the tests of a specific file
npm run test:e2e -- tests/example.spec.ts
# Runs the tests in debug mode
npm run test:e2e -- --debug
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
