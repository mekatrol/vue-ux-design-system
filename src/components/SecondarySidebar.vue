<template>
  <nav class="secondary-sidebar" aria-label="Secondary navigation">
    <RouterLink :to="{ name: ROUTE_NAMES.home }">Secondary Sidebar</RouterLink>
  </nav>
</template>

<script setup lang="ts">
import { ROUTE_NAMES } from '@/router';
import { RouterLink } from 'vue-router';
</script>
