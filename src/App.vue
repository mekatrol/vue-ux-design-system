<template>
  <ViewLayout>
    <template #header>
      <h1>View Layout</h1>
    </template>

    <template #primary-sidebar>
      <nav aria-label="Primary navigation">
        <a href="/">Home</a>
      </nav>
    </template>

    <p>Content</p>

    <template #secondary-sidebar>
      <nav aria-label="Secondary navigation">
        <a href="/">Details</a>
      </nav>
    </template>

    <template #footer>
      <p>Footer</p>
    </template>
  </ViewLayout>
</template>

<script setup lang="ts">
import ViewLayout from './components/ViewLayout.vue';
</script>

<style scoped></style>
