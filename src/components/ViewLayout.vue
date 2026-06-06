<template>
  <header class="app-layout-header">
    <slot name="header"></slot>
  </header>

  <div class="app-layout-body">
    <aside class="app-layout-sidebar app-layout-sidebar-primary" aria-label="Primary sidebar">
      <slot name="primary-sidebar"></slot>
    </aside>

    <main class="app-layout-main">
      <slot></slot>
    </main>

    <aside class="app-layout-sidebar app-layout-sidebar-secondary" aria-label="Secondary sidebar">
      <slot name="secondary-sidebar"></slot>
    </aside>
  </div>

  <footer class="app-layout-footer">
    <slot name="footer"></slot>
  </footer>
</template>
