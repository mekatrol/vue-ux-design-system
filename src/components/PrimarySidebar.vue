<template>
  <nav class="primary-sidebar" aria-label="Primary navigation">
    <RouterLink :to="{ name: ROUTE_NAMES.home }">Application</RouterLink>
    <a href="#applicant">Applicant</a>
    <a href="#documents">Documents</a>
    <a href="#referee">Referee</a>
    <a href="#lodge">Lodge</a>
  </nav>
</template>

<script setup lang="ts">
import { ROUTE_NAMES } from '@/router';
import { RouterLink } from 'vue-router';
</script>
