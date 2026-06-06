<template>
  <section class="form-section">
    <div class="form-section__header">
      <h3 class="form-section__title">{{ title }}</h3>
      <p v-if="description" class="form-section__text">{{ description }}</p>
    </div>

    <slot></slot>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  description?: string;
}>();
</script>
