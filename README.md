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
https://www.kevinpowell.co/ as the overall CSS reference.

The project reset is in `assets/css/reset.css` and is based on Kevin Powell's
modern reset guidance.

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
