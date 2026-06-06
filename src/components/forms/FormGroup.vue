<template>
  <fieldset class="form-group">
    <legend :class="legendClass">{{ legend }}</legend>
    <p v-if="hint" class="form-group__hint">{{ hint }}</p>
    <slot></slot>
  </fieldset>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    legend: string;
    titleVariant?: boolean;
    hint?: string;
  }>(),
  {
    titleVariant: false,
    hint: undefined
  }
);

const legendClass = computed(() =>
  props.titleVariant ? 'document-checklist__title' : 'form-group__legend'
);
</script>
