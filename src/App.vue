<template>
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
</template>

<script setup lang="ts">
import AppFooter from './components/AppFooter.vue';
import AppHeader from './components/AppHeader.vue';
import PrimarySidebar from './components/PrimarySidebar.vue';
import SecondarySidebar from './components/SecondarySidebar.vue';
import ViewLayout from './components/ViewLayout.vue';
</script>

<style scoped></style>
