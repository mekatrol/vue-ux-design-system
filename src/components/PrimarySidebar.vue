<template>
  <nav class="primary-sidebar" aria-label="Primary navigation">
    <RouterLink :to="{ name: ROUTE_NAMES.home }">Primary Sidebar</RouterLink>
  </nav>
</template>

<script setup lang="ts">
import { ROUTE_NAMES } from '@/router';
import { RouterLink } from 'vue-router';
</script>
