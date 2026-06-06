<template>
  <header>
    <slot name="header"></slot>
  </header>

  <aside aria-label="Primary sidebar">
    <slot name="primary-sidebar"></slot>
  </aside>

  <main>
    <slot></slot>
  </main>

  <aside aria-label="Secondary sidebar">
    <slot name="secondary-sidebar"></slot>
  </aside>

  <footer>
    <slot name="footer"></slot>
  </footer>
</template>
